# Bundle size test of [Hywer](https://github.com/ssleert/hywer)
## Bun.Build + UglifyJS3

### How to measure?
```fish
$ git clone https://github.com/ssleert/hywer-bundle-size
$ cd ./hywer-bundle-size/
$ bun i
$ bun run build
$ wc -c ./build/index.js*
2045 ./build/index.js
1015 ./build/index.js.br
1094 ./build/index.js.gz
4154 total
```
