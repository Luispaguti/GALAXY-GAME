class Score {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 20;
        this.y = this.ctx.canvas.height * 0.1;
        this.w = 200;
        this.h = 20;
        this.total = 1;
    }

    draw(){
        const prevStyle = this.ctx.fillStyle;
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.x, this.y, this.w * this.total, this.h);
        this.ctx.fillStyle = prevStyle;
    }

    move (){}

    dec () {
        this.total -= 0.10
    }

    doc () {
        this.total += 0.05
    }
}