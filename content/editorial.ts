import type { Locale } from "@/lib/i18n";

/**
 * 誌面としての文言。UI文言（content/ui.ts）とは役割が違うため分けている。
 * rail は縦組みの柱に流す短い一行、pickLine は一覧の入口に置く一行。
 * いずれも「説明」ではなく「呼びかけ」として書く。
 */
export type EditorialStrings = { rail: string; pickLine: string };

export const editorial: Record<Locale, EditorialStrings> = {
  ja: {
    rail: "貼るだけで、はじまる。",
    pickLine: "今日の一本を選ぶ。",
  },
  en: {
    rail: "Paste it. Play it.",
    pickLine: "Pick tonight's one.",
  },
  ko: {
    rail: "붙여넣으면, 시작된다.",
    pickLine: "오늘의 한 편을 고르다.",
  },
  zh: {
    rail: "贴上去，就开始。",
    pickLine: "挑一款，今晚就玩。",
  },
  es: {
    rail: "Pégalo. Y empieza.",
    pickLine: "Elige la de hoy.",
  },
  pt: {
    rail: "Cole. E comece.",
    pickLine: "Escolha a de hoje.",
  },
};

/**
 * 端末モックの中に表示する会話。
 * 「コピーして貼るとゲームが始まる」ことを説明文ではなく画面で見せるため、
 * 実際のプロンプトの導入と、AIの最初の応答をそのまま短くして使う。
 */
export type PhoneCopy = {
  app: string;
  pasted: string;
  reply: string;
  ask: string;
  answer: string;
  input: string;
};

export const phoneCopy: Record<Locale, PhoneCopy> = {
  ja: {
    app: "AI CHAT",
    pasted:
      "あなたは「数字当てゲーム」のゲームマスターです。Aさん・Bさんに秘密の数字を1つずつ設定してください…",
    reply: "Aさん・Bさんの数字を設定しました。質問をどうぞ。",
    ask: "100万以上ですか？",
    answer: "うーん……はい。",
    input: "メッセージを入力",
  },
  en: {
    app: "AI CHAT",
    pasted:
      "You are the game master of a number guessing game. Give A and B one secret number each...",
    reply: "I have set the numbers for A and B. Ask your questions.",
    ask: "Is it a million or more?",
    answer: "Hmm... yes.",
    input: "Message",
  },
  ko: {
    app: "AI CHAT",
    pasted:
      "당신은 「숫자 맞히기 게임」의 게임 마스터입니다. A씨와 B씨에게 비밀의 숫자를 하나씩 설정하세요…",
    reply: "A씨와 B씨의 숫자를 설정했습니다. 질문하세요.",
    ask: "100만 이상인가요?",
    answer: "음…… 네.",
    input: "메시지 입력",
  },
  zh: {
    app: "AI CHAT",
    pasted:
      "你是「猜数字游戏」的主持人。请为 A 先生和 B 先生各设定一个秘密数字……",
    reply: "已为 A 先生和 B 先生设定好数字。请提问。",
    ask: "在 100 万以上吗？",
    answer: "唔……算是吧。",
    input: "输入消息",
  },
  es: {
    app: "AI CHAT",
    pasted:
      "Eres el maestro de un juego de adivinar números. Da a A y a B un número secreto a cada uno...",
    reply: "He fijado los números de A y de B. Haz tus preguntas.",
    ask: "¿Es un millón o más?",
    answer: "Mmm... sí.",
    input: "Mensaje",
  },
  pt: {
    app: "AI CHAT",
    pasted:
      "Você é o mestre de um jogo de adivinhar números. Dê a A e a B um número secreto para cada um...",
    reply: "Defini os números de A e de B. Pode perguntar.",
    ask: "É um milhão ou mais?",
    answer: "Hmm... sim.",
    input: "Mensagem",
  },
};

/**
 * 欧文の小見出し。誌面の柱として全言語共通で使う。
 * 翻訳せず記号として扱うことで、どの言語でも同じ版面の骨格になる。
 */
export const latinLabels = {
  issue: "ISSUE 01",
  howTo: "HOW TO PLAY",
  games: "GAME INDEX",
  prompt: "THE PROMPT",
  steps: "THE RULES",
  tips: "FIELD NOTES",
  others: "ALSO IN THIS ISSUE",
  ticker: "COPY / PASTE / PLAY",
  tagline: "PASTE IT. PLAY IT.",
  credit: "PROMPT ARCADE",
  features: ["NO INSTALL", "COPY & PASTE", "CHAT x GAME"],
} as const;

