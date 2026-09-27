# blockArea

本页将介绍 blockAreaList 下的所有字段。

`blockAreaList` 是一个 `JsonArray`，包含若干个 `JsonObject`，每个 `JsonObject` 代表一个 blockArea（限制区域）。

> `blockAreaList` 系 Phigros 4.0.0 新增字段

## blockArea

|           字段名           |    类型     |          描述           |      单位       |
|:-----------------------:|:---------:|:---------------------:|:-------------:|
|   topRightPercentage    | JsonObject |     方块区域的右上角坐标      |       -       |
|  bottomLeftPercentage   | JsonObject |     方块区域的左下角坐标      |       -       |
|        appearTime       |   float   |       方块出现的时间       | `1.875 / bpm` |
|        enableTime       |   float   |   方块进入 Active 的时间    | `1.875 / bpm` |
|       disableTime       |   float   |  方块进入 Disabled 的时间   | `1.875 / bpm` |
|      disappearTime      |   float   |       方块消失的时间       | `1.875 / bpm` |
|       isSubtract        |   bool    |       是否为减算方块       |       -       |
|       rotateEvents      | JsonArray |         旋转事件          |       -       |
|        moveEvents       | JsonArray |         移动事件          |       -       |
|       scaleEvents       | JsonArray |         缩放事件          |       -       |

### 坐标

`topRightPercentage` 与 `bottomLeftPercentage` 均为含有 `x` `y` 两个字段的 `JsonObject`，以谱面渲染范围的左下角为原点，取值 `0.0 ~ 1.0`：

| 字段名 |  类型   |   描述   |      单位       |
|:---:|:-----:|:------:|:-------------:|
|  x  | float | 横向坐标 | 谱面渲染范围宽度 |
|  y  | float | 纵向坐标 | 谱面渲染范围高度 |

- `x` 向右递增, `y` 向上递增
- 方块区域由这两个对角坐标确定, 不要求 `topRightPercentage` 一定在右上

### 时序

方块的存活区间由四个时间点划分为三个阶段：

|           区间           |   阶段    |   描述   |
|:----------------------:|:-------:|:------:|
| `[appearTime, enableTime)` |  Ready  |  淡入显示  |
| `[enableTime, disableTime)` |  Active | 完全显示 |
| `[disableTime, disappearTime)` | Disabled |  淡出消失  |

- 区间长度为 `0` 时该阶段不存在
- 在 `appearTime` 之前或 `disappearTime` 之后, 方块不显示

## Event

blockArea 下的事件均为「关键帧」形式: 事件只有 `time` 而没有 `endTime`, 其起始值为上一个事件的对应值, 终点值为当前事件的对应值。

- **所有事件的时间单位都为 `1.875 / bpm` s**
- 在第一个事件之前, 事件值取默认值 (移动为方块中心, 缩放为 `(1.0, 1.0)`, 旋转为 `0.0`)

### rotateEvents

|   字段名   |    类型     |   描述   |      单位       |
|:-------:|:---------:|:------:|:-------------:|
|  anchor | JsonObject | 旋转中心坐标 |       -       |
|   time  |   float   | 事件的时间  | `1.875 / bpm` |
| easeType |    int    | 缓动类型   |       -       |
| rotation |   float   | 旋转角度   |      角度       |

### moveEvents

|    字段名    |    类型     |    描述    |      单位       |
|:---------:|:---------:|:--------:|:-------------:|
| endPosition | JsonObject | 移动的目标坐标 (方块中心) |       -       |
|    time    |   float   |  事件的时间   | `1.875 / bpm` |
|  easeTypeX |    int    | x 方向的缓动类型 |       -       |
|  easeTypeY |    int    | y 方向的缓动类型 |       -       |

### scaleEvents

|    字段名    |    类型     |    描述    |      单位       |
|:---------:|:---------:|:--------:|:-------------:|
|   anchor  | JsonObject | 缩放中心坐标  |       -       |
|    time    |   float   |  事件的时间   | `1.875 / bpm` |
|  easeTypeX |    int    | x 方向的缓动类型 |       -       |
|  easeTypeY |    int    | y 方向的缓动类型 |       -       |
|   scale   | JsonObject |  缩放倍率   |       -       |

