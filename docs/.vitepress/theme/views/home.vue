<template>
	<div class="home-container">
		<div class="video-container" v-cloak>
			<!-- <video v-if="!curDeviceIsMobile" class="logo-video" autoplay preload="auto" loop muted>
				<source
					src="https://zhangjunjie.pages.dev/template.mp4"
					type="video/mp4"
				/>
			</video> -->


			<!-- <video v-if="!curDeviceIsMobile" class="logo-video" autoplay preload="auto" loop muted>
				<source
					src="https://ali.xmssdn.micloud.mi.com/2/1566455553514/download_file?attachment=0&fn=&ct=video%2Fmp4&meta=QzFQADeWsUicAikl-hsIQiTw-y6IHU0tOEWh70oyUvuHrNoWpDD1UmJkugMhFPiTHXDFC-RJ-xcPyZI-px1qxeKpdB6osjD5K54hCtlrlMaio76_J5zBPoBlNIJcpcFmgCfjXMRYH5ThK1VS6wVzvVBy0cmYaoL141Gc_4YYkyZvj7f9JjZ-WNIHZQwdiWlcV4Oozy2bfcpZ902-m8TKIIm1Cs6u2TKW-RDsg6XnXqXeue89lDOmY7wEm1oIIyP_62TcWvF850Y&ts=1740149272070&sig=bxQbB3pc2NHqcQlJaqtWWbeDhwc&_cachekey=d8a93c25de3a96f0695986dfb269abb9"
					type="video/mp4"
				/>
			</video> -->

			<video class="logo-video" autoplay preload="auto" loop muted>
				<source
					src="https://ali.xmssdn.micloud.mi.com/2/1566455553514/download_file?attachment=0&amp;fn=dGVtcGxhdGUubXA0&amp;ct=video%2Fmp4&amp;meta=QzFfithPtxTpIvItNeBoQUq-zXaQBE1NZlih70ZfK47jjudFw6b4YqFW90pdDXI8IVpUHgmhslIkDvK1rHUIk_GBW9fvw7xajzgo68q0YsOI2DDe_lhlV_AIL4YkvssylDnRXecsROFYeG_YLYku7IvB0U-ResVuEl-qrS9Zwizr4RSuzSR8iJU9qs9uD38Ga5EvPdv29eIan1jeZAVpfD2P-Kjofv7_841WmYNo0-Hu59RH8VbJVMQHm10GOGX__lA&amp;ts=1740078711000&amp;sig=g2eJyjkHjmCHqT7sQ5NTqLRXedM&amp;_cachekey=42836613eadf6f32d91f7784896887a4"
					type="video/mp4"
				/>
			</video>

			<!-- <video class="logo-video" autoplay preload="auto" loop muted src="https://ali.xmssdn.micloud.mi.com/2/1566455553514/download_file?attachment=0&amp;fn=&amp;ct=video%2Fmp4&amp;meta=QzFQADeWsUicAikl-hsIQiTw-y6IHU0tOEWh70oyUvuHrNoWpDD1UmJkugMhFPiTHXDFC-RJ-xcPyZI-px1qxeKpdB6osjD5K54hCtlrlMaio76_J5zBPoBlNIJcpcFmgCfjXMRYH5ThK1VS6wVzvVBy0cmYaoL141Gc_4YYkyZvj7f9JjZ-WNIHZQwdiWlcV4Oozy2bfcpZ902-m8TKIIm1Cs6u2TKW-RDsg6XnXqXeue89lDOmY7wEm1oIIyP_62TcWvF850Y&amp;ts=1740149272070&amp;sig=bxQbB3pc2NHqcQlJaqtWWbeDhwc&amp;_cachekey=d8a93c25de3a96f0695986dfb269abb9"></video> -->




			
			<!-- <video  class="logo-video" autoplay preload="auto" loop muted src="https://download.cloud.189.cn/file/downloadFile.action?dt=51&amp;expired=1740071545882&amp;play=1&amp;sk=c3b3a123-8c5c-469c-a513-9ce4423d59e0&amp;ufi=423461130465876398&amp;zyc=180&amp;token=cloud4&amp;sig=La5V3cZE5l%2Bx86SwvQ94MnKv6Ds%3D"></video> -->

		
			 
			


			

			<!-- 如果是移动端，上述样式会不兼容，故降级为图片显示 -->
			<!-- <div v-else class="image-container">
				<img src="/static.png" alt="" />
				<p class="logo-text">hello</p>
			</div> -->
			<div class="button-container-outer" @click="handleClick">
				<div class="container-button">
					<div class="hover bt-1"></div>
					<div class="hover bt-2"></div>
					<div class="hover bt-3"></div>
					<div class="hover bt-4"></div>
					<div class="hover bt-5"></div>
					<div class="hover bt-6"></div>
					<button></button>
				</div>
			</div>
		</div>
		<div class="main-content">
			<div class="max-width">
				<!-- <about-me></about-me> -->
				<div class="recently-posts-head">
					<div class="title">最新博客</div>
					<link-button text="博客归档" link="/博客/"></link-button>
				</div>
				<div class="recently-posts">
					<div class="post-item" v-for="post in recentlyPosts" :key="post.date">
						<article-card
							:text="post.text"
							:link="post.link"
							:date="post.date"
						></article-card>
					</div>
				</div>
				<div class="comment-container">
					<div class="comment-title">站内留言板</div>

					<!-- <ClientOnly>
						<comment class="comment"></comment>
					</ClientOnly> -->
					

					<ClientOnly>
						<ValineComment />
					</ClientOnly>
					
					
				</div>
			</div>
		</div>
	</div>

	
