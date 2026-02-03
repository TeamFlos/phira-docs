# 谱面信息格式

谱面信息是一种 [元数据](https://zh.wikipedia.org/wiki/%E5%85%83%E6%95%B0%E6%8D%AE) , 用于描述谱面数据之外的的基本信息, 例如作者, 插图, 音乐信息等.

谱面信息存在两种变体, [`ChartInfo`](https://github.com/TeamFlos/phira/blob/207c4724146c5a48c4e304d6e20447a39a72e0d3/prpr/src/info.rs#L17) 和 [`BriefChartInfo`](https://github.com/TeamFlos/phira/blob/207c4724146c5a48c4e304d6e20447a39a72e0d3/phira/src/data.rs#L21), 谱面信息 (`ChartInfo`) 的存储采用 YAML 格式, 谱面的 `info.yml` 文件即为 `ChartInfo` 的实例

本地导入时会自动填充 `ChartInfo` 的所有字段, 但 YAML 格式本身并不难懂, 若希望填写好后一并打包导入来节省时间, 则需要注意以下字段的填写

## `ChartInfo`

> [!NOTE] 
> 请参考[源代码](https://github.com/TeamFlos/phira/blob/main/prpr/src/info.rs)中的定义, 可能存在更新

### 谱面 ID `id`

不必需, `i32` 整数, 默认为空

用于标识谱面的唯一 ID, 与服务器中的 ID 保持一致, Phira 客户端会根据此 ID 来判断是否需要更新谱面

本地谱面该项为空

### 上传者 ID `uploader`

不必需, `i32` 整数, 默认为空

用于标识上传者的唯一 ID, 与服务器中的 ID 保持一致, 用于显示在线谱面的上传者信息

本地谱面该项为空

### 谱面名称 `name`

必需, `String` 字符串, 默认为 "UK"

谱面的名称

### 难度 `difficulty`

必需, `f32` 浮点数, 默认为 10.0

谱面的难度, 别乱来哈

### 难度等级 `level`

必需, `String` 字符串, 默认为 "UK Lv.10"

显示在游玩时屏幕右下角的难度等级

### 谱面作者 `charter`

必需, `String` 字符串, 默认为 "UK"

> 这谱谁写的.jpg

### 音乐作者 `composer`

必需, `String` 字符串, 默认为 "UK"

音乐的作者

### 插图作者 `illustrator`

必需, `String` 字符串, 默认为 "UK"

谱面的插图作者

### 谱面文件名 `chart`

必需, `String` 字符串, 默认为 "chart.json"

谱面文件的文件名, RPE 生成的谱面通常为 `chart.json`, PE 生成的谱面通常为 `xxx.pec`

### 谱面格式 `format`

不必需, [`ChartFormat`](https://github.com/TeamFlos/phira/blob/dad7d6f3a8535cabfb70ec3f954d774948c440f9/prpr/src/info.rs#L7) 枚举, 默认为空

谱面的格式, 不应当手动填写, 由 Phira 客户端自动识别并写入, 出于完整性需求在这里列出

### 音乐文件名 `music`

必需, `String` 字符串, 默认为 "song.mp3"

音乐文件的文件名

### 插图文件名 `illustration`

必需, `String` 字符串, 默认为 "background.png"

插图文件的文件名

### 解锁视频 `unlockVideo`

不必需, `String` 字符串, 默认为空

解锁该谱面的视频文件名

### 预览开始时间 `previewStart`

必需, `f32` 浮点数, 默认为 0.0

音乐预览开始的时间(秒)

### 预览结束时间 `previewEnd`

不必需, `f32` 浮点数, 默认为空

音乐预览结束的时间(秒), 留空则视为预览开始时间后 15.0 秒, 若超出结尾则会被截断

> 源代码: [截断](https://github.com/TeamFlos/phira/blob/dad7d6f3a8535cabfb70ec3f954d774948c440f9/phira/src/scene/song.rs#L94)

### 纵横比 `aspectRatio`

必需, `f32` 浮点数, 默认为 16.0 / 9.0

> [!NOTE] 注意
> 谱面显示的纵横比, 设备的纵横比大于此值(例如部分加长手机, 或者一般手机上此值填写为 4:3)时会保证谱面处于该值的纵横比, 而小于此值时会拉伸谱面以保证谱面填满屏幕(来源: TBD)

### 背景暗化程度 `backgroundDim`

必需, `f32` 浮点数, 默认为 0.6

谱面背景的暗化程度, 为背景上方矩形的不透明度

### 判定线长度 `lineLength`

必需, `f32` 浮点数, 默认为 6.0

谱面中线条的长度, 单位待补充(涉及到渲染细节, 文档待补充)

### 谱面延迟 `offset`

必需, `f32` 浮点数, 默认为 0.0

谱面相对于音乐之间的时间延迟(秒), 即该值为正时相比于该值为零时:

- 若两种情况中音乐同时开始, 则 `offset` 为正时谱面开始更晚
- 若两种情况中谱面同时开始, 则 `offset` 为正时音乐开始更早

### 提示 `tip`

不必需, `String` 字符串, 默认为空

Tip: 不写的话会给你塞一条别的

### 标签 `tags`

必需, `String` 字符串数组, 默认为空

谱面的标签, 用于分类和搜索, 标签相关文档待补充

### 简介 `intro`

必需, `String` 字符串, 默认为空

谱面的简介

### 长条选项 `holdPartialCover`

必需, `bool` 布尔值, 默认为 false

Hold 音符的遮罩位置，若为 `true` 则为尾部，否则为头部

### 创建时间 `created`

不必需, `DateTime<Utc>` 可选的 UTC 时间, 默认为空

谱面创建的时间, 不应当手动填写, 由 Phira 客户端自动写入

### 更新时间 `updated`

不必需, `DateTime<Utc>` 可选的 UTC 时间, 默认为空

本地谱面最近一次更新的时间, 不应当手动填写, 由 Phira 客户端自动写入

### 谱面更新时间 `chartUpdated`

不必需, `DateTime<Utc>` 可选的 UTC 时间, 默认为空

云端谱面最近一次更新的时间, 不应当手动填写, 由 Phira 客户端自动写入. 用于判断是否需要更新谱面

## `BriefChartInfo`

`BriefChartInfo` 是 `ChartInfo` 的一个简化版本, 用于在不需要详细信息的场景下使用. 以下是 `BriefChartInfo` 的主要字段:

TBD
