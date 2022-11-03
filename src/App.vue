
<template>
  <div class="link">
    <router-link to="/">
      <el-button>主页</el-button>
    </router-link>
    <router-link to="/login">
      <el-button>登录</el-button>
    </router-link>
    <router-link to="/virtualList">
      <el-button>虚拟列表</el-button>
    </router-link>
  </div>
  <div class="view">
    <router-view #default="{ route, Component }">
      <transition :enter-active-class="`animate__animated ${route.meta.transition}`">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.link {
  text-align: center;
}

.view {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
