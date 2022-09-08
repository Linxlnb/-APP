## 底部导航栏

### 1.布局

```javascript
<template>
  <div>
    <router-view></router-view>
    <div class="buttom-nav">
      <ul :class="{ home: true, active: homeStyle }" @click="goPage('/index')">
        <li></li>
        <li>首页</li>
      </ul>
      <ul :class="{ cart: true, active: cartStyle }" @click="goPage('/cart')">
        <li></li>
        <li>购物车</li>
      </ul>
      <ul :class="{ my: true, active: myStyle }" @click="goPage('/my')">
        <li></li>
        <li>我的</li>
      </ul>
    </div>
  </div>
</template>
```

### 2.配置路由

```javascript
{
      path: '/',
      name: 'home',
      component: () => import('./pages/home/main'), //路由懒加载解决首屏加载慢，性能优化
      meta: { keepAlive: false },
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('./pages/home/index'),
          meta: { keepAlive: true, title: '首页' }
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('./pages/home/cart'),
          meta: { keepAlive: false, title: '购物车' }
        },
        {
          path: 'my',
          name: 'my',
          component: () => import('./pages/user/ucenter'),
          meta: { keepAlive: false, title: '我的' }
        }
      ]
    },
```

注意路由懒加载、路由重定向、keepAlive开启路由缓存

meta里面是需要传递的参数

### 3.添加点击事件

```javascript
goPage(url) {
      this.$router.replace(url)
},
```

### 4.改变页面title属性

```javascript
created() {
    document.title = this.$route.meta.title
    this.changeStyle(this.$route.name)
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to)
    document.title = to.meta.title
    //this.changeStyle(to.name)
    next()
  },
```

### 5.改变底部导航栏颜色

```javascript
methods:{
changeStyle(name) {
      switch (name) {
        case 'index':
          this.homeStyle = true
          this.cartStyle = false
          this.myStyle = false
          break
        case 'cart':
          this.homeStyle = false
          this.cartStyle = true
          this.myStyle = false
          break
        default:
          this.homeStyle = false
          this.cartStyle = false
          this.myStyle = true
          break
      }
    }
}
```

```javascript
beforeRouteUpdate(to, from, next) {
    console.log(to)
    //document.title = to.meta.title
    **this.changeStyle(to.name)**
    next()
  },
```

因为开启了路由缓存，在第一次点击首页后第二次点击时颜色没有改变，所以要解除缓存

### 6.*解除缓存*

```javascript
activated() {
    document.title = this.$route.meta.title
    this.changeStyle(this.$route.name)
 }
```

## 首页JS动态效果

### 1.顶部header颜色变化

```javascript
<div :class="{ header: true, scroll: isScrollTop }">
              <div class="classify-icon"></div>
              <div class="search-wrap">
                <div class="search-icon"></div>
                <div class="text">请输入宝贝名称</div>
              </div>
              <div class="login">登录</div>
</div>
....
data() {
    return {
      isScrollTop: false
    }
  },
created() {
    //isScroll确保事件只执行一次
    this.isScroll = true
    window.addEventListener('scroll', this.eventScrollTop)
},
methods: {
    eventScrollTop() {
      let scrollTop =document.body.scrollTop || document.documentElement.scrollTop
      if (scrollTop >= 150) {
        if (this.isScroll) {
          console.log(true)
          this.isScroll = false
          this.isScrollTop = true
        }
      } else {
        if (!this.isScroll) {
          console.log(false)
          this.isScroll = true
          this.isScrollTop = false
        }
      }
    }
  },
//当我们离开这个页面的时候，便会调用这个函数
destroyed() {
    window.removeEventListener('scroll', this.eventScrollTop)
  },
//keep-alive进入时触发
activated() {
    this.isScroll = true
    window.addEventListener('scroll', this.eventScrollTop)
  },
//keep-alive离开时触发
deactivated() {
    window.removeEventListener('scroll', this.eventScrollTop)
  }
```

难点：1.单页面应用在离开页面时要移除事件，当组件有keepAlive缓存时，在进入和离开时都要绑定或是移除事件

​			2.确保滚动事件只执行一次，把变量定义在created()钩子函数里面

### 2.轮播图  swiper

文件导入：@import '../../../assets/css/common/swiper.css';  导入css一定要加@

​				import Swiper from '../../../assets/js/libs/swiper'   导入js

```javascript
<div class="banner-wrap">
      <div class="swiper-container" ref="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="//vueshop.glbuys.com/uploadfiles/1484285302.jpg" alt="" />
          </div>
          <div class="swiper-slide">
            <img src="//vueshop.glbuys.com/uploadfiles/1484285334.jpg" alt="" />
          </div>
          <div class="swiper-slide">
            <img src="//vueshop.glbuys.com/uploadfiles/1524206455.jpg" alt="" />
          </div>
        </div>
        <div class="swiper-pagination" ref="swiper-pagination"></div>
      </div>
 </div> 

//有关DOM操作放在mounted()里面
  mounted() {
    new Swiper(this.$refs['swiper-container'], {
      autoplay: 3000,
      pagination: this.$refs['swiper-pagination'],
      paginationClickable: true,
      autoplayDisableOnInteraction: false
    })
  },
```

使用$refs时，在HTML标签里面要添加  ref="类名"   `ref="swiper-pagination"`

