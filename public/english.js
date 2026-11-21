/* Английский для работы: каждое упражнение — несколько фраз, каждая фраза — пара [английский, перевод].
   Только символы, которые есть на обычной клавиатуре: прямой апостроф, дефис, без длинных тире. */
window.LANGS.push(
  {
    id: 'en-review', name: 'Code review', prose: true, icon: 'CR', file: 'review.md',
    tags: 'english английский ревью код-ревью review',
    snippets: [
      [
        ["Nice catch, thanks for flagging this.", "Хорошо подмечено, спасибо, что обратил на это внимание."],
        ["I think we can simplify this function a bit.", "Думаю, эту функцию можно немного упростить."],
        ["What do you think about extracting it into a helper?", "Как смотришь на то, чтобы вынести это в хелпер?"]
      ],
      [
        ["Could you add a test for this edge case?", "Можешь добавить тест на этот граничный случай?"],
        ["It looks like we don't handle empty input here.", "Похоже, мы здесь не обрабатываем пустой ввод."],
        ["Otherwise this looks good to me.", "В остальном, на мой взгляд, всё хорошо."]
      ],
      [
        ["Nit: this variable name is a bit confusing.", "Мелочь: имя этой переменной немного сбивает с толку."],
        ["Maybe rename it to something more descriptive?", "Может, переименовать во что-то более понятное?"],
        ["Not a blocker, feel free to ignore.", "Это не блокер, можно проигнорировать."]
      ],
      [
        ["LGTM, just a couple of minor comments.", "Выглядит хорошо, всего пара мелких замечаний."],
        ["Feel free to merge once CI is green.", "Можно мержить, как только CI станет зелёным."],
        ["Thanks for the quick turnaround!", "Спасибо, что сделал так быстро!"]
      ],
      [
        ["I'm not sure I understand why we need this check.", "Не уверен, что понимаю, зачем нужна эта проверка."],
        ["Could you explain the reasoning behind it?", "Можешь объяснить, какая за ней логика?"],
        ["A short comment in the code would help future readers.", "Короткий комментарий в коде помог бы тем, кто будет читать его потом."]
      ],
      [
        ["This might cause a race condition under heavy load.", "Под большой нагрузкой это может привести к состоянию гонки."],
        ["Have you considered using a lock here?", "Ты не думал использовать здесь блокировку?"],
        ["Happy to pair on this if it helps.", "С радостью разберу это вместе с тобой, если нужно."]
      ],
      [
        ["Can we split this pull request into smaller ones?", "Можем разбить этот пул-реквест на несколько поменьше?"],
        ["It's hard to review so many changes at once.", "Трудно ревьюить столько изменений за раз."],
        ["The refactoring could go in separately.", "Рефакторинг можно влить отдельно."]
      ],
      [
        ["This duplicates the logic we already have in the auth module.", "Это дублирует логику, которая уже есть в модуле авторизации."],
        ["Let's reuse the existing function instead.", "Давай лучше возьмём существующую функцию."],
        ["That way we only have to fix bugs in one place.", "Тогда баги придётся чинить только в одном месте."]
      ],
      [
        ["Good point, I missed that.", "Верное замечание, я это упустил."],
        ["I've pushed a fix, could you take another look?", "Я запушил исправление, посмотришь ещё раз?"],
        ["Let me know if anything else needs to change.", "Дай знать, если нужно поменять что-то ещё."]
      ],
      [
        ["I'd prefer to keep this change out of scope.", "Я бы не стал включать это изменение в текущую задачу."],
        ["Let's create a separate ticket and address it later.", "Давай заведём отдельный тикет и займёмся этим позже."],
        ["I don't want to block the release on it.", "Не хочу задерживать из-за этого релиз."]
      ],
      [
        ["Please don't hardcode the timeout value.", "Пожалуйста, не зашивай значение таймаута в код."],
        ["It should come from the config instead.", "Оно должно браться из конфига."],
        ["We already have `REQUEST_TIMEOUT` for that.", "Для этого у нас уже есть `REQUEST_TIMEOUT`."]
      ],
      [
        ["This is much cleaner than the previous version.", "Это гораздо чище, чем прошлая версия."],
        ["I left one question about error handling.", "Я оставил один вопрос про обработку ошибок."],
        ["Approving, the rest is up to you.", "Одобряю, остальное на твоё усмотрение."]
      ]
    ]
  },
  {
    id: 'en-pr', name: 'Pull requests', prose: true, icon: 'PR', file: 'pull_request.md',
    tags: 'english английский коммиты commits pr пул-реквесты описание',
    snippets: [
      [
        ["This PR adds retry logic to the payment client.", "Этот PR добавляет повторные попытки в платёжный клиент."],
        ["Failed requests are now retried up to three times.", "Неудачные запросы теперь повторяются до трёх раз."],
        ["No changes to the public API.", "Публичный API не меняется."]
      ],
      [
        ["Fix a crash when the user profile is missing.", "Исправить падение, когда у пользователя нет профиля."],
        ["The root cause was a null check in the wrong place.", "Причиной была проверка на null не в том месте."],
        ["Added a regression test to cover this case.", "Добавлен регрессионный тест на этот случай."]
      ],
      [
        ["How to test: run the migration and restart the server.", "Как проверить: запусти миграцию и перезапусти сервер."],
        ["Then open the settings page and change your email.", "Затем открой страницу настроек и поменяй почту."],
        ["You should receive a confirmation message.", "Должно прийти письмо с подтверждением."]
      ],
      [
        ["This change is behind a feature flag.", "Это изменение спрятано за фича-флагом."],
        ["It is disabled by default in production.", "В продакшене оно по умолчанию выключено."],
        ["We will roll it out gradually next week.", "Будем постепенно раскатывать на следующей неделе."]
      ],
      [
        ["Refactor the user service to remove duplicated code.", "Отрефакторить сервис пользователей, чтобы убрать дублирование."],
        ["There are no functional changes in this commit.", "В этом коммите нет изменений в поведении."],
        ["It only makes the next step easier.", "Он только упрощает следующий шаг."]
      ],
      [
        ["Bump the dependency to the latest stable version.", "Обновить зависимость до последней стабильной версии."],
        ["This fixes a known security vulnerability.", "Это закрывает известную уязвимость."],
        ["See the changelog for more details.", "Подробности смотри в списке изменений."]
      ],
      [
        ["This is a work in progress, please don't merge yet.", "Работа ещё не закончена, пожалуйста, пока не мержите."],
        ["I still need to update the docs and add tests.", "Мне ещё нужно обновить документацию и добавить тесты."],
        ["Early feedback is very welcome.", "Буду очень рад раннему фидбэку."]
      ],
      [
        ["Rebased on top of main and resolved the conflicts.", "Сделал rebase на main и разрешил конфликты."],
        ["The build was failing because of a flaky test.", "Сборка падала из-за нестабильного теста."],
        ["I've restarted it, and now everything passes.", "Я перезапустил её, и теперь всё проходит."]
      ],
      [
        ["Breaking change: the old endpoint has been removed.", "Ломающее изменение: старый эндпоинт удалён."],
        ["Clients should switch to the new version of the API.", "Клиентам нужно перейти на новую версию API."],
        ["The migration guide is linked below.", "Ссылка на руководство по миграции ниже."]
      ],
      [
        ["Improve the performance of the search query.", "Улучшить производительность поискового запроса."],
        ["The response time dropped from two seconds to 300 ms.", "Время ответа упало с двух секунд до 300 мс."],
        ["I added an index on the `created_at` column.", "Я добавил индекс на колонку `created_at`."]
      ],
      [
        ["Revert the previous commit because it broke the build.", "Откатить предыдущий коммит, потому что он сломал сборку."],
        ["I will open a follow-up PR with a proper fix.", "Я открою следующий PR с нормальным исправлением."],
        ["Sorry for the noise.", "Извините за лишний шум."]
      ],
      [
        ["Closes the issue about slow page loads.", "Закрывает задачу про медленную загрузку страниц."],
        ["Screenshots before and after are attached.", "Скриншоты до и после приложены."],
        ["Let me know if you want me to add benchmarks.", "Скажите, если нужно добавить бенчмарки."]
      ]
    ]
  },
  {
    id: 'en-standup', name: 'Стендапы', prose: true, icon: 'SU', file: 'standup.md',
    tags: 'english английский standup stand-up daily статус отчёт',
    snippets: [
      [
        ["Yesterday I finished the login page.", "Вчера я закончил страницу входа."],
        ["Today I'm going to work on password reset.", "Сегодня займусь сбросом пароля."],
        ["No blockers so far.", "Пока ничего не мешает."]
      ],
      [
        ["I'm still working on the export feature.", "Я всё ещё работаю над экспортом."],
        ["It's taking longer than I expected.", "Это занимает больше времени, чем я ожидал."],
        ["I should have it ready by tomorrow.", "К завтрашнему дню должно быть готово."]
      ],
      [
        ["I'm blocked by the backend team right now.", "Сейчас я заблокирован командой бэкенда."],
        ["I need the new endpoint to continue.", "Чтобы продолжить, мне нужен новый эндпоинт."],
        ["In the meantime, I'll pick up a smaller task.", "А пока возьму задачу поменьше."]
      ],
      [
        ["I spent most of the day debugging a memory leak.", "Большую часть дня я отлаживал утечку памяти."],
        ["I found the cause, but the fix is not trivial.", "Причину я нашёл, но исправить её непросто."],
        ["I'll share an update by the end of the day.", "К концу дня расскажу, как продвигается."]
      ],
      [
        ["The feature is done and ready for review.", "Фича готова, можно ревьюить."],
        ["I'd appreciate it if someone could take a look today.", "Буду благодарен, если кто-нибудь посмотрит сегодня."],
        ["After that, I'll start on the next ticket.", "После этого возьмусь за следующий тикет."]
      ],
      [
        ["We are on track to release on Friday.", "Мы идём по графику и успеваем к релизу в пятницу."],
        ["Two tasks are still in progress.", "Две задачи ещё в работе."],
        ["The rest have already been tested.", "Остальные уже протестированы."]
      ],
      [
        ["I'll be out of office tomorrow afternoon.", "Завтра после обеда меня не будет."],
        ["I have a doctor's appointment.", "Я записан к врачу."],
        ["You can reach me in the chat if something is urgent.", "Если что-то срочное, пишите мне в чат."]
      ],
      [
        ["I need more time to estimate this task.", "Мне нужно больше времени, чтобы оценить эту задачу."],
        ["The requirements are still not clear to me.", "Мне всё ещё не до конца понятны требования."],
        ["Could we discuss them after the standup?", "Можем обсудить их после стендапа?"]
      ],
      [
        ["The deadline is at risk because of the new requirements.", "Срок под угрозой из-за новых требований."],
        ["We either need more people or a smaller scope.", "Нам нужно либо больше людей, либо меньше объём работы."],
        ["I suggest we cut the reports for now.", "Предлагаю пока отказаться от отчётов."]
      ],
      [
        ["I paired with a teammate on the flaky tests yesterday.", "Вчера мы с коллегой вместе разбирались с нестабильными тестами."],
        ["We fixed three of them.", "Три из них мы починили."],
        ["Two more are left, and I'll finish them today.", "Осталось ещё два, закончу их сегодня."]
      ],
      [
        ["Nothing new from my side.", "С моей стороны ничего нового."],
        ["I'm waiting for feedback on my pull request.", "Жду фидбэк по своему пул-реквесту."],
        ["Meanwhile, I'm reading the docs for the new service.", "А пока читаю документацию по новому сервису."]
      ],
      [
        ["I deployed the fix to staging this morning.", "Сегодня утром я выкатил исправление на стейджинг."],
        ["QA is going to verify it in the afternoon.", "Тестировщики проверят его после обеда."],
        ["If everything goes well, we'll ship it tomorrow.", "Если всё пройдёт хорошо, завтра выпустим."]
      ]
    ]
  },
  {
    id: 'en-chat', name: 'Рабочий чат', prose: true, icon: 'CH', file: 'chat.md',
    tags: 'english английский slack chat чат переписка сообщения',
    snippets: [
      [
        ["Hi, do you have a minute?", "Привет, есть минутка?"],
        ["I have a quick question about the deploy script.", "У меня короткий вопрос про скрипт деплоя."],
        ["No rush, it can wait until after lunch.", "Не срочно, может подождать до после обеда."]
      ],
      [
        ["Could you take a look at my pull request when you have time?", "Посмотришь мой пул-реквест, когда будет время?"],
        ["It's a small change, it should take five minutes.", "Изменение небольшое, это займёт минут пять."],
        ["Thanks in advance!", "Заранее спасибо!"]
      ],
      [
        ["Sorry for the late reply, I was in a meeting.", "Прости, что отвечаю поздно, я был на встрече."],
        ["Let me check and get back to you.", "Сейчас проверю и вернусь с ответом."],
        ["I'll have an answer within an hour.", "В течение часа у меня будет ответ."]
      ],
      [
        ["Does anyone know who owns this service?", "Кто-нибудь знает, кто отвечает за этот сервис?"],
        ["I need access to the logs.", "Мне нужен доступ к логам."],
        ["Please point me to the right person.", "Подскажите, пожалуйста, к кому обратиться."]
      ],
      [
        ["Thanks, that makes sense.", "Спасибо, теперь понятно."],
        ["I'll give it a try and let you know how it goes.", "Попробую и расскажу, что получилось."],
        ["I really appreciate your help.", "Я очень ценю твою помощь."]
      ],
      [
        ["Heads up: I'm going to restart the staging server.", "Предупреждаю: я собираюсь перезапустить стейджинг-сервер."],
        ["It will be down for about ten minutes.", "Он будет недоступен минут десять."],
        ["Please let me know if this is a bad time.", "Скажите, пожалуйста, если сейчас неподходящий момент."]
      ],
      [
        ["Can we jump on a quick call?", "Можем быстро созвониться?"],
        ["It would be faster than typing everything out.", "Так будет быстрее, чем всё это печатать."],
        ["I'm free anytime after two.", "Я свободен в любое время после двух."]
      ],
      [
        ["I'm not sure I follow.", "Не уверен, что понял мысль."],
        ["Could you give me an example?", "Можешь привести пример?"],
        ["I want to make sure we're on the same page.", "Хочу убедиться, что мы понимаем друг друга одинаково."]
      ],
      [
        ["Sorry, I can't make it to the meeting today.", "Извините, я сегодня не смогу прийти на встречу."],
        ["Could we reschedule it for tomorrow morning?", "Можем перенести её на завтрашнее утро?"],
        ["Any time before noon works for me.", "Мне подходит любое время до полудня."]
      ],
      [
        ["Just a reminder that the code freeze starts tomorrow.", "Просто напоминаю, что завтра начинается код-фриз."],
        ["Please merge your changes by the end of the day.", "Пожалуйста, влейте свои изменения до конца дня."],
        ["Anything after that will go into the next release.", "Всё, что позже, попадёт уже в следующий релиз."]
      ],
      [
        ["I agree with you in general.", "В целом я с тобой согласен."],
        ["However, I have some concerns about the timeline.", "Но у меня есть сомнения насчёт сроков."],
        ["Let's discuss the details on Monday.", "Давай обсудим детали в понедельник."]
      ],
      [
        ["Good news: the bug is fixed and deployed.", "Хорошая новость: баг исправлен, исправление выкачено."],
        ["Thanks to everyone who helped with the investigation.", "Спасибо всем, кто помогал разбираться."],
        ["I'll write a short summary later today.", "Сегодня чуть позже напишу краткое резюме."]
      ]
    ]
  },
  {
    id: 'en-bugs', name: 'Баги и инциденты', prose: true, icon: 'BG', file: 'bug_report.md',
    tags: 'english английский bug bugs incident issue баг-репорт инцидент',
    snippets: [
      [
        ["Steps to reproduce: open the app and log in.", "Шаги воспроизведения: открой приложение и войди в аккаунт."],
        ["Then click the save button twice.", "Затем дважды нажми кнопку сохранения."],
        ["The form is submitted two times.", "Форма отправляется два раза."]
      ],
      [
        ["Expected behavior: the user sees an error message.", "Ожидаемое поведение: пользователь видит сообщение об ошибке."],
        ["Actual behavior: the page goes blank.", "Фактическое поведение: страница становится пустой."],
        ["It happens every time in the latest version.", "В последней версии это происходит каждый раз."]
      ],
      [
        ["I can't reproduce this issue on my machine.", "У меня на машине эта проблема не воспроизводится."],
        ["Which browser and version are you using?", "Какой у тебя браузер и какой версии?"],
        ["Could you also attach the logs?", "Можешь ещё приложить логи?"]
      ],
      [
        ["We are investigating an issue with payments.", "Мы разбираемся с проблемой в платежах."],
        ["Some users are unable to complete their orders.", "Часть пользователей не может оформить заказ."],
        ["We will post an update in thirty minutes.", "Следующее обновление опубликуем через тридцать минут."]
      ],
      [
        ["The issue has been resolved.", "Проблема устранена."],
        ["A bad config change caused the outage.", "Сбой вызвало неудачное изменение конфига."],
        ["We rolled it back, and the service is stable now.", "Мы его откатили, сейчас сервис работает стабильно."]
      ],
      [
        ["It works locally but fails in production.", "Локально работает, а в продакшене падает."],
        ["I suspect it's related to the environment variables.", "Подозреваю, что дело в переменных окружения."],
        ["I'm going to compare the two configs.", "Сейчас сравню оба конфига."]
      ],
      [
        ["This bug only affects users with an old version of the app.", "Баг затрагивает только пользователей со старой версией приложения."],
        ["As a workaround, they can clear the cache.", "Как временное решение, они могут очистить кэш."],
        ["A proper fix will be included in the next release.", "Нормальное исправление войдёт в следующий релиз."]
      ],
      [
        ["The error rate went up right after the last deploy.", "Число ошибок выросло сразу после последнего деплоя."],
        ["I think we should roll back first and investigate later.", "Думаю, сначала надо откатиться, а разбираться потом."],
        ["Does anyone object?", "Кто-нибудь против?"]
      ],
      [
        ["The root cause was a missing index in the database.", "Корневой причиной был отсутствующий индекс в базе данных."],
        ["The query became slow as the table grew.", "По мере роста таблицы запрос стал медленным."],
        ["We added the index and set up an alert.", "Мы добавили индекс и настроили оповещение."]
      ],
      [
        ["The tests are failing on the main branch.", "В ветке main падают тесты."],
        ["It looks like the last merge broke something.", "Похоже, последний мерж что-то сломал."],
        ["I'm looking into it right now.", "Я прямо сейчас с этим разбираюсь."]
      ],
      [
        ["This is not a bug, it works as designed.", "Это не баг, так и задумано."],
        ["However, I agree that the behavior is confusing.", "Но согласен, что такое поведение сбивает с толку."],
        ["Let's improve the error message.", "Давай сделаем сообщение об ошибке понятнее."]
      ],
      [
        ["I've managed to reproduce the crash.", "Мне удалось воспроизвести падение."],
        ["It happens when the response comes back empty.", "Оно случается, когда приходит пустой ответ."],
        ["The fix is simple, and I'll open a PR shortly.", "Исправление простое, скоро открою PR."]
      ]
    ]
  }
);
