attribute vec4 a_Position; // 位置
uniform mat4 u_MvpMatrix;// 模型视图投影矩阵
attribute vec4 a_Color;
varying vec4 v_Color;
void main(){
    gl_Position = u_MvpMatrix * a_Position;
    v_Color = a_Color;
}