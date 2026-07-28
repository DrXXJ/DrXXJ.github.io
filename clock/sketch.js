// Clock

let font;
let tenki; //天気情報を入れる変数
let hanaoSvg; //※鼻緒SVGを入れる変数
let sound;
let sound2;
let lastsecond;
let lasthour;

function preload() {
  hanaoSvg = loadImage('Hanao.svg');　// SVGを入れるための関数
  sound = loadSound('getasound.mp4')
  sound2 = loadSound('getah.mov')
  
}
//最初の処理
function setup() {
 createCanvas(1300, 800, SVG)

 // フォントを読み込む
 loadFont("getanofont.ttf", data => {
   font = data;
 });

//天気予報の取得
 loadJSON("https://api.open-meteo.com/v1/forecast?latitude=36.5667&longitude=139.8833&hourly=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FTokyo", function(data) {
   console.log(data);
   tenki = data; //天気情報を保存
 });
}

//フレーム前の処理
function draw() {
  background(207,178,32);
  fill(255,239,137)
  noStroke()
  rect(520,255,330,300)
  image(hanaoSvg, 70, 43, 825, 714)　//SVGの描画

  //現在の日付を取得する
  let date = new Date();

  let year = date.getFullYear(); //現在の年

  let h = date.getHours(); //時刻
  let m = date.getMinutes();
  let s = date.getSeconds();
  

  fill(0,0,0)
  textFont(font);
  textAlign(CENTER); //中央寄せ
  textSize(90); //文字サイズ
  text (year, 680, 345);//年を表示
  text(h　+　':' + m +':' + s, 680, 430); //時刻

  if (tenki) {
    text(tenki.hourly.temperature_2m[h]+ '°C', 680, 515); //温度
  }

if(h!==lasthour){
  sound2.play()
  lasthour=h
}
else
if(s!==lastsecond){
  sound.play()
  lastsecond=s
}

}
