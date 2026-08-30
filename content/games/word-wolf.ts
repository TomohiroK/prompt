import type { Game } from "../types";

export const wordWolf: Game = {
  slug: "word-wolf",
  category: "hidden-role",
  difficulty: "normal",
  playtimeMinutes: { min: 10, max: 20 },
  content: {
    ja: {
      title: "ワードウルフ（1人用）",
      seoTitle: "ワードウルフ 一人用｜AIが4人を演じるソロ人狼プロンプト",
      tagline: "4人のうち1人だけお題が違う。会話のズレから、少数派を探し出せ。",
      description:
        "本来は複数人で遊ぶ正体隠匿ゲームを、AIが4人のキャラクターを同時に演じることで1人でも遊べるようにしたものです。3人は同じお題、1人だけ違うお題を持っています。3ラウンドの会話を観察し、微妙に噛み合わない発言をしている「ウルフ」を指名します。",
      playtime: "10〜20分",
      players: "1人",
      howToPlay: [
        "プロンプトをコピーしてAIに貼り付ける。4人のキャラとお題が設定される。",
        "各ラウンド、4人が順番に、お題について1言ずつ発言する。",
        "プレイヤーは誰か1人を指名して質問できる（1ラウンド1回）。",
        "3ラウンド終了後、ウルフだと思う人物を1人指名する。",
        "正解ならプレイヤーの勝ち。お題とウルフの正体が公開される。",
      ],
      tips: [
        "序盤の発言は全員が抽象的になる。断定を避けている人ほど怪しい、とは限らない点に注意。",
        "「それ、いつ使う？」のように用途や場面を聞く質問はズレを炙り出しやすい。",
        "多数派の言葉づかいに合わせにきている人物を探す。ウルフは他人の発言を後追いしがち。",
        "難易度を上げたいときは、貼り付ける前に「お題のペアは意味が近いものにする」と書き足す。",
      ],
      prompt: `あなたは「ワードウルフ」のゲームマスターであり、同時に4人のプレイヤーキャラクターを演じます。
私は観察者として会話を見て、1人だけお題が違う「ウルフ」を当てます。

1. 準備
以下を内部で決定し、固定してください。

* 4人のキャラクター（名前と一言で分かる性格を設定する。例：ハルカ＝理屈っぽい / ケンジ＝おおざっぱ / ミオ＝慎重 / タクミ＝マイペース）
* 多数派のお題（3人が共有する言葉）
* 少数派のお題（1人だけが持つ言葉）
* 誰がウルフ（少数派）かを1人だけ決める

お題のペアは、意味が近くて会話が成立する組み合わせにしてください。
例：「海」と「川」／「ラーメン」と「うどん」／「学校」と「会社」／「猫」と「犬」

最重要ルール：一度決めたお題とウルフは、ゲーム中に変更してはいけません。
私の推理を見てから、都合よくウルフを入れ替えることは禁止です。

2. 各キャラクターの振る舞い
* 全員、自分のお題については知っていますが、他人のお題は知りません。
* 自分がウルフかどうかも分かっていません。
* 発言は、自分のお題について、直接その単語を言わずに語ってください。
* お題そのものの単語、およびその言い換えとして明白な単語は絶対に発言してはいけません。
* ウルフ役も、自分のお題を正直な前提として自然に発言してください。わざと多数派に合わせて嘘をつくことはしません。会話のズレは自然に発生させてください。

3. 進行
全部で3ラウンド行います。
各ラウンドで、4人が1人ずつ、お題について1〜2文の発言をしてください。
発言は必ず以下の形式で表示してください。

ハルカ：（発言）
ケンジ：（発言）
ミオ：（発言）
タクミ：（発言）

各ラウンドの発言が終わったら、

「ラウンド○終了です。誰か1人に質問できます。質問する相手と内容をどうぞ。（質問しない場合は『なし』）」

と私に尋ねてください。
私が誰かを指名して質問したら、その人物だけが自分のお題に基づいて正直に答えます。
質問は1ラウンドにつき1回までです。

4. 投票と判定
3ラウンド終了後、

「3ラウンド終了です。ウルフだと思う人物を1人指名してください。」

と伝えてください。
私が1人を指名したら、以下を公開してください。

* 正解 / 不正解
* 多数派のお題
* 少数派のお題
* ウルフだった人物

その後、どの発言がズレのサインだったかを3つまで挙げて簡潔に解説してください。

5. 公平性に関する最重要事項
以下は禁止です。

* 私の推理を見てからウルフやお題を変更する
* ウルフに、多数派のお題を知っているかのような発言をさせる
* お題そのものの単語を発言させる
* ゲーム中に正解を示唆する
* 4人のうち誰が怪しいかを、ゲームマスターとして論評する

それではキャラクターとお題を設定し、ラウンド1から開始してください。`,
    },

    en: {
      title: "Word Wolf (solo)",
      seoTitle: "Word Wolf Solo — Social Deduction Prompt for ChatGPT",
      tagline: "Four speakers, one different word. Find the odd one out.",
      description:
        "A social deduction game adapted for one player: the AI performs all four characters at once. Three of them share a secret word and one holds a different one. You watch three rounds of conversation and name the character whose remarks quietly fail to line up.",
      playtime: "10-20 min",
      players: "1 player",
      howToPlay: [
        "Copy the prompt into an AI chat. It sets up four characters and the two words.",
        "Each round, all four say something about their word in turn.",
        "You may question one character per round.",
        "After three rounds, name the character you believe is the wolf.",
        "Guess right and you win. Both words and the wolf's identity are revealed.",
      ],
      tips: [
        "Everyone sounds vague in round one. Being non-committal is not evidence on its own.",
        "Questions about use and occasion — \"when would you do that?\" — expose the mismatch fastest.",
        "Watch for someone adopting the vocabulary others used. The wolf tends to follow rather than lead.",
        "For a harder game, add \"make the two words close in meaning\" before you paste.",
      ],
      prompt: `You are the game master of Word Wolf, and you also perform all four player characters.
I watch the conversation as an observer and try to spot the one character whose word is different: the wolf.

1. Setup
Decide and fix the following internally.

* Four characters (a name plus a personality summed up in a few words, e.g. Hana = analytical / Ken = easygoing / Mio = cautious / Taku = does their own thing)
* The majority word (shared by three characters)
* The minority word (held by exactly one character)
* Which single character is the wolf (the minority)

Choose a pair of words that are close enough in meaning for the conversation to hold together.
Examples: "sea" and "river" / "ramen" and "udon" / "school" and "office" / "cat" and "dog"

Most important rule: once fixed, the words and the wolf must never change during the game.
Swapping the wolf conveniently after seeing my reasoning is forbidden.

2. How each character behaves
* Everyone knows their own word, but nobody knows anyone else's.
* Nobody knows whether they are the wolf.
* Each remark must talk about their own word without ever naming it directly.
* The word itself, and any obvious synonym for it, must never be spoken.
* The wolf also speaks sincerely from their own word. They do not deliberately lie to blend in. Let the mismatch arise naturally.

3. Flow
Play three rounds in total.
In each round, all four characters make a remark of one or two sentences about their word, one after another.
Always present the remarks in this format:

Hana: (remark)
Ken: (remark)
Mio: (remark)
Taku: (remark)

After the remarks of each round, ask me:

"Round N is over. You may question one character. Tell me who and what you want to ask. (Reply 'none' to skip.)"

If I name someone and ask a question, only that character answers, honestly, based on their own word.
I may ask at most one question per round.

4. Vote and verdict
After the third round, say:

"Three rounds are over. Name the character you believe is the wolf."

When I name one, reveal the following.

* Correct / incorrect
* The majority word
* The minority word
* Who the wolf was

Then point out up to three remarks that were the real signs of the mismatch, briefly.

5. Fairness: the most important part
The following are forbidden:

* changing the wolf or the words after seeing my reasoning
* letting the wolf speak as if they knew the majority word
* letting anyone say the secret word itself
* hinting at the answer during play
* commenting, as game master, on who seems suspicious

Now set up the characters and the words, and begin with round 1.`,
    },

    ko: {
      title: "워드울프 (1인용)",
      tagline: "네 명 중 한 명만 주제가 다릅니다. 대화의 어긋남에서 소수파를 찾아내세요.",
      description:
        "본래 여러 명이 즐기는 정체 은닉 게임을, AI가 네 명의 캐릭터를 동시에 연기함으로써 혼자서도 즐길 수 있게 만든 버전입니다. 세 명은 같은 주제를, 한 명만 다른 주제를 가집니다. 3라운드의 대화를 관찰해 미묘하게 맞물리지 않는 발언을 하는 「울프」를 지목하세요.",
      playtime: "10~20분",
      players: "1인",
      howToPlay: [
        "프롬프트를 복사해 AI에 붙여넣습니다. 네 명의 캐릭터와 주제가 설정됩니다.",
        "각 라운드에서 네 명이 차례로 주제에 대해 한마디씩 발언합니다.",
        "플레이어는 한 명을 지목해 질문할 수 있습니다(라운드당 1회).",
        "3라운드가 끝나면 울프라고 생각하는 인물을 한 명 지목합니다.",
        "맞히면 플레이어의 승리. 주제와 울프의 정체가 공개됩니다.",
      ],
      tips: [
        "초반 발언은 모두가 추상적입니다. 단정을 피한다고 해서 반드시 수상한 것은 아닙니다.",
        "「그거 언제 써요?」처럼 용도나 상황을 묻는 질문이 어긋남을 드러내기 쉽습니다.",
        "다수파의 표현을 따라 맞추려는 인물을 찾으세요. 울프는 남의 발언을 뒤따르기 쉽습니다.",
        "난이도를 올리려면 붙여넣기 전에 「주제 쌍은 의미가 가까운 것으로」라고 덧붙이세요.",
      ],
      prompt: `당신은 「워드울프」의 게임 마스터이자, 동시에 네 명의 플레이어 캐릭터를 연기합니다.
저는 관찰자로서 대화를 보고, 한 명만 주제가 다른 「울프」를 맞힙니다.

1. 준비
아래를 내부적으로 결정해 고정하세요.

* 네 명의 캐릭터(이름과 한마디로 알 수 있는 성격을 설정. 예: 하루카=따지기 좋아함 / 겐지=대충대충 / 미오=신중함 / 타쿠미=마이페이스)
* 다수파의 주제(세 명이 공유하는 단어)
* 소수파의 주제(한 명만 가진 단어)
* 누가 울프(소수파)인지 한 명만 결정

주제 쌍은 의미가 가까워 대화가 성립하는 조합으로 하세요.
예: 「바다」와 「강」 / 「라멘」과 「우동」 / 「학교」와 「회사」 / 「고양이」와 「개」

가장 중요한 규칙: 한 번 정한 주제와 울프는 게임 중에 변경해서는 안 됩니다.
제 추리를 본 뒤 유리하게 울프를 바꾸는 것은 금지입니다.

2. 각 캐릭터의 행동
* 모두 자신의 주제는 알지만, 다른 사람의 주제는 모릅니다.
* 자신이 울프인지도 모릅니다.
* 발언은 자신의 주제에 대해, 그 단어를 직접 말하지 않고 이야기하세요.
* 주제 그 자체의 단어와, 명백한 바꿔 말하기에 해당하는 단어는 절대 발언해서는 안 됩니다.
* 울프 역시 자신의 주제를 정직한 전제로 삼아 자연스럽게 발언합니다. 일부러 다수파에 맞춰 거짓말하지 않습니다. 대화의 어긋남은 자연스럽게 발생시키세요.

3. 진행
전부 3라운드를 진행합니다.
각 라운드에서 네 명이 한 명씩, 주제에 대해 1~2문장 발언하세요.
발언은 반드시 아래 형식으로 표시하세요.

하루카: (발언)
겐지: (발언)
미오: (발언)
타쿠미: (발언)

각 라운드의 발언이 끝나면

「라운드 ○ 종료입니다. 한 명에게 질문할 수 있습니다. 질문할 상대와 내용을 알려 주세요. (질문하지 않으면 『없음』)」

이라고 저에게 물으세요.
제가 누군가를 지목해 질문하면, 그 인물만 자신의 주제에 근거해 정직하게 답합니다.
질문은 라운드당 1회까지입니다.

4. 투표와 판정
3라운드가 끝나면

「3라운드 종료입니다. 울프라고 생각하는 인물을 한 명 지목해 주세요.」

라고 전하세요.
제가 한 명을 지목하면 아래를 공개하세요.

* 정답 / 오답
* 다수파의 주제
* 소수파의 주제
* 울프였던 인물

그 후 어떤 발언이 어긋남의 신호였는지 최대 3개까지 들어 간결하게 해설하세요.

5. 공정성에 관한 가장 중요한 사항
아래는 금지입니다.

* 제 추리를 본 뒤 울프나 주제를 변경하는 것
* 울프가 다수파의 주제를 아는 것처럼 발언하게 하는 것
* 주제 그 자체의 단어를 발언하게 하는 것
* 게임 중에 정답을 시사하는 것
* 네 명 중 누가 수상한지를 게임 마스터로서 논평하는 것

그럼 캐릭터와 주제를 설정하고 라운드 1부터 시작하세요.`,
    },

    zh: {
      title: "谁是卧底（单人版）",
      seoTitle: "谁是卧底 单人版 — ChatGPT 身份隐藏游戏提示词",
      tagline: "四人之中只有一人拿到不同的词。从对话的错位里找出少数派。",
      description:
        "原本需要多人参与的身份隐藏游戏，由 AI 同时扮演四个角色，让一个人也能玩。三人共享同一个词，只有一人拿到不同的词。观察三轮对话，指出那位发言微妙对不上的「卧底」。",
      playtime: "10～20 分钟",
      players: "1 人",
      howToPlay: [
        "复制提示词粘贴到 AI。AI 会设定四个角色与两个词。",
        "每一轮，四个人依次就自己的词各说一句。",
        "玩家每轮可以指名一人提问（每轮 1 次）。",
        "三轮结束后，指认你认为是卧底的人。",
        "猜中即获胜，两个词与卧底身份会被公布。",
      ],
      tips: [
        "第一轮所有人都很抽象，说话含糊本身并不构成证据。",
        "问「你什么时候会用它？」这类关于用途和场合的问题，最容易逼出错位。",
        "留意那种开始模仿别人用词的人。卧底往往是跟着别人说，而不是先说。",
        "想提高难度，粘贴前加上「两个词的意思要尽量接近」。",
      ],
      prompt: `你是「谁是卧底」的主持人，同时要扮演四位玩家角色。
我作为旁观者观看对话，找出只有一人拿到不同词的那位「卧底」。

1. 准备
请在内部确定并锁定以下内容。

* 四位角色（姓名，加上一句话就能看出的性格。例：晴香＝爱讲道理 / 健二＝大大咧咧 / 美绪＝谨慎 / 拓实＝我行我素）
* 多数派的词（三人共享的词）
* 少数派的词（只有一人持有的词）
* 谁是卧底（少数派），只指定一人

两个词要选意思接近、对话仍能成立的组合。
例：「海」与「河」／「拉面」与「乌冬」／「学校」与「公司」／「猫」与「狗」

最重要的规则：一旦确定的词与卧底，游戏过程中不得更改。
看到我的推理后再顺势调换卧底，属于禁止行为。

2. 各角色的行为
* 每个人都知道自己的词，但不知道别人的词。
* 每个人也不知道自己是不是卧底。
* 发言时要围绕自己的词来讲，但绝不能直接说出那个词。
* 词本身，以及明显等价的同义说法，绝对不可说出口。
* 卧底同样以自己的词为真实前提自然发言，不会为了融入多数派而故意说谎。错位要自然产生。

3. 流程
共进行三轮。
每一轮，四位角色依次就自己的词发言 1～2 句。
发言一律采用以下格式呈现：

晴香：（发言）
健二：（发言）
美绪：（发言）
拓实：（发言）

每轮发言结束后，请询问我：

「第○轮结束。你可以向其中一人提问。请说出对象和问题。（不提问请回答『无』）」

我指名提问后，只有那位角色依据自己的词如实回答。
每轮最多提问 1 次。

4. 投票与判定
三轮结束后，请说：

「三轮结束。请指认你认为是卧底的人。」

我指认一人后，请公布以下内容。

* 正确 / 错误
* 多数派的词
* 少数派的词
* 谁是卧底

随后，列举最多三处真正体现错位的发言，并简要说明。

5. 关于公平性的最重要事项
以下行为禁止：

* 看到我的推理后更改卧底或用词
* 让卧底说出仿佛知道多数派用词的话
* 让任何人说出词本身
* 在游戏中暗示答案
* 以主持人身份评论四人中谁比较可疑

那么，请设定角色与用词，从第 1 轮开始。`,
    },

    es: {
      title: "Word Wolf (en solitario)",
      tagline: "Cuatro voces, una palabra distinta. Encuentra al impostor.",
      description:
        "Un juego de rol oculto adaptado para un solo jugador: la IA interpreta a los cuatro personajes a la vez. Tres comparten una palabra secreta y uno tiene otra distinta. Observas tres rondas de conversación y señalas al personaje cuyos comentarios no terminan de encajar.",
      playtime: "10-20 min",
      players: "1 jugador",
      howToPlay: [
        "Copia el prompt en un chat de IA. Se configuran cuatro personajes y las dos palabras.",
        "En cada ronda los cuatro dicen algo por turnos sobre su palabra.",
        "Puedes interrogar a un personaje por ronda.",
        "Tras la tercera ronda, señala a quien creas que es el lobo.",
        "Si aciertas, ganas. Se revelan las dos palabras y la identidad del lobo.",
      ],
      tips: [
        "En la primera ronda todos suenan vagos. Ser impreciso no es prueba de nada por sí solo.",
        "Las preguntas sobre uso y contexto («¿cuándo harías eso?») destapan antes el desajuste.",
        "Fíjate en quien empieza a adoptar el vocabulario de los demás. El lobo sigue más que propone.",
        "Para subir la dificultad, añade «que las dos palabras sean de significado cercano» antes de pegar.",
      ],
      prompt: `Eres el maestro de juego de Word Wolf y, a la vez, interpretas a los cuatro personajes jugadores.
Yo observo la conversación e intento identificar al único personaje que tiene una palabra distinta: el lobo.

1. Preparación
Decide y fija internamente lo siguiente.

* Cuatro personajes (nombre y una personalidad resumida en pocas palabras; por ejemplo Ana = analítica / Beto = despreocupado / Carla = prudente / Dani = va a su aire)
* La palabra mayoritaria (compartida por tres personajes)
* La palabra minoritaria (que tiene exactamente un personaje)
* Cuál es el único personaje que es el lobo (el de la minoría)

Elige un par de palabras lo bastante cercanas para que la conversación se sostenga.
Ejemplos: «mar» y «río» / «pizza» y «empanada» / «colegio» y «oficina» / «gato» y «perro»

Regla más importante: una vez fijados, las palabras y el lobo no pueden cambiar durante la partida.
Cambiar de lobo cuando ya has visto mi razonamiento está prohibido.

2. Cómo se comporta cada personaje
* Todos conocen su propia palabra, pero nadie conoce la de los demás.
* Nadie sabe si es el lobo.
* Cada intervención debe hablar de la palabra propia sin nombrarla nunca directamente.
* La palabra en sí, y cualquier sinónimo evidente, no puede pronunciarse jamás.
* El lobo también habla con sinceridad desde su propia palabra. No miente a propósito para camuflarse. Deja que el desajuste surja de forma natural.

3. Desarrollo
Se juegan tres rondas en total.
En cada ronda, los cuatro personajes intervienen por turnos con una o dos frases sobre su palabra.
Presenta siempre las intervenciones con este formato:

Ana: (intervención)
Beto: (intervención)
Carla: (intervención)
Dani: (intervención)

Al terminar las intervenciones de cada ronda, pregúntame:

«Fin de la ronda N. Puedes interrogar a un personaje. Dime a quién y qué le preguntas. (Responde "ninguno" para saltar.)»

Si nombro a alguien y le hago una pregunta, solo ese personaje responde, con sinceridad, según su propia palabra.
Puedo hacer como mucho una pregunta por ronda.

4. Votación y veredicto
Tras la tercera ronda, di:

«Fin de las tres rondas. Señala al personaje que crees que es el lobo.»

Cuando señale a uno, revela lo siguiente.

* Correcto / incorrecto
* La palabra mayoritaria
* La palabra minoritaria
* Quién era el lobo

Después señala, brevemente, hasta tres intervenciones que fueron las verdaderas señales del desajuste.

5. Equidad: lo más importante
Queda prohibido:

* cambiar al lobo o las palabras después de ver mi razonamiento
* dejar que el lobo hable como si conociera la palabra mayoritaria
* dejar que alguien pronuncie la palabra secreta
* insinuar la solución durante la partida
* comentar, como maestro de juego, quién parece sospechoso

Prepara ahora los personajes y las palabras, y empieza por la ronda 1.`,
    },

    pt: {
      title: "Word Wolf (solo)",
      tagline: "Quatro vozes, uma palavra diferente. Ache o infiltrado.",
      description:
        "Um jogo de papel oculto adaptado para um jogador só: a IA interpreta os quatro personagens ao mesmo tempo. Três compartilham uma palavra secreta e um tem outra. Você observa três rodadas de conversa e aponta o personagem cujos comentários não fecham direito.",
      playtime: "10-20 min",
      players: "1 jogador",
      howToPlay: [
        "Copie o prompt para um chat de IA. Ele monta quatro personagens e as duas palavras.",
        "A cada rodada, os quatro falam sobre a própria palavra, um por vez.",
        "Você pode interrogar um personagem por rodada.",
        "Depois da terceira rodada, aponte quem você acha que é o lobo.",
        "Acertou, você vence. As duas palavras e a identidade do lobo são reveladas.",
      ],
      tips: [
        "Na primeira rodada todos soam vagos. Ser impreciso, sozinho, não é prova de nada.",
        "Perguntas sobre uso e ocasião («quando você faria isso?») expõem o descompasso mais rápido.",
        "Repare em quem começa a adotar o vocabulário dos outros. O lobo segue mais do que propõe.",
        "Para aumentar a dificuldade, acrescente «faça as duas palavras terem sentidos próximos» antes de colar.",
      ],
      prompt: `Você é o mestre do jogo Word Wolf e, ao mesmo tempo, interpreta os quatro personagens jogadores.
Eu observo a conversa e tento identificar o único personagem com uma palavra diferente: o lobo.

1. Preparação
Decida e fixe internamente o seguinte.

* Quatro personagens (nome e uma personalidade resumida em poucas palavras; por exemplo Ana = analítica / Beto = despreocupado / Carla = cautelosa / Dani = faz do seu jeito)
* A palavra majoritária (compartilhada por três personagens)
* A palavra minoritária (que exatamente um personagem tem)
* Qual é o único personagem que é o lobo (o da minoria)

Escolha um par de palavras próximas o bastante para a conversa se sustentar.
Exemplos: «mar» e «rio» / «pizza» e «esfiha» / «escola» e «escritório» / «gato» e «cachorro»

Regra mais importante: uma vez fixados, as palavras e o lobo não podem mudar durante a partida.
Trocar o lobo depois de ver meu raciocínio é proibido.

2. Como cada personagem se comporta
* Todos conhecem a própria palavra, mas ninguém conhece a dos outros.
* Ninguém sabe se é o lobo.
* Cada fala precisa tratar da própria palavra sem nunca dizê-la diretamente.
* A palavra em si, e qualquer sinônimo evidente, jamais pode ser pronunciada.
* O lobo também fala com sinceridade a partir da própria palavra. Ele não mente de propósito para se camuflar. Deixe o descompasso surgir naturalmente.

3. Andamento
São três rodadas no total.
Em cada rodada, os quatro personagens falam, um por vez, uma ou duas frases sobre a própria palavra.
Apresente sempre as falas neste formato:

Ana: (fala)
Beto: (fala)
Carla: (fala)
Dani: (fala)

Ao fim das falas de cada rodada, pergunte:

«Fim da rodada N. Você pode interrogar um personagem. Diga quem e o que quer perguntar. (Responda "nenhum" para pular.)»

Se eu escolher alguém e fizer uma pergunta, só esse personagem responde, com sinceridade, segundo a própria palavra.
Posso fazer no máximo uma pergunta por rodada.

4. Votação e veredito
Depois da terceira rodada, diga:

«As três rodadas acabaram. Aponte o personagem que você acha que é o lobo.»

Quando eu apontar um, revele o seguinte.

* Correto / incorreto
* A palavra majoritária
* A palavra minoritária
* Quem era o lobo

Depois indique, brevemente, até três falas que foram os verdadeiros sinais do descompasso.

5. Justiça: o ponto mais importante
É proibido:

* mudar o lobo ou as palavras depois de ver meu raciocínio
* deixar o lobo falar como se conhecesse a palavra majoritária
* deixar alguém pronunciar a palavra secreta
* insinuar a resposta durante a partida
* comentar, como mestre do jogo, quem parece suspeito

Monte agora os personagens e as palavras, e comece pela rodada 1.`,
    },
  },
};
