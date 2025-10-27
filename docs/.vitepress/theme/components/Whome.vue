<template>
	<div class="home-container">
		<div class="video-container" v-cloak>
			<video v-if="!curDeviceIsMobile" class="logo-video" autoplay loop muted>
				<source
					src="https://zhangjunjiee.netlify.app/template.mp4"
					type="video/mp4"
					/>
			</video>
			<!-- 如果是移动端，上述样式会不兼容，故降级为图片显示 -->
			<div v-else class="image-container">
				<img src="https://oss.justin3go.com/justin3goAvatar.png" alt="" />
				<p class="logo-text">Justin3go's Blog</p>
			</div>
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
			</div>
		</div>

	</div>


  <div id="about">
    <div class="container">
      <el-row class="container-row" :gutter="24">
        <el-col :xs="24" :sm="12" :md="11" class="container-left pos-relative">
			<div class="card-container">
				<div class="e-card playing">
					<div class="image"></div>

					<div class="wave"></div>
					<div class="wave"></div>
					<div class="wave"></div>

					<div class="infotop"></div>
<!-- *****************************大标题************************************** -->     

          <div class="flex">
            <div class="title">
              <h1 class="about-title">
                <span>{{ aboutData.title }}</span>
              </h1>

			  
              <h3 class="about-title">
                <span>{{ aboutData.subtitle }}</span>
              </h3>


			  
            </div>
          </div>

  <!-- *********************** 滚动标签 *************************** -->
			<div id="tag">
				<div class="swiper">
					<div class="swiper-wrapper">
						<div
							class="swiper-container"
							v-for="(i, idx) of 3"
							:key="idx"
							:style="'--swiper-animation-time: ' + tags.length * 3 + 's'">
							<div class="swiper-item" v-for="(item, index) of tags" :key="index">
  <a 
    class="inline-block px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-full text-sm font-medium no-underline transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:transform hover:-translate-y-0.5 hover:shadow-md mr-5 mb-0 mt-1"
    :href="'pages/tags?q=' + encodeURIComponent(item)"
  >
    # {{ item }}
  </a>
</div>
						</div>
					</div>
				</div>
			</div>
  <!-- *********************** 滚动标签 *************************** -->

		  

          <div class="info-wrapper">

<!-- ***************************** 滚动标签 ************************************** -->
            <!-- <div id="tag">
              <div class="swiper">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-container"
                    v-for="(i, idx) of 3"
                    :key="idx"
                    :style="'--swiper-animation-time: ' + tags.length * 3 + 's'"
                  >
                    <div class="swiper-item" v-for="(item, index) of tags" :key="index">
                      <a class="tag" :href="'pages/tags?q=' + encodeURIComponent(item)">{{
                        item
                      }}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->


			

<!-- *****************************头像************************************** -->
            
            <div class="avatar-wrapper">
              <img
                :src="
                  aboutData.logo.indexOf('http') === 0
                    ? aboutData.logo
                    : withBase(aboutData.logo)
                "
                class="rounded-full"
                width="40"
                alt="head-avatar"
              />
            </div>

<!-- *****************************小作坊工程师************************************** -->
        
            <div class="info-desc-wrapper">
              <h2 class="about-tagline">{{ aboutData.tagline }}</h2>
              <ul class="social-wrapper">
                <li class="hero-social-item">
                  <a
                    class="social"
                    href="https://github.com/xiaoxiaohuayu"
                    target="_blank"
                  >
                    <i class="weiz-icon weiz-icon-github main xm" />
                  </a>
                </li>
				欢迎来到，我的世界。
              </ul>
              </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="13" class="container-right">
          <el-carousel height="240px" direction="vertical" :autoplay="true">
            <el-carousel-item>
              <div class="carousel-item carousel-features carousel-1">
                <ClientOnly><Heatmap /></ClientOnly>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </div>
  </div>

<!-- *****************************首页 post ************************************** -->

  <div id="post">

	<h1>最新文章：</h1>

    <div class="container">
      <el-row class="container-row" :gutter="24">

<!-- *****************************首页 post ************************************** -->

        <el-col
          v-if="cardLength <= 0"
          v-for="idx of 8"
          :key="idx"
          class="statistic-wrapper"
          :xs="24"
          :sm="12"
          :md="6"
        >
          <WPostCard :noData="true" />
        </el-col>
        <el-col
          v-else
          v-for="(item, index) of postData"
          :key="index"
          class="statistic-wrapper"
          :xs="24"
          :sm="12"
          :md="6"
        >

