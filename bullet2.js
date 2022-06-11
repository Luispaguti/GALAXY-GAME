class Bullet2 {
    constructor(ctx, x, y){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = 7;
        this.g = 0.3;
        

        this.vx = -10;
        this.vy = 0

        // const audio = new Audio ("audio/shoot.wav");
        // audio.play();


        // this.img = new Imagen()
        // this.img.src ='./img/bullets.png'
    }

    draw() {
        const prevColor = this.ctx.fillStyle
        const prevShadow = this.ctx.shadowOffsetX
        const prevShadowColor = this.ctx.shadowColor
        this.ctx.fillStyle = '#66FF66'
        this.ctx.shadowColor = 'yellow';
        this.ctx.shadowOffsetX = 12;
        this.ctx.shadowBlur = 10;
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI*2)
        this.ctx.fill()
        this.ctx.closePath()
        this.ctx.shadowOffsetX = prevShadow
        this.ctx.fillStyle = prevColor
        this.ctx.shadowColor = prevShadowColor
    }

    move(){
        this.vy += this.g;
        this.x += this.vx - 20;
        this.y += this.vy;

    }

    isVisible() {
        return this.x < this.ctx.canvas.width;

        // this.x = centro de la bala
    }


    

    collidesBullets(player) {
        const collX = this.x <= player.x + player.w && this.x + this.r > player.x;
        const collY = this.y + this.r > player.y-15 && this.y <player.y-15 + player.h;

        return collX && collY;
        // console.log('colision')
        // devuelve true si colisiona con un enemigo y false si no lo hace

    }


}

