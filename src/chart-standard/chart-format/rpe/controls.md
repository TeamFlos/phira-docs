# Controls

control是以关键帧形式控制note各项参数的一个rpe特性。

## Alpha Control

|  字段名   |  类型   |                       描述                       | 默认值 | 加入版本 |
|:------:|:-----:|:----------------------------------------------:|:---:|:----:|
| easing |  int  | 到下一个关键帧数值的缓动类型，详见[对照表](./extend.md#easingType) |
| alpha  | float |                    note不透明度                    | 1.0 |  -   |
|   x    | float |                 note与判定线的纵向距离                  |

- `alpha control` 可以控制 note 的不透明度。
- 可以与note的`alpha`字段结合使用，不冲突，混合公式为 `noteAlpha = noteAlpha * nowAlpha`（先从0~255转换为0~1后再计算）。

### 行为

- 当 `alpha control` 如下所示时：

```json
{
  "alphaControl": [
    {
      "alpha": 1.0,
      "easing": 1,
      "x": 0.0
    },
    {
      "alpha": 0.5,
      "easing": 2,
      "x": 100.0
    },
    {
      "alpha": 1.0,
      "easing": 1,
      "x": 9999999.0
    }
  ]
}
```

- note 在距离判定线 `100` 个y坐标单位前不透明度为 `0.5`，在 `100` 个y坐标单位后以 `Out Sine` 缓动函数缓动到 `1.0`
  不透明度到与判定线重合。

## Size Control

|  字段名   |  类型   |                       描述                       | 默认值 | 加入版本 |
|:------:|:-----:|:----------------------------------------------:|:---:|:----:|
| easing |  int  | 到下一个关键帧数值的缓动类型，详见[对照表](./extend.md#easingType) |  1  |  -   |
|  size  | float |                    note大小倍率                    | 1.0 |  -   |
|   x    | float |                 note与判定线的纵向距离                  |  -  |  -   |

- `size control` 可以真正的控制 note 的大小，而不是仅仅控制宽度。
- 可以与note的宽度字段结合使用，不冲突。
- 无法影响 `Hold` 类型的note大小。

### 行为

- 当 `size control` 如下所示时：

```json
{
  "sizeControl": [
    {
      "easing": 1,
      "size": 1.0,
      "x": 0.0
    },
    {
      "easing": 2,
      "size": 1.5,
      "x": 200.0
    },
    {
      "easing": 1,
      "size": 1.0,
      "x": 9999999.0
    }
  ]
}
```

- note 在距离判定线 `200` 个y坐标前大小为原先的 `1.5` 倍，在`200`个y坐标单位后以 `Out Sine` 缓动函数缓动到 `1.0`
  倍大小到与判定线重合。

## pos Control（X Control）

|  字段名   |  类型   |                       描述                       | 默认值 | 加入版本 |
|:------:|:-----:|:----------------------------------------------:|:---:|:----:|
| easing |  int  | 到下一个关键帧数值的缓动类型，详见[对照表](./extend.md#easingType) |  1  |  -   |
|  pos   | float |              note的`positionX`参数倍率              |  -  |  -   |
|   x    | float |                 note与判定线的纵向距离                  |  -  |  -   |

- `pos control` 可以动态控制 note 的 `positionX` 倍率。

### 行为

- 当 `pos control` 如下所示时：

```json
{
  "posControl": [
    {
      "easing": 1,
      "pos": 2.0,
      "x": 0.0
    },
    {
      "easing": 2,
      "pos": 1.0,
      "x": 100.0
    },
    {
      "easing": 1,
      "pos": 1.0,
      "x": 9999999.0
    }
  ]
}
```

- note 在距离判定线 `100` 个y坐标单位前note的 `positionX` 为原先的 `2.0` 倍，在 `100` 个y坐标单位后以 `Out Sine`
  缓动函数缓动note的 `positionX` 为 `1.0` 倍到与判定线重合。

## y Control

|  字段名   |  类型   |                       描述                       | 默认值 | 加入版本 |
|:------:|:-----:|:----------------------------------------------:|:---:|:----:|
| easing |  int  | 到下一个关键帧数值的缓动类型，详见[对照表](./extend.md#easingType) |  1  |  -   |
|   y    | float |                     （待补充）                      |  -  |
|   x    | float |                 note与判定线的纵向距离                  |  -  |

- 行为描述待补充

## Skew Control

|  字段名   |  类型   |                       描述                       | 默认值 | 加入版本 |
|:------:|:-----:|:----------------------------------------------:|:---:|:----:|
| easing |  int  | 到下一个关键帧数值的缓动类型，详见[对照表](./extend.md#easingType) |  1  |  -   |
|  skew  | float |                     （待补充）                      |  -  |  -   |
|   x    | float |                 note与判定线的纵向距离                  |  -  |  -   |

- 对 `Hold` 类型的note无效。
- 行为描述待补充
