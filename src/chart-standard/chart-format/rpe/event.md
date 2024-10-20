# Event
本页将介绍判定线事件层级下的**普通事件**。

- RPE中，一共有五种普通事件，它们分别是：`moveXEvents`（X轴移动事件）、`moveYEvents`（Y轴移动事件）、`rotateEvents`（旋转事件）、`alphaEvents`（不透明度事件）、`speedEvents`（音符流速事件）。
- 在层级下，这些字段都对应一个 `JsonArray`，每一个元素代表一个事件。
- 在稍早版本，XY轴移动事件分离（XY事件不同时出现与消失）会被制谱器报错，因为这是对早期PhiEditor Chart的兼容，现在它不被报错，其本身也只是可选项。
- 当前判定线无某一个事件时，无对应字段而非空数组。

除了**流速事件**外的每个普通事件都应该含有以下字段。

|     字段名      |           类型            |                                                           描述                                                           |          默认值           | 加入版本 |
|:------------:|:-----------------------:|:----------------------------------------------------------------------------------------------------------------------:|:----------------------:|:----:|
|    bezier    |           int           |                                               缓动是否为贝塞尔曲线，`0` 为不是，`1` 为是                                                |           0            |  -   |
| bezierPoints |        JsonArray        | 贝塞尔曲线控制点，当`bezier`为`1`时生效，详见[百度百科](https://baike.baidu.com/item/%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF/1091769) | [ 0.0, 0.0, 0.0, 0.0 ] |  -   |
|  easingLeft  |          float          |                                              缓动的左边界位置，最小为 `0.0`，最大为 `1.0`                                              |          0.0           |  -   |
| easingRight  |          float          |                                              缓动的右边界位置，最小为 `0.0`，最大为 `1.0`                                              |          1.0           |  -   |
|  easingType  |           int           |                                        缓动类型，详见[extend](./extend.md#easingtype)                                         |           1            |  -   |
|  linkgroup   |           int           |                                                           -                                                            |           -            |  -   |
|    start     |          float          |                                                        事件开始时数值                                                         |           -            |  -   |
|  startTime   |    [beat](./beat.md)    |                                                        事件开始的时间                                                         |           -            |  -   |
|     end      |          float          |                                                        事件结束时数值                                                         |           -            |  -   |
|   endTime    |    [beat](./beat.md)    |                                                        事件结束的时间                                                         |           -            |  -   |

- 坐标系锚点位于屏幕中心，X轴范围为 `-675 ~ 675`，Y轴范围为 `-450 ~ 450`。
- 不透明度事件的正常范围为 `0 ~ 255`，`0`为完全透明，`255`为完全不透明。
    - 若不透明度事件数值为负数，则会在隐藏判定线的同时隐藏这条判定线上的所有音符。（根据作者所述，此功能是废弃的非法功能但它仍然有效）
- 音符流速事件只有上述的 `startTime`、`endTime`、`start`、`end`、`linkgroup` 字段。
  - 音符流速事件**不支持缓动**，即只有线性变化。
  - 流速为负数时，音符会向上飞，若音符为 `Hold`，在 `Hold` 尾出现时，整个音符都会出现（即使 `Hold` 还没完全回到判定线正面）。
  
## Python 示例 (不支持bezier):
- 定义 `rpe_easing.py` (略)
- 定义 `Beat`:
```python
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
```
- 定义 `LineEvent`
```python
@dataclass
class LineEvent:
    startTime: Beat
    endTime: Beat
    start: float|str|list[int]
    end: float|str|list[int]
    easingType: int
    easingFunc: typing.Callable[[float], float] = rpe_easing.ease_funcs[0]
    
    def __post_init__(self):
        if not isinstance(self.easingType, int): self.easingType = 1
        self.easingType = 1 if self.easingType < 1 else (len(rpe_easing.ease_funcs) if self.easingType > len(rpe_easing.ease_funcs) else self.easingType)
        self.easingFunc = rpe_easing.ease_funcs[self.easingType - 1]
```
- 定义 `easing_interpolation`
```python
def easing_interpolation(
    t: float, st: float,
    et: float, sv: float,
    ev: float, f: typing.Callable[[float], float]
):
    if t == st: return sv
    return f((t - st) / (et - st)) * (ev - sv) + sv
```
- `default` 为事件默认值
- 则有:
```python
def GetEventValue(t: float, es: list[LineEvent], default):
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
```