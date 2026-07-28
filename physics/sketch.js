import { drawBody, isOutOfBounds} from './util.js';

import { Fruit } from './Fruit.js'; // Fruit クラスを輸入する

let {Engine, Body, Bodies, Composite, Events} = Matter; // モジュールを変数化
let engine; // 物理エンジン
let next = "cherry";
let stage = [
  [
    { x: -144, y: -175 },
    { x: -131, y: 99 },
    { x: -78, y: 160 },
    { x: -3, y: 160 },
    { x: 88, y: 142 },
    { x: 129, y: 98 },
    { x: 144, y: -175 },
    { x: 91, y: -174 },
    { x: 67, y: 81 },
    { x: 33, y: 106 },
    { x: -29, y: 107 },
    { x: -83, y: 83 },
    { x: -86, y: -179 },
  ],
];

  

// 効果音集
let se = {};
let saisyo;
let haikei;
let finish;
let sound;
let sound2;

window.score = 0;

// 現在のシーン
let scene = "title";

function setup() {
  createCanvas(800, 800);
  // loadSound('./pon.wav', data => {
  //   se.pon = data;
  //   Fruit.se.pon = data;
  // });

  loadImage("pazltu.png", data => {
    haikei = data;
  });
  loadImage("op.png", data => {
    saisyo = data;
  });
  loadImage("gameover .jpeg", data => {
    finish = data;
  });
   loadSound("bgmbgm.mp3", data => {
     sound = data;
   });
   loadSound("kutuki.mp3", data => {
     sound2 = data;
   });

  // 物理エンジン（世界）を初期化
  engine = Engine.create();

  // 箱を生成 (X, Y, 幅, 高さ)
  // let ground = Bodies.rectangle(200, 350, 380,  50, { isStatic: true }); // 地面
  let ground = Bodies.fromVertices(400, 600, stage, { isStatic: true });
   Body.scale(ground, 2, 2);

  // 箱を世界に配置
  Composite.add(engine.world, [ground]);

  // 物体同士が衝突した時、コールバックを実行させる
  Events.on(engine, 'collisionStart', ev => {
    for (let i = 0; i < ev.pairs.length; i++) {
      let pair = ev.pairs[i]; // 衝突したペア
      let a = pair.bodyA.parent; // 衝突物 A
      let b = pair.bodyB.parent; // 衝突物 B
      console.log("hit", a, b)
      if (a.fruit) {
        console.log("fruit hit")
        // A が Fruit だったら
        a.fruit.hit(b, b.fruit, sound2);
      }
    }
  });

}

function draw() {
  if (scene == "title") {
    // タイトル表示
    if (saisyo) image(saisyo, 0, 0);

  } else if (scene == "play") {
    // プレイがめん
    background(220);
    if (haikei) image(haikei, 0, 0);
    text(next,650,60);
    // 世界に配置された全ての物体を取得（配列）
    let bodies = Composite.allBodies(engine.world);
  
    // 全ての物体を描画（配列をスキャン）
    for (let i = 0; i < bodies.length; i++) {
      if (bodies[i].fruit) {
        bodies[i].fruit.draw();
        if (isOutOfBounds(bodies[i], 0, -50, width, height)){
          scene = 'gameover'; //ゲームオーバー画面に移行
        }
      } else drawBody(bodies[i]);
    }
  
    // 世界の更新（1 フレーム時間を進める）
    Engine.update(engine, deltaTime);

    textSize(35); 
    text("Score:"+window.score, 20, 55);
    

  } else if (scene == "gameover") {
    // ゲームオーバー画面
    cleanStage(); // フルーツ全部削除
    background("400");
    if (finish) image(finish, 0, 0);
  }  

}

// クリックすると実行
function mousePressed() {
  let arr = ["cherry", "Maron","Lemon","banana"]; // 選択肢
  if (scene == "title" && sound) {
    scene = "play"; // プレイ画面に移行
    if (!sound.isPlaying()) sound.play(0, 1, .5)
    } else if (scene == "play") {
  // Fruit インスタンスを生成
  new Fruit(next, mouseX, 0, engine.world);
  let index = round(random(0, 3));
  next = arr[index];

  } else if (scene == "gameover") {
    scene = "title"; // タイトル画面に戻る
    window.score = 0;
  }

}

function cleanStage() {
  let bodies = Composite.allBodies(engine.world);
  for (let i = 0; i < bodies.length; i++){
    if (bodies[i].fruit) {
      Composite.remove(engine.world, bodies[i]);
    }
  }
}

// type="module" の場合は以下が必要
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;