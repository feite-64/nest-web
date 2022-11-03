<template>
  <ul>
    <li @click="shopClick(item)" v-for="item in shoplist" :key="item.id">{{ item.title }}</li>
  </ul>
</template>

<script setup lang='ts'>
import { useShopStore } from '@/store/shopStore';
import shoplist from './shopList.json'

import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const store = useShopStore()
const shopClick = (data: { id: number, title: string }) => {
  // 获取当前商店数据
  store.getdata(data.id);
  router.push(`/shop/${data.id}`)
}

</script>

<style scoped lang='scss'>
ul {
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  li {
    font-size: 20px;
    color: red;
  }
}
</style>