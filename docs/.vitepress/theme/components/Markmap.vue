<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Transformer } from 'markmap-lib'
import { Markmap } from 'markmap-view'

const props = defineProps({
    content: String
})

const svgRef = ref()
const transformer = new Transformer()

onMounted(() => {
    if (typeof window === 'undefined') return;
    const { root } = transformer.transform(props.content)
    Markmap.create(svgRef.value, {}, root)
})

const exportAsJpg = async () => {
    const svg = svgRef.value
    if (!svg) return
    // 克隆SVG节点，避免污染原始DOM
    const clonedSvg = svg.cloneNode(true)
    // 计算宽高
    const width = svg.clientWidth || 800
    const height = svg.clientHeight || 500
    // 创建canvas
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    // 将SVG序列化为字符串
    const serializer = new XMLSerializer()
    let svgString = serializer.serializeToString(clonedSvg)
    // 兼容处理：加上xmlns属性
    if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
        svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
    }
    // 创建图片对象
    const img = new window.Image()
    img.onload = function () {
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0, width, height)
        const url = canvas.toDataURL('image/jpeg')
        const link = document.createElement('a')
        link.href = url
        link.download = 'markmap.jpg'
        link.click()
    }
    img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgString)))
}
</script>

<template>
    <div class="relative w-full" style="border: 1px solid #f1f0ed;border-radius: 10px;">
        <svg ref="svgRef"
            class="w-full h-[50vh] max-h-[500px] min-h-[200px] my-4 rounded-lg border dark:border-zinc-700 transition-all duration-300 bg-white bg-opacity-30" />
        <button @click="exportAsJpg"
            class="absolute top-2 right-2 px-3 py-1 bg-blue-500 text-white rounded shadow hover:bg-blue-600">导出</button>
    </div>
</template>