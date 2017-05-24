var fire = new Image();
var cle = new Image();

function init() {
  console.log("init");
  fire.src = 'fire.png';
  cle.src = 'cle.png';
  window.requestAnimationFrame(draw);
}

function makeLit(canvas, evt) {
  console.log("makeLit");
  var context = canvas.getContext('2d');
  var position = getMousePos(canvas, evt)
  //draw lit emoji

}


function getMousePos(canvas, evt) {
  console.log("getMousePos");
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function draw() {
  console.log("draw")
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  //ctx.canvas.width  = window.innerWidth;
  //ctx.canvas.height = window.innerHeight;

  canvas.addEventListener('mousemove', function(evt) {
    makeLit(canvas, evt);
  }, false);
}


var fire = function(x, y){
  this.vy = 0;
  this.vx = 0;

  this.xyAdjust = Math.floor(Math.random() * 9) + 1;

  this.x = x;
  this.y = y;
  this.image = fire.image;
  this.width = fire.width;
  this.height = fire.height;

  //Function to draw it
  this.draw = function() {

     ctx.drawImage(this.image,
         this.x, this.y,
         this.width, this.height);

  };

  this.move = function() {

     this.y += this.vy;
     this.vy += gravity;
     this.x += this.xy;
     this.vx += this.vxAdjust;

     this.vxAdjust = this.vxAdjust - Math.floor(this.vxAdjust*0.7);

     //destroy when out of canvas
     if ((this.y) > canvas.height || (this.x) > canvas.width || (this.x) < 0) {
          this.destroy();
     }

 };
}
