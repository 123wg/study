/**
* @Description: 秒表对象 提供播放动画时的计时功能
* @Author: wanggang
* @Date: 2021-07-14 20:28:34
**/


/**
 *1.秒表开始
  2.结束
  3.重置
  4.判断是否正在运行
  5.获取已经运行的时间
 */
const StopWatch = function(){}

StopWatch.prototype = {
    startTime:0, // 开始时间
    running:false, // 是否正在运行
    elapsed:undefined, // 已经运行的时间
    start:function(){
        this.startTime = +new Date()
        this.elapsed = undefined
        this.running = true
    },
    stop:function(){
        this.elapsed = (+new Date()) - this.startTime
        this.running = false
    },
    isRunning:function(){
        return this.running
    },
    reset:function(){
        this.elapsed = 0
    },
    getElapsedTime:function(){
        if(this.running) {
            return (+new Date) - this.startTime
        }else{
            return this.elapsed
        }
        
    }

}