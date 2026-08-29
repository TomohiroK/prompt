import type { Locale } from "@/lib/i18n";

export type UIStrings = {
  siteDescription: string;
  nav: { games: string; howToUse: string; language: string };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    lead: string;
    ctaGames: string;
    ctaHowTo: string;
  };
  howToUse: {
    heading: string;
    steps: { title: string; body: string }[];
    note: string;
  };
  gamesSection: { heading: string };
  card: { playtime: string; players: string; chars: string; details: string };
  copy: { label: string; copied: string; error: string };
  detail: {
    breadcrumbHome: string;
    breadcrumbGames: string;
    playtime: string;
    players: string;
    promptHeading: string;
    promptUnit: string;
    promptLead: string;
    openTarget: string;
    howToPlay: string;
    tips: string;
    others: string;
  };
  footer: { disclaimer: string };
  notFound: { title: string; body: string; back: string };
};

export const ui: Record<Locale, UIStrings> = {
  ja: {
    siteDescription:
      "ChatGPT・Claude・Gemini にそのまま貼り付けて遊べる「ゲームになるプロンプト」を集めたサイト。ワンクリックでコピーして、AIとの対話をそのままゲームに変えられます。",
    nav: { games: "ゲーム一覧", howToUse: "使い方", language: "言語" },
    hero: {
      badge: "コピペで遊べるプロンプト集",
      title1: "貼るだけで",
      title2: "対戦相手",
      lead: "AIチャットにそのまま貼り付けるだけでゲームになるプロンプトを集めました。インストールもログインも不要。スマホでもPCでも、ワンクリックでコピーして、いつものAIに貼るだけです。",
      ctaGames: "ゲームを選ぶ（{count}種）",
      ctaHowTo: "使い方を見る",
    },
    howToUse: {
      heading: "使い方は3ステップ",
      steps: [
        {
          title: "プロンプトをコピー",
          body: "遊びたいゲームの「プロンプトをコピー」を押すだけ。全文がクリップボードに入ります。",
        },
        {
          title: "AIチャットに貼り付け",
          body: "ChatGPT・Claude・Gemini など、好きなAIの入力欄にそのまま貼って送信します。",
        },
        {
          title: "そのまま遊ぶ",
          body: "AIがゲームマスターになって進行します。あとは普通に会話するだけで1ゲーム遊べます。",
        },
      ],
      note: "※ AIによってはゲームの途中でルールを忘れることがあります。その場合は「最初のルールに従ってください」と伝えると復帰します。",
    },
    gamesSection: { heading: "ゲーム一覧" },
    card: {
      playtime: "目安",
      players: "人数",
      chars: "文字数",
      details: "遊び方を見る",
    },
    copy: {
      label: "プロンプトをコピー",
      copied: "コピーしました",
      error: "コピーできませんでした",
    },
    detail: {
      breadcrumbHome: "トップ",
      breadcrumbGames: "ゲーム一覧",
      playtime: "プレイ時間",
      players: "人数",
      promptHeading: "プロンプト",
      promptUnit: "{count} 文字",
      promptLead:
        "下のボタンでコピーして、AIチャットの入力欄にそのまま貼り付けてください。",
      openTarget: "コピーしたら、貼り付け先を開く",
      howToPlay: "遊び方",
      tips: "攻略のヒント",
      others: "ほかのゲーム",
    },
    footer: {
      disclaimer:
        "掲載しているプロンプトは自由に利用・改変できます。AIの応答内容はモデルやバージョンによって変わることがあります。",
    },
    notFound: {
      title: "ページが見つかりません",
      body: "URLが変わったか、削除された可能性があります。",
      back: "トップへ戻る",
    },
  },

  en: {
    siteDescription:
      "A collection of prompts that turn ChatGPT, Claude, or Gemini into a playable game. Copy one with a single click, paste it into your AI chat, and start playing.",
    nav: { games: "Games", howToUse: "How to use", language: "Language" },
    hero: {
      badge: "Copy-and-paste prompt collection",
      title1: "Paste it",
      title2: "Play it",
      lead: "Prompts that turn any AI chat into a game. No install, no sign-up. On your phone or your desktop, copy one with a single tap and paste it into the assistant you already use.",
      ctaGames: "Browse games ({count})",
      ctaHowTo: "See how it works",
    },
    howToUse: {
      heading: "Three steps to play",
      steps: [
        {
          title: "Copy the prompt",
          body: "Press the copy button on the game you want. The full prompt goes to your clipboard.",
        },
        {
          title: "Paste it into an AI chat",
          body: "Drop it into ChatGPT, Claude, Gemini, or whichever assistant you prefer, and send.",
        },
        {
          title: "Start playing",
          body: "The AI takes the game master role. From there, you just chat your way through the game.",
        },
      ],
      note: "Note: some assistants drift from the rules mid-game. Replying \"follow the rules from the original instructions\" usually brings them back.",
    },
    gamesSection: { heading: "All games" },
    card: {
      playtime: "Time",
      players: "Players",
      chars: "Length",
      details: "How to play",
    },
    copy: {
      label: "Copy prompt",
      copied: "Copied",
      error: "Copy failed",
    },
    detail: {
      breadcrumbHome: "Home",
      breadcrumbGames: "Games",
      playtime: "Play time",
      players: "Players",
      promptHeading: "Prompt",
      promptUnit: "{count} characters",
      promptLead:
        "Copy it with the button below and paste it straight into your AI chat.",
      openTarget: "Once copied, open where you want to paste",
      howToPlay: "How to play",
      tips: "Strategy tips",
      others: "More games",
    },
    footer: {
      disclaimer:
        "Every prompt here is free to use and modify. What the AI replies can vary by model and version.",
    },
    notFound: {
      title: "Page not found",
      body: "The URL may have changed, or the page may have been removed.",
      back: "Back to home",
    },
  },

  ko: {
    siteDescription:
      "ChatGPT·Claude·Gemini에 그대로 붙여넣으면 게임이 되는 프롬프트 모음. 원클릭으로 복사해 AI와의 대화를 그대로 게임으로 바꿀 수 있습니다.",
    nav: { games: "게임 목록", howToUse: "사용법", language: "언어" },
    hero: {
      badge: "복사해서 붙여넣는 프롬프트 모음",
      title1: "붙여넣기만",
      title2: "AI가 상대",
      lead: "AI 채팅에 그대로 붙여넣기만 하면 게임이 되는 프롬프트를 모았습니다. 설치도 로그인도 필요 없습니다. 스마트폰에서도 PC에서도, 원클릭으로 복사해 늘 쓰던 AI에 붙여넣기만 하면 됩니다.",
      ctaGames: "게임 고르기 ({count}종)",
      ctaHowTo: "사용법 보기",
    },
    howToUse: {
      heading: "3단계면 충분합니다",
      steps: [
        {
          title: "프롬프트 복사",
          body: "원하는 게임의 복사 버튼을 누르기만 하면 전문이 클립보드에 담깁니다.",
        },
        {
          title: "AI 채팅에 붙여넣기",
          body: "ChatGPT·Claude·Gemini 등 원하는 AI의 입력창에 그대로 붙여넣고 전송하세요.",
        },
        {
          title: "바로 플레이",
          body: "AI가 게임 마스터가 되어 진행합니다. 이후에는 평범하게 대화하며 한 판을 즐기면 됩니다.",
        },
      ],
      note: "※ AI에 따라 도중에 규칙을 잊는 경우가 있습니다. 그럴 때는 「처음 규칙을 따라 주세요」라고 전하면 대개 복구됩니다.",
    },
    gamesSection: { heading: "게임 목록" },
    card: {
      playtime: "소요",
      players: "인원",
      chars: "글자 수",
      details: "플레이 방법",
    },
    copy: {
      label: "프롬프트 복사",
      copied: "복사했습니다",
      error: "복사하지 못했습니다",
    },
    detail: {
      breadcrumbHome: "홈",
      breadcrumbGames: "게임 목록",
      playtime: "플레이 시간",
      players: "인원",
      promptHeading: "프롬프트",
      promptUnit: "{count}자",
      promptLead:
        "아래 버튼으로 복사한 뒤 AI 채팅 입력창에 그대로 붙여넣으세요.",
      openTarget: "복사했다면 붙여넣을 곳 열기",
      howToPlay: "플레이 방법",
      tips: "공략 힌트",
      others: "다른 게임",
    },
    footer: {
      disclaimer:
        "게시된 프롬프트는 자유롭게 사용·수정할 수 있습니다. AI의 응답 내용은 모델과 버전에 따라 달라질 수 있습니다.",
    },
    notFound: {
      title: "페이지를 찾을 수 없습니다",
      body: "URL이 변경되었거나 삭제되었을 수 있습니다.",
      back: "홈으로 돌아가기",
    },
  },

  zh: {
    siteDescription:
      "收录可直接粘贴到 ChatGPT、Claude、Gemini 中即可开玩的「游戏提示词」。一键复制，把与 AI 的对话变成一局游戏。",
    nav: { games: "游戏列表", howToUse: "使用方法", language: "语言" },
    hero: {
      badge: "复制即玩的提示词合集",
      title1: "贴上去",
      title2: "AI就是对手",
      lead: "这里收录了粘贴到 AI 聊天中就能变成游戏的提示词。无需安装，无需注册。无论手机还是电脑，一键复制后粘贴到你常用的 AI 即可。",
      ctaGames: "挑选游戏（{count} 款）",
      ctaHowTo: "查看使用方法",
    },
    howToUse: {
      heading: "三步即可开玩",
      steps: [
        {
          title: "复制提示词",
          body: "点击想玩的游戏上的复制按钮，全文即刻进入剪贴板。",
        },
        {
          title: "粘贴到 AI 聊天",
          body: "粘贴到 ChatGPT、Claude、Gemini 等任意 AI 的输入框并发送。",
        },
        {
          title: "直接开玩",
          body: "AI 会担任主持人推进流程。之后只要照常对话，就能玩完一局。",
        },
      ],
      note: "※ 部分 AI 可能在中途忘记规则。此时告诉它「请遵守最初的规则」通常就能恢复。",
    },
    gamesSection: { heading: "游戏列表" },
    card: {
      playtime: "时长",
      players: "人数",
      chars: "字数",
      details: "查看玩法",
    },
    copy: {
      label: "复制提示词",
      copied: "已复制",
      error: "复制失败",
    },
    detail: {
      breadcrumbHome: "首页",
      breadcrumbGames: "游戏列表",
      playtime: "游戏时长",
      players: "人数",
      promptHeading: "提示词",
      promptUnit: "{count} 字",
      promptLead: "点击下方按钮复制，然后直接粘贴到 AI 聊天的输入框。",
      openTarget: "复制后，打开要粘贴的地方",
      howToPlay: "玩法",
      tips: "攻略提示",
      others: "其他游戏",
    },
    footer: {
      disclaimer:
        "站内提示词可自由使用与修改。AI 的回复内容会因模型和版本而有所不同。",
    },
    notFound: {
      title: "找不到该页面",
      body: "网址可能已更改，或页面已被删除。",
      back: "返回首页",
    },
  },

  es: {
    siteDescription:
      "Una colección de prompts que convierten ChatGPT, Claude o Gemini en un juego. Cópialos con un clic, pégalos en tu chat de IA y empieza a jugar.",
    nav: { games: "Juegos", howToUse: "Cómo usarlo", language: "Idioma" },
    hero: {
      badge: "Prompts listos para copiar y pegar",
      title1: "Pégalo",
      title2: "Juega ya",
      lead: "Prompts que convierten cualquier chat de IA en un juego. Sin instalar nada y sin registrarte. En el móvil o en el ordenador: copia con un toque y pega en el asistente que ya usas.",
      ctaGames: "Ver los juegos ({count})",
      ctaHowTo: "Cómo funciona",
    },
    howToUse: {
      heading: "Tres pasos para jugar",
      steps: [
        {
          title: "Copia el prompt",
          body: "Pulsa el botón de copiar del juego que quieras. El texto completo pasa al portapapeles.",
        },
        {
          title: "Pégalo en un chat de IA",
          body: "Pégalo en ChatGPT, Claude, Gemini o el asistente que prefieras y envíalo.",
        },
        {
          title: "Empieza a jugar",
          body: "La IA hace de maestro de juego. A partir de ahí solo tienes que conversar con normalidad.",
        },
      ],
      note: "Nota: algunos asistentes olvidan las reglas a mitad de partida. Basta con responder «sigue las reglas de las instrucciones iniciales» para que retomen el hilo.",
    },
    gamesSection: { heading: "Todos los juegos" },
    card: {
      playtime: "Duración",
      players: "Jugadores",
      chars: "Extensión",
      details: "Cómo se juega",
    },
    copy: {
      label: "Copiar prompt",
      copied: "Copiado",
      error: "No se pudo copiar",
    },
    detail: {
      breadcrumbHome: "Inicio",
      breadcrumbGames: "Juegos",
      playtime: "Duración",
      players: "Jugadores",
      promptHeading: "Prompt",
      promptUnit: "{count} caracteres",
      promptLead:
        "Cópialo con el botón de abajo y pégalo tal cual en tu chat de IA.",
      openTarget: "Una vez copiado, abre dónde quieres pegarlo",
      howToPlay: "Cómo se juega",
      tips: "Consejos",
      others: "Más juegos",
    },
    footer: {
      disclaimer:
        "Todos los prompts se pueden usar y modificar libremente. Las respuestas de la IA varían según el modelo y la versión.",
    },
    notFound: {
      title: "Página no encontrada",
      body: "Puede que la URL haya cambiado o que la página se haya eliminado.",
      back: "Volver al inicio",
    },
  },

  pt: {
    siteDescription:
      "Uma coleção de prompts que transformam o ChatGPT, o Claude ou o Gemini em um jogo. Copie com um clique, cole no seu chat de IA e comece a jogar.",
    nav: { games: "Jogos", howToUse: "Como usar", language: "Idioma" },
    hero: {
      badge: "Prompts prontos para copiar e colar",
      title1: "Cole",
      title2: "Jogue já",
      lead: "Prompts que transformam qualquer chat de IA em um jogo. Sem instalar nada e sem cadastro. No celular ou no computador: copie com um toque e cole no assistente que você já usa.",
      ctaGames: "Ver os jogos ({count})",
      ctaHowTo: "Como funciona",
    },
    howToUse: {
      heading: "Três passos para jogar",
      steps: [
        {
          title: "Copie o prompt",
          body: "Toque no botão de copiar do jogo que quiser. O texto completo vai para a área de transferência.",
        },
        {
          title: "Cole em um chat de IA",
          body: "Cole no ChatGPT, no Claude, no Gemini ou no assistente que preferir e envie.",
        },
        {
          title: "Comece a jogar",
          body: "A IA assume o papel de mestre do jogo. Depois disso, é só conversar normalmente.",
        },
      ],
      note: "Observação: alguns assistentes esquecem as regras no meio da partida. Responder «siga as regras das instruções iniciais» costuma resolver.",
    },
    gamesSection: { heading: "Todos os jogos" },
    card: {
      playtime: "Duração",
      players: "Jogadores",
      chars: "Tamanho",
      details: "Como jogar",
    },
    copy: {
      label: "Copiar prompt",
      copied: "Copiado",
      error: "Não foi possível copiar",
    },
    detail: {
      breadcrumbHome: "Início",
      breadcrumbGames: "Jogos",
      playtime: "Duração",
      players: "Jogadores",
      promptHeading: "Prompt",
      promptUnit: "{count} caracteres",
      promptLead:
        "Copie com o botão abaixo e cole diretamente no seu chat de IA.",
      openTarget: "Depois de copiar, abra onde quer colar",
      howToPlay: "Como jogar",
      tips: "Dicas de estratégia",
      others: "Mais jogos",
    },
    footer: {
      disclaimer:
        "Todos os prompts podem ser usados e modificados livremente. As respostas da IA variam conforme o modelo e a versão.",
    },
    notFound: {
      title: "Página não encontrada",
      body: "A URL pode ter mudado ou a página pode ter sido removida.",
      back: "Voltar ao início",
    },
  },
};
