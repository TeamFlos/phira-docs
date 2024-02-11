# 特效

特效是在一段时间内对谱面整体施加着色器效果的特性，可以用以达成一些普通谱面无法实现或难以实现的视觉效果。prpr 预置了一批着色器，你也可以自己编写着色器，详见 [自行编写着色器](./custom-shader.md)。

## 格式

你需要在 `extra.json` 中加入 `effects` 字段，其内容为 `Effect` 的数组。

### Effect

单个 `Effect` 的格式如下所示：

```json
{
	"start": [0, 0, 1],
	"end": [0, 0, 1],
	"shader": "着色器名字",
	"global": false,
	"vars": {
		...
	}
}
```

`start` 和 `end` 指定了特效的开始和结束时间，格式与 RPE 默认的时间表示格式相同（`[小节数, 分子, 分母]`）。

`shader`，即着色器名字，既可以是内置着色器，也可以是自定义的着色器。

`global` 决定了该特效会不会影响到 UI 元素（连击数、暂停按钮等）。可以不填，默认为 `false`。

`vars` 是可选项，它是一个变量名字到 [`动画变量`](../index.html#动画变量) 的映射，用于指定着色器的参数（或者说，着色器的 `uniform` 变量）。即，假设我需要指定两个变量 `power` 和 `radius` 的值，我可以这样写：

```json
{
	...,
	"vars": {
		"power": ...,
		"radius": ...
	}
}
```

## 示例

下面的例子将在 `[2, 0, 1]` 到 `[4, 0, 1]` 中使用 `chromatic` 内置着色器，并将 `power` 这一参数在这一时段内从 `0` 到 `0.1` 线性变化，且 `sampleCount` 被固定为 `5`：

```json
{
	...,
	"effects": [
		{
			"start": [2, 0, 1],
			"end": [4, 0, 1],
			"shader": "chromatic",
			"vars": {
				"power": [
					{
						"startTime": [2, 0, 1],
						"endTime": [4, 0, 1],
						"easingType": 2,
						"start": 0.0,
						"end": 0.1
					}
				],
				"sampleCount": 5
			}
		}
	]
}
```

## 内置着色器

你可以在 [这里](./builtin/index.md) 查看所有的内置着色器，以及它们的参数和相关说明。
