const PI2 = Math.PI * 2;
var star = new Image();
star.src = "images/star.png";

export class GlowParticle {
    constructor(x, y, radius) {
        this.x = x - 500;
        this.y = y - 500;
        this.radius = radius;

        this.xspeed = Math.random() * 1;
        this.yspeed = Math.random() * 3;

        this.vx = this.xspeed;
        this.vy = this.yspeed;
        
        this.sinValue = Math.random();
        this.createsnow = Math.random() * 4;
    }

    animate(ctx, stageWidth, stageHeight) {
        this.sinValue += 0.002;
        this.x += Math.sin(this.sinValue);

        this.x += this.vx;
        this.y += this.vy;

        if(this.x > stageWidth + this.radius || this.y > stageHeight + this.radius) {
            if( this.createsnow < 4 ) {
                this.x = Math.random() * stageWidth;
                this.y = -500; 
                this.vx = this.xspeed;
                this.vy = this.yspeed;
                this.createsnow++;
            } else {
                this.x = -500;
                this.y = Math.random() * (( stageHeight / 2 ) - 500); 
                this.vx = this.xspeed;
                this.vy = this.yspeed;
                this.createsnow = 0;
            }
        }

        ctx.beginPath();
        ctx.fillStyle = '#f00';
        // ctx.drawImage(star, this.x, this.y);
        ctx.arc(this.x, this.y, this.radius, 0, PI2);
        ctx.fill();
        ctx.closePath();
    }
}