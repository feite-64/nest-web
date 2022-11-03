<template>
  <!-- 外部容器用来固定列表容器的高度，同时生成滚动条 -->
  <div ref="scrollRef" class="list-container">
    <!-- 内部容器用来装元素，高度是所有元素高度的和 -->
    <div ref="InnerRef" class="list-container-inner"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
/** --------- 一些基本变量 -------- */
const itemHeight = 60
const height = 500

/** --------- 生成数据 -------- */
const initData = () => {
  const data = []
  for (let i = 0; i < 100000; i++) {
    data.push({ content: `内容:${i}`, height: itemHeight, color: i % 2 ? 'red' : 'yellow' })
  }
  return data
}
const data = initData()

// const contentHeight = itemHeight * data.length
// 容器dom
const scrollRef = ref<HTMLDivElement>()
// 内容dom
const InnerRef = ref<HTMLDivElement>()
// 事件回调函数
const scrollCallback = () => {
  // 取到滚动出去的高度
  const scrollTop = Math.max(scrollRef.value!.scrollTop, 0)
  // 通过距离顶部高度计算出现在是第几个元素
  const startIndex = Math.floor(scrollTop / itemHeight)
  // 得出不需要显示的数据数量，根据已显示和正在显示数
  const endIndex = startIndex + Math.ceil(height / itemHeight)

  // 从data取出要渲染的元素并渲染到容器中
  const viewData = data.slice(startIndex, endIndex + 1)
  // 每次滚动初始化内容区的显示数据
  InnerRef.value!.innerHTML = ''
  // 循环遍历显示数据
  for (let i = 0; i < viewData.length; i++) {
    const item = document.createElement('div')
    const itemData = viewData[i]
    item.innerHTML = itemData.content
    item.setAttribute('style', `height: ${itemData.height}px; background: ${itemData.color}`)
    InnerRef.value!.appendChild(item)
  }

  // 未渲染的元素由padding-top和padding-bottom代替，保证滚动条位置正确
  const paddingTop = startIndex * itemHeight
  const paddingBottom = (data.length - endIndex) * itemHeight
  InnerRef.value!.setAttribute('style', `padding-top: ${paddingTop}px; padding-bottom: ${paddingBottom}px`)
}
onMounted(() => {
  // 首屏渲染
  scrollCallback()
  // 监听外部容器的滚动事件
  scrollEvent()
})
// 监听事件
const scrollEvent = () => {
  scrollRef.value?.addEventListener('scroll', scrollCallback)
}
</script>

<style scoped lang="scss">
.list-container {
  overflow: auto;
  border: 1px solid black;
  height: 500px;

  &-inner {
    width: 300px;
  }
}
</style>
