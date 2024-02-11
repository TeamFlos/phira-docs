# 页面切换

如果我们希望活动界面包括多个页面, 可以通过在超出屏幕的部分放置其他页面的内容, 并通过整个页面所有元素的移动达到类似页面切换的效果.

例如, 我们可以这样放置横纵六个页面的内容:

```text
            |-----------|
            |   3, 2    |
            |           |
            |-----------|
            |   2, 2    |
            |           |
|-----------|-----------|-----------|-----------|
|   1, 1    |   1, 2    |   1, 3    |   1, 4    |
|           |           |           |           |
|-----------|-----------|-----------|-----------|
```

可以在每个页面的左上角放置一个 `o` 方便计算每个页面上的元素的位置:

```js
# o
let tmp_rect = [page_offset_x_1 + page_offset_x_2 + page_offset_x_3, page_offset_y_1 + page_offset_y_2, 0.1, 0.1]
img(id: o11, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)

let tmp_rect = [o11.l + 2, o11.t, 0.1, 0.1]
img(id: o12, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)

let tmp_rect = [o11.l + 4, o11.t, 0.1, 0.1]
img(id: o13, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)

let tmp_rect = [o11.l + 6, o11.t, 0.1, 0.1]
img(id: o14, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)

#>if(page_offset_y_1_ratio)
let tmp_rect = [o12.l, o11.t - 2 * top, 0.1, 0.1]
img(id: o22, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)
#>fi

#>if(page_offset_y_2_ratio)
let tmp_rect = [o12.l, o11.t - 4 * top, 0.1, 0.1]
img(id: o32, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)
#>fi
```

在以上的定义中, 我们通过 `page_offset_x_n` 和 `page_offset_y_n` 定义了 `o11` 的偏移量, 由于其他页面的偏移量都是相对于 `o11` 的, 所以在 `o11` 移动时, 其他页面的元素也会跟着移动.

此外, 我们还通过 `#>if` 设置了 `o22` 和 `o32` 绘制的时机. 这是为了防止纵向切换后, 用户在活动首屏看到当前页面上方页面的内容. 通过这个值, 我们可以将页面上方的内容移出屏幕.

为了得出这些偏移量的具体值, 我们需要使用定义一些用于切换页面的按钮, 并通过按钮的 `last` 属性计算出偏移量的值.

```js
global btn_r_1 = @btn
global btn_l_2 = @btn

global btn_r_2 = @btn
global btn_l_3 = @btn

global btn_r_3 = @btn
global btn_l_4 = @btn

global btn_r_3 = @btn
global btn_l_4 = @btn

global btn_u_1 = @btn
global btn_d_2 = @btn

global btn_u_2 = @btn
global btn_d_3 = @btn

# btn_lr_1234
let tmp_rect = [o12.l - 0.1, o11.t + top - 0.05, 0.1, 0.1]
img(id: btn_r_1_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/right_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_r_1, r: tmp_rect, t:fit)

let tmp_rect = [o12.l, o12.t + top - 0.05, 0.1, 0.1]
img(id: btn_l_2_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/left_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_l_2, r: tmp_rect, t:fit)

let tmp_rect = [o13.l - 0.1, o12.t + top - 0.05, 0.1, 0.1]
img(id: btn_r_2_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/right_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_r_2, r: tmp_rect, t:fit)

let tmp_rect = [o13.l, o13.t + top - 0.05, 0.1, 0.1]
img(id: btn_l_3_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/left_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_l_3, r: tmp_rect, t:fit)

let tmp_rect = [o14.l - 0.1, o13.t + top - 0.05, 0.1, 0.1]
img(id: btn_r_3_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/right_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_r_3, r: tmp_rect, t:fit)

let tmp_rect = [o14.l, o14.t + top - 0.05, 0.1, 0.1]
img(id: btn_l_4_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/left_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_l_4, r: tmp_rect, t:fit)

# btn_ud_123
let tmp_rect = [o12.l + 1 - 0.05, o12.t, 0.1, 0.1]
img(id: btn_u_1_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/up_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_u_1, r: tmp_rect, t:fit)

#>if(page_offset_y_1_ratio)
let tmp_rect = [o22.l + 1 - 0.05, o12.t - 0.1, 0.1, 0.1]
img(id: btn_d_2_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/down_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_d_2, r: tmp_rect, t:fit)

let tmp_rect = [o22.l + 1 - 0.05, o22.t, 0.1, 0.1]
img(id: btn_u_2_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/up_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_u_2, r: tmp_rect, t:fit)
#>fi

#>if(page_offset_y_2_ratio)
let tmp_rect = [o32.l + 1 - 0.05, o22.t - 0.1, 0.1, 0.1]
img(id: btn_d_3_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/down_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_d_3, r: tmp_rect, t:fit)
#>fi
```