<!-- ***************************** 定制访问量，定制更多 ************************************** -->
          <div
            v-if="item.type && item.type === 'busuanzi'"
            data-if="item.type && item.type === 'busuanzi'"
            class="post-card statistic"
          >
            <div class="post-container">
              <div class="number">{{ uv }}</div>
              <div class="desc">
                本站总访客<span
                  id="busuanzi_value_site_uv"
                  style="display: none"
                />
              </div>
              <div class="desc-line"><span /></div>
              <div class="desc">
                本站总访问量<span
                  id="busuanzi_value_site_pv"
                  style="display: none"
                />
              </div>
              <div class="number">{{ pv }}</div>
            </div>


            <a
              class="post-container post-random-container"
              :href="lookHref"
              @click="postRandom"
            >
              <div class="post-more-container">
                <span><i class="weiz-icon weiz-icon-random xl"></i></span>
                <span>随便看看</span>
              </div>
            </a>
          </div>


          
          <a
            v-else-if="item.type && item.type === 'more'"
            class="post-card post-more"
            href="pages/posts"
          >
            <div class="post-container">
              <div class="post-more-container">
                <span><i class="weiz-icon weiz-icon-arrow-right xl"></i></span>
                <span>更多文章</span>
              </div>
            </div>
          </a>

          <WPostCard v-else :post="item" />

        </el-col>
      </el-row>
    </div>
  </div>

