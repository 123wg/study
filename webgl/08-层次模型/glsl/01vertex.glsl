attribute vec4 a_Position; // 位置
uniform mat4 u_MvpMatrix;// 模型视图投影矩阵
uniform vec3 u_LightDirection;// 平行光方向
uniform vec3 u_LightColor;// 光照颜色
attribute vec4 a_Normal;// 法向量
uniform mat4 u_NormalMatrix;// 逆转置矩阵
attribute vec4 a_Color;
varying vec4 v_Color;
void main(){
    gl_Position = u_MvpMatrix * a_Position;
    vec3 normal  = normalize(vec3(u_NormalMatrix * a_Normal)); // 法向量归一化
    float nDot = max(dot(u_LightDirection,normal),0.0);
    vec3 diffuse = u_LightColor * nDot * vec3(a_Color);
    v_Color = vec4(diffuse,a_Color.a);
}