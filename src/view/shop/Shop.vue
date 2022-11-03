<template>

  <div class="shop">
    <div>
      <ul>
        <li v-for="item in store.shop" :key="item.id">{{ item.title }}</li>
      </ul>
    </div>
    <div class="download">
      <el-button @click="downloadClick">下载图片</el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useShopStore } from '@/store/shopStore';
import { imgDownLoad, imgStream } from '@/utils/downloadRequest';
const store = useShopStore()
const downloadClick = async () => {
  // 下载文件流
  // const { data } = await imgStream()
  // const blob = new Blob([data])
  // const url = URL.createObjectURL(blob)
  // const a = document.createElement('a')
  // a.href = url
  // a.download = '文件流.zip'
  // a.click()

  // 下载图片
  // 获取数据
  const { data } = await imgDownLoad()
  // blob识别
  const blob = new Blob([data])
  // 转成链接
  const url = URL.createObjectURL(blob)
  // 使用a标签下载
  const a = document.createElement('a')
  a.href = url
  a.download = '小草神.png'
  a.click()
}
</script>

<style scoped lang='scss'>
.shop {
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

}
</style>