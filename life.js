class Life {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = this.ctx.canvas.width; 
        // porque van a aparecer por cualquier sitio de la derecha
        this.y = Math.random()* this.ctx.canvas.height
        this.w = 0.05 * this.ctx.canvas.width
        this.h = 0.1 * this.ctx.canvas.height
        this.vx = -3
        this.vy = 0
        this.g = 0.4
        this.alive = true

        this.img = new Image()
        this.img.src = './img/life1.png'

       
    }
    
    draw () {
            this.ctx.drawImage(
                this.img,
                0,
                0,
                this.img.width,
                this.img.height,
                this.x,
                this.y - 200,
                50,
                // this.w * 4,
                // this.h * -4,
                -40
            )
            

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
        // - 5 para ajustar la colision
       
        const colY = this.y + this.h > player.y && this.y < player.y + player.h;
 
        return colX && colY;
        
        // if (colX && colY){
        //     console.log('colision')
        // devuelve true si colisiona con un enemigo y false si no lo hace
    }
    hit() {
        this.score.doc();
      }
         

}