# beat

`beat` 是RPE所有事件的时间单位，它是一个 `JsonArray` ，在RPE中显示为 `[0]:[1]/[2]`。  
单BPM计算方式为：
```csharp
double beat = RPEBeat[1] / RPEBeat[2] + RPEBeat[0];
double seconds = BPM * beat / 60;
```
多BPM计算方式待补充。