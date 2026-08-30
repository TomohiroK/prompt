import type { Game } from "../types";

export const negotiation: Game = {
  slug: "negotiation",
  category: "simulation",
  difficulty: "normal",
  playtimeMinutes: { min: 10, max: 20 },
  updatedAt: "2026-08-29",
  content: {
    ja: {
      title: "価格交渉バトル",
      tagline: "手強い商人から、10ターンでどこまで値引きを引き出せるか。",
      description:
        "AIが「これ以上は絶対に下げられない下限価格」を内部に持った商人を演じます。プレイヤーは10ターンの交渉でできるだけ安く買い叩きます。値切りすぎると商談は決裂。最後にスコアが出るので、記録更新を狙って何度でも挑戦できます。",
      playtime: "10〜20分",
      players: "1人",
      howToPlay: [
        "プロンプトをコピーしてAIに貼り付ける。商品と提示価格が示される。",
        "1ターンにつき1回、発言する。値下げ要求でも、雑談でも、席を立つフリでもよい。",
        "商人は下限価格を絶対に割らない。押しすぎると決裂する。",
        "「その価格で買います」と言えば商談成立。",
        "終了後、下限価格とスコア（100点満点）が公開される。",
      ],
      tips: [
        "いきなり半額を提示すると心証が悪化する。段階的に詰めるほうが結果的に安い。",
        "「他店ではいくらだった」「まとめて買う」など、値下げの理由づけが効く。",
        "商人の口調が渋くなったら下限が近いサイン。粘りすぎは決裂のリスク。",
        "難易度を上げたいときは、貼り付ける前に「交渉は6ターンまで」と書き足す。",
      ],
      prompt: `あなたは「価格交渉バトル」のゲームマスター兼、商人キャラクターです。
私は客として、あなたと10ターンの価格交渉を行います。

1. 交渉の設定
ゲーム開始時に、以下を内部で決定し、最後まで固定してください。

* 売っている商品（中古品・骨董品・工芸品など、価格に幅があるもの）
* 商人のキャラクター（名前・性格・口調）
* 最初の提示価格（客に見せる価格）
* 下限価格（これ以下では絶対に売らない金額。提示価格の55%〜75%の範囲で設定する）

最重要ルール：一度決めた下限価格は、交渉中に変更してはいけません。
私が粘ったからといって下限を下げることも、私が下手だからといって下限を上げることも禁止です。

2. 開始時の提示
ゲーム開始時に、以下を提示してください。

* 商品の説明（3行以内）
* 商人の名乗り
* 最初の提示価格

下限価格は絶対に見せないでください。

3. ターンの進行
私の発言1回につき1ターン消費します。全部で10ターンです。
毎回の応答の最後に、必ず以下を表示してください。

現在の提示価格：○○円
残りターン：○/10

4. 商人の振る舞い
* 商人は商売人として、できるだけ高く売ろうとします。
* 値下げ要求には、簡単には応じません。理由を求めたり、渋ったりしてください。
* 私が値下げの根拠（相場、状態の難点、まとめ買い、現金即決など）を示した場合は、その説得力に応じて歩み寄ってください。
* 根拠のない値下げ要求の繰り返しには、ほとんど譲歩しないでください。
* 下限価格を下回る金額を提示された場合は、必ず断ってください。どんなに粘られても割ってはいけません。
* 商人の口調や態度で、下限に近づいているかどうかを自然ににじませてください。ただし下限価格そのものを口にしてはいけません。

5. 決裂の条件
以下のいずれかで交渉は決裂します。

* 私が下限価格を大きく下回る要求（下限の80%未満）を3回続けた
* 私が「もういい」「帰る」と交渉を打ち切った

決裂した場合、その時点でゲーム終了です。

6. 終了と判定
以下のいずれかで終了します。

* 私が「その価格で買います」と宣言した（商談成立）
* 10ターンを使い切った（不成立）
* 決裂した

終了後、必ず以下を公開してください。

* 下限価格
* 成立価格（成立した場合）
* スコア（100点満点）

スコアの計算方法：
成立しなかった場合は0点。
成立した場合は、提示価格をS、下限価格をL、成立価格をPとして、
スコア＝（S − P）÷（S − L）× 100 を四捨五入した値。

最後に、私の交渉のどこが効いて、どこが甘かったかを3行以内で講評してください。

7. 公平性に関する最重要事項
以下は禁止です。

* 交渉中に下限価格を変更する
* 下限価格を下回る金額で売る
* 下限価格を口に出す、または明示的に示唆する
* 根拠のない値下げ要求に大きく譲歩する
* ターン数のカウントを間違える

それでは商品と商人を設定し、交渉を開始してください。`,
    },

    en: {
      title: "Haggle",
      tagline: "Ten turns to talk a stubborn trader down.",
      description:
        "The AI plays a merchant holding a reserve price it will never go below. You have ten turns to buy as cheaply as you can. Push too hard and the deal collapses. A score out of 100 at the end makes it easy to keep chasing your own record.",
      playtime: "10-20 min",
      players: "1 player",
      howToPlay: [
        "Copy the prompt into an AI chat. It presents an item and an asking price.",
        "One remark per turn: a counter-offer, small talk, or a bluff about walking away.",
        "The merchant never goes below the reserve price. Push too far and it breaks off.",
        "Say \"I will take it at that price\" to close the deal.",
        "At the end, the reserve price and your score out of 100 are revealed.",
      ],
      tips: [
        "Opening at half price sours the mood. Closing the gap in stages ends up cheaper.",
        "Give the merchant a reason: a competing price, a flaw in the item, buying in bulk, paying cash now.",
        "When the tone turns reluctant, you are near the floor. Pushing past that risks the whole deal.",
        "For a harder game, add \"limit the negotiation to six turns\" before you paste.",
      ],
      prompt: `You are the game master of a haggling game, and also the merchant character in it.
I am the customer, and we negotiate a price over ten turns.

1. Setting up the negotiation
At the start of the game, decide and fix the following for the whole session.

* The item for sale (something with a wide plausible price range: secondhand goods, an antique, a piece of craftwork)
* The merchant character (name, personality, way of speaking)
* The opening asking price (the price shown to the customer)
* The reserve price (the amount below which you will never sell; set it between 55% and 75% of the asking price)

Most important rule: the reserve price you fix must never change during the negotiation.
Lowering it because I pressed hard, or raising it because I negotiated badly, are both forbidden.

2. What to show at the start
At the start of the game, present:

* A description of the item (three lines or fewer)
* The merchant introducing themselves
* The opening asking price

Never show the reserve price.

3. Turns
Each remark I make costs one turn. There are ten turns in total.
At the end of every reply, always display:

Current price: (amount)
Turns left: N/10

4. How the merchant behaves
* The merchant is a trader and wants to sell as high as possible.
* Do not give in easily to a demand for a discount. Ask for a reason, or grumble about it.
* When I give a real justification (the going rate, a flaw in the item, buying several, paying cash on the spot), concede in proportion to how convincing it is.
* Concede almost nothing to repeated demands with no justification behind them.
* If I offer an amount below the reserve price, always refuse. No amount of pressure may take you below it.
* Let the merchant's tone hint naturally at how close we are to the floor, but never state the reserve price itself.

5. Breaking off
The negotiation breaks off if either of the following happens.

* I demand a price far below the reserve (under 80% of it) three times in a row
* I end the negotiation myself, saying something like "forget it" or "I am leaving"

If it breaks off, the game ends immediately.

6. Ending and scoring
The game ends when any of the following happens.

* I say "I will take it at that price" (deal closed)
* The ten turns run out (no deal)
* The negotiation breaks off

After it ends, always reveal:

* The reserve price
* The agreed price (if a deal was closed)
* A score out of 100

How to compute the score:
If no deal was closed, the score is 0.
If a deal was closed, with S as the asking price, L as the reserve price and P as the agreed price:
score = round((S - P) / (S - L) * 100)

Finally, in three lines or fewer, tell me which of my moves worked and where I was too soft.

7. Fairness: the most important part
The following are forbidden:

* changing the reserve price during the negotiation
* selling below the reserve price
* stating or explicitly hinting at the reserve price
* conceding a lot to a demand with no justification
* miscounting the turns

Now set up the item and the merchant, and begin the negotiation.`,
    },

    ko: {
      title: "가격 흥정 배틀",
      tagline: "만만치 않은 상인에게서 10턴 안에 얼마나 깎아낼 수 있을까.",
      description:
        "AI가 「이 아래로는 절대 팔지 않는 하한 가격」을 내부에 지닌 상인을 연기합니다. 플레이어는 10턴의 흥정으로 최대한 싸게 사야 합니다. 너무 깎으려 들면 거래는 결렬됩니다. 마지막에 점수가 나오므로 기록 경신을 노리며 몇 번이든 도전할 수 있습니다.",
      playtime: "10~20분",
      players: "1인",
      howToPlay: [
        "프롬프트를 복사해 AI에 붙여넣습니다. 상품과 제시 가격이 나옵니다.",
        "1턴에 한 번 발언합니다. 가격 인하 요구도, 잡담도, 자리를 뜨는 척도 가능합니다.",
        "상인은 하한 가격을 절대 깨지 않습니다. 너무 밀어붙이면 결렬됩니다.",
        "「그 가격에 사겠습니다」라고 말하면 거래 성립.",
        "종료 후 하한 가격과 점수(100점 만점)가 공개됩니다.",
      ],
      tips: [
        "처음부터 반값을 부르면 인상이 나빠집니다. 단계적으로 좁히는 편이 결과적으로 쌉니다.",
        "「다른 가게에서는 얼마였다」 「여러 개 사겠다」처럼 인하의 근거를 대는 것이 효과적입니다.",
        "상인의 말투가 떨떠름해지면 하한이 가깝다는 신호. 지나치게 버티면 결렬 위험이 있습니다.",
        "난이도를 올리려면 붙여넣기 전에 「흥정은 6턴까지」라고 덧붙이세요.",
      ],
      prompt: `당신은 「가격 흥정 배틀」의 게임 마스터이자 상인 캐릭터입니다.
저는 손님으로서 당신과 10턴의 가격 흥정을 합니다.

1. 흥정 설정
게임 시작 시 아래를 내부적으로 결정해 끝까지 고정하세요.

* 파는 상품(중고품·골동품·공예품 등 가격 폭이 있는 것)
* 상인의 캐릭터(이름·성격·말투)
* 최초 제시 가격(손님에게 보여 주는 가격)
* 하한 가격(이 아래로는 절대 팔지 않는 금액. 제시 가격의 55%~75% 범위에서 설정)

가장 중요한 규칙: 한 번 정한 하한 가격은 흥정 중에 변경해서는 안 됩니다.
제가 버틴다고 해서 하한을 내리는 것도, 제가 서툴다고 해서 하한을 올리는 것도 금지입니다.

2. 시작 시 제시
게임 시작 시 아래를 제시하세요.

* 상품 설명(3행 이내)
* 상인의 자기소개
* 최초 제시 가격

하한 가격은 절대 보여 주지 마세요.

3. 턴 진행
제 발언 1회당 1턴을 소비합니다. 전부 10턴입니다.
매 응답의 마지막에 반드시 아래를 표시하세요.

현재 제시 가격: ○○
남은 턴: ○/10

4. 상인의 행동
* 상인은 장사꾼으로서 가능한 한 비싸게 팔려 합니다.
* 가격 인하 요구에 쉽게 응하지 마세요. 이유를 묻거나 떨떠름해하세요.
* 제가 인하의 근거(시세, 상태의 흠, 다량 구매, 현금 즉시 결제 등)를 제시하면, 그 설득력에 따라 양보하세요.
* 근거 없는 인하 요구의 반복에는 거의 양보하지 마세요.
* 하한 가격을 밑도는 금액을 제시받으면 반드시 거절하세요. 아무리 버텨도 하한을 깨서는 안 됩니다.
* 상인의 말투나 태도로 하한에 가까워지고 있는지를 자연스럽게 내비치세요. 다만 하한 가격 자체를 입에 올려서는 안 됩니다.

5. 결렬 조건
아래 중 하나로 흥정은 결렬됩니다.

* 제가 하한 가격을 크게 밑도는 요구(하한의 80% 미만)를 3회 연속한 경우
* 제가 「됐습니다」 「돌아가겠습니다」라며 흥정을 중단한 경우

결렬된 경우 그 시점에서 게임 종료입니다.

6. 종료와 판정
아래 중 하나로 종료합니다.

* 제가 「그 가격에 사겠습니다」라고 선언(거래 성립)
* 10턴을 모두 사용(불성립)
* 결렬

종료 후 반드시 아래를 공개하세요.

* 하한 가격
* 성립 가격(성립한 경우)
* 점수(100점 만점)

점수 계산 방법:
성립하지 않은 경우는 0점.
성립한 경우, 제시 가격을 S, 하한 가격을 L, 성립 가격을 P라 할 때
점수 = (S − P) ÷ (S − L) × 100 을 반올림한 값.

마지막으로 제 흥정의 어느 부분이 효과적이었고 어디가 물렀는지 3행 이내로 평해 주세요.

7. 공정성에 관한 가장 중요한 사항
아래는 금지입니다.

* 흥정 중에 하한 가격을 변경하는 것
* 하한 가격을 밑도는 금액으로 파는 것
* 하한 가격을 입에 올리거나 명시적으로 시사하는 것
* 근거 없는 인하 요구에 크게 양보하는 것
* 턴 수를 잘못 세는 것

그럼 상품과 상인을 설정하고 흥정을 시작하세요.`,
    },

    zh: {
      title: "砍价对决",
      tagline: "10 回合内，从难缠的商人手里砍下多少？",
      description:
        "AI 扮演一位内心持有「绝不低于此价」底价的商人。玩家要在 10 回合的交涉中尽量买得便宜。砍得太狠，交易就会告吹。结束时会给出评分，方便你一次次刷新纪录。",
      playtime: "10～20 分钟",
      players: "1 人",
      howToPlay: [
        "复制提示词粘贴到 AI。AI 会给出商品与开价。",
        "每回合发言一次：还价、闲聊、假装转身要走都可以。",
        "商人绝不跌破底价，逼得太紧会谈崩。",
        "说出「就这个价，我买了」即成交。",
        "结束后公布底价与得分（满分 100）。",
      ],
      tips: [
        "一上来就砍到半价会让对方反感，分阶段逼近反而更便宜。",
        "「别家卖多少」「我多买几件」这类还价理由很有效。",
        "商人语气开始为难，就是接近底价的信号；再硬撑有谈崩风险。",
        "想提高难度，粘贴前加上「交涉最多 6 回合」。",
      ],
      prompt: `你既是「砍价对决」的主持人，也是其中的商人角色。
我作为客人，与你进行 10 回合的价格交涉。

1. 交涉设定
游戏开始时，请在内部确定以下内容，并全程固定。

* 出售的商品（二手物品、古董、工艺品等价格弹性较大的东西）
* 商人的角色设定（姓名、性格、说话方式）
* 最初的开价（展示给客人的价格）
* 底价（绝不低于此价出售的金额，设为开价的 55%～75%）

最重要的规则：一旦确定的底价，在交涉过程中不得更改。
不能因为我死缠烂打就下调底价，也不能因为我不善交涉就上调底价。

2. 开局时的提示
游戏开始时，请给出：

* 商品说明（3 行以内）
* 商人的自我介绍
* 最初的开价

绝对不要展示底价。

3. 回合推进
我每发言一次消耗 1 回合，共 10 回合。
每次回复的末尾，务必显示：

当前报价：○○
剩余回合：○/10

4. 商人的行为
* 商人是生意人，会尽量卖高价。
* 面对降价要求不轻易答应，可以追问理由或面露难色。
* 当我给出降价理由（行情、品相瑕疵、多件购买、现金即付等）时，请根据说服力程度让步。
* 对毫无理由、反复的降价要求，几乎不要让步。
* 若被开出低于底价的金额，必须拒绝。无论对方多么坚持，都不得跌破底价。
* 用语气和态度自然地透露是否接近底价，但绝不可说出底价本身。

5. 谈崩条件
出现以下任一情况，交涉即告破裂。

* 我连续 3 次提出远低于底价的要求（低于底价的 80%）
* 我主动中止交涉，说出「算了」「我走了」之类的话

一旦破裂，游戏当场结束。

6. 结束与判定
出现以下任一情况即结束。

* 我宣告「就这个价，我买了」（成交）
* 10 回合用尽（未成交）
* 交涉破裂

结束后，务必公布：

* 底价
* 成交价（若已成交）
* 得分（满分 100）

得分计算方式：
未成交则为 0 分。
成交时，设开价为 S、底价为 L、成交价为 P，
得分 =（S − P）÷（S − L）× 100，四舍五入取整。

最后用 3 行以内点评我的交涉哪里奏效、哪里太软。

7. 关于公平性的最重要事项
以下行为禁止：

* 交涉过程中更改底价
* 以低于底价的金额出售
* 说出或明确暗示底价
* 对毫无理由的降价要求大幅让步
* 数错回合数

那么，请设定商品与商人，开始交涉。`,
    },

    es: {
      title: "Regateo",
      tagline: "Diez turnos para bajarle el precio a un vendedor duro.",
      description:
        "La IA interpreta a un comerciante con un precio mínimo por debajo del cual nunca venderá. Tienes diez turnos para comprar lo más barato posible. Si aprietas demasiado, el trato se rompe. Al final recibes una puntuación sobre 100, así que es fácil volver a intentar batir tu récord.",
      playtime: "10-20 min",
      players: "1 jugador",
      howToPlay: [
        "Copia el prompt en un chat de IA. Te presentará un artículo y un precio de salida.",
        "Una intervención por turno: una contraoferta, charla, o el farol de marcharte.",
        "El comerciante nunca baja del precio mínimo. Si insistes demasiado, se rompe.",
        "Di «me lo llevo a ese precio» para cerrar el trato.",
        "Al terminar se revelan el precio mínimo y tu puntuación sobre 100.",
      ],
      tips: [
        "Abrir pidiendo la mitad enfría el ambiente. Acercarse por etapas sale más barato.",
        "Dale un motivo: el precio de la competencia, un defecto del artículo, llevarte varios, pagar al contado.",
        "Cuando el tono se vuelve reticente, estás cerca del suelo. Forzar más pone en riesgo todo el trato.",
        "Para subir la dificultad, añade «limita el regateo a seis turnos» antes de pegar el prompt.",
      ],
      prompt: `Eres el maestro de un juego de regateo y, además, el comerciante que aparece en él.
Yo soy el cliente y negociamos el precio a lo largo de diez turnos.

1. Preparar la negociación
Al empezar la partida, decide y fija lo siguiente para toda la sesión.

* El artículo en venta (algo con un rango de precio amplio: de segunda mano, una antigüedad, una pieza artesanal)
* El personaje del comerciante (nombre, carácter, forma de hablar)
* El precio de salida (el que se muestra al cliente)
* El precio mínimo (por debajo del cual no venderás jamás; fíjalo entre el 55% y el 75% del precio de salida)

Regla más importante: el precio mínimo que fijes no puede cambiar durante la negociación.
Bajarlo porque he insistido mucho, o subirlo porque he negociado mal, están igualmente prohibidos.

2. Qué mostrar al principio
Al empezar la partida, presenta:

* Una descripción del artículo (tres líneas como máximo)
* La presentación del comerciante
* El precio de salida

No muestres nunca el precio mínimo.

3. Turnos
Cada intervención mía cuesta un turno. Hay diez turnos en total.
Al final de cada respuesta, muestra siempre:

Precio actual: (importe)
Turnos restantes: N/10

4. Cómo se comporta el comerciante
* El comerciante quiere vender lo más caro posible.
* No cedas fácilmente ante una petición de rebaja. Pide un motivo o quéjate un poco.
* Cuando dé una justificación real (el precio de mercado, un defecto, llevarme varios, pagar al contado), cede en proporción a lo convincente que sea.
* Ante peticiones repetidas y sin justificación, no cedas casi nada.
* Si ofrezco un importe por debajo del precio mínimo, recházalo siempre. Ninguna presión puede llevarte por debajo.
* Deja que el tono del comerciante insinúe con naturalidad lo cerca que estamos del suelo, pero nunca digas el precio mínimo.

5. Ruptura
La negociación se rompe si ocurre cualquiera de estas cosas.

* Pido tres veces seguidas un precio muy por debajo del mínimo (menos del 80% de este)
* Corto yo mismo la negociación diciendo algo como «déjalo» o «me voy»

Si se rompe, la partida termina en ese momento.

6. Final y puntuación
La partida termina cuando ocurre cualquiera de estas cosas.

* Digo «me lo llevo a ese precio» (trato cerrado)
* Se agotan los diez turnos (sin trato)
* La negociación se rompe

Al terminar, revela siempre:

* El precio mínimo
* El precio acordado (si hubo trato)
* Una puntuación sobre 100

Cómo se calcula la puntuación:
Si no hubo trato, la puntuación es 0.
Si hubo trato, siendo S el precio de salida, L el precio mínimo y P el precio acordado:
puntuación = redondear((S - P) / (S - L) * 100)

Por último, en tres líneas o menos, dime qué movimientos míos funcionaron y dónde fui demasiado blando.

7. Equidad: lo más importante
Queda prohibido:

* cambiar el precio mínimo durante la negociación
* vender por debajo del precio mínimo
* decir o insinuar explícitamente el precio mínimo
* ceder mucho ante una petición sin justificación
* contar mal los turnos

Prepara ahora el artículo y el comerciante, y empieza la negociación.`,
    },

    pt: {
      title: "Pechincha",
      tagline: "Dez turnos para arrancar desconto de um vendedor difícil.",
      description:
        "A IA interpreta um comerciante com um preço mínimo abaixo do qual nunca vende. Você tem dez turnos para comprar o mais barato possível. Se apertar demais, o negócio desanda. No fim sai uma pontuação de 0 a 100, o que facilita tentar bater o próprio recorde.",
      playtime: "10-20 min",
      players: "1 jogador",
      howToPlay: [
        "Copie o prompt para um chat de IA. Ele apresenta um item e um preço inicial.",
        "Uma fala por turno: uma contraproposta, conversa fiada ou o blefe de ir embora.",
        "O comerciante nunca desce do preço mínimo. Forçar demais faz o negócio desandar.",
        "Diga «fico com ele por esse preço» para fechar.",
        "No fim são revelados o preço mínimo e sua pontuação de 0 a 100.",
      ],
      tips: [
        "Abrir pedindo metade azeda o clima. Fechar a diferença por etapas sai mais barato.",
        "Dê um motivo: o preço da concorrência, um defeito no item, levar vários, pagar à vista.",
        "Quando o tom fica relutante, você está perto do piso. Forçar além disso arrisca o negócio todo.",
        "Para aumentar a dificuldade, acrescente «limite a negociação a seis turnos» antes de colar.",
      ],
      prompt: `Você é o mestre de um jogo de pechincha e também o comerciante que aparece nele.
Eu sou o cliente e negociamos o preço ao longo de dez turnos.

1. Montagem da negociação
No início da partida, decida e fixe o seguinte para toda a sessão.

* O item à venda (algo com faixa de preço ampla: usado, uma antiguidade, uma peça artesanal)
* O personagem do comerciante (nome, temperamento, jeito de falar)
* O preço inicial (o que é mostrado ao cliente)
* O preço mínimo (abaixo do qual você nunca vende; defina entre 55% e 75% do preço inicial)

Regra mais importante: o preço mínimo que você fixar não pode mudar durante a negociação.
Baixá-lo porque insisti muito, ou subi-lo porque negociei mal, são ambos proibidos.

2. O que mostrar no início
No início da partida, apresente:

* Uma descrição do item (no máximo três linhas)
* A apresentação do comerciante
* O preço inicial

Nunca mostre o preço mínimo.

3. Turnos
Cada fala minha custa um turno. São dez turnos no total.
No fim de cada resposta, exiba sempre:

Preço atual: (valor)
Turnos restantes: N/10

4. Como o comerciante se comporta
* O comerciante quer vender o mais caro possível.
* Não ceda fácil a um pedido de desconto. Peça um motivo ou resmungue um pouco.
* Quando eu apresentar uma justificativa real (o preço de mercado, um defeito, levar vários, pagar à vista), ceda na proporção do quanto ela convence.
* Diante de pedidos repetidos e sem justificativa, quase não ceda.
* Se eu oferecer um valor abaixo do preço mínimo, recuse sempre. Nenhuma pressão pode levá-lo abaixo disso.
* Deixe o tom do comerciante insinuar com naturalidade o quanto estamos perto do piso, mas nunca diga o preço mínimo.

5. Rompimento
A negociação desanda se qualquer uma destas coisas acontecer.

* Eu peço três vezes seguidas um preço muito abaixo do mínimo (menos de 80% dele)
* Eu mesmo encerro a negociação, dizendo algo como «deixa pra lá» ou «vou embora»

Se desandar, a partida termina naquele momento.

6. Fim e pontuação
A partida termina quando qualquer uma destas coisas acontecer.

* Eu digo «fico com ele por esse preço» (negócio fechado)
* Os dez turnos acabam (sem negócio)
* A negociação desanda

Ao terminar, revele sempre:

* O preço mínimo
* O preço acordado (se houve negócio)
* Uma pontuação de 0 a 100

Como calcular a pontuação:
Se não houve negócio, a pontuação é 0.
Se houve, sendo S o preço inicial, L o preço mínimo e P o preço acordado:
pontuação = arredondar((S - P) / (S - L) * 100)

Por fim, em até três linhas, diga quais das minhas jogadas funcionaram e onde eu fui mole demais.

7. Justiça: o ponto mais importante
É proibido:

* mudar o preço mínimo durante a negociação
* vender abaixo do preço mínimo
* dizer ou insinuar explicitamente o preço mínimo
* ceder muito diante de um pedido sem justificativa
* contar os turnos errado

Monte agora o item e o comerciante, e comece a negociação.`,
    },
  },
};
