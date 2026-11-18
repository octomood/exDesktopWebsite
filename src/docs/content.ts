import type { Lang } from '../i18n/types';

export type CodeLang = 'bash' | 'json' | 'ini' | 'text';

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h2'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'code'; lang: CodeLang; code: string }
  | { t: 'note'; kind: 'info' | 'warn' | 'tip'; text: string }
  | { t: 'table'; head: string[]; rows: string[][] };

export type DocGroup = 'start' | 'usage' | 'dev';

export type Doc = {
  slug: string;
  group: DocGroup;
  title: string;
  description: string;
  blocks: Block[];
};

const apiIdSnippet = `cmake -B build -G Ninja \\
    -DCMAKE_BUILD_TYPE=Release \\
    -DQT_VERSION_MAJOR=6 \\
    -DDESKTOP_APP_DISABLE_QT_PLUGINS=ON \\
    -DTDESKTOP_API_ID="YOUR_API_ID" \\
    -DTDESKTOP_API_HASH="YOUR_API_HASH"`;

const installSnippet = `curl -fsSL https://raw.githubusercontent.com/metawka/exDesktop/main/install.sh | sh`;

export const docsRu: Doc[] = [
  {
    slug: 'introduction',
    group: 'start',
    title: 'Введение',
    description:
      'Что такое exDesktop, чем он отличается от Telegram Desktop и что понадобится для установки.',
    blocks: [
      {
        t: 'p',
        text: 'exDesktop — неофициальный клиент Telegram для Windows, Linux и macOS. Он собран из исходников Telegram Desktop и дополнен функциями exteraGram и AyuGram: оформление на Material 3, кастомизация, плагины и локальный Premium.',
      },
      { t: 'h2', text: 'Чем отличается от Telegram Desktop' },
      {
        t: 'ul',
        items: [
          'Оформление на элементах Material Design 3: акцентный цвет, скругления, тональные поверхности, свои иконки.',
          'Панель быстрых действий, QuoteReply, детали сообщений и перевод с сохранением форматирования.',
          'Приватность: скрытие номера, ghost mode, режим стримера, сохранение удалённых сообщений и истории правок.',
          'Встроенный tg-ws-proxy в Windows, ускорение загрузок и снятый лимит на количество аккаунтов.',
          'Плагины с проверкой безопасности и AI Chat в бете.',
        ],
      },
      {
        t: 'note',
        kind: 'info',
        text: 'exDesktop ставится рядом с Telegram Desktop. Данные лежат в отдельной папке, аккаунт используется тот же — клиенты не мешают друг другу.',
      },
      { t: 'h2', text: 'Требования' },
      {
        t: 'table',
        head: ['Система', 'Что нужно'],
        rows: [
          ['Windows', '10 или 11, x64'],
          ['macOS', '12 и новее, Intel или Apple Silicon'],
          ['Linux', 'x86_64, Qt 6, glibc-дистрибутив'],
        ],
      },
      { t: 'h2', text: 'С чего начать' },
      {
        t: 'p',
        text: 'Откройте раздел установки для своей системы. Если интересует только внешний вид — читайте «Оформление». Если хотите писать расширения — «Плагины» и «Сборка из исходников».',
      },
    ],
  },
  {
    slug: 'install-windows',
    group: 'start',
    title: 'Установка на Windows',
    description: 'Установщик, портативная сборка, обновления и удаление без потери данных.',
    blocks: [
      {
        t: 'p',
        text: 'Для Windows публикуются два файла: установщик и портативная сборка. Оба лежат на странице релизов GitHub.',
      },
      { t: 'h2', text: 'Установщик' },
      {
        t: 'ol',
        items: [
          'Скачайте exDesktop-setup-x64.<версия>.exe со страницы релизов.',
          'Запустите файл. SmartScreen может предупредить о неизвестном издателе — нажмите «Подробнее», затем «Выполнить в любом случае».',
          'Дождитесь окончания установки. Ярлык появится в меню «Пуск».',
        ],
      },
      {
        t: 'note',
        kind: 'warn',
        text: 'Установщик не подписан сертификатом. Если Windows блокирует файл, сверьте его с релизом на GitHub и только потом разрешайте запуск.',
      },
      { t: 'h2', text: 'Портативная сборка' },
      {
        t: 'p',
        text: 'Архив exDesktop-portable-x64.<версия>.zip распаковывается в любую папку. Запускайте exDesktop.exe из неё: портативная версия хранит данные рядом с программой, поэтому её удобно носить на флешке.',
      },
      { t: 'h2', text: 'Обновления' },
      {
        t: 'p',
        text: 'Клиент проверяет обновления сам. Ручной путь тоже работает: скачайте новый установщик, он заменит файлы и сохранит настройки.',
      },
      { t: 'h2', text: 'Удаление' },
      {
        t: 'p',
        text: '«Параметры → Приложения → exDesktop → Удалить». Папка с данными остаётся на месте: удалите её вручную, если хотите стереть кэш и настройки.',
      },
    ],
  },
  {
    slug: 'install-linux',
    group: 'start',
    title: 'Установка на Linux',
    description: 'Скрипт установки, ручная распаковка архива и зависимости для x86_64.',
    blocks: [
      {
        t: 'p',
        text: 'Для Linux публикуются сборки x86_64 в tar.gz. Есть два пути: скрипт, который всё сделает сам, и ручная распаковка.',
      },
      { t: 'h2', text: 'Скрипт установки' },
      {
        t: 'p',
        text: 'Скрипт определяет систему, раскладывает файлы в ~/.local/share/exDesktop, создаёт ярлык в меню приложений и спрашивает про TG WS Proxy и функции AyuGram.',
      },
      { t: 'code', lang: 'bash', code: installSnippet },
      {
        t: 'p',
        text: 'Флаги: --yes — без вопросов, --prefix=DIR — свой каталог, --no-menu — без ярлыка, --no-tgws и --no-ayu — без соответствующих компонентов.',
      },
      { t: 'h2', text: 'Вручную' },
      {
        t: 'ol',
        items: [
          'Скачайте exDesktop-linux-x64.<версия>.tar.gz.',
          'Распакуйте архив в удобный каталог.',
          'Запустите бинарник exDesktop из распакованной папки.',
        ],
      },
      {
        t: 'code',
        lang: 'bash',
        code: `mkdir -p ~/.local/share/exDesktop
tar -xzf exDesktop-linux-x64.*.tar.gz -C ~/.local/share/exDesktop
~/.local/share/exDesktop/exDesktop`,
      },
      { t: 'h2', text: 'Зависимости' },
      {
        t: 'p',
        text: 'Нужны Qt 6 (Core, Gui, Widgets, Network, OpenGL, DBus, Wayland, Svg, ImageFormats), libxcb и обычный набор шрифтов. В большинстве дистрибутивов они уже установлены.',
      },
      {
        t: 'note',
        kind: 'tip',
        text: 'В Gentoo есть готовый пакет: emerge net-im/exdesktop.',
      },
      {
        t: 'p',
        text: 'Если клиент не запускается, запустите его из терминала и посмотрите, какой библиотеки не хватает. Ошибка обычно называет пакет напрямую.',
      },
      { t: 'h2', text: 'Данные' },
      {
        t: 'p',
        text: 'Настройки и кэш хранятся в ~/.local/share/exDesktop. Профиль Telegram Desktop не затрагивается.',
      },
    ],
  },
  {
    slug: 'install-macos',
    group: 'start',
    title: 'Установка на macOS',
    description: 'DMG для Apple Silicon и Intel, первый запуск и обход предупреждения Gatekeeper.',
    blocks: [
      {
        t: 'p',
        text: 'Для macOS публикуются сборки под Apple Silicon (arm64) и Intel (x64), в формате DMG и ZIP.',
      },
      { t: 'h2', text: 'Установка' },
      {
        t: 'ol',
        items: [
          'Скачайте DMG: arm64 для M1–M4, x64 для Intel.',
          'Откройте образ и перетащите exDesktop в папку «Программы».',
          'Запустите приложение из Launchpad или Finder.',
        ],
      },
      { t: 'h2', text: 'Первый запуск и Gatekeeper' },
      {
        t: 'p',
        text: 'Сборка не нотаризована Apple. macOS может сообщить, что приложение от неустановленного разработчика. Откройте «Системные настройки → Конфиденциальность и безопасность», найдите строку про exDesktop и нажмите «Всё равно открыть».',
      },
      {
        t: 'note',
        kind: 'warn',
        text: 'Не отключайте Gatekeeper целиком. Разрешайте запуск только конкретному приложению, которое вы скачали с официальной страницы релизов.',
      },
      { t: 'h2', text: 'Установка из терминала' },
      { t: 'code', lang: 'bash', code: installSnippet },
      {
        t: 'p',
        text: 'Скрипт кладёт приложение в /Applications, а данные — в ~/Library/Application Support/exDesktop.',
      },
      { t: 'h2', text: 'Удаление' },
      {
        t: 'p',
        text: 'Перетащите exDesktop из «Программ» в Корзину. Папку данных удалите отдельно, если она больше не нужна.',
      },
    ],
  },
  {
    slug: 'first-launch',
    group: 'usage',
    title: 'Первый запуск',
    description: 'Вход в аккаунт, отдельные данные и перенос настроек с Telegram Desktop.',
    blocks: [
      {
        t: 'p',
        text: 'Первый запуск почти не отличается от Telegram Desktop: номер телефона, код подтверждения и облачный пароль, если включена двухфакторная защита.',
      },
      { t: 'h2', text: 'Что происходит с данными' },
      {
        t: 'ul',
        items: [
          'У exDesktop своя папка данных, отдельная от Telegram Desktop.',
          'Войти можно в тот же аккаунт: это обычная новая сессия.',
          'Оба клиента работают одновременно, сообщения синхронизируются через сервер.',
        ],
      },
      { t: 'h2', text: 'Перенос настроек' },
      {
        t: 'p',
        text: 'Импортировать оформление из Telegram Desktop нельзя: форматы тем разные. Акцент, иконки и шрифты настраиваются заново в «Настройках → Оформление». Чаты, папки и облачные настройки придут с сервера сами.',
      },
      { t: 'h2', text: 'Первые настройки' },
      {
        t: 'ol',
        items: [
          'Выберите тему и акцентный цвет.',
          'Решите, нужна ли вкладка «Все чаты».',
          'Настройте двойные действия мышью, если привыкли к ним в других клиентах.',
          'Проверьте прокси, если Telegram в вашей сети открывается нестабильно.',
        ],
      },
      {
        t: 'note',
        kind: 'tip',
        text: 'Настройки хранятся локально. Перед переустановкой системы сохраните папку данных или сделайте экспорт нужных плагинов.',
      },
      { t: 'h2', text: 'Если хочется вернуться' },
      {
        t: 'p',
        text: 'Удаление exDesktop не влияет на Telegram Desktop: у них разные каталоги и разные сессии. Достаточно выйти из аккаунта в exDesktop, если он больше не нужен.',
      },
    ],
  },
  {
    slug: 'appearance',
    group: 'usage',
    title: 'Оформление и акцент',
    description: 'Material 3, темы, акцентный цвет, иконки, шрифты и размер стикеров.',
    blocks: [
      {
        t: 'p',
        text: 'Оформление — главная причина, по которой люди ставят exDesktop. Почти всё меняется без плагинов, в обычных настройках.',
      },
      { t: 'h2', text: 'Material 3 Expressive' },
      {
        t: 'p',
        text: 'Скругления, тональные поверхности и акцентный цвет собраны из элементов Material Design 3. Акцент применяется к кнопкам, выделению, бейджам, пузырям и ползункам — интерфейс остаётся цельным.',
      },
      { t: 'h2', text: 'Тема и акцент' },
      {
        t: 'p',
        text: 'Тема по умолчанию следует системной. Зафиксировать светлую или тёмную можно в «Настройках → Оформление». Там же выбирается акцентный цвет — он же меняет оттенок выделения и кнопок.',
      },
      { t: 'h2', text: 'Иконки, шрифты, стикеры' },
      {
        t: 'ul',
        items: [
          'Своя иконка приложения вместо стандартной.',
          'Системные шрифты и системные эмодзи.',
          'Размер стикеров и аватаров в списке чатов.',
          'Скрытие вкладки «Все чаты» и лишних элементов меню.',
        ],
      },
      { t: 'h2', text: 'Ограничения' },
      {
        t: 'p',
        text: 'exDesktop не импортирует темы Telegram Desktop: у оформления свой формат. Сторонние темы из каналов могут выглядеть иначе, чем задумывал автор, — проверяйте на копии профиля.',
      },
      {
        t: 'note',
        kind: 'info',
        text: 'Акцент можно примерить прямо на главной странице сайта — в блоке «Соберите свой акцент». Это песочница, настройки клиента она не меняет.',
      },
    ],
  },
  {
    slug: 'privacy',
    group: 'usage',
    title: 'Приватность и данные',
    description: 'Скрытие номера, ghost mode, режим стримера, сохранение удалённых сообщений.',
    blocks: [
      {
        t: 'p',
        text: 'Раздел приватности в exDesktop шире, чем в Telegram Desktop. Часть функций работает только на стороне клиента — об этом важно помнить.',
      },
      { t: 'h2', text: 'Что скрывает клиент' },
      {
        t: 'ul',
        items: [
          'Номер телефона в профиле.',
          'ID пользователей и дату регистрации.',
          'Участников групп, скрытых администраторами.',
          'Архив и служебные разделы.',
        ],
      },
      { t: 'h2', text: 'Ghost mode' },
      {
        t: 'p',
        text: 'Режим призрака не отправляет отметки о прочтении и статус «онлайн», пока вы его не выключите. Для собеседника вы выглядите офлайн.',
      },
      {
        t: 'note',
        kind: 'warn',
        text: 'Это клиентская функция. Она не меняет настройки приватности на сервере Telegram и не скрывает вас от тех, кто читает метаданные иначе.',
      },
      { t: 'h2', text: 'Удалённые сообщения и история правок' },
      {
        t: 'p',
        text: 'Клиент хранит копии удалённых сообщений и историю изменений локально. Данные лежат в папке профиля и удаляются вместе с ней.',
      },
      { t: 'h2', text: 'Режим стримера' },
      {
        t: 'p',
        text: 'Скрывает имена, номера и превью в уведомлениях. Удобно, когда экран видят зрители или коллеги.',
      },
      { t: 'h2', text: 'Чего здесь нет' },
      {
        t: 'p',
        text: 'exDesktop не обходит шифрование секретных чатов и не показывает содержимое чужой E2E-переписки. Если сервис обещает такое — это не про открытый клиент.',
      },
    ],
  },
  {
    slug: 'plugins',
    group: 'usage',
    title: 'Плагины',
    description: 'Установка из файла, проверка безопасности, настройки, экспорт и Python-движок.',
    blocks: [
      {
        t: 'p',
        text: 'Плагины расширяют клиент: темы, автоматизация, свои панели и мелочи, которых не хватает в настройках. Устанавливаются из файла и проверяются перед запуском.',
      },
      { t: 'h2', text: 'Установка' },
      {
        t: 'ol',
        items: [
          'Откройте «Настройки → Плагины».',
          'Нажмите «Установить из файла» и выберите плагин.',
          'Прочитайте отчёт проверки: что плагин просит и к чему получает доступ.',
          'Включите плагин и при необходимости настройте его.',
        ],
      },
      {
        t: 'note',
        kind: 'warn',
        text: 'Плагин — это код с доступом к вашему клиенту. Ставьте только то, что понимаете, и не отключайте проверку ради сомнительных «оптимизаторов».',
      },
      { t: 'h2', text: 'Проверка безопасности' },
      {
        t: 'p',
        text: 'Перед первым запуском клиент анализирует плагин и показывает, к чему он просит доступ: сеть, файлы, буфер обмена, аккаунт. Отчёт остаётся в карточке плагина, его можно открыть позже.',
      },
      { t: 'h2', text: 'Настройки и экспорт' },
      {
        t: 'p',
        text: 'У каждого плагина свой экран настроек. Экспорт складывает плагин и его конфигурацию в архив — так удобно переносить расширения между машинами или делиться ими в чате.',
      },
      { t: 'h2', text: 'Python-движок' },
      {
        t: 'p',
        text: 'Движок плагинов на Python находится в разработке. Он позволит писать расширения на Python и обращаться к API клиента, но API ещё меняется. Для повседневной работы берите готовые плагины.',
      },
      { t: 'h2', text: 'Где брать плагины' },
      {
        t: 'p',
        text: 'В чате @exDesktopChat и в репозиториях авторов. Каталога внутри клиента пока нет — он есть в roadmap.',
      },
    ],
  },
  {
    slug: 'build',
    group: 'dev',
    title: 'Сборка из исходников',
    description: 'API-данные Telegram, зависимости и сборка для Linux, Windows и macOS.',
    blocks: [
      {
        t: 'p',
        text: 'exDesktop собирается из исходников тем же CMake-проектом, что и Telegram Desktop. Понадобятся собственные API ID и hash — брать чужие из репозитория нельзя.',
      },
      { t: 'h2', text: 'API-данные' },
      {
        t: 'p',
        text: 'Получите их на core.telegram.org/api/obtaining_api_id и передайте в CMake или configure.py.',
      },
      {
        t: 'code',
        lang: 'bash',
        code: `-D TDESKTOP_API_ID=YOUR_API_ID -D TDESKTOP_API_HASH=YOUR_API_HASH`,
      },
      { t: 'h2', text: 'Linux' },
      {
        t: 'p',
        text: 'Нужны CMake 3.16 или новее, компилятор C++20 (GCC 12 / Clang 15), Qt 6 с модулями Core, Gui, Widgets, Network, OpenGL, DBus, Wayland, Svg и ImageFormats, заголовки Python 3.11–3.14, а также библиотеки Telegram Desktop: tg_owt, ffmpeg, openal, opus, rnnoise, libjpeg-turbo, xxhash, minizip, ada, cld3 и wallet-engine-telegram.',
      },
      { t: 'code', lang: 'bash', code: apiIdSnippet },
      { t: 'code', lang: 'bash', code: 'cmake --build build --target Telegram' },
      {
        t: 'note',
        kind: 'tip',
        text: 'Среда Python для плагинов копируется в /usr/share/exDesktop/python/extera/ или лежит рядом с программой в python/extera/.',
      },
      { t: 'h2', text: 'Windows' },
      {
        t: 'ol',
        items: [
          'Подготовьте окружение по инструкции сборки Telegram Desktop для Windows.',
          'Положите встраиваемый Python 3.11 в Libraries/win64/python311 вместе с заголовками, python311.lib и папкой embed.',
          'Создайте файлы проекта: python configure.py x64 -D TDESKTOP_API_ID=... -D TDESKTOP_API_HASH=...',
          'Соберите цель Telegram: cmake --build out --config Release --target Telegram.',
        ],
      },
      {
        t: 'p',
        text: 'Папка python должна лежать рядом с Telegram.exe, иначе плагины не заработают.',
      },
      { t: 'h2', text: 'macOS' },
      {
        t: 'p',
        text: 'Отдельного скрипта для macOS в репозитории нет: используется общий CMake-проект Telegram Desktop с теми же API-данными. Готовое приложение подписывается самостоятельно — нотаризация в репозиторий не входит.',
      },
    ],
  },
  {
    slug: 'faq',
    group: 'dev',
    title: 'Частые вопросы',
    description: 'Безопасность, аккаунт, антивирусы, совместимость плагинов и куда писать о багах.',
    blocks: [
      { t: 'h2', text: 'Это безопасно?' },
      {
        t: 'p',
        text: 'Код открыт под GPL-3.0, сборки публикуются в GitHub Releases. При этом клиент неофициальный: его не проверяла Telegram и установщик не подписан сертификатом. Если это критично, собирайте сами из исходников.',
      },
      { t: 'h2', text: 'Можно войти в тот же аккаунт?' },
      {
        t: 'p',
        text: 'Да. exDesktop — отдельный клиент, сессия живёт параллельно с Telegram Desktop и телефоном. Ограничение на количество сессий остаётся телеграмовским.',
      },
      { t: 'h2', text: 'Почему антивирус ругается?' },
      {
        t: 'p',
        text: 'Установщик не подписан, а сборки обновляются часто — эвристика это не любит. Сверьте файл с релизом и отправьте его на проверку, если сомневаетесь. Не отключайте антивирус целиком.',
      },
      { t: 'h2', text: 'Где лежат данные?' },
      {
        t: 'table',
        head: ['Система', 'Каталог'],
        rows: [
          ['Linux', '~/.local/share/exDesktop'],
          ['macOS', '~/Library/Application Support/exDesktop'],
          ['Windows', 'профиль пользователя, отдельно от Telegram'],
        ],
      },
      { t: 'h2', text: 'Подойдут плагины от Telegram Desktop?' },
      {
        t: 'p',
        text: 'Нет. exDesktop использует формат exteraGram, а не плагины Telegram Desktop. Часть идей совместима, но файлы — разные.',
      },
      { t: 'h2', text: 'Когда выйдет Python-движок?' },
      {
        t: 'p',
        text: 'Дат нет. Статус и новости публикуются в канале @exDesktop, а направление описано в roadmap.',
      },
      { t: 'h2', text: 'Куда сообщать о баге?' },
      {
        t: 'p',
        text: 'В GitHub Issues. Приложите версию клиента, систему, шаги воспроизведения и, если возможно, лог. Баги из чата легко теряются.',
      },
    ],
  },
];

