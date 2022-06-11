class Game {
  constructor(ctx) {
    this.ctx = ctx

    this.player = new Player(this.ctx)

    this.bg = new Background(ctx)
    this.enemies = []
    this.addEnemy()
    // this.enemyBulletController = new Bullet2(ctx)
    
    this.bullets = []
    this.lifes = []
    // this.enemies2= []
    // this.platform = new Platform(ctx)
    this.interval = null;

    this.setListeners()

    this.tick = 0;
    

    this.scrollOffset = 0

    this.record = new Record(this.ctx)

    this.highscore = new Record(this.ctx,`Highscore: `+ this.highscore )

    this.img = new Image()
    this.img.src = './img/gameover4.png'

    this.audio = new Audio("audio/Fluffin.mp3");

    this.audioGameOver = new Audio("audio/gameover1.mp3");

    this.audio2 = new Audio ("audio/eating.mp3")

    this.audio3 = new Audio ("audio/pain1.mp3")

  }

  draw() {
    this.bg.draw()
    // this.platform.draw();
    this.player.draw();

    this.enemies.forEach((e) => e.draw())
    this.lifes.forEach((l) => l.draw())
    // this.enemies2.forEach((e) => e.draw())
    // this.bullets.forEach((e) => e.draw())
    this.record.draw()

  }

  start() {

    this.audio.play()
    this.audio.loop = true
    this.interval = setInterval(() => {
      this.clear();
      // this.clear2();
      this.draw();
      this.move();
      this.checkCollisions();
      this.checkCollisionsBullets()
      this.checkCollisionsLife()
      // this.checkCollisionsBullets2()
     // this.scrollOffset++
     
      // this.checkCollisionsBullets2()

      // al poner esto desaparecen los enemigos

      if (Math.floor(Math.random() * 101) % 25 === 0) {
        this.tick++;

        if (this.tick > 5) {
          this.tick = 0;
          this.addEnemy()
          ;
        }
        if (Math.floor(Math.random() * 101) % 100 === 0) {
        
          this.addLifes()
          ;
        }

       
        
      }
      //this.record.scrollOffSet++

      // if(this.tick > Math.random() * 200 + 100) {
      //   this.tick = 0;
      //   this.addEnemy2();
      // }
    }, 1000 / 60);


  }


  stop() {
    clearInterval(this.interval)
    this.interval = null
    this.audio.pause();
  }

  addEnemy() {
    const enemy = new Enemy(this.ctx);
   // this.enemies.push(enemy);
   
    this.enemies.push(enemy);
    //if (this.scrollOffset >= 100){
     // this.enemy.level1();
     // this.scrollOffset = 0
      
    //}
  }
  // addBullet2() {
  //   const bullet = new Bullet2(this.ctx);
  //   this.bullets.push(bull);
  // }
  addLifes() {
    const life = new Life(this.ctx);
    this.lifes.push(life);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.enemies = this.enemies.filter((e) => e.isVisible())
    this.enemies = this.enemies.filter((e) => e.alive)


  }

  // clear2() {
  //     this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  //     this.enemies2 = this.enemies2.filter((e) => e.isVisible())
  //     this.enemies2 = this.enemies2.filter((e) => e.alive)

  // }



  move() {
    this.bg.move()
    this.player.move();
    this.enemies.forEach((e) => e.move());
    this.lifes.forEach((l) => l.move());
    // this.enemies2.forEach((e) => e.move());
    // this.enemies.forEach((e) => e.move())
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

  // checkCollisionsBullets2() {

  //   this.enemy.forEach(enemy => {
  //     this.enemy.bullets = enemy.bullets.filter((bullet) => {
  //       if (bullet.collidesBullets2(this.player)) {
  //         return false
  //       } else {
  //         return true
  //       }
  //     })

  //   })

  // }



  //  this.bullets.forEach(bullet => {
  //   this.enemy.bullets = this.enemy.bullets.filter((bullet) => {
  //     if (bullet.collidesBullets2(player)) {
  //       this.player.hit()
  //       return false
  //     } else {
  //       return true
  //     }
  //   })
  //  })
     

  //   }

    // this.enemies2 = this.enemies2.filter((e) => {
    //   if (e.collides2(this.player)) {
    //     this.player.hit();
    //     return false;
    //   }

    //   return true;
    // });

    // if (!this.player.isAlive()) {
    //   this.gameOver();
    // }
  // checkCollisions(){
  //   this.enemies.forEach((e) => {
  //     if (e.collides(this.player)){
  //       this.gameOver();

  //     }
  //   });
  // }
  // el antiguo de gameOVER

  gameOver() {
    this.stop();
    this.audioGameOver.play();
    //this.ctx.fillText("GAME OVER", 100, 100)
    this.ctx.drawImage(
      this.img,
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    )
    this.enemies = [];
    this.record.scrollOffSet = 0
    // this.enemies2 =[];
    this.player = new Player(ctx);
    // pongo el array vacio this.enemies =[ ] 
    // y el player lo vuelvo a crear, por lo tanto el player aparece en el punto inicial

    this.audio.pause();


  }

  checkCollisionsBullets() {

    this.enemies.forEach(enemy => {
      this.player.bullets = this.player.bullets.filter((bullet) => {
        if (bullet.collidesBullets(enemy)) {
          this.record.plus()
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

    // checkCollisionsBullets2(){
    //   
    // };


  // }


}