- `anchor` 为含有 `x` `y` 的 `JsonObject`, 表示旋转/缩放的中心
- `endPosition` 为含有 `x` `y` 的目标坐标, 单位与 [坐标](#坐标) 一致
- `scale` 为含有 `x` `y` 的缩放倍率, `(1.0, 1.0)` 表示原始大小

### easeType

> 这是官谱中第一次出现easeType。。。

事件值按 `start + (end - start) * f(p)` 计算, 其中 `p` 为事件区间内的时间进度:

- `p = (t - 上一个事件的 time) / (当前事件的 time - 上一个事件的 time)`

`easeType` / `easeTypeX` / `easeTypeY` 的取值与曲线 `f(p)` 的对应关系如下：

| 值  |       名称       |                     曲线 `f(p)`                      |   描述   |
|:--:|:--------------:|:--------------------------------------------------:|:------:|
| 0  |     Liner      |                        `p`                         |   线性   |
| 1  |     InSine     |                        `p²`                        |   缓入   |
| 2  |     OutSine    |                    `1 - (1 - p)²`                  |   缓出   |
| 3  |   InOutSine    |  `p < 0.5 ? 0.5 * (2p)² : 1 - 0.5 * (2 - 2p)²`    |  缓入缓出  |
| 4  |     InQuad     |                        `p³`                        |   缓入   |
| 5  |     OutQuad    |                    `1 - (1 - p)³`                  |   缓出   |
| 6  |   InOutQuad    |  `p < 0.5 ? 0.5 * (2p)³ : 1 - 0.5 * (2 - 2p)³`    |  缓入缓出  |
| 7  |    InCubic     |                        `p⁴`                        |   缓入   |
| 8  |    OutCubic    |                    `1 - (1 - p)⁴`                  |   缓出   |
| 9  |   InOutCubic   |  `p < 0.5 ? 0.5 * (2p)⁴ : 1 - 0.5 * (2 - 2p)⁴`    |  缓入缓出  |
| 10 |    InQuart     |                        `p⁵`                        |   缓入   |
| 11 |    OutQuart    |                    `1 - (1 - p)⁵`                  |   缓出   |
| 12 |   InOutQuart   |  `p < 0.5 ? 0.5 * (2p)⁵ : 1 - 0.5 * (2 - 2p)⁵`    |  缓入缓出  |
| 13 |      Zero      |                        `0`                         |  恒为 0  |
| 14 |      One       |                        `1`                         |  恒为 1  |
| 15 | AnimationCurve |                         -                          | 自定义曲线  |

- **注意: 枚举名与实际曲线并不一致**。原版用幂函数生成, 指数 `n = type // 3 + 2`:
  - `InSine` / `OutSine` / `InOutSine` (`n = 2`) 实为二次幂, 并没有用到正弦
  - `InQuad` (`n = 3`) 实为三次幂, `InCubic` (`n = 4`) 实为四次幂, `InQuart` (`n = 5`) 实为五次幂
- `Liner` 为线性 (原版枚举名即 `Liner`), 等价于不做缓动
- `Zero` 恒为 `0`, 事件值在整个区间内保持上一个事件的值, 到该事件时间点才跳到目标值
- `One` 恒为 `1`, 事件值在该事件时间点立即跳到目标值
- 类型 `15` (`AnimationCurve`) 不在内置查表中, 由外部 `AnimationCurve` 提供; 内置求值只支持 `0 ~ 14`
- `rotateEvents` 只使用单个 `easeType`; `moveEvents` 与 `scaleEvents` 的 `x` `y` 分量分别使用 `easeTypeX` 与 `easeTypeY`

#### 实现细节

原版 `GetEase.GetEaseWithProgress(progress, type)` 并非直接计算函数, 而是「按 `1%` 采样成 `101` 项查表 + 线性插值」:

- `i = (int)(progress * 100)`
- `i <= 0` 时返回 `table[0]`; `i >= 100` 时返回 `table[100]`
- 否则返回 `table[i] + (progress * 100 - i) * (table[i + 1] - table[i])`

表中每个 `easeType` 的 `101` 项由静态初始化生成:

- 类型 `0`: `table[i] = i / 100`
- 类型 `1 ~ 12`: 指数 `n = type // 3 + 2`, 缓入为 `(i / 100)ⁿ`, 缓出为 `1 - (1 - i / 100)ⁿ`, 缓入缓出按上表分段
- 类型 `13` (`Zero`) 全部为 `0`; 类型 `14` (`One`) 全部为 `1`