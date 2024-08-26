# 扩展参数

## attachUI
`attachUI` 是RPE独有特性，它允许你使用判定线绑定UI元素，使你可以控制UI的位置，透明度，大小等。  
属性对应UI元素列表：

|      值      |      对应UI元素      | RPE设置中对应数字 |                      注                      |
|:-----------:|:----------------:|:----------:|:-------------------------------------------:|
|    pause    |       暂停按钮       |     1      |                      -                      |
| combonumber |       连击数        |     2      | 绑定此UI会使此UI透明度受到Alpha事件影响，默认连击大于等于 `3` 时才会显示 |
|    combo    | 连击数下的 `combo` 文字 |     3      |                     同上                      |
|    score    |        分数        |     4      |                      -                      |
|     bar     |       进度条        |     5      |      `RPE 1.4.0` 及以前，此属性绑定的为曲名左侧的白色竖条       |
|    name     |       谱面名称       |     6      |                      -                      |
|    level    |       谱面等级       |     7      |                      -                      |

- 在UI被绑定后，判定线将会自动隐藏，UI可以通过类似于子线的方式进行操作，不同的是可以操作UI角度和透明度；判定线实际位置仍然不变。

## anchor
`anchor` 是RPE独有特性，它允许你设置判定线的锚点，它的设计是为文字事件服务的。 
- 在RPE中，此设置在顶栏工具栏第二页中，两个数值用空格分割。
- 它是一个 `JsonArray`，两个值对应 `x` 和 `y` 坐标。
- `x` 默认为 `0.5`，即中心，`1` 时判定线向左移，`0` 时判定线向右移。
- `y` 默认为 `0.5`，即中心，`1` 时判定线向下移，`0` 时判定线向上移。

## Texture
RPE允许你设置判定线的 `Texture` 字段来修改判定线的纹理，当判定线的纹理被修改后，判定线颜色不再受到AP/FC判定线颜色指示影响。
- 若不使用[scaleXEvents](./extendEvent.md#scalexevents)和[scaleYEvents](./extendEvent.md#scaleyevents)，修改判定线纹理大小，则默认缩放为 `1`。
- 若纹理为一个GIF动图，则会受到[gifEvents](./extendEvent.md#gifevents)的影响。（`150`版本开始支持）

## easingType
`easingType` 是RPE用于对应缓动的数字标识，对照表如下：

| 值  |      对应缓动      |    注     |
|:--:|:--------------:|:--------:|
| 1  |     Linear     |    -     |
| 2  |    Out Sine    |    -     |
| 3  |    In Sine     |    -     |
| 4  |    Out Quad    |    -     |
| 5  |    In Quad     |    -     |
| 6  |  In Out Sine   |    -     |
| 7  |  In Out Quad   |    -     |
| 8  |   Out Cubic    |    -     |
| 9  |    In Cubic    |    -     |
| 10 |   Out Quart    |    -     |
| 11 |    In Quart    |    -     |
| 12 |  In Out Cubic  |    -     |
| 13 |  In Out Quart  |    -     |
| 14 |   Out Quint    |    -     |
| 15 |    In Quint    |    -     |
| 16 |    Out Expo    |    -     |
| 17 |    In Expo     |    -     |
| 18 |    Out Circ    |    -     |
| 19 |    In Circ     |    -     |
| 20 |    Out Back    |    -     |
| 21 |    In Back     |    -     |
| 22 |  In Out Circ   |    -     |
| 23 |  In Out Back   |    -     |
| 24 |  Out Elastic   |    -     |
| 25 |   In Elastic   |    -     |
| 26 |   Out Bounce   |    -     |
| 27 |   In Bounce    |    -     |
| 28 | In Out Bounce  |    -     |
| 29 | In Out Elastic | 无法在RPE使用 |

你可以在[这个网站](https://easings.net/zh-cn)查看它们的函数等信息。




