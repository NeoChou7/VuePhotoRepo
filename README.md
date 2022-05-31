# photo-repo-webpack

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



bug
1. 影片使用資料驅動，由於播放進度會一直修改videos資料，導致使用到video的資料一直刷新畫面
2. [X]可以同時播放多部影片(已改為事件驅動，暫停上一部，播放這一部)
3. 放大無法啟動播放影片
