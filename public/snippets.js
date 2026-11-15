window.LANGS = [
  {
    id: 'javascript', name: 'JavaScript', icon: 'javascript', comment: '//',
    kw: 'const let var function return if else for while of in new class extends async await import export from default try catch throw this null undefined true false typeof console',
    snippets: [
`const res = await fetch('/api/users');
const users = await res.json();
const active = users.filter(u => u.active);
console.log(active.length);`,
`function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}`,
`app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});`,
`const total = cart.items
  .map(item => item.price * item.qty)
  .reduce((sum, x) => sum + x, 0);`,
`class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    return ++this.count;
  }
}`,
`const byId = {};
for (const user of users) {
  byId[user.id] = user;
}
export default byId;`,
`test('adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 1)).toBe(0);
});`,
`button.addEventListener('click', async () => {
  button.disabled = true;
  await save(form);
  button.disabled = false;
});`,
`try {
  const data = JSON.parse(raw);
  return data.items ?? [];
} catch (err) {
  console.error('bad json', err);
  return [];
}`,
`const sleep = ms => new Promise(r => setTimeout(r, ms));
const { name, age = 18, ...rest } = person;
const copy = [...list, item];`,
`import { readFile } from 'node:fs/promises';
const text = await readFile('config.json', 'utf8');
const config = JSON.parse(text);`
    ]
  },
  {
    id: 'python', name: 'Python', icon: 'python', comment: '#',
    kw: 'def return if elif else for while in not and or import from as class with try except finally raise lambda yield None True False self print len range async await pass',
    snippets: [
`def chunks(items, size):
    for i in range(0, len(items), size):
        yield items[i:i + size]`,
`with open('data.csv') as f:
    reader = csv.DictReader(f)
    rows = [r for r in reader if r['status'] == 'paid']
print(len(rows))`,
`@app.get('/users/{user_id}')
async def get_user(user_id: int):
    user = await db.fetch_user(user_id)
    if user is None:
        raise HTTPException(status_code=404)
    return user`,
`class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount`,
`counts = {}
for word in text.lower().split():
    counts[word] = counts.get(word, 0) + 1
top = sorted(counts.items(), key=lambda x: -x[1])[:10]`,
`def test_slugify():
    assert slugify('Hello World') == 'hello-world'
    assert slugify('  a  b ') == 'a-b'`,
`import requests

resp = requests.get('https://api.github.com/users/octocat')
resp.raise_for_status()
print(resp.json()['public_repos'])`,
`try:
    value = int(raw)
except ValueError:
    value = 0
finally:
    log.info('parsed %s', value)`,
`from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float`,
`df = pd.read_csv('sales.csv')
monthly = df.groupby('month')['amount'].sum()
monthly.plot(kind='bar')`,
`squares = {n: n * n for n in range(10)}
evens = [n for n in squares if n % 2 == 0]
names = ', '.join(sorted(users))`
    ]
  },
  {
    id: 'typescript', name: 'TypeScript', icon: 'typescript', comment: '//',
    kw: 'const let function return if else for of in new class interface type extends implements async await import export from default readonly private public enum keyof as string number boolean void null undefined true false',
    snippets: [
`interface User {
  id: number;
  name: string;
  email?: string;
}`,
`export async function getUser(id: number): Promise<User> {
  const res = await fetch('/api/users/' + id);
  if (!res.ok) throw new Error('not found');
  return res.json();
}`,
`type Status = 'idle' | 'loading' | 'done';

function label(s: Status): string {
  return s === 'loading' ? 'Please wait' : s;
}`,
`function groupBy<T>(items: T[], key: keyof T) {
  const out: Record<string, T[]> = {};
  for (const item of items) {
    const k = String(item[key]);
    (out[k] ??= []).push(item);
  }
  return out;
}`,
`class Cache<V> {
  private store = new Map<string, V>();
  get(key: string): V | undefined {
    return this.store.get(key);
  }
}`,
`enum Role {
  Admin = 'admin',
  Editor = 'editor',
  Viewer = 'viewer',
}`,
`export const handler = async (event: APIEvent) => {
  const body = JSON.parse(event.body ?? '{}');
  return { statusCode: 200, body: JSON.stringify(body) };
};`,
`const [count, setCount] = useState<number>(0);
useEffect(() => {
  document.title = 'Clicks: ' + count;
}, [count]);`,
`type Partialize<T> = {
  [K in keyof T]?: T[K];
};
type Draft = Partialize<User>;`,
`it('returns empty list', async () => {
  const items = await repo.findAll();
  expect(items).toEqual([]);
});`
    ]
  },
  {
    id: 'java', name: 'Java', icon: 'java', comment: '//',
    kw: 'public private protected static final class interface extends implements return if else for while new void int long boolean String this null true false try catch throw throws import package var',
    snippets: [
`public class Greeter {
    private final String name;

    public Greeter(String name) {
        this.name = name;
    }
}`,
`List<String> names = users.stream()
    .filter(User::isActive)
    .map(User::getName)
    .sorted()
    .toList();`,
`@GetMapping("/orders/{id}")
public Order getOrder(@PathVariable long id) {
    return repo.findById(id)
        .orElseThrow(NotFoundException::new);
}`,
`Map<String, Integer> counts = new HashMap<>();
for (String word : words) {
    counts.merge(word, 1, Integer::sum);
}`,
`try (var reader = Files.newBufferedReader(path)) {
    return reader.lines().count();
} catch (IOException e) {
    throw new UncheckedIOException(e);
}`,
`@Test
void addsItemToCart() {
    Cart cart = new Cart();
    cart.add(new Item("book", 12));
    assertEquals(1, cart.size());
}`,
`public record Point(int x, int y) {
    public double distance() {
        return Math.sqrt(x * x + y * y);
    }
}`,
`public interface Shape {
    double area();

    default String describe() {
        return "Area: " + area();
    }
}`,
`ExecutorService pool = Executors.newFixedThreadPool(4);
Future<String> f = pool.submit(() -> load(url));
String body = f.get(5, TimeUnit.SECONDS);
pool.shutdown();`,
`Optional<User> user = repo.findByEmail(email);
String name = user.map(User::getName)
    .orElse("guest");`
    ]
  },
  {
    id: 'csharp', name: 'C#', icon: 'csharp', comment: '//',
    kw: 'public private protected internal static readonly class record interface namespace using return if else foreach for while new var void int string bool async await Task this null true false try catch throw get set',
    snippets: [
`public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
}`,
`var expensive = products
    .Where(p => p.Price > 100)
    .OrderBy(p => p.Name)
    .Select(p => p.Name)
    .ToList();`,
`app.MapGet("/todos/{id}", async (int id, AppDb db) =>
    await db.Todos.FindAsync(id) is Todo t
        ? Results.Ok(t)
        : Results.NotFound());`,
`public async Task<string> LoadAsync(string url)
{
    using var client = new HttpClient();
    return await client.GetStringAsync(url);
}`,
`public record Money(decimal Amount, string Currency);

var price = new Money(10m, "USD");
var sale = price with { Amount = 8m };`,
`[Fact]
public void Sum_ReturnsTotal()
{
    var calc = new Calculator();
    Assert.Equal(5, calc.Sum(2, 3));
}`,
`foreach (var line in File.ReadLines("log.txt"))
{
    if (line.Contains("ERROR"))
        Console.WriteLine(line);
}`,
`var dict = new Dictionary<string, int>();
if (!dict.TryGetValue(key, out var count))
    count = 0;
dict[key] = count + 1;`,
`public interface IRepository<T>
{
    Task<T?> GetAsync(int id);
    Task AddAsync(T item);
}`,
`try
{
    await service.RunAsync(token);
}
catch (OperationCanceledException)
{
    logger.LogInformation("Cancelled");
}`
    ]
  },
  {
    id: 'cpp', name: 'C++', icon: 'cplusplus', comment: '//',
    kw: 'int void char bool double float auto const return if else for while class struct public private template typename namespace using std new delete nullptr true false include',
    snippets: [
`#include <iostream>

int main() {
    std::cout << "Hello, world!" << std::endl;
    return 0;
}`,
`std::vector<int> nums = {5, 3, 8, 1};
std::sort(nums.begin(), nums.end());
for (int n : nums) {
    std::cout << n << ' ';
}`,
`class Stack {
public:
    void push(int x) { data.push_back(x); }
    int top() const { return data.back(); }
    void pop() { data.pop_back(); }
private:
    std::vector<int> data;
};`,
`template <typename T>
T clamp(T value, T lo, T hi) {
    return value < lo ? lo : (value > hi ? hi : value);
}`,
`std::unordered_map<std::string, int> freq;
for (const auto& word : words) {
    ++freq[word];
}`,
`auto ptr = std::make_unique<Widget>(42);
ptr->draw();
std::shared_ptr<Node> head = std::make_shared<Node>();`,
`std::ifstream in("input.txt");
std::string line;
while (std::getline(in, line)) {
    lines.push_back(line);
}`,
`auto it = std::find_if(users.begin(), users.end(),
    [](const User& u) { return u.age > 30; });
if (it != users.end()) {
    std::cout << it->name;
}`,
`struct Point {
    double x = 0;
    double y = 0;
    double len() const { return std::hypot(x, y); }
};`,
`std::thread worker([&] {
    process(queue);
});
worker.join();`
    ]
  },
  {
    id: 'go', name: 'Go', icon: 'go', comment: '//',
    kw: 'package import func return if else for range var const type struct interface map chan go defer select switch case default nil true false err string int bool error make append len',
    snippets: [
`func handler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"ok": "1"})
}`,
`type User struct {
    ID    int    ` + '`json:"id"`' + `
    Name  string ` + '`json:"name"`' + `
}`,
`f, err := os.Open("config.yaml")
if err != nil {
    return fmt.Errorf("open config: %w", err)
}
defer f.Close()`,
`func Sum(nums []int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}`,
`var wg sync.WaitGroup
for _, url := range urls {
    wg.Add(1)
    go func(u string) {
        defer wg.Done()
        fetch(u)
    }(url)
}
wg.Wait()`,
`func TestSum(t *testing.T) {
    got := Sum([]int{1, 2, 3})
    if got != 6 {
        t.Errorf("Sum = %d, want 6", got)
    }
}`,
`type Store interface {
    Get(key string) (string, error)
    Set(key, value string) error
}`,
`ctx, cancel := context.WithTimeout(ctx, 2*time.Second)
defer cancel()
rows, err := db.QueryContext(ctx, "SELECT id FROM users")`,
`select {
case msg := <-messages:
    fmt.Println("got", msg)
case <-time.After(time.Second):
    fmt.Println("timeout")
}`,
`counts := make(map[string]int)
for _, w := range strings.Fields(text) {
    counts[strings.ToLower(w)]++
}`
    ]
  },
  {
    id: 'sql', name: 'SQL', icon: 'postgresql', comment: '--',
    kw: 'SELECT FROM WHERE JOIN LEFT INNER ON GROUP BY ORDER HAVING LIMIT INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE INDEX AS AND OR NOT NULL COUNT SUM AVG DISTINCT PRIMARY KEY WITH DESC ASC',
    snippets: [
`SELECT id, name, email
FROM users
WHERE created_at > now() - interval '7 days'
ORDER BY created_at DESC
LIMIT 20;`,
`SELECT c.name, COUNT(o.id) AS orders
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.name
HAVING COUNT(o.id) > 5;`,
`CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);`,
`INSERT INTO tags (name)
VALUES ('sql'), ('postgres'), ('backend')
ON CONFLICT (name) DO NOTHING;`,
`UPDATE accounts
SET balance = balance - 100
WHERE id = 42 AND balance >= 100;`,
`WITH monthly AS (
  SELECT date_trunc('month', paid_at) AS m,
         SUM(amount) AS total
  FROM payments
  GROUP BY 1
)
SELECT * FROM monthly ORDER BY m;`,
`CREATE INDEX idx_orders_user
ON orders (user_id, created_at DESC);
ANALYZE orders;`,
`SELECT name, salary,
       RANK() OVER (PARTITION BY dept ORDER BY salary DESC)
FROM employees;`,
`DELETE FROM sessions
WHERE expires_at < now()
RETURNING id;`,
`SELECT DISTINCT country
FROM users
WHERE country IS NOT NULL
ORDER BY country;`
    ]
  },
  {
    id: 'bash', name: 'Bash', icon: 'bash', comment: '#',
    kw: 'if then else elif fi for in do done while case esac function return local export echo exit set read cd grep sed awk',
    snippets: [
`#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
echo "Building..."`,
`for f in *.jpg; do
  convert "$f" -resize 50% "small_$f"
done`,
`if [ -z "$API_KEY" ]; then
  echo "API_KEY is not set" >&2
  exit 1
fi`,
`find . -name '*.log' -mtime +7 -delete
du -sh * | sort -h | tail -5
df -h /`,
`backup() {
  local src=$1
  local dest=$2
  tar -czf "$dest/backup-$(date +%F).tgz" "$src"
}`,
`grep -rn 'TODO' src/ | wc -l
git log --oneline -10
ps aux | grep node | awk '{print $2}'`,
`while read -r line; do
  echo "line: $line"
done < input.txt`,
`case "$1" in
  start) docker compose up -d ;;
  stop) docker compose down ;;
  *) echo "usage: $0 start|stop" ;;
esac`,
`curl -s https://api.github.com/repos/torvalds/linux |
  jq '.stargazers_count' |
  xargs echo stars:`,
`export PATH="$HOME/.local/bin:$PATH"
alias ll='ls -la'
source ~/.bashrc`
    ]
  },
  {
    id: 'php', name: 'PHP', icon: 'php', comment: '//',
    kw: 'function return if else elseif foreach for while as class public private protected static new echo array null true false use namespace try catch throw this fn match',
    snippets: [
`<?php

function greet(string $name): string
{
    return "Hello, " . $name;
}`,
`$active = array_filter($users, fn($u) => $u['active']);
$names = array_map(fn($u) => $u['name'], $active);
echo implode(', ', $names);`,
`class User
{
    public function __construct(
        public readonly int $id,
        public string $name,
    ) {}
}`,
`Route::get('/posts/{post}', function (Post $post) {
    return view('posts.show', ['post' => $post]);
});`,
`$stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');
$stmt->execute([$id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);`,
`foreach ($items as $key => $value) {
    if ($value === null) {
        continue;
    }
    $result[$key] = trim($value);
}`,
`$label = match ($status) {
    'new' => 'New order',
    'paid' => 'Paid',
    default => 'Unknown',
};`,
`try {
    $data = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
    error_log($e->getMessage());
}`,
`public function testTotal(): void
{
    $cart = new Cart();
    $cart->add(new Item('pen', 3));
    $this->assertSame(3, $cart->total());
}`,
`$posts = Post::where('published', true)
    ->orderBy('created_at', 'desc')
    ->take(10)
    ->get();`
    ]
  },
  {
    id: 'rust', name: 'Rust', icon: 'rust', comment: '//',
    kw: 'fn let mut const struct enum impl trait pub use mod match if else for in while loop return self Self Some None Ok Err Result Option String Vec true false async await move ref where',
    snippets: [
`fn main() {
    let name = "world";
    println!("Hello, {}!", name);
}`,
`#[derive(Debug, Clone)]
struct User {
    id: u32,
    name: String,
}`,
`fn read_config(path: &str) -> Result<String, io::Error> {
    let text = fs::read_to_string(path)?;
    Ok(text.trim().to_string())
}`,
`let evens: Vec<i32> = nums
    .iter()
    .filter(|n| *n % 2 == 0)
    .cloned()
    .collect();`,
`match cmd.as_str() {
    "start" => server.start(),
    "stop" => server.stop(),
    _ => eprintln!("unknown command"),
}`,
`impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}`,
`let mut counts = HashMap::new();
for word in text.split_whitespace() {
    *counts.entry(word).or_insert(0) += 1;
}`,
`#[test]
fn adds_numbers() {
    assert_eq!(add(2, 2), 4);
}`,
`enum Shape {
    Circle(f64),
    Square(f64),
}`,
`if let Some(user) = users.get(&id) {
    println!("found {}", user.name);
} else {
    println!("no user");
}`
    ]
  },
  {
    id: 'kotlin', name: 'Kotlin', icon: 'kotlin', comment: '//',
    kw: 'fun val var class data object interface return if else when for in while is as null true false override private public suspend import package this it',
    snippets: [
`data class User(val id: Int, val name: String)

val users = listOf(User(1, "Ann"), User(2, "Bob"))
val names = users.map { it.name }`,
`fun greet(name: String?): String {
    return "Hello, " + (name ?: "guest")
}`,
`val label = when (status) {
    Status.NEW -> "New"
    Status.DONE -> "Done"
    else -> "Unknown"
}`,
`suspend fun loadUser(id: Int): User =
    withContext(Dispatchers.IO) {
        api.getUser(id)
    }`,
`class Counter {
    private var count = 0
    fun inc(): Int {
        count += 1
        return count
    }
}`,
`@Test
fun sumWorks() {
    assertEquals(6, listOf(1, 2, 3).sum())
}`,
`val grouped = orders
    .filter { it.paid }
    .groupBy { it.customerId }
    .mapValues { (_, list) -> list.size }`
    ]
  },
  {
    id: 'c', name: 'C', icon: 'c', comment: '//',
    kw: 'int char void float double long unsigned const static struct typedef return if else for while do switch case break continue sizeof NULL include define',
    snippets: [
`#include <stdio.h>

int main(void) {
    printf("Hello, world!");
    return 0;
}`,
`int sum(const int *arr, size_t n) {
    int total = 0;
    for (size_t i = 0; i < n; i++)
        total += arr[i];
    return total;
}`,
`typedef struct {
    char name[32];
    int age;
} Person;`,
`char *buf = malloc(len + 1);
if (buf == NULL) {
    perror("malloc");
    return -1;
}
free(buf);`,
`FILE *fp = fopen("data.txt", "r");
if (!fp) return 1;
while (fgets(line, sizeof line, fp))
    count++;
fclose(fp);`,
`void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}`
    ]
  },
  {
    id: 'swift', name: 'Swift', icon: 'swift', comment: '//',
    kw: 'func let var struct class enum protocol extension return if else guard for in while switch case import self nil true false async await throws try some private',
    snippets: [
`struct User: Codable {
    let id: Int
    let name: String
}`,
`func fetchUser(id: Int) async throws -> User {
    let url = URL(string: "https://api.example.com/u")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode(User.self, from: data)
}`,
`struct ContentView: View {
    @State private var count = 0
    var body: some View {
        Button("Tap") { count += 1 }
    }
}`,
`guard let email = form.email, !email.isEmpty else {
    showError("Email required")
    return
}`,
`let adults = people
    .filter { $0.age >= 18 }
    .map { $0.name }
    .sorted()`,
`enum Direction {
    case north, south, east, west
}`,
`extension String {
    var isBlank: Bool {
        trimmingCharacters(in: .whitespaces).isEmpty
    }
}`
    ]
  },
  {
    id: 'ruby', name: 'Ruby', icon: 'ruby', comment: '#',
    kw: 'def end class module if elsif else unless do return yield self nil true false require attr_reader attr_accessor puts each map include private',
    snippets: [
`class User
  attr_reader :name, :email

  def initialize(name, email)
    @name = name
    @email = email
  end
end`,
`totals = orders
  .select(&:paid?)
  .group_by(&:customer_id)
  .transform_values { |list| list.sum(&:amount) }`,
`get '/hello/:name' do
  "Hello, #{params[:name]}!"
end`,
`File.foreach('app.log') do |line|
  puts line if line.include?('ERROR')
end`,
`describe Cart do
  it 'sums items' do
    cart = Cart.new([3, 4])
    expect(cart.total).to eq(7)
  end
end`,
`def greet(name = 'guest')
  return 'Hi!' if name.empty?
  "Hello, #{name.capitalize}"
end`,
`posts = Post.where(published: true)
            .order(created_at: :desc)
            .limit(10)`
    ]
  },
  {
    id: 'dart', name: 'Dart', icon: 'dart', comment: '//',
    kw: 'void final var const class extends return if else for in while async await import new this null true false late required Future String int double bool override',
    snippets: [
`class User {
  final int id;
  final String name;

  User({required this.id, required this.name});
}`,
`Future<List<String>> loadNames() async {
  final res = await http.get(Uri.parse(apiUrl));
  final list = jsonDecode(res.body) as List;
  return list.map((e) => e['name'] as String).toList();
}`,
`class Counter extends StatelessWidget {
  const Counter({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text('0');
  }
}`,
`final evens = [1, 2, 3, 4, 5]
    .where((n) => n.isEven)
    .toList();`,
`void main() {
  test('adds', () {
    expect(add(1, 2), equals(3));
  });
}`,
`String greet(String? name) {
  return 'Hello, ' + (name ?? 'guest');
}`
    ]
  },
  {
    id: 'html', name: 'HTML', icon: 'html5', comment: '',
    kw: 'html head body div span a p ul li img form input button label section header footer nav main script link meta title h1 h2 class id href src type',
    snippets: [
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>My Page</title>
</head>
<body></body>
</html>`,
`<nav class="menu">
  <a href="/">Home</a>
  <a href="/blog">Blog</a>
  <a href="/about">About</a>
</nav>`,
`<form action="/login" method="post">
  <label for="email">Email</label>
  <input id="email" type="email" required>
  <button type="submit">Sign in</button>
</form>`,
`<ul class="todo">
  <li class="done">Buy milk</li>
  <li>Write code</li>
  <li>Go running</li>
</ul>`,
`<figure>
  <img src="cat.jpg" alt="A sleeping cat" width="400">
  <figcaption>My cat on Sunday</figcaption>
</figure>`,
`<table>
  <tr><th>Name</th><th>Score</th></tr>
  <tr><td>Ann</td><td>92</td></tr>
  <tr><td>Bob</td><td>87</td></tr>
</table>`
    ]
  },
  {
    id: 'css', name: 'CSS', icon: 'css3', comment: '',
    kw: 'display flex grid color background margin padding border width height font position absolute relative none auto important media hover root var',
    snippets: [
`.card {
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}`,
`.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}`,
`:root {
  --accent: #ffcc00;
  --text: #222;
}
a { color: var(--accent); }`,
`.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}`,
`@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
}`,
`.button:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}`
    ]
  },
  {
    id: 'scala', name: 'Scala', icon: 'scala', comment: '//',
    kw: 'def val var object class case trait extends with match if else for yield import new return true false null Option Some None List',
    snippets: [
`case class User(id: Int, name: String)

