class Player {
    constructor(ctx) {
      this.ctx = ctx;
      this.x = 100;
      this.y = 100;
      this.w = 76;
      this.h = 150;
      this.vx = 0;
      this.vy = 0;
      this.g = 0.4;
      this.ay = 0;
      this.ax = 0;
      this.bullets = []
      this.score = new Score(ctx)
      this.scrollOffset = 0;
      this.img = new Image()
      this.img.src = './img/spriteStandRight2.png'
      this.img1 = new Image()
      this.img1.src = './img/spriteRunRight3.png'
      this.img3 = new Image()
      this.img3.src = './img/spriteRunLeft2.png'
      this.audio = new Audio ("audio/jump.wav")
      this.frames = 0 
      this.sprites = {
      stand: {
        right: this.img,
        cropWidth : 177, 
        width: 66
      },
      run: {
        right:  this.img1 ,
        left : this.img3,
        cropWidth : 341,
        width : 127.875 
      }
      }
      this.currentSprite = this.sprites.stand.right
      this.currentCropWidth = 177

    }
  
    draw() {
      this.frames ++
      this.ctx.drawImage(
        this.currentSprite,
        this.currentCropWidth * this.frames,
        0,
        this.currentCropWidth,
        400,
        this.x,
        this.y,
        this.w,
        this.h
      )
      if (this.frames> 59 && (this.currentSprite === this.sprites.stand.right || 
        this.currentSprite === this.sprites.stand.left))
        {this.frames = 0}
      else if(this.frames> 29 &&
        (this.currentSprite === this.sprites.run.right||
        this.currentSprite === this.sprites.run.left)) 
        {this.frames = 0}
      this.bullets.forEach(bullet => {
          bullet.draw()
      })
      this.score.draw();
    }
  
    move() {
      this.vy += this.ay;
      this.vy += this.g;
      this.vx += this.ax;
      this.x += this.vx;
      this.y += this.vy;
      this.bullets.forEach(bullet => {
        bullet.move()
      })
      this.bullets = this.bullets.filter((b) => b.isVisible());
      if (this.x + this.w >= this.ctx.canvas.width) {
        this.x = this.ctx.canvas.height - this.w + 900 
        this.vx *= 0
      }
      if (this.x < 0){
        this.x = this.ctx.canvas.height - this.w -535
        this.vx *= 0
      }
      if (this.y < 0) {
        this.y = 0
        this.vy *= 0
      }
      if (this.y + this.h >= this.ctx.canvas.height){
        this.y = this.ctx.canvas.height - this.h
        this.vy *= 0
      }
      this.score.move();
    }

    keyDown(key) {
      if (key === TOP && this.vy === 0) {
            this.vy = -15;
            this.audio.play();
      }
      if (key === RIGHT) {
            this.scrollOffset += 5;
            this.vx = 3;
            this.currentSprite = this.sprites.run.right
            this.currentCropWidth = this.sprites.run.cropWidth
            this.width = this.sprites.run.width    
      }
      if (key === LEFT) {
            this.scrollOffset -= 1
            this.vx = -4;
            this.currentSprite = this.sprites.run.left
            this.currentCropWidth = this.sprites.run.cropWidth
            this.width = this.sprites.run.width
      }

      if(this.scrollOffset > 20){
      }

      if (key === 32) {
            this.shoot()
      }

    }
    keyUp(key) {
      if (key === RIGHT || key === LEFT) {
        this.vx = 0;
        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = this.sprites.stand.cropWidth
        this.width = this.sprites.stand.width
      }

    }

    shoot(){
      const bullet = new Bullet(
        this.ctx, 
        this.x + this.w, 
        this.y + this.h - 100)
        this.bullets.push(bullet)
    }

    hit() {
      this.score.dec();
    }
    
    hitLife(){
      this.score.doc();
    }

    isAlive() {
      return this.score.total > 0;
    }

    collides(player) {
      const colX = this.x <= player.x + player.w-5 && this.x +this.w > player.x;
      const colY = this.y + this.h > player.y && this.y < player.y + player.h;
      return colX && colY;
    }
  }