</template>

<script lang="ts" setup>
import articleCard from "../components/articleCard.vue";
import ValineComment from '../components/ValineComment.vue';
import { getRecentlyPost } from "./../../utils/getRecentlyPost";
import linkButton from "../components/linkButton.vue";
import { type Ref, onBeforeMount } from "vue";
import { isMobile } from "./../../utils/mobile";
// import aboutMe from "../components/aboutMe.vue";
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()

const startWorkTime = ref('')
const getEndTime = (workTime: number) => {
	
    if (!startWorkTime.value) {
        return '--'
    } else {
        return dayjs(startWorkTime.value).add(workTime * 60, 'm').format('HH:mm:ss')
    }
}
const endWorkTime = computed(() => getEndTime(8.5))
const freeDinerTime = computed(() => getEndTime(11))
const showTime = ref(false)
const handleClick = () => {
	
    jsConfetti.addConfetti()
    showTime.value = true

	const navHeight = isMobile() ? 48 : 63;
	window.scrollBy({
		top: window.innerHeight - navHeight, // Scroll 100vh
		behavior: "smooth", // Smooth scrolling
});
}
const defaultTime = dayjs().set('hour', 9).set('minute', 0).set('second', 0)



interface IRecentlyPosts {
	text: string;
	link: string;
	date: string;
}

const initRecentlyPosts = getRecentlyPost();
const recentlyPosts: Ref<IRecentlyPosts[]> = ref(
	initRecentlyPosts.map((item) => ({
		date: item.link.substring(4, 14),
		text: item.text.substring(2),
		link: item.link,
	}))
);
const curDeviceIsMobile = ref(false);

onBeforeMount(() => {
	curDeviceIsMobile.value = isMobile();
});

// function handleClick() {
// 	const navHeight = isMobile() ? 48 : 63;
// 	window.scrollBy({
// 		top: window.innerHeight - navHeight, // Scroll 100vh
// 		behavior: "smooth", // Smooth scrolling
// 	});
// }


</script>
<style lang="scss" scoped>
/* v-if闪烁问题 */
[v-cloak] {
	display: none !important;
}

.video-container {
	background-color: var(--vp-c-bg);
	/*进行视频裁剪*/
    // overflow: hidden;

	// /*保证视频充满屏幕*/
    // object-fit: cover;
    // min-height: 800px;

	height: 100vh;
	width: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	position: relative;
	top: 0;

	.logo-video {
		mix-blend-mode: difference;
		height: 100%;
		min-width: 100%;
		object-fit: cover;
	}

	.image-container {
		width: 60vw;
		margin-top: 25vh;
	}

	.logo-text {
		text-align: center;
		padding-top: 25px;
		font-family: "Lucida Handwriting";
		font-size: 25px;
		line-height: 40px;
	}
}

/* 小于960px会增加return-top那一栏并且不会透明 */
@media (max-width: 970px) {
	.video-container {
		height: calc(100vh - var(--vp-nav-height) - 47px);
	}
}


