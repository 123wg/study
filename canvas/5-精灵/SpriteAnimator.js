    // 精灵动画制作器 在制作精灵动画的时候 不仅要左右移动精灵 还要频繁的轮换精灵的图片
    // 精灵动画制作器
    SpriteAnimator = function(painters,elapsedCallback) {
        this.painters = painters || []
        this.index = 0
        this.duration = 1000 // 持续时间
        this.elapsedCallback = elapsedCallback // 精灵结束时的回调
        this.startTime = 0

    }
    SpriteAnimator.prototype = {
        start:function(sprite,duration) {
            this.index = 0
            sprite.animating = true
            const endTime = + new Date() + duration
            const period = duration / this.painters.length
            let lastUpdateTime = 0
            let originalPainter = sprite.painter
            const that = this
            // 开始播放动画 因为是控制动画的 只需要轮换精灵的绘制器
            function spriteAnimatorAnimate(){
                const time = +new Date()
                console.log('执行动画');
                // 如果没超出结束时间 继续执行 否则退出
                if(time < endTime) {
                    // 超出切换的周期才需要切换
                    if(time - lastUpdateTime > period) {
                        sprite.painter = that.painters[++that.index]
                        lastUpdateTime = time
                    }
                    that.timer = window.requestAnimationFrame(spriteAnimatorAnimate)
                }else{
                    that.end(sprite,originalPainter)
                }
            }
            window.requestAnimationFrame(spriteAnimatorAnimate)
        },
        end:function(sprite,originalPainter) {
            sprite.animating = false
            if(this.elapsedCallback) this.elapsedCallback(sprite)
            else sprite.painter = originalPainter
        }
    }