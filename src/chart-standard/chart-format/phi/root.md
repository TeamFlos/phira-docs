# Phigros Official谱面根目录结构

- 目前`Phigros Official`谱面的数据计算与渲染已经十分成熟
- 所有的时间单位均为 `128分音符` 即 `60 / 32 / bpm`, 下文简写为 `1.875 / bpm`

## 谱面根目录结构

### formatVersion

- `formatVersion` 是一个 `int`
- 该项影响谱面判定线移动事件的解析方式
- 该值可能 为`1`, `3` 或其他

### offset

- `offset` 是一个 `float`
- 该项为谱面的延迟, 单位为秒
- 为正数时, 谱面比音乐快, 为负数时, 谱面比音乐慢

### judgeLineList

- `judgeLineList` 是一个 `JsonArray`，包含若干个 `JsonObject`，每个 `JsonObject` 代表一个[判定线](./judgeLine.md)。
