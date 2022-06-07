class Game {
    constructor(ctx) {
        this.ctx = ctx
  
        this.player = new Player(this.ctx)
        
        this.bg = new Background(ctx)
        this.enemies = []
        // this.enemies2= []
        // this.platform = new Platform(ctx)
        this.interval = null;

        this.setListeners()

        this.tick = 0;

      
      }

      draw() {
        this.bg.draw()
        // this.platform.draw();
        this.player.draw();
        
        this.enemies.forEach((e) => e.draw())
        // this.enemies2.forEach((e) => e.draw())
        
      }

      start() {
    
        this.interval = setInterval(() => {
          this.clear();
          // this.clear2();
          this.draw();
          this.move();
          this.checkCollisions();
          this.checkCollisionsBullets()
          // this.checkCollisionsBullets2()

          // al poner esto desaparecen los enemigos

          if( Math.floor(Math.random() * 101) % 25 === 0) {
            this.tick++;

              if (this.tick > 4 ) {
              this.tick = 0;
              this.addEnemy();
          }
          
          }
          // if(this.tick > Math.random() * 200 + 100) {
          //   this.tick = 0;
          //   this.addEnemy2();
          // }
        }, 1000 / 60);


      }
    

      stop(){
        clearInterval(this.interval)
        this.interval = null
      }

      addEnemy(){
        const enemy = new Enemy (this.ctx);
        this.enemies.push(enemy);
      }
      // addEnemy2(){
      //   const enemy2 = new Enemy2 (this.ctx);
      //   this.enemies2.push(enemy2);
      // }
    
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
        // this.enemies2.forEach((e) => e.move());
      
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
            return false;
          }
    
          return true;
        });
    
        if (!this.player.isAlive()) {
          this.gameOver();
        }

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
      }

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
        this.ctx.fillText("GAME OVER", 100, 100)

        this.enemies = [];
        // this.enemies2 =[];
        this.player = new Player(ctx);
        // pongo el array vacio this.enemies =[ ] 
        // y el player lo vuelvo a crear, por lo tanto el player aparece en el punto inicial
  


      }

      checkCollisionsBullets(){
        this.player.bullets.forEach((bullet) => {
          this.enemies.forEach(enemy =>{
            
            if (bullet.collidesBullets(enemy)){
              enemy.alive = false
              console.log('hit')
            }
          })
          
        });

        
    }

  //   checkCollisionsBullets2(){
  //     this.player.bullets.forEach((bullet) => {
  //       this.enemies2.forEach(enemy2 =>{
          
  //         if (bullet.collidesBullets2(enemy2)){
  //           enemy2.alive = false
  //           console.log('hit')
  //         }
  //       })
        
  //     });

      
  // }
        
          
  }