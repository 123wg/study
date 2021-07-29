/**
* @Description: 支持时间扭曲函数的动画计时器
* @Author: wanggang
* @Date: 2021-07-29 20:17:50
**/
import StopWatch from "./StopWatch.mjs";
const AnimationTimer = function(duration,timeWrap) {
    if(duration) this.duration = duration
    if(timeWrap) this.timeWrap = timeWrap
    this.stopWatch=new StopWatch()
}
AnimationTimer.prototype = {
    start:function(){
        this.stopWatch.start()
    },
    end:function(){
        this.stopWatch.end()
    },
    isOver:function(){
        return this.stopWatch.getElapsedTime() > this.duration
    },
    isRunning:function(){
        return this.stopWatch.isRunning()
    },
    getElapsedTime:function(){
        const elapsedTime = this.stopWatch.getElapsedTime()
        // 计算当前流逝的时间所占百分比
        const percentComplete = elapsedTime / this.duration
        if(this.stopWatch.isRunning()) {
            if(!this.timeWrap) return elapsedTime
            return elapsedTime * this.timeWrap(percentComplete) / percentComplete
        }else {
            return undefined
        }
        
    }
}

// 常用的时间扭曲函数
// 1.缓入
AnimationTimer.makeEaseIn = function(strength) {
    return function(percentComplete) {
        return Math.pow(percentComplete,strength*2)
    }
}
// 2.缓出
AnimationTimer.makeEaseOut = function(strength) {
    return function(percentComplete) {
        return 1 - Math.pow(1 - percentComplete,strength*2)
    }
}
// 3.缓入缓出
AnimationTimer.makeEaseInOut = function() {
    return function(percentComplete){
        return percentComplete - Math.sin(percentComplete * 2 * Math.PI) / (2* Math.PI)
    }
}
// 4.弹簧运动 ？？？
AnimationTimer.makeElastic = function(passes) {
    passes = passes
    return function(percentComplete) {
        return ((1 - Math.cos(percentComplete * Math.PI * passes)) * (1 - percentComplete)) + percentComplete
    }
}
// 5.弹跳运动 ？？？
AnimationTimer.makeBounce = function(bounces) {
   const fn = AnimationTimer.makeElastic(bounces) 
   return function(percentComplete) {
       percentComplete = fn(percentComplete)
       return percentComplete <=1?percentComplete:2-percentComplete
   }
}
// 6.线性运动
AnimationTimer.makeLinear = function() {
    return function(percentComplete) {
        return percentComplete
    }
}

export default AnimationTimer;