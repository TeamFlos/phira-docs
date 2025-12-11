# RPE谱面根目录结构

**警告：以下所有内容从编写开始时间（2024.7.25）最新RPE版本1.4.1开始编写，更早的加入版本等信息全部待补充。**

## 谱面根目录结构

### BPMList
`BPMList` 是一个 `JsonArray` 类型字段，包含若干个 `JsonObject`。
每个JsonObject包含以下字段：

|    字段名     |        类型         |   说明    | 加入版本 |
|:----------:|:-----------------:|:-------:|:----:|
|    bpm     |       float       |  BPM值   |  -   |
| startTime  | [beat](./beat.md) | BPM开始时间 |  -   |

### META
`META` 是一个 `JsonObject` 类型字段，包含以下字段：

|     字段名      |   类型   |        说明        | 加入版本 |
|:------------:|:------:|:----------------:|:----:|
|  RPEVersion  |  int   |  RPE版本，100~160   |  -   |
|  background  | string |  背景图片相对于谱面根目录路径  |  -   |
|   charter    | string |       谱师名义       |  -   |
|   composer   | string |        曲师        |  -   |
|      id      | string | 谱面ID，在RPE中用于识别谱面 |  -   |
| illustration | string |       曲绘画师       | 141  |
|    level     | string |       谱面等级       |  -   |
|     name     | string |       谱面名称       |  -   |
|    offset    |  int   |    音乐偏移，单位为毫秒    |  -   |
|     song     | string |  音乐文件相对于谱面根目录路径  |  -   |

- `offset` 字段为负数时，音乐应该在谱面开始前 `-offset` 毫秒时播放；为正数时，音乐应该在谱面开始后 `offset` 毫秒时播放。
- `id` 字段在RPE自动生成时为 `long`，实际上这个值可以随便篡改为任何字符，所以在实际谱面中存储方式为 `string` 类型。
-  <span style="color:red;">**RPE 1.5.0 ~ RPE 1.6.0 之间的版本（不含RPE 1.6.0，含Alpha版本），META中的 `RPEVersion` 字段保持为 `150`，没有被更改。**</span>
- <span style="color:red;">**RPE 1.6.1 版本，META中的 `RPEVersion` 字段的值保持为 `160`，没有被更改。**</span>
### chartTime
_模拟器不需要本属性。_
- `chartTime` 是一个 `double` 类型字段，值的时间单位是秒，表示谱面编辑时长，在 `141` 版本加入。  
- ~~在RPE中，如果谱师在30秒内没有编辑谱面，则该值将不再变动，下次开始编辑后继续计时。~~（特性被移除）
- 如果RPE失去焦点，RPE仍会继续计时，若RPE重新获得焦点，计时将回溯至失去焦点时的时间。

### judgeLineGroup
_模拟器不需要本属性。_  

- `judgeLineGroup` 是一个 `string[]` 类型字段；  
- 每一个 `string` 为一个判定线组。  
- *实际行为待补充。*

### judgeLineList
- `judgeLineList` 是一个 `JsonArray` 类型字段，包含若干个 [JudgeLine](judgeLine.md)。

### multiLineString
_模拟器不需要本属性。_  

- `multiLineString` 是一个 `string` 类型字段，在RPE中多线编辑时使用，以空格分割，每个数字代表一个判定线。  
- `multiLineString` 中也可能含有 `:` , `1:20` 将选中 `1` 到 `20` 号的所有判定线。

### multiScale
_模拟器不需要本属性。_

- `multiScale` 是一个 `float`，在RPE中用于缩放多线编辑页面的大小。

### xybind
_模拟器没必要读取本属性。_

- `xybind` 是一个 `bool` ，用于指示本谱面是否启用了XY绑定。
- 若为 `true`，则表示启用了XY绑定，则每一个 `XEvent` 一定有一个对应同等长度的 `YEvent`。
