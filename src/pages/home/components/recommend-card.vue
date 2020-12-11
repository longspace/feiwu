<!--
 * @Author: summer
 * @LastEditTime: 2020-12-11 09:42:23
-->
<template>
  <div class="recommend-goods-list" v-if="recommend">
    <div
      class="recommend-goods-card"
      v-for="recommendItem in recommend"
      :key="recommendItem.id"
    >
      <div class="goods-card-top">
        <div class="goods-card-img">
          <div class="goods-card-img-b">
            <img :src="recommendItem.img" alt="" />
          </div>
        </div>
        <div class="goods-card-price">
          <p>预期价格</p>
          <p>
            <span class="num">{{ recommendItem.price }}</span> 元 / 吨
          </p>
        </div>
      </div>
      <div class="goods-card-middle">
        <div class="goods-card-name">{{ recommendItem.name }}</div>
        <div class="goods-card-stock">{{ recommendItem.stock }}吨</div>
      </div>
      <div class="goods-card-desc">{{ recommendItem.introduce }}</div>
      <div class="goods-card-sort">
        <span class="sort-item">{{ recommendItem.category }}</span>
        <span class="sort-item">{{ recommendItem.code }}</span>
      </div>
      <router-link
        :to="{ path: '/productDetail', query: { productId: recommendItem.id } }"
        tag="div"
        class="goods-card-more"
        >查看详情</router-link
      >
    </div>
  </div>
</template>

<script>
import { getHotGoods } from "@/utils/http/index.js";
export default {
  data() {
    return {
      recommend: {}
    };
  },
  props: { hotGoodsCard: { required: true } },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {},
  watch: {
    hotGoodsCard: function(newVal, oldVal) {
      this.recommend = newVal;
      console.log("this.recommed", this.recommend);
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../../../static/home/css/index.scss";

.recommend-goods-card {
  flex: 1;
  padding: 26px;
  border: 1px solid #e5e5e5;
  &:not(:last-child) {
    margin-right: 12px;
  }
  .goods-card-top {
    display: flex;
    justify-content: space-between;
    .goods-card-img {
      position: relative;
      width: 80px;
      &::before {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
      .goods-card-img-b {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }
      }
    }
    .goods-card-price {
      font-size: 14px;
      color: #333;
      text-align: right;
      p {
        &:last-child {
          position: relative;
          margin-top: 4px;
          .num {
            font-size: 24px;
            line-height: 26px;
            font-weight: bold;
            // font-family: DINCond-Black;
          }

          &::after {
            content: "";
            display: block;
            position: absolute;
            bottom: 2px;
            width: 100%;
            height: 4px;
            background: rgba(66, 147, 244, 0.3);
          }
        }
      }
    }
  }
  .goods-card-middle {
    display: flex;
    align-items: center;
    margin-top: 24px;
    margin-bottom: 8px;
    .goods-card-name {
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 10px;
      font-size: 18px;
      color: #333;
    }
    .goods-card-stock {
      flex-shrink: 0;
      padding: 0px 8px;
      font-size: 14px;
      // height: 20px;
      line-height: 18px;
      color: #4293f4;
      border: 1px solid #4293f4;
    }
  }
  .goods-card-desc {
    font-size: 14px;
    line-height: 26px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .goods-card-sort {
    margin-top: 20px;
    margin-bottom: 36px;
    .sort-item {
      display: inline-block;
      padding: 0 10px;
      font-size: 12px;
      line-height: 26px;
      color: #666;
      background-color: #ecf2f8;
      border-radius: 3px;
    }
  }
  .goods-card-more {
    cursor: pointer;
    width: 100%;
    font-size: 14px;
    color: #fff;
    line-height: 40px;
    text-align: center;
    border-radius: 3px;
    background-color: #4293f4;
  }
}
</style>
