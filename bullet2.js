class Bullet2 {
    constructor(ctx, x, y){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = 7;
        this.g = 2;
        this.vx = -10;
        this.vy = 0
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
    }

    collidesBullets(player) {
        const collX = this.x <= player.x + player.w && this.x + this.r > player.x;
        const collY = this.y + this.r > player.y-15 && this.y <player.y-15 + player.h;
        return collX && collY;
    }
}