其中按钮 `id` 最后的编号表示按钮所在的页面.

在定义了按钮后, 我们可以通过按钮的 `last` 属性计算出偏移量的值:

```js
let animation_duration = 0.7
let animation_speed = 1 / animation_duration

let a = btn_r_1.last
let b = btn_l_2.last
# back and forth
let x = min((t - a) * animation_speed, 1)
let y = max(1 - (t - b) * animation_speed, 0)

# a > b ? x : y
let page_offset_x_1_ratio = (a > b) * x + (a <= b) * y

# easeInOutQuad
let x = 4 * page_offset_x_1_ratio * page_offset_x_1_ratio * page_offset_x_1_ratio
let y = 1 - (-2 * page_offset_x_1_ratio + 2) * (-2 * page_offset_x_1_ratio + 2) * (-2 * page_offset_x_1_ratio + 2) / 2
let page_offset_x_1_ratio_eased = (page_offset_x_1_ratio < 0.5) * x + (page_offset_x_1_ratio >= 0.5) * y
let page_offset_x_1 = page_offset_x_1_ratio_eased * -2
```

关于纵向切换的偏移量，我们可以通过类似的方法计算出.

这样, 我们就完成了页面切换效果.

完整的 UML 代码如下:

```js
let animation_duration = 0.7
let animation_speed = 1 / animation_duration

global btn_r_1 = @btn
global btn_l_2 = @btn

global btn_r_2 = @btn
global btn_l_3 = @btn

global btn_r_3 = @btn
global btn_l_4 = @btn

global btn_r_3 = @btn
global btn_l_4 = @btn

global btn_u_1 = @btn
global btn_d_2 = @btn

global btn_u_2 = @btn
global btn_d_3 = @btn

# ---
let a = btn_r_1.last
let b = btn_l_2.last
# back and forth
let x = min((t - a) * animation_speed, 1)
let y = max(1 - (t - b) * animation_speed, 0)

# a > b ? x : y
let page_offset_x_1_ratio = (a > b) * x + (a <= b) * y

# easeInOutQuad
let x = 4 * page_offset_x_1_ratio * page_offset_x_1_ratio * page_offset_x_1_ratio
let y = 1 - (-2 * page_offset_x_1_ratio + 2) * (-2 * page_offset_x_1_ratio + 2) * (-2 * page_offset_x_1_ratio + 2) / 2
let page_offset_x_1_ratio_eased = (page_offset_x_1_ratio < 0.5) * x + (page_offset_x_1_ratio >= 0.5) * y
let page_offset_x_1 = page_offset_x_1_ratio_eased * -2
# ---

# ---
let a = btn_r_2.last
let b = btn_l_3.last
let x = min((t - a) * animation_speed, 1)
let y = max(1 - (t - b) * animation_speed, 0)
let page_offset_x_2_ratio = (a > b) * x + (a <= b) * y

let x = 4 * page_offset_x_2_ratio * page_offset_x_2_ratio * page_offset_x_2_ratio
let y = 1 - (-2 * page_offset_x_2_ratio + 2) * (-2 * page_offset_x_2_ratio + 2) * (-2 * page_offset_x_2_ratio + 2) / 2
let page_offset_x_2_ratio_eased = (page_offset_x_2_ratio < 0.5) * x + (page_offset_x_2_ratio >= 0.5) * y
let page_offset_x_2 = page_offset_x_2_ratio_eased * -2
# ---

# ---
let a = btn_r_3.last
let b = btn_l_4.last
let x = min((t - a) * animation_speed, 1)
let y = max(1 - (t - b) * animation_speed, 0)
let page_offset_x_3_ratio = (a > b) * x + (a <= b) * y

let x = 4 * page_offset_x_3_ratio * page_offset_x_3_ratio * page_offset_x_3_ratio
let y = 1 - (-2 * page_offset_x_3_ratio + 2) * (-2 * page_offset_x_3_ratio + 2) * (-2 * page_offset_x_3_ratio + 2) / 2
let page_offset_x_3_ratio_eased = (page_offset_x_3_ratio < 0.5) * x + (page_offset_x_3_ratio >= 0.5) * y
let page_offset_x_3 = page_offset_x_3_ratio_eased * -2
# ---

# ---
let a = btn_u_1.last
let b = btn_d_2.last
let x = min((t - a) * animation_speed, 1)
let y = max(1 - (t - b) * animation_speed, 0)
let page_offset_y_1_ratio = (a > b) * x + (a <= b) * y

let x = 4 * page_offset_y_1_ratio * page_offset_y_1_ratio * page_offset_y_1_ratio
let y = 1 - (-2 * page_offset_y_1_ratio + 2) * (-2 * page_offset_y_1_ratio + 2) * (-2 * page_offset_y_1_ratio + 2) / 2
let page_offset_y_1_ratio_eased = (page_offset_y_1_ratio < 0.5) * x + (page_offset_y_1_ratio >= 0.5) * y
let page_offset_y_1 = page_offset_y_1_ratio_eased * 2 * top
# ---

# ---
let a = btn_u_2.last
let b = btn_d_3.last
let x = min((t - a) * animation_speed, 1)
let y = max(1 - (t - b) * animation_speed, 0)
let page_offset_y_2_ratio = (a > b) * x + (a <= b) * y

let x = 4 * page_offset_y_2_ratio * page_offset_y_2_ratio * page_offset_y_2_ratio
let y = 1 - (-2 * page_offset_y_2_ratio + 2) * (-2 * page_offset_y_2_ratio + 2) * (-2 * page_offset_y_2_ratio + 2) / 2
let page_offset_y_2_ratio_eased = (page_offset_y_2_ratio < 0.5) * x + (page_offset_y_2_ratio >= 0.5) * y
let page_offset_y_2 = page_offset_y_2_ratio_eased * 2 * top
# ---

# o
let tmp_rect = [page_offset_x_1 + page_offset_x_2 + page_offset_x_3, page_offset_y_1 + page_offset_y_2, 0.1, 0.1]
img(id: o11, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)

let tmp_rect = [o11.l + 2, o11.t, 0.1, 0.1]
img(id: o12, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)

let tmp_rect = [o11.l + 4, o11.t, 0.1, 0.1]
img(id: o13, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)

let tmp_rect = [o11.l + 6, o11.t, 0.1, 0.1]
img(id: o14, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)

#>if(page_offset_y_1_ratio)
let tmp_rect = [o12.l, o11.t - 2 * top, 0.1, 0.1]
img(id: o22, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)
#>fi

#>if(page_offset_y_2_ratio)
let tmp_rect = [o12.l, o11.t - 4 * top, 0.1, 0.1]
img(id: o32, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)
#>fi

# btn_lr_1234
let tmp_rect = [o12.l - 0.1, o11.t + top - 0.05, 0.1, 0.1]
img(id: btn_r_1_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/right_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_r_1, r: tmp_rect, t:fit)

let tmp_rect = [o12.l, o12.t + top - 0.05, 0.1, 0.1]
img(id: btn_l_2_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/left_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_l_2, r: tmp_rect, t:fit)

let tmp_rect = [o13.l - 0.1, o12.t + top - 0.05, 0.1, 0.1]
img(id: btn_r_2_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/right_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_r_2, r: tmp_rect, t:fit)

let tmp_rect = [o13.l, o13.t + top - 0.05, 0.1, 0.1]
img(id: btn_l_3_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/left_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_l_3, r: tmp_rect, t:fit)

let tmp_rect = [o14.l - 0.1, o13.t + top - 0.05, 0.1, 0.1]
img(id: btn_r_3_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/right_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_r_3, r: tmp_rect, t:fit)

let tmp_rect = [o14.l, o14.t + top - 0.05, 0.1, 0.1]
img(id: btn_l_4_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/left_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_l_4, r: tmp_rect, t:fit)

# btn_ud_123
let tmp_rect = [o12.l + 1 - 0.05, o12.t, 0.1, 0.1]
img(id: btn_u_1_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/up_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_u_1, r: tmp_rect, t:fit)

#>if(page_offset_y_1_ratio)
let tmp_rect = [o22.l + 1 - 0.05, o12.t - 0.1, 0.1, 0.1]
img(id: btn_d_2_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/down_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_d_2, r: tmp_rect, t:fit)

let tmp_rect = [o22.l + 1 - 0.05, o22.t, 0.1, 0.1]
img(id: btn_u_2_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/up_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_u_2, r: tmp_rect, t:fit)
#>fi

#>if(page_offset_y_2_ratio)
let tmp_rect = [o32.l + 1 - 0.05, o22.t - 0.1, 0.1, 0.1]
img(id: btn_d_3_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/down_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_d_3, r: tmp_rect, t:fit)
#>fi

let $h = 2 * top - 0.02
```