val users = List(User(1, "Ann"), User(2, "Bob"))
val names = users.map(_.name)`,
`def describe(x: Any): String = x match {
  case 0 => "zero"
  case s: String => "string " + s
  case _ => "other"
}`,
`object Main extends App {
  println("Hello, Scala!")
}`,
`val total = orders
  .filter(_.paid)
  .map(_.amount)
  .sum`,
`trait Greeter {
  def greet(name: String): String =
    "Hello, " + name
}`,
`for {
  user <- findUser(id)
  email <- user.email
} yield email`
    ]
  },
  {
    id: 'lua', name: 'Lua', icon: 'lua', comment: '--',
    kw: 'local function end if then else elseif for in do while return nil true false and or not pairs ipairs print require',
    snippets: [
`local function greet(name)
  return "Hello, " .. (name or "guest")
end
print(greet("Lua"))`,
`local scores = { ann = 92, bob = 87 }
for name, score in pairs(scores) do
  print(name, score)
end`,
`local Player = {}
Player.__index = Player

function Player.new(name)
  return setmetatable({ name = name, hp = 100 }, Player)
end`,
`function love.update(dt)
  player.x = player.x + player.speed * dt
end`,
`local sum = 0
for i = 1, #nums do
  sum = sum + nums[i]
end`,
`local ok, err = pcall(load_config, "app.lua")
if not ok then
  print("error: " .. err)
