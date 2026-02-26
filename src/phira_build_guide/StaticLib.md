# 静态库（prpr-avc）

## 介绍
- 此文件为 Phira 使用的用于解码视频的静态库，此静态库由 [FFmpeg commit hash 4a80db5fc2b1b134550ffbcb8fd3b7ce2ad734b3](https://github.com/FFmpeg/FFmpeg/commit/4a80db5fc2b1b134550ffbcb8fd3b7ce2ad734b3) 编译而来。
- Phira 引用的静态库 FFmpeg 版本无需非常严格，使用什么版本由您决定，但是当您需要修改音视频解码相关功能并做出贡献时，请严格遵守这一版本，当前官方提供的[静态库](https://www.nuanr-mxi.com/prpr-avc.zip)都由此版本编译，由贡献者贡献的静态库可能版本不一致。
- prpr-avc 仅包含最精简的 FFmpeg 组件，编译选项为：
```shell
--disable-everything \
--enable-decoder=h264 \
--enable-decoder=aac \
--enable-decoder=aac_latm \
--enable-decoder=flac \
--enable-decoder=mp3 \
--enable-decoder=vorbis
```
## 构建（以i686-pc-windows-gnu为例）

1. 下载 [FFmpeg n5.1.8 源代码（GitHub）](https://github.com/FFmpeg/FFmpeg/archive/refs/tags/n5.1.8.tar.gz) 并解压到任意目录。
   - _如介绍所述，FFmpeg 版本无需特别严格，您也可以选择其他版本的 FFmpeg 进行构建，但是当您需要修改音视频解码相关功能并做出贡献时，请严格遵守这一版本_
2. 在 `sh` 上操作（此处使用msys2，注意要将ffmpeg源码复制到 `C:\msys64\home\您的用户名`，编译选项并不绝对，您可以自行查阅资料进行自定义）。

```sh
cd FFmpeg-n5.1.8 && mkdir build && cd build

../configure \
  --disable-programs \
  --disable-doc \
  --disable-everything \
  --disable-debug \
  --arch=i686 \
  --target_os=mingw32 \
  --cross-prefix=i686-w64-mingw32-
  
make
```

note:这里有个坑。。。如果报错的话尝试把 msys64\mingw32\bin 这个目录下的 i686-w64-mingw32-gcc-ar.exe , i686-w64-mingw32-gcc-nm.exe , i686-w64-mingw32-gcc-ranlib.exe 复制粘贴一份然后重命名成 i686-w64-mingw32-ar.exe , i686-w64-mingw32-nm.exe , i686-w64-mingw32-ranlib.exe

接着把build文件夹下的所有形如 `*.a` 的文件复制到 `phira\prpr-avc\static-lib\i686-pc-windows-gnu` 就可以啦

- __注意：以上操作仅能保证 cargo 正常编译并输出主程序，如需用于视频解码请自行在 configure 启用 protocol=file，decoders，parsers 等选项，如介绍所示__

## MSVC 构建静态库
- 由于 ffmpeg 的 configure 本身就不为 MSVC 服务，其构建极具挑战性，我们不建议您自行构建 MSVC 版本的静态库，如果您需要 MSVC 版本的静态库，请 [直接下载](https://www.nuanr-mxi.com/prpr-avc.zip)。
- 如果您坚持挑战构建，请参考上述的 GNU 构建方法，配合 [这篇教程](https://github.com/ffiirree/ffmpeg-tutorials/blob/master/compile_on_windows.md) 进行构建操作。