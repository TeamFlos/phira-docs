# RPE谱面根目录结构

**警告，以下所有内容根据编写开始时间（2024.7.25）最新RPE版本1.4.1编写，所有加入版本等信息全部待补充。**

## 谱面根目录结构

### BPMList
`BPMList` 是一个 `JsonArray`，包含若干个 `JsonObject`。
每个JsonObject包含以下字段：

|    字段名     |        类型         |   说明    | 加入版本 |
|:----------:|:-----------------:|:-------:|:----:|
|    bpm     |       float       |  BPM值   |  -   |
| startTime  | [beat](./beat.md) | BPM开始时间 |  -   |

### META
`META` 是一个 `JsonObject`，包含以下字段：

|     字段名      |    类型    |        说明        | 加入版本 |
|:------------:|:--------:|:----------------:|:----:|
|  RPEVersion  |   int    |  RPE版本，100~152   |  -   |
|  background  |  string  |  背景图片相对于谱面根目录路径  |  -   |
|   charter    |  string  |       谱师名义       |  -   |
|   composer   |  string  |        曲师        |  -   |
|      id      | int（待补充） | 谱面ID，在RPE中用于识别谱面 |  -   |
| illustration |  string  |       曲绘画师       | 141  |
|    level     |  string  |       谱面等级       |  -   |
|     name     |  string  |       谱面名称       |  -   |
|    offset    |   int    |        偏移        |  -   |
|     song     |  string  |  音乐文件相对于谱面根目录路径  |  -   |

### chartTime
_模拟器不需要本属性。_
- `chartTime` 是一个float值，时间单位是秒，表示谱面编辑时长，在RPE1.4.1加入。  
- ~~在RPE中，如果谱师在30秒内没有编辑谱面，则该值将不再变动，下次开始编辑后继续计时。~~
- 如果焦点不在RPE窗口，此计时将会停止，直到窗口获得焦点后继续计时。

### judgeLineGroup
_模拟器不需要本属性。_  
- `judgeLineGroup` 是一个 `JsonArray`，包含若干个 `string`；  
- 每一个 `string` 为一个判定线组。  


### judgeLineList
- `judgeLineList` 是一个 `JsonArray`，包含若干个 `JsonObject`，每个 `JsonObject` 代表一个[判定线](./judgeLine.md)。

### multiLineString
_模拟器不需要本属性。_  

- `multiLineString` 是一个字符串，在RPE中多线编辑时使用，以空格分割，每个数字代表一个判定线。  
- `multiLineString` 中也可能含有 `:` ，它的作用和 `~` 差不多，如 `1:20` 将选中 `1` 到 `20` 号的所有判定线。

