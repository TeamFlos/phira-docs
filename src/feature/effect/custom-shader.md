# 自行编写着色器

用于特效的着色器是片元着色器。你可以自行编写着色器并将其附加于谱面压缩包中。在 `shader` 字段，你需要填写 `/shader路径`。注意这里的 `/` 是必不可少的，它将内置着色器和自定义着色器区分开来。

为保证兼容性，着色器版本要求为 GLSL 1.00。

## 内置变量

prpr 为着色器内置了如下变量：

```glsl
varying vec2 uv; // 材质 UV
uniform vec2 screenSize; // 屏幕大小（注意是整个屏幕，并不只是谱面部分）
uniform sampler2D screenTexture; // 屏幕材质（同样也是整个屏幕的材质）
uniform float time; // 谱面时间，以秒为单位
```

还有一些变量是虽然存在，但在片元着色器中使用无意义的。在定义自己的变量时，你应该避免与它们重名：

```glsl
uniform mat4 Model;
uniform mat4 Projection;
uniform vec2 UVScale;
```

## 着色器变量

为了在谱面中可以指定参数，你需要这样定义你的着色器 `uniform` 变量：

```glsl
uniform type name; // %def%
```

其中 `type` 为类型，目前支持 `float`、`vec2` 和 `vec4`；`name` 为变量名；`def` 为默认值。三个都是不可缺少的。

## 示例

下面的示例着色器将会根据 `factor` 的值给屏幕叠加上强弱不等的红色：

```glsl
#version 100
precision mediump float;

varying lowp vec2 uv;
uniform sampler2D screenTexture;

uniform float factor; // %0.5% 0..1

void main() {
  gl_FragColor = mix(texture2D(screenTexture, uv), vec4(1.0, 0.0, 0.0, 1.0), factor);
}
```