<!-- ***************************** 滚动标签 ************************************** -->
  <!-- <div id="tag">
    <div class="swiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-container"
          v-for="(i, idx) of 3"
          :key="idx"
          :style="'--swiper-animation-time: ' + tags.length * 3 + 's'"
        >
          <div class="swiper-item" v-for="(item, index) of tags" :key="index">
            <a class="tag" :href="'pages/tags?q=' + encodeURIComponent(item)">{{
              item
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </div> -->

</template>
<script setup lang="ts">
import { useData, withBase } from "vitepress";
import { onMounted, ref,type Ref, onBeforeMount } from "vue";
import { type HomeAbout} from "../type/infterfaceUtil";
import { type HomePost } from "../type/infterfaceUtil";

import { data } from "../utils/post.data";
import { countTransK, getRandomElement } from "../utils/tools";
// import Myhome from "./MyHome.vue";
import Heatmap from "./heatmap.vue";
// import { ref, type Ref, onBeforeMount } from "vue";
import { isMobile } from "../../utils/mobile";


const curDeviceIsMobile = ref(false);

onBeforeMount(() => {
	curDeviceIsMobile.value = isMobile();
});

function handleClick() {
	const navHeight = isMobile() ? 48 : 63;
	window.scrollBy({
		top: window.innerHeight - navHeight, // Scroll 100vh
		behavior: "smooth", // Smooth scrolling
	});
}

const { frontmatter: fm } = useData();

const aboutData = fm.value.about as HomeAbout;
let postData = ref<HomePost[]>([]);
const tags = fm.value.tags ? fm.value.tags.split(",") : Object.keys(data.tags);

const pv = ref("loading");
const uv = ref("loading");
const cardLength = ref(0);
const lookHref = ref(withBase("editor/vscode/vscode-siliconflow"));

const postMerge = () => {
  const postLength = 0;
  const fmLength = fm.value.post ? fm.value.post.length : 0;

  
// ****************************************** post 列表取值 ********************************************************
  let postLoadingData: HomePost[] = [];
  postLoadingData =
    fm.value.post && fmLength >= postLength
      ? fm.value.post.map((item) => {
          return item;
        })
      : (() => {
          const newPosts = data.posts.slice(0, postLength);
          let mdPosts = fm.value.post || newPosts;
          // 过滤重复数据
          if (fmLength > 0) {
            // 补全首页数据 docs/index.md
            const fullPost = fm.value.post.map((item) => {
              // 在第二个数组中查找对应的完整信息
              const fullInfo = data.posts.find(
                (fullItem) => fullItem.url === item.url
              );
              // 如果找到了对应的信息，合并到当前对象中
              if (fullInfo) {
                return { ...fullInfo, ...item };
              }
              // 如果没有找到，返回原始对象
              return item;
            });

            // 合并两个数组并过滤掉重复的数据
            const combinedArray = [...fullPost, ...newPosts];
            mdPosts = combinedArray.filter(
              (item, index, self) =>
                index === self.findIndex((t) => t.url === item.url)
            );
            // 没有重复数据，长度会超过 postLength
            if (mdPosts.length > postLength) {
              mdPosts = mdPosts.slice(0, postLength);
            }
          }
          return mdPosts;
        })();
      // 第4张卡片插入卜算子统计
      postLoadingData.splice(3, 0, {
        title: "统计访问量",
        type: "busuanzi",
        abstract: "统计访问量",
      });
      // 第8张卡片插入卜算子统计
      postLoadingData.splice(7, 0, {
        title: "更多文章",
        type: "more",
        abstract: "更多文章导航",
      });

// ****************************************** post 列表取值 ********************************************************
  postData.value = postLoadingData;
  cardLength.value = postLoadingData.length;
};

const postRandom = () => {
  const post = getRandomElement(data.posts);
  lookHref.value = post ? post.url : "";
};

let timeoutUV = 0;
const getUV = () => {
  if (timeoutUV) clearTimeout(timeoutUV);
  timeoutUV = window.setTimeout(() => {
    const $UV = document.querySelector("#busuanzi_value_site_uv");
    const text = $UV?.innerHTML;
    if ($UV && text) {
      const text = $UV.innerHTML;
      uv.value = countTransK(parseInt(text));
    } else {
      getUV();
    }
  }, 500);
};

let timeoutPV = 0;
const getPV = () => {
  if (timeoutPV) clearTimeout(timeoutPV);
  timeoutPV = window.setTimeout(() => {
    const $PV = document.querySelector("#busuanzi_value_site_pv");
    const text = $PV?.innerHTML;
    if ($PV && text) {
      pv.value = countTransK(parseInt(text));
    } else {
      getPV();
    }
  }, 500);
};

// const goResume = () => {
//   //当前页面跳转
//   window.location.href = "/resume";
// };

onMounted(() => {
  postMerge();
  postRandom();
  getUV();
  getPV();
});
</script>

<style lang="scss">
.Whome {
  --Whome-margin: 48px;
  --Whome-padding: calc(var(--Whome-margin) / 2);
  --Whome-padding-2: calc(var(--Whome-margin) / 4);
  .post-container .desc {
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
  .el-carousel {
    --el-carousel-indicator-height: 4px;
    // .el-carousel__button {
    //   border-radius: 8px;
    //   background: var(--weiz-primary-color);
    // }
    .el-carousel__indicators--vertical {
      transform: translate(var(--Whome-padding-2), -50%);
    }
  }
}

// #post{
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

/* v-if闪烁问题 */
[v-cloak] {
	display: none !important;
}

//视频容器
.video-container {
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
		font-family: "Lucida Handwriting";
		font-size: 25px;
		line-height: 40px;
	}
}

/* 小于960px会增加return-top那一栏并且不会透明 */
@media (max-width: 960px) {
	.video-container {
		height: calc(100vh - var(--vp-nav-height) - 47px);
	}
}

//视频按钮
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
		transition: all 0.3s ease-in-out;
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
		top: -150%;
		transform: translate(-50%, 0);
		font-size: 34px;
		color: #f19c2b;
	}

	button {
		position: absolute;
		padding: 0;
		width: 135px;
		height: 47px;
		background: transparent;
		font-size: 17px;
		font-weight: 900;
		border: 3px solid #f39923;
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
		background-color: #f5ae51;
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

	@keyframes shake {
		0% {
			left: 45%;
		}

		25% {
			left: 54%;
		}

		50% {
			left: 48%;
		}

		75% {
			left: 52%;
		}

		100% {
			left: 50%;
		}
	}
}

// 关于我的CSS样式
.main-content {
	/* background-color: var(--vp-c-bg); */
	/* background-image: linear-gradient(
			90deg,
			var(--vp-c-bg-mute) 3%,
			rgba(0, 0, 0, 0) 4.5%
		),
		linear-gradient(var(--vp-c-bg-mute) 3%, rgba(0, 0, 0, 0) 4.5%);
	background-size: 25px 25px; */
	.max-width {
		max-width: 1200px;
		padding: 0 40px;
		margin: auto;
		background-color: var(--vp-c-bg);
		/* box-shadow: 0 200px 200px 200px var(--vp-c-bg); */

		.recently-posts-head {
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
			padding: 20px;
			height: 340px;
			overflow: hidden;
			.post-item {
				margin: 10px;
			}
		}

		.comment-container {
			margin-top: 40px;
			padding: 40px;

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

footer {
	margin-top: 20px;
	padding: 20px;
	font-size: 14px;
	border-top: 1px solid var(--vp-c-bg-mute);
	height: 100px;
	text-align: center;
}

</style>
