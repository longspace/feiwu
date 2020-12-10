<!--
 * @Author: summer
 * @LastEditTime: 2020-12-10 12:51:31
-->
<template>
  <div class="hot-product">
    <div class="hot-product-title">热门推荐</div>
    <div class="hot-product-list" v-if="hotProductList.length">
      <router-link
        tag="div"
        :to="{ path: '/productDetail', query: { productId: hotItem.id } }"
        class="hot-product-item"
        v-for="hotItem in hotProductList"
        :key="hotItem.id"
      >
        <div class="hot-product-name">{{ hotItem.name }}</div>
        <div class="hot-product-synopsis">{{ hotItem.synopsis }}</div>
        <div class="hot-product-tag" v-if="hotItem.tag.length">
          <div
            class="tag-item"
            v-for="(tagItem, tagIndex) in hotItem.tag"
            :key="tagIndex"
          >
            {{ tagItem }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    hotProductList: {
      required: true
    },
    hotProductType: { required: true }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="scss">
.hot-product {
  // margin-top: 20px;
  background: #fff;
  .hot-product-title {
    width: 100%;
    line-height: 70px;
    padding-left: 30px;
    padding-right: 30px;
    font-size: 18px;
    border-bottom: 1px solid #eee;
    color: #666;
  }
  .hot-product-item {
    cursor: pointer;
    padding: 18px 30px;
    &:not(:last-child) {
      border-bottom: 1px solid #e5e5e5;
    }
    .hot-product-name {
      font-size: 18px;
      line-height: 26px;
      color: #333;
    }
    .hot-product-synopsis {
      margin-top: 4px;
      font-size: 14px;
      color: #666;
      line-height: 26px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .hot-product-tag {
      margin-top: 10px;
      .tag-item {
        display: inline-block;
        padding: 0 10px;
        font-size: 12px;
        line-height: 26px;
        color: #666;
        background: #ecf2f8;
        &:not(:last-child) {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
