# blockArea

本页将介绍 blockAreaList 下的所有字段。

`blockAreaList` 是一个 `JsonArray`，包含若干个 `JsonObject`，每个 `JsonObject` 代表一个 blockArea（噪域）。

> `blockAreaList` 系 Phigros 4.0.0 新增字段

## blockArea

|        字段名        |                类型                |           描述           | 单位 |
|:--------------------:|:----------------------------------:|:------------------------:|:----:|
|  topRightPercentage  |           [坐标](#坐标)            |   方块区域的右上角坐标   |  -   |
| bottomLeftPercentage |           [坐标](#坐标)            |   方块区域的左下角坐标   |  -   |
|      appearTime      |               float                |      方块出现的时间      |  秒  |
|      enableTime      |               float                |  方块进入 Active 的时间  |  秒  |
|     disableTime      |               float                | 方块进入 Disabled 的时间 |  秒  |
|    disappearTime     |               float                |      方块消失的时间      |  秒  |
|      isSubtract      |                bool                |      是否为减算方块      |  -   |
|     rotateEvents     | List<[rotateEvent](#rotateevents)> |         旋转事件         |  -   |
|      moveEvents      |   List<[moveEvent](#moveevents)>   |         移动事件         |  -   |
|     scaleEvents      |  List<[scaleEvent](#scaleevents)>  |         缩放事件         |  -   |

> 四个时间点以及下文所有事件的 `time` 都是 **音乐时间（秒）**，与判定线事件使用的 `1.875 / bpm` 不同。
> 原版直接拿它们与 `ProgressControl.nowTime`（当前播放时间，秒）比较，不做任何单位换算。

### 坐标

`topRightPercentage` 与 `bottomLeftPercentage` 均为含有 `x` `y` 两个字段的 `JsonObject`，以谱面渲染范围的左下角为原点，
`0.0 ~ 1.0` 对应渲染范围的边界：

> 取值 **不限于** `0.0 ~ 1.0`，官谱中就存在 `{x: 1.5, y: 1.2}` 与 `{x: 0.5, y: -0.2}` 这样的值，方块区域可以部分甚至完全落在渲染范围之外。

| 字段名 | 类型  |   描述   |       单位       |
|:------:|:-----:|:--------:|:----------------:|
|   x    | float | 横向坐标 | 谱面渲染范围宽度 |
|   y    | float | 纵向坐标 | 谱面渲染范围高度 |

- `x` 向右递增, `y` 向上递增
- 方块区域由这两个对角坐标确定, 不要求 `topRightPercentage` 一定在右上

### 时序

方块的存活区间由四个时间点划分，对应原版内部的 5 个阶段 `HiddenBefore` / `Disabled` / `Ready` / `Active` / `HiddenAfter`：

|                   区间                   |            阶段            |                               描述                               |
|:----------------------------------------:|:--------------------------:|:----------------------------------------------------------------:|
| `t < appearTime` 或 `t >= disappearTime` | HiddenBefore / HiddenAfter | 不显示（原版把方块 `transform.position.x` 设为 `1000` 移出画面） |
|     `[appearTime, enableTime - 0.5)`     |          Disabled          |               显示但未激活，进入时按 `0.5 s` 渐显                |
|     `[enableTime - 0.5, enableTime)`     |           Ready            |                         激活前的预备状态                         |
|       `[enableTime, disableTime)`        |           Active           |                         激活（完全显示）                         |
|      `[disableTime, disappearTime)`      |          Disabled          |           退回未激活状态，到 `disappearTime` 不再显示            |

- `0.5` 来自预制件常量 `disabledBlockReadyDuration`（预备时长）与 `disabledBlockShowDuration`（渐显时长），原版固定为 `0.5` 秒， **谱面无法修改**
- 渐显只在方块 **由不显示变为显示、且此时还不是 `Active`** 时触发一次；若 `appearTime >= enableTime`（一出现就已激活）则没有渐显
- `Ready` 的起点 `enableTime - 0.5` 若早于 `appearTime`，方块从 `appearTime` 起才显示
- 区间长度为 `0` 时该阶段不存在
- 判定规则：`appearTime <= t < disappearTime` 时显示，`enableTime <= t < disableTime` 为 `Active`，其余显示时段为 `Disabled`
- `Disabled` / `Ready` / `Active` 三种状态在原版里通过切换到不同的层（`disabledLayer` / `readyLayer` / `enabledLayer`，均为层名字符串）区分；`Disabled` 到 `disappearTime` **没有渐隐**，方块直接移出画面

## Event

blockArea 下的事件均为 “关键帧” 形式: 事件只有 `time` 而没有 `endTime`, 其起始值为上一个事件的对应值, 终点值为当前事件的对应值。

- **所有事件的 `time` 单位同样是音乐时间（秒）**，与四个时间点一致
- 在第一个事件之前, 事件值取默认值 (移动为方块中心, 缩放为 `(1.0, 1.0)`, 旋转为 `0.0`)

### rotateEvents

|  字段名  |     类型      |     描述     | 单位 |
|:--------:|:-------------:|:------------:|:----:|
|  anchor  | [坐标](#坐标) | 旋转中心坐标 |  -   |
|   time   |     float     |  事件的时间  |  秒  |
| easeType |      int      |   缓动类型   |  -   |
| rotation |     float     |   旋转角度   | 角度 |

### moveEvents

|   字段名    |     类型      |           描述            | 单位 |
|:-----------:|:-------------:|:-------------------------:|:----:|
| endPosition | [坐标](#坐标) | 移动的目标坐标 (方块中心) |  -   |
|    time     |     float     |        事件的时间         |  秒  |
|  easeTypeX  |      int      |     x 方向的缓动类型      |  -   |
|  easeTypeY  |      int      |     y 方向的缓动类型      |  -   |

### scaleEvents

|  字段名   |     类型      |       描述       | 单位 |
|:---------:|:-------------:|:----------------:|:----:|
|  anchor   | [坐标](#坐标) |   缩放中心坐标   |  -   |
|   time    |     float     |    事件的时间    |  秒  |
| easeTypeX |      int      | x 方向的缓动类型 |  -   |
| easeTypeY |      int      | y 方向的缓动类型 |  -   |
|   scale   |  JsonObject   |     缩放倍率     |  -   |

- `anchor` 为含有 `x` `y` 的 `JsonObject`, 表示旋转/缩放的中心, 单位与 [坐标](#坐标) 一致（归一化到谱面渲染范围, 原点左下,
  同样可超出 `0.0 ~ 1.0`）
- `endPosition` 为含有 `x` `y` 的目标坐标, 单位与 [坐标](#坐标) 一致
- `scale` 为含有 `x` `y` 的缩放倍率, `(1.0, 1.0)` 表示原始大小

### easeType

> 这是官谱中第一次出现easeType……

事件值按 `start + (end - start) * f(p)` 计算, 其中 `p` 为事件区间内的时间进度:

- `p = (t - 上一个事件的 time) / (当前事件的 time - 上一个事件的 time)`

`easeType` / `easeTypeX` / `easeTypeY` 的取值与曲线 `f(p)` 的对应关系如下：

| 值 |    名称    |                  曲线 `f(p)`                  |   描述   |
|:--:|:----------:|:---------------------------------------------:|:--------:|
| 0  |   Linear   |                      `p`                      |   线性   |
| 1  |   InSine   |                     `p²`                      |   缓入   |
| 2  |  OutSine   |                `1 - (1 - p)²`                 |   缓出   |
| 3  | InOutSine  | `p < 0.5 ? 0.5 * (2p)² : 1 - 0.5 * (2 - 2p)²` | 缓入缓出 |
| 4  |   InQuad   |                     `p³`                      |   缓入   |
| 5  |  OutQuad   |                `1 - (1 - p)³`                 |   缓出   |
| 6  | InOutQuad  | `p < 0.5 ? 0.5 * (2p)³ : 1 - 0.5 * (2 - 2p)³` | 缓入缓出 |
| 7  |  InCubic   |                     `p⁴`                      |   缓入   |
| 8  |  OutCubic  |                `1 - (1 - p)⁴`                 |   缓出   |
| 9  | InOutCubic | `p < 0.5 ? 0.5 * (2p)⁴ : 1 - 0.5 * (2 - 2p)⁴` | 缓入缓出 |
| 10 |  InQuart   |                     `p⁵`                      |   缓入   |
| 11 |  OutQuart  |                `1 - (1 - p)⁵`                 |   缓出   |
| 12 | InOutQuart | `p < 0.5 ? 0.5 * (2p)⁵ : 1 - 0.5 * (2 - 2p)⁵` | 缓入缓出 |
| 13 |    Zero    |                      `0`                      |  恒为 0  |
| 14 |    One     |                      `1`                      |  恒为 1  |

- **注意: 枚举名与实际曲线并不一致**。原版用幂函数生成, 指数 `n = (type - 1) // 3 + 2`（即按每组的 `In` 类型算 `n`）:
    - `InSine` / `OutSine` / `InOutSine` (`n = 2`) 实为二次幂, 并没有用到正弦
    - `InQuad` (`n = 3`) 实为三次幂, `InCubic` (`n = 4`) 实为四次幂, `InQuart` (`n = 5`) 实为五次幂
    - 将枚举对应曲线与真正的缓动函数名称对应起来的表格在下方有提供，方便理解。
- `Liner` 为线性 (原版枚举名即 `Liner`), 等价于不做缓动
- `Zero` 恒为 `0`, 事件值在整个区间内保持上一个事件的值, 到该事件时间点才跳到目标值
- `One` 恒为 `1`, 事件值在该事件时间点立即跳到目标值
- `rotateEvents` 只使用单个 `easeType`; `moveEvents` 与 `scaleEvents` 的 `x` `y` 分量分别使用 `easeTypeX` 与 `easeTypeY`

#### 实际枚举对应名称
| 值 |    名称    |
|:--:|:----------:|
| 0  |   Linear   |
| 1  |   InQuad   |
| 2  |  OutQuad   |
| 3  | InOutQuad  |
| 4  |  InCubic   |
| 5  |  OutCubic  |
| 6  | InOutCubic |
| 7  |  InQuart   |
| 8  |  OutQuart  |
| 9  | InOutQuart |
| 10 |  InQuint   |
| 11 |  OutQuint  |
| 12 | InOutQuint |
| 13 |    Zero    |
| 14 |    One     |

#### 实现细节

原版 `GetEase.GetEaseWithProgress(progress, type)` 并非直接计算函数, 而是“按 `1%` 采样成 `101` 项查表 + 线性插值”:

- `i = (int)(progress * 100)`（向零取整）
- `i >= 100` 时返回 `table[100]`; `i < 0` 时返回 `table[0]`（即负进度与超过 `1.0` 的进度都被夹到端点值）
- 其余 (`0 <= i < 100`) 返回 `table[i] + (progress * 100 - i) * (table[i + 1] - table[i])`

表中每个 `easeType` 的 `101` 项由静态初始化生成:

- 类型 `0`: `table[i] = i / 100`
- 类型 `1 ~ 12`: 指数 `n = (type - 1) // 3 + 2`（`1~3 → 2`, `4~6 → 3`, `7~9 → 4`, `10~12 → 5`）, 缓入为 `(i / 100)ⁿ`, 缓出为 `1 - (1 - i / 100)ⁿ`, 缓入缓出按上表分段
- 类型 `13` (`Zero`) 全部为 `0`; 类型 `14` (`One`) 全部为 `1`