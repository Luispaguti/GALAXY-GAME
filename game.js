class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.player = new Player(this.ctx)
    this.bg = new Background(ctx)
    this.enemies = []
    this.addEnemy()  
    this.bullets = []
    this.lifes = []
    this.interval = null;
    this.setListeners()
    this.tick = 0;
    this.scrollOffset = 0
    this.record = new Record(this.ctx)
    this.highscore = new Record(this.ctx,`Highscore: `+ this.highscore )
    this.img = new Image()
    this.img.src = './img/gameover4.png'
    this.audio = new Audio("audio/Fluffin.mp3");
    this.audioGameOver = new Audio("audio/over4.mp3");
    this.audio2 = new Audio ("audio/eating.mp3")
    this.audio3 = new Audio ("audio/pain1.mp3")
    this.audio4 = new Audio ("audio/pop1.mp3")
  }

  draw() {
    this.bg.draw()
    this.player.draw();
    this.enemies.forEach((e) => e.draw())
    this.lifes.forEach((l) => l.draw())
    this.record.draw()
  }

  start() {

    this.audio.play()
    this.audio.loop = true
    this.interval = setInterval(() => {
    this.clear();
    this.draw();
    this.move();
    this.checkCollisions();
    this.checkCollisionsBullets()
    this.checkCollisionsLife()
    if (Math.floor(Math.random() * 101) % 25 === 0) {
      this.tick++;
      if (this.tick > 5) {
          this.tick = 0;
          this.addEnemy();
        }
        if (Math.floor(Math.random() * 101) % 100 === 0) {
         this.addLifes();
        } 
      }
    }, 1000 / 60);
  }

  stop() {
    clearInterval(this.interval)
    this.interval = null
    this.audio.pause();
  }

  addEnemy() {
    const enemy = new Enemy(this.ctx);
    this.enemies.push(enemy);
  }

  addLifes() {
    const life = new Life(this.ctx);
    this.lifes.push(life);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.enemies = this.enemies.filter((e) => e.isVisible())
    this.enemies = this.enemies.filter((e) => e.alive)
  }

  move() {
    this.bg.move()
    this.player.move();
    this.enemies.forEach((e) => e.move());
    this.lifes.forEach((l) => l.move());
  }

  setListeners() {
    document.addEventListener("keydown", (e) => {
      this.player.keyDown(e.keyCode)
    })

    document.addEventListener("keyup", (e) => {
      this.player.keyUp(e.keyCode)
    })
  }

  checkCollisions() {
    this.enemies = this.enemies.filter((e) => {
      if (e.collides(this.player)) {
        this.player.hit();
        this.audio3.play(); 
        return false;
      }
        return true;
    });

    if (!this.player.isAlive()) {
      this.gameOver();
    }
  }

  checkCollisionsLife() {
    this.lifes = this.lifes.filter((l) => {
      if (l.collides(this.player)) {
        this.player.hitLife();
        this.audio2.play();
        return false;
      }
        return true;
    });
  }
  
  increaseLevel() {
    if(this.scrollOffset >= 100){
      console.log(this.scrollOffset)
      console.log('luis')
      this.enemy.level1();  
    }
  }

  gameOver() {
    this.stop();
    this.audioGameOver.play();
    this.ctx.drawImage(
      this.img,
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    )
    this.enemies = [];
    this.record.scrollOffSet = 0
    this.player = new Player(ctx);
    this.audio.pause();
  }

  checkCollisionsBullets() {
    this.enemies.forEach(enemy => {
      this.player.bullets = this.player.bullets.filter((bullet) => {
        if (bullet.collidesBullets(enemy)) {
          this.record.plus()
          this.audio4.play()
          enemy.alive = false
          return false
        } else {
          return true
        }
      })
      enemy.bullets = enemy.bullets.filter((bullet) => {
        if (bullet.collidesBullets(this.player)) {
          this.player.hit()
        
          return false
        } else {
          return true
        }
      })
    })
  }
}
