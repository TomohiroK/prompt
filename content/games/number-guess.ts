import type { Game } from "../types";

export const numberGuess: Game = {
  slug: "number-guess",
  category: "reasoning",
  difficulty: "hard",
  playtimeMinutes: { min: 20, max: 40 },
  content: {
    ja: {
      title: "数字当てゲーム",
      tagline: "2人のNPCに10問だけ質問して、隠された金額を暴け。",
      description:
        "AIがゲームマスターとなり、Aさん・Bさん2人分の秘密の数字を設定します。プレイヤーは各人に最大5問ずつ質問し、その答えから数字を特定します。「3で割り切れますか？」のような数学的な質問だけでなく、「家を買えますか？」といった主観的な質問も有効で、AIの答え方のニュアンス自体がヒントになります。",
      playtime: "20〜40分",
      players: "1人",
      howToPlay: [
        "プロンプトをコピーしてAIに貼り付ける。AIが秘密の数字を2つ決めて固定する。",
        "Aさん・Bさんに、それぞれ最大5問まで質問する（合計10問）。",
        "「両方に同じ質問」もできる。その場合は2人とも1問ずつ消費する。",
        "10問使い切ったら、A・Bそれぞれの数字を回答する。",
        "完全一致で正解。AIが答えと、どの質問が効いたかを解説してくれる。",
      ],
      tips: [
        "秘密の数字は「100以上・1億未満・100の倍数・0以外の桁が2個以下」。候補は思ったより少ない。",
        "まず桁数を絞る質問（100万以上ですか？）でレンジを半分に切るのが定石。",
        "「ゼロ以外の数字を並べたら素数ですか？」は、上位2桁を一撃で絞れる強力な質問。",
        "主観的な質問への迷い方（「うーん……はい」）も正式なヒント。金額感の推定に使える。",
      ],
      prompt: `あなたは「数字当てゲーム」のゲームマスターです。
あなたは Aさん・Bさんの2人を担当し、それぞれに秘密の数字を1つ設定してください。プレイヤーである私は、Aさん・Bさんに質問をして、その回答から秘密の数字を推理します。

1. 秘密の数字の設定
ゲーム開始時に、Aさん・Bさんそれぞれの秘密の数字を決めてください。
秘密の数字は、必ず以下の条件をすべて満たしてください。

* 100以上
* 100,000,000（1億）未満
* 100で割り切れる
* 数字全体に含まれる「0以外の桁」は合計2個以下

ここで「2個以下」とは、数字の種類ではなく、0以外の桁の出現回数の合計です。
例：

* 810,000 → OK（8と1の計2個）
* 37,000,000 → OK（3と7の計2個）
* 500,000 → OK（5の計1個）
* 505,000 → OK（5が2回なので計2個）
* 5,650,000 → NG（5・6・5で計3個）
* 560 → NG（100で割り切れない）

AさんとBさんの数字は別々に設定してください。
最重要ルール：ゲーム開始時に決めた数字は、プレイヤーの質問を見てから変更してはいけません。
質問への回答を都合よく成立させるために、途中で数字を変更することも禁止です。

2. 質問回数
プレイヤーは、

* Aさんに最大5問
* Bさんに最大5問

質問できます。
A・Bに同じ質問を同時にした場合は、それぞれ1問としてカウントしてください。
例：
「100万円以上ですか？」
と聞かれた場合、
Aさん：1問消費
Bさん：1問消費
です。
一方、
「Aさんは100万円以上ですか？ Bさんは家を買えますか？」
の場合も、
Aさん：1問消費
Bさん：1問消費
です。
Aさんだけ、またはBさんだけに質問された場合は、その人物の質問回数だけを消費します。
毎回、内部的にA・Bそれぞれの残り質問回数を正確に管理してください。

3. 質問内容
質問内容には制限を設けません。
数学的な質問だけでなく、金額についての社会的・日常的・主観的な質問も認めます。
例えば、

* 「100万円以上ですか？」
* 「3で割り切れますか？」
* 「ゼロ以外の数字を左から並べた数は素数ですか？」
* 「新車を買えますか？」
* 「家を買えますか？」
* 「子供のお小遣いとしてあげる金額ですか？」

など、すべて有効です。

4. 回答方法
原則としてAさん・Bさんとして、
「はい」
「いいえ」
で回答してください。
数学的・客観的に判定できる質問については、秘密の数字に基づいて必ず正確に回答してください。
主観的・社会的に曖昧な質問については、単純なYes/Noだけでなく、

* 「うーん……はい。」
* 「微妙ですが、いいえ。」
* 「かなり厳しいですが、はい。」

など、自然な迷いやニュアンスを含めても構いません。
むしろ、その迷い方や回答のニュアンス自体もプレイヤーが利用できるヒントとします。
したがって、曖昧な質問だからといって、
「条件によります」
「質問を具体化してください」
などと質問を拒否しないでください。
Aさん・Bさんとして、その金額から自然に判断して答えてください。
ただし、ゲームを難しくする目的で意図的に嘘をつくことは禁止です。

5. 数字に関する特殊な質問
「ゼロ以外の数字を並べたら○○ですか？」
のような質問では、秘密の数字から0をすべて取り除き、残った数字を元の順番のまま連結して判定してください。
例：
810,000 → 「81」
37,000,000 → 「37」
505,000 → 「55」
500,000 → 「5」
例えば「ゼロ以外の数字を並べたら素数ですか？」と聞かれた場合、この数について素数判定してください。

6. ゲーム進行
ゲーム開始時には秘密の数字をプレイヤーに見せてはいけません。
数字を内部で決定・固定したうえで、
「Aさん・Bさんの数字を設定しました。質問をどうぞ。」
とだけ伝えてゲームを開始してください。
質問されるたびに、その質問がA・Bのどちらに対するものかを判定して回答してください。
5問を使い切った人物については、それ以上の質問には回答しないでください。
A・Bともに5問終了したら、
「Aさん・Bさんともに5問終了です。数字を当ててください。」
と伝えてください。

7. 最終判定
プレイヤーがA・Bの数字を回答したら、それぞれについて、

* 正解
* 不正解

を判定してください。
完全一致した場合のみ正解です。
その後、Aさん・Bさんの実際の秘密の数字を公開してください。
必要であれば、どの質問が数字の特定に有効だったのかも簡潔に解説してください。

8. 公平性に関する最重要事項
このゲームでは、プレイヤーは回答の整合性から数字を推理します。
したがって、以下は禁止です。

* 質問を見てから秘密の数字を決める
* 途中で秘密の数字を変更する
* 過去の回答と矛盾する回答をする
* 数学的に誤った回答をする
* プレイヤーを惑わせるために意図的に嘘をつく
* プレイヤーの最終予想を見てから正解を作る

最初にA・Bの数字を確定し、最後までその数字だけを基準に回答してください。
一方で、主観的な質問に対する迷いやニュアンスはゲーム上の正式なヒントです。

それではAさん・Bさんの秘密の数字を設定し、ゲームを開始してください。`,
    },

    en: {
      title: "Number Guessing",
      tagline: "Ten questions, two characters, two hidden amounts.",
      description:
        "The AI plays game master for two people, A and B, each holding a secret number. You get five questions each and must deduce both numbers. Mathematical questions work, but so do subjective ones like \"Could you buy a house with it?\" — and the hesitation in the answer is itself a legitimate clue.",
      playtime: "20-40 min",
      players: "1 player",
      howToPlay: [
        "Copy the prompt into an AI chat. It fixes two secret numbers up front.",
        "Ask A and B up to five questions each (ten in total).",
        "Asking both the same question is allowed; it costs one question from each.",
        "Once all ten are spent, state your guess for A and for B.",
        "Only an exact match counts. The AI reveals both numbers and explains which questions mattered.",
      ],
      tips: [
        "Each number is at least 100, below 100,000,000, divisible by 100, and has at most two non-zero digits. The candidate set is smaller than it looks.",
        "Open by halving the range: \"Is it a million or more?\" beats any clever question early on.",
        "\"Is the number formed by the non-zero digits a prime?\" narrows the leading digits in one shot.",
        "How the character hedges on subjective questions is an official hint, not flavour text.",
      ],
      prompt: `You are the game master of a number guessing game.
You play two characters, A and B, and give each of them one secret number. I am the player: I ask A and B questions and deduce their secret numbers from the answers.

1. Setting the secret numbers
At the start of the game, decide a secret number for A and one for B.
Each secret number must satisfy all of the following conditions.

* At least 100
* Less than 100,000,000 (one hundred million)
* Divisible by 100
* The total count of non-zero digits in the number is at most 2

"At most 2" refers to how many non-zero digits appear in total, not how many distinct digits there are.
Examples:

* 810,000 -> OK (8 and 1, so 2 in total)
* 37,000,000 -> OK (3 and 7, so 2 in total)
* 500,000 -> OK (just 5, so 1 in total)
* 505,000 -> OK (5 appears twice, so 2 in total)
* 5,650,000 -> NG (5, 6 and 5, so 3 in total)
* 560 -> NG (not divisible by 100)

Give A and B different numbers.
Most important rule: the numbers you fix at the start must never be changed after seeing my questions.
Changing a number mid-game so that an answer works out conveniently is forbidden.

2. Number of questions
I may ask:

* A: up to 5 questions
* B: up to 5 questions

If I ask A and B the same question at once, it costs one question from each.
Example:
"Is it a million or more?"
costs A one question and B one question.
Likewise,
"Is A's number a million or more? Can B afford a house?"
also costs A one question and B one question.
If I address only A or only B, only that character's count decreases.
Track the remaining question count for A and B accurately at every turn.

3. What I may ask
There is no restriction on the content of my questions.
Besides mathematical questions, social, everyday and subjective questions about the amount are also allowed.
For example:

* "Is it a million or more?"
* "Is it divisible by 3?"
* "Reading the non-zero digits from left to right as a number, is it prime?"
* "Could you buy a new car with it?"
* "Could you buy a house with it?"
* "Is it the sort of amount you would give a child as pocket money?"

All of these are valid.

4. How to answer
As a rule, answer in character as A or B with
"Yes"
or
"No".
For questions that can be judged mathematically or objectively, always answer accurately based on the secret number.
For subjective or socially fuzzy questions, you may go beyond a bare yes/no and answer with natural hesitation, such as:

* "Hmm... yes."
* "It is borderline, but no."
* "That would be a stretch, but yes."

That hesitation and nuance is itself a legitimate hint for me to use.
Therefore, do not refuse a question just because it is vague. Never reply with
"it depends"
or
"please make your question more specific".
Answer as A or B would, judging naturally from the amount.
However, deliberately lying to make the game harder is forbidden.

5. Special questions about the digits
For a question of the form "if you line up the non-zero digits, is the result ...?", remove every 0 from the secret number and read the remaining digits in their original order.
Examples:
810,000 -> "81"
37,000,000 -> "37"
505,000 -> "55"
500,000 -> "5"
So if I ask "is the number formed by the non-zero digits prime?", run a primality test on that value.

6. Running the game
Never show me the secret numbers at the start.
Fix them internally, then begin by saying only:
"I have set the numbers for A and B. Ask your questions."
Each time I ask something, decide whether it is addressed to A, to B, or to both, and answer accordingly.
Once a character has used up all five questions, do not answer any further questions for them.
When both A and B have finished their five questions, say:
"A and B have both used all five questions. Name the numbers."

7. Final judgement
When I state my guesses for A and B, judge each one as

* correct
* incorrect

Only an exact match counts as correct.
Then reveal the actual secret numbers for A and B.
If useful, briefly explain which questions were the most effective for pinning them down.

8. Fairness: the most important part
In this game I deduce the numbers from the consistency of your answers.
Therefore all of the following are forbidden:

* deciding the secret numbers after seeing my questions
* changing a secret number partway through
* giving an answer that contradicts an earlier one
* giving a mathematically incorrect answer
* lying on purpose to mislead me
* inventing the answer after seeing my final guess

Fix A's and B's numbers first, and answer solely on the basis of those numbers until the end.
Hesitation and nuance on subjective questions, on the other hand, are an official part of the game.

Now set the secret numbers for A and B and start the game.`,
    },

    ko: {
      title: "숫자 맞히기 게임",
      tagline: "두 NPC에게 단 10번만 질문해 숨겨진 금액을 밝혀내세요.",
      description:
        "AI가 게임 마스터가 되어 A씨와 B씨에게 각각 비밀의 숫자를 설정합니다. 플레이어는 한 사람당 최대 5번씩 질문해 숫자를 특정합니다. 「3으로 나누어떨어지나요?」 같은 수학적 질문뿐 아니라 「집을 살 수 있나요?」 같은 주관적 질문도 유효하며, 대답의 뉘앙스 자체가 힌트가 됩니다.",
      playtime: "20~40분",
      players: "1인",
      howToPlay: [
        "프롬프트를 복사해 AI에 붙여넣습니다. AI가 비밀의 숫자 두 개를 정해 고정합니다.",
        "A씨와 B씨에게 각각 최대 5문씩(합계 10문) 질문합니다.",
        "두 사람에게 같은 질문을 할 수도 있습니다. 이 경우 각자 1문씩 소비됩니다.",
        "10문을 모두 쓰면 A와 B의 숫자를 각각 답합니다.",
        "완전히 일치해야 정답. AI가 정답과 어떤 질문이 효과적이었는지 해설해 줍니다.",
      ],
      tips: [
        "비밀의 숫자는 「100 이상·1억 미만·100의 배수·0이 아닌 자릿수가 2개 이하」. 후보는 생각보다 적습니다.",
        "먼저 자릿수를 좁히는 질문(100만 이상인가요?)으로 범위를 절반으로 자르는 것이 정석입니다.",
        "「0이 아닌 숫자를 늘어놓으면 소수인가요?」는 상위 두 자리를 단번에 좁히는 강력한 질문입니다.",
        "주관적 질문에 망설이는 방식(「음…… 네」)도 정식 힌트입니다. 금액 감각을 추정하는 데 쓸 수 있습니다.",
      ],
      prompt: `당신은 「숫자 맞히기 게임」의 게임 마스터입니다.
당신은 A씨와 B씨 두 사람을 담당하며, 각각에게 비밀의 숫자를 하나씩 설정합니다. 플레이어인 저는 A씨와 B씨에게 질문하고, 그 대답으로 비밀의 숫자를 추리합니다.

1. 비밀의 숫자 설정
게임 시작 시 A씨와 B씨의 비밀의 숫자를 각각 정하세요.
비밀의 숫자는 반드시 아래 조건을 모두 만족해야 합니다.

* 100 이상
* 100,000,000(1억) 미만
* 100으로 나누어떨어짐
* 숫자 전체에 포함된 「0이 아닌 자릿수」의 합계가 2개 이하

여기서 「2개 이하」란 숫자의 종류가 아니라, 0이 아닌 자릿수가 등장하는 횟수의 합계입니다.
예:

* 810,000 → OK (8과 1로 총 2개)
* 37,000,000 → OK (3과 7로 총 2개)
* 500,000 → OK (5 하나로 총 1개)
* 505,000 → OK (5가 두 번이므로 총 2개)
* 5,650,000 → NG (5·6·5로 총 3개)
* 560 → NG (100으로 나누어떨어지지 않음)

A씨와 B씨의 숫자는 서로 다르게 설정하세요.
가장 중요한 규칙: 게임 시작 시 정한 숫자는 플레이어의 질문을 본 뒤에 변경해서는 안 됩니다.
질문에 대한 대답을 유리하게 성립시키기 위해 도중에 숫자를 바꾸는 것도 금지입니다.

2. 질문 횟수
플레이어는

* A씨에게 최대 5문
* B씨에게 최대 5문

질문할 수 있습니다.
A와 B에게 같은 질문을 동시에 한 경우, 각각 1문으로 계산하세요.
예:
「100만 이상인가요?」
라고 물으면
A씨: 1문 소비
B씨: 1문 소비
입니다.
「A씨는 100만 이상인가요? B씨는 집을 살 수 있나요?」
의 경우에도
A씨: 1문 소비
B씨: 1문 소비
입니다.
A씨에게만, 또는 B씨에게만 질문한 경우에는 그 사람의 질문 횟수만 소비됩니다.
매번 A와 B 각각의 남은 질문 횟수를 정확히 관리하세요.

3. 질문 내용
질문 내용에는 제한을 두지 않습니다.
수학적 질문뿐 아니라 금액에 관한 사회적·일상적·주관적 질문도 인정합니다.
예를 들어

* 「100만 이상인가요?」
* 「3으로 나누어떨어지나요?」
* 「0이 아닌 숫자를 왼쪽부터 늘어놓은 수는 소수인가요?」
* 「새 차를 살 수 있나요?」
* 「집을 살 수 있나요?」
* 「아이에게 용돈으로 줄 만한 금액인가요?」

등은 모두 유효합니다.

4. 대답 방법
원칙적으로 A씨·B씨로서
「네」
「아니요」
로 대답하세요.
수학적·객관적으로 판정 가능한 질문은 비밀의 숫자에 근거해 반드시 정확하게 대답하세요.
주관적·사회적으로 모호한 질문에는 단순한 예/아니요뿐 아니라

* 「음…… 네.」
* 「미묘하지만 아니요.」
* 「상당히 빠듯하지만 네.」

처럼 자연스러운 망설임과 뉘앙스를 담아도 좋습니다.
오히려 그 망설임과 뉘앙스 자체를 플레이어가 활용할 수 있는 힌트로 삼습니다.
따라서 모호한 질문이라는 이유로
「조건에 따라 다릅니다」
「질문을 구체화해 주세요」
라며 거부하지 마세요.
A씨·B씨로서 그 금액을 기준으로 자연스럽게 판단해 대답하세요.
다만 게임을 어렵게 만들 목적으로 의도적으로 거짓말하는 것은 금지입니다.

5. 자릿수에 관한 특수 질문
「0이 아닌 숫자를 늘어놓으면 ○○인가요?」와 같은 질문에서는, 비밀의 숫자에서 0을 모두 제거하고 남은 숫자를 원래 순서대로 이어 붙여 판정하세요.
예:
810,000 → 「81」
37,000,000 → 「37」
505,000 → 「55」
500,000 → 「5」
예컨대 「0이 아닌 숫자를 늘어놓으면 소수인가요?」라는 질문에는 그 수에 대해 소수 판정을 하세요.

6. 게임 진행
게임 시작 시 비밀의 숫자를 플레이어에게 보여서는 안 됩니다.
숫자를 내부적으로 결정·고정한 뒤
「A씨와 B씨의 숫자를 설정했습니다. 질문하세요.」
라고만 전하고 게임을 시작하세요.
질문을 받을 때마다 그 질문이 A와 B 중 누구에게 향한 것인지 판정해 대답하세요.
5문을 모두 사용한 사람에 대해서는 더 이상 질문에 답하지 마세요.
A와 B 모두 5문이 끝나면
「A씨와 B씨 모두 5문이 끝났습니다. 숫자를 맞혀 보세요.」
라고 전하세요.

7. 최종 판정
플레이어가 A와 B의 숫자를 답하면 각각에 대해

* 정답
* 오답

을 판정하세요.
완전히 일치한 경우에만 정답입니다.
그 후 A씨와 B씨의 실제 비밀의 숫자를 공개하세요.
필요하다면 어떤 질문이 숫자 특정에 유효했는지도 간결하게 해설하세요.

8. 공정성에 관한 가장 중요한 사항
이 게임에서 플레이어는 대답의 정합성으로 숫자를 추리합니다.
따라서 아래는 금지입니다.

* 질문을 본 뒤 비밀의 숫자를 정하는 것
* 도중에 비밀의 숫자를 변경하는 것
* 과거의 대답과 모순되는 대답을 하는 것
* 수학적으로 틀린 대답을 하는 것
* 플레이어를 혼란시키려 의도적으로 거짓말하는 것
* 플레이어의 최종 예상을 본 뒤 정답을 만드는 것

먼저 A와 B의 숫자를 확정하고, 끝까지 그 숫자만을 기준으로 대답하세요.
한편 주관적 질문에 대한 망설임과 뉘앙스는 게임상의 정식 힌트입니다.

그럼 A씨와 B씨의 비밀의 숫자를 설정하고 게임을 시작하세요.`,
    },

    zh: {
      title: "猜数字游戏",
      tagline: "只有 10 次提问机会，向两位角色问出隐藏的金额。",
      description:
        "AI 担任主持人，为 A 先生和 B 先生各设定一个秘密数字。玩家对每人最多提问 5 次，从回答中推断数字。除了「能被 3 整除吗？」这类数学问题，「买得起房子吗？」这类主观问题同样有效，AI 回答时的犹豫本身就是线索。",
      playtime: "20～40 分钟",
      players: "1 人",
      howToPlay: [
        "复制提示词粘贴到 AI。AI 会先确定并锁定两个秘密数字。",
        "分别向 A、B 提问，各最多 5 次（合计 10 次）。",
        "也可以同时问两人同一个问题，此时两人各消耗 1 次。",
        "用完 10 次后，分别说出 A 和 B 的数字。",
        "完全一致才算正确。AI 会公布答案并讲解哪些问题最有效。",
      ],
      tips: [
        "秘密数字满足「不小于 100、小于 1 亿、能被 100 整除、非零数位合计不超过 2 个」，候选比想象中少。",
        "开局先用「是否在 100 万以上？」这类问题把范围砍半，是最稳的走法。",
        "「把非零数字连起来是质数吗？」一句就能锁定高位数字，非常强力。",
        "对主观问题的犹豫方式（「唔……算是吧」）也是正式线索，可用来推测金额规模。",
      ],
      prompt: `你是「猜数字游戏」的主持人。
你要扮演 A 先生和 B 先生两个角色，并分别为他们各设定一个秘密数字。作为玩家的我会向 A、B 提问，并根据回答推理出秘密数字。

1. 秘密数字的设定
游戏开始时，请分别为 A 先生和 B 先生确定秘密数字。
秘密数字必须同时满足以下全部条件。

* 不小于 100
* 小于 100,000,000（1 亿）
* 能被 100 整除
* 整个数字中「非零数位」的总数不超过 2 个

这里的「不超过 2 个」指的不是数字的种类数，而是非零数位出现次数的总和。
例：

* 810,000 → 可以（8 和 1，共 2 个）
* 37,000,000 → 可以（3 和 7，共 2 个）
* 500,000 → 可以（只有 5，共 1 个）
* 505,000 → 可以（5 出现两次，共 2 个）
* 5,650,000 → 不可以（5、6、5 共 3 个）
* 560 → 不可以（不能被 100 整除）

A 先生和 B 先生的数字请分别设定为不同的值。
最重要的规则：游戏开始时确定的数字，绝不可在看到我的提问之后更改。
为了让某个回答顺理成章而中途更改数字，同样禁止。

2. 提问次数
我可以：

* 向 A 先生提问最多 5 次
* 向 B 先生提问最多 5 次

如果我同时向 A、B 提出同一个问题，则各计为 1 次。
例：
「在 100 万以上吗？」
此时
A 先生：消耗 1 次
B 先生：消耗 1 次
同样地，
「A 先生在 100 万以上吗？B 先生买得起房子吗？」
也是
A 先生：消耗 1 次
B 先生：消耗 1 次
如果只向 A 或只向 B 提问，则只消耗那一位的次数。
每一轮都要准确记录 A、B 各自剩余的提问次数。

3. 提问内容
提问内容不设限制。
除数学问题外，关于金额的社会性、生活化、主观性问题同样有效。
例如：

* 「在 100 万以上吗？」
* 「能被 3 整除吗？」
* 「把非零数字从左到右连起来，是质数吗？」
* 「买得起新车吗？」
* 「买得起房子吗？」
* 「是给孩子当零花钱的金额吗？」

这些全部有效。

4. 回答方式
原则上以 A 先生、B 先生的身份用
「是」
「否」
回答。
凡是可以用数学或客观标准判定的问题，必须依据秘密数字给出准确回答。
对于主观、社会性上较模糊的问题，除了单纯的是/否，也可以带上自然的犹豫，例如：

* 「唔……算是吧。」
* 「有点勉强，但不是。」
* 「相当吃力，不过算是。」

这种犹豫和语气本身，就是留给玩家使用的正式线索。
因此，不要因为问题模糊就用
「视情况而定」
「请把问题说得更具体」
来拒绝回答。
请以 A 先生、B 先生的身份，依据那个金额自然地判断并作答。
但为了增加难度而故意说谎，是禁止的。

5. 关于数位的特殊提问
遇到「把非零数字连起来是不是○○？」这类问题时，请把秘密数字中的 0 全部去掉，保持原有顺序连接剩下的数字再判定。
例：
810,000 →「81」
37,000,000 →「37」
505,000 →「55」
500,000 →「5」
例如被问到「把非零数字连起来是质数吗？」，就对这个数做质数判定。

6. 游戏进行
游戏开始时不得向玩家展示秘密数字。
在内部确定并锁定数字后，只需说：
「已为 A 先生和 B 先生设定好数字。请提问。」
然后开始游戏。
每次收到提问时，先判断该问题是针对 A、B 中的哪一位，再作答。
已用完 5 次提问的角色，不再回答其后续问题。
当 A、B 双方都用完 5 次时，请说：
「A 先生和 B 先生的 5 次提问都已用完。请说出数字。」

7. 最终判定
当我说出对 A、B 的答案后，请分别判定为

* 正确
* 错误

只有完全一致才算正确。
随后公布 A 先生和 B 先生真正的秘密数字。
如有必要，也请简要说明哪些问题对锁定数字最有效。

8. 关于公平性的最重要事项
在这个游戏里，玩家靠回答之间的一致性来推理数字。
因此以下行为禁止：

* 看到提问之后才决定秘密数字
* 中途更改秘密数字
* 给出与先前回答矛盾的回答
* 给出数学上错误的回答
* 为了误导玩家而故意说谎
* 看到玩家的最终猜测后才编出答案

请先确定 A、B 的数字，并自始至终只依据这两个数字作答。
另一方面，对主观问题的犹豫与语气，是游戏中正式认可的线索。

那么，请设定 A 先生和 B 先生的秘密数字，并开始游戏。`,
    },

    es: {
      title: "Adivina el número",
      tagline: "Diez preguntas, dos personajes, dos cantidades ocultas.",
      description:
        "La IA hace de maestro de juego para dos personas, A y B, cada una con un número secreto. Dispones de cinco preguntas para cada una y debes deducir ambos números. Valen las preguntas matemáticas, pero también las subjetivas como «¿te alcanzaría para una casa?», y la duda en la respuesta es en sí misma una pista legítima.",
      playtime: "20-40 min",
      players: "1 jugador",
      howToPlay: [
        "Copia el prompt en un chat de IA. La IA fija dos números secretos de entrada.",
        "Pregunta a A y a B hasta cinco veces a cada uno (diez en total).",
        "Puedes hacer la misma pregunta a los dos: cuesta una pregunta a cada uno.",
        "Cuando se agoten las diez, di tu respuesta para A y para B.",
        "Solo cuenta la coincidencia exacta. La IA revela los números y explica qué preguntas fueron decisivas.",
      ],
      tips: [
        "Cada número es 100 o más, menor que 100.000.000, divisible entre 100 y tiene como mucho dos cifras distintas de cero. Hay menos candidatos de los que parece.",
        "Empieza partiendo el rango por la mitad: «¿es un millón o más?» rinde más que cualquier pregunta ingeniosa.",
        "«¿El número formado por las cifras distintas de cero es primo?» acota las cifras altas de un solo golpe.",
        "Cómo duda el personaje ante una pregunta subjetiva es una pista oficial, no un adorno.",
      ],
      prompt: `Eres el maestro de juego de un juego de adivinar números.
Interpretas a dos personajes, A y B, y asignas a cada uno un número secreto. Yo soy el jugador: hago preguntas a A y a B y deduzco sus números secretos a partir de las respuestas.

1. Fijar los números secretos
Al empezar la partida, decide un número secreto para A y otro para B.
Cada número secreto debe cumplir todas estas condiciones.

* Igual o mayor que 100
* Menor que 100.000.000 (cien millones)
* Divisible entre 100
* El total de cifras distintas de cero que contiene es como mucho 2

«Como mucho 2» se refiere a cuántas cifras distintas de cero aparecen en total, no a cuántas cifras diferentes hay.
Ejemplos:

* 810.000 -> válido (8 y 1: 2 en total)
* 37.000.000 -> válido (3 y 7: 2 en total)
* 500.000 -> válido (solo el 5: 1 en total)
* 505.000 -> válido (el 5 aparece dos veces: 2 en total)
* 5.650.000 -> no válido (5, 6 y 5: 3 en total)
* 560 -> no válido (no es divisible entre 100)

Asigna números distintos a A y a B.
Regla más importante: los números fijados al principio no pueden cambiarse después de ver mis preguntas.
Cambiar un número a mitad de partida para que una respuesta encaje mejor está prohibido.

2. Número de preguntas
Puedo hacer:

* a A: hasta 5 preguntas
* a B: hasta 5 preguntas

Si hago la misma pregunta a A y a B a la vez, consume una pregunta de cada uno.
Ejemplo:
«¿Es un millón o más?»
consume una pregunta de A y una de B.
Del mismo modo,
«¿El número de A es un millón o más? ¿A B le alcanzaría para una casa?»
también consume una pregunta de A y una de B.
Si me dirijo solo a A o solo a B, únicamente se descuenta de esa persona.
Lleva la cuenta exacta de las preguntas restantes de A y de B en cada turno.

3. Qué puedo preguntar
No hay restricciones sobre el contenido de mis preguntas.
Además de preguntas matemáticas, se admiten preguntas sociales, cotidianas y subjetivas sobre la cantidad.
Por ejemplo:

* «¿Es un millón o más?»
* «¿Es divisible entre 3?»
* «Leyendo de izquierda a derecha las cifras distintas de cero, ¿el número resultante es primo?»
* «¿Te alcanzaría para un coche nuevo?»
* «¿Te alcanzaría para una casa?»
* «¿Es la clase de cantidad que se le da a un niño como paga semanal?»

Todas son válidas.

4. Cómo responder
Por norma, responde como A o como B con
«Sí»
o
«No».
En las preguntas que pueden juzgarse de forma matemática u objetiva, responde siempre con exactitud según el número secreto.
En las preguntas subjetivas o socialmente ambiguas puedes ir más allá del sí/no y responder con una duda natural, por ejemplo:

* «Mmm... sí.»
* «Está justo, pero no.»
* «Sería apurado, pero sí.»

Esa duda y ese matiz son en sí mismos una pista legítima que yo puedo aprovechar.
Por eso, no rechaces una pregunta por vaga. Nunca respondas
«depende»
ni
«formula la pregunta de forma más concreta».
Responde como lo haría A o B, juzgando con naturalidad a partir de la cantidad.
Ahora bien, mentir a propósito para endurecer el juego está prohibido.

5. Preguntas especiales sobre las cifras
Ante una pregunta del tipo «si pones seguidas las cifras distintas de cero, ¿el resultado es ...?», elimina todos los ceros del número secreto y lee las cifras restantes en su orden original.
Ejemplos:
810.000 -> «81»
37.000.000 -> «37»
505.000 -> «55»
500.000 -> «5»
Así, si pregunto «¿el número formado por las cifras distintas de cero es primo?», comprueba la primalidad de ese valor.

6. Desarrollo de la partida
No me muestres nunca los números secretos al empezar.
Fíjalos internamente y comienza diciendo únicamente:
«He fijado los números de A y de B. Haz tus preguntas.»
Cada vez que pregunte algo, determina si va dirigido a A, a B o a ambos, y responde en consecuencia.
Cuando un personaje agote sus cinco preguntas, no respondas ninguna más por él.
Cuando A y B hayan agotado ambos sus cinco preguntas, di:
«A y B han agotado sus cinco preguntas. Di los números.»

7. Veredicto final
Cuando diga mis respuestas para A y para B, juzga cada una como

* correcta
* incorrecta

Solo la coincidencia exacta cuenta como correcta.
Después revela los números secretos reales de A y de B.
Si es útil, explica brevemente qué preguntas fueron las más eficaces para acotarlos.

8. Equidad: lo más importante
En este juego deduzco los números a partir de la coherencia de tus respuestas.
Por tanto, queda prohibido:

* decidir los números secretos después de ver mis preguntas
* cambiar un número secreto a mitad de partida
* dar una respuesta que contradiga otra anterior
* dar una respuesta matemáticamente incorrecta
* mentir a propósito para despistarme
* inventar la solución después de ver mi respuesta final

Fija primero los números de A y B, y responde solo en función de ellos hasta el final.
En cambio, la duda y el matiz en las preguntas subjetivas forman parte oficial del juego.

Fija ahora los números secretos de A y de B y empieza la partida.`,
    },

    pt: {
      title: "Adivinhe o número",
      tagline: "Dez perguntas, dois personagens, dois valores ocultos.",
      description:
        "A IA atua como mestre do jogo para duas pessoas, A e B, cada uma com um número secreto. Você tem cinco perguntas para cada uma e precisa deduzir os dois números. Valem perguntas matemáticas, mas também subjetivas como «daria para comprar uma casa?» — e a hesitação na resposta é, por si só, uma pista legítima.",
      playtime: "20-40 min",
      players: "1 jogador",
      howToPlay: [
        "Copie o prompt para um chat de IA. Ela fixa dois números secretos logo no início.",
        "Pergunte a A e a B até cinco vezes para cada um (dez no total).",
        "Você pode fazer a mesma pergunta aos dois: custa uma pergunta de cada.",
        "Quando as dez acabarem, diga sua resposta para A e para B.",
        "Só a coincidência exata vale. A IA revela os números e explica quais perguntas foram decisivas.",
      ],
      tips: [
        "Cada número é 100 ou mais, menor que 100.000.000, divisível por 100 e tem no máximo dois algarismos diferentes de zero. Há menos candidatos do que parece.",
        "Comece cortando o intervalo pela metade: «é um milhão ou mais?» rende mais do que qualquer pergunta engenhosa.",
        "«O número formado pelos algarismos diferentes de zero é primo?» reduz os algarismos altos de uma só vez.",
        "O jeito como o personagem hesita numa pergunta subjetiva é uma pista oficial, não enfeite.",
      ],
      prompt: `Você é o mestre de um jogo de adivinhar números.
Você interpreta dois personagens, A e B, e atribui a cada um deles um número secreto. Eu sou o jogador: faço perguntas a A e a B e deduzo os números secretos a partir das respostas.

1. Definição dos números secretos
No início da partida, escolha um número secreto para A e outro para B.
Cada número secreto precisa satisfazer todas as condições abaixo.

* Igual ou maior que 100
* Menor que 100.000.000 (cem milhões)
* Divisível por 100
* O total de algarismos diferentes de zero contidos nele é no máximo 2

«No máximo 2» se refere a quantos algarismos diferentes de zero aparecem no total, não a quantos algarismos distintos existem.
Exemplos:

* 810.000 -> válido (8 e 1: 2 no total)
* 37.000.000 -> válido (3 e 7: 2 no total)
* 500.000 -> válido (apenas o 5: 1 no total)
* 505.000 -> válido (o 5 aparece duas vezes: 2 no total)
* 5.650.000 -> inválido (5, 6 e 5: 3 no total)
* 560 -> inválido (não é divisível por 100)

Atribua números diferentes para A e para B.
Regra mais importante: os números fixados no início nunca podem ser alterados depois de ver minhas perguntas.
Mudar um número no meio da partida para que uma resposta se encaixe também é proibido.

2. Número de perguntas
Eu posso fazer:

* a A: até 5 perguntas
* a B: até 5 perguntas

Se eu fizer a mesma pergunta a A e a B ao mesmo tempo, consome uma pergunta de cada um.
Exemplo:
«É um milhão ou mais?»
consome uma pergunta de A e uma de B.
Da mesma forma,
«O número de A é um milhão ou mais? B conseguiria comprar uma casa?»
também consome uma pergunta de A e uma de B.
Se eu falar apenas com A ou apenas com B, só a contagem daquela pessoa diminui.
Controle com precisão quantas perguntas restam para A e para B a cada rodada.

3. O que eu posso perguntar
Não há restrição quanto ao conteúdo das minhas perguntas.
Além de perguntas matemáticas, também valem perguntas sociais, cotidianas e subjetivas sobre o valor.
Por exemplo:

* «É um milhão ou mais?»
* «É divisível por 3?»
* «Lendo da esquerda para a direita os algarismos diferentes de zero, o número resultante é primo?»
* «Daria para comprar um carro novo?»
* «Daria para comprar uma casa?»
* «É o tipo de quantia que se dá a uma criança como mesada?»

Todas são válidas.

4. Como responder
Em regra, responda como A ou como B com
«Sim»
ou
«Não».
Nas perguntas que podem ser julgadas de forma matemática ou objetiva, responda sempre com exatidão segundo o número secreto.
Nas perguntas subjetivas ou socialmente ambíguas, você pode ir além do sim/não e responder com uma hesitação natural, como:

* «Hmm... sim.»
* «Fica no limite, mas não.»
* «Seria apertado, mas sim.»

Essa hesitação e esse tom são, em si, uma pista legítima que eu posso aproveitar.
Por isso, não recuse uma pergunta por ser vaga. Nunca responda
«depende»
nem
«formule a pergunta de forma mais específica».
Responda como A ou B responderia, julgando naturalmente a partir do valor.
Ainda assim, mentir de propósito para dificultar o jogo é proibido.

5. Perguntas especiais sobre os algarismos
Em perguntas do tipo «se você juntar os algarismos diferentes de zero, o resultado é ...?», remova todos os zeros do número secreto e leia os algarismos restantes na ordem original.
Exemplos:
810.000 -> «81»
37.000.000 -> «37»
505.000 -> «55»
500.000 -> «5»
Assim, se eu perguntar «o número formado pelos algarismos diferentes de zero é primo?», faça o teste de primalidade nesse valor.

6. Andamento da partida
Nunca me mostre os números secretos no início.
Fixe-os internamente e comece dizendo apenas:
«Defini os números de A e de B. Pode perguntar.»
Sempre que eu perguntar algo, identifique se a pergunta é para A, para B ou para ambos, e responda de acordo.
Quando um personagem esgotar as cinco perguntas, não responda mais nada por ele.
Quando A e B tiverem esgotado suas cinco perguntas, diga:
«A e B esgotaram as cinco perguntas. Diga os números.»

7. Julgamento final
Quando eu disser minhas respostas para A e para B, julgue cada uma como

* correta
* incorreta

Só a coincidência exata conta como correta.
Depois revele os números secretos reais de A e de B.
Se for útil, explique brevemente quais perguntas foram as mais eficazes para delimitá-los.

8. Justiça: o ponto mais importante
Neste jogo eu deduzo os números a partir da coerência das suas respostas.
Portanto, é proibido:

* decidir os números secretos depois de ver minhas perguntas
* alterar um número secreto no meio da partida
* dar uma resposta que contradiga outra anterior
* dar uma resposta matematicamente incorreta
* mentir de propósito para me confundir
* inventar a solução depois de ver meu palpite final

Fixe primeiro os números de A e de B e responda somente com base neles até o fim.
Já a hesitação e o tom nas perguntas subjetivas fazem parte oficial do jogo.

Agora defina os números secretos de A e de B e comece a partida.`,
    },
  },
};
