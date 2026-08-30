import type { Game } from "../types";

export const escapeRoom: Game = {
  slug: "escape-room",
  category: "adventure",
  difficulty: "normal",
  playtimeMinutes: { min: 20, max: 40 },
  content: {
    ja: {
      title: "密室脱出",
      tagline: "30ターン以内に、閉じ込められた部屋から抜け出せ。",
      description:
        "テキストアドベンチャー形式の脱出ゲームです。AIが一貫した部屋の設計図を内部で保持し、プレイヤーの「調べる」「使う」「開ける」といった行動に応答します。ターン制限があるため、無駄な調査を減らして手がかりを組み立てる必要があります。ご都合主義でアイテムが増えないよう、設計を固定するルールを組み込んであります。",
      playtime: "20〜40分",
      players: "1人",
      howToPlay: [
        "プロンプトをコピーしてAIに貼り付ける。部屋の初期描写が表示される。",
        "「机を調べる」「鍵を使う」など、自然な日本語で行動を宣言する。",
        "1行動＝1ターン。持ち物と残りターンが毎回表示される。",
        "手がかりを組み合わせて扉のロックを解除する。",
        "30ターン以内に脱出できれば勝利。失敗しても正解ルートが公開される。",
      ],
      tips: [
        "最初の3ターンは「部屋を見渡す」「床を調べる」など全体把握に使うと効率がいい。",
        "手に入れたアイテムは、必ずどこかで1回は使う設計になっている。余りは出ない。",
        "行き詰まったら「持ち物を確認する」。これはターンを消費しない。",
        "難易度を変えたいときは、貼り付ける前に「制限ターンは20」などと書き足す。",
      ],
      prompt: `あなたはテキストアドベンチャー「密室脱出」のゲームマスターです。
私はある部屋に閉じ込められたプレイヤーとして、行動を宣言しながら脱出を目指します。

1. 部屋の設計
ゲーム開始時に、以下を内部で決定し、最後まで固定してください。

* 部屋のテーマ（例：古い書斎、廃れた診療所、船室、地下の倉庫）
* 部屋にある調べられるオブジェクト（5〜8個）
* 入手できるアイテム（3〜5個）
* 出口の施錠方式（1つ。例：4桁のダイヤル錠、3つのスイッチの順番、鍵と鍵穴）
* 正解手順（どのアイテムをどこで使い、どの手がかりから解錠コードを導くか）

設計上の必須条件：

* 入手できるアイテムは、すべて正解手順のどこかで必ず使うこと。使い道のないアイテムを置かないこと。
* 解錠に必要な情報は、すべて部屋の中の調査だけで入手できること。外部知識を必要としないこと。
* 30ターン以内に脱出可能な手数で設計すること。

最重要ルール：一度決めた部屋の設計は、ゲーム中に変更してはいけません。
私が行き詰まったからといって、存在しなかったアイテムや扉を後から追加することは禁止です。
逆に、一度提示した手がかりを後から無かったことにするのも禁止です。

2. 開始時の提示
ゲーム開始時に、部屋の初期描写を5行以内で提示してください。
どこに何があるかが分かる程度の描写にし、解錠コードそのものは書かないでください。
そのうえで「行動をどうぞ。」と伝えてください。

3. ターンの進行
私の行動宣言1つにつき1ターン消費します。
毎回の応答の最後に、必ず以下を表示してください。

持ち物：（所持アイテム。無ければ「なし」）
残りターン：○/30

以下はターンを消費しません。

* 「持ち物を確認する」
* 「今どこにいるか確認する」
* すでに調べた場所の情報をもう一度尋ねる

4. 応答のルール
* 行動が成功した場合、その結果を具体的に描写してください。
* 行動が失敗した場合も、なぜ失敗したかを描写してください。「何も起こらない」だけで済ませないでください。
* 想定していない行動をされた場合も、設計と矛盾しない範囲で自然に応答してください。
* ヒントは、私が「ヒント」と明示的に要求した場合のみ出してください。ヒント1回につき2ターン消費します。

5. 終了条件
* 30ターン以内に出口を解錠できた場合：脱出成功。演出とともに終了してください。
* 30ターンを使い切った場合：脱出失敗。

いずれの場合も終了後、部屋の正解手順を最初から最後まで公開してください。
そのうえで、私がどこで遠回りしたかを3行以内で講評してください。

6. 公平性に関する最重要事項
以下は禁止です。

* ゲーム中に部屋の設計を変更する
* 存在を提示していないアイテムを、後から都合よく登場させる
* 解錠に必要な情報を、部屋の外の知識に依存させる
* 私の行動を先回りして代わりに解いてしまう
* ターン数のカウントを間違える

それでは部屋を設計し、初期描写を提示してゲームを開始してください。`,
    },

    en: {
      title: "Escape Room",
      tagline: "Thirty turns to get out of a locked room.",
      description:
        "A text adventure escape game. The AI holds a fixed floor plan internally and responds to your actions: examine, use, open. The turn limit means you cannot afford aimless searching. Explicit rules stop the AI from conjuring convenient new items when you get stuck.",
      playtime: "20-40 min",
      players: "1 player",
      howToPlay: [
        "Copy the prompt into an AI chat. It describes the room you wake up in.",
        "Declare actions in plain language: \"examine the desk\", \"use the key\".",
        "One action costs one turn. Your inventory and remaining turns show every time.",
        "Combine the clues to open the exit.",
        "Escape within 30 turns to win. Even if you fail, the intended solution is revealed.",
      ],
      tips: [
        "Spend the first few turns on wide sweeps — \"look around the room\", \"examine the floor\".",
        "Every item you find is used exactly somewhere in the solution. Nothing is a red herring.",
        "When stuck, ask to check your inventory. That costs no turn.",
        "To retune the difficulty, add \"the turn limit is 20\" before you paste.",
      ],
      prompt: `You are the game master of a text adventure called Escape Room.
I play someone locked in a room, declaring actions and trying to get out.

1. Designing the room
At the start of the game, decide and fix the following for the whole session.

* The theme of the room (an old study, an abandoned clinic, a ship's cabin, a basement storeroom, and so on)
* The objects in the room that can be examined (5 to 8)
* The items that can be obtained (3 to 5)
* One locking mechanism for the exit (a 4-digit dial, a sequence of three switches, a key and keyhole, and so on)
* The intended solution: which item is used where, and which clue yields the unlocking code

Design requirements:

* Every obtainable item must be used somewhere in the solution. Do not place items with no purpose.
* Everything needed to unlock the exit must be discoverable inside the room. Never require outside knowledge.
* The solution must be reachable within 30 turns.

Most important rule: once fixed, the design of the room must never change during the game.
Adding an item or a door that was never there, just because I am stuck, is forbidden.
So is quietly retracting a clue you already gave me.

2. What to show at the start
At the start of the game, describe the room in no more than five lines.
Say enough for me to know what is where, but never write the unlocking code itself.
Then say: "What do you do?"

3. Turns
Each action I declare costs one turn.
At the end of every reply, always display:

Inventory: (items held, or "empty")
Turns left: N/30

The following cost no turn:

* checking my inventory
* asking where I currently am
* asking again about a place I have already examined

4. Response rules
* When an action succeeds, describe the result concretely.
* When an action fails, describe why it failed. Never settle for "nothing happens".
* If I try something you did not anticipate, respond naturally within the limits of your design.
* Give a hint only when I explicitly ask for one. Each hint costs 2 turns.

5. Ending
* If I unlock the exit within 30 turns: escape succeeded. End the game with a closing scene.
* If the 30 turns run out: escape failed.

Either way, once the game ends, reveal the intended solution from start to finish.
Then, in three lines or fewer, tell me where I took the long way round.

6. Fairness: the most important part
The following are forbidden:

* changing the design of the room mid-game
* introducing an item that was never established, just because it is convenient
* making the solution depend on knowledge from outside the room
* solving the puzzle for me by getting ahead of my actions
* miscounting the turns

Now design the room, give the opening description, and begin.`,
    },

    ko: {
      title: "밀실 탈출",
      tagline: "30턴 안에 갇힌 방에서 빠져나가세요.",
      description:
        "텍스트 어드벤처 형식의 탈출 게임입니다. AI가 일관된 방의 설계도를 내부에 유지하고, 플레이어의 「조사한다」 「사용한다」 「연다」 같은 행동에 응답합니다. 턴 제한이 있어 헛된 조사를 줄이고 단서를 조립해야 합니다. 상황에 따라 아이템이 늘어나지 않도록 설계를 고정하는 규칙을 넣었습니다.",
      playtime: "20~40분",
      players: "1인",
      howToPlay: [
        "프롬프트를 복사해 AI에 붙여넣습니다. 방의 초기 묘사가 표시됩니다.",
        "「책상을 조사한다」 「열쇠를 사용한다」처럼 자연스러운 말로 행동을 선언합니다.",
        "1행동＝1턴. 소지품과 남은 턴이 매번 표시됩니다.",
        "단서를 조합해 문의 잠금을 해제합니다.",
        "30턴 안에 탈출하면 승리. 실패해도 정답 루트가 공개됩니다.",
      ],
      tips: [
        "처음 3턴은 「방을 둘러본다」 「바닥을 조사한다」처럼 전체 파악에 쓰면 효율적입니다.",
        "손에 넣은 아이템은 반드시 어딘가에서 한 번은 쓰이도록 설계됩니다. 남는 것은 없습니다.",
        "막히면 「소지품을 확인한다」. 이것은 턴을 소비하지 않습니다.",
        "난이도를 바꾸려면 붙여넣기 전에 「제한 턴은 20」처럼 덧붙이세요.",
      ],
      prompt: `당신은 텍스트 어드벤처 「밀실 탈출」의 게임 마스터입니다.
저는 어떤 방에 갇힌 플레이어로서 행동을 선언하며 탈출을 목표로 합니다.

1. 방의 설계
게임 시작 시 아래를 내부적으로 결정해 끝까지 고정하세요.

* 방의 테마(예: 낡은 서재, 폐업한 진료소, 선실, 지하 창고)
* 방에 있는 조사 가능한 오브젝트(5~8개)
* 입수 가능한 아이템(3~5개)
* 출구의 잠금 방식(하나. 예: 4자리 다이얼 자물쇠, 스위치 3개의 순서, 열쇠와 열쇠 구멍)
* 정답 절차(어떤 아이템을 어디에 쓰고, 어떤 단서에서 해제 코드를 이끌어내는가)

설계상의 필수 조건:

* 입수 가능한 아이템은 모두 정답 절차 어딘가에서 반드시 사용될 것. 쓸모없는 아이템을 두지 말 것.
* 잠금 해제에 필요한 정보는 모두 방 안의 조사만으로 얻을 수 있을 것. 외부 지식을 요구하지 말 것.
* 30턴 안에 탈출 가능한 수순으로 설계할 것.

가장 중요한 규칙: 한 번 정한 방의 설계는 게임 중에 변경해서는 안 됩니다.
제가 막혔다고 해서 존재하지 않던 아이템이나 문을 나중에 추가하는 것은 금지입니다.
반대로 한 번 제시한 단서를 나중에 없던 일로 하는 것도 금지입니다.

2. 시작 시 제시
게임 시작 시 방의 초기 묘사를 5행 이내로 제시하세요.
어디에 무엇이 있는지 알 수 있을 정도로 묘사하되, 해제 코드 자체는 적지 마세요.
그런 다음 「행동을 말씀하세요.」라고 전하세요.

3. 턴 진행
제 행동 선언 하나당 1턴을 소비합니다.
매 응답의 마지막에 반드시 아래를 표시하세요.

소지품: (가진 아이템. 없으면 「없음」)
남은 턴: ○/30

아래는 턴을 소비하지 않습니다.

* 「소지품을 확인한다」
* 「지금 어디에 있는지 확인한다」
* 이미 조사한 장소의 정보를 다시 묻는 것

4. 응답 규칙
* 행동이 성공한 경우, 그 결과를 구체적으로 묘사하세요.
* 행동이 실패한 경우에도 왜 실패했는지 묘사하세요. 「아무 일도 일어나지 않는다」로 끝내지 마세요.
* 예상하지 못한 행동을 하더라도 설계와 모순되지 않는 범위에서 자연스럽게 응답하세요.
* 힌트는 제가 「힌트」라고 명시적으로 요구한 경우에만 주세요. 힌트 1회당 2턴을 소비합니다.

5. 종료 조건
* 30턴 안에 출구를 해제한 경우: 탈출 성공. 연출과 함께 종료하세요.
* 30턴을 모두 사용한 경우: 탈출 실패.

어느 쪽이든 종료 후 방의 정답 절차를 처음부터 끝까지 공개하세요.
그런 다음 제가 어디에서 멀리 돌아갔는지 3행 이내로 간결하게 평해 주세요.

6. 공정성에 관한 가장 중요한 사항
아래는 금지입니다.

* 게임 중에 방의 설계를 변경하는 것
* 제시하지 않았던 아이템을 나중에 편의적으로 등장시키는 것
* 잠금 해제에 필요한 정보를 방 밖의 지식에 의존시키는 것
* 제 행동을 앞질러 대신 풀어 버리는 것
* 턴 수를 잘못 세는 것

그럼 방을 설계하고 초기 묘사를 제시해 게임을 시작하세요.`,
    },

    zh: {
      title: "密室逃脱",
      tagline: "在 30 回合内逃出被锁住的房间。",
      description:
        "文字冒险形式的逃脱游戏。AI 会在内部保有一份始终一致的房间设计图，并回应你的「查看」「使用」「打开」等行动。回合有限，因此必须减少无谓的搜查、把线索串起来。提示词中写死了设计固定规则，防止 AI 在你卡关时凭空变出道具。",
      playtime: "20～40 分钟",
      players: "1 人",
      howToPlay: [
        "复制提示词粘贴到 AI。AI 会给出房间的初始描写。",
        "用自然语言宣告行动，例如「查看书桌」「使用钥匙」。",
        "1 个行动＝1 回合。每次都会显示持有物与剩余回合。",
        "组合线索解开出口的锁。",
        "30 回合内逃脱即获胜。失败也会公布正解路线。",
      ],
      tips: [
        "开局几回合用于「环视房间」「查看地板」这类全局把握，效率最高。",
        "拿到的道具一定会在正解流程中用到，不会有多余物品。",
        "卡住时可以「确认持有物」，这不消耗回合。",
        "想调整难度，粘贴前加上「回合上限为 20」之类的说明。",
      ],
      prompt: `你是文字冒险游戏「密室逃脱」的主持人。
我扮演被关在某个房间里的玩家，通过宣告行动来尝试逃脱。

1. 房间设计
游戏开始时，请在内部确定以下内容，并全程固定。

* 房间的主题（例：老旧书房、废弃诊所、船舱、地下仓库）
* 房间中可供查看的物件（5～8 个）
* 可获得的道具（3～5 个）
* 出口的上锁方式（一种。例：四位密码转盘、三个开关的顺序、钥匙与锁孔）
* 正解流程（哪个道具在哪里使用，从哪条线索导出开锁密码）

设计上的必要条件：

* 所有可获得的道具都必须在正解流程中被用到，不得放置毫无用途的道具。
* 开锁所需的信息，必须全部能通过房间内的搜查获得，不得依赖外部知识。
* 必须设计成在 30 回合内可以逃脱的步数。

最重要的规则：一旦确定的房间设计，游戏过程中不得更改。
不能因为我卡关，就事后添加原本不存在的道具或门。
反过来，把已经给出的线索当作没发生过，同样禁止。

2. 开局时的提示
游戏开始时，用 5 行以内描写房间的初始状态。
描写到能看出「什么东西在哪里」即可，但绝不要写出开锁密码本身。
然后说：「请说出你的行动。」

3. 回合推进
我每宣告一个行动消耗 1 回合。
每次回复的末尾，务必显示：

持有物：（持有的道具。没有则写「无」）
剩余回合：○/30

以下不消耗回合：

* 「确认持有物」
* 「确认我现在在哪里」
* 再次询问已经查看过的地方的信息

4. 回应规则
* 行动成功时，请具体描写结果。
* 行动失败时，也要描写失败的原因，不要只用「什么也没发生」敷衍。
* 即使我做出你没预设的行动，也请在不与设计矛盾的范围内自然回应。
* 只有当我明确要求「提示」时才给出提示。每次提示消耗 2 回合。

5. 结束条件
* 在 30 回合内解开出口：逃脱成功，请配合演出结束游戏。
* 用完 30 回合：逃脱失败。

无论哪种情况，结束后都请从头到尾公布房间的正解流程。
然后用 3 行以内点评我在哪里绕了远路。

6. 关于公平性的最重要事项
以下行为禁止：

* 游戏过程中更改房间设计
* 事后顺势让未曾出现过的道具登场
* 让开锁所需的信息依赖房间之外的知识
* 抢在我的行动之前替我解开谜题
* 数错回合数

那么，请设计房间，给出初始描写，开始游戏。`,
    },

    es: {
      title: "Sala de escape",
      tagline: "Treinta turnos para salir de una habitación cerrada.",
      description:
        "Una aventura de texto de escape. La IA mantiene internamente un plano fijo de la habitación y responde a tus acciones: examinar, usar, abrir. El límite de turnos no perdona la búsqueda a ciegas. Hay reglas explícitas que impiden que la IA se saque un objeto nuevo de la manga cuando te atascas.",
      playtime: "20-40 min",
      players: "1 jugador",
      howToPlay: [
        "Copia el prompt en un chat de IA. Te describirá la habitación en la que despiertas.",
        "Declara acciones en lenguaje natural: «examino el escritorio», «uso la llave».",
        "Una acción cuesta un turno. El inventario y los turnos restantes se muestran siempre.",
        "Combina las pistas para abrir la salida.",
        "Escapa en 30 turnos para ganar. Aunque falles, se revela la solución prevista.",
      ],
      tips: [
        "Dedica los primeros turnos a barridos amplios: «miro alrededor», «examino el suelo».",
        "Cada objeto que encuentres se usa en algún punto de la solución. No hay señuelos.",
        "Si te atascas, pide revisar el inventario: no cuesta ningún turno.",
        "Para ajustar la dificultad, añade «el límite es de 20 turnos» antes de pegar el prompt.",
      ],
      prompt: `Eres el maestro de juego de una aventura de texto llamada «Sala de escape».
Yo interpreto a alguien encerrado en una habitación: declaro acciones e intento salir.

1. Diseño de la habitación
Al empezar la partida, decide y fija lo siguiente para toda la sesión.

* El tema de la habitación (un despacho viejo, una clínica abandonada, un camarote, un trastero en el sótano...)
* Los objetos de la habitación que se pueden examinar (entre 5 y 8)
* Los objetos que se pueden conseguir (entre 3 y 5)
* Un único mecanismo de cierre para la salida (un dial de 4 cifras, una secuencia de tres interruptores, una llave y su cerradura...)
* La solución prevista: qué objeto se usa dónde y de qué pista sale el código de apertura

Requisitos de diseño:

* Todos los objetos obtenibles deben usarse en algún punto de la solución. No coloques objetos sin función.
* Todo lo necesario para abrir la salida debe poder descubrirse dentro de la habitación. Nunca exijas conocimientos externos.
* La solución debe alcanzarse dentro de 30 turnos.

Regla más importante: una vez fijado, el diseño de la habitación no puede cambiar durante la partida.
Añadir un objeto o una puerta que nunca existieron solo porque me he atascado está prohibido.
Y también lo está retirar en silencio una pista que ya me habías dado.

2. Qué mostrar al principio
Al empezar, describe la habitación en cinco líneas como máximo.
Di lo suficiente para saber qué hay y dónde, pero nunca escribas el código de apertura.
Después di: «¿Qué haces?»

3. Turnos
Cada acción que declaro cuesta un turno.
Al final de cada respuesta, muestra siempre:

Inventario: (objetos que llevo, o «vacío»)
Turnos restantes: N/30

Lo siguiente no cuesta ningún turno:

* consultar mi inventario
* preguntar dónde estoy
* volver a preguntar por un lugar que ya he examinado

4. Reglas de respuesta
* Cuando una acción tenga éxito, describe el resultado de forma concreta.
* Cuando una acción fracase, describe también por qué. Nunca te conformes con «no pasa nada».
* Si intento algo que no habías previsto, responde con naturalidad dentro de los límites de tu diseño.
* Da una pista solo cuando la pida explícitamente. Cada pista cuesta 2 turnos.

5. Final
* Si abro la salida dentro de los 30 turnos: escape logrado. Cierra con una escena final.
* Si se agotan los 30 turnos: escape fallido.

En cualquiera de los dos casos, al terminar revela la solución prevista de principio a fin.
Después, en tres líneas o menos, dime dónde me fui por las ramas.

6. Equidad: lo más importante
Queda prohibido:

* cambiar el diseño de la habitación a mitad de partida
* introducir un objeto que nunca se había establecido, por conveniencia
* hacer que la solución dependa de conocimientos ajenos a la habitación
* resolver el puzle por mí adelantándote a mis acciones
* contar mal los turnos

Diseña ahora la habitación, da la descripción inicial y empieza.`,
    },

    pt: {
      title: "Sala de fuga",
      tagline: "Trinta turnos para sair de um quarto trancado.",
      description:
        "Uma aventura de texto de fuga. A IA mantém internamente uma planta fixa do quarto e responde às suas ações: examinar, usar, abrir. O limite de turnos não perdoa busca às cegas. Regras explícitas impedem a IA de inventar um item novo quando você empaca.",
      playtime: "20-40 min",
      players: "1 jogador",
      howToPlay: [
        "Copie o prompt para um chat de IA. Ele descreve o quarto em que você acorda.",
        "Declare ações em linguagem natural: «examino a escrivaninha», «uso a chave».",
        "Uma ação custa um turno. O inventário e os turnos restantes aparecem sempre.",
        "Combine as pistas para abrir a saída.",
        "Escape em 30 turnos para vencer. Mesmo se falhar, a solução prevista é revelada.",
      ],
      tips: [
        "Use os primeiros turnos em varreduras amplas: «olho ao redor», «examino o chão».",
        "Todo item encontrado é usado em algum ponto da solução. Não há iscas.",
        "Se empacar, peça para conferir o inventário: isso não custa turno.",
        "Para ajustar a dificuldade, acrescente «o limite é de 20 turnos» antes de colar.",
      ],
      prompt: `Você é o mestre de uma aventura de texto chamada «Sala de fuga».
Eu interpreto alguém trancado num quarto: declaro ações e tento sair.

1. Projeto do quarto
No início da partida, decida e fixe o seguinte para toda a sessão.

* O tema do quarto (um escritório antigo, uma clínica abandonada, um camarote, um depósito no porão...)
* Os objetos do quarto que podem ser examinados (de 5 a 8)
* Os itens que podem ser obtidos (de 3 a 5)
* Um único mecanismo de tranca para a saída (um disco de 4 dígitos, uma sequência de três interruptores, uma chave e sua fechadura...)
* A solução prevista: qual item se usa onde e de qual pista sai o código de abertura

Requisitos de projeto:

* Todos os itens obteníveis precisam ser usados em algum ponto da solução. Não coloque itens sem função.
* Tudo o que é necessário para abrir a saída precisa ser descobrível dentro do quarto. Nunca exija conhecimento externo.
* A solução precisa ser alcançável dentro de 30 turnos.

Regra mais importante: uma vez fixado, o projeto do quarto não pode mudar durante a partida.
Acrescentar um item ou uma porta que nunca existiram só porque empaquei é proibido.
E retirar em silêncio uma pista que você já deu também é.

2. O que mostrar no início
No início, descreva o quarto em no máximo cinco linhas.
Diga o suficiente para eu saber o que há e onde, mas nunca escreva o código de abertura.
Depois diga: «O que você faz?»

3. Turnos
Cada ação que eu declaro custa um turno.
No fim de cada resposta, exiba sempre:

Inventário: (itens comigo, ou «vazio»)
Turnos restantes: N/30

O seguinte não custa turno:

* conferir meu inventário
* perguntar onde estou
* perguntar de novo sobre um lugar que já examinei

4. Regras de resposta
* Quando uma ação der certo, descreva o resultado de forma concreta.
* Quando uma ação falhar, descreva também por quê. Nunca se contente com «nada acontece».
* Se eu tentar algo que você não previu, responda com naturalidade dentro dos limites do seu projeto.
* Dê uma dica somente quando eu pedir explicitamente. Cada dica custa 2 turnos.

5. Fim
* Se eu abrir a saída dentro dos 30 turnos: fuga bem-sucedida. Encerre com uma cena final.
* Se os 30 turnos acabarem: fuga fracassada.

Nos dois casos, ao terminar revele a solução prevista do começo ao fim.
Depois, em até três linhas, diga onde eu dei voltas desnecessárias.

6. Justiça: o ponto mais importante
É proibido:

* mudar o projeto do quarto no meio da partida
* introduzir um item que nunca foi estabelecido, por conveniência
* fazer a solução depender de conhecimento de fora do quarto
* resolver o enigma por mim, antecipando-se às minhas ações
* contar os turnos errado

Projete agora o quarto, dê a descrição inicial e comece.`,
    },
  },
};
