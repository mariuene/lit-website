var airhorn = new Image();
var fire = new Image();
var cle = new Image();

function init() {
  airhorn.src = 'airhorn.png';
  fire.src = 'lit.png';
  cle.src = 'Crying_Laughing_Emoji.png';
  window.requestAnimationFrame(draw);
}

function makeLit(canvas, message) {
  var context = canvas.getContext('2d');
  var position = getMousePos(canvas, evt)

}


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function draw() {
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;


  canvas.addEventListener('mousemove', function(evt) {
    makeLit(canvas);
  }, false);
}


var fire = function(x, y){
  this.vy = 0;
  this.vx = 0;

  this.vyAdjust = -13;

  this.width = ballSettings.width;
  this.height = ballSettings.height;

  this.x = x;
  this.y = y;
  this.image = fire.image;
  this.bounceFactor = ballSettings.factor;

  //Function to draw it
  this.draw = function() {

     ctx.drawImage(this.image,
         this.x, this.y,
         this.width, this.height);

  };
  this.move = function() {

     this.y += this.vy;
     this.vy += gravity;

     // Bounce the ball when it hits the bottom
     if ((this.y + this.height) > canvas.height - 10) {

         this.impact();

         this.vyAdjust = (this.vyAdjust * this.bounceFactor);
     }

 };
}
