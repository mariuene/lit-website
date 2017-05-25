//global stuff
var fire = new Image();
var cle = new Image();
var hundre = new Image();
var boller_1 = new Image();
var boller_2 = new Image();
var ex_1 = new Image();
var ex_2 = new Image();
var ex_3 = new Image();
var fires = [];
var cles = [];
var exps = [];
var cursorX;
var cursorY;

//Track mousemovment
document.onmousemove = function(e){
    cursorX = e.pageX - 30;
    cursorY = e.pageY - 40;
}

//initialise the program
function init() {
    cle.src = 'img/cle.png';
    fire.src = 'img/fire.png';
    hundre.src = 'img/hundre.png';
    boller_1.src = 'img/boller_1.png';
    boller_2.src = 'img/boller_2.png';
    ex_1.src = 'img/ex_1.png';
    ex_2.src = 'img/ex_2.png';
    ex_3.src = 'img/ex_3.png';
    exps.push([ex_1, ex_2, ex_3]);
    window.requestAnimationFrame(draw);
}

//main function
function draw() {
      var canvas = document.getElementById('myCanvas');
      var ctx = canvas.getContext('2d');
      ctx.canvas.width  = window.innerWidth;
      ctx.canvas.height = window.innerHeight;

      for (x=0; x<100; x++){
          cles.push(new Cle(Math.floor(Math.random() * window.innerHeight), Math.floor(Math.random() * window.innerWidth)));
      }
      var aHundred = new Onehundred();
      var boller = new LitFam();

      setInterval(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        makeLit(canvas, ctx);

        for (let emoji of cles) {
            emoji.move();
            emoji.draw(ctx);
        }

        aHundred.move();
        aHundred.draw(ctx);


        boller.draw(ctx);

        for (let flame of fires) {
            flame.move();
            flame.draw(ctx);
        }
      }, 25);
}

//adds a new fire
function makeLit(canvas, ctx) {
    var flame = new Fire(cursorX, cursorY)
    fires.push(flame);
}


//this emoji is lit, and sparkles from your mouse.
class Fire {
  constructor(x,y) {
    this.vy = -10;
    this.vx = (Math.floor(Math.random() * 10) + 1) *(Math.round(Math.random()) * 2 - 1);
    this.vyAdjust = 1;
    this.x = x;
    this.y = y;
  }
  move(){
    //gravity
    this.y += this.vy;
    this.vy += this.vyAdjust;

    //force
    this.x += this.vx;

  }

  draw(ctx) {
      ctx.beginPath();
      ctx.drawImage(fire,this.x, this.y, 50, 50);

    }
  }

class Cle {
  constructor(x,y) {
    this.vy = (Math.floor(Math.random() * 20) + 1) *(Math.round(Math.random()) * 2 - 1);
    this.vx = (Math.floor(Math.random() * 20) + 1) *(Math.round(Math.random()) * 2 - 1);
    this.x = x;
    this.y = y;
    var foo = 200*Math.random()
    this.width = foo;
    this.height = foo;
  }
  move(){
    this.y += this.vy;
    this.x += this.vx;

    if (this.x > window.innerWidth|| this.x < 0){
      this.vx = -this.vx;
    }
    if (this.y > window.innerHeight || this.y < 0){
      this.vy = -this.vy;
    }

  }
  draw(ctx) {
      ctx.beginPath();
      ctx.drawImage(cle,this.x, this.y, this.width, this.height);

    }
}


//100 emoji. Blinks and is annoying.
class Onehundred {
  constructor(x,y) {
    this.x = Math.floor(window.innerWidth/4);
    this.y = Math.floor(window.innerHeight/4)- 150;

    this.vy = 5;
    this.vx = -5;

    this.width = Math.floor(window.innerWidth*0.50);
    this.height = Math.floor(window.innerWidth*0.50);

    this.count = 0;
    this.foo = true;
  }

  move() {
    this.y += this.vy;
    this.x += this.vx;

    this.vy = -this.vy
    this.vx = -this.vx;
  }
  draw(ctx) {
    if (this.count > 10){
      this.count = 0;
      this.foo = !this.foo;
    } else if (this.foo) {
      ctx.beginPath();
      ctx.drawImage(hundre,this.x, this.y, this.width, this.height);
      this.count += 1;
    } else {
      this.count +=1;
    }
  }
}

class LitFam {
  constructor() {
    this.width = Math.floor(window.innerWidth*0.40);
    this.height = Math.floor(window.innerWidth*0.50);
    this.x = window.innerWidth - this.width;
    this.y = window.innerHeight - this.height;

    this.count = 0;
  }

  draw(ctx) {
    if (this.count < 20){
      this.count += 1;
      ctx.beginPath();
      ctx.drawImage(boller_1,this.x, this.y, this.width, this.height);
    } else if (this.count < 40) {
      ctx.beginPath();
      ctx.drawImage(boller_2,this.x, this.y, this.width, this.height);
      this.count += 1;
    } else {
      this.count = 0;
      ctx.beginPath();
      ctx.drawImage(boller_1,this.x, this.y, this.width, this.height);
  }
  }
}

class Explotion {
  constructor() {
    this.width = 0;
    this.height = 0;
    this.x = Math.floor(Math.random(window.innerWidth)+1);
    this.y = Math.floor(Math.random(window.innerHeight)+1);
    this.v = 1;
    this.adjust = 1;
    this.image = exps[Math.floor(Math.random(3)+1)]
  }

  move() {
    this.width += this.v;
    this.v += this.adjust;
  }

  draw(ctx) {
      ctx.beginPath();
      ctx.drawImage(this.image,this.x, this.y, this.width, this.height);
    }
}
