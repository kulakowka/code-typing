(() => {
const $ = id => document.getElementById(id);
const LANGS = window.LANGS || [];
const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
document.querySelectorAll('kbd.mod').forEach(k => k.textContent = (isMac ? '⌘' : 'Ctrl+') + k.textContent);
document.querySelectorAll('kbd.mod2').forEach(k => k.textContent = (isMac ? '⌘' : 'Alt+') + k.textContent);

const store = {
  get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const LETTERS = t => 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#f4f1ea"/><text x="16" y="21.5" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="15" font-weight="700" fill="#1c1c1e">${t}</text></svg>`);
const ICON = l => l.prose ? LETTERS(l.icon) : `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${l.icon}/${l.icon}-${l.iconVariant || 'original'}.svg`;
const EXT = {javascript:'app.js',python:'main.py',typescript:'index.ts',java:'Main.java',csharp:'Program.cs',cpp:'main.cpp',go:'main.go',sql:'query.sql',bash:'run.sh',php:'index.php',rust:'main.rs',kotlin:'Main.kt',c:'main.c',swift:'main.swift',ruby:'app.rb',dart:'main.dart',html:'index.html',css:'style.css',scala:'Main.scala',lua:'init.lua',elixir:'app.ex',haskell:'Main.hs',r:'script.R',yaml:'config.yml',dockerfile:'Dockerfile'};

/* ---------- state ---------- */
let lang = LANGS.find(l => l.id === store.get('lang')) || LANGS.find(l => !l.prose) || LANGS[0];
const title = l => l.prose ? 'English: ' + l.name : l.name;
let tr = [];
let order = [], idx = 0;
let text = '', hl = [], pos = 0, typed = [], errors = 0, start = 0, timer = 0, done = false;

/* ---------- syntax highlight ---------- */
function highlight(t, l) {
  const kw = new Set((l.kw || '').split(/\s+/));
  const out = new Array(t.length).fill('');
  if (l.prose) { for (const m of t.matchAll(/`[^`\n]+`/g)) out.fill('s', m.index, m.index + m[0].length); return out; }
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const cm = l.comment ? esc(l.comment) + '[^\\n]*' : '(?!)';
  const block = '/\\*[\\s\\S]*?\\*/|<!--[\\s\\S]*?-->';
  const re = new RegExp(`(${cm}|${block})|("(?:\\\\.|[^"\\\\\\n])*"|'(?:\\\\.|[^'\\\\\\n])*'|\`(?:\\\\.|[^\`\\\\])*\`)|(\\b\\d+(?:\\.\\d+)?\\b)|([A-Za-z_$@][\\w$-]*)(?=\\s*\\()|([A-Za-z_$@][\\w$]*)|([{}()\\[\\];,.:=<>|&!?+\\-*/%^~])`, 'g');
  let m;
  while ((m = re.exec(t))) {
    if (m[1] && l.comment === '#' && /^#[!\w]/.test(m[1]) && ['css', 'html'].includes(l.id)) continue;
    const c = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'n' : m[4] ? (kw.has(m[4]) ? 'k' : 'f') : m[5] ? (kw.has(m[5]) || kw.has(m[5].toUpperCase()) && l.id === 'sql' ? 'k' : '') : 'p';
    for (let i = m.index; i < m.index + m[0].length; i++) out[i] = c;
  }
  return out;
}

/* ---------- snippet flow ---------- */
function shuffle(n) { const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; }
function setLang(l) {
  lang = l; store.set('lang', l.id); store.set(l.prose ? 'lastEn' : 'lastCode', l.id);
  document.body.classList.toggle('prose', !!l.prose); $('code').classList.toggle('prose', !!l.prose); $('tr').hidden = !l.prose;
  document.querySelectorAll('#modeSeg button').forEach(b => b.classList.toggle('on', (b.dataset.m === 'en') === !!l.prose));
  order = shuffle(l.snippets.length); idx = 0;
  $('langIcon').src = ICON(l); $('langName').textContent = l.name;
  $('fileName').textContent = l.file || EXT[l.id] || l.id;
  load();
}
function load() {
  const s = lang.snippets[order[idx]];
  tr = lang.prose ? s.map(x => x[1]) : [];
  text = (lang.prose ? s.map(x => x[0]).join('\n') : s).replace(/\t/g, '    ').replace(/[ \t]+$/gm, '');
  hl = highlight(text, lang);
  $('counter').textContent = `пример ${idx + 1} из ${order.length}`;
  restart();
}
function step(d) { idx = (idx + d + order.length) % order.length; load(); }
function restart() {
  pos = 0; typed = []; errors = 0; wrong = ''; missAt = new Set(); start = 0; done = false; clearInterval(timer);
  $('result').hidden = true; $('code').classList.remove('typing', 'done'); document.body.classList.remove('done');
  skipIndent(); render(); stats();
}

/* ---------- render ---------- */
function escapeHtml(c) { return c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c; }
function render() {
  let h = '';
  for (let i = 0; i < text.length; i++) {
    const c = text[i], nl = c === '\n';
    let cls = (hl[i] || '') + (i < pos ? (typed[i] ? '' : ' bad') : ' t');
    if (i === pos) cls += ' cur' + (wrong ? ' miss' : '');
    if (nl) cls += ' nl';
    if (c === ' ') cls += ' sp';
    const badge = i === pos && wrong ? `<em class="wrong">${wrong === '\n' ? '↵' : wrong === ' ' ? '␣' : escapeHtml(wrong)}</em>` : '';
    h += `<span class="${cls}">${badge}${nl ? '' : escapeHtml(c)}</span>${nl ? '\n' : ''}`;
  }
  if (pos >= text.length) h += '<span class="cur"> </span>';
  $('code').innerHTML = h;
  if (lang.prose) $('tr').textContent = tr[Math.min(tr.length - 1, text.slice(0, pos).split('\n').length - 1)] || '';
  $('progress').firstElementChild.style.width = (100 * pos / text.length) + '%';
  const cur = $('code').querySelector('.cur');
  if (cur) { const c = $('code'), l = cur.offsetLeft, w = c.clientWidth; if (l < c.scrollLeft + 40) c.scrollLeft = Math.max(0, l - 40); else if (l > c.scrollLeft + w - 60) c.scrollLeft = l - w + 60; }
  showKey();
}
const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
function wpmNow() { const sec = start ? (Date.now() - start) / 1000 : 0; const ok = typed.filter(Boolean).length; return sec > 1 ? Math.round(ok / 5 / (sec / 60)) : 0; }
function stats() {
  const sec = start ? (Date.now() - start) / 1000 : 0;
  $('wpm').textContent = wpmNow();
  const okN = typed.filter(Boolean).length + typed.filter(x => !x).length; $('acc').textContent = (okN + errors) ? Math.round(100 * okN / (okN + errors)) + '%' : '100%';
  $('time').textContent = fmt(sec); $('err').textContent = errors;
  const best = (store.get('best', {}))[lang.id];
  $('best').textContent = best ? best + ' WPM' : '—';
}

/* ---------- typing ---------- */
function isIndent(p) { for (let i = p - 1; i >= 0; i--) { if (text[i] === '\n') return true; if (text[i] !== ' ') return false; } return true; }
function skipIndent() { while (pos < text.length && text[pos] === ' ' && isIndent(pos)) { typed[pos] = true; pos++; } }
let wrong = '', missAt = new Set();
function type(ch) {
  if (done) return;
  if (!start) { start = Date.now(); timer = setInterval(stats, 250); $('code').classList.add('typing'); }
  if (ch !== text[pos]) {
    errors++; missAt.add(pos); wrong = ch;
    render(); stats(); shake(); flashWrong(ch); return;
  }
  wrong = ''; typed[pos] = !missAt.has(pos); pos++;
  if (ch === '\n') skipIndent();
  render(); stats();
  if (pos >= text.length) finish();
}
function flashWrong(ch) { const k = KEYMAP[ch] || KEYMAP[ch.toLowerCase()]; if (!k) return; k.el.classList.remove('wrongkey'); void k.el.offsetWidth; k.el.classList.add('wrongkey'); }
function shake() { const c = $('code').querySelector('.cur'); if (c) { c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake'); } }
function backspace(word) {
  if (done) return;
  if (wrong) { wrong = ''; render(); return; }
  if (pos === 0) return;
  do {
    pos--;
    while (pos > 0 && text[pos] === ' ' && isIndent(pos)) pos--;
  } while (word && pos > 0 && /\w/.test(text[pos - 1]) && /\w/.test(text[pos]));
  typed.length = pos; render(); stats();
}
function plural(n,a,b,c){const m=n%10,h=n%100;return m===1&&h!==11?a:m>=2&&m<=4&&(h<12||h>14)?b:c}
function finish() {
  done = true; clearInterval(timer); stats();
  const w = wpmNow(), acc = $('acc').textContent;
  const best = store.get('best', {}), prev = best[lang.id] || 0;
  const sec = (Date.now() - start) / 1000, accN = parseInt(acc);
  const rec = w > prev && w < 250 && sec >= 8 && accN >= 90;
  if (rec) { best[lang.id] = w; store.set('best', best); }
  const hist = store.get('hist', []); hist.unshift({ l: lang.id, w, a: acc, t: Date.now() }); store.set('hist', hist.slice(0, 200));
  $('rWpm').textContent = w;
  last = { w, acc, time: $('time').textContent, err: errors, rec };
  $('rLine').innerHTML = `${title(lang)} · точность ${acc} · ${errors} ${plural(errors,'ошибка','ошибки','ошибок')} · ${$('time').textContent}` + (rec ? `<br><span class="rec">Новый рекорд по ${lang.name}: ${w} WPM${prev ? ` (+${w - prev})` : ''}</span>` : prev ? ` · рекорд ${prev}` : '') + (()=>{const h=store.get('hist',[]).filter(x=>x.l===lang.id).slice(0,10);return h.length>1?`<br>среднее за последние ${h.length}: ${Math.round(h.reduce((a,x)=>a+x.w,0)/h.length)} WPM`:''})();
  $('result').hidden = false; $('code').classList.add('done'); document.body.classList.add('done'); render(); stats();
}


/* ---------- share card ---------- */
let last = null;
function loadImg(src) { return new Promise(r => { const i = new Image(); i.crossOrigin = 'anonymous'; i.onload = () => r(i); i.onerror = () => r(null); i.src = src; }); }
async function makeCard() {
  await document.fonts.ready;
  const W = 1200, H = 630, c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d');
  x.fillStyle = '#18181a'; x.fillRect(0, 0, W, H);
  const g = x.createRadialGradient(1000, 80, 0, 1000, 80, 520); g.addColorStop(0, '#ffd23f30'); g.addColorStop(1, '#ffd23f00');
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  const mono = w => `${w} JetBrains Mono, monospace`, sans = w => `${w} Inter, sans-serif`;
  x.textBaseline = 'alphabetic';
  x.font = mono('700 34px'); x.fillStyle = '#f2efe8'; x.fillText('code', 72, 104);
  let lw = x.measureText('code').width; x.fillStyle = '#ffd23f'; x.fillText('_', 72 + lw, 104);
  x.fillStyle = '#f2efe8'; x.fillText('typing', 72 + lw + x.measureText('_').width, 104);
  // language chip
  const img = await loadImg(ICON(lang));
  x.fillStyle = '#f4f1ea'; roundRect(x, 72, 160, 64, 64, 14); x.fill();
  if (img) x.drawImage(img, 82, 170, 44, 44);
  x.font = sans('700 34px'); x.fillStyle = '#f2efe8'; x.fillText(title(lang), 156, 204);
  // big wpm
  x.font = mono('700 210px'); x.fillStyle = '#ffd23f'; x.fillText(String(last.w), 64, 440);
  const ww = x.measureText(String(last.w)).width;
  x.font = mono('700 56px'); x.fillStyle = '#8a877f'; x.fillText('WPM', 84 + ww, 440);
  // stats
  const st = [[last.acc, 'ТОЧНОСТЬ'], [last.time, 'ВРЕМЯ'], [String(last.err), plural(last.err, 'ОШИБКА', 'ОШИБКИ', 'ОШИБОК')]];
  st.forEach(([v, l], i) => { const sx = 72 + i * 230; x.font = mono('700 44px'); x.fillStyle = '#f2efe8'; x.fillText(v, sx, 528); x.font = sans('600 16px'); x.fillStyle = '#8a877f'; x.fillText(l, sx, 556); });
  if (last.rec) { x.font = sans('700 26px'); x.fillStyle = '#18181a'; const t = 'новый рекорд'; const tw = x.measureText(t).width; x.fillStyle = '#ffd23f'; roundRect(x, W - 72 - tw - 36, 70, tw + 36, 48, 24); x.fill(); x.fillStyle = '#18181a'; x.fillText(t, W - 72 - tw - 18, 103); }
  // code preview
  x.save(); x.globalAlpha = .9; x.fillStyle = '#212124'; roundRect(x, 780, 200, 360, 250, 16); x.fill(); x.restore();
  x.font = mono('400 15px'); let y = 238;
  const COL = { k: '#c792ea', s: '#c3e88d', c: '#8b96a3', n: '#f78c6c', f: '#82aaff', p: '#89ddff', '': '#f2efe8' };
  const cw = x.measureText('M').width; let col = 0, row = 0;
  if (lang.prose) {
    const lines = [];
    text.split('\n').forEach(s => { let cur = ''; s.split(' ').forEach(w => { if (cur && (cur + ' ' + w).length > 34) { lines.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w; }); lines.push(cur); });
    x.fillStyle = COL['']; lines.slice(0, 9).forEach((s, i) => x.fillText(s, 802, y + i * 24));
  } else for (let i = 0; i < text.length && row < 9; i++) {
    if (text[i] === '\n') { row++; col = 0; continue; }
    if (col < 34) { x.fillStyle = COL[hl[i] || '']; x.fillText(text[i], 802 + col * cw, y + row * 24); }
    col++;
  }
  x.font = mono('700 24px'); x.fillStyle = '#ffd23f'; const u = 'typing.antonkulakov.com'; x.fillText(u, W - 72 - x.measureText(u).width, 556);
  return new Promise(r => c.toBlob(r, 'image/png'));
}
function roundRect(x, a, b, w, h, r) { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); }
function toast(msg) { const t = $('toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 2600); }
async function copyCard() {
  if (!last) return;
  try {
    const blob = makeCard();
    if (navigator.clipboard && window.ClipboardItem) { await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]); toast('Картинка скопирована. Вставь в Telegram или X: ⌘V'); return; }
  } catch (e) {}
  saveCard();
}
async function saveCard() {
  if (!last) return;
  const blob = await makeCard(), a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = `code-typing-${lang.id}-${last.w}wpm.png`; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000); toast('Картинка сохранена');
}

/* ---------- keyboard hint ---------- */
const FC = {L5:'#ff7eb6',L4:'#ffb86c',L3:'#ffd23f',L2:'#7ee787',T:'#9aa0a6',R2:'#4fd1c5',R3:'#82aaff',R4:'#c792ea',R5:'#ff6e6e'};
const FN = {L5:'левый мизинец',L4:'левый безымянный',L3:'левый средний',L2:'левый указательный',T:'большой палец',R2:'правый указательный',R3:'правый средний',R4:'правый безымянный',R5:'правый мизинец'};
const FI = {L5:'левым мизинцем',R5:'правым мизинцем'};
const ROWS = [
  [['`~','L5'],['1!','L5'],['2@','L4'],['3#','L3'],['4$','L2'],['5%','L2'],['6^','R2'],['7&','R2'],['8*','R3'],['9(','R4'],['0)','R5'],['-_','R5'],['=+','R5'],['BS','R5','⌫','w15']],
  [['TAB','L5','Tab','w15'],['q','L5'],['w','L4'],['e','L3'],['r','L2'],['t','L2'],['y','R2'],['u','R2'],['i','R3'],['o','R4'],['p','R5'],['[{','R5'],[']}','R5'],['\\|','R5']],
  [['CAPS','L5','Caps','w2'],['a','L5'],['s','L4'],['d','L3'],['f','L2'],['g','L2'],['h','R2'],['j','R2'],['k','R3'],['l','R4'],[';:','R5'],["'\"",'R5'],['\n','R5','Enter','w2']],
  [['LS','L5','Shift','w25'],['z','L5'],['x','L4'],['c','L3'],['v','L2'],['b','L2'],['n','R2'],['m','R2'],[',<','R3'],['.>','R4'],['/?','R5'],['RS','R5','Shift','w25']],
  [[' ','T','','sp']]
];
const KEYMAP = {};
ROWS.forEach(r => {
  const row = document.createElement('div'); row.className = 'row';
  r.forEach(([k, f, label, w]) => {
    const el = document.createElement('div');
    el.className = 'key' + (w ? ' ' + w : '') + (/^[fj]$/.test(k) ? ' home' : '');
    el.style.setProperty('--fc', FC[f]);
    if (label !== undefined) el.textContent = label;
    else if (k.length === 2) el.innerHTML = `<small>${escapeHtml(k[1])}</small>${escapeHtml(k[0])}`;
    else el.textContent = k.toUpperCase();
    const info = { el, f };
    if (label !== undefined || k.length === 1) {
      KEYMAP[k] = info;
      if (/[a-z]/.test(k)) KEYMAP[k.toUpperCase()] = { ...info, shift: true };
    } else { KEYMAP[k[0]] = info; KEYMAP[k[1]] = { ...info, shift: true }; }
    row.appendChild(el);
  });
  $('kb').appendChild(row);
});
const FINGERS = {}, H = {L5:42,L4:56,L3:64,L2:58,T:28,R2:58,R3:64,R4:56,R5:42};
[['L5','L4','L3','L2','T'],['T','R2','R3','R4','R5']].forEach((h, hi) => {
  const d = document.createElement('div'); d.className = 'hand';
  h.forEach(f => {
    const e = document.createElement('div'); e.className = 'fg'; e.style.setProperty('--fc', FC[f]); e.style.height = H[f] + 'px';
    if (f === 'T') e.style.width = '28px';
    FINGERS[f + hi] = e; d.appendChild(e);
  });
  $('hands').appendChild(d);
});
const fingerEls = f => f === 'T' ? [FINGERS.T0, FINGERS.T1] : [FINGERS[f + (f[0] === 'L' ? 0 : 1)]];
function showKey() {
  document.querySelectorAll('#kb .on, #hands .on').forEach(e => e.classList.remove('on'));
  if (done || pos >= text.length) { $('finger').textContent = ''; return; }
  const ch = pos < text.length && typed.length === pos ? text[pos] : null;
  const k = KEYMAP[ch];
  if (!k) { $('finger').textContent = ''; return; }
  k.el.classList.add('on'); fingerEls(k.f).forEach(e => e.classList.add('on'));
  let msg = `<span class="dot" style="background:${FC[k.f]}"></span>${FN[k.f]}`;
  if (k.shift) {
    const s = KEYMAP[k.f[0] === 'L' ? 'RS' : 'LS'];
    s.el.classList.add('on'); fingerEls(s.f).forEach(e => e.classList.add('on'));
    msg += ` + Shift ${FI[s.f]}`;
  }
  $('finger').innerHTML = msg;
}
function toggleKb(force) {
  const off = force ?? !document.body.classList.contains('nokb');
  document.body.classList.toggle('nokb', off); store.set('nokb', off);
}
toggleKb(store.get('nokb', false));

/* ---------- language picker ---------- */
let sel = 0, shown = [];
const PICK = [...LANGS.filter(l => l.prose), ...LANGS.filter(l => !l.prose)];
function openModal() {
  $('modal').hidden = false; $('q').value = ''; sel = Math.max(0, PICK.indexOf(lang)); drawGrid(); $('q').focus();
}
function closeModal() { $('modal').hidden = true; }
function drawGrid() {
  const q = $('q').value.trim().toLowerCase();
  shown = PICK.filter(l => !q || l.name.toLowerCase().includes(q) || l.id.includes(q) || (l.tags || '').includes(q));
  const head = (l, i) => q || (i && !!shown[i - 1].prose === !!l.prose) ? '' : `<div class="gh">${l.prose ? 'Английский для работы' : 'Языки программирования'}</div>`;
  sel = Math.min(sel, Math.max(0, shown.length - 1));
  $('grid').innerHTML = shown.length ? shown.map((l, i) =>
    head(l, i) + `<button class="lc${i === sel ? ' sel' : ''}${l === lang ? ' cur' : ''}" data-i="${i}"><img src="${ICON(l)}" alt=""><div><b>${l.name}</b><span>${l.snippets.length} примеров${store.get('best', {})[l.id] ? ' · рекорд ' + store.get('best', {})[l.id] : ''}</span></div></button>`
  ).join('') : '<div class="empty">Ничего не нашлось</div>';
  const s = $('grid').querySelector('.sel'); if (s) s.scrollIntoView({ block: 'nearest' });
}
function moveSel(key) {
  const bs = [...$('grid').querySelectorAll('.lc')], cur = bs[sel];
  if (!cur) return;
  if (key === 'ArrowRight' || key === 'ArrowLeft') sel = Math.min(Math.max(sel + (key === 'ArrowRight' ? 1 : -1), 0), bs.length - 1);
  else {
    const ys = [...new Set(bs.map(b => b.offsetTop))].sort((a, b) => a - b), ny = ys[ys.indexOf(cur.offsetTop) + (key === 'ArrowDown' ? 1 : -1)];
    if (ny === undefined) return;
    let bd = Infinity;
    bs.forEach((b, i) => { const d = Math.abs(b.offsetLeft - cur.offsetLeft); if (b.offsetTop === ny && d < bd) { bd = d; sel = i; } });
  }
  drawGrid();
}
function pick(i) { const l = shown[i]; if (!l) return; closeModal(); if (l !== lang) setLang(l); }
$('grid').addEventListener('click', e => { const b = e.target.closest('.lc'); if (b) pick(+b.dataset.i); });
$('grid').addEventListener('mousemove', e => { const b = e.target.closest('.lc'); if (b && +b.dataset.i !== sel) { sel = +b.dataset.i; drawGrid(); } });
$('q').addEventListener('input', () => { sel = 0; drawGrid(); });
$('modal').addEventListener('mousedown', e => { if (e.target.id === 'modal') closeModal(); });

/* ---------- hotkeys ---------- */
document.addEventListener('keydown', e => {
  const mod = isMac ? e.metaKey : e.ctrlKey;
  if (mod && e.key.toLowerCase() === 'k' || mod && e.code === 'KeyK') { e.preventDefault(); $('modal').hidden ? openModal() : closeModal(); return; }
  if (!$('modal').hidden) {
    if (e.key.startsWith('Arrow')) { e.preventDefault(); moveSel(e.key); }
    else if (e.key === 'Enter') { e.preventDefault(); pick(sel); }
    else if (e.key === 'Escape') { e.preventDefault(); closeModal(); }
    return;
  }
  if ((isMac ? e.metaKey : e.altKey) && e.code === 'KeyJ') { e.preventDefault(); toggleKb(); return; }
  if (e.metaKey || e.ctrlKey) return;
  if (e.key === 'Tab') { e.preventDefault(); step(e.shiftKey ? -1 : 1); return; }
  if (e.key === 'Escape') { e.preventDefault(); restart(); return; }
  if (done) { if (e.key === 'Enter') { e.preventDefault(); step(1); } else if (e.code === 'KeyC') { e.preventDefault(); copyCard(); } else if (e.code === 'KeyD') { e.preventDefault(); saveCard(); } return; }
  if (e.key === 'Backspace') { e.preventDefault(); backspace(e.altKey); return; }
  if (e.altKey && e.key.length !== 1) return;
  if (e.altKey && !isMac) return;
  const ch = e.key === 'Enter' ? '\n' : e.key;
  if (ch.length !== 1) return;
  if (e.target.tagName === 'INPUT') return;
  e.preventDefault(); type(ch);
});
$('langBtn').onclick = openModal;
document.querySelectorAll('#modeSeg button').forEach(b => b.onclick = () => {
  b.blur();
  const en = b.dataset.m === 'en';
  if (en === !!lang.prose) return;
  const l = LANGS.find(l => l.id === store.get(en ? 'lastEn' : 'lastCode') && !!l.prose === en) || LANGS.find(l => !!l.prose === en);
  if (l) setLang(l);
});
$('nextBtn').onclick = e => { e.currentTarget.blur(); step(1); };
$('restartBtn').onclick = e => { e.currentTarget.blur(); restart(); };
$('kbBtn').onclick = e => { e.currentTarget.blur(); toggleKb(); };
$('rNext').onclick = () => step(1);
$('rAgain').onclick = restart;
$('rCopy').onclick = copyCard;
$('rSave').onclick = saveCard;
document.querySelectorAll('button').forEach(b => b.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') e.preventDefault(); }));

window.addEventListener('blur', () => document.querySelector('.editor').classList.add('blurred'));
window.addEventListener('focus', () => document.querySelector('.editor').classList.remove('blurred'));
document.addEventListener('keydown', () => document.querySelector('.editor').classList.remove('blurred'), true);
if (LANGS.length) setLang(lang);
})();
