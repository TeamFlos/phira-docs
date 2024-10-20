# Note
note，即音符，是谱面的主要构成之一，每个note都应该含有以下参数：

|字段名|类型|描述|单位|
|:-:|:-:|:-:|:-:|
|type|int|note的类型|-|
|time|float|note的时间|`1.875 / bpm`|
|holdTime|float|hold的持续时间<br>(仅hold, 其他为0.0)|`1.875 / bpm`|
|positionX|float|note的横向坐标|宽度单位|
|speed|float|对于非hold: note的速度倍率<br>对于hold: hold的打击时的速度<br>tip: hold在打击之前的速度倍率恒为1|-|
|floorPosition|float|note打击时判定线流过的速度 (仅方便计算)|高度单位|