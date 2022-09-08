## 异步数据流对接首页数据

### 1.轮播图

1. api/index/index.js进行异步请求

2. api/index/index.js里面的request()是axios请求，config.baseApi是env环境里面的URL

   #### 进行异步请求

   1. 在api/index/index.js进行异步请求

      ```javascript
      //首页轮播图
      export function getSwipeData() {
        return request(config.baseApi + '/home/index/slide?token=' + config.token)
      }
      ```

   2. 在VueX中使用

      ```javascript
      actions: {
          getSwiper(conText) {
            getSwiperData().then(res => {
              console.log(res)
            })
          }
       }
      ```

      

   3. 在首页中调用

      ```javascript
      //首先导入vuex的辅助函数
      import { mapActions } from 'vuex'
      在 methods 中使用
      ...mapActions({
            getSwiper:'index/getSwiper'   index是指vuex中的index模块，getSwiper对应vuex中的 actions 中getSwiper方法
      }),
      执行getSwiper方法因为是数据，在created()中调用
      ```

      

   4. 

   5. 

   6. 