
import StopWatch from './StopWatch.mjs'
const AnimationTimer = function(duration){
    this.duration = duration // 持续时间
}

AnimationTimer.prototype = {
   stopWatch: new StopWatch(),
   start:function(){    
        this.stopWatch.start()
   },
   stop:function(){
        this.stopWatch.stop()
   },
   getElapsedTime:function(){
        const elapsedTime = this.stopWatch.getElapsedTime()
        if(this.stopWatch.running) {
            return elapsedTime
        }
        return undefined
   },
   isRunning:function(){
        return this.stopWatch.isRunning()
   },
   isOver(){
       return this.stopWatch.getElapsedTime() > this.duration
   }
}

export default AnimationTimer