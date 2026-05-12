 let qrData;
 let urlInput;
 let input; // 
let colorInput;
let bgInput;


function setup() {
  createCanvas(600, 600);
  frameRate(15);
  input = select('#url'); // HTMLタグを取得する（id は url）
	colorInput = select('#color');
	bgInput = select('#bg');
}

function draw() {
  background(bgInput.value());

  textSize(20);

  let gap = 20;

  qrData = qr.encodeQR(input.value(), 'raw');

noStroke();
	fill(colorInput.value());



  for (let y = 0; y < qrData.length; y++) {
    let row = qrData[y];
    for (let x = 0; x < row.length; x++) {
      let cell = row[x];
      if (cell == true) {
        circle(x * gap, y * gap, 20);
        // text(ceil(random(0, 9)), x * gap, y * gap);
      }
    }
  }

  text(urlInput.value(), 200, 200);
}



