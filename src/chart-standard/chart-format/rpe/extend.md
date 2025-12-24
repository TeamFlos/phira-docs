# 扩展参数

## attachUI
`attachUI` 是RPE独有特性，它允许你使用判定线绑定UI元素，使你可以控制UI的位置，透明度，大小等。  
属性对应UI元素列表：

|      值      |      对应UI元素      | RPE设置中对应数字 |      锚点      |                      注                      |
|:-----------:|:----------------:|:----------:|:----------:|:-------------------------------------------:|
|    pause    |       暂停按钮       |     1      |  左上角  |                      -                      |
| combonumber |       连击数        |     2      |   中心  | 绑定此UI会使此UI透明度受到Alpha事件影响，默认连击大于等于 `3` 时才会显示 |
|    combo    | 连击数下的 `combo` 文字 |     3      |   中心   |                     同上                      |
|    score    |        分数        |     4      |  右上角  |                      -                      |
|     bar     |       进度条        |     5      | 左侧中心 |      `RPE 1.4.0` 及以前，此属性绑定的为曲名左侧的白色竖条       |
|    name     |       谱面名称       |     6      |  左下角  |                      -                      |
|    level    |       谱面等级       |     7      |  右下角  |                      -                      |

- 在UI被绑定后，判定线将会自动隐藏，UI可以通过类似于子线的方式进行操作，不同的是可以操作UI角度和透明度；判定线实际位置仍然不变。

## anchor
`anchor` 是RPE独有特性，它允许你设置判定线的锚点，它的设计是为文字事件服务的。 
- 在RPE中，此设置在顶栏工具栏第二页中，两个数值用空格分割。
- 它是一个 `float[2]`，两个值对应材质的 `x` 和 `y` 坐标。
- `x` 默认为 `0.5`，即中心，`1` 时判定线纹理向左移，`0` 时判定线纹理向右移。
- `y` 默认为 `0.5`，即中心，`1` 时判定线纹理向下移，`0` 时判定线纹理向上移。
- 此字段同样可以影响自定义纹理的位置

