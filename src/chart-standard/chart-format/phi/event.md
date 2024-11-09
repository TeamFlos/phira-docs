# Event

本页将介绍判定线事件下的所有事件。

## speedEvent

|      字段名      |  类型   |                 描述                  |      单位       |
|:-------------:|:-----:|:-----------------------------------:|:-------------:|
|   startTime   | float |               事件的开始时间               | `1.875 / bpm` |
|    endTime    | float |               事件的结束时间               | `1.875 / bpm` |
|     value     | float |                事件的值                 |     高度单位      |
| floorPosition | float | 速度事件开始时判定线共计以流过的速度  (仅方便计算, 高版本不存在) |     高度单位      |

## judgeLineMoveEvent

|    字段名    |  类型   |   描述    |      单位       |
|:---------:|:-----:|:-------:|:-------------:|
| startTime | float | 事件的开始时间 | `1.875 / bpm` |
|  endTime  | float | 事件的结束时间 | `1.875 / bpm` |

- `formatVersion` 为 `1`

|  字段名  | 类型  |   描述    | 单位 |
|:-----:|:---:|:-------:|:--:|
| start | int | 事件的开始坐标 | -  |
|  end  | int | 事件的结束坐标 | -  |

- 坐标计算 (Python):
  - `x = (v - v % 1000) // 1000`
  - `y = v % 1000`
  - 单位:
    - `x` `1 / 880` 谱面渲染范围宽度
    - `y` `1 / 520` 谱面渲染范围高度
- 转化为formatVersion为3的坐标 (python):
  - 原事件以 `e` 表示, 新事件以 `ne` 表示
  - `ne.start = (e.start - e.start % 1000) // 1000`
  - `ne.end = (e.end - e.end % 1000) // 1000`
  - `ne.start2 = e.start % 1000`
  - `ne.end2 = e.end % 1000`

- `formatVersion` 为 `3`

|  字段名   |  类型   |   描述    |    单位    |
|:------:|:-----:|:-------:|:--------:|
| start  | float | 事件的开始x坐标 | 谱面渲染范围宽度 |
|  end   | float | 事件的结束x坐标 | 谱面渲染范围宽度 |
| start2 | float | 事件的开始y坐标 | 谱面渲染范围高度 |
|  end2  | float | 事件的结束y坐标 | 谱面渲染范围高度 |

### judgeLineRotateEvent

|    字段名    |  类型   |   描述    |      单位       |
|:---------:|:-----:|:-------:|:-------------:|
| startTime | int | 事件的开始时间 | `1.875 / bpm` |
|  endTime  | int | 事件的结束时间 | `1.875 / bpm` |
|   start   | float | 事件的开始值  |      角度       |
|    end    | float | 事件的结束值  |      角度       |

### judgeLineDisappearEvent

|    字段名    |  类型   |   描述    |      单位       |
|:---------:|:-----:|:-------:|:-------------:|
| startTime | float | 事件的开始时间 | `1.875 / bpm` |
|  endTime  | float | 事件的结束时间 | `1.875 / bpm` |
|   start   | float | 事件的开始值  |       -       |
|    end    | float | 事件的结束值  |       -       |
