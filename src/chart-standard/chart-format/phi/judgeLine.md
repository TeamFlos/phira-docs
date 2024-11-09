# judgeLine

每一个judgeLine（判定线）都含有以下字段：

|           字段名            |    类型     |    描述     |
|:------------------------:|:---------:|:---------:|
|           bpm            |   float   | 该判定线的bpm值 |
|        notesAbove        | JsonArray |  正面下落的音符  |
|        notesBelow        | JsonArray |  反面下落的音符  |
|       speedEvents        | JsonArray |   速度事件    |
|   judgeLineMoveEvents    | JsonArray |   移动事件    |
|  judgeLineRotateEvents   | JsonArray |   旋转事件    |
| judgeLineDisappearEvents | JsonArray |   透明度事件   |

- **注意: 所有事件及Note的有关时间的项, 单位都为 `1.875 / bpm` s**
- **这里我们定义:**
  - "宽度单位" 为 `0.05625 * 谱面渲染范围宽度`
  - "高度单位" 为 `0.6 * 谱面渲染范围高度`
- [事件](./event.md)
- [Note](./note.md)