## Texture
RPE允许设置判定线的 `Texture` 字段来修改判定线的纹理，当判定线的纹理被修改后，判定线颜色不再受到AP/FC判定线颜色指示影响。
- 若不使用[scaleXEvents](./extendEvent.md#scalexevents)和[scaleYEvents](./extendEvent.md#scaleyevents)，修改判定线纹理大小，则默认缩放为 `1`。
- 若纹理为一个GIF动图，则会受到[gifEvents](./extendEvent.md#gifevents)的影响。（`150`版本开始支持）

## easingType
`easingType` 是RPE用于对应缓动的数字标识，对照表如下：

| 值  |      对应缓动      |     注     |
|:--:|:--------------:|:---------:|
| 1  |     Linear     |     -     |
| 2  |    Out Sine    |     -     |
| 3  |    In Sine     |     -     |
| 4  |    Out Quad    |     -     |
| 5  |    In Quad     |     -     |
| 6  |  In Out Sine   |     -     |
| 7  |  In Out Quad   |     -     |
| 8  |   Out Cubic    |     -     |
| 9  |    In Cubic    |     -     |
| 10 |   Out Quart    |     -     |
| 11 |    In Quart    |     -     |
| 12 |  In Out Cubic  |     -     |
| 13 |  In Out Quart  |     -     |
| 14 |   Out Quint    |     -     |
| 15 |    In Quint    |     -     |
| 16 |    Out Expo    |     -     |
| 17 |    In Expo     |     -     |
| 18 |    Out Circ    |     -     |
| 19 |    In Circ     |     -     |
| 20 |    Out Back    |     -     |
| 21 |    In Back     |     -     |
| 22 |  In Out Circ   |     -     |
| 23 |  In Out Back   |     -     |
| 24 |  Out Elastic   |     -     |
| 25 |   In Elastic   |     -     |
| 26 |   Out Bounce   |     -     |
| 27 |   In Bounce    |     -     |
| 28 | In Out Bounce  |     -     |
| 29 | In Out Elastic | 无法在速度事件使用 |

- RPE 1.7.0版本恢复了29号缓动的使用。

你可以在[这个网站](https://easings.net/zh-cn)查看它们的函数等信息。

### Python 缓动示例
```python
import math
import typing

ease_funcs:list[typing.Callable[[float], float]] = [
  lambda t: t, # linear - 1
  lambda t: math.sin((t * math.pi) / 2), # out sine - 2
  lambda t: 1 - math.cos((t * math.pi) / 2), # in sine - 3
  lambda t: 1 - (1 - t) * (1 - t), # out quad - 4
  lambda t: t ** 2, # in quad - 5
  lambda t: -(math.cos(math.pi * t) - 1) / 2, # io sine - 6
  lambda t: 2 * (t ** 2) if t < 0.5 else 1 - (-2 * t + 2) ** 2 / 2, # io quad - 7
  lambda t: 1 - (1 - t) ** 3, # out cubic - 8
  lambda t: t ** 3, # in cubic - 9
  lambda t: 1 - (1 - t) ** 4, # out quart - 10
  lambda t: t ** 4, # in quart - 11
  lambda t: 4 * (t ** 3) if t < 0.5 else 1 - (-2 * t + 2) ** 3 / 2, # io cubic - 12
  lambda t: 8 * (t ** 4) if t < 0.5 else 1 - (-2 * t + 2) ** 4 / 2, # io quart - 13
  lambda t: 1 - (1 - t) ** 5, # out quint - 14
  lambda t: t ** 5, # in quint - 15
  lambda t: 1 if t == 1 else 1 - 2 ** (-10 * t), # out expo - 16
  lambda t: 0 if t == 0 else 2 ** (10 * t - 10), # in expo - 17
  lambda t: (1 - (t - 1) ** 2) ** 0.5, # out circ - 18
  lambda t: 1 - (1 - t ** 2) ** 0.5, # in circ - 19
  lambda t: 1 + 2.70158 * ((t - 1) ** 3) + 1.70158 * ((t - 1) ** 2), # out back - 20
  lambda t: 2.70158 * (t ** 3) - 1.70158 * (t ** 2), # in back - 21
  lambda t: (1 - (1 - (2 * t) ** 2) ** 0.5) / 2 if t < 0.5 else (((1 - (-2 * t + 2) ** 2) ** 0.5) + 1) / 2, # io circ - 22
  lambda t: ((2 * t) ** 2 * ((2.5949095 + 1) * 2 * t - 2.5949095)) / 2 if t < 0.5 else ((2 * t - 2) ** 2 * ((2.5949095 + 1) * (t * 2 - 2) + 2.5949095) + 2) / 2, # io back - 23
  lambda t: 0 if t == 0 else (1 if t == 1 else 2 ** (-10 * t) * math.sin((t * 10 - 0.75) * (2 * math.pi / 3)) + 1), # out elastic - 24
  lambda t: 0 if t == 0 else (1 if t == 1 else - 2 ** (10 * t - 10) * math.sin((t * 10 - 10.75) * (2 * math.pi / 3))), # in elastic - 25
  lambda t: 7.5625 * (t ** 2) if (t < 1 / 2.75) else (7.5625 * (t - (1.5 / 2.75)) * (t - (1.5 / 2.75)) + 0.75 if (t < 2 / 2.75) else (7.5625 * (t - (2.25 / 2.75)) * (t - (2.25 / 2.75)) + 0.9375 if (t < 2.5 / 2.75) else (7.5625 * (t - (2.625 / 2.75)) * (t - (2.625 / 2.75)) + 0.984375))), # out bounce - 26
  lambda t: 1 - (7.5625 * ((1 - t) ** 2) if ((1 - t) < 1 / 2.75) else (7.5625 * ((1 - t) - (1.5 / 2.75)) * ((1 - t) - (1.5 / 2.75)) + 0.75 if ((1 - t) < 2 / 2.75) else (7.5625 * ((1 - t) - (2.25 / 2.75)) * ((1 - t) - (2.25 / 2.75)) + 0.9375 if ((1 - t) < 2.5 / 2.75) else (7.5625 * ((1 - t) - (2.625 / 2.75)) * ((1 - t) - (2.625 / 2.75)) + 0.984375)))), # in bounce - 27
  lambda t: (1 - (7.5625 * ((1 - 2 * t) ** 2) if ((1 - 2 * t) < 1 / 2.75) else (7.5625 * ((1 - 2 * t) - (1.5 / 2.75)) * ((1 - 2 * t) - (1.5 / 2.75)) + 0.75 if ((1 - 2 * t) < 2 / 2.75) else (7.5625 * ((1 - 2 * t) - (2.25 / 2.75)) * ((1 - 2 * t) - (2.25 / 2.75)) + 0.9375 if ((1 - 2 * t) < 2.5 / 2.75) else (7.5625 * ((1 - 2 * t) - (2.625 / 2.75)) * ((1 - 2 * t) - (2.625 / 2.75)) + 0.984375))))) / 2 if t < 0.5 else (1 +(7.5625 * ((2 * t - 1) ** 2) if ((2 * t - 1) < 1 / 2.75) else (7.5625 * ((2 * t - 1) - (1.5 / 2.75)) * ((2 * t - 1) - (1.5 / 2.75)) + 0.75 if ((2 * t - 1) < 2 / 2.75) else (7.5625 * ((2 * t - 1) - (2.25 / 2.75)) * ((2 * t - 1) - (2.25 / 2.75)) + 0.9375 if ((2 * t - 1) < 2.5 / 2.75) else (7.5625 * ((2 * t - 1) - (2.625 / 2.75)) * ((2 * t - 1) - (2.625 / 2.75)) + 0.984375))))) / 2, # io bounce - 28
  lambda t: 0 if t == 0 else (1 if t == 0 else (-2 ** (20 * t - 10) * math.sin((20 * t - 11.125) * ((2 * math.pi) / 4.5))) / 2 if t < 0.5 else (2 ** (-20 * t + 10) * math.sin((20 * t - 11.125) * ((2 * math.pi) / 4.5))) / 2 + 1) # io elastic - 29
]
```