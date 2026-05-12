// Paint

//最初の処理
function setup() {
 createCanvas(800, 800)
}

//フレーム前の処理
function draw() {
  //background(220);

  noStroke(); //境界線を消す
  fill(0, 0, 0);//塗りの色

  if( mouseIsPressed ){
    //条件が trueだったら実行
     circle(mouseX, mouseY, 80);
  }
}

