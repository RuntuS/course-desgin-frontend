<template>
  <div id="app">
<!--    <transition :name="transitionName">-->
      <router-view   :key="$route.fullPath" />
<!--    </transition>-->
  </div>
</template>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#app{
    height: 100%;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.5s ease-out;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>

<script>
  export default {
    data(){
      return {
        transitionName : ""
      }
    },
    watch : {
      // $route(to,from){
      //   if(to.meta.index > from.meta.index){
      //     this.transitionName = "slide-left" //向左滑动
      //   }else {
      //     this.transitionName = 'slide-right' //向右滑动
      //   }
      // }
    }

  }
</script>
