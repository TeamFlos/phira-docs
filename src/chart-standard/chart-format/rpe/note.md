# Note

note，即音符，是谱面的主要构成之一，每个note都应该含有以下参数：

|     字段      |        类型         |                          描述                          |     默认值     | 加入版本 |
|:-----------:|:-----------------:|:----------------------------------------------------:|:-----------:|:----:|
|    above    |        int        |              `1` 为从线的正面下落，其他数字为从线的背面下落               |      1      |  -   |
|    alpha    |        int        |              note不透明度，0为完全透明，255为完全不透明               |     255     |  -   |
|   endTime   | [beat](./beat.md) | note结束时间，若 `type` 为 `2` ，此值为Hold的结束时间，否则与startTime一致 |      -      |  -   |
|  startTime  | [beat](./beat.md) |  note开始时间，若 `type` 为 `2` ，此值为Hold的开始时间，否则与endTime一致  |      -      |  -   |
|   isFake    |        int        |                  note真值，`1`为假，其他数为真                  |      0      |  -   |
|  positionX  |       float       |                  note相对于判定线中心点的X坐标                   |      -      |  -   |
|    size     |       float       |                       note大小倍率                       |     1.0     |  -   |
|    speed    |       float       |                         流速倍率                         |     1.0     |  -   |
|    type     |        int        |                     note类型，详见对照表                     |      -      |  -   |
| visibleTime |       float       |                    note可见时间，单位为秒                     | 999999.0000 |  -   |
|   yOffset   |       float       |         note的Y轴偏移，正数向上偏移，负数向下偏移，同时偏移打击特效的位置          |      0      |  -   |
|  hitsound   |      string?      |               note自定义打击音文件相对于谱面文件根目录路径               |      -      | 142  |

- `size` 字段实际上在RPE中显示为宽度，即只能控制音符的宽度而不是音符的整个大小。
- `above` 字段在RPE中，`Hold` 如果从背面下落默认被设置为 `2`，其他Note均为 `0`，但是为 `1` 一定是从正面下落！
- `hitsound` 字段在没有自定义音效时不存在。
- 假note没有判定，没有打击特效与音效，不计分，不计物量，若为 `Hold` 则始终显示为未打击样式。

## Note类型对照
|   字段值   |  描述   |
|:-------:|:-----:|
|    1    |  Tap  |
|    2    | Hold  |
|    3    | Flick |
|    4    | Drag  |
| Default |  Tap  |