import type { Game } from "../types";

export const whodunit: Game = {
  slug: "whodunit",
  category: "reasoning",
  difficulty: "normal",
  content: {
    ja: {
      title: "犯人当てミステリー",
      tagline: "容疑者3人。証言のどこかに、必ず1つだけ嘘がある。",
      description:
        "AIが事件と3人の容疑者を生成し、プレイヤーは探偵として尋問します。犯人だけが嘘をつき、無実の2人は必ず本当のことを言います。合計9問の尋問で矛盾を見つけ、犯人を指名してください。事件は毎回ランダムに生成されるので、何度でも遊べます。",
      playtime: "15〜30分",
      players: "1人",
      howToPlay: [
        "プロンプトをコピーしてAIに貼り付ける。事件の概要と容疑者3人が提示される。",
        "容疑者1人につき最大3問、合計9問まで尋問できる。",
        "無実の2人は必ず真実を答える。犯人は自分に不利な事実だけ嘘をつく。",
        "証言の食い違いを見つけたら、犯人を1人指名する。",
        "真相と、どの証言が決定的だったかが解説される。",
      ],
      tips: [
        "同じ質問を3人全員にぶつけると、食い違いが浮かび上がりやすい。",
        "「誰を見たか」より「何時にどこにいたか」を聞く。時刻と場所は嘘をつくと必ず矛盾する。",
        "無実の2人の証言は必ず整合する。2人の話が合っていれば、残る1人が怪しい。",
        "難易度を上げたいときは、貼り付ける前に「尋問は合計6問まで」と書き足す。",
      ],
      prompt: `あなたは推理ゲーム「犯人当てミステリー」のゲームマスターです。
私は探偵として、3人の容疑者を尋問し、犯人を1人特定します。

1. 事件の設定
ゲーム開始時に、以下を内部で決定し固定してください。

* 事件の概要（盗難・破壊・すり替えなど、殺人以外の軽微な事件にすること）
* 事件が起きた場所と時刻
* 容疑者3人（名前・職業・事件現場との関係）
* 3人それぞれのアリバイ（どこで何をしていたか）
* 犯人が誰か（3人のうち1人）

事件は、時刻と場所の組み合わせだけで論理的に犯人を特定できるように設計してください。
つまり、犯人の嘘を無実2人の証言と突き合わせれば、必ず矛盾が検出できる構造にしてください。

最重要ルール：一度決めた犯人と設定は、私の尋問を見てから変更してはいけません。
私の推理を見てから、都合よく犯人を入れ替えることは禁止です。

2. 開始時の提示
ゲーム開始時に、以下だけを私に提示してください。

* 事件の概要（何が、いつ、どこで起きたか）
* 容疑者3人の名前・職業・事件現場との関係

犯人とアリバイの詳細は、絶対に提示しないでください。

3. 尋問のルール
私は容疑者1人につき最大3問、合計9問まで尋問できます。
質問するときは、誰に何を聞くかを私が指定します。
毎回の回答の最後に、必ず以下を表示してください。

残り尋問回数：（容疑者Aの名前）○問 /（容疑者Bの名前）○問 /（容疑者Cの名前）○問

4. 証言のルール
* 無実の2人は、自分が知っている範囲で必ず真実を答えます。嘘をつきません。
* 無実の2人は、自分が見ていないことについては「見ていない」「知らない」と正直に答えます。推測で語りません。
* 犯人は、自分の犯行に直接不利になる事実についてのみ嘘をつきます。それ以外は真実を答えます。
* 犯人の嘘は、必ず他の証言や事件の時系列と矛盾するように設計してください。
* 全員、質問には必ず答えます。「答えたくない」と拒否させないでください。

証言は必ず以下の形式で表示してください。

（容疑者名）：「（証言）」

5. 判定
私が犯人を1人指名したら、以下を公開してください。

* 正解 / 不正解
* 真犯人と、その犯行の全容（時系列で）
* 犯人がついた嘘は具体的にどれだったか
* その嘘が、どの証言と矛盾していたか

6. 公平性に関する最重要事項
以下は禁止です。

* 私の推理を見てから犯人や設定を変更する
* 無実の人物に嘘をつかせる
* 犯人に、矛盾が検出できない嘘をつかせる
* 論理的に特定不可能な事件を作る
* ゲーム中に、誰が怪しいかをゲームマスターとして示唆する

それでは事件を設定し、事件の概要と容疑者3人を提示してゲームを開始してください。`,
    },

    en: {
      title: "Whodunit",
      tagline: "Three suspects. Exactly one lie hides somewhere in the testimony.",
      description:
        "The AI generates a case and three suspects, and you interrogate them as the detective. Only the culprit lies; the two innocent suspects always tell the truth. You have nine questions in total to find the contradiction and name your suspect. A fresh case is generated every time.",
      playtime: "15-30 min",
      players: "1 player",
      howToPlay: [
        "Copy the prompt into an AI chat. It presents the case and three suspects.",
        "Interrogate each suspect up to three times, nine questions in total.",
        "The two innocents always tell the truth. The culprit lies only about what incriminates them.",
        "When you spot the contradiction, name one suspect.",
        "The AI reveals the truth and which testimony was decisive.",
      ],
      tips: [
        "Asking all three the same question makes the mismatch surface fastest.",
        "Ask where someone was at a given time rather than who they saw. Times and places are what a lie has to break.",
        "The two innocent accounts always agree. If two line up, the third is your suspect.",
        "For a harder game, add \"limit me to six questions in total\" before you paste.",
      ],
      prompt: `You are the game master of a deduction game called Whodunit.
I play a detective, interrogate three suspects, and name the culprit.

1. Setting up the case
At the start of the game, decide and fix the following internally.

* An outline of the case (a minor crime such as theft, vandalism or a swap; never a murder)
* Where and when it happened
* Three suspects (name, occupation, relationship to the scene)
* An alibi for each of them (where they were and what they were doing)
* Which one of the three is the culprit

Design the case so that the culprit can be identified purely from the combination of times and places.
In other words, cross-checking the culprit's lie against the two innocent testimonies must always expose a contradiction.

Most important rule: once fixed, the culprit and the setup must never change after seeing my questions.
Swapping the culprit conveniently after seeing my reasoning is forbidden.

2. What to show at the start
At the start of the game, present only the following to me.

* The outline of the case (what happened, when and where)
* The three suspects: name, occupation, relationship to the scene

Never reveal the culprit or the details of the alibis.

3. Interrogation rules
I may ask each suspect up to 3 questions, 9 in total.
When I ask, I specify who I am questioning and what I ask.
At the end of every reply, always display:

Questions remaining: (suspect A's name) N / (suspect B's name) N / (suspect C's name) N

4. Testimony rules
* The two innocent suspects always answer truthfully as far as they know. They never lie.
* About things they did not witness, the innocent suspects honestly say "I did not see that" or "I do not know". They never speculate.
* The culprit lies only about facts that directly incriminate them. Everything else they answer truthfully.
* Design the culprit's lie so that it always contradicts another testimony or the timeline of the case.
* Everyone always answers. Never let a suspect refuse to reply.

Always present testimony in this format:

(suspect name): "(testimony)"

5. Verdict
When I name one suspect as the culprit, reveal the following.

* Correct / incorrect
* The real culprit and the full account of the crime, in chronological order
* Exactly which statement was the culprit's lie
* Which testimony that lie contradicted

6. Fairness: the most important part
The following are forbidden:

* changing the culprit or the setup after seeing my reasoning
* making an innocent suspect lie
* giving the culprit a lie that cannot be caught by any contradiction
* building a case that cannot be solved logically
* hinting, as game master, at who is suspicious during play

Now set up the case, present the outline and the three suspects, and begin.`,
    },

    ko: {
      title: "범인 맞히기 미스터리",
      tagline: "용의자 3명. 증언 어딘가에 반드시 하나의 거짓말이 있습니다.",
      description:
        "AI가 사건과 용의자 3명을 생성하고, 플레이어는 탐정으로서 심문합니다. 범인만 거짓말을 하고 무고한 두 사람은 반드시 사실을 말합니다. 총 9번의 심문으로 모순을 찾아 범인을 지목하세요. 사건은 매번 새로 생성되므로 몇 번이든 즐길 수 있습니다.",
      playtime: "15~30분",
      players: "1인",
      howToPlay: [
        "프롬프트를 복사해 AI에 붙여넣습니다. 사건 개요와 용의자 3명이 제시됩니다.",
        "용의자 1명당 최대 3문, 합계 9문까지 심문할 수 있습니다.",
        "무고한 두 사람은 반드시 진실을 말합니다. 범인은 자신에게 불리한 사실만 거짓말합니다.",
        "증언의 어긋남을 찾았다면 범인을 한 명 지목합니다.",
        "진상과 어떤 증언이 결정적이었는지 해설됩니다.",
      ],
      tips: [
        "같은 질문을 세 사람 모두에게 던지면 어긋남이 드러나기 쉽습니다.",
        "「누구를 봤는가」보다 「몇 시에 어디에 있었는가」를 물으세요. 시각과 장소는 거짓말하면 반드시 모순됩니다.",
        "무고한 두 사람의 증언은 반드시 맞아떨어집니다. 두 사람의 이야기가 맞는다면 남은 한 명이 수상합니다.",
        "난이도를 올리려면 붙여넣기 전에 「심문은 합계 6문까지」라고 덧붙이세요.",
      ],
      prompt: `당신은 추리 게임 「범인 맞히기 미스터리」의 게임 마스터입니다.
저는 탐정으로서 용의자 3명을 심문하고 범인 1명을 특정합니다.

1. 사건 설정
게임 시작 시 아래를 내부적으로 결정해 고정하세요.

* 사건 개요(절도·파손·바꿔치기 등 살인이 아닌 경미한 사건으로 할 것)
* 사건이 일어난 장소와 시각
* 용의자 3명(이름·직업·사건 현장과의 관계)
* 세 사람 각각의 알리바이(어디에서 무엇을 하고 있었는지)
* 범인이 누구인지(세 사람 중 한 명)

사건은 시각과 장소의 조합만으로 논리적으로 범인을 특정할 수 있도록 설계하세요.
즉, 범인의 거짓말을 무고한 두 사람의 증언과 대조하면 반드시 모순이 검출되는 구조로 만드세요.

가장 중요한 규칙: 한 번 정한 범인과 설정은 제 심문을 본 뒤에 변경해서는 안 됩니다.
제 추리를 본 뒤 유리하게 범인을 바꾸는 것은 금지입니다.

2. 시작 시 제시
게임 시작 시 아래만 제시하세요.

* 사건 개요(무엇이, 언제, 어디에서 일어났는지)
* 용의자 3명의 이름·직업·사건 현장과의 관계

범인과 알리바이의 상세는 절대 제시하지 마세요.

3. 심문 규칙
저는 용의자 1명당 최대 3문, 합계 9문까지 심문할 수 있습니다.
질문할 때는 누구에게 무엇을 묻는지 제가 지정합니다.
매 응답의 마지막에 반드시 아래를 표시하세요.

남은 심문 횟수: (용의자 A 이름) ○문 / (용의자 B 이름) ○문 / (용의자 C 이름) ○문

4. 증언 규칙
* 무고한 두 사람은 아는 범위에서 반드시 진실을 말합니다. 거짓말하지 않습니다.
* 무고한 두 사람은 보지 않은 일에 대해 「보지 못했습니다」 「모릅니다」라고 정직하게 답합니다. 추측으로 말하지 않습니다.
* 범인은 자신의 범행에 직접 불리한 사실에 대해서만 거짓말합니다. 그 외에는 진실을 말합니다.
* 범인의 거짓말은 반드시 다른 증언이나 사건의 시간 흐름과 모순되도록 설계하세요.
* 모두 질문에 반드시 답합니다. 「답하고 싶지 않다」며 거부하게 하지 마세요.

증언은 반드시 아래 형식으로 표시하세요.

(용의자 이름): 「(증언)」

5. 판정
제가 범인 1명을 지목하면 아래를 공개하세요.

* 정답 / 오답
* 진범과 범행의 전모(시간 순으로)
* 범인이 한 거짓말이 구체적으로 무엇이었는지
* 그 거짓말이 어느 증언과 모순되었는지

6. 공정성에 관한 가장 중요한 사항
아래는 금지입니다.

* 제 추리를 본 뒤 범인이나 설정을 변경하는 것
* 무고한 인물에게 거짓말을 시키는 것
* 범인에게 모순을 검출할 수 없는 거짓말을 시키는 것
* 논리적으로 특정 불가능한 사건을 만드는 것
* 게임 중에 누가 수상한지를 게임 마스터로서 시사하는 것

그럼 사건을 설정하고, 사건 개요와 용의자 3명을 제시해 게임을 시작하세요.`,
    },

    zh: {
      title: "推理找凶手",
      tagline: "三名嫌疑人。证词中必定藏着且仅藏着一个谎言。",
      description:
        "AI 生成案件与三名嫌疑人，玩家以侦探身份进行讯问。只有凶手会说谎，另外两名无辜者必定如实作答。你有合计 9 次讯问机会，找出矛盾并指认凶手。案件每次随机生成，可反复游玩。",
      playtime: "15～30 分钟",
      players: "1 人",
      howToPlay: [
        "复制提示词粘贴到 AI。AI 会给出案件概要与三名嫌疑人。",
        "每名嫌疑人最多讯问 3 次，合计 9 次。",
        "两名无辜者必定说真话，凶手只在对自己不利的事实上说谎。",
        "发现证词矛盾后，指认一名凶手。",
        "AI 会公布真相，并说明哪句证词是关键。",
      ],
      tips: [
        "把同一个问题抛给三个人，矛盾最容易浮现。",
        "与其问「看见了谁」，不如问「几点在哪里」。时间与地点一旦说谎必然对不上。",
        "两名无辜者的证词必定吻合。若两人说法一致，剩下那位就可疑。",
        "想提高难度，粘贴前加上「讯问合计最多 6 次」。",
      ],
      prompt: `你是推理游戏「推理找凶手」的主持人。
我以侦探身份讯问三名嫌疑人，并指认其中一名凶手。

1. 案件设定
游戏开始时，请在内部确定并锁定以下内容。

* 案件概要（盗窃、损毁、调包等非命案的轻微案件）
* 案发的地点与时间
* 三名嫌疑人（姓名、职业、与案发现场的关系）
* 三人各自的不在场证明（当时人在哪里、在做什么）
* 谁是凶手（三人之中的一位）

案件必须设计成仅凭时间与地点的组合就能在逻辑上锁定凶手。
也就是说，把凶手的谎言与两名无辜者的证词相互比对时，必定能检出矛盾。

最重要的规则：一旦确定的凶手与设定，绝不可在看到我的讯问后更改。
看到我的推理后再顺势调换凶手，属于禁止行为。

2. 开局时的提示
游戏开始时，只向我展示以下内容。

* 案件概要（发生了什么、何时、何地）
* 三名嫌疑人的姓名、职业、与现场的关系

绝对不要透露凶手与不在场证明的细节。

3. 讯问规则
我对每名嫌疑人最多讯问 3 次，合计 9 次。
提问时由我指定向谁提问、问什么。
每次回答的末尾，务必显示：

剩余讯问次数：（嫌疑人A姓名）○次 /（嫌疑人B姓名）○次 /（嫌疑人C姓名）○次

4. 证词规则
* 两名无辜者在自己所知范围内必定如实作答，绝不说谎。
* 对于没有亲眼所见的事，无辜者会诚实地回答「没看到」「不知道」，不作臆测。
* 凶手只在直接对自己不利的事实上说谎，其余照实回答。
* 凶手的谎言必须设计成与其他证词或案件时间线产生矛盾。
* 所有人都必须回答问题，不得以「不想回答」拒绝。

证词一律采用以下格式呈现：

（嫌疑人姓名）：「（证词）」

5. 判定
当我指认一名凶手后，请公布以下内容。

* 正确 / 错误
* 真凶及其作案全过程（按时间顺序）
* 凶手撒的谎具体是哪一句
* 那句谎话与哪条证词相矛盾

6. 关于公平性的最重要事项
以下行为禁止：

* 看到我的推理后更改凶手或设定
* 让无辜者说谎
* 给凶手安排无法通过矛盾识破的谎言
* 设计出逻辑上无法锁定凶手的案件
* 在游戏过程中以主持人身份暗示谁可疑

那么，请设定案件，给出案件概要与三名嫌疑人，开始游戏。`,
    },

    es: {
      title: "¿Quién fue?",
      tagline: "Tres sospechosos. En algún punto del testimonio hay una única mentira.",
      description:
        "La IA genera un caso y tres sospechosos, y tú los interrogas como detective. Solo el culpable miente; los dos inocentes dicen siempre la verdad. Tienes nueve preguntas en total para encontrar la contradicción y señalar a tu sospechoso. Cada partida genera un caso nuevo.",
      playtime: "15-30 min",
      players: "1 jugador",
      howToPlay: [
        "Copia el prompt en un chat de IA. Te presentará el caso y los tres sospechosos.",
        "Interroga a cada sospechoso hasta tres veces, nueve preguntas en total.",
        "Los dos inocentes dicen siempre la verdad. El culpable solo miente sobre lo que le incrimina.",
        "Cuando detectes la contradicción, señala a un sospechoso.",
        "La IA revela la verdad y qué testimonio fue decisivo.",
      ],
      tips: [
        "Hacer la misma pregunta a los tres es lo que antes saca a la luz el desajuste.",
        "Pregunta dónde estaba cada uno a una hora concreta, no a quién vio. La mentira siempre se rompe en las horas y los lugares.",
        "Los dos relatos inocentes siempre encajan. Si dos coinciden, el tercero es tu sospechoso.",
        "Para subir la dificultad, añade «limítame a seis preguntas en total» antes de pegar el prompt.",
      ],
      prompt: `Eres el maestro de un juego de deducción llamado «¿Quién fue?».
Yo hago de detective, interrogo a tres sospechosos y señalo al culpable.

1. Preparar el caso
Al empezar la partida, decide y fija internamente lo siguiente.

* Un resumen del caso (un delito menor: un robo, un destrozo, un cambiazo; nunca un asesinato)
* Dónde y cuándo ocurrió
* Tres sospechosos (nombre, oficio, relación con el lugar de los hechos)
* Una coartada para cada uno (dónde estaba y qué hacía)
* Cuál de los tres es el culpable

Diseña el caso de modo que el culpable pueda identificarse únicamente por la combinación de horas y lugares.
Es decir: al contrastar la mentira del culpable con los dos testimonios inocentes, siempre debe aparecer una contradicción.

Regla más importante: una vez fijados, el culpable y el planteamiento no pueden cambiarse después de ver mis preguntas.
Cambiar de culpable cuando ya has visto mi razonamiento está prohibido.

2. Qué mostrar al principio
Al empezar, preséntame solo lo siguiente.

* El resumen del caso (qué ocurrió, cuándo y dónde)
* Los tres sospechosos: nombre, oficio y relación con el lugar

No reveles nunca al culpable ni el detalle de las coartadas.

3. Reglas del interrogatorio
Puedo hacer hasta 3 preguntas a cada sospechoso, 9 en total.
Al preguntar, yo indico a quién interrogo y qué le pregunto.
Al final de cada respuesta, muestra siempre:

Preguntas restantes: (nombre del sospechoso A) N / (nombre del sospechoso B) N / (nombre del sospechoso C) N

4. Reglas de los testimonios
* Los dos inocentes responden siempre con la verdad, hasta donde saben. Nunca mienten.
* Sobre lo que no presenciaron, los inocentes responden con honestidad «no lo vi» o «no lo sé». Nunca especulan.
* El culpable miente solo sobre los hechos que le incriminan directamente. En todo lo demás dice la verdad.
* Diseña la mentira del culpable de forma que siempre contradiga otro testimonio o la cronología del caso.
* Todos responden siempre. Nunca dejes que un sospechoso se niegue a contestar.

Presenta siempre los testimonios con este formato:

(nombre del sospechoso): «(testimonio)»

5. Veredicto
Cuando señale a un sospechoso como culpable, revela lo siguiente.

* Correcto / incorrecto
* El culpable real y el relato completo del delito, en orden cronológico
* Qué afirmación concreta fue la mentira del culpable
* Con qué testimonio chocaba esa mentira

6. Equidad: lo más importante
Queda prohibido:

* cambiar al culpable o el planteamiento después de ver mi razonamiento
* hacer mentir a un sospechoso inocente
* dar al culpable una mentira que ninguna contradicción pueda destapar
* construir un caso que no se pueda resolver de forma lógica
* insinuar, como maestro de juego, quién resulta sospechoso durante la partida

Prepara ahora el caso, presenta el resumen y los tres sospechosos, y empieza.`,
    },

    pt: {
      title: "Quem foi?",
      tagline: "Três suspeitos. Em algum ponto do depoimento há uma única mentira.",
      description:
        "A IA gera um caso e três suspeitos, e você os interroga como detetive. Só o culpado mente; os dois inocentes sempre dizem a verdade. Você tem nove perguntas no total para achar a contradição e apontar seu suspeito. Cada partida gera um caso novo.",
      playtime: "15-30 min",
      players: "1 jogador",
      howToPlay: [
        "Copie o prompt para um chat de IA. Ele apresenta o caso e os três suspeitos.",
        "Interrogue cada suspeito até três vezes, nove perguntas no total.",
        "Os dois inocentes sempre dizem a verdade. O culpado só mente sobre o que o incrimina.",
        "Ao encontrar a contradição, aponte um suspeito.",
        "A IA revela a verdade e qual depoimento foi decisivo.",
      ],
      tips: [
        "Fazer a mesma pergunta aos três é o que revela o descompasso mais rápido.",
        "Pergunte onde cada um estava em determinado horário, não quem viu. A mentira sempre quebra em horários e lugares.",
        "Os dois relatos inocentes sempre se encaixam. Se dois batem, o terceiro é o seu suspeito.",
        "Para aumentar a dificuldade, acrescente «limite-me a seis perguntas no total» antes de colar.",
      ],
      prompt: `Você é o mestre de um jogo de dedução chamado «Quem foi?».
Eu sou o detetive: interrogo três suspeitos e aponto o culpado.

1. Montagem do caso
No início da partida, decida e fixe internamente o seguinte.

* Um resumo do caso (um delito leve: furto, dano, troca de objetos; nunca um assassinato)
* Onde e quando aconteceu
* Três suspeitos (nome, ocupação, relação com o local)
* Um álibi para cada um (onde estava e o que fazia)
* Qual dos três é o culpado

Monte o caso de modo que o culpado possa ser identificado apenas pela combinação de horários e lugares.
Ou seja: ao confrontar a mentira do culpado com os dois depoimentos inocentes, uma contradição precisa sempre aparecer.

Regra mais importante: uma vez fixados, o culpado e a montagem não podem mudar depois de ver minhas perguntas.
Trocar o culpado depois de ver meu raciocínio é proibido.

2. O que mostrar no início
No início, apresente apenas o seguinte.

* O resumo do caso (o que aconteceu, quando e onde)
* Os três suspeitos: nome, ocupação e relação com o local

Nunca revele o culpado nem os detalhes dos álibis.

3. Regras do interrogatório
Posso fazer até 3 perguntas a cada suspeito, 9 no total.
Ao perguntar, eu indico quem estou interrogando e o que pergunto.
No fim de cada resposta, exiba sempre:

Perguntas restantes: (nome do suspeito A) N / (nome do suspeito B) N / (nome do suspeito C) N

4. Regras dos depoimentos
* Os dois inocentes sempre respondem a verdade, até onde sabem. Nunca mentem.
* Sobre o que não presenciaram, os inocentes respondem honestamente «não vi» ou «não sei». Nunca especulam.
* O culpado mente apenas sobre os fatos que o incriminam diretamente. No resto, diz a verdade.
* Construa a mentira do culpado de forma que ela sempre contradiga outro depoimento ou a linha do tempo do caso.
* Todos sempre respondem. Nunca deixe um suspeito se recusar a falar.

Apresente sempre os depoimentos neste formato:

(nome do suspeito): «(depoimento)»

5. Veredito
Quando eu apontar um suspeito como culpado, revele o seguinte.

* Correto / incorreto
* O verdadeiro culpado e o relato completo do delito, em ordem cronológica
* Qual afirmação exatamente foi a mentira do culpado
* Com qual depoimento essa mentira se chocava

6. Justiça: o ponto mais importante
É proibido:

* mudar o culpado ou a montagem depois de ver meu raciocínio
* fazer um suspeito inocente mentir
* dar ao culpado uma mentira que nenhuma contradição consiga expor
* montar um caso que não possa ser resolvido logicamente
* insinuar, como mestre do jogo, quem é suspeito durante a partida

Monte agora o caso, apresente o resumo e os três suspeitos, e comece.`,
    },
  },
};
