class Platform {
    constructor (ctx) {
    this.ctx = ctx;
    this.x = 0.2* this.ctx.canvas.width
    this.y= 0.8* this.ctx.canvas.height
    this.w =200
    this.h = 20
    this.vx = -3
    }

    draw() {
        const preStyle =this.ctx.fillStyle;
        this.ctx.fillStyle ="blue"
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
        this.ctx.fillStyle = preStyle
    }
    move() {
        this.x += this.vx

    
    }
}