# beat

`beat` 是RPE所有事件的时间单位，它是一个 `int[3]` ，在RPE中显示为 `[0]:[1]/[2]`。  
单BPM计算方式为：
```csharp
double beat = RPEBeat[1] / RPEBeat[2] + RPEBeat[0];
double seconds = 60 / BPM * beat;
```
多BPM计算方式见 Python 示例。

## Python 示例
- 若 `self.BPMList` 为一个 `list[BPMEvent]`
- `BPMEvent`定义:
```python
@dataclass
class BPMEvent:
    startTime: Beat
    bpm: float
```
- `sec2beat` 中 `t` 为秒数, `bpmfactor` 为判定线中的 `bpmfactor` 字段`
- `beat2sec` 中 `t` 为拍数, `bpmfactor` 为判定线中的 `bpmfactor` 字段`
- 且 `beat2sec(sec2beat(x)) == x` 与 `sec2beat(beat2sec(x)) == x` 的结果均为 `True`
- 则有:
```python
def sec2beat(self, t: float, bpmfactor: float):
    beat = 0.0
    for i, e in enumerate(self.BPMList):
        bpmv = e.bpm / bpmfactor
        if i != len(self.BPMList) - 1:
            et_beat = self.BPMList[i + 1].startTime.value - e.startTime.value
            et_sec = et_beat * (60 / bpmv)
            
            if t >= et_sec:
                beat += et_beat
                t -= et_sec
            else:
                beat += t / (60 / bpmv)
                break
        else:
            beat += t / (60 / bpmv)
    return beat

def beat2sec(self, t: float, bpmfactor: float):
    sec = 0.0
    for i, e in enumerate(self.BPMList):
        bpmv = e.bpm / bpmfactor
        if i != len(self.BPMList) - 1:
            et_beat = self.BPMList[i + 1].startTime.value - e.startTime.value
            
            if t >= et_beat:
                sec += et_beat * (60 / bpmv)
                t -= et_beat
            else:
                sec += t * (60 / bpmv)
                break
        else:
            sec += t * (60 / bpmv)
    return sec
```