.button-container-outer {
	position: absolute;
	bottom: 8%;
	width: 100%;
	display: flex;
	justify-content: center;
	

	.container-button {
		
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-template-areas:
			"bt-1 bt-2 bt-3"
			"bt-4 bt-5 bt-6";
		position: relative;
		perspective: 800;
		padding: 0;
		width: 135px;
		height: 47px;
		// transition: all 0.3s ease-in-out;
		transform: scale(0.95);
	}

	.container-button:active {
		transform: scale(0.95);
	}

	.hover {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 200;
	}

	.bt-1 {
		grid-area: bt-1;
	}

	.bt-2 {
		grid-area: bt-2;
	}

	.bt-3 {
		grid-area: bt-3;
	}

	.bt-4 {
		grid-area: bt-4;
	}

	.bt-5 {
		grid-area: bt-5;
	}

	.bt-6 {
		grid-area: bt-6;
	}

	.bt-1:hover ~ button {
		transform: rotateX(15deg) rotateY(-15deg) rotateZ(0deg);
		box-shadow: -2px -2px #18181888;
	}

	.bt-1:hover ~ button::after {
		animation: shake 0.5s ease-in-out 0.3s;
		text-shadow: -2px -2px #18181888;
	}

	.bt-3:hover ~ button {
		transform: rotateX(15deg) rotateY(15deg) rotateZ(0deg);
		box-shadow: 2px -2px #18181888;
	}

	.bt-3:hover ~ button::after {
		animation: shake 0.5s ease-in-out 0.3s;
		text-shadow: 2px -2px #18181888;
	}

	.bt-4:hover ~ button {
		transform: rotateX(-15deg) rotateY(-15deg) rotateZ(0deg);
		box-shadow: -2px 2px #18181888;
	}

	.bt-4:hover ~ button::after {
		animation: shake 0.5s ease-in-out 0.3s;
		text-shadow: -2px 2px #18181888;
	}

	.bt-6:hover ~ button {
		transform: rotateX(-15deg) rotateY(15deg) rotateZ(0deg);
		box-shadow: 2px 2px #18181888;
	}

	.bt-6:hover ~ button::after {
		animation: shake 0.5s ease-in-out 0.3s;
		text-shadow: 2px 2px #18181888;
	}

	.hover:hover ~ button::before {
		background: transparent;
	}

	.hover:hover ~ button::after {
		content: "Click!";
		top: -100%;
		transform: translate(-50%, 0);
		font-size: 34px;
		// color: #f19c2b;
		color: var(--vp-c-brand);
	}

	button {
		position: absolute;
		padding: 0;
		width: 135px;
		height: 47px;
		background: transparent;
		font-size: 17px;
		font-weight: 900;
		// border: 3px solid #f39923;
		color: var(--vp-c-brand);
		border-radius: 12px;
		transition: all 0.3s ease-in-out;
	}

	button::before {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 135px;
		height: 47px;
		background-color: var(--vp-c-brand);
		// color: var(--vp-c-brand);
		border-radius: 12px;
		transition: all 0.3s ease-in-out;
		z-index: -1;
	}

	button::after {
		content: "开始";
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 135px;
		height: 47px;
		background-color: transparent;
		font-size: 17px;
		font-weight: 900;
		line-height: 47px;
		color: #ffffff;
		border: none;
		border-radius: 12px;
		transition: all 0.3s ease-in-out;
		z-index: 2;
	}

	// @keyframes shake {
	// 	0% {
	// 		left: 45%;
	// 	}

	// 	25% {
	// 		left: 54%;
	// 	}

	// 	50% {
	// 		left: 48%;
	// 	}

	// 	75% {
	// 		left: 52%;
	// 	}

	// 	100% {
	// 		left: 50%;
	// 	}
	// }
}

.main-content {
	background-color: var(--vp-c-bg);
	background-image: linear-gradient(
			90deg,
			var(--vp-c-bg-mute) 3%,
			rgba(0, 0, 0, 0) 4.5%
		),
		linear-gradient(var(--vp-c-bg-mute) 3%, rgba(0, 0, 0, 0) 4.5%);
	background-size: 25px 25px;

	.max-width {
		max-width: 1260px;
		padding: 0 40px;
		margin: auto;
		background-color: var(--vp-c-bg);	//最新博客div，透明背景
		
		/* box-shadow: 0 200px 200px 200px var(--vp-c-bg); */

		.recently-posts-head {		//首页最新博客
			display: flex;
			justify-content: space-between;
			padding: 20px 40px;

			.title {
				font-size: 20px;
				font-weight: 900;
			}
		}
		.recently-posts {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			padding: 15px;
			height: 340px;
			overflow: hidden;
			.post-item {
				margin: 10px;
			}
		}

		.comment-container {
			margin-top: 40px;
			padding: 40px;
			padding-bottom: 0px;

			.comment-title {
				font-size: 20px;
				font-weight: 900;
				margin-bottom: 20px;
			}

			.comment {
				padding: 0 60px;
			}
		}

		@media (max-width: 960px) {
			.recently-posts-head {
				display: flex;
				justify-content: space-between;
				padding: 20px 10px;
			}

			.comment-container {
				padding: 10px;

				.comment {
					padding: 0;
				}
			}
		}
	}
}

// footer {
// 	margin-top: 20px;
// 	padding: 20px;
// 	font-size: 14px;
// 	border-top: 1px solid var(--vp-c-bg-mute);
// 	height: 100px;
// 	text-align: center;
// }

.VPContent {
	padding-top: 0 !important;
}

//手机页面宽度修改
.main-content .max-width{
    width: auto;
    padding:0px;
  }

//   .VPNav .VPNavBar{
// 	padding: 0px;
// 	margin: 0px;
//   }
</style>
