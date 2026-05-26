// Paint

let px;
let py;

let sw = 1;

let inputColor;
let inputWeight;
let btnClear;
let btnSave;

//最初の処理
function setup() {
 createCanvas(600, 500)
 background(255)

 pixelDensity(1);

 let code = getItem('paint')
 decodePixels(code);
 　inputColor = select('#color');
 　inputWeight = select('#weight');

 　btnClear = select('#clear');
 　btnClear.mousePressed(clearAll);

 　btnSave = select('#save');
 　btnSave.mousePressed(saveImg);

 update();

}

//フレーム前の処理
function draw() {
  //background(220);


  if ( keyIsPressed ) {
    if ( key =='f' ) {
      sw += 2;

    }else if ( key == 'd' ) {
      sw -= 2;

    }
  }

  sw = constrain(sw, 1, 100);

  stroke(inputColor.value());
  strokeWeight(sw);

  if( mouseIsPressed ){
    //条件が trueだったら実行
     line(px, py, mouseX, mouseY)
     noStroke();
     circle(mouseX, mouseY, sw * random(0.9, 1.1));
   
  }
  update();
}


function update(){
  px = mouseX;
  py = mouseY;
}

function clearAll(){
  background(255);
}

function saveImg(){
   saveCanvas('paint.png');
}

function mouseReleased() {
  console.log('マウスを放しました。');
  let code = encodePixels();
  console.log(code);
  storeItem('paint', code);
}
