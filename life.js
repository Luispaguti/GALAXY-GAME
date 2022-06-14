class Life {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = this.ctx.canvas.width; 
        this.y = Math.random()* this.ctx.canvas.height
        this.w = 0.05 * this.ctx.canvas.width
        this.h = 0.1 * this.ctx.canvas.height
        this.vx = -3
        this.vy = 0
        this.g = 0.4
        this.alive = true
        this.type = Math.floor(Math.random() * 101)
        this.img = new Image()
        this.img.src = './img/life4.png'
        this.img1 = new Image()
        this.img1.src = './img/life3.png'
        this.img2 = new Image()
        this.img2.src = './img/life1.png'
    }
    
    draw () {
        if (this.type % 10 === 0 ) {
        this.ctx.drawImage(
            this.img,
            0,
            0,
            this.img.width,
            this.img.height,
            this.x,
            this.y - 200,
            60,
            -50
            )
        }else if(this.type % 2 === 0 ) {
            this.ctx.drawImage( 
            this.img1,
            0,
            0,
            this.img1.width,
            this.img1.height,
            this.x,
            this.y - 200,
            60,
            -50
            )
        } else {
            this.ctx.drawImage( 
                this.img2,
                0,
                0,
                this.img2.width,
                this.img2.height,
                this.x,
                this.y - 200,
                60,
                -50
                )
        }
    }

    move() {
        this.x += this.vx
        this.y += this.vy
        this.vy += this.g
        if (this.y + this.h >= this.ctx.canvas.height){
            this.y = this.ctx.canvas.height - this.h
            this.vy *= 0
        } 
    }
         
    isVisible(){
        return this.x + this.w > 0;
    }

    collides(player) {
        const colX = this.x <= player.x + player.w && this.x +this.w-5 > player.x;
        const colY = this.y + this.h-200 > player.y && this.y-200 < player.y + player.h;
        return colX && colY;
    }

    hit() {
        this.score.doc();
      }
}
