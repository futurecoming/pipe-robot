<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
html,body{
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}
body{
  background-color: #f0f3fa;
  user-select: none;
}
ul{
  list-style: none;
  li:hover {
    cursor: pointer;
  }
}
a{
  text-decoration: none;
}
.fl{
  float: left;
}
.fr{
  float: right;
}

#app{
  width: 100%;
  height: 100%;
}

.router-link-active{
  background-color: #7598ea; //选中颜色
  color: white;
}


</style>
