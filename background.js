class Background {
    constructor(ctx) {
        this.ctx = ctx
        this.x = -1
        this.y = -1
        this.vx =-2
        this.w = this.ctx.canvas.width * 6
        this.h = this.ctx.canvas.height
        this.img = new Image()
        this.img.src = './img/backgs.png'
        this.img3 = new Image()
        this.img3.src = './img/hillsw.png'
    }

    draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.ctx.drawImage(this.img, this.x + this.w, this.y, this.w, this.h);
    this.ctx.drawImage(this.img3, this.x, this.y, this.w , this.h);
    this.ctx.drawImage(this.img3, this.x, this.y, this.w , this.h);
    }

    move() {
    this.x += this.vx
    if(this.x <= -this.w){
        this.x= 0
    }
    }
}