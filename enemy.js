class Enemy {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = this.ctx.canvas.width; 
        // porque van a aparecer por cualquier sitio de la derecha
        this.y = Math.random() * this.ctx.canvas.height
        this.w = 0.05 * this.ctx.canvas.width
        this.h = 0.1 * this.ctx.canvas.height
        this.vx = -3
        this.vy = 0
        this.g = 0.4
        this.alive = true
        this.type = Math.floor(Math.random() * 101) 
        this.img = new Image()
        this.img.src ='./img/greenenemy.png'

        this.img2 = new Image()
        this.img2.src ='./img/enemis.png'

        this.img3 = new Image()
        this.img3.src ='./img/enemy6.png'

        this.bullets = []
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
                this.y + 70,
                400,
                // this.w * 4,
                // this.h * -4,
                -400
            )
        } 
        else if(this.type % 2 === 0 ) {
            this.ctx.drawImage(
                this.img2,
                0,
                0,
                this.img2.width,
                this.img2.height,
                this.x,
                this.y,
                100,
                // this.w * 4,
                // this.h * -4,
                -100
            )
        } else {
            
            this.ctx.drawImage(
                this.img3,
                0,
                0,
                this.img3.width,
                this.img3.height,
                this.x,
                this.y + 90,
                200,
                // this.w * 4,
                // this.h * -4,
                -200
            )

        } 
        this.bullets.forEach(bullet => {
            bullet.draw()
        })
}

        
        
        
    move() {
        this.x += this.vx
        this.y += this.vy
        this.vy += this.g

        if (this.y + this.h >= this.ctx.canvas.height){
            this.y = this.ctx.canvas.height - this.h
            this.vy *= 0
        }
        
        this.bullets.forEach(bullet => {
            bullet.move()
        })

        

        if (this.type % 10 === 0){
            this.shoot()
        }
        
    }
    isVisible(){
        return this.x + this.w > 0;
    
    }

    shoot(){
        const bullet = new Bullet2(
            this.ctx, 
            this.x + this.w, 
            this.y + this.h - 100)
          this.bullets.push(bullet)
    }

    collides(player) {
        const colX = this.x <= player.x + player.w-5 && this.x +this.w > player.x;
        // - 5 para ajustar la colision
       
        const colY = this.y + this.h > player.y && this.y < player.y + player.h;
 
        return colX && colY;
        
        // if (colX && colY){
        //     console.log('colision')
        // devuelve true si colisiona con un enemigo y false si no lo hace
    }

         

}