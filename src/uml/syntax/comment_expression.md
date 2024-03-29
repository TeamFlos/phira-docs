# 注释表达式

注释表达式是一种特殊的注释, 它是为了兼容旧版本设计的, 可以被执行的注释. 注释表达式的格式如下:

```js
#>exp(attr1: value1, attr2: value2, ...)
```

其中, `exp` 表示该表达式的类型, 括号内的是该表达式的属性, 是可选内容, `attrN` 和 `valueN` 分别为属性名称和属性值. 不同类型的表达式的属性也各不相同, 其中一些是必填, 会在介绍表达式时具体标注.

下面逐个介绍各类型的注释表达式:

## 结束表达式 `#>pop`

```js
#>pop
```

注释表达式以行为单位, 作用于数行内的元素, 变量等, 其作用范围是从表达式所在行开始到下一个 `#>pop` 表达式所在行结束. 因此, 多数其他表达式后面都必须跟一个 `#>pop` 表达式, 表示结束当前表达式的作用范围.

## 旋转表达式 `#>rot`

```js
#>rot(angle, cx, cy)
```

- `angle`(必填): 旋转角度, 单位为弧度
- `cx`(必填): 旋转中心 `x` 坐标
- `cy`(必填): 旋转中心 `y` 坐标

## 平移表达式 `#>tr`

```js
#>tr(dx, dy)
```

- `dx`(选填, 默认为 `0`): 横向平移距离
- `dy`(选填, 默认为 `0`): 纵向平移距离

## 透明度表达式 `#>alpha`

```js
#>alpha(a)
```

- `a`(选填, 默认为 `0`): 透明度, 取值范围为 `[0, 1]`, `0` 为完全透明, `1` 为完全不透明

## 矩阵表达式 `#>mat`

```js
#>mat(x00, x01, x02, x03, x10, x11, x12, x13, x20, x21, x22, x23, x30, x31, x32, x33)
```

- `x00`(选填, 默认为 `0`): 矩阵第一行第一列的值
- `x01`(选填, 默认为 `0`): 矩阵第一行第二列的值
- `x02`(选填, 默认为 `0`): 矩阵第一行第三列的值
- `x03`(选填, 默认为 `0`): 矩阵第一行第四列的值
- `x10`(选填, 默认为 `0`): 矩阵第二行第一列的值
- `x11`(选填, 默认为 `0`): 矩阵第二行第二列的值
- `x12`(选填, 默认为 `0`): 矩阵第二行第三列的值
- `x13`(选填, 默认为 `0`): 矩阵第二行第四列的值
- `x20`(选填, 默认为 `0`): 矩阵第三行第一列的值
- `x21`(选填, 默认为 `0`): 矩阵第三行第二列的值
- `x22`(选填, 默认为 `0`): 矩阵第三行第三列的值
- `x23`(选填, 默认为 `0`): 矩阵第三行第四列的值
- `x30`(选填, 默认为 `0`): 矩阵第四行第一列的值
- `x31`(选填, 默认为 `0`): 矩阵第四行第二列的值
- `x32`(选填, 默认为 `0`): 矩阵第四行第三列的值
- `x33`(选填, 默认为 `0`): 矩阵第四行第四列的值

可以通过矩阵表达式实现元素的缩放, 平移, 旋转等变换.

## 条件表达式 `#>if` 等

```js
#>if(condition)

#>elif(condition)

#>else

#>fi
```

- `condition`(必填): 条件表达式, 可以是任意表达式, 当值为 `0` 表示假, 否则表示真.

需要注意的是 `#>if` 并不适用 `#>pop` 来结束, 而是使用 `#>fi`.

## 低版本兼容表达式 `#>if-no-v2`

```js
#>if-no-v2
```

如果你的 UML 文件中使用了 V2 版本中没有的特性, 可以在使用这个表达式显示部分元素, 以提示使用低版本的 Phira 客户端的用户尽快升级.

> 注释表达式是 V2 版本的新功能, 只在 V2 版本中有效, 在 V1 版本中会被当作一般注释忽略. `#if-no-v2` 表达式实际上的作用是忽略其作用范围内的内容.
