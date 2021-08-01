# 第二章 基本形状的绘制

> 1.矩形
```
    1.strokeRect(x,y,w,h)
    2.fillRect(x,y,w,h)
    3.clearRect(x,y,w,h)
```

> 2.渐变
```
    1.线性渐变
        createLinerGradient(x0,y0,x1,y1)
    2.径向渐变 --指定径向渐变两个圆的位置
        createRadialGradient(x0,y0,r0, x1,y1,r1)
```
> 3.图案 --使用图案对图形和文本进行描边与填充 可以为image、canvas、video元素
```
    createPattern(图片|video|canvas,'repeat'|'repeat-x'|'repeat-y'|'no-repeat')
```
> 4.阴影
```
    shadowColor:''
    shadowOffsetX:''
    shadowOffsetY:''
    shadowBlur:'' 
```
> 5.路径、填充
```
    beginPath()
    closePath() // 手动闭合路径
    fill() //填充
    stroke() //描边
    arc(x,y,r,sAngle,eAngle,顺时针=false) //增加一段圆弧或圆形 默认是顺时针
    rect(x,y,w,h) // 按照封闭,顺时针创建的
    非零环绕原则--任一区域向外面划线
```
> 6.子路径
```
    beginPath() 会开启一段新的路径 会将当前路径中所有子路径清除掉
```

> 7.线段
```
    moveTo(x,y)
    lineTo(x,y)
    线段与像素边界 如果在像素边界处绘制一条1像素宽的垂直线段，那么canvas的绘图环境会将1个像素拆成两半放在两个像素中
```
> 8.线段端点与连接点
```
    lineCap-端点 默认为butt square矩形 round圆形
    lineJoin-连接点 默认为miter bevel直接连接 round 圆形连接
    miterLimit 斜线长度与线宽一半的比值 如果斜线太长 自动使用bevel连接
```

> 9.绘制圆与圆弧
```
    arc(x,y,r,开始角度，结束角度，默认false 顺时针)
    arcTo(x1,y1,x2,y2,radius) --主要是理解
    [arcTo方法的理解](https://codeplayer.vip/p/j7scu)
```
    
> 10.贝塞尔曲线
```
    quadraticCurveTo(cx,cy,x,y) 二次贝塞尔曲线 一个控制点和两个锚点  从上一点开始绘制一条二次曲线，到(x, y)为止，并且以(cx, cy)作为控制点
    bezierCurveTo(c1x,c1y,c2x,c2y,x,y) 三次贝塞尔曲线 
```

> 11.绘制多边形
```
    根据圆 获取多边形的顶点坐标 绘制
```

> 12.坐标变换
```
    translate(x,y) 平移坐标原点
    scale(scaleXX,scaleY) 坐标系缩放
    rotate(angle) 旋转坐标系 
    transform(a,b,c,d,e,f) x轴缩放 x倾斜值(tan(angle)得来) y倾斜值 y缩放 x移动 y移动  效果是叠加的
    setTransform(a,b,c,d,e,f) 先恢复到单位矩阵 然后在使用相同参数的transform效果 --注意旋转与错切公式的推导
    resetTransform() 清空所有变换效果
        [坐标旋转公式的推导]https://blog.csdn.net/qq_36424540/article/details/81347920
```

> 13.图像合成
```
    ctx.globalCompositeOperation 属性
    <!-- 取值 -->
    source-atop --聚光效果
    source-in
    source-out
    source-over
    destination-atop
    destination-in
    destination-out
    destination-over
    lighter --放大镜效果
    copy
    xor
```

> 14.剪辑区域
```
    clip() 将剪辑区域设置为当前剪辑区域与当前路径的交集,第一次调用时剪辑区域与画布大小相同
    需要整理clip的一些骚操作
```
# 第三章 文本
    
> 1.文本
```
    1.属性
        字形设置 font 必须按照列表顺序
        textAlign 水平方向的对齐方式 取值为 start center end left right dir属性为ltr时start=left dir为rtl时start=right
        textBaseline 竖直方向的对齐方式 取值为 top bottom middle alphabetic(默认值) ideographic hanging 

    2.方法
        fillText(text,x,y) 填充文本
        strokeText(text,x,y) 文本描边
            1)第四个可选参数 设置文本的最大宽度
        measureText(text) 获取文本的宽度 需要先设置好font 根据字型计算宽度 不一定精确
```

# 第四章 图像与视频

1.方法
drawImage() 绘制图像 可以绘制图像 视频 canvas
    - s代表原图像 d代表目标canvas
    - drawImage(img,dx,dy) 绘制整幅图
    - drawImage(img,dx,dy,dw,dh) 进行缩放
    - drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh) 将一部分绘制并进行缩放

getImage(sx,sy,sw,sh) 获取图像的像素信息
    -返回imageData对象的属性
     - width以设备像素为单位的图像数据宽度
     - height以设备像素为单位的图像数据高度
     - data 包含各个设备像素数值的数组

putImage(imgData,dx,dy,dirtyX,dirtyY,dirtyW,dirtyH)
    - dx,dy 绘制的图像距离canvas的偏移量
    - dirtyX,dirtyY,dirtyW,dirtyH 以设备像素比为单位   设备像素比为imgData.width/canvas.width  使用时需要将自己设置的单位*(canvas.width/imgData.width)转换为在canvas中的单位

createImageData(w,h) 
    - 创建imageData对象 单位是css像素

滤镜(整理一下几个滤镜的算法) 
     负片滤镜
     黑白滤镜
     浮雕滤镜
     墨镜滤镜

# 第五章 动画
1.requestAnimationFrame 实现连续的动画
2.帧速率(fps-每秒执行的帧数) = 1000/(时间差)
3.基于时间的运动 pixel = v(pexel/t)*s(1/fps-每帧用的时间)
4.背景恢复技术 全部擦除 剪辑区 图块复制
5.视差动画 通过坐标系移动和不同的速度实现（基于时间的运动）

# 第七章 物理效果
1.重力

2.时间轴扭曲函数

3.时间轴扭曲运动