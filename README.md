# 第二章

## 1.绘制线条、弧形、圆、曲线、多边形
    > 矩形
        1.strokeRect(x,y,w,h)
        2.fillRect(x,y,w,h)
        3.clearRect(x,y,w,h)

    > 渐变
        1.线性渐变
            createLinerGradient(x0,y0,x1,y1)
        2.径向渐变 --指定径向渐变两个圆的位置
            createRadialGradient(x0,y0,r0, x1,y1,r1)

    > 图案 --使用图案对图形和文本进行描边与填充 可以为image、canvas、video元素
        1.创建图案
            createPattern(图片|video|canvas,'repeat'|'repeat-x'|'repeat-y'|'no-repeat')

    > 阴影
            shadowColor:''
            shadowOffsetX:''
            shadowOffsetY:''
            shadowBlur:'' 

    > 路径、填充
        beginPath()
        closePath() // 手动闭合路径
        fill() //填充
        stroke() //描边
        arc(x,y,r,sAngle,eAngle,顺时针=false) //增加一段圆弧或圆形 默认是顺时针
        rect(x,y,w,h) // 按照封闭,顺时针创建的
        非零环绕原则--任一区域向外面划线

    > 子路径
        beginPath() 会开启一段新的路径 会将当前路径中所有子路径清除掉
    > 线段
        moveTo(x,y)
        lineTo(x,y)
        线段与像素边界 如果在像素边界处绘制一条1像素宽的垂直线段，那么canvas的绘图环境会将1个像素拆成两半放在两个像素中
    > 线段端点与连接点
        lineCap-端点 默认为butt square矩形 round圆形
        lineJoin-连接点 默认为miter bevel直接连接 round 圆形连接
        miterLimit 斜线长度与线宽一半的比值 如果斜线太长 自动使用bevel连接

    > 绘制圆与圆弧
        arc(x,y,r,开始角度，结束角度，默认false 顺时针)
        arcTo(x1,y1,x2,y2,radius)
        [arcTo方法的理解](https://codeplayer.vip/p/j7scu)
    
    > 贝塞尔曲线
        quadraticCurveTo(cx,cy,x,y)平方贝塞尔曲线(两个锚点一个控制点) 
        立方贝塞尔曲线(两个锚点两个控制点)

        
## 2.设置图形的属性
## 3.绘制圆角矩形
## 4.绘制贝塞尔曲线
## 5.绘制虚线
## 6.使用纯色、渐变背景对图形描边 填充
## 7.使用阴影效果模拟具有深度的立体图形效果
## 8.使用"剪辑区域"擦除图形与文本
## 9.实现橡皮筋辅助线技术 让用户 交互式的绘图
## 10.在canvas中拖动图形对象
## 11.坐标系统的变换