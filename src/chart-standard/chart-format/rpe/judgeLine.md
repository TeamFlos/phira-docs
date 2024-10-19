# judgeLine

每一个judgeLine（判定线）都含有以下字段：

|     字段名      |     类型     |                                  描述                                  |      默认值       | 加入版本 |
|:------------:|:----------:|:--------------------------------------------------------------------:|:--------------:|:----:|
|    Group     |    int     |                  判定线所属[组](./root.md#judgelinegroup)                  |       0        |  -   |
|     Name     |   string   |                                判定线名称                                 |    Untitled    |  -   |
|   Texture    |   string   |     判定线贴图，若非默认值，则为相对于谱面根目录的路径，更多详见[Texture](./extend.md#texture)     |    line.png    |  -   |
|    anchor    | JsonArray  |                判定线锚点，详见 [extend](./extend.md#anchor)                 | `[ 0.5, 0.5 ]` | 142  |
| eventLayers  | JsonArray? | 事件层级，默认包含至少一个层级（JsonObject），空层级详见下方，最大有五个，层级下事件见 [event](./event.md) |       -        |  -   |
|   extended   | JsonArray  |               特殊事件，详见 [extend Event](./extendEvent.md)               |       -        |  -   |   
|    father    |    int     |                         父线，`-1` 表示无父线（行为待补充）                         |       -        |  -   |                      |      -1       |  -   |
|   isCover    |    int     |                              遮罩（行为待补充）                               |       1        |  -   |
|    notes     | JsonArray  |                    线上所有的Note，详见 [note](./note.md)                    |       -        |  -   |
|  numOfNotes  |    int     |                  Note总数量(包含 `FakeNote`，不包含 `Hold`)                   |       0        |  -   |
|    zOrder    |    int     |                      线z轴(即图层），范围为±100（_范围需要验证_）                      |       0        |  -   |
|   attachUI   |  string?   |         UI绑定，详见 [extend](./extend.md#attachui)；无绑定情况下，不存在本属性         |       -        |  -   |
|    isGif     |    bool    |                 纹理是否为GIF，若为 `true` ，Texture为一个GIF文件                  |     false      | 150  |
|  posControl  | JsonArray  |                            _此字段无法在RPE中编辑_                            |       -        |  -   |
| sizeControl  | JsonArray  |                            _此字段无法在RPE中编辑_                            |       -        |  -   |
| skewControl  | JsonArray  |                            _此字段无法在RPE中编辑_                            |       -        |  -   |
|   yControl   | JsonArray  |                            _此字段无法在RPE中编辑_                            |       -        |  -   |
| alphaControl | JsonArray  |                            _此字段无法在RPE中编辑_                            |       -        |  -   |
|  bpmfactor   |   float    |                            _此字段无法在RPE中编辑_                            |      1.0       |  -   |
- 若层级为空，在某个版本之前，字段为 `null` ，在某个版本及以后，空层级无字段。（当前已知至少在 `143` 版本时无字段） 
  - 若所有层级都为空，`eventLayers` 字段不会出现。

