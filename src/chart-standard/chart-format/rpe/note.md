﻿# Note
note，即音符，是谱面的主要构成之一，每个note都应该含有以下参数：

|     字段      |        类型         |                                        描述                                         |     默认值     | 加入版本 |
|:-----------:|:-----------------:|:---------------------------------------------------------------------------------:|:-----------:|:----:|
|    above    |        int        |                   `1` 为从线的正面下落， `2` 反之；大于 `2` 或小于 `1` 时为从线的正面下落                   |      1      |  -   |
|    alpha    |        int        |                             note不透明度，0为完全透明，255为完全不透明                             |     255     |  -   |
|   endTime   | [beat](./beat.md) |               note结束时间，若 `type` 为 `2` ，此值为Hold的结束时间，否则与startTime一致                |      -      |  -   |
|  startTime  | [beat](./beat.md) |                note开始时间，若 `type` 为 `2` ，此值为Hold的开始时间，否则与endTime一致                 |      -      |  -   |
|   isFake    |        int        | note真值，`0`为真，`1`为假，负数或大于`1`的数为真；假note没有判定，没有打击特效与音效，不计分，不计物量，若为 `hold` 始终显示为未打击样式 |      0      |  -   |
|  positionX  |       float       |                                 note相对于判定线中心点的X坐标                                 |      -      |  -   |
|    size     |       float       |                                     note大小倍率                                      |     1.0     |  -   |
|    speed    |       float       |                                      流速倍率，默认                                      |     1.0     |  -   |
|    type     |        int        |            note类型，`1` 为 `Tap`、`2` 为 `Hold`、`3` 为 `Flick`、`4` 为 `Darg`             |      -      |  -   |
| visibleTime |       float       |                                   note可见时间，单位为秒                                   | 999999.0000 |  -   |
|   yOffset   |       float       |                        note的Y轴偏移，正数向上偏移，负数向下偏移，同时偏移打击特效的位置                        |      0      |  -   |
|  hitsound   |      string?      |             note自定义打击音音频文件路径，相对于谱面文件根目录。没有自定义音效时，字段不存在，`Hold` 不会有本字段              |      -      | 142  |
- `size` 字段实际上在RPE中显示为宽度，即只能控制音符的宽度而不是音符的整个大小。