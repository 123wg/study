/**
* @Description: 自己建造的精灵对象
* @Author: wanggang
* @Date: 2021-07-11 22:17:26
**/


/**
*@description:
*@param{name} String
*@param{painter} Object 绘制器
*@param{behaviors} Array 行为数组
*@return:
*/

var Sprite = function(name,painter,behaviors){
    if(name) this.name = name
    if(painter) this.painter = painter

    this.top = 0
    this.left = 0
    this.width = 10
    this.height = 10
    this.velocityX = 0 // 水平方向速度
    this.velocityY = 0
    this.visible = true
    this.animating = false // 是否正在执行动画 后面的精灵动画制作器中会用到
    this.behaviors = behaviors || []
    return this
}

Sprite.prototype = {
    paint:function(ctx) {
        if(this.painter && this.visible) {
            this.painter.paint(this,ctx)
        }
    },
    update:function(ctx,time) {
        for(let i = 0;i<this.behaviors.length;i+=1) {
            this.behaviors[i].execute(this,ctx,time)
        }
    }
}