export const docsEn: Doc[] = [
  {
    slug: 'introduction',
    group: 'start',
    title: 'Introduction',
    description:
      'What exDesktop is, how it differs from Telegram Desktop, and what you need before installing.',
    blocks: [
      {
        t: 'p',
        text: 'exDesktop is an unofficial Telegram client for Windows, Linux, and macOS. It is built from the Telegram Desktop sources and extended with exteraGram and AyuGram features: Material 3 appearance, customisation, plugins, and local Premium.',
      },
      { t: 'h2', text: 'How it differs from Telegram Desktop' },
      {
        t: 'ul',
        items: [
          'Material Design 3 elements: accent colour, rounded shapes, tonal surfaces, custom icons.',
          'A quick action bar, QuoteReply, message details, and translation that keeps formatting.',
          'Privacy: hidden number, ghost mode, streamer mode, saved deleted messages and edit history.',
          'A built-in tg-ws-proxy on Windows, faster transfers, and no limit on account count.',
          'Plugins with a security check, plus AI Chat in beta.',
        ],
      },
      {
        t: 'note',
        kind: 'info',
        text: 'exDesktop installs next to Telegram Desktop. It keeps its data in a separate folder and uses the same account, so the two clients do not interfere.',
      },
      { t: 'h2', text: 'Requirements' },
      {
        t: 'table',
        head: ['System', 'What you need'],
        rows: [
          ['Windows', '10 or 11, x64'],
          ['macOS', '12 or newer, Intel or Apple Silicon'],
          ['Linux', 'x86_64, Qt 6, a glibc distribution'],
        ],
      },
      { t: 'h2', text: 'Where to start' },
      {
        t: 'p',
        text: 'Open the install page for your system. If you only care about looks, read “Appearance”. If you want to write extensions, read “Plugins” and “Building from source”.',
      },
    ],
  },
  {
    slug: 'install-windows',
    group: 'start',
    title: 'Install on Windows',
    description: 'Installer, portable build, updates, and removing the client without losing data.',
    blocks: [
      {
        t: 'p',
        text: 'Two files are published for Windows: an installer and a portable build. Both live on the GitHub releases page.',
      },
      { t: 'h2', text: 'Installer' },
      {
        t: 'ol',
        items: [
          'Download exDesktop-setup-x64.<version>.exe from the releases page.',
          'Run it. SmartScreen may warn about an unknown publisher — choose “More info”, then “Run anyway”.',
          'Wait for the installer to finish. A Start menu shortcut appears.',
        ],
      },
      {
        t: 'note',
        kind: 'warn',
        text: 'The installer is not code-signed. If Windows blocks the file, compare it with the GitHub release before allowing it to run.',
      },
      { t: 'h2', text: 'Portable build' },
      {
        t: 'p',
        text: 'exDesktop-portable-x64.<version>.zip unpacks into any folder. Run exDesktop.exe from there: the portable build keeps its data next to the program, which makes it easy to carry on a USB stick.',
      },
      { t: 'h2', text: 'Updates' },
      {
        t: 'p',
        text: 'The client checks for updates on its own. The manual route works too: download the new installer, it replaces the files and keeps your settings.',
      },
      { t: 'h2', text: 'Uninstall' },
      {
        t: 'p',
        text: 'Settings → Apps → exDesktop → Uninstall. The data folder stays behind; remove it by hand if you want to wipe the cache and settings.',
      },
    ],
  },
  {
    slug: 'install-linux',
    group: 'start',
    title: 'Install on Linux',
    description: 'The install script, manual archive unpacking, and dependencies for x86_64.',
    blocks: [
      {
        t: 'p',
        text: 'Linux builds are published for x86_64 as tar.gz. There are two routes: a script that does everything, or a manual unpack.',
      },
      { t: 'h2', text: 'Install script' },
      {
        t: 'p',
        text: 'The script detects your system, places files in ~/.local/share/exDesktop, adds an application menu entry, and asks about TG WS Proxy and AyuGram features.',
      },
      { t: 'code', lang: 'bash', code: installSnippet },
      {
        t: 'p',
        text: 'Flags: --yes for no prompts, --prefix=DIR for a custom path, --no-menu to skip the shortcut, --no-tgws and --no-ayu to skip those components.',
      },
      { t: 'h2', text: 'Manual install' },
      {
        t: 'ol',
        items: [
          'Download exDesktop-linux-x64.<version>.tar.gz.',
          'Unpack the archive where you want it.',
          'Run the exDesktop binary from the unpacked folder.',
        ],
      },
      {
        t: 'code',
        lang: 'bash',
        code: `mkdir -p ~/.local/share/exDesktop
tar -xzf exDesktop-linux-x64.*.tar.gz -C ~/.local/share/exDesktop
~/.local/share/exDesktop/exDesktop`,
      },
      { t: 'h2', text: 'Dependencies' },
      {
        t: 'p',
        text: 'You need Qt 6 (Core, Gui, Widgets, Network, OpenGL, DBus, Wayland, Svg, ImageFormats), libxcb, and a normal set of fonts. Most distributions already have them.',
      },
      {
        t: 'note',
        kind: 'tip',
        text: 'Gentoo has a package: emerge net-im/exdesktop.',
      },
      {
        t: 'p',
        text: 'If the client does not start, run it from a terminal and read which library is missing. The error usually names the package directly.',
      },
      { t: 'h2', text: 'Data' },
      {
        t: 'p',
        text: 'Settings and cache live in ~/.local/share/exDesktop. Your Telegram Desktop profile is untouched.',
      },
    ],
  },
  {
    slug: 'install-macos',
    group: 'start',
    title: 'Install on macOS',
    description: 'DMG for Apple Silicon and Intel, first launch, and the Gatekeeper warning.',
    blocks: [
      {
        t: 'p',
        text: 'macOS builds cover Apple Silicon (arm64) and Intel (x64) as DMG and ZIP.',
      },
      { t: 'h2', text: 'Install' },
      {
        t: 'ol',
        items: [
          'Download the DMG: arm64 for M1–M4, x64 for Intel.',
          'Open the image and drag exDesktop into Applications.',
          'Launch the app from Launchpad or Finder.',
        ],
      },
      { t: 'h2', text: 'First launch and Gatekeeper' },
      {
        t: 'p',
        text: 'The build is not notarised by Apple, so macOS may say the app is from an unidentified developer. Open System Settings → Privacy & Security, find the exDesktop line, and choose “Open Anyway”.',
      },
      {
        t: 'note',
        kind: 'warn',
        text: 'Do not disable Gatekeeper entirely. Allow only the specific app you downloaded from the official releases page.',
      },
      { t: 'h2', text: 'Terminal install' },
      { t: 'code', lang: 'bash', code: installSnippet },
      {
        t: 'p',
        text: 'The script puts the app in /Applications and its data in ~/Library/Application Support/exDesktop.',
      },
      { t: 'h2', text: 'Uninstall' },
      {
        t: 'p',
        text: 'Drag exDesktop from Applications to the Bin. Remove the data folder separately if you no longer need it.',
      },
    ],
  },
  {
    slug: 'first-launch',
    group: 'usage',
    title: 'First launch',
    description: 'Signing in, separate data, and moving over from Telegram Desktop.',
    blocks: [
      {
        t: 'p',
        text: 'The first launch is almost the same as Telegram Desktop: phone number, confirmation code, and your cloud password if two-step verification is on.',
      },
      { t: 'h2', text: 'What happens to your data' },
      {
        t: 'ul',
        items: [
          'exDesktop has its own data folder, separate from Telegram Desktop.',
          'You can sign in to the same account: it is simply a new session.',
          'Both clients run at once and messages sync through the server.',
        ],
      },
      { t: 'h2', text: 'Moving settings' },
      {
        t: 'p',
        text: 'Appearance cannot be imported from Telegram Desktop: the theme formats differ. Set the accent, icons, and fonts again under Settings → Appearance. Chats, folders, and cloud settings arrive from the server on their own.',
      },
      { t: 'h2', text: 'First settings to change' },
      {
        t: 'ol',
        items: [
          'Pick a theme and an accent colour.',
          'Decide whether you need the “All chats” tab.',
          'Set up mouse double-click actions if you are used to them from other clients.',
          'Check the proxy if Telegram is unstable on your network.',
        ],
      },
      {
        t: 'note',
        kind: 'tip',
        text: 'Settings are stored locally. Before reinstalling the system, keep a copy of the data folder or export the plugins you care about.',
      },
      { t: 'h2', text: 'Going back' },
      {
        t: 'p',
        text: 'Removing exDesktop does not affect Telegram Desktop: the folders and sessions are different. Just log out of the account in exDesktop if you no longer need it.',
      },
    ],
  },
  {
    slug: 'appearance',
    group: 'usage',
    title: 'Appearance and accent',
    description: 'Material 3, themes, accent colour, icons, fonts, and sticker size.',
    blocks: [
      {
        t: 'p',
        text: 'Appearance is the main reason people install exDesktop. Almost all of it is available in the regular settings, without plugins.',
      },
      { t: 'h2', text: 'Material 3 Expressive' },
      {
        t: 'p',
        text: 'Rounded shapes, tonal surfaces, and the accent colour come from Material Design 3 elements. The accent reaches buttons, selection, badges, bubbles, and sliders, so the interface stays consistent.',
      },
      { t: 'h2', text: 'Theme and accent' },
      {
        t: 'p',
        text: 'The theme follows the system by default. You can pin light or dark under Settings → Appearance. The accent colour lives there too and changes the tint of buttons and highlights.',
      },
      { t: 'h2', text: 'Icons, fonts, stickers' },
      {
        t: 'ul',
        items: [
          'A custom app icon instead of the default one.',
          'System fonts and system emoji.',
          'Sticker and avatar size in the chat list.',
          'Hide the “All chats” tab and unnecessary menu items.',
        ],
      },
      { t: 'h2', text: 'Limits' },
      {
        t: 'p',
        text: 'exDesktop does not import Telegram Desktop themes: its appearance has its own format. Third-party themes from channels may look different from what the author intended, so test them on a spare profile.',
      },
      {
        t: 'note',
        kind: 'info',
        text: 'You can try an accent on the home page, in the “Build your own accent” block. It is a sandbox and does not change your client settings.',
      },
    ],
  },
  {
    slug: 'privacy',
    group: 'usage',
    title: 'Privacy and data',
    description: 'Hidden number, ghost mode, streamer mode, and saved deleted messages.',
    blocks: [
      {
        t: 'p',
        text: 'The privacy section in exDesktop is wider than in Telegram Desktop. Some features work only on the client side, and that matters.',
      },
      { t: 'h2', text: 'What the client hides' },
      {
        t: 'ul',
        items: [
          'The phone number in your profile.',
          'User IDs and registration dates.',
          'Group members hidden by administrators.',
          'The archive and service sections.',
        ],
      },
      { t: 'h2', text: 'Ghost mode' },
      {
        t: 'p',
        text: 'Ghost mode stops sending read receipts and the online status until you turn it off. To the other side you look offline.',
      },
      {
        t: 'note',
        kind: 'warn',
        text: 'This is a client-side feature. It does not change privacy settings on the Telegram server and does not hide you from anyone reading metadata another way.',
      },
      { t: 'h2', text: 'Deleted messages and edit history' },
      {
        t: 'p',
        text: 'The client keeps copies of deleted messages and edit history locally. The data sits in the profile folder and disappears with it.',
      },
      { t: 'h2', text: 'Streamer mode' },
      {
        t: 'p',
        text: 'Hides names, numbers, and previews in notifications. Useful when viewers or colleagues can see your screen.',
      },
      { t: 'h2', text: 'What it does not do' },
      {
        t: 'p',
        text: 'exDesktop does not break secret chat encryption and does not show the contents of someone else’s end-to-end conversation. Any service promising that is not this client.',
      },
    ],
  },
  {
    slug: 'plugins',
    group: 'usage',
    title: 'Plugins',
    description: 'Installing from a file, the security check, settings, export, and the Python engine.',
    blocks: [
      {
        t: 'p',
        text: 'Plugins extend the client: themes, automation, custom panels, and small things the settings do not cover. You install them from a file, and they are checked before they run.',
      },
      { t: 'h2', text: 'Installing' },
      {
        t: 'ol',
        items: [
          'Open Settings → Plugins.',
          'Choose “Install from file” and pick the plugin.',
          'Read the check report: what the plugin requests and what it can reach.',
          'Enable the plugin and configure it if needed.',
        ],
      },
      {
        t: 'note',
        kind: 'warn',
        text: 'A plugin is code with access to your client. Install only what you understand, and do not disable the check for dubious “optimisers”.',
      },
      { t: 'h2', text: 'The security check' },
      {
        t: 'p',
        text: 'Before the first run the client analyses the plugin and shows what it asks for: network, files, clipboard, account. The report stays on the plugin card and can be opened later.',
      },
      { t: 'h2', text: 'Settings and export' },
      {
        t: 'p',
        text: 'Every plugin has its own settings screen. Export packs the plugin and its configuration into an archive, which makes moving extensions between machines or sharing them in a chat straightforward.',
      },
      { t: 'h2', text: 'Python engine' },
      {
        t: 'p',
        text: 'The Python plugin engine is in development. It will let you write extensions in Python and call the client API, but the API still changes. For daily use, take ready-made plugins.',
      },
      { t: 'h2', text: 'Where to get plugins' },
      {
        t: 'p',
        text: 'In @exDesktopChat and in authors’ repositories. There is no in-app catalogue yet; it is on the roadmap.',
      },
    ],
  },
  {
    slug: 'build',
    group: 'dev',
    title: 'Build from source',
    description: 'Telegram API credentials, dependencies, and builds for Linux, Windows, and macOS.',
    blocks: [
      {
        t: 'p',
        text: 'exDesktop builds from source with the same CMake project as Telegram Desktop. You need your own API ID and hash; borrowing someone else’s from a repository is not allowed.',
      },
      { t: 'h2', text: 'API credentials' },
      {
        t: 'p',
        text: 'Get them at core.telegram.org/api/obtaining_api_id and pass them to CMake or configure.py.',
      },
      {
        t: 'code',
        lang: 'bash',
        code: `-D TDESKTOP_API_ID=YOUR_API_ID -D TDESKTOP_API_HASH=YOUR_API_HASH`,
      },
      { t: 'h2', text: 'Linux' },
      {
        t: 'p',
        text: 'You need CMake 3.16 or newer, a C++20 compiler (GCC 12 / Clang 15), Qt 6 with Core, Gui, Widgets, Network, OpenGL, DBus, Wayland, Svg, and ImageFormats, Python 3.11–3.14 headers, and the Telegram Desktop libraries: tg_owt, ffmpeg, openal, opus, rnnoise, libjpeg-turbo, xxhash, minizip, ada, cld3, and wallet-engine-telegram.',
      },
      { t: 'code', lang: 'bash', code: apiIdSnippet },
      { t: 'code', lang: 'bash', code: 'cmake --build build --target Telegram' },
      {
        t: 'note',
        kind: 'tip',
        text: 'The Python environment for plugins is copied to /usr/share/exDesktop/python/extera/ or kept next to the program in python/extera/.',
      },
      { t: 'h2', text: 'Windows' },
      {
        t: 'ol',
        items: [
          'Prepare the environment following the Telegram Desktop Windows build guide.',
          'Place embedded Python 3.11 in Libraries/win64/python311 together with headers, python311.lib, and the embed folder.',
          'Generate the project files: python configure.py x64 -D TDESKTOP_API_ID=... -D TDESKTOP_API_HASH=...',
          'Build the Telegram target: cmake --build out --config Release --target Telegram.',
        ],
      },
      {
        t: 'p',
        text: 'The python folder must sit next to Telegram.exe, otherwise plugins will not work.',
      },
      { t: 'h2', text: 'macOS' },
      {
        t: 'p',
        text: 'There is no separate macOS script in the repository: the shared Telegram Desktop CMake project is used with the same API credentials. The finished app is signed by you; notarisation is not part of the repository.',
      },
    ],
  },
  {
    slug: 'faq',
    group: 'dev',
    title: 'FAQ',
    description: 'Safety, accounts, antivirus warnings, plugin compatibility, and where to report bugs.',
    blocks: [
      { t: 'h2', text: 'Is it safe?' },
      {
        t: 'p',
        text: 'The code is open under GPL-3.0 and builds are published in GitHub Releases. Still, the client is unofficial: Telegram has not reviewed it and the installer is not code-signed. If that matters, build it yourself from source.',
      },
      { t: 'h2', text: 'Can I use the same account?' },
      {
        t: 'p',
        text: 'Yes. exDesktop is a separate client, so the session runs alongside Telegram Desktop and your phone. The session limit is still Telegram’s.',
      },
      { t: 'h2', text: 'Why does antivirus complain?' },
      {
        t: 'p',
        text: 'The installer is unsigned and builds update often, which heuristics dislike. Compare the file with the release and submit it for analysis if you are unsure. Do not disable your antivirus entirely.',
      },
      { t: 'h2', text: 'Where is the data stored?' },
      {
        t: 'table',
        head: ['System', 'Folder'],
        rows: [
          ['Linux', '~/.local/share/exDesktop'],
          ['macOS', '~/Library/Application Support/exDesktop'],
          ['Windows', 'the user profile, separate from Telegram'],
        ],
      },
      { t: 'h2', text: 'Do Telegram Desktop plugins work?' },
      {
        t: 'p',
        text: 'No. exDesktop uses the exteraGram format, not Telegram Desktop plugins. Some ideas overlap, but the files are different.',
      },
      { t: 'h2', text: 'When will the Python engine ship?' },
      {
        t: 'p',
        text: 'There are no dates. Status and news are published in the @exDesktop channel, and the direction is described on the roadmap.',
      },
      { t: 'h2', text: 'Where do I report a bug?' },
      {
        t: 'p',
        text: 'In GitHub Issues. Include the client version, your system, reproduction steps, and a log if you can. Bugs from chat get lost easily.',
      },
    ],
  },
];

export const docsByLang: Record<Lang, Doc[]> = { ru: docsRu, en: docsEn };
