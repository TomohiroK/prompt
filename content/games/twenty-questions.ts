import type { Game } from "../types";

export const twentyQuestions: Game = {
  slug: "twenty-questions",
  category: "reasoning",
  difficulty: "easy",
  playtimeMinutes: { min: 5, max: 10 },
  updatedAt: "2026-08-29",
  content: {
    ja: {
      title: "20の質問",
      tagline: "AIが思い浮かべた「あるもの」を、20問以内に言い当てる。",
      description:
        "AIが心の中で「あるもの」を1つ決めます。プレイヤーははい/いいえで答えられる質問を最大20問投げて、その正体を推理します。最初の1本にちょうどいい軽さで、待ち時間や移動中でも遊べます。AIが途中で答えを変えないよう、公平性のルールを厳密に組み込んであります。",
      playtime: "5〜10分",
      players: "1人",
      howToPlay: [
        "プロンプトをコピーしてAIに貼り付ける。AIがお題を1つ決めて固定する。",
        "「はい/いいえ」で答えられる質問を1問ずつ投げる。",
        "AIは毎回、残り質問数を表示する。",
        "確信が持てたら「答えは○○ですか？」と宣言する。当てにいく宣言も1問としてカウントされる。",
        "20問使い切るか、正解すると終了。答えとヒントの解説が出る。",
      ],
      tips: [
        "最初の3問は「生き物か」「人工物か」「手のひらに乗るか」で世界を1/8に切るのが効率的。",
        "1問で候補が半分になる質問がよい質問。「赤いですか？」より「色はありますか？」。",
        "残り5問を切ったら、具体名を当てにいく勇気も必要。",
        "難易度を上げたい場合は、貼り付ける前にプロンプト末尾へ「お題は抽象概念に限定」と書き足す。",
      ],
      prompt: `あなたは「20の質問」のゲームマスターです。
あなたが心の中で「あるもの」を1つ決め、私がはい/いいえの質問を重ねて、それが何かを当てます。

1. お題の設定
ゲーム開始時に、お題を1つ決めて内部で固定してください。
お題は以下の条件を満たすものにしてください。

* 一般的な成人なら誰でも知っている、実在する具体的な名詞
* 固有名詞は不可（「富士山」「ドラえもん」などは不可）
* 一般名詞であること（例：えんぴつ、キリン、掃除機、味噌汁、傘、信号機）

最重要ルール：一度決めたお題は、私の質問を見てから変更してはいけません。
質問への回答を都合よく成立させるために、途中でお題を変えることは禁止です。

2. 質問回数
私は最大20問まで質問できます。
1回のメッセージに複数の質問を書いた場合は、その個数だけ消費します。
「答えは○○ですか？」という当てにいく宣言も1問として消費します。
毎回の回答の最後に、必ず

残り質問数：○問

と表示してください。

3. 回答方法
質問には原則として「はい」「いいえ」で答えてください。
お題の性質から客観的に判定できる質問には、必ず正確に答えてください。
判断が分かれうる質問（「大きいですか？」など）については、

* 「一般的には、はい。」
* 「場合によりますが、おおむねいいえ。」

のように、自然な感覚で判断して答えてください。
「質問が曖昧です」「答えられません」と回答を拒否しないでください。
ただし、ゲームを難しくする目的で意図的に嘘をつくことは禁止です。

4. ヒント
私が「ヒントをください」と言った場合のみ、正体が直接わからない程度のヒントを1つ出してください。
ヒントの要求も1問として消費します。
それ以外のタイミングで自発的にヒントを出してはいけません。

5. ゲーム進行
ゲーム開始時にはお題を私に見せてはいけません。
お題を内部で決定・固定したうえで、

「お題を1つ決めました。20の質問で当ててください。どうぞ。」

とだけ伝えてゲームを開始してください。

6. 終了条件と判定
以下のいずれかで終了します。

* 私がお題を正確に言い当てた（正解）
* 20問を使い切った（不正解）

終了したら、正解のお題を公開してください。
その後、どの質問が有効だったか、どこで候補を絞れたかを3行以内で簡潔に講評してください。

7. 公平性に関する最重要事項
以下は禁止です。

* 質問を見てからお題を決める
* 途中でお題を変更する
* 過去の回答と矛盾する回答をする
* 私の予想を見てから正解を作る
* 質問数のカウントを間違える

それではお題を1つ決めて、ゲームを開始してください。`,
    },

    en: {
      title: "20 Questions",
      tagline: "Name the thing the AI is thinking of, in twenty questions or fewer.",
      description:
        "The AI picks one everyday object and keeps it to itself. You ask up to twenty yes/no questions to work out what it is. Light enough for a queue or a commute, and the fairness rules are written strictly so the AI cannot quietly change its answer halfway through.",
      playtime: "5-10 min",
      players: "1 player",
      howToPlay: [
        "Copy the prompt into an AI chat. It picks and fixes one subject.",
        "Ask one yes/no question at a time.",
        "The AI shows how many questions you have left after every reply.",
        "When you are sure, declare \"is it a ...?\". A guess also costs one question.",
        "The game ends when you guess right or run out. The answer and a short debrief follow.",
      ],
      tips: [
        "Open with \"is it alive?\", \"is it man-made?\", \"does it fit in your hand?\" — three questions cut the field to an eighth.",
        "A good question halves the candidates. \"Does it have a colour?\" beats \"is it red?\".",
        "With five questions left, start naming specific things. Precision costs turns you may not have.",
        "For a harder game, add \"restrict the subject to abstract concepts\" at the end before pasting.",
      ],
      prompt: `You are the game master of a game of 20 Questions.
You think of one thing and keep it to yourself; I ask yes/no questions and try to work out what it is.

1. Choosing the subject
At the start of the game, choose one subject and fix it internally.
The subject must meet these conditions.

* A concrete, real noun that any average adult would know
* No proper nouns (no "Mount Fuji", no character names)
* A common noun (for example: pencil, giraffe, vacuum cleaner, soup, umbrella, traffic light)

Most important rule: once chosen, the subject must never change after seeing my questions.
Changing it so that an answer works out conveniently is forbidden.

2. Number of questions
I may ask up to 20 questions.
If I put several questions in one message, each one is counted separately.
A guess of the form "is it a ...?" also costs one question.
At the end of every reply, always display:

Questions remaining: N

3. How to answer
As a rule, answer "yes" or "no".
For questions that can be judged objectively from the nature of the subject, always answer accurately.
For questions where reasonable people might differ ("is it big?"), judge with common sense and answer like:

* "Generally, yes."
* "It depends, but mostly no."

Never refuse with "your question is ambiguous" or "I cannot answer that".
However, deliberately lying to make the game harder is forbidden.

4. Hints
Give a hint only if I explicitly ask for one, and make it something that does not give the answer away directly.
A hint request also costs one question.
Never volunteer a hint at any other time.

5. Running the game
Never show me the subject at the start.
Fix it internally, then begin by saying only:

"I have thought of something. Find it in twenty questions. Go ahead."

6. Ending and verdict
The game ends when either of the following happens.

* I name the subject correctly (win)
* I use up all 20 questions (loss)

When it ends, reveal the subject.
Then, in three lines or fewer, say briefly which questions did the most work and where the field narrowed.

7. Fairness: the most important part
The following are forbidden:

* choosing the subject after seeing my questions
* changing the subject partway through
* giving an answer that contradicts an earlier one
* inventing the answer after seeing my guess
* miscounting the questions

Now choose a subject and start the game.`,
    },

    ko: {
      title: "스무고개",
      tagline: "AI가 떠올린 「어떤 것」을 20문 안에 맞혀 보세요.",
      description:
        "AI가 마음속으로 「어떤 것」을 하나 정합니다. 플레이어는 예/아니요로 답할 수 있는 질문을 최대 20문 던져 그 정체를 추리합니다. 첫 게임으로 딱 좋은 가벼움이라 기다리는 시간이나 이동 중에도 즐길 수 있습니다. AI가 도중에 답을 바꾸지 못하도록 공정성 규칙을 엄격히 넣었습니다.",
      playtime: "5~10분",
      players: "1인",
      howToPlay: [
        "프롬프트를 복사해 AI에 붙여넣습니다. AI가 주제를 하나 정해 고정합니다.",
        "예/아니요로 답할 수 있는 질문을 하나씩 던집니다.",
        "AI는 매번 남은 질문 수를 표시합니다.",
        "확신이 들면 「답은 ○○인가요?」라고 선언합니다. 맞히려는 선언도 1문으로 계산됩니다.",
        "20문을 다 쓰거나 정답을 맞히면 종료. 정답과 해설이 나옵니다.",
      ],
      tips: [
        "처음 3문은 「생물인가」 「인공물인가」 「손바닥에 올라가는가」로 범위를 1/8로 줄이는 것이 효율적입니다.",
        "한 문으로 후보가 절반이 되는 질문이 좋은 질문입니다. 「빨간가요?」보다 「색이 있나요?」.",
        "남은 질문이 5문 아래로 떨어지면 구체적인 이름을 맞히러 갈 용기도 필요합니다.",
        "난이도를 올리려면 붙여넣기 전에 프롬프트 끝에 「주제는 추상 개념으로 한정」이라고 덧붙이세요.",
      ],
      prompt: `당신은 「스무고개」의 게임 마스터입니다.
당신이 마음속으로 「어떤 것」을 하나 정하고, 제가 예/아니요 질문을 거듭해 그것이 무엇인지 맞힙니다.

1. 주제 설정
게임 시작 시 주제를 하나 정해 내부적으로 고정하세요.
주제는 아래 조건을 만족해야 합니다.

* 일반적인 성인이라면 누구나 아는, 실재하는 구체적 명사
* 고유명사는 불가(「후지산」 「특정 캐릭터 이름」 등은 불가)
* 일반명사일 것(예: 연필, 기린, 청소기, 된장국, 우산, 신호등)

가장 중요한 규칙: 한 번 정한 주제는 제 질문을 본 뒤에 변경해서는 안 됩니다.
질문에 대한 답을 유리하게 성립시키기 위해 도중에 주제를 바꾸는 것은 금지입니다.

2. 질문 횟수
저는 최대 20문까지 질문할 수 있습니다.
한 메시지에 여러 질문을 쓴 경우, 그 개수만큼 소비됩니다.
「답은 ○○인가요?」라는 맞히기 선언도 1문으로 소비됩니다.
매 답변의 마지막에 반드시

남은 질문 수: ○문

이라고 표시하세요.

3. 답변 방법
질문에는 원칙적으로 「예」 「아니요」로 답하세요.
주제의 성질로 객관적으로 판정 가능한 질문에는 반드시 정확히 답하세요.
판단이 갈릴 수 있는 질문(「큰가요?」 등)에 대해서는

* 「일반적으로는 예.」
* 「경우에 따라 다르지만, 대체로 아니요.」

처럼 자연스러운 감각으로 판단해 답하세요.
「질문이 모호합니다」 「답할 수 없습니다」라며 거부하지 마세요.
다만 게임을 어렵게 만들 목적으로 의도적으로 거짓말하는 것은 금지입니다.

4. 힌트
제가 「힌트를 주세요」라고 말한 경우에만, 정체가 곧바로 드러나지 않을 정도의 힌트를 하나 주세요.
힌트 요청도 1문으로 소비됩니다.
그 외의 시점에 자발적으로 힌트를 주어서는 안 됩니다.

5. 게임 진행
게임 시작 시 주제를 저에게 보여서는 안 됩니다.
주제를 내부적으로 결정·고정한 뒤

「주제를 하나 정했습니다. 스무고개로 맞혀 보세요. 시작하세요.」

라고만 전하고 게임을 시작하세요.

6. 종료 조건과 판정
아래 중 하나로 종료합니다.

* 제가 주제를 정확히 맞힘(정답)
* 20문을 모두 사용(오답)

종료되면 정답 주제를 공개하세요.
그 후 어떤 질문이 유효했는지, 어디서 후보가 좁혀졌는지를 3행 이내로 간결하게 평해 주세요.

7. 공정성에 관한 가장 중요한 사항
아래는 금지입니다.

* 질문을 본 뒤 주제를 정하는 것
* 도중에 주제를 변경하는 것
* 과거의 답변과 모순되는 답변을 하는 것
* 제 예상을 본 뒤 정답을 만드는 것
* 질문 수를 잘못 세는 것

그럼 주제를 하나 정하고 게임을 시작하세요.`,
    },

    zh: {
      title: "二十个问题",
      tagline: "用不超过 20 个问题，猜出 AI 心里想的那样东西。",
      description:
        "AI 在心里选定一样东西并保密。玩家最多提出 20 个可用「是/否」回答的问题来推断它是什么。分量轻巧，很适合当第一款上手的游戏，排队或通勤时也能玩。提示词中写入了严格的公平规则，防止 AI 中途偷偷换答案。",
      playtime: "5～10 分钟",
      players: "1 人",
      howToPlay: [
        "复制提示词粘贴到 AI。AI 会选定并锁定一个谜底。",
        "每次提出一个可用「是/否」回答的问题。",
        "AI 每次回答后都会显示剩余提问数。",
        "有把握时直接宣告「答案是○○吗？」。这种猜测同样消耗 1 次提问。",
        "用完 20 次或猜中即结束，随后公布答案与简短点评。",
      ],
      tips: [
        "开头三问用「是生物吗」「是人造物吗」「能放在手掌上吗」，可把范围砍到八分之一。",
        "好问题能一次砍掉一半候选。「它有颜色吗？」优于「它是红色的吗？」。",
        "剩下不到 5 问时，就该鼓起勇气直接猜具体名称了。",
        "想提高难度，粘贴前在提示词末尾加上「谜底限定为抽象概念」。",
      ],
      prompt: `你是「二十个问题」的主持人。
你在心里选定一样东西并保密，我通过一连串「是/否」问题来猜它是什么。

1. 谜底的设定
游戏开始时，选定一个谜底并在内部锁定。
谜底必须满足以下条件。

* 一般成年人都认识的、真实存在的具体名词
* 不得使用专有名词（如「富士山」「某个角色名」等）
* 必须是普通名词（例：铅笔、长颈鹿、吸尘器、味噌汤、雨伞、红绿灯）

最重要的规则：一旦确定的谜底，绝不可在看到我的提问之后更改。
为了让某个回答顺理成章而中途更换谜底，同样禁止。

2. 提问次数
我最多可以提问 20 次。
如果我在一条消息里写了多个问题，就按问题个数计算消耗。
「答案是○○吗？」这种猜测宣告同样消耗 1 次。
每次回答的末尾，务必显示：

剩余提问数：○次

3. 回答方式
提问原则上以「是」「否」作答。
凡是可以依据谜底的性质客观判定的问题，必须准确回答。
对于可能见仁见智的问题（例如「它大吗？」），请按常识判断后这样回答：

* 「一般来说，是的。」
* 「视情况而定，但多数情况下不是。」

不要用「问题太含糊」「无法回答」来拒绝作答。
但为了增加难度而故意说谎，是禁止的。

4. 提示
只有当我明确说「给个提示」时，才给出一个不会直接暴露谜底的提示。
索取提示同样消耗 1 次提问。
除此之外的任何时候，都不得主动给提示。

5. 游戏进行
游戏开始时不得向我展示谜底。
在内部确定并锁定谜底后，只需说：

「我已经想好了一样东西。请用二十个问题猜出来。开始吧。」

然后开始游戏。

6. 结束条件与判定
出现以下任一情况即结束。

* 我准确说出了谜底（猜中）
* 我用完了 20 次提问（未猜中）

结束后请公布谜底。
随后用 3 行以内简要点评：哪些问题最有效，从哪里开始收窄了范围。

7. 关于公平性的最重要事项
以下行为禁止：

* 看到提问之后才决定谜底
* 中途更换谜底
* 给出与先前回答矛盾的回答
* 看到我的猜测后才编出答案
* 数错提问次数

那么，请选定一个谜底并开始游戏。`,
    },

    es: {
      title: "20 preguntas",
      tagline: "Adivina en qué está pensando la IA en veinte preguntas o menos.",
      description:
        "La IA elige un objeto cotidiano y se lo guarda. Tú haces hasta veinte preguntas de sí o no para averiguar cuál es. Es lo bastante ligero para una cola o un trayecto, y las reglas de equidad están escritas con rigor para que la IA no cambie su respuesta a mitad de partida.",
      playtime: "5-10 min",
      players: "1 jugador",
      howToPlay: [
        "Copia el prompt en un chat de IA. Elegirá y fijará un objeto.",
        "Haz una pregunta de sí o no cada vez.",
        "La IA muestra cuántas preguntas te quedan después de cada respuesta.",
        "Cuando lo tengas claro, di «¿es un ...?». Adivinar también cuesta una pregunta.",
        "La partida acaba al acertar o al agotar las veinte. Luego llegan la solución y un breve comentario.",
      ],
      tips: [
        "Empieza con «¿está vivo?», «¿es artificial?», «¿cabe en la mano?»: tres preguntas reducen el campo a una octava parte.",
        "Una buena pregunta parte los candidatos por la mitad. «¿Tiene color?» rinde más que «¿es rojo?».",
        "Cuando queden cinco preguntas, empieza a nombrar cosas concretas. Afinar cuesta turnos que quizá no tengas.",
        "Para subir la dificultad, añade al final «limita el objeto a conceptos abstractos» antes de pegar.",
      ],
      prompt: `Eres el maestro de una partida de 20 preguntas.
Tú piensas en algo y te lo guardas; yo hago preguntas de sí o no e intento averiguar qué es.

1. Elegir el objeto
Al empezar la partida, elige un objeto y fíjalo internamente.
El objeto debe cumplir estas condiciones.

* Un sustantivo concreto y real que cualquier adulto conozca
* Nada de nombres propios (ni montañas concretas ni personajes)
* Un nombre común (por ejemplo: lápiz, jirafa, aspiradora, sopa, paraguas, semáforo)

Regla más importante: una vez elegido, el objeto no puede cambiar después de ver mis preguntas.
Cambiarlo para que una respuesta encaje mejor está prohibido.

2. Número de preguntas
Puedo hacer hasta 20 preguntas.
Si escribo varias preguntas en un mismo mensaje, cada una cuenta por separado.
Una conjetura del tipo «¿es un ...?» también cuesta una pregunta.
Al final de cada respuesta, muestra siempre:

Preguntas restantes: N

3. Cómo responder
Por norma, responde «sí» o «no».
En las preguntas que pueden juzgarse objetivamente por la naturaleza del objeto, responde siempre con exactitud.
En las preguntas donde cabe discrepar («¿es grande?»), juzga con sentido común y responde así:

* «En general, sí.»
* «Depende, pero en su mayoría no.»

Nunca te niegues con «tu pregunta es ambigua» o «no puedo responder a eso».
Ahora bien, mentir a propósito para endurecer el juego está prohibido.

4. Pistas
Da una pista solo si la pido de forma explícita, y que no revele la solución directamente.
Pedir una pista también cuesta una pregunta.
Nunca ofrezcas pistas por iniciativa propia en ningún otro momento.

5. Desarrollo de la partida
No me muestres el objeto al empezar.
Fíjalo internamente y comienza diciendo únicamente:

«Ya he pensado en algo. Descúbrelo en veinte preguntas. Adelante.»

6. Final y veredicto
La partida termina cuando ocurre cualquiera de estas cosas.

* Nombro el objeto correctamente (victoria)
* Agoto las 20 preguntas (derrota)

Al terminar, revela el objeto.
Después, en tres líneas o menos, di brevemente qué preguntas fueron las más útiles y dónde se estrechó el campo.

7. Equidad: lo más importante
Queda prohibido:

* elegir el objeto después de ver mis preguntas
* cambiar el objeto a mitad de partida
* dar una respuesta que contradiga otra anterior
* inventar la solución después de ver mi conjetura
* contar mal las preguntas

Elige ahora un objeto y empieza la partida.`,
    },

    pt: {
      title: "20 perguntas",
      tagline: "Descubra no que a IA está pensando em vinte perguntas ou menos.",
      description:
        "A IA escolhe um objeto do dia a dia e guarda para si. Você faz até vinte perguntas de sim ou não para descobrir qual é. É leve o bastante para uma fila ou um trajeto, e as regras de justiça são rígidas para a IA não trocar a resposta no meio do caminho.",
      playtime: "5-10 min",
      players: "1 jogador",
      howToPlay: [
        "Copie o prompt para um chat de IA. Ele escolhe e fixa um objeto.",
        "Faça uma pergunta de sim ou não por vez.",
        "A IA mostra quantas perguntas restam depois de cada resposta.",
        "Quando tiver certeza, diga «é um ...?». O palpite também custa uma pergunta.",
        "A partida acaba ao acertar ou ao esgotar as vinte. Depois vêm a resposta e um breve comentário.",
      ],
      tips: [
        "Comece com «é vivo?», «é feito pelo homem?», «cabe na mão?»: três perguntas cortam o campo para um oitavo.",
        "Uma boa pergunta corta os candidatos pela metade. «Tem cor?» rende mais que «é vermelho?».",
        "Faltando cinco perguntas, comece a chutar nomes concretos. Refinar custa turnos que talvez você não tenha.",
        "Para aumentar a dificuldade, acrescente no fim «restrinja o objeto a conceitos abstratos» antes de colar.",
      ],
      prompt: `Você é o mestre de uma partida de 20 perguntas.
Você pensa em algo e guarda para si; eu faço perguntas de sim ou não e tento descobrir o que é.

1. Escolha do objeto
No início da partida, escolha um objeto e fixe-o internamente.
O objeto precisa cumprir estas condições.

* Um substantivo concreto e real que qualquer adulto conheça
* Nada de nomes próprios (nem montanhas específicas nem personagens)
* Um substantivo comum (por exemplo: lápis, girafa, aspirador, sopa, guarda-chuva, semáforo)

Regra mais importante: uma vez escolhido, o objeto não pode mudar depois de ver minhas perguntas.
Trocá-lo para que uma resposta se encaixe melhor é proibido.

2. Número de perguntas
Posso fazer até 20 perguntas.
Se eu escrever várias perguntas na mesma mensagem, cada uma conta separadamente.
Um palpite do tipo «é um ...?» também custa uma pergunta.
No fim de cada resposta, exiba sempre:

Perguntas restantes: N

3. Como responder
Em regra, responda «sim» ou «não».
Nas perguntas que podem ser julgadas objetivamente pela natureza do objeto, responda sempre com exatidão.
Nas perguntas em que cabe divergência («é grande?»), julgue com bom senso e responda assim:

* «Em geral, sim.»
* «Depende, mas na maioria das vezes não.»

Nunca se recuse com «sua pergunta é ambígua» ou «não posso responder isso».
Ainda assim, mentir de propósito para dificultar o jogo é proibido.

4. Dicas
Dê uma dica somente se eu pedir explicitamente, e que não entregue a resposta diretamente.
Pedir uma dica também custa uma pergunta.
Nunca ofereça dicas por conta própria em nenhum outro momento.

5. Andamento da partida
Não me mostre o objeto no início.
Fixe-o internamente e comece dizendo apenas:

«Já pensei em algo. Descubra em vinte perguntas. Pode começar.»

6. Fim e veredito
A partida termina quando qualquer uma destas coisas acontecer.

* Eu nomeio o objeto corretamente (vitória)
* Eu esgoto as 20 perguntas (derrota)

Ao terminar, revele o objeto.
Depois, em até três linhas, diga brevemente quais perguntas foram mais úteis e onde o campo se estreitou.

7. Justiça: o ponto mais importante
É proibido:

* escolher o objeto depois de ver minhas perguntas
* trocar o objeto no meio da partida
* dar uma resposta que contradiga outra anterior
* inventar a solução depois de ver meu palpite
* contar as perguntas errado

Escolha agora um objeto e comece a partida.`,
    },
  },
};
