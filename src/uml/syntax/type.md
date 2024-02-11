# 数据类型

UML 中有如下数据类型:

## `Float`

单精度浮点数, 任意的数字都是 `Float`.

## `Rect`

矩形. 由 `[left, top, width, height]`(分别是左上角 `x` 坐标, 左上角 `y` 坐标, 矩形宽度, 矩形高度)定义.

`Rect` 在定义后可以访问一些只读属性, 具体包括:

- `Rect.l` 或 `Rect.x`: 左上角 `x` 坐标
- `Rect.t` 或 `Rect.y`: 左上角 `y` 坐标
- `Rect.w`: 矩形宽度
- `Rect.h`: 矩形高度
- `Rect.r`: 右下角 `x` 坐标
- `Rect.b`: 右下角 `y` 坐标
- `Rect.cx`: 中心 `x` 坐标
- `Rect.cy`: 中心 `y` 坐标

## `Bool`

布尔值. 值是 `true` 或 `false`, 目前只能用于元素的属性中.

## `String`

字符串. 用双引号括起来的文本, 用于表示按钮行为, 颜色, URL, 具体如下:

- `Color`: 颜色. 可以是十六进制 RGB 或 ARGB 颜色值(如 `"#ff0000"` 或 `"#7fffffff"`)或颜色名(如 `"red"`). 目前可用的颜色名有:
  - `"white"`
  - `"black"`
  - `"red"`
  - `"blue"`
  - `"yellow"`
  - `"green"`
  - `"gray"`
- `Action`: 按钮行为. 可用的值有:
  - `"join"`: 参与该活动
  - `"open:url"`: 打开指定 URL
- `URL`: 网址
