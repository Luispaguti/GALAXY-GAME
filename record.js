class Record {
    constructor(ctx) {
        this.ctx = ctx
        this.scrollOffSet = 0
        this.x = 1350
        this.y = this.ctx.canvas.height * 0.1;
        this.w = 100;
        this.h = 50;
    }

    draw(){
        const prevLine = this.ctx.lineWidth
        const prevStyle =  this.ctx.fillStyle 
        const prevStroke =  this.ctx.strokeStyle
        this.ctx.font = "600 30px Fantasy";
        this.ctx.fillStyle = "yellow";
        this.ctx.fillText(`Score: ${this.scrollOffSet}`, 1370, 100);
        this.ctx.lineWidth = prevLine
        this.ctx.fillStyle = prevStyle
        this.ctx.strokeStyle = prevStroke   
    } 

    move(){}

    plus() {
        this.scrollOffSet += 1
    }
}