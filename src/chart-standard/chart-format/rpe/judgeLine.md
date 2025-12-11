# judgeLine

每一个judgeLine（判定线）都含有以下字段：

|       字段名        |               类型               |                              描述                              |      默认值       | 加入版本 |
|:----------------:|:------------------------------:|:------------------------------------------------------------:|:--------------:|:----:|
|      Group       |              int               |              判定线所属[组](./root.md#judgelinegroup)              |       0        |  -   |
|       Name       |             string             |                            判定线名称                             |    Untitled    |  -   |
|     Texture      |             string             | 判定线纹理，若非默认值，则为相对于谱面根目录的路径，更多详见[Texture](./extend.md#texture) |    line.png    |  -   |
|      anchor      |           float\[2\]           |           判定线纹理锚点，详见 [extend](./extend.md#anchor)            | `[ 0.5, 0.5 ]` | 142  |
|   eventLayers    |  [EventLayer](./event.md)[]?   |       事件层级，默认包含至少一个层级，最大有五个，层级下事件见 [event](./event.md)       |       -        |  -   |
|     extended     | [JsonObject](./extendEvent.md) |          特殊事件层，详见 [extend Event](./extendEvent.md)           |       -        |  -   |   
|      father      |              int               |                        父线，`-1` 表示无父线                         |       -        |  -   |                      |      -1       |  -   |
|     isCover      |              int               |                              遮罩                              |       1        |  -   |
|      notes       |     [Note](./note.md)\[\]      |                线上所有的Note，详见 [note](./note.md)                |       -        |  -   |
|    numOfNotes    |              int               |              Note总数量(包含 `FakeNote`，不包含 `Hold`)               |       0        |  -   |
|      zOrder      |              int               |                  线z轴(即图层），范围为±100（_范围需要验证_）                  |       0        |  -   |
|     attachUI     |            string?             |     UI绑定，详见 [extend](./extend.md#attachui)；无绑定情况下，不存在本字段     |       -        |  -   |
|      isGif       |              bool              |             纹理是否为GIF，若为 `true` ，Texture为一个GIF文件              |     false      | 150  |
|    posControl    |           JsonArray            |                 详见[Controls](./controls.md)                  |       -        |  -   |
|   sizeControl    |           JsonArray            |                 详见[Controls](./controls.md)                  |       -        |  -   |
|   skewControl    |           JsonArray            |                 详见[Controls](./controls.md)                  |       -        |  -   |
|     yControl     |           JsonArray            |                 详见[Controls](./controls.md)                  |       -        |  -   |
|   alphaControl   |           JsonArray            |                 详见[Controls](./controls.md)                  |       -        |  -   |
|    bpmfactor     |             float              |                     BPM因子 _此字段无法在RPE中编辑_                     |      1.0       |  -   |
| rotateWithFather |              bool              |              子线是否继承父线的旋转角度，若为 `true` 则继承，否则不继承               |      true      | 163  |

- 若层级为空，在某个版本之前，字段为 `null` ，在某个版本及以后，空层级无字段。（当前已知至少在 `143` 版本时无字段）
  - 若某个层级中的某个事件不存在，则该事件字段不会出现。
  - 若所有层级都为空，`eventLayers` 字段不会出现。
- 判定线的当前 `BPM` 应为 当前 `BPM` 除以 `bpmfactor`，而非乘以。
- 父线允许嵌套，父线是否影响子线的旋转角度取决于 `rotateWithFather` 是否为 `true`，若不存在此字段应视为 `false`
  （兼容163以前的版本）。
- `isCover` 字段在RPE中为 `1` 时，表示遮罩，其他值为不遮罩；遮罩时，位于判定线背面的音符（如果音符 `Above` 不为 1
  则为正面）不会渲染，反之则渲染（除非已被打击，则不渲染）。

## 事件插值

### Python 示例

- 定义 `rpe_easing.py` (略)
- 定义 `Chart_Objects_Rpe.py` (部分略)

```python
from __future__ import annotations

import typing
from dataclasses import dataclass
from functools import lru_cache, cache

import rpe_easing

def easing_interpolation(
    t: float, st: float,
    et: float, sv: float,
    ev: float, f: typing.Callable[[float], float]
):
    if t == st: return sv
    return f((t - st) / (et - st)) * (ev - sv) + sv
    
def conrpepos(x: float, y: float):
    return (x + 675) / 1350, 1.0 - (y + 450) / 900

def _init_events(es: list[LineEvent]):
    aes = []
    for i, e in enumerate(es):
        if i != len(es) - 1:
            ne = es[i + 1]
            if e.endTime.value < ne.startTime.value:
                aes.append(LineEvent(e.endTime, ne.startTime, e.end, e.end, 1))
    es.extend(aes)
    es.sort(key = lambda x: x.startTime.value)
    if es: es.append(LineEvent(es[-1].endTime, Beat(31250000, 0, 1), es[-1].end, es[-1].end, 1))
        
@dataclass
class Beat:
    var1: int
    var2: int
    var3: int
    
    def __post_init__(self):
        self.value = self.var1 + (self.var2 / self.var3)
        self._hash = hash(self.value)
    
    def __hash__(self) -> int:
        return self._hash
    
@dataclass
class Note:
    ...
    
@dataclass
class LineEvent:
    ...
    easingFunc: typing.Callable[[float], float] = rpe_easing.ease_funcs[0]
    
    def __post_init__(self):
        if not isinstance(self.easingType, int): self.easingType = 1
        self.easingType = 1 if self.easingType < 1 else (len(rpe_easing.ease_funcs) if self.easingType > len(rpe_easing.ease_funcs) else self.easingType)
        self.easingFunc = rpe_easing.ease_funcs[self.easingType - 1]
    
@dataclass
class EventLayer:
    ...
    
    def __post_init__(self):
        self.speedEvents.sort(key = lambda x: x.startTime.value)
        self.moveXEvents.sort(key = lambda x: x.startTime.value)
        self.moveYEvents.sort(key = lambda x: x.startTime.value)
        self.rotateEvents.sort(key = lambda x: x.startTime.value)
        self.alphaEvents.sort(key = lambda x: x.startTime.value)
        
        _init_events(self.speedEvents)
        _init_events(self.moveXEvents)
        _init_events(self.moveYEvents)
        _init_events(self.rotateEvents)
        _init_events(self.alphaEvents)
        
@dataclass
class Extended:
    ...
    
    def __post_init__(self):
        self.scaleXEvents.sort(key = lambda x: x.startTime.value)
        self.scaleYEvents.sort(key = lambda x: x.startTime.value)
        self.colorEvents.sort(key = lambda x: x.startTime.value)
        self.textEvents.sort(key = lambda x: x.startTime.value)

        _init_events(self.scaleXEvents)
        _init_events(self.scaleYEvents)
        _init_events(self.colorEvents)
        _init_events(self.textEvents)

@dataclass
class MetaData:
    ...

@dataclass
class BPMEvent:
    ...

@dataclass
class JudgeLine:
    ...
    
    def GetEventValue(self, t: float, es: list[LineEvent], default):
        for e in es:
            if e.startTime.value <= t <= e.endTime.value:
                if isinstance(e.start, float|int):
                    return easing_interpolation(t, e.startTime.value, e.endTime.value, e.start, e.end, e.easingFunc)
                elif isinstance(e.start, str):
                    return e.start
                elif isinstance(e.start, list):
                    r = easing_interpolation(t, e.startTime.value, e.endTime.value, e.start[0], e.end[0], e.easingFunc)
                    g = easing_interpolation(t, e.startTime.value, e.endTime.value, e.start[1], e.end[1], e.easingFunc)
                    b = easing_interpolation(t, e.startTime.value, e.endTime.value, e.start[2], e.end[2], e.easingFunc)
                    return (r, g, b)
        return default
    
    @lru_cache
    def GetPos(self, t: float, master: Rpe_Chart) -> list[float, float]:
        linePos = [0.0, 0.0]
        for layer in self.eventLayers:
            linePos[0] += self.GetEventValue(t, layer.moveXEvents, 0.0)
            linePos[1] += self.GetEventValue(t, layer.moveYEvents, 0.0)
        if self.father != -1:
            try:
                fatherPos = master.JudgeLineList[self.father].GetPos(t, master)
                linePos = list(map(lambda x, y: x + y, linePos, fatherPos))
            except IndexError:
                pass
        return linePos
    
    def GetState(self, t: float, defaultColor: tuple[int, int, int], master: Rpe_Chart) -> tuple[tuple[float, float], float, float, tuple[int, int, int], float, float, str|None]:
        "linePos, lineAlpha, lineRotate, lineColor, lineScaleX, lineScaleY, lineText"
        linePos = self.GetPos(t, master)
        lineAlpha = 0.0
        lineRotate = 0.0
        lineColor = defaultColor if not self.extended.textEvents else (255, 255, 255)
        lineScaleX = 1.0
        lineScaleY = 1.0
        lineText = None
        
        for layer in self.eventLayers:
            lineAlpha += self.GetEventValue(t, layer.alphaEvents, 0.0 if (t >= 0.0 or self.attachUI is not None) else -255.0)
            lineRotate += self.GetEventValue(t, layer.rotateEvents, 0.0)
        
        if self.extended:
            lineScaleX = self.GetEventValue(t, self.extended.scaleXEvents, lineScaleX)
            lineScaleY = self.GetEventValue(t, self.extended.scaleYEvents, lineScaleY)
            lineColor = self.GetEventValue(t, self.extended.colorEvents, lineColor)
            lineText = self.GetEventValue(t, self.extended.textEvents, lineText)
        
        return conrpepos(*linePos), lineAlpha / 255, lineRotate, lineColor, lineScaleX, lineScaleY, lineText

    def __hash__(self) -> int:
        return id(self)
    
    def __eq__(self, oth) -> bool:
        if isinstance(oth, JudgeLine):
            return self is oth
        return False

@dataclass
class Rpe_Chart:
    ...
    
    def __post_init__(self):
        self.BPMList.sort(key=lambda x: x.startTime.value)
    
    @cache
    def sec2beat(self, t: float, bpmfactor: float):
        beat = 0.0
        for i, e in enumerate(self.BPMList):
            bpmv = e.bpm * bpmfactor
            if i != len(self.BPMList) - 1:
                et_beat = self.BPMList[i + 1].startTime.value - e.startTime.value
                et_sec = et_beat * (60 / bpmv)
                
                if t >= et_sec:
                    beat += et_beat
                    t -= et_sec
                else:
                    beat += t / (60 / bpmv)
                    break
            else:
                beat += t / (60 / bpmv)
        return beat
    
    @cache
    def beat2sec(self, t: float, bpmfactor: float):
        sec = 0.0
        for i, e in enumerate(self.BPMList):
            bpmv = e.bpm * bpmfactor
            if i != len(self.BPMList) - 1:
                et_beat = self.BPMList[i + 1].startTime.value - e.startTime.value
                
                if t >= et_beat:
                    sec += et_beat * (60 / bpmv)
                    t -= et_beat
                else:
                    sec += t * (60 / bpmv)
                    break
            else:
                sec += t * (60 / bpmv)
        return sec

    def __hash__(self) -> int:
        return id(self)
    
    def __eq__(self, oth) -> bool:
        if isinstance(oth, JudgeLine):
            return self is oth
        return False
```

- 加载谱面:

```python
def load(chart: dict):
    meta = chart.get("META", {})
    rpe_chart_obj = Chart_Objects_Rpe.Rpe_Chart(
        META = Chart_Objects_Rpe.MetaData(
            RPEVersion = meta.get("RPEVersion", -1),
            offset = meta.get("offset", 0),
            name = meta.get("name", "Unknow"),
            id = meta.get("id", "-1"),
            song = meta.get("song", "Unknow"),
            background = meta.get("background", "Unknow"),
            composer = meta.get("composer", "Unknow"),
            charter = meta.get("charter", "Unknow"),
            level = meta.get("level", "Unknow"),
        ),
        BPMList = [
            Chart_Objects_Rpe.BPMEvent(
                startTime = Chart_Objects_Rpe.Beat(
                    *BPMEvent_item.get("startTime", [0, 0, 1])
                ),
                bpm = BPMEvent_item.get("bpm", 140)
            )
            for BPMEvent_item in chart.get("BPMList", [])
        ],
        JudgeLineList = [
            Chart_Objects_Rpe.JudgeLine(
                isCover = judgeLine_item.get("isCover", 1),
                Texture = judgeLine_item.get("Texture", "line.png"),
                attachUI = judgeLine_item.get("attachUI", None),
                bpmfactor = judgeLine_item.get("bpmfactor", 1.0),
                father = judgeLine_item.get("father", -1),
                zOrder = judgeLine_item.get("zOrder", 0),
                eventLayers = [
                    Chart_Objects_Rpe.EventLayer(
                        speedEvents = [
                            Chart_Objects_Rpe.LineEvent(
                                startTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("startTime", [0, 0, 1])
                                ),
                                endTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("endTime", [0, 0, 1])
                                ),
                                start = LineEvent_item.get("start", 0.0),
                                end = LineEvent_item.get("end", 0.0),
                                easingType = 1
                            )
                            for LineEvent_item in EventLayer_item.get("speedEvents", [])
                        ] if EventLayer_item.get("speedEvents", []) is not None else [],
                        moveXEvents = [
                            Chart_Objects_Rpe.LineEvent(
                                startTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("startTime", [0, 0, 1])
                                ),
                                endTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("endTime", [0, 0, 1])
                                ),
                                start = LineEvent_item.get("start", 0.0),
                                end = LineEvent_item.get("end", 0.0),
                                easingType = LineEvent_item.get("easingType", 1)
                            ) for LineEvent_item in EventLayer_item.get("moveXEvents", [])
                        ] if EventLayer_item.get("moveXEvents", []) is not None else [],
                        moveYEvents = [
                            Chart_Objects_Rpe.LineEvent(
                                startTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("startTime", [0, 0, 1])
                                ),
                                endTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("endTime", [0, 0, 1])
                                ),
                                start = LineEvent_item.get("start", 0.0),
                                end = LineEvent_item.get("end", 0.0),
                                easingType = LineEvent_item.get("easingType", 1)
                            ) for LineEvent_item in EventLayer_item.get("moveYEvents", [])
                        ] if EventLayer_item.get("moveYEvents", []) is not None else [],
                        rotateEvents = [
                            Chart_Objects_Rpe.LineEvent(
                                startTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("startTime", [0, 0, 1])
                                ),
                                endTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("endTime", [0, 0, 1])
                                ),
                                start = LineEvent_item.get("start", 0.0),
                                end = LineEvent_item.get("end", 0.0),
                                easingType = LineEvent_item.get("easingType", 1)
                            ) for LineEvent_item in EventLayer_item.get("rotateEvents", [])
                        ] if EventLayer_item.get("rotateEvents", []) is not None else [],
                        alphaEvents = [
                            Chart_Objects_Rpe.LineEvent(
                                startTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("startTime", [0, 0, 1])
                                ),
                                endTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("endTime", [0, 0, 1])
                                ),
                                start = LineEvent_item.get("start", 0.0),
                                end = LineEvent_item.get("end", 0.0),
                                easingType = LineEvent_item.get("easingType", 1)
                            ) for LineEvent_item in EventLayer_item.get("alphaEvents", [])
                        ] if EventLayer_item.get("alphaEvents", []) is not None else []
                    ) if EventLayer_item is not None else Chart_Objects_Rpe.EventLayer(speedEvents = [], moveXEvents = [], moveYEvents = [], rotateEvents = [], alphaEvents = [])
                    for EventLayer_item in judgeLine_item.get("eventLayers", [])
                ],
                extended = Chart_Objects_Rpe.Extended(
                    scaleXEvents = [
                        Chart_Objects_Rpe.LineEvent(
                            startTime = Chart_Objects_Rpe.Beat(
                                *LineEvent_item.get("startTime", [0, 0, 1])
                            ),
                            endTime = Chart_Objects_Rpe.Beat(
                                *LineEvent_item.get("endTime", [0, 0, 1])
                            ),
                            start = LineEvent_item.get("start", 1.0),
                            end = LineEvent_item.get("end", 1.0),
                            easingType = LineEvent_item.get("easingType", 1)
                        ) for LineEvent_item in judgeLine_item.get("extended", {}).get("scaleXEvents", [])
                    ] if judgeLine_item.get("extended", {}).get("scaleXEvents", []) is not None else [],
                    scaleYEvents = [
                        Chart_Objects_Rpe.LineEvent(
                            startTime = Chart_Objects_Rpe.Beat(
                                *LineEvent_item.get("startTime", [0, 0, 1])
                            ),
                            endTime = Chart_Objects_Rpe.Beat(
                                *LineEvent_item.get("endTime", [0, 0, 1])
                            ),
                            start = LineEvent_item.get("start", 1.0),
                            end = LineEvent_item.get("end", 1.0),
                            easingType = LineEvent_item.get("easingType", 1)
                        ) for LineEvent_item in judgeLine_item.get("extended", {}).get("scaleYEvents", [])
                    ] if judgeLine_item.get("extended", {}).get("scaleYEvents", []) is not None else [],
                    colorEvents = [
                        Chart_Objects_Rpe.LineEvent(
                            startTime = Chart_Objects_Rpe.Beat(
                                *LineEvent_item.get("startTime", [0, 0, 1])
                            ),
                            endTime = Chart_Objects_Rpe.Beat(
                                *LineEvent_item.get("endTime", [0, 0, 1])
                            ),
                            start = LineEvent_item.get("start", [255, 255, 255]),
                            end = LineEvent_item.get("end", [255, 255, 255]),
                            easingType = LineEvent_item.get("easingType", 1)
                        ) for LineEvent_item in judgeLine_item.get("extended", {}).get("colorEvents", [])
                    ] if judgeLine_item.get("extended", {}).get("colorEvents", []) is not None else [],
                    textEvents = [
                        Chart_Objects_Rpe.LineEvent(
                            startTime = Chart_Objects_Rpe.Beat(
                                *LineEvent_item.get("startTime", [0, 0, 1])
                            ),
                            endTime = Chart_Objects_Rpe.Beat(
                                *LineEvent_item.get("endTime", [0, 0, 1])
                            ),
                            start = LineEvent_item.get("start", ""),
                            end = LineEvent_item.get("end", ""),
                            easingType = LineEvent_item.get("easingType", 1)
                        ) for LineEvent_item in judgeLine_item.get("extended", {}).get("textEvents", [])
                    ] if judgeLine_item.get("extended", {}).get("textEvents", []) is not None else [],
                ) if judgeLine_item.get("extended", {}) is not None else None,
                notes = [
                    Chart_Objects_Rpe.Note(
                        type = Note_item.get("type", 1),
                        startTime = Chart_Objects_Rpe.Beat(
                            *Note_item.get("startTime", [0, 0, 1])
                        ),
                        endTime = Chart_Objects_Rpe.Beat(
                            *Note_item.get("endTime", [0, 0, 1])
                        ),
                        positionX = Note_item.get("positionX", 0),
                        above = Note_item.get("above", 1),
                        isFake = Note_item.get("isFake", False),
                        speed = Note_item.get("speed", 1.0),
                        yOffset = Note_item.get("yOffset", 0.0),
                        visibleTime = Note_item.get("visibleTime", 999999.0),
                        width = Note_item.get("size", 1.0),
                        alpha = Note_item.get("alpha", 255),
                    )
                    for Note_item in judgeLine_item.get("notes", [])
                ]
            )
            for judgeLine_item in chart.get("judgeLineList", [])
        ]
    )
                
    return rpe_chart_obj

result = load({}) # 这里传入你的谱面
```

- 最后调用 `result.JudgeLineList[i].GetState` , 并传入当前拍数为 `t` 和判定线默认颜色为 `defaultColor` , 和谱面对象
  `master` 即可获取当前拍数下的判定线全部状态