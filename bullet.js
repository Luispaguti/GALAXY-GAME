class Bullet {
    constructor(ctx, x, y){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = 7;
        this.g = 0.1;
        this.vx = 10;
        this.vy = 0;
        const audio = new Audio ("audio/shoot.wav");
        audio.play();
    }

    draw() {
        const prevColor = this.ctx.fillStyle
        const prevShadow = this.ctx.shadowOffsetX
        const prevShadowColor = this.ctx.shadowColor
        this.ctx.fillStyle = '#FFCC33'
        this.ctx.shadowColor = 'red';
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
        this.x += this.vx;
        this.y += this.vy;

    }

    isVisible() {
        return this.x < this.ctx.canvas.width;
    }

    collidesBullets(enemy) {
        const collX = this.x <= enemy.x + enemy.w && this.x + this.r > enemy.x;
        const collY = this.y + this.r > enemy.y-15 && this.y <enemy.y-15 + enemy.h;
        return collX && collY;
    }
}

