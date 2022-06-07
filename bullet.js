class Bullet {
    constructor(ctx, x, y){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = 5;
        this.g = 0.1;
        

        this.vx = 10;
        this.vy = 0

        const audio = new Audio ("audio/shoot.wav");
        audio.play();

        // this.img = new Imagen()
        // this.img.src ='./img/bullets.png'
    }

    draw() {
        this.ctx.fillStyle = 'yellow'
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI*2)
        this.ctx.fill()
        this.ctx.closePath()
    }

    move(){
        this.vy += this.g;
        this.x += this.vx;
        this.y += this.vy;
    }

    isVisible() {
        return this.x < this.ctx.canvas.width;

        // this.x = centro de la bala
    }

    collidesBullets(enemy) {
        const collX = this.x <= enemy.x + enemy.w && this.x + this.r > enemy.x;
        const collY = this.y + this.r > enemy.y && this.y <enemy.y + enemy.h;

        return collX && collY;
        // devuelve true si colisiona con un enemigo y false si no lo hace

    }


}

