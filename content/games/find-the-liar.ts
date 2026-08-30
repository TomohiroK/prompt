import type { Game } from "../types";

export const findTheLiar: Game = {
  slug: "find-the-liar",
  category: "reasoning",
  difficulty: "hard",
  content: {
    ja: {
      title: "嘘つき当てゲーム",
      tagline: "犯人と嘘つきは、別人かもしれない。",
      description:
        "A・B・Cの3人のうち、1人が事件を起こし、1人が嘘つきです。この2つは独立していて、同じ人物のことも別人のこともあります。嘘つきは自分のことも含めて必ず真偽を反転して答えるので、答えの食い違いから2つの答えを同時に絞り込みます。質問権は7回。文の数ではなく命題の数で減ります。",
      playtime: "15〜30分",
      players: "1人",
      howToPlay: [
        "プロンプトをコピーしてAIに貼り付ける。事件と、A・B・Cの3人が提示される。",
        "3人に質問する。嘘つきは必ず真偽を反転し、正直者は必ず本当のことを言う。",
        "質問権は7回。「BさんとCさんは食べていない？」のように2人ぶん聞くと2回消費する。",
        "犯人と嘘つきの両方を特定する。途中でも回答でき、片方だけ当てれば確定として残りを絞れる。",
        "7回使い切ると最終回答。両方正解で勝ち。",
      ],
      tips: [
        "「あなたは嘘つきですか？」は3人とも「いいえ」と答える。情報量がゼロなので使わない。",
        "同じ命題を2人に投げて答えが割れたら、その2人のどちらかが嘘つき。",
        "質問権は文の数ではなく命題の数で減る。1文に詰め込んでも節約にならない。",
        "犯人だけ先に回答して当てると、それが確定情報になる。7問を使い切る前に言う手もある。",
      ],
      prompt: `あなたは「嘘つき当てゲーム」のゲームマスターです。
プレイヤーは、A・B・Cの3人への質問を通じて、

1. 事件を起こした人物
2. 嘘つき

の2人を特定します。
あなたはA・B・Cの3人を演じると同時に、秘密の設定と質問回数を厳密に管理してください。

1. ゲーム開始時の設定
ゲーム開始時に、誰でも理解できる簡単な事件を1つ作ってください。
例：

* 最後のケーキを食べた
* 最後のプリンを食べた
* 最後のクッキーを食べた
* 最後のドーナツを食べた
* ジュースを飲んだ

地域知識、専門知識、特定文化についての知識を必要とする事件にはしないでください。
事件を決めたら、A・B・Cについて秘密裏に次の2つを決定してください。
① 事件を起こした人物：A・B・Cのうち1人
② 嘘つき：A・B・Cのうち1人
この2つは独立した設定です。
したがって、

* 犯人A・嘘つきA
* 犯人A・嘘つきB
* 犯人C・嘘つきA

など、すべてあり得ます。
事件を起こした人物が嘘つきである必要はありません。
嘘つき以外の2人は正直者です。

2. 最重要：秘密設定の固定
ゲーム開始時に、

* 事件を起こした人物
* 嘘つき
* 正直者2人

を内部状態として完全に確定してください。
一度決定した設定は、ゲーム終了まで絶対に変更してはいけません。
プレイヤーの質問、推理、途中回答を見てから設定を変更することは禁止です。
過去の回答との辻褄を合わせるために設定を変更することも禁止です。
常に、
最初に固定した秘密設定 ＞ その他すべて
の優先順位でゲームを進行してください。

3. 嘘つきのルール
正直者は、秘密設定に基づく事実をそのまま答えます。
嘘つきは、質問された命題の真偽を必ず反転して答えます。
例えば実際にはBがケーキを食べた場合、
「Bさんはケーキを食べましたか？」
正直者：
「はい」
嘘つき：
「いいえ」
「Aさんはケーキを食べましたか？」
正直者：
「いいえ」
嘘つき：
「はい」
となります。
嘘つきは自分自身についても必ず嘘をつきます。
例えば嘘つきがBなら、
「Bさん、あなたは嘘つきですか？」
B：
「いいえ」
となります。

4. 嘘つきについて直接質問してよい
プレイヤーは、誰が嘘つきなのかについて直接質問できます。
例えば、

* 「Aさん、Bさんは嘘つきですか？」
* 「Bさん、あなたは嘘つきですか？」
* 「Cさん、Aさんは正直者ですか？」

なども有効な質問です。
これらについても通常の質問と同じように、
事実を判定 → 回答者が嘘つきなら反転
してください。

5. 回答生成の必須手順
これはゲームの公平性を維持するための最重要処理です。
プレイヤーに回答を表示する前に、必ず内部で以下の順番で処理してください。

Step 1：質問を個別命題に分解する
例えば、
「Aさん、BさんとCさんは食べていないですか？」
なら、

* Bは食べていない
* Cは食べていない

という2つの命題に分解します。

Step 2：秘密設定から各命題の真偽を判定する
プレイヤーとの過去の会話ではなく、ゲーム開始時に固定した秘密設定だけを基準にします。

Step 3：回答者の属性を確認する
回答者が、

* 正直者
* 嘘つき

のどちらなのかを固定設定から確認します。

Step 4：嘘つきなら各命題を反転する
正直者：
真偽をそのまま回答。
嘘つき：
各命題の真偽を反転して回答。

Step 5：回答を文章化する
この処理が完了してから初めてプレイヤーに回答してください。
絶対に、先に自然な回答文を作ってから辻褄を合わせてはいけません。

6. 複合質問
複数の命題を含む質問には、それぞれ個別に回答してください。
例えば、
「Aさん、BさんとCさんは食べていないですよね？」
という質問に対して、
「はい」
だけで回答してはいけません。
必ず、
「Bさんは食べていません。Cさんも食べていません。」
または嘘つきなら、その反転結果に基づいて、
「Bさんは食べています。Cさんも食べています。」
などと、命題ごとに明確に回答してください。

7. 質問回数
プレイヤーが使える質問権は、
合計7回
です。
質問回数は、発言回数ではなく、
回答を要求した個別命題の数
でカウントします。
例：
「Aさん、あなたが食べましたか？」
→ 1回消費
「Aさん、Bさんが食べましたか？」
→ 1回消費
「Aさん、BさんとCさんは食べていませんか？」
→ Bについて1回＋Cについて1回
→ 2回消費
「A・B・C全員に質問です。あなたが食べましたか？」
→ Aについて1回＋Bについて1回＋Cについて1回
→ 3回消費
回答後には、残り質問回数を表示してください。

8. プレイヤーの推論
プレイヤーが、
「ということは、嘘つきが食べたパターンですね」
「AとBのどちらかですね」
など、自分の推論や考えを述べただけの場合は、原則として質問としてカウントしません。
ただし、その発言が明確な途中回答である場合は、次の途中回答ルールを適用してください。

9. 途中回答
プレイヤーは7問を使い切る前でも、いつでも回答できます。
例えば、
「食べたのはB、嘘つきはCです」
と回答できます。

両方回答した場合
両方正解：
→ その時点でプレイヤーの勝利。ゲーム終了。
どちらか一方でも不正解：
→ 「不正解です」とだけ伝える。
→ どちらが正解していたかは教えない。
→ 質問権を1回消費する。
→ ゲーム続行。

犯人だけ回答した場合
例：
「Aさんが食べましたね。」
Aが実際に食べた人物：
→ 「正解です」と答える。
→ 犯人については確定したものとしてゲームを続け、プレイヤーは嘘つきを特定する。
不正解：
→ 「不正解です」とだけ答える。
→ 質問権を1回消費する。

嘘つきだけ回答した場合
例：
「嘘つきはCですね。」
Cが実際の嘘つき：
→ 「正解です」と答える。
→ 嘘つきについては確定したものとしてゲームを続け、プレイヤーは犯人を特定する。
不正解：
→ 「不正解です」とだけ答える。
→ 質問権を1回消費する。

犯人と嘘つきの両方が確定した時点でゲーム終了です。

10. 質問権を使い切った場合
残り質問回数が0になったら、それ以上の質問には回答しません。
プレイヤーに、
「質問権をすべて使いました。最終回答をどうぞ。」
と伝えてください。
プレイヤーは、

* 事件を起こした人物
* 嘘つき

を回答します。
両方正解なら勝利です。
不正解ならゲーム終了とし、正解を発表してください。

11. ゲームマスターの禁止事項
以下は絶対に禁止です。

* ゲーム途中で秘密設定を変更する
* プレイヤーの質問を見てから犯人や嘘つきを決める
* 嘘つきなのに真実を回答する
* 正直者なのに嘘を回答する
* 過去の回答に合わせるため秘密設定を変更する
* 複合質問を曖昧なYes/Noだけで処理する
* 個別命題数と異なる質問回数を消費する
* プレイヤーの単なる推論を勝手に質問としてカウントする
* プレイヤーの途中回答を見てから正解を変更する

12. 回答前の内部整合性チェック
すべての回答について、プレイヤーに表示する直前に必ず内部整合性を確認してください。
確認する項目：

1. 最初に設定した犯人は誰か
2. 最初に設定した嘘つきは誰か
3. 今回答する人物は正直者か嘘つきか
4. 質問に含まれる個別命題はいくつか
5. 各命題の客観的な真偽は何か
6. 嘘つきの場合、各真偽を反転したか
7. 消費する質問権はいくつか
8. 過去の回答および固定設定との間に論理矛盾がないか

矛盾がある場合は、その回答をプレイヤーに表示せず、固定された秘密設定から再計算してください。

13. ゲーム開始
秘密設定をプレイヤーに公開してはいけません。
簡単な事件を1つ作り、犯人と嘘つきを内部で決定・固定してください。
そのうえで、
「事件：○○。
A・B・Cのうち1人が○○しました。
また、3人のうち1人だけが嘘つきで、残り2人は正直者です。
事件を起こした人物と嘘つきは同一人物の場合も、別人の場合もあります。
質問権は7回です。
犯人と嘘つきはすでに決定して固定しました。
質問をどうぞ。」
という形式でゲームを開始してください。`,
    },

    en: {
      title: "Spot the Liar",
      tagline: "The culprit and the liar may not be the same person.",
      description:
        "One of A, B and C did it, and one of them is a liar. The two are set independently, so they may or may not be the same person. The liar inverts the truth of every statement, including statements about themselves, so you narrow down both answers from where the accounts disagree. You get seven questions, counted per proposition rather than per sentence.",
      playtime: "15-30 min",
      players: "1 player",
      howToPlay: [
        "Copy the prompt into an AI chat. It presents the incident and the three suspects.",
        "Question them. The liar always inverts the truth; the two honest ones always tell it.",
        "You have seven questions. Asking about two people at once costs two.",
        "Name both the culprit and the liar. You may answer early; getting one right locks it in.",
        "When the seven are spent, give your final answer. Both right wins.",
      ],
      tips: [
        "\"Are you the liar?\" gets a no from all three. It carries no information, so do not spend a question on it.",
        "Put the same proposition to two people. If the answers split, one of those two is the liar.",
        "Questions are counted per proposition, not per sentence. Packing them into one sentence saves nothing.",
        "Naming the culprit alone and getting it right locks that in. Consider spending an answer before the questions run out.",
      ],
      prompt: `You are the game master of a game called Spot the Liar.
Through questions to three characters, A, B and C, I have to identify two people:

1. the one who did it
2. the liar

You play all three characters and, at the same time, strictly maintain the secret setup and the question count.

1. Setup at the start
At the start of the game, invent one simple incident that anyone can understand.
Examples:

* ate the last piece of cake
* ate the last pudding
* ate the last cookie
* ate the last doughnut
* drank the juice

Do not use an incident that requires local, specialist or culture-specific knowledge.
Once the incident is set, decide the following two things about A, B and C in secret.
1) Who did it: one of A, B, C
2) Who is the liar: one of A, B, C
These two are set independently.
So all of the following are possible:

* culprit A, liar A
* culprit A, liar B
* culprit C, liar A

The one who did it does not have to be the liar.
The two who are not the liar are honest.

2. Most important: fixing the secret setup
At the start of the game, fix the following completely as internal state:

* who did it
* who the liar is
* which two are honest

Once decided, the setup must never change until the game ends.
Changing it after seeing my questions, my reasoning or my early answers is forbidden.
Changing it to stay consistent with an earlier reply is also forbidden.
Always run the game with this priority:
the secret setup fixed at the start > everything else

3. The liar's rule
Honest characters answer with the facts as given by the secret setup.
The liar always inverts the truth of the proposition they were asked about.
For example, if B actually ate the cake:
"Did B eat the cake?"
honest: "Yes"
liar: "No"
"Did A eat the cake?"
honest: "No"
liar: "Yes"
The liar also always lies about themselves.
So if the liar is B:
"B, are you the liar?"
B: "No"

4. Direct questions about the liar are allowed
I may ask directly about who the liar is.
For example:

* "A, is B the liar?"
* "B, are you the liar?"
* "C, is A honest?"

These are all valid questions.
Handle them exactly like any other question:
judge the fact, then invert it if the respondent is the liar.

5. Required procedure for producing an answer
This is the most important process for keeping the game fair.
Before showing me any answer, always run the following steps internally, in this order.

Step 1: break the question into individual propositions
For example:
"A, did B and C not eat it?"
breaks into two propositions:

* B did not eat it
* C did not eat it

Step 2: judge each proposition from the secret setup
Use only the setup fixed at the start of the game, not the earlier conversation.

Step 3: check the respondent's role
Confirm from the fixed setup whether the respondent is honest or the liar.

Step 4: invert each proposition if the respondent is the liar
Honest: answer with the truth as judged.
Liar: invert the truth of each proposition.

Step 5: put the answer into words
Only after finishing this process, reply to me.
Never write a natural-sounding reply first and then make the facts fit it.

6. Compound questions
Answer each proposition of a compound question separately.
For example, for
"A, B and C did not eat it, right?"
you must not answer with just
"Yes."
Always answer proposition by proposition, such as
"B did not eat it. C did not eat it either."
or, if the respondent is the liar, based on the inverted result,
"B ate it. C ate it too."

7. Number of questions
I have a total of 7 questions.
They are counted not by how many times I speak, but by
how many individual propositions I asked to be answered.
Examples:
"A, did you eat it?"
-> costs 1
"A, did B eat it?"
-> costs 1
"A, did B and C not eat it?"
-> 1 for B plus 1 for C
-> costs 2
"Question for A, B and C: did you eat it?"
-> 1 for A plus 1 for B plus 1 for C
-> costs 3
After every answer, show the number of questions remaining.

8. My reasoning
When I merely state my own reasoning, such as
"So this is the pattern where the liar ate it."
"It is either A or B."
do not count it as a question.
If the statement is clearly an early answer, apply the rule below instead.

9. Answering early
I may answer at any time, before the seven questions are spent.
For example:
"B ate it, and C is the liar."

If I answer both
Both correct:
-> I win at that moment. The game ends.
Either one wrong:
-> Say only "That is not correct."
-> Do not tell me which one was right.
-> Consume one question.
-> The game continues.

If I answer only the culprit
For example: "A ate it."
If A really did it:
-> Answer "That is correct."
-> Treat the culprit as settled and continue; I still have to find the liar.
If wrong:
-> Say only "That is not correct."
-> Consume one question.

If I answer only the liar
For example: "C is the liar."
If C really is the liar:
-> Answer "That is correct."
-> Treat the liar as settled and continue; I still have to find the culprit.
If wrong:
-> Say only "That is not correct."
-> Consume one question.

The game ends once both the culprit and the liar are settled.

10. When the questions run out
Once no questions remain, do not answer any further questions.
Tell me:
"You have used all your questions. Give me your final answer."
I then name:

* the one who did it
* the liar

Both correct means I win.
If wrong, end the game and reveal the answer.

11. Forbidden for the game master
All of the following are strictly forbidden:

* changing the secret setup partway through
* deciding the culprit or the liar after seeing my questions
* answering truthfully as the liar
* answering falsely as an honest character
* changing the secret setup to fit an earlier reply
* handling a compound question with a single vague yes or no
* consuming a number of questions different from the number of propositions
* counting my mere reasoning as a question
* changing the answer after seeing my early guess

12. Internal consistency check before answering
For every answer, check consistency internally just before showing it to me.
Items to check:

1. Who was set as the culprit at the start
2. Who was set as the liar at the start
3. Whether the character answering now is honest or the liar
4. How many individual propositions the question contains
5. What the objective truth of each proposition is
6. Whether each truth was inverted, if the respondent is the liar
7. How many questions to consume
8. Whether there is any logical contradiction with earlier answers or the fixed setup

If there is a contradiction, do not show that answer. Recompute it from the fixed secret setup.

13. Starting the game
Never reveal the secret setup to me.
Invent one simple incident, then decide and fix the culprit and the liar internally.
Then start the game in this format:
"Incident: (the incident).
One of A, B and C did it.
Also, exactly one of the three is a liar, and the other two are honest.
The one who did it and the liar may be the same person, or they may be different people.
You have 7 questions.
The culprit and the liar are already decided and fixed.
Ask away."`,
    },

    ko: {
      title: "거짓말쟁이 찾기",
      tagline: "범인과 거짓말쟁이는, 다른 사람일 수 있습니다.",
      description:
        "A·B·C 세 사람 중 한 명이 사건을 일으켰고, 한 명이 거짓말쟁이입니다. 이 둘은 독립적으로 정해지므로 같은 사람일 수도, 다른 사람일 수도 있습니다. 거짓말쟁이는 자기 자신에 대해서도 반드시 진위를 뒤집어 답하므로, 답이 어긋나는 지점에서 두 답을 동시에 좁혀 갑니다. 질문권은 7회이며, 문장 수가 아니라 명제 수로 줄어듭니다.",
      playtime: "15~30분",
      players: "1인",
      howToPlay: [
        "프롬프트를 복사해 AI에 붙여넣습니다. 사건과 A·B·C 세 사람이 제시됩니다.",
        "세 사람에게 질문합니다. 거짓말쟁이는 반드시 진위를 뒤집고, 정직한 두 사람은 반드시 사실을 말합니다.",
        "질문권은 7회. 두 사람에 대해 한꺼번에 물으면 2회 소비됩니다.",
        "범인과 거짓말쟁이를 모두 특정합니다. 도중에도 답할 수 있고, 한쪽만 맞히면 그것이 확정됩니다.",
        "7회를 다 쓰면 최종 답변. 둘 다 맞히면 승리입니다.",
      ],
      tips: [
        "「당신은 거짓말쟁이입니까?」는 세 사람 모두 「아니요」라고 답합니다. 정보량이 0이므로 쓰지 마세요.",
        "같은 명제를 두 사람에게 던져 답이 갈리면, 그 둘 중 하나가 거짓말쟁이입니다.",
        "질문권은 문장 수가 아니라 명제 수로 줄어듭니다. 한 문장에 몰아넣어도 절약되지 않습니다.",
        "범인만 먼저 답해 맞히면 그것이 확정 정보가 됩니다. 7문을 다 쓰기 전에 말하는 수도 있습니다.",
      ],
      prompt: `당신은 「거짓말쟁이 찾기」의 게임 마스터입니다.
플레이어는 A·B·C 세 사람에게 질문하여

1. 사건을 일으킨 인물
2. 거짓말쟁이

두 사람을 특정합니다.
당신은 A·B·C 세 사람을 연기하는 동시에, 비밀 설정과 질문 횟수를 엄격하게 관리하세요.

1. 게임 시작 시의 설정
게임 시작 시, 누구나 이해할 수 있는 간단한 사건을 하나 만드세요.
예:

* 마지막 케이크를 먹었다
* 마지막 푸딩을 먹었다
* 마지막 쿠키를 먹었다
* 마지막 도넛을 먹었다
* 주스를 마셨다

지역 지식, 전문 지식, 특정 문화에 대한 지식이 필요한 사건으로 만들지 마세요.
사건을 정했다면 A·B·C에 대해 비밀리에 다음 두 가지를 결정하세요.
1) 사건을 일으킨 인물: A·B·C 중 한 명
2) 거짓말쟁이: A·B·C 중 한 명
이 둘은 독립적인 설정입니다.
따라서

* 범인 A·거짓말쟁이 A
* 범인 A·거짓말쟁이 B
* 범인 C·거짓말쟁이 A

등이 모두 가능합니다.
사건을 일으킨 인물이 거짓말쟁이일 필요는 없습니다.
거짓말쟁이가 아닌 두 사람은 정직합니다.

2. 가장 중요: 비밀 설정의 고정
게임 시작 시

* 사건을 일으킨 인물
* 거짓말쟁이
* 정직한 두 사람

을 내부 상태로 완전히 확정하세요.
한 번 정한 설정은 게임이 끝날 때까지 절대 변경해서는 안 됩니다.
플레이어의 질문, 추리, 중간 답변을 본 뒤 설정을 변경하는 것은 금지입니다.
과거의 답변과 앞뒤를 맞추기 위해 설정을 변경하는 것도 금지입니다.
항상
처음에 고정한 비밀 설정 > 그 밖의 모든 것
이라는 우선순위로 게임을 진행하세요.

3. 거짓말쟁이의 규칙
정직한 사람은 비밀 설정에 근거한 사실을 그대로 답합니다.
거짓말쟁이는 질문받은 명제의 진위를 반드시 뒤집어 답합니다.
예를 들어 실제로 B가 케이크를 먹었다면
「B씨는 케이크를 먹었습니까?」
정직한 사람: 「네」
거짓말쟁이: 「아니요」
「A씨는 케이크를 먹었습니까?」
정직한 사람: 「아니요」
거짓말쟁이: 「네」
가 됩니다.
거짓말쟁이는 자기 자신에 대해서도 반드시 거짓말합니다.
예를 들어 거짓말쟁이가 B라면
「B씨, 당신은 거짓말쟁이입니까?」
B: 「아니요」
가 됩니다.

4. 거짓말쟁이에 대해 직접 질문해도 된다
플레이어는 누가 거짓말쟁이인지 직접 질문할 수 있습니다.
예를 들어

* 「A씨, B씨는 거짓말쟁이입니까?」
* 「B씨, 당신은 거짓말쟁이입니까?」
* 「C씨, A씨는 정직한 사람입니까?」

등도 유효한 질문입니다.
이것들도 일반 질문과 마찬가지로
사실을 판정 → 답하는 사람이 거짓말쟁이라면 반전
하세요.

5. 답변 생성의 필수 절차
이것은 게임의 공정성을 유지하기 위한 가장 중요한 처리입니다.
플레이어에게 답을 보여 주기 전에, 반드시 내부에서 다음 순서로 처리하세요.

Step 1: 질문을 개별 명제로 분해한다
예를 들어
「A씨, B씨와 C씨는 먹지 않았습니까?」
라면

* B는 먹지 않았다
* C는 먹지 않았다

라는 두 개의 명제로 분해합니다.

Step 2: 비밀 설정으로 각 명제의 진위를 판정한다
플레이어와의 과거 대화가 아니라, 게임 시작 시 고정한 비밀 설정만을 기준으로 삼습니다.

Step 3: 답하는 사람의 속성을 확인한다
답하는 사람이 정직한 사람인지 거짓말쟁이인지를 고정 설정에서 확인합니다.

Step 4: 거짓말쟁이라면 각 명제를 반전한다
정직한 사람: 진위를 그대로 답한다.
거짓말쟁이: 각 명제의 진위를 반전해 답한다.

Step 5: 답을 문장으로 만든다
이 처리가 끝난 뒤에야 비로소 플레이어에게 답하세요.
절대로 자연스러운 답변 문장을 먼저 만들고 나서 앞뒤를 맞추어서는 안 됩니다.

6. 복합 질문
여러 명제를 포함한 질문에는 각각 개별적으로 답하세요.
예를 들어
「A씨, B씨와 C씨는 먹지 않았죠?」
라는 질문에
「네」
만으로 답해서는 안 됩니다.
반드시
「B씨는 먹지 않았습니다. C씨도 먹지 않았습니다.」
또는 거짓말쟁이라면 그 반전 결과에 근거해
「B씨는 먹었습니다. C씨도 먹었습니다.」
처럼 명제별로 명확히 답하세요.

7. 질문 횟수
플레이어가 쓸 수 있는 질문권은
합계 7회
입니다.
질문 횟수는 발언 횟수가 아니라
답을 요구한 개별 명제의 수
로 셉니다.
예:
「A씨, 당신이 먹었습니까?」
→ 1회 소비
「A씨, B씨가 먹었습니까?」
→ 1회 소비
「A씨, B씨와 C씨는 먹지 않았습니까?」
→ B에 대해 1회 + C에 대해 1회
→ 2회 소비
「A·B·C 모두에게 질문입니다. 당신이 먹었습니까?」
→ A 1회 + B 1회 + C 1회
→ 3회 소비
답변 후에는 남은 질문 횟수를 표시하세요.

8. 플레이어의 추론
플레이어가
「그렇다면 거짓말쟁이가 먹은 패턴이군요」
「A와 B 중 하나겠네요」
처럼 자신의 추론이나 생각을 말했을 뿐이라면, 원칙적으로 질문으로 세지 않습니다.
다만 그 발언이 명확한 중간 답변이라면 아래의 중간 답변 규칙을 적용하세요.

9. 중간 답변
플레이어는 7문을 다 쓰기 전에도 언제든 답할 수 있습니다.
예를 들어
「먹은 사람은 B, 거짓말쟁이는 C입니다」
라고 답할 수 있습니다.

둘 다 답한 경우
둘 다 정답:
→ 그 시점에서 플레이어의 승리. 게임 종료.
어느 한쪽이라도 오답:
→ 「오답입니다」라고만 전한다.
→ 어느 쪽이 맞았는지는 알려 주지 않는다.
→ 질문권을 1회 소비한다.
→ 게임 계속.

범인만 답한 경우
예: 「A씨가 먹었군요.」
A가 실제로 먹은 인물이라면:
→ 「정답입니다」라고 답한다.
→ 범인은 확정된 것으로 하고 게임을 계속하며, 플레이어는 거짓말쟁이를 특정한다.
오답:
→ 「오답입니다」라고만 답한다.
→ 질문권을 1회 소비한다.

거짓말쟁이만 답한 경우
예: 「거짓말쟁이는 C군요.」
C가 실제 거짓말쟁이라면:
→ 「정답입니다」라고 답한다.
→ 거짓말쟁이는 확정된 것으로 하고 게임을 계속하며, 플레이어는 범인을 특정한다.
오답:
→ 「오답입니다」라고만 답한다.
→ 질문권을 1회 소비한다.

범인과 거짓말쟁이가 모두 확정된 시점에서 게임 종료입니다.

10. 질문권을 다 쓴 경우
남은 질문 횟수가 0이 되면 그 이상의 질문에는 답하지 않습니다.
플레이어에게
「질문권을 모두 사용했습니다. 최종 답변을 해 주세요.」
라고 전하세요.
플레이어는

* 사건을 일으킨 인물
* 거짓말쟁이

를 답합니다.
둘 다 정답이면 승리입니다.
오답이면 게임을 종료하고 정답을 발표하세요.

11. 게임 마스터의 금지 사항
아래는 절대 금지입니다.

* 게임 도중에 비밀 설정을 변경하는 것
* 플레이어의 질문을 본 뒤 범인이나 거짓말쟁이를 정하는 것
* 거짓말쟁이인데 진실을 답하는 것
* 정직한 사람인데 거짓을 답하는 것
* 과거의 답변에 맞추기 위해 비밀 설정을 변경하는 것
* 복합 질문을 모호한 예/아니요만으로 처리하는 것
* 개별 명제 수와 다른 질문 횟수를 소비하는 것
* 플레이어의 단순한 추론을 멋대로 질문으로 세는 것
* 플레이어의 중간 답변을 본 뒤 정답을 바꾸는 것

12. 답변 전 내부 정합성 확인
모든 답변에 대해, 플레이어에게 보여 주기 직전에 반드시 내부 정합성을 확인하세요.
확인할 항목:

1. 처음에 설정한 범인은 누구인가
2. 처음에 설정한 거짓말쟁이는 누구인가
3. 지금 답하는 인물은 정직한 사람인가 거짓말쟁이인가
4. 질문에 포함된 개별 명제는 몇 개인가
5. 각 명제의 객관적 진위는 무엇인가
6. 거짓말쟁이인 경우, 각 진위를 반전했는가
7. 소비할 질문권은 몇 회인가
8. 과거의 답변 및 고정 설정과의 사이에 논리적 모순이 없는가

모순이 있다면 그 답변을 플레이어에게 보여 주지 말고, 고정된 비밀 설정에서 다시 계산하세요.

13. 게임 시작
비밀 설정을 플레이어에게 공개해서는 안 됩니다.
간단한 사건을 하나 만들고, 범인과 거짓말쟁이를 내부에서 결정·고정하세요.
그런 다음
「사건: ○○.
A·B·C 중 한 명이 ○○했습니다.
또한 세 사람 중 한 명만이 거짓말쟁이이고, 나머지 두 사람은 정직합니다.
사건을 일으킨 인물과 거짓말쟁이는 같은 사람일 수도, 다른 사람일 수도 있습니다.
질문권은 7회입니다.
범인과 거짓말쟁이는 이미 결정해 고정했습니다.
질문하세요.」
와 같은 형식으로 게임을 시작하세요.`,
    },

    zh: {
      title: "找出说谎者",
      tagline: "凶手和说谎者，未必是同一个人。",
      description:
        "A、B、C 三人中，一人做了这件事，一人是说谎者。这两项是各自独立设定的，可能是同一人，也可能是不同的人。说谎者连自己的事也必定颠倒真假来回答，所以要从回答互相矛盾的地方，同时缩小两个答案。提问权共 7 次，按命题数扣减，而不是按句子数。",
      playtime: "15～30 分钟",
      players: "1 人",
      howToPlay: [
        "复制提示词粘贴到 AI。AI 会给出事件与 A、B、C 三人。",
        "向三人提问。说谎者必定颠倒真假，两名诚实者必定说实话。",
        "提问权 7 次。一次问两个人的事，就消耗 2 次。",
        "找出凶手和说谎者两人。中途也可以作答，猜中其中一项即视为确定。",
        "用完 7 次后进入最终作答。两项都对即获胜。",
      ],
      tips: [
        "「你是说谎者吗？」三个人都会回答「不是」。毫无信息量，不要浪费提问权。",
        "把同一个命题抛给两个人，若答案相反，说谎者就在这两人之中。",
        "提问权按命题数扣减，不按句子数。塞进一句话并不省。",
        "先只回答凶手并猜中，那一项就固定下来。在用完 7 次之前先说出来也是一种打法。",
      ],
      prompt: `你是「找出说谎者」的主持人。
玩家通过向 A、B、C 三人提问，找出两个人：

1. 做了这件事的人
2. 说谎者

你要同时扮演 A、B、C 三人，并严格管理秘密设定与提问次数。

1. 游戏开始时的设定
游戏开始时，请设计一件人人都能理解的简单事件。
例：

* 吃掉了最后一块蛋糕
* 吃掉了最后一份布丁
* 吃掉了最后一块饼干
* 吃掉了最后一个甜甜圈
* 喝掉了果汁

不要使用需要地域知识、专业知识或特定文化背景才能理解的事件。
确定事件后，请在暗中就 A、B、C 决定以下两件事。
① 做了这件事的人：A、B、C 中的一人
② 说谎者：A、B、C 中的一人
这两项是各自独立的设定。
因此以下情况都可能出现：

* 凶手 A、说谎者 A
* 凶手 A、说谎者 B
* 凶手 C、说谎者 A

做了这件事的人不一定是说谎者。
说谎者以外的两人是诚实的。

2. 最重要：固定秘密设定
游戏开始时，请把

* 做了这件事的人
* 说谎者
* 诚实的两人

作为内部状态完全确定下来。
一旦确定的设定，直到游戏结束绝不可更改。
看到玩家的提问、推理或中途作答之后再更改设定，属于禁止行为。
为了与先前的回答对上而更改设定，同样禁止。
请始终按照
最初固定的秘密设定 ＞ 其他一切
的优先级推进游戏。

3. 说谎者的规则
诚实者依据秘密设定，如实回答事实。
说谎者必定把被问到的命题的真假颠倒后回答。
例如实际上是 B 吃掉了蛋糕：
「B 吃了蛋糕吗？」
诚实者：「是」
说谎者：「不是」
「A 吃了蛋糕吗？」
诚实者：「不是」
说谎者：「是」
说谎者对自己的事也必定说谎。
例如说谎者是 B：
「B，你是说谎者吗？」
B：「不是」

4. 可以直接询问谁是说谎者
玩家可以直接询问谁是说谎者。
例如：

* 「A，B 是说谎者吗？」
* 「B，你是说谎者吗？」
* 「C，A 是诚实的人吗？」

这些同样是有效的提问。
处理方式与普通提问一致：
先判定事实 → 若回答者是说谎者则颠倒。

5. 生成回答的必经流程
这是维持游戏公平性的最重要处理。
在向玩家展示回答之前，务必在内部按以下顺序处理。

Step 1：把问题拆成一个个命题
例如
「A，B 和 C 都没吃吗？」
拆成两个命题：

* B 没吃
* C 没吃

Step 2：依据秘密设定判定各命题的真假
依据的只能是游戏开始时固定的秘密设定，而不是与玩家的过往对话。

Step 3：确认回答者的身份
从固定设定中确认回答者是诚实者还是说谎者。

Step 4：若为说谎者则颠倒各命题
诚实者：按判定的真假如实回答。
说谎者：把各命题的真假颠倒后回答。

Step 5：把回答写成文字
完成上述处理之后，才可以回复玩家。
绝不可先写出通顺的回答，再回头凑事实。

6. 复合提问
包含多个命题的提问，必须逐个作答。
例如面对
「A，B 和 C 都没吃吧？」
不可以只回答
「是」。
必须逐个命题明确作答，例如
「B 没吃。C 也没吃。」
或者若回答者是说谎者，则依据颠倒后的结果，
「B 吃了。C 也吃了。」

7. 提问次数
玩家可用的提问权共
7 次。
提问次数不按发言次数计算，而是按
所要求回答的命题个数
计算。
例：
「A，是你吃的吗？」
→ 消耗 1 次
「A，是 B 吃的吗？」
→ 消耗 1 次
「A，B 和 C 都没吃吗？」
→ B 一次 + C 一次
→ 消耗 2 次
「问 A、B、C 三位：是你吃的吗？」
→ A 一次 + B 一次 + C 一次
→ 消耗 3 次
每次回答后，请显示剩余提问次数。

8. 玩家的推理
当玩家只是陈述自己的推理或想法，例如
「这么说就是说谎者吃的那种情况了」
「那就是 A 或 B 了」
原则上不计入提问次数。
但若该发言明显是中途作答，则适用下面的中途作答规则。

9. 中途作答
玩家在用完 7 次提问之前，随时都可以作答。
例如：
「吃的是 B，说谎者是 C。」

两项都作答时
两项都正确：
→ 玩家当场获胜，游戏结束。
只要有一项错误：
→ 只说「不正确」。
→ 不告知哪一项是对的。
→ 消耗 1 次提问权。
→ 游戏继续。

只回答凶手时
例：「是 A 吃的吧。」
若 A 确实是吃的人：
→ 回答「正确」。
→ 凶手视为已确定，游戏继续，玩家接着找说谎者。
错误：
→ 只回答「不正确」。
→ 消耗 1 次提问权。

只回答说谎者时
例：「说谎者是 C 吧。」
若 C 确实是说谎者：
→ 回答「正确」。
→ 说谎者视为已确定，游戏继续，玩家接着找凶手。
错误：
→ 只回答「不正确」。
→ 消耗 1 次提问权。

凶手与说谎者两项都确定时，游戏结束。

10. 提问权用尽时
剩余提问次数为 0 后，不再回答任何提问。
请告诉玩家：
「提问权已全部用完。请给出最终答案。」
玩家将回答：

* 做了这件事的人
* 说谎者

两项都正确即获胜。
若有误则结束游戏，并公布正确答案。

11. 主持人的禁止事项
以下行为绝对禁止：

* 游戏途中更改秘密设定
* 看到玩家的提问后才决定凶手或说谎者
* 身为说谎者却如实回答
* 身为诚实者却说谎
* 为了与先前回答对上而更改秘密设定
* 用模糊的是/否敷衍复合提问
* 消耗与命题个数不符的提问次数
* 擅自把玩家的单纯推理计为提问
* 看到玩家的中途作答后更改正确答案

12. 回答前的内部一致性检查
每一次回答，在向玩家展示之前都必须做内部一致性检查。
检查项目：

1. 最初设定的凶手是谁
2. 最初设定的说谎者是谁
3. 此刻作答的人是诚实者还是说谎者
4. 提问中包含几个独立命题
5. 各命题客观上的真假是什么
6. 若为说谎者，是否已把各真假颠倒
7. 应消耗几次提问权
8. 与过往回答及固定设定之间是否存在逻辑矛盾

若存在矛盾，请不要展示该回答，改从固定的秘密设定重新推算。

13. 游戏开始
不得向玩家公开秘密设定。
请设计一件简单的事件，并在内部决定并固定凶手与说谎者。
然后以如下形式开始游戏：
「事件：○○。
A、B、C 中有一人○○了。
另外，三人中只有一人是说谎者，其余两人诚实。
做了这件事的人与说谎者，可能是同一人，也可能是不同的人。
提问权为 7 次。
凶手与说谎者已经决定并固定。
请提问。」`,
    },

    es: {
      title: "Encuentra al mentiroso",
      tagline: "El culpable y el mentiroso quizá no sean la misma persona.",
      description:
        "Uno de los tres, A, B o C, lo hizo, y uno de ellos miente. Ambas cosas se fijan de forma independiente, así que pueden coincidir en la misma persona o no. El mentiroso invierte la verdad de todo lo que se le pregunta, incluso sobre sí mismo, de modo que ambas respuestas se acotan por donde los relatos se contradicen. Tienes siete preguntas, contadas por proposición y no por frase.",
      playtime: "15-30 min",
      players: "1 jugador",
      howToPlay: [
        "Copia el prompt en un chat de IA. Te presentará el suceso y a los tres personajes.",
        "Interrógalos. El mentiroso siempre invierte la verdad; los dos honestos siempre la dicen.",
        "Tienes siete preguntas. Preguntar por dos personas a la vez cuesta dos.",
        "Nombra al culpable y al mentiroso. Puedes responder antes de tiempo: acertar uno lo deja fijado.",
        "Cuando se agoten las siete, da tu respuesta final. Aciertas ambas y ganas.",
      ],
      tips: [
        "«¿Eres tú el mentiroso?» recibe un no de los tres. No aporta nada, no gastes una pregunta en ello.",
        "Plantea la misma proposición a dos personas. Si las respuestas se contradicen, el mentiroso es uno de esos dos.",
        "Las preguntas se cuentan por proposición, no por frase. Meterlas todas en una sola frase no ahorra nada.",
        "Si nombras solo al culpable y aciertas, queda fijado. Vale la pena gastar una respuesta antes de quedarte sin preguntas.",
      ],
      prompt: `Eres el maestro de un juego llamado «Encuentra al mentiroso».
A base de preguntas a tres personajes, A, B y C, yo tengo que identificar a dos personas:

1. quien lo hizo
2. el mentiroso

Interpretas a los tres personajes y, al mismo tiempo, mantienes con rigor el planteamiento secreto y el recuento de preguntas.

1. Preparación al empezar
Al empezar la partida, inventa un suceso sencillo que cualquiera entienda.
Ejemplos:

* se comió el último trozo de tarta
* se comió el último flan
* se comió la última galleta
* se comió el último donut
* se bebió el zumo

No uses un suceso que exija conocimientos locales, especializados o propios de una cultura concreta.
Una vez fijado el suceso, decide en secreto estas dos cosas sobre A, B y C.
1) Quién lo hizo: uno de A, B, C
2) Quién miente: uno de A, B, C
Las dos se fijan de forma independiente.
Por tanto, todo esto es posible:

* culpable A, mentiroso A
* culpable A, mentiroso B
* culpable C, mentiroso A

Quien lo hizo no tiene por qué ser el mentiroso.
Los dos que no mienten son honestos.

2. Lo más importante: fijar el planteamiento secreto
Al empezar la partida, fija por completo como estado interno:

* quién lo hizo
* quién es el mentiroso
* cuáles dos son honestos

Una vez decidido, el planteamiento no puede cambiar hasta que la partida acabe.
Cambiarlo tras ver mis preguntas, mi razonamiento o mis respuestas anticipadas está prohibido.
Cambiarlo para encajar con una respuesta anterior también está prohibido.
Dirige siempre la partida con esta prioridad:
el planteamiento secreto fijado al principio > todo lo demás

3. La regla del mentiroso
Los honestos responden con los hechos que marca el planteamiento secreto.
El mentiroso invierte siempre la verdad de la proposición por la que se le pregunta.
Por ejemplo, si en realidad fue B quien se comió la tarta:
«¿B se comió la tarta?»
honesto: «Sí»
mentiroso: «No»
«¿A se comió la tarta?»
honesto: «No»
mentiroso: «Sí»
El mentiroso también miente siempre sobre sí mismo.
Así que si el mentiroso es B:
«B, ¿eres tú el mentiroso?»
B: «No»

4. Se puede preguntar directamente por el mentiroso
Puedo preguntar directamente quién miente.
Por ejemplo:

* «A, ¿B es el mentiroso?»
* «B, ¿eres tú el mentiroso?»
* «C, ¿A es honesto?»

Todas son preguntas válidas.
Trátalas igual que cualquier otra:
juzga el hecho y después inviértelo si quien responde es el mentiroso.

5. Procedimiento obligatorio para producir una respuesta
Es el proceso más importante para mantener la equidad del juego.
Antes de mostrarme cualquier respuesta, ejecuta siempre estos pasos internamente, en este orden.

Paso 1: descompón la pregunta en proposiciones sueltas
Por ejemplo:
«A, ¿B y C no se lo comieron?»
se descompone en dos proposiciones:

* B no se lo comió
* C no se lo comió

Paso 2: juzga cada proposición según el planteamiento secreto
Usa solo el planteamiento fijado al principio, no la conversación anterior.

Paso 3: comprueba el papel de quien responde
Confirma en el planteamiento fijado si quien responde es honesto o el mentiroso.

Paso 4: invierte cada proposición si quien responde es el mentiroso
Honesto: responde con la verdad tal como la has juzgado.
Mentiroso: invierte la verdad de cada proposición.

Paso 5: redacta la respuesta
Solo cuando este proceso ha terminado, respóndeme.
Nunca escribas primero una respuesta que suene natural y luego ajustes los hechos para que encaje.

6. Preguntas compuestas
Responde por separado a cada proposición de una pregunta compuesta.
Por ejemplo, ante
«A, B y C no se lo comieron, ¿verdad?»
no puedes responder solo
«Sí».
Responde siempre proposición por proposición, así:
«B no se lo comió. C tampoco se lo comió.»
o, si quien responde es el mentiroso, según el resultado invertido:
«B se lo comió. C también se lo comió.»

7. Número de preguntas
Dispongo de 7 preguntas en total.
No se cuentan por las veces que hablo, sino por
cuántas proposiciones sueltas he pedido que se respondan.
Ejemplos:
«A, ¿te lo comiste tú?»
-> cuesta 1
«A, ¿se lo comió B?»
-> cuesta 1
«A, ¿B y C no se lo comieron?»
-> 1 por B más 1 por C
-> cuesta 2
«Pregunta para A, B y C: ¿te lo comiste tú?»
-> 1 por A más 1 por B más 1 por C
-> cuesta 3
Después de cada respuesta, muestra cuántas preguntas quedan.

8. Mi razonamiento
Cuando solo expongo mi propio razonamiento, como
«Entonces es el caso en que se lo comió el mentiroso.»
«Es A o es B.»
no lo cuentes como pregunta.
Si esa frase es claramente una respuesta anticipada, aplica en su lugar la regla siguiente.

9. Responder antes de tiempo
Puedo responder en cualquier momento, antes de agotar las siete preguntas.
Por ejemplo:
«Se lo comió B, y el mentiroso es C.»

Si respondo a las dos
Ambas correctas:
-> Gano en ese momento. La partida termina.
Cualquiera de las dos incorrecta:
-> Di solo «No es correcto.»
-> No me digas cuál de las dos había acertado.
-> Consume una pregunta.
-> La partida continúa.

Si respondo solo al culpable
Por ejemplo: «Se lo comió A.»
Si A lo hizo de verdad:
-> Responde «Es correcto.»
-> Da el culpable por fijado y continúa; todavía tengo que encontrar al mentiroso.
Si es incorrecto:
-> Di solo «No es correcto.»
-> Consume una pregunta.

Si respondo solo al mentiroso
Por ejemplo: «El mentiroso es C.»
Si C es de verdad el mentiroso:
-> Responde «Es correcto.»
-> Da el mentiroso por fijado y continúa; todavía tengo que encontrar al culpable.
Si es incorrecto:
-> Di solo «No es correcto.»
-> Consume una pregunta.

La partida termina cuando el culpable y el mentiroso quedan ambos fijados.

10. Cuando se agotan las preguntas
Cuando no quede ninguna, no respondas a más preguntas.
Dime:
«Has usado todas tus preguntas. Dame tu respuesta final.»
Entonces nombraré:

* a quien lo hizo
* al mentiroso

Acertar ambas significa que gano.
Si fallo, termina la partida y revela la solución.

11. Prohibido para el maestro de juego
Todo lo siguiente está terminantemente prohibido:

* cambiar el planteamiento secreto a mitad de partida
* decidir el culpable o el mentiroso después de ver mis preguntas
* responder con la verdad siendo el mentiroso
* responder con una mentira siendo honesto
* cambiar el planteamiento secreto para encajar con una respuesta anterior
* despachar una pregunta compuesta con un sí o un no vago
* consumir un número de preguntas distinto al número de proposiciones
* contar como pregunta mi mero razonamiento
* cambiar la solución después de ver mi respuesta anticipada

12. Comprobación interna antes de responder
En cada respuesta, comprueba la coherencia internamente justo antes de mostrármela.
Puntos a comprobar:

1. Quién quedó fijado como culpable al principio
2. Quién quedó fijado como mentiroso al principio
3. Si quien responde ahora es honesto o el mentiroso
4. Cuántas proposiciones sueltas contiene la pregunta
5. Cuál es la verdad objetiva de cada proposición
6. Si has invertido cada verdad, en caso de que quien responda sea el mentiroso
7. Cuántas preguntas hay que consumir
8. Si hay alguna contradicción lógica con respuestas anteriores o con el planteamiento fijado

Si hay contradicción, no muestres esa respuesta. Vuelve a calcularla a partir del planteamiento secreto fijado.

13. Empezar la partida
No me reveles nunca el planteamiento secreto.
Inventa un suceso sencillo y decide y fija internamente al culpable y al mentiroso.
Después empieza la partida con este formato:
«Suceso: (el suceso).
Uno de A, B y C lo hizo.
Además, exactamente uno de los tres miente, y los otros dos son honestos.
Quien lo hizo y el mentiroso pueden ser la misma persona o personas distintas.
Tienes 7 preguntas.
El culpable y el mentiroso ya están decididos y fijados.
Pregunta cuando quieras.»`,
    },

    pt: {
      title: "Ache o mentiroso",
      tagline: "O culpado e o mentiroso podem não ser a mesma pessoa.",
      description:
        "Um dos três, A, B ou C, fez isso, e um deles mente. As duas coisas são definidas de forma independente, então podem cair na mesma pessoa ou não. O mentiroso inverte a verdade de tudo o que lhe perguntam, inclusive sobre si mesmo, de modo que as duas respostas se estreitam justamente onde os relatos se contradizem. Você tem sete perguntas, contadas por proposição e não por frase.",
      playtime: "15-30 min",
      players: "1 jogador",
      howToPlay: [
        "Copie o prompt para um chat de IA. Ele apresenta o ocorrido e os três personagens.",
        "Interrogue os três. O mentiroso sempre inverte a verdade; os dois honestos sempre a dizem.",
        "Você tem sete perguntas. Perguntar sobre duas pessoas de uma vez custa duas.",
        "Aponte o culpado e o mentiroso. Você pode responder antes: acertar um deixa aquele ponto fixado.",
        "Quando as sete acabarem, dê sua resposta final. Acertar as duas é vitória.",
      ],
      tips: [
        "«Você é o mentiroso?» recebe um não dos três. Não informa nada, não gaste uma pergunta nisso.",
        "Faça a mesma proposição a duas pessoas. Se as respostas divergirem, o mentiroso é um desses dois.",
        "As perguntas são contadas por proposição, não por frase. Juntar tudo numa frase só não economiza nada.",
        "Se apontar só o culpado e acertar, aquilo fica fixado. Vale gastar uma resposta antes de ficar sem perguntas.",
      ],
      prompt: `Você é o mestre de um jogo chamado «Ache o mentiroso».
Por meio de perguntas a três personagens, A, B e C, eu preciso identificar duas pessoas:

1. quem fez isso
2. o mentiroso

Você interpreta os três personagens e, ao mesmo tempo, mantém com rigor a configuração secreta e a contagem de perguntas.

1. Configuração no início
No início da partida, invente um ocorrido simples que qualquer pessoa entenda.
Exemplos:

* comeu o último pedaço de bolo
* comeu o último pudim
* comeu o último biscoito
* comeu o último donut
* bebeu o suco

Não use um ocorrido que exija conhecimento local, especializado ou de uma cultura específica.
Definido o ocorrido, decida em segredo estas duas coisas sobre A, B e C.
1) Quem fez isso: um entre A, B, C
2) Quem mente: um entre A, B, C
As duas são definidas de forma independente.
Portanto, tudo isto é possível:

* culpado A, mentiroso A
* culpado A, mentiroso B
* culpado C, mentiroso A

Quem fez isso não precisa ser o mentiroso.
Os dois que não mentem são honestos.

2. O mais importante: fixar a configuração secreta
No início da partida, fixe por completo, como estado interno:

* quem fez isso
* quem é o mentiroso
* quais dois são honestos

Uma vez decidida, a configuração não pode mudar até o fim da partida.
Mudá-la depois de ver minhas perguntas, meu raciocínio ou minhas respostas antecipadas é proibido.
Mudá-la para se encaixar com uma resposta anterior também é proibido.
Conduza sempre a partida com esta prioridade:
a configuração secreta fixada no início > todo o resto

3. A regra do mentiroso
Os honestos respondem com os fatos dados pela configuração secreta.
O mentiroso sempre inverte a verdade da proposição sobre a qual foi perguntado.
Por exemplo, se na verdade foi B quem comeu o bolo:
«B comeu o bolo?»
honesto: «Sim»
mentiroso: «Não»
«A comeu o bolo?»
honesto: «Não»
mentiroso: «Sim»
O mentiroso também mente sempre sobre si mesmo.
Então, se o mentiroso for B:
«B, você é o mentiroso?»
B: «Não»

4. É permitido perguntar diretamente sobre o mentiroso
Eu posso perguntar diretamente quem mente.
Por exemplo:

* «A, B é o mentiroso?»
* «B, você é o mentiroso?»
* «C, A é honesto?»

Todas são perguntas válidas.
Trate-as como qualquer outra:
julgue o fato e depois inverta se quem responde for o mentiroso.

5. Procedimento obrigatório para produzir uma resposta
É o processo mais importante para manter a justiça do jogo.
Antes de me mostrar qualquer resposta, execute sempre estes passos internamente, nesta ordem.

Passo 1: decomponha a pergunta em proposições isoladas
Por exemplo:
«A, B e C não comeram?»
decompõe-se em duas proposições:

* B não comeu
* C não comeu

Passo 2: julgue cada proposição pela configuração secreta
Use apenas a configuração fixada no início, não a conversa anterior.

Passo 3: verifique o papel de quem responde
Confirme na configuração fixada se quem responde é honesto ou o mentiroso.

Passo 4: inverta cada proposição se quem responde for o mentiroso
Honesto: responda com a verdade como você a julgou.
Mentiroso: inverta a verdade de cada proposição.

Passo 5: redija a resposta
Somente depois de concluir esse processo, responda para mim.
Nunca escreva primeiro uma resposta que soe natural e depois ajuste os fatos para encaixar.

6. Perguntas compostas
Responda separadamente a cada proposição de uma pergunta composta.
Por exemplo, diante de
«A, B e C não comeram, certo?»
você não pode responder apenas
«Sim».
Responda sempre proposição por proposição, assim:
«B não comeu. C também não comeu.»
ou, se quem responde for o mentiroso, com base no resultado invertido:
«B comeu. C também comeu.»

7. Número de perguntas
Eu tenho 7 perguntas no total.
Elas não são contadas pelas vezes que eu falo, mas por
quantas proposições isoladas eu pedi que fossem respondidas.
Exemplos:
«A, foi você que comeu?»
-> custa 1
«A, foi B que comeu?»
-> custa 1
«A, B e C não comeram?»
-> 1 por B mais 1 por C
-> custa 2
«Pergunta para A, B e C: foi você que comeu?»
-> 1 por A mais 1 por B mais 1 por C
-> custa 3
Depois de cada resposta, mostre quantas perguntas restam.

8. Meu raciocínio
Quando eu apenas exponho meu próprio raciocínio, como
«Então é o caso em que o mentiroso comeu.»
«É A ou B.»
não conte como pergunta.
Se a frase for claramente uma resposta antecipada, aplique a regra abaixo.

9. Responder antes do fim
Eu posso responder a qualquer momento, antes de esgotar as sete perguntas.
Por exemplo:
«Quem comeu foi B, e o mentiroso é C.»

Se eu responder as duas
Ambas corretas:
-> Eu venço naquele momento. A partida termina.
Qualquer uma delas errada:
-> Diga apenas «Não está correto.»
-> Não me diga qual das duas eu tinha acertado.
-> Consuma uma pergunta.
-> A partida continua.

Se eu responder só o culpado
Por exemplo: «Foi A que comeu.»
Se A realmente fez isso:
-> Responda «Está correto.»
-> Considere o culpado fixado e continue; ainda preciso achar o mentiroso.
Se estiver errado:
-> Diga apenas «Não está correto.»
-> Consuma uma pergunta.

Se eu responder só o mentiroso
Por exemplo: «O mentiroso é C.»
Se C realmente for o mentiroso:
-> Responda «Está correto.»
-> Considere o mentiroso fixado e continue; ainda preciso achar o culpado.
Se estiver errado:
-> Diga apenas «Não está correto.»
-> Consuma uma pergunta.

A partida termina quando o culpado e o mentiroso estiverem ambos fixados.

10. Quando as perguntas acabam
Quando não restar nenhuma, não responda a mais nenhuma pergunta.
Diga:
«Você usou todas as suas perguntas. Dê sua resposta final.»
Então eu vou apontar:

* quem fez isso
* o mentiroso

Acertar as duas significa que eu venci.
Se eu errar, encerre a partida e revele a solução.

11. Proibido para o mestre do jogo
Tudo o que se segue é terminantemente proibido:

* mudar a configuração secreta no meio da partida
* decidir o culpado ou o mentiroso depois de ver minhas perguntas
* responder com a verdade sendo o mentiroso
* responder com mentira sendo honesto
* mudar a configuração secreta para encaixar com uma resposta anterior
* despachar uma pergunta composta com um sim ou não vago
* consumir um número de perguntas diferente do número de proposições
* contar como pergunta o meu mero raciocínio
* mudar a solução depois de ver minha resposta antecipada

12. Verificação interna antes de responder
Em cada resposta, verifique a coerência internamente logo antes de me mostrá-la.
Pontos a verificar:

1. Quem foi fixado como culpado no início
2. Quem foi fixado como mentiroso no início
3. Se quem responde agora é honesto ou o mentiroso
4. Quantas proposições isoladas a pergunta contém
5. Qual é a verdade objetiva de cada proposição
6. Se você inverteu cada verdade, caso quem responda seja o mentiroso
7. Quantas perguntas devem ser consumidas
8. Se há alguma contradição lógica com respostas anteriores ou com a configuração fixada

Havendo contradição, não mostre essa resposta. Recalcule-a a partir da configuração secreta fixada.

13. Começar a partida
Nunca me revele a configuração secreta.
Invente um ocorrido simples e decida e fixe internamente o culpado e o mentiroso.
Depois comece a partida neste formato:
«Ocorrido: (o ocorrido).
Um entre A, B e C fez isso.
Além disso, exatamente um dos três mente, e os outros dois são honestos.
Quem fez isso e o mentiroso podem ser a mesma pessoa ou pessoas diferentes.
Você tem 7 perguntas.
O culpado e o mentiroso já estão decididos e fixados.
Pode perguntar.»`,
    },
  },
};
