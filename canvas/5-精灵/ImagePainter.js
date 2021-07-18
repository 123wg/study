    // 图像绘制器
    const ImgPainter = function(imgUrl) {
        this.image = new Image()
        this.image.src = imgUrl
    }
    ImgPainter.prototype = {
        paint:function(sprite,context) {
            if(this.image.complete) {
                context.drawImage(this.image,sprite.left,sprite.top,sprite.width,sprite.height)
            }
        }
    }