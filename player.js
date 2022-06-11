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
    // para pasar de nivel
  
    this.img = new Image()
    this.img.src = './img/spriteStandRight2.png'
    this.img1 = new Image()
    this.img1.src = './img/spriteRunRight3.png'
    this.img3 = new Image()
    this.img3.src = './img/spriteRunLeft2.png'

    this.audio = new Audio ("audio/jump.wav")
    this.frames = 0 // esto va a representar en que cuadro nos encontramos actualmente de nuestra animación.

    this.sprites = {
      stand: {
        right: this.img,
        cropWidth : 177, //ancho del recorte de la imagen
        width: 66
      },
      run: {
        right:  this.img1 ,
        left : this.img3,
        cropWidth : 341, // ancho del recorte de la imagen
        width : 127.875 
      }
    }

    this.currentSprite = this.sprites.stand.right
    // sprite actual va ser igual por defecto a sprite.stand.right, de forma predeterminada.
    this.currentCropWidth = 177
    // es el ancho de la imagen

  
    }
  
    draw() {
      // this.ctx.fillRect(this.x, this.y, this.w, this.h)
      this.frames ++
      this.ctx.drawImage(
        this.currentSprite,
        this.currentCropWidth * this.frames,
        0,// sy
        this.currentCropWidth,//ancho de la imagen
        400,// alto de la imagen
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
    // this.bullets = this.bullets.filter((b) => b.collidesBullets(enemy));
    
    // para filtrar balas
    
    // this.bullets = this.bullets.filter((b) => b.collidesBullets(enemy));
    // para intentar filtrar las balas
    // this.bullets = this.bullets.filter((e) => {
    //   if (e.collides(this.enemy)) {
    //     return false;
    //   }

    //   return true;
    // });

    // plataforma, desaparecen los enemigos
      if (this.x + this.w >= this.ctx.canvas.width) {
        this.x = this.ctx.canvas.height - this.w + 900 
        // 400 para que se ajuste al ancho del canvas, ya que la imagen esta duplicada
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

      // if (this.y + this.h <= this.ctx.canvas.height)
      //       {this.vy}
      // else ( this.vy *= 0)

      // }
          if (this.y + this.h >= this.ctx.canvas.height){
          this.y = this.ctx.canvas.height - this.h
          this.vy *= 0
      }

      this.score.move();


    
      }


      
    

    //   if (this.y + this.h >= 0.8 * this.ctx.canvas.height && this.x + this.w >= 0.2 * this.ctx.canvas.width ){
    //     this.y = 0.8 * this.ctx.canvas.height - this.h
    //     this.x = 0.2 * this.ctx.canvas.height - this.w + 200
    //     this.vy *= 0
    //     // this.vx *= 0
    // } else {
    //   this.g

    // PLATAFORMA

    // }

    // if (this.x + this.w >= 0.2 * this.ctx.canvas.width) {
    //   this.x = 0.2 * this.ctx.canvas.height - this.w + 400
    //   // 400 para que se ajuste al ancho del canvas, ya que la imagen esta duplicada
    //     this.vx *= 0
    // }



      // if (this.y <= Platform.y + Platform.h) {
      //   console.log('tocando')
      // }
  
      // // if (this.y + this.h <= platform.y){
      // //   this.y = platform.y - this.h
      // //   this.vy = 0
      // //   this.g = 0
  
      // // }
      
    

    keyDown(key) {


        if (key === TOP && this.vy === 0) {
            this.vy = -15;
            this.audio.play();
          }
      
          if (key === RIGHT) {
            this.scrollOffset += 5;
            this.vx = 3;
            this.currentSprite = this.sprites.run.right
            // si pulsas la tecla de la derecha el sprite actual del jugador será ese.
            this.currentCropWidth = this.sprites.run.cropWidth
            // el ancho actual de la imagen va a ser igual a esto.
            this.width = this.sprites.run.width 
            
          }
      
          if (key === LEFT) {
            this.scrollOffset -= 1
            this.vx = -4;
            this.currentSprite = this.sprites.run.left
            // si pulsas la tecla de la derecha el sprite actual del jugador será ese.
            this.currentCropWidth = this.sprites.run.cropWidth
            // el ancho actual de la imagen va a ser igual a esto.
            this.width = this.sprites.run.width
          }

          if(this.scrollOffset > 20){
            console.log('you win')
          }

         
        // if (key === TOP){
        //     this.ay = -0.2
        // }

        // if (key === RIGHT) {
        //     this.ax = 0.1
        // }

        // if (key === LEFT) {
        //     this.ax = -0.1
        // }

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
            //para que al soltar permanezca con el sprite de quieto
          }



        //   NO LO ENTIENDO
        // if (key === TOP){
        //     this.ay = 0
        // }

        // if (key === RIGHT){
        //     this.ay = 0
        // }

        // if (key === LEFT){
        //     this.ay = 0
        // }
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
  }