<template>
	<div id="mindmap" :style="{ height: height + 'px' }"></div>
</template>

<script setup>
import { useRouter } from "vitepress";
import { onMounted, defineProps } from "vue";
import MindMap from "simple-mind-map";

const router = useRouter();
const props = defineProps({
	data: Object,
	height: {
		type: String,
		default: 500,
	},
	offsetLeft: {
		type: String,
		default: "center",
	},
});

onMounted(() => {
	init();
});

function init() {
	let initRootNodePosition;
	if (props.offsetLeft == "center") {
		initRootNodePosition = ["center", "center"];
	} else {
		initRootNodePosition = [Number(props.offsetLeft), "center"];
	}
	const mindMap = new MindMap({
		el: document.getElementById("mindmap"),
		data: props.data,
		initRootNodePosition,
		enableFreeDrag: true, // 是否启用拖拽
		iconList: [
			{
				name: "link",
				type: "custom",
				list: [
					{
						name: "1",
						icon: `<svg t="1738981820145" class="icon" viewBox="0 0 1109 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2946" width="18" height="18"><path d="M251.136 160.725333a92.458667 92.458667 0 1 1 0-73.984h262.613333l184.874667 184.917334h85.589333a92.458667 92.458667 0 1 1 0 73.941333h-116.224l-184.917333-184.874667zM425.258667 364.074667a92.458667 92.458667 0 1 1-84.736 129.450666H214.144a92.458667 92.458667 0 1 1 0-73.984h126.378667a92.458667 92.458667 0 0 1 84.736-55.466666z" fill="#1DA379" p-id="2947"></path><path d="M758.058667 900.266667m-92.458667 0a92.458667 92.458667 0 1 0 184.917333 0 92.458667 92.458667 0 1 0-184.917333 0Z" fill="#1DA379" p-id="2948"></path><path d="M979.925333 438.058667A92.458667 92.458667 0 1 1 895.146667 567.466667h-215.893334L383.573333 863.274667h-169.386666a92.458667 92.458667 0 1 1 0-73.941334h138.666666l295.893334-295.808h246.485333a92.458667 92.458667 0 0 1 84.736-55.466666z" fill="#1DA379" p-id="2949"></path></svg>`,
					},
				],
			},
		],
	});

	// 监听节点点击事件
	mindMap.on("node_click", function (...args) {
		const { nodeData } = args[0];
		const link = nodeData.data?.link;
		if (link) {
			router.go("/web" + link);
		}
	});
}
</script>

<style>
#mindmap {
	width: 100%;
	overflow: hidden;
	overflow-x: auto;
}
</style>
