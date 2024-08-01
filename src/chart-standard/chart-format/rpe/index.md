# RPE 文档

在 RPE140 中，json 根节点下有一下内容：BPMList，META，judgeLineGroup，judgeLineList，multiLineString，multiScale，前四个比较常用

## 1.BPMList

这是一个数组，由若干个 bpm 组成，每个 bpm 的由一个数值和开始时间组成，示例：

```json
{"BPMList" : [
    {
        "bpm": 120.0,
        "startTime": [ 0, 0, 1 ]
    }
]}
```

## 2.META

储存谱面基本信息，有以下的值

`RPEVersion` : 140

`background` : 背景图片文件名

`charter` : 谱师

`composer` : 曲师

`id` : id

`level` : 等级

`name` : 曲名

`offset` : 开始时的偏移

`song` : 音乐文件名

## 3.judgeLineGroup

一个字符串数组，表示判断线的组名，比如 `[ "Default" ]`

## 4.judgeLineList

这是一个数组，由若干条判定线组成，**对于每条判定线**，有以下属性：

`Group` 组，一个编号，对应 `judgeLineGroup` 数组

`Name` 判定线名字

`Texture` 判定线纹理，一般为 `line.png`

`alphaControl` `posControl` `sizeControl` `skewControl` `yControl` 音符下落状态控制

`bpmfactor` 这条线的 bpm 倍数，一般为 1

`eventLayers` 事件层级（**数组**）

`extended` 扩展事件。其中包含 `inclineEvents`（倾斜），`scaleXEvents``scaleYEvents`（判定线伸缩）

`father` 父线

`isCover` 是否遮住坐标为负数的音符，0 或者 1

`notes` 音符（**数组**）

`numOfNotes` notes 数组的长度

`zOrder` 图层
