class Record {
    constructor(ctx) {
        this.ctx = ctx
        this.scrollOffSet = 0
        this.x = 1350
        this.y = this.ctx.canvas.height * 0.1;
        this.w = 100;
        this.h = 50;
       
       
       
     this.total = 1;

    }
     

       

    

    draw(){
        const prevLine = this.ctx.lineWidth
        const prevStyle =  this.ctx.fillStyle 
        const prevStroke =  this.ctx.strokeStyle
        this.ctx.font = " 800 30px Calibri";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.scrollOffSet, 1400, 100);
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 5
        this.ctx.strokeRect(1380, 65, 100, 50)
        this.ctx.lineWidth = prevLine
        this.ctx.fillStyle = prevStyle
        this.ctx.strokeStyle = prevStroke 
    } 

    move(){}
    plus() {
        this.total += 1
    }
}