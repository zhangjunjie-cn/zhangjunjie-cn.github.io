<template>
    <div class="body-click-container"></div>
  </template>
  
  <script setup lang="ts">
  let a_idx = 0;
  
  function click(e: MouseEvent) {
    // console.log('bodyClick');
    const a = [
      "❤零基础❤",
      "❤学造纸月薪过万",
      "❤就来重庆恒安集团❤",
    ];
    const span = document.createElement("span");
    a_idx = (a_idx + 1) % a.length;
    span.textContent = a[a_idx];
    const x = e.pageX;
    const y = e.pageY;
    span.style.zIndex = "99999";
    span.style.top = `${y - 20}px`;
    span.style.left = `${x}px`;
    span.style.position = "absolute";
    span.style.fontWeight = "bold";
    span.style.color = `rgb(${~~(255 * Math.random())},${~~(255 * Math.random())},${~~(255 * Math.random())})`;
  
    document.body.appendChild(span);
  
    span.animate(
      [
        { top: `${y - 20}px`, opacity: 1 },
        { top: `${y - 180}px`, opacity: 0 },
      ],
      {
        duration: 2500,
        easing: "ease",
        fill: "both",
      }
    ).onfinish = () => {
      span.remove();
    };
  }
  if (!import.meta.env.SSR) {
    document.body.addEventListener("click", click);
  }
  </script>
  
  
  <style scoped>
  .body-click-container {
    position: relative;
    width: 100%;
    height: 100%;
    pointer-events: none; /* 防止容器拦截点击事件 */
  }
  </style>