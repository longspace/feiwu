<!--
 * @Author: summer
 * @LastEditTime: 2020-12-10 14:13:28
-->
<template>
  <div class="swiper">
    <div class="swiper-container" :class="className">
      <div class="swiper-wrapper">
        <!-- 存放具体的轮播内容 -->
        <slot name="swiper-slot"></slot>
      </div>
      <!-- <div :class="{ 'swiper-pagination': pagination }"></div> -->
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  data() {
    return {};
  },
  props: {
    //轮播图列表数据
    list: {
      required: true
    },
    //样式名称
    className: {
      type: String,
      default: ""
    },

    //是否显示圆点
    isPagination: {
      type: Boolean,
      default: false
    },
    paginationType: { type: String, default: "bullets" },
    //是否显示左右箭头
    isNavigation: {
      type: Boolean,
      default: false
    },
    //自动播放延迟多少毫秒
    delay: {
      type: String,
      default: "3000"
    },
    //是否循环切换
    loop: {
      type: Boolean,
      default: true
    },
    //是否自动播放
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 一屏显示几个
    perView: {
      type: Number,
      default: 1
    },
    //每个轮播间的间隔距离
    spaceBetween: {
      type: Number,
      default: 0
    },
    direction: { type: String, default: "horizontal" },
    perGroup: {
      type: String,
      default: "1"
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    var that = this;
    this.dom = new Swiper("." + that.className, {
      // 循环
      loop: true,
      // 分页器
      pagination: {
        el: ".swiper-pagination",
        bulletClass: "swiper-pagination-bullet"
      },
      // 分页类型
      paginationType: that.paginationType,
      slidesPerView: that.perView,
      // 自动播放
      autoplay: {
        delay: 3000
      },
      // 方向
      direction: that.direction,
      // 特效
      effect: that.effect,
      // 用户操作swiper之后，不禁止autoplay
      disableOnInteraction: false,
      slidesPerGroup: that.perGroup,
      // 修改swiper自己或子元素时，自动初始化swiper
      observer: true,
      //   // 修改swiper的父元素时，自动初始化swiper
      observeParents: true
    });
  },
  methods: {}
};
</script>
<style scoped lang="scss">
// @import "swiper/swiper-bundle.css";
.swiper-wrapper {
  img {
    // 使得图片宽度适应显示
    width: 100%;
  }
}
// 分页器中当前小圆点的类名
.swiper-pagination-bullet-active {
  background: #fff;
}
// 分页器的类名
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 1rem;
  width: 95%;
  text-align: right;
}
</style>
