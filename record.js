class Record {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 1350
        this.y = this.ctx.canvas.height * 0.1;
        this.w = 100;
        this.h = 50;

        this.total = 1;

    }

    draw(){
        // this.player.scrollOffset
    
    }

    move (){}

    plus () {
        this.total += 1
    }
}