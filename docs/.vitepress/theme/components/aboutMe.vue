<template>
	<div class="about-me-container">
		<div class="title">关于笔者</div>
		<div class="content">
			<div class="card-container">
				<div class="e-card playing">
					<div class="image"></div>

					<div class="wave"></div>
					<div class="wave"></div>
					<div class="wave"></div>

					<div class="infotop">
						<div class="img-container">
							<img
								src="https://oss.justin3go.com/justin3goAvatar.png"
								alt=""
								style="height: 80px"
							/>
						</div>
						<br />
						<div style="font-family: 'Lucida Handwriting'">Justin3go</div>
						<div class="name">前端 / 羽毛球 / 摄影</div>
						<div class="name">
							喜欢折腾一些效率工具，热爱开源、分享、探索、用代码创造价值。保持持续输出，数量与质量之间的平衡我更倾向于数量，因为可以记录更多...
						</div>
					</div>
				</div>
			</div>
			<figure class="lang-chart-container">
				<div class="chart-title">Language over ALL Time (Powered by <a href="https://wakatime.com">wakatime.com</a>)</div>
				<iframe class="lang-chart" :src="langChartSrc"></iframe>
			</figure>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";

const { isDark } = useData();
const langChartSrc = computed(() =>
	isDark.value
		? "https://wakatime.com/share/@a210bf50-f97f-4461-adae-6661a6273a34/a725a041-bcef-4109-85f0-499016d10a8e.svg"
		: "https://wakatime.com/share/@a210bf50-f97f-4461-adae-6661a6273a34/093e0115-66ad-4945-be11-e39ba69b7f82.svg"
);

// const bgColor = computed(() => (isDark.value ? "#000" : "#fff"));
</script>
<style lang="scss" scoped>
.about-me-container {
	width: 100%;
	height: 100%;
	padding: 20px 40px;

	iframe {
		border: none;
	}

	.title {
		font-size: 20px;
		font-weight: 900;
	}

	.content {
		display: flex;
		justify-content: left;
		width: 100%;
		height: 100%;
		margin-top: 20px;

		.lang-chart-container {
			flex: 1;
			margin: 10px;
			padding: 20px;
			padding-top: 0;
			border-radius: 6px;
			background-color: var((--vp-c-bg));
			/* box-shadow: inset 0px 8px 28px -9px rgba(0, 0, 0, 0.1); */
			border: 1px solid var(--vp-c-gutter);
      position: relative;

			.chart-title {
        position: absolute;
        left: 40px;
        top: -20px;
				margin-top: 30px;
				letter-spacing: 2px;
				font-size: 12px;
        color: #bbb;

        a {
          text-decoration: underline;
        }
			}

			.lang-chart {
        margin-top: 20px;
				width: 600px;
				height: 440px;
			}
		}
	}

	// .card-container {
	// 	padding: 10px;

	// 	.e-card {
	// 		background: transparent;
	// 		/* box-shadow: inset 0px 8px 28px -9px rgba(0, 0, 0, 0.1); */
	// 		border: 1px solid var(--vp-c-gutter);
	// 		position: relative;
	// 		width: 340px;
	// 		height: 480px;
	// 		border-radius: 6px;
	// 		overflow: hidden;
	// 	}

	// 	.wave {
	// 		position: absolute;
	// 		width: 600px;
	// 		height: 700px;
	// 		opacity: 0.5;
	// 		left: 0;
	// 		top: 0;
	// 		margin-left: -40%;
	// 		margin-top: 30%;
	// 		background: linear-gradient(744deg, #af40ff, #5b42f3 60%, #00ddeb);
	// 	}

	// 	.icon {
	// 		width: 3em;
	// 		margin-top: -1em;
	// 		padding-bottom: 1em;
	// 	}

	// 	.infotop {
	// 		text-align: center;
	// 		font-size: 20px;
	// 		position: absolute;
	// 		top: 4.5em;
	// 		left: 0;
	// 		right: 0;
	// 		color: rgb(255, 255, 255);
	// 		font-weight: 600;

	// 		.img-container {
	// 			display: flex;
	// 			justify-content: center;
	// 		}
	// 	}

	// 	.name {
	// 		padding: 5px 40px;
	// 		font-size: 14px;
	// 		font-weight: 100;
	// 		position: relative;
	// 		top: 1em;
	// 		text-transform: lowercase;
	// 	}

	// 	.wave:nth-child(2),
	// 	.wave:nth-child(3) {
	// 		top: 60px;
	// 	}

	// 	.playing .wave {
	// 		border-radius: 40%;
	// 		animation: wave 3000ms infinite linear;
	// 	}

	// 	.wave {
	// 		border-radius: 40%;
	// 		animation: wave 55s infinite linear;
	// 	}

	// 	.playing .wave:nth-child(2) {
	// 		animation-duration: 4000ms;
	// 	}

	// 	.wave:nth-child(2) {
	// 		animation-duration: 50s;
	// 	}

	// 	.playing .wave:nth-child(3) {
	// 		animation-duration: 5000ms;
	// 	}

	// 	.wave:nth-child(3) {
	// 		animation-duration: 45s;
	// 	}

	// 	@keyframes wave {
	// 		0% {
	// 			transform: rotate(0deg);
	// 		}

	// 		100% {
	// 			transform: rotate(360deg);
	// 		}
	// 	}

	// 	.social-link {
	// 		margin-top: 20px;
	// 		display: flex;
	// 		justify-content: center;

	// 		.card {
	// 			display: flex;
	// 			height: 55px;
	// 			width: 220px;

	// 			svg {
	// 				position: absolute;
	// 				display: flex;
	// 				width: 60%;
	// 				height: 60%;
	// 				font-size: 24px;
	// 				font-weight: 700;
	// 				opacity: 1;
	// 				transition: opacity 0.25s;
	// 				z-index: 2;
	// 				cursor: pointer;
	// 			}
//
	// 			.social-link1,
	// 			.social-link2,
	// 			.social-link3,
	// 			.social-link4 {
	// 				position: relative;
	// 				display: flex;
	// 				align-items: center;
	// 				justify-content: center;
	// 				width: 25%;
	// 				color: whitesmoke;
	// 				font-size: 24px;
	// 				text-decoration: none;
	// 				transition: 0.25s;
	// 				border-radius: 50px;
	// 			}

	// 			svg {
	// 				transform: scale(0.6);
	// 			}

	// 			.social-link1:hover {
	// 				background-color: #242c34;
	// 				animation: bounce_613 0.4s linear;
	// 			}

	// 			.social-link2:hover {
	// 				background-color: #00ccff;
	// 				animation: bounce_613 0.4s linear;
	// 			}

	// 			.social-link3:hover {
	// 				background-color: #5865f2;
	// 				animation: bounce_613 0.4s linear;
	// 			}

	// 			.social-link4:hover {
	// 				background-color: #12a50b;
	// 				animation: bounce_613 0.4s linear;
	// 			}

	// 			@keyframes bounce_613 {
	// 				40% {
	// 					transform: scale(1.4);
	// 				}

	// 				60% {
	// 					transform: scale(0.8);
	// 				}

	// 				80% {
	// 					transform: scale(1.2);
	// 				}

	// 				100% {
	// 					transform: scale(1);
	// 				}
	// 			}
	// 		}
	// 	}
	// }
}

@media (max-width: 1100px) {
	.about-me-container {
		padding: 20px 10px;

		.content {
			justify-content: center;
		}
		.lang-chart-container {
			display: none !important;
		}
	}
}
</style>