/**
 * ポスターとしての版面に必要な文言。
 * 画面モックの中身まで翻訳対象にしているのは、
 * 「貼るとゲームが始まる」という体験そのものを絵で見せるため。
 */
export type ChatLine = { from: "ai" | "me"; text: string };

export type PosterCopy = {
  tag: string;
  sub: string;
  heart: string;
  templates: string;
  ctaBurst: string;
  ctaMain: string;
  features: [string, string, string];
  window: {
    title: string;
    step1: string;
    step1Note: string;
    step2: string;
    pasted: string;
    paste: string;
    input: string;
    chat: ChatLine[];
  };
};

export const poster: Record<Locale, PosterCopy> = {
  ja: {
    tag: "ルールをコピペ。すぐ遊べる。",
    sub: "AIチャットに貼るだけで、AIがゲーム相手になります。",
    heart: "会話が、ゲームになる。",
    templates: "ゲームの台本、そろってます。",
    ctaBurst: "今すぐためす！",
    ctaMain: "ゲームを選ぶ",
    features: [
      "コピー＆ペーストでOK",
      "6種類のゲームで遊べる",
      "AIと会話しながら楽しめる",
    ],
    window: {
      title: "AI CHAT",
      step1: "ルールを貼り付ける",
      step1Note: "遊びたいゲームのプロンプトをコピーして貼り付けるだけ。",
      step2: "AIがゲーム相手に！",
      pasted:
        "あなたは「数字当てゲーム」のゲームマスターです。Aさん・Bさんに秘密の数字を1つずつ設定してください。私は質問をして、その回答から数字を推理します。",
      paste: "ここにペースト",
      input: "質問を入力…",
      chat: [
        { from: "ai", text: "Aさん・Bさんの数字を設定しました。質問をどうぞ。" },
        { from: "me", text: "100万以上ですか？" },
        { from: "ai", text: "うーん……はい。" },
        { from: "me", text: "3で割り切れますか？" },
        { from: "ai", text: "いいえ。" },
        { from: "me", text: "Aさんは810,000ですか？" },
        { from: "ai", text: "正解！ よく推理できました 🎉" },
      ],
    },
  },

  en: {
    tag: "Copy the rules. Play right away.",
    sub: "Paste it into an AI chat and the AI becomes your opponent.",
    heart: "A chat becomes a game.",
    templates: "The scripts are ready.",
    ctaBurst: "Try it now!",
    ctaMain: "Browse the games",
    features: [
      "Copy and paste, that's it",
      "Six games to play",
      "Play by simply chatting",
    ],
    window: {
      title: "AI CHAT",
      step1: "Paste the rules",
      step1Note: "Copy the prompt of the game you want and paste it in.",
      step2: "The AI becomes your opponent",
      pasted:
        "You are the game master of a number guessing game. Give A and B one secret number each. I ask questions and deduce the numbers from your answers.",
      paste: "Paste here",
      input: "Ask a question...",
      chat: [
        { from: "ai", text: "I have set the numbers for A and B. Ask your questions." },
        { from: "me", text: "Is it a million or more?" },
        { from: "ai", text: "Hmm... yes." },
        { from: "me", text: "Is it divisible by 3?" },
        { from: "ai", text: "No." },
        { from: "me", text: "Is A's number 810,000?" },
        { from: "ai", text: "Correct! Nicely deduced 🎉" },
      ],
    },
  },

  ko: {
    tag: "규칙을 복사. 바로 플레이.",
    sub: "AI 채팅에 붙여넣기만 하면, AI가 게임 상대가 됩니다.",
    heart: "대화가 게임이 된다.",
    templates: "게임 대본, 준비돼 있어요.",
    ctaBurst: "지금 해보기!",
    ctaMain: "게임 고르기",
    features: [
      "복사 & 붙여넣기면 끝",
      "6가지 게임으로 플레이",
      "AI와 대화하며 즐기기",
    ],
    window: {
      title: "AI CHAT",
      step1: "규칙을 붙여넣기",
      step1Note: "즐기고 싶은 게임의 프롬프트를 복사해 붙여넣기만 하세요.",
      step2: "AI가 게임 상대로!",
      pasted:
        "당신은 「숫자 맞히기 게임」의 게임 마스터입니다. A씨와 B씨에게 비밀의 숫자를 하나씩 설정하세요. 저는 질문을 하고 그 대답으로 숫자를 추리합니다.",
      paste: "여기에 붙여넣기",
      input: "질문 입력…",
      chat: [
        { from: "ai", text: "A씨와 B씨의 숫자를 설정했습니다. 질문하세요." },
        { from: "me", text: "100만 이상인가요?" },
        { from: "ai", text: "음…… 네." },
        { from: "me", text: "3으로 나누어떨어지나요?" },
        { from: "ai", text: "아니요." },
        { from: "me", text: "A씨는 810,000인가요?" },
        { from: "ai", text: "정답! 잘 추리했어요 🎉" },
      ],
    },
  },

  zh: {
    tag: "复制规则，马上开玩。",
    sub: "粘贴到 AI 聊天，AI 就成了你的对手。",
    heart: "对话，就是一局游戏。",
    templates: "游戏剧本，都备好了。",
    ctaBurst: "马上试试！",
    ctaMain: "挑选游戏",
    features: ["复制粘贴就行", "六款游戏可玩", "边聊边玩"],
    window: {
      title: "AI CHAT",
      step1: "粘贴规则",
      step1Note: "复制你想玩的那款游戏的提示词，粘贴进来即可。",
      step2: "AI 成为你的对手！",
      pasted:
        "你是「猜数字游戏」的主持人。请为 A 先生和 B 先生各设定一个秘密数字。我会提问，并根据你的回答推理出数字。",
      paste: "粘贴到这里",
      input: "输入问题…",
      chat: [
        { from: "ai", text: "已为 A 先生和 B 先生设定好数字。请提问。" },
        { from: "me", text: "在 100 万以上吗？" },
        { from: "ai", text: "唔……算是吧。" },
        { from: "me", text: "能被 3 整除吗？" },
        { from: "ai", text: "不能。" },
        { from: "me", text: "A 先生是 810,000 吗？" },
        { from: "ai", text: "答对了！推理得很漂亮 🎉" },
      ],
    },
  },

  es: {
    tag: "Copia las reglas. Juega ya.",
    sub: "Pégalo en un chat de IA y la IA se convierte en tu rival.",
    heart: "El chat se vuelve juego.",
    templates: "Los guiones ya están listos.",
    ctaBurst: "¡Pruébalo ya!",
    ctaMain: "Ver los juegos",
    features: [
      "Copiar y pegar, nada más",
      "Seis juegos para jugar",
      "Se juega conversando",
    ],
    window: {
      title: "AI CHAT",
      step1: "Pega las reglas",
      step1Note: "Copia el prompt del juego que quieras y pégalo aquí.",
      step2: "La IA se vuelve tu rival",
      pasted:
        "Eres el maestro de un juego de adivinar números. Da a A y a B un número secreto a cada uno. Yo hago preguntas y deduzco los números por tus respuestas.",
      paste: "Pega aquí",
      input: "Haz una pregunta...",
      chat: [
        { from: "ai", text: "He fijado los números de A y de B. Haz tus preguntas." },
        { from: "me", text: "¿Es un millón o más?" },
        { from: "ai", text: "Mmm... sí." },
        { from: "me", text: "¿Es divisible entre 3?" },
        { from: "ai", text: "No." },
        { from: "me", text: "¿El número de A es 810.000?" },
        { from: "ai", text: "¡Correcto! Bien deducido 🎉" },
      ],
    },
  },

  pt: {
    tag: "Copie as regras. Jogue já.",
    sub: "Cole num chat de IA e a IA vira seu adversário.",
    heart: "O chat vira jogo.",
    templates: "Os roteiros já estão prontos.",
    ctaBurst: "Experimente agora!",
    ctaMain: "Ver os jogos",
    features: [
      "Copiar e colar, só isso",
      "Seis jogos para jogar",
      "Joga-se conversando",
    ],
    window: {
      title: "AI CHAT",
      step1: "Cole as regras",
      step1Note: "Copie o prompt do jogo que quiser e cole aqui.",
      step2: "A IA vira seu adversário",
      pasted:
        "Você é o mestre de um jogo de adivinhar números. Dê a A e a B um número secreto para cada um. Eu faço perguntas e deduzo os números pelas suas respostas.",
      paste: "Cole aqui",
      input: "Faça uma pergunta...",
      chat: [
        { from: "ai", text: "Defini os números de A e de B. Pode perguntar." },
        { from: "me", text: "É um milhão ou mais?" },
        { from: "ai", text: "Hmm... sim." },
        { from: "me", text: "É divisível por 3?" },
        { from: "ai", text: "Não." },
        { from: "me", text: "O número de A é 810.000?" },
        { from: "ai", text: "Correto! Boa dedução 🎉" },
      ],
    },
  },
};
