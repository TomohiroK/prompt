import type { Locale } from "@/lib/i18n";

/**
 * 使い方ページの本文。
 *
 * ここに書いてよいのは、掲載中のプロンプトを実際に調べて確かめたことだけ。
 * 「AIごとに挙動がこう違う」のような、確かめていないことは書かない。
 *
 * design.items の3点は、7本すべての本文に含まれていることを機械的に確認して
 * いる（禁止事項の節がある / 秘密を最初に決めて変えない / 最後に正解を明かす）。
 * 項目を増やすときは、同じように全ゲームで確かめてから書くこと。
 */
export type HowToPlayContent = {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  lead: string;
  stepsHeading: string;
  recovery: { heading: string; body: string; example: string };
  design: {
    heading: string;
    lead: string;
    items: { title: string; body: string }[];
    caveat: string;
  };
  faq: { heading: string; items: { q: string; a: string }[] };
  gamesHeading: string;
};

export const howToPlay: Record<Locale, HowToPlayContent> = {
  ja: {
    seoTitle: "ChatGPTでゲームを遊ぶ方法｜コピペの手順と直し方",
    seoDescription:
      "ChatGPT・Claude・Gemini でゲームを遊ぶ手順を3ステップで説明します。AIが途中でルールを忘れたときの戻し方、掲載しているプロンプトに共通して入れている公平性の指示、よくある質問をまとめました。登録もインストールも不要です。",
    heading: "使い方",
    lead: "コピーして、貼って、遊ぶ。それだけです。うまく進まないときの直し方も置いておきます。",
    stepsHeading: "3ステップ",
    recovery: {
      heading: "AIがルールを忘れたら",
      body: "会話が長くなると、AIが最初の指示どおりに動かなくなることがあります。最初からやり直す必要はありません。次のように伝えると、たいてい戻ります。",
      example:
        "最初のルールに従ってください。残りの回数も教えてください。",
    },
    design: {
      heading: "掲載しているプロンプトに共通していること",
      lead: "AIとゲームをすると、途中で正解が変わったように感じることがあります。掲載中の7本には、それを防ぐ指示を入れてあります。",
      items: [
        {
          title: "禁止事項を書いてある",
          body: "AIがやってはいけないことを、プロンプトの中に箇条書きで並べています。7本すべてにあります。",
        },
        {
          title: "秘密は最初に決めて、変えない",
          body: "正解・お題・犯人・下限価格は開始時に確定させ、途中で変更することを禁じています。プレイヤーの答えを見てから作ることも禁止しています。",
        },
        {
          title: "終わったら正解を明かす",
          body: "勝っても負けても、最後に答えを出させます。曖昧なまま終わらせません。",
        },
      ],
      caveat:
        "ただしAIは会話の履歴しか持たないため、これらの指示は保証ではありません。長い対話ではずれることがあります。そのときは上の言い方で戻してください。",
    },
    faq: {
      heading: "よくある質問",
      items: [
        {
          q: "どのAIで遊べますか",
          a: "ChatGPT・Claude・Gemini など、長い文章を受け付けるチャットAIであれば動きます。",
        },
        {
          q: "課金やアカウント登録は必要ですか",
          a: "このサイトの利用に登録は要りません。貼り付け先のAIサービスの利用条件には従ってください。",
        },
        {
          q: "プロンプトを書き換えてもいいですか",
          a: "自由に使って、書き換えて構いません。ターン数や難易度を変える前提で作ってあります。",
        },
        {
          q: "1人で遊べますか",
          a: "掲載中の7本はすべて1人用です。相手を集める必要はありません。",
        },
      ],
    },
    gamesHeading: "遊べるゲーム",
  },

  en: {
    seoTitle: "How to Play Games with ChatGPT — Copy, Paste, Fix",
    seoDescription:
      "Three steps to play a game with ChatGPT, Claude or Gemini. How to get the AI back on track when it forgets the rules, what every prompt on this site has in common, and answers to common questions. No install, no sign-up.",
    heading: "How to play",
    lead: "Copy, paste, play. That is the whole thing. Here is what to do when it stops working.",
    stepsHeading: "Three steps",
    recovery: {
      heading: "When the AI forgets the rules",
      body: "In a long conversation the AI may stop following the original instructions. You do not need to start over. This usually brings it back.",
      example:
        "Follow the rules from the original instructions. Also tell me how many turns are left.",
    },
    design: {
      heading: "What every prompt here has in common",
      lead: "Playing a game with an AI often feels like the answer changed halfway through. All seven prompts carry instructions written to prevent that.",
      items: [
        {
          title: "A list of things the AI must not do",
          body: "Each prompt spells out its prohibitions as a list. All seven have one.",
        },
        {
          title: "The secret is fixed at the start and cannot change",
          body: "The answer, the secret word, the culprit, the reserve price — all decided before play begins, and changing them is forbidden. So is inventing the answer after seeing your guess.",
        },
        {
          title: "The answer is revealed at the end",
          body: "Win or lose, the AI has to show the answer. The game never ends ambiguously.",
        },
      ],
      caveat:
        "These are instructions, not guarantees. An AI holds nothing but the conversation itself, so a long game can still drift. When it does, use the line above.",
    },
    faq: {
      heading: "Common questions",
      items: [
        {
          q: "Which assistants work?",
          a: "Any chat assistant that accepts a long prompt — ChatGPT, Claude, Gemini and others.",
        },
        {
          q: "Do I need an account or a subscription?",
          a: "Not for this site. The terms of the AI service you paste into still apply.",
        },
        {
          q: "Can I edit the prompts?",
          a: "Yes. They are written to be edited — change the turn limit or the difficulty as you like.",
        },
        {
          q: "Can I play alone?",
          a: "All seven are single-player. You never need to gather a group.",
        },
      ],
    },
    gamesHeading: "Games you can play",
  },

  ko: {
    seoTitle: "챗GPT로 게임하는 법 — 복붙 순서와 되돌리는 법",
    seoDescription:
      "ChatGPT·Claude·Gemini로 게임을 즐기는 순서를 3단계로 정리했습니다. AI가 도중에 규칙을 잊었을 때 되돌리는 방법, 수록된 프롬프트에 공통으로 넣은 공정성 지시, 자주 묻는 질문을 담았습니다. 설치도 가입도 필요 없습니다.",
    heading: "이용 방법",
    lead: "복사하고, 붙여넣고, 놀면 끝입니다. 잘 안 될 때 되돌리는 방법도 함께 적어 둡니다.",
    stepsHeading: "3단계",
    recovery: {
      heading: "AI가 규칙을 잊었을 때",
      body: "대화가 길어지면 AI가 처음 지시대로 움직이지 않을 때가 있습니다. 처음부터 다시 할 필요는 없습니다. 이렇게 말하면 대개 돌아옵니다.",
      example: "처음 규칙을 따라 주세요. 남은 횟수도 알려 주세요.",
    },
    design: {
      heading: "수록된 프롬프트의 공통점",
      lead: "AI와 게임을 하다 보면 도중에 정답이 바뀐 것처럼 느껴질 때가 있습니다. 수록된 7가지에는 그것을 막는 지시를 넣어 두었습니다.",
      items: [
        {
          title: "금지 사항을 적어 두었습니다",
          body: "AI가 해서는 안 되는 일을 프롬프트 안에 목록으로 적어 두었습니다. 7가지 모두에 있습니다.",
        },
        {
          title: "비밀은 처음에 정하고 바꾸지 않습니다",
          body: "정답·제시어·범인·최저 가격은 시작할 때 확정하고, 도중에 바꾸는 것을 금지합니다. 플레이어의 답을 본 뒤에 만드는 것도 금지합니다.",
        },
        {
          title: "끝나면 정답을 밝힙니다",
          body: "이기든 지든 마지막에 답을 내놓게 합니다. 애매하게 끝내지 않습니다.",
        },
      ],
      caveat:
        "다만 AI는 대화 기록만 가지고 있어서, 이 지시가 보증은 아닙니다. 긴 대화에서는 어긋날 수 있습니다. 그때는 위의 말로 되돌리세요.",
    },
    faq: {
      heading: "자주 묻는 질문",
      items: [
        {
          q: "어떤 AI에서 즐길 수 있나요",
          a: "ChatGPT·Claude·Gemini 등 긴 문장을 받아들이는 채팅 AI라면 작동합니다.",
        },
        {
          q: "결제나 회원가입이 필요한가요",
          a: "이 사이트를 쓰는 데 가입은 필요 없습니다. 붙여넣는 AI 서비스의 이용 약관은 따라 주세요.",
        },
        {
          q: "프롬프트를 고쳐도 되나요",
          a: "자유롭게 쓰고 고쳐도 됩니다. 턴 수나 난이도를 바꾸는 것을 전제로 만들었습니다.",
        },
        {
          q: "혼자서도 즐길 수 있나요",
          a: "수록된 7가지는 모두 1인용입니다. 사람을 모을 필요가 없습니다.",
        },
      ],
    },
    gamesHeading: "즐길 수 있는 게임",
  },

  zh: {
    seoTitle: "如何用 ChatGPT 玩游戏 — 复制粘贴的步骤与卡住时的处理",
    seoDescription:
      "用 ChatGPT、Claude、Gemini 玩游戏的三个步骤。AI 中途忘记规则时如何拉回来，本站提示词共同写入的公平性约束，以及常见问题。免安装、免注册。",
    heading: "使用方法",
    lead: "复制、粘贴、开玩，就这些。卡住时的处理方法也一并写在这里。",
    stepsHeading: "三个步骤",
    recovery: {
      heading: "AI 忘记规则时",
      body: "对话变长后，AI 可能不再按最初的指示行动。不必从头再来。这样说通常就能拉回来。",
      example: "请按照最初的规则继续。另外告诉我还剩几次。",
    },
    design: {
      heading: "本站提示词的共同点",
      lead: "和 AI 玩游戏时，常会觉得答案中途被改掉了。收录的 7 款都写入了防止这种情况的约束。",
      items: [
        {
          title: "写明了禁止事项",
          body: "把 AI 不能做的事以列表写在提示词里。7 款全部都有。",
        },
        {
          title: "秘密在开局确定，不再更改",
          body: "答案、词语、凶手、底价都在开始前确定，并禁止中途更改。也禁止看到你的猜测后再编造答案。",
        },
        {
          title: "结束时公布答案",
          body: "无论输赢，最后都要给出答案。不会含糊收场。",
        },
      ],
      caveat:
        "不过 AI 只持有对话本身，这些约束并非保证。长对话仍可能走偏。遇到时用上面那句话拉回来。",
    },
    faq: {
      heading: "常见问题",
      items: [
        {
          q: "可以在哪些 AI 上玩",
          a: "ChatGPT、Claude、Gemini 等能接受长文本的聊天 AI 都可以。",
        },
        {
          q: "需要付费或注册吗",
          a: "使用本站不需要注册。粘贴目标的 AI 服务的使用条款仍然适用。",
        },
        {
          q: "可以修改提示词吗",
          a: "可以自由使用和修改。回合数和难度本来就是留给你改的。",
        },
        {
          q: "一个人能玩吗",
          a: "收录的 7 款全部是单人游戏，不需要凑人。",
        },
      ],
    },
    gamesHeading: "可以玩的游戏",
  },

  es: {
    seoTitle: "Cómo jugar con ChatGPT — Copiar, pegar y arreglar",
    seoDescription:
      "Tres pasos para jugar con ChatGPT, Claude o Gemini. Cómo hacer que la IA vuelva a las reglas cuando las olvida, qué tienen en común todos los prompts de este sitio y respuestas a las dudas habituales. Sin instalar nada y sin registro.",
    heading: "Cómo jugar",
    lead: "Copiar, pegar, jugar. Eso es todo. Aquí tienes qué hacer cuando deja de funcionar.",
    stepsHeading: "Tres pasos",
    recovery: {
      heading: "Cuando la IA olvida las reglas",
      body: "En una conversación larga la IA puede dejar de seguir las instrucciones iniciales. No hace falta empezar de cero. Esto suele devolverla al camino.",
      example:
        "Sigue las reglas de las instrucciones iniciales. Dime también cuántos turnos quedan.",
    },
    design: {
      heading: "Qué tienen en común todos los prompts",
      lead: "Al jugar con una IA es fácil sentir que la respuesta cambió a mitad de partida. Los siete prompts llevan instrucciones escritas para evitarlo.",
      items: [
        {
          title: "Una lista de lo que la IA no puede hacer",
          body: "Cada prompt enumera sus prohibiciones. Los siete la tienen.",
        },
        {
          title: "El secreto se fija al empezar y no cambia",
          body: "La respuesta, la palabra, el culpable, el precio mínimo: todo queda decidido antes de jugar y cambiarlo está prohibido. Inventar la respuesta después de ver tu intento, también.",
        },
        {
          title: "Al final se revela la respuesta",
          body: "Ganes o pierdas, la IA tiene que mostrarla. La partida nunca termina en el aire.",
        },
      ],
      caveat:
        "Son instrucciones, no garantías. Una IA solo dispone de la propia conversación, así que una partida larga puede desviarse. Cuando pase, usa la frase de arriba.",
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        {
          q: "¿Con qué asistentes funciona?",
          a: "Con cualquiera que acepte un prompt largo: ChatGPT, Claude, Gemini y otros.",
        },
        {
          q: "¿Necesito cuenta o suscripción?",
          a: "Para este sitio no. Se aplican las condiciones del servicio de IA donde lo pegues.",
        },
        {
          q: "¿Puedo modificar los prompts?",
          a: "Sí. Están escritos para editarse: cambia los turnos o la dificultad a tu gusto.",
        },
        {
          q: "¿Puedo jugar solo?",
          a: "Los siete son para un jugador. Nunca hace falta reunir a nadie.",
        },
      ],
    },
    gamesHeading: "Juegos disponibles",
  },

  pt: {
    seoTitle: "Como jogar com o ChatGPT — Copiar, colar, consertar",
    seoDescription:
      "Três passos para jogar com o ChatGPT, o Claude ou o Gemini. Como trazer a IA de volta às regras quando ela esquece, o que todos os prompts do site têm em comum e respostas às dúvidas mais frequentes. Sem instalar, sem cadastro.",
    heading: "Como jogar",
    lead: "Copiar, colar, jogar. É só isso. Aqui está o que fazer quando parar de funcionar.",
    stepsHeading: "Três passos",
    recovery: {
      heading: "Quando a IA esquece as regras",
      body: "Em uma conversa longa a IA pode deixar de seguir as instruções iniciais. Não precisa recomeçar. Isso costuma trazê-la de volta.",
      example:
        "Siga as regras das instruções iniciais. Diga também quantos turnos restam.",
    },
    design: {
      heading: "O que todos os prompts têm em comum",
      lead: "Jogar com uma IA muitas vezes dá a sensação de que a resposta mudou no meio. Os sete prompts trazem instruções escritas para evitar isso.",
      items: [
        {
          title: "Uma lista do que a IA não pode fazer",
          body: "Cada prompt lista as proibições. Todos os sete têm uma.",
        },
        {
          title: "O segredo é fixado no início e não muda",
          body: "A resposta, a palavra, o culpado, o preço mínimo: tudo decidido antes de começar, e mudar é proibido. Inventar a resposta depois de ver o seu palpite, também.",
        },
        {
          title: "No fim a resposta é revelada",
          body: "Ganhando ou perdendo, a IA precisa mostrar a resposta. A partida nunca termina no vácuo.",
        },
      ],
      caveat:
        "São instruções, não garantias. Uma IA tem apenas a própria conversa, então uma partida longa ainda pode se desviar. Quando isso acontecer, use a frase acima.",
    },
    faq: {
      heading: "Perguntas frequentes",
      items: [
        {
          q: "Com quais assistentes funciona?",
          a: "Com qualquer um que aceite um prompt longo: ChatGPT, Claude, Gemini e outros.",
        },
        {
          q: "Preciso de conta ou assinatura?",
          a: "Para este site, não. Valem os termos do serviço de IA onde você colar.",
        },
        {
          q: "Posso alterar os prompts?",
          a: "Pode. Eles são escritos para serem editados: mude os turnos ou a dificuldade como quiser.",
        },
        {
          q: "Dá para jogar sozinho?",
          a: "Os sete são para um jogador. Nunca é preciso reunir ninguém.",
        },
      ],
    },
    gamesHeading: "Jogos disponíveis",
  },
};
