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

## 首页静态布局

