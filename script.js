//global stuff
var fire = new Image();
var cle = new Image();
var hundre = new Image();
var boller_1 = new Image();
var boller_2 = new Image();
var fires = [];
var cles = [];
var shake = [];
var cursorX;
var cursorY;

//start the horrible stuff
window.onload = function(e){
  init();
}

//Track mousemovment
document.onmousemove = function(e){
    cursorX = e.pageX - 30;
    cursorY = e.pageY - 40;
}


//initialise the program
function init() {
    cle.src = '../img/cle.png';
    fire.src = '../img/fire.png';
    hundre.src = '../img/hundre.png';
    boller_1.src = '../img/boller_1.png';
    boller_2.src = '../img/boller_2.png';
    window.requestAnimationFrame(draw);
}

//main function
function draw() {
      var canvas = document.getElementById('myCanvas');
      var ctx = canvas.getContext('2d');

      for (x=0; x<100; x++){
          cles.push(new Cle(Math.floor(Math.random() * window.innerHeight), Math.floor(Math.random() * window.innerWidth)));
      }
      var aHundred = new Onehundred();
      var boller = new LitFam();
      let rootFire = new LinkedListFire(cursorX, cursorY);
      let lastFire = rootFire;

      setInterval(function(){
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        shakeSite(canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const newFire = new LinkedListFire(cursorX, cursorY);
        if(rootFire === null) {
          rootFire = newFire;
        }
        else {
          lastFire.setNext(newFire);
        }
        lastFire = newFire;

        for (let emoji of cles) {
            emoji.move();
            emoji.draw(ctx);
        }
        aHundred.draw(ctx);
        boller.draw(ctx);

        let linkedElement = rootFire;
        let prevElement = null;
        while(linkedElement !== null) {
          const flame = linkedElement.element;
          const next = linkedElement.next;
          flame.move();
          flame.draw(ctx);
          if(flame.outsideScreen()) {
            // Deleting root element
            if(prevElement === null) {
              rootFire = next;
              linkedElement = next;
            }
            // Deleting element in the middle of the list
            else {
              prevElement.setNext(next);
              linkedElement = next;
            }
          }
          else {
            // Iterate to next element normally
            prevElement = linkedElement;
            linkedElement = next;
          }
        }
      }, 25);
}

//this is some horrible shit
function shakeSite(canvas){
  if (shake.length === 0){
    shake = [0,1,2,3];
  }
  switch (shake.pop()) {
    case 0:
      canvas.style = "margin-left: -10px";
      break;
    case 1:
      canvas.style = "margin-top: -10px";
      break;
    case 2:
      canvas.style = "margin-top: 10px";
      break;
    case 3:
      canvas.style = "margin-left: 10px";
      break;
    default:
  }
}


// Bastardized linked list
class LinkedListFire {
  constructor(cursorX, cursorY) {
    this.element = new Fire(cursorX, cursorY);
    this.next = null;
  }

  setNext(next) {
    this.next = next;
  }
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

  outsideScreen() {
    const outsideBottom = this.y > (window.innerHeight + fire.height)
    const outsideLeft = (this.x + fire.width) < 0;
    const outsideRight = this.x > window.innerWidth;
    return outsideBottom || outsideLeft || outsideRight || isNaN(this.y);
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
    this.vy = 5;
    this.vx = -5;

    this.count = 0;
    this.foo = true;
  }
  draw(ctx) {
    this.width = Math.floor(window.innerWidth*0.50);
    this.height = Math.floor(window.innerWidth*0.50);
    this.x = Math.floor(window.innerWidth/4);
    this.y = Math.floor(window.innerHeight/4)- 150;
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

    this.count = 0;
  }

  draw(ctx) {
    this.width = Math.floor(window.innerWidth*0.40);
    this.height = Math.floor(window.innerWidth*0.50);
    this.x = window.innerWidth - this.width;
    this.y = window.innerHeight - this.height;
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
