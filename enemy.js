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
        this.level = 0;

         this.audio = new Audio ("audio/monster.wav");
       
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
            this.audio.play();
            // this.level+=1
            // if (this.level > 500 && this.level < 1000){
            //     this.vx+= - 1
                
            //     }
            //     if (this.level > 1000 && this.level < 2000){
            //         this.vx+= -2
            //     }
            //     if (this.level > 2000 && this.level < 3000){
            //         this.vx+= -3
            //     }
            //     if (this.level > 4000 && this.level < 5000){
            //             this.vx+= -4
            //     }
            //     if (this.level > 4000){
            //         this.vx+= -5
            //     }
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
            
            // this.level+=0.5
            // console.log(this.level)
            // if (this.level > 50 && this.level < 60){
            //     this.vx+= -1
            //     console.log('level 1')
            //     }
            //     else if (this.level > 60 && this.level < 70){
            //         this.vx+= -2
            //     }
            //     else if (this.level > 70 && this.level < 80){
            //         this.vx+= -3
            //     }
            //     else if (this.level > 90 && this.level < 100){
            //             this.vx+= -4
            //     }
            //     else (this.level > 100)
            //         this.vx+= -5
            

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
            // this.level+=1
            // if (this.level > 500 && this.level < 1000){
            //     this.vx+= -1
            //     console.log('nivel 1')
                
            //     }
            //     if (this.level > 1000 && this.level < 2000){
            //         this.vx+= -2

            //     }
            //     if (this.level > 2000 && this.level < 3000){
            //         this.vx+= -3
            //     }
            //     if (this.level > 3000 && this.level < 4000){
            //             this.vx+= -4
            //     }
            //     if (this.level > 4000){
            //         this.vx+= -5
            //         console.log('nivel 5')
            //     }

        } 

        
        
            // if (this.level > 0 && this.level < 20){
            // this.vx+= -0.1
            // this.ctx.font = '50px serif';
            // this.ctx.fillText('level 1', 50, 90);
            // }
            // if (this.level > 20 && this.level < 30){
            //     this.vx+= -0.2
            // }
            // if (this.level > 40 && this.level < 60){
            //     this.vx+= -0.3
            // }
            // if (this.level > 60 ){
            //         this.vx+= -0.4
            // }

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
    level1(){
        console.log("¨MAMAHUE")
        this.vx += -5 
       
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