end`
    ]
  },
  {
    id: 'elixir', name: 'Elixir', icon: 'elixir', comment: '#',
    kw: 'def defp defmodule do end fn case cond with if else import alias use true false nil when',
    snippets: [
`defmodule Greeter do
  def hello(name) do
    "Hello, " <> name
  end
end`,
`users
|> Enum.filter(& &1.active)
|> Enum.map(& &1.name)
|> Enum.sort()`,
`case File.read("config.json") do
  {:ok, body} -> Jason.decode!(body)
  {:error, reason} -> raise "failed: #{reason}"
end`,
`defmodule MathUtil do
  def fact(0), do: 1
  def fact(n) when n > 0, do: n * fact(n - 1)
end`,
`test "adds numbers" do
  assert Math.add(1, 2) == 3
end`,
`def show(conn, %{"id" => id}) do
  post = Blog.get_post!(id)
  render(conn, :show, post: post)
end`
    ]
  },
  {
    id: 'haskell', name: 'Haskell', icon: 'haskell', comment: '--',
    kw: 'module where import data type newtype class instance deriving let in case of if then else do return otherwise Maybe Just Nothing IO',
    snippets: [
`main :: IO ()
main = do
  name <- getLine
  putStrLn ("Hello, " ++ name)`,
`factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)`,
`data Shape
  = Circle Double
  | Rect Double Double
  deriving (Show, Eq)`,
`area :: Shape -> Double
area (Circle r) = pi * r * r
area (Rect w h) = w * h`,
`evensSquared :: [Int] -> [Int]
evensSquared xs =
  [x * x | x <- xs, even x]`,
`safeDiv :: Int -> Int -> Maybe Int
safeDiv _ 0 = Nothing
safeDiv a b = Just (a ` + '`div`' + ` b)`
    ]
  },
  {
    id: 'r', name: 'R', icon: 'r', comment: '#',
    kw: 'function if else for in while return library TRUE FALSE NULL NA c list data.frame print',
    snippets: [
`df <- read.csv("sales.csv")
summary(df)
head(df, 10)`,
`library(dplyr)
df %>%
  filter(amount > 0) %>%
  group_by(month) %>%
  summarise(total = sum(amount))`,
`square <- function(x) {
  x * x
}
sapply(1:5, square)`,
`library(ggplot2)
ggplot(df, aes(x = month, y = total)) +
  geom_col() +
  theme_minimal()`,
`model <- lm(price ~ area + rooms, data = houses)
summary(model)
predict(model, newdata = test)`,
`scores <- c(ann = 92, bob = 87, eve = 95)
mean(scores)
names(which.max(scores))`
    ]
  },
  {
    id: 'yaml', name: 'YAML', icon: 'yaml', comment: '#',
    kw: 'name on jobs steps uses run with env image services ports volumes version apiVersion kind metadata spec true false',
    snippets: [
`name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test`,
`services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: example
    ports:
      - "5432:5432"`,
`apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3`,
`server:
  host: 0.0.0.0
  port: 8080
logging:
  level: info`,
`- name: Install nginx
  apt:
    name: nginx
    state: present
  become: true`,
`users:
  - name: ann
    roles: [admin, editor]
  - name: bob
    roles: [viewer]`
    ]
  },
  {
    id: 'dockerfile', name: 'Dockerfile', icon: 'docker', comment: '#',
    kw: 'FROM RUN COPY ADD WORKDIR CMD ENTRYPOINT ENV EXPOSE ARG USER VOLUME LABEL AS HEALTHCHECK',
    snippets: [
`FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
CMD ["node", "server.js"]`,
`FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "main.py"]`,
`FROM golang:1.22 AS build
WORKDIR /src
COPY . .
RUN go build -o /app ./cmd/server

FROM gcr.io/distroless/base
COPY --from=build /app /app
ENTRYPOINT ["/app"]`,
`FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
EXPOSE 80`,
`ARG VERSION=latest
FROM ubuntu:24.04
RUN apt-get update && apt-get install -y curl
ENV APP_ENV=production
USER nobody`,
`FROM eclipse-temurin:21-jre
COPY target/app.jar /app.jar
HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1
ENTRYPOINT ["java", "-jar", "/app.jar"]`
    ]
  }
];
