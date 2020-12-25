<!--
 * @Author: summer
 * @LastEditTime: 2020-12-23 20:57:13
-->
<template>
  <div class="product-list" v-if="productList.length">
    <div
      class="product-item"
      v-for="productItem in productList"
      :key="productItem.id"
    >
      <div class="product-item-top">
        <div class="product-info">
          <div class="product-img">
            <div class="product-img-b">
              <img :src="productItem.img" alt="" />
            </div>
          </div>
          <div class="poroduct-r">
            <div class="product-attr">
              <p class="product-item-name">{{ productItem.name }}</p>
              <p class="product-item-stock">{{ productItem.stock }}吨</p>
            </div>
            <div class=" product-item-synopsis">{{ productItem.synopsis }}</div>
          </div>
        </div>
        <div class="product-price">
          <p>
            <span class="price" v-if="permission === 2">
              {{ productItem.price }}</span
            >
            <span v-else>*****</span>
            <span>元/吨</span>
          </p>
          <p>预期价</p>
        </div>
        <div class="product-more" @click="getProductDetail">
          查看详情
        </div>
      </div>
      <div class="product-item-bottm">
        <div class="product-item-tag" v-if="productItem.tag.length">
          <div
            class="tag-item"
            v-for="(tagItem, tagIndex) in productItem.tag"
            :key="tagIndex"
          >
            {{ tagItem }}
          </div>
        </div>
        <div class="product-item-date">{{ productItem.date }}</div>
      </div>
    </div>
    <div class="login-modal">
      <a-modal
        v-model="visible"
        title="您还未登录。请先登录"
        @ok="handleOk"
        width="400px"
        @cancel="handleCancel"
        centered
        ok-text="立即登录"
        cancel-text="我在看看"
      >
        <p>注册登录后才享有查看商品详情权限</p>
      </a-modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      isLogin: true // 判断是否登录
    };
  },
  props: {
    productList: {
      required: true
    },
    permission: {
      required: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    // getProductInfo() {
    //   this.productInfo = this.dangerProduct;
    //   console.log("产品信息:", this.dangerProduct);
    // }
    getProductDetail() {
      if (this.permission === 0) {
        this.visible = true;
        console.log("请登录");
      } else {
        this.$router.push({
          name: "/productDetail",
          params: { permission: this.permission }
        });
      }
      console.log("this.isLogin", this.isLogin);
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk() {
      console.log();
      this.$router.push({ path: "/memberLogin" });
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../../../static/home/css/index.scss";
.product-list {
  .product-item {
    padding: 25px 30px;
    border-bottom: 1px solid #e5e5e5;
    .product-item-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .product-info {
        display: flex;
        align-items: center;
        .product-img {
          position: relative;
          width: 80px;
          margin-right: 21px;
          &::before {
            content: "";
            display: block;
            padding-bottom: 100%;
          }
          .product-img-b {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            img {
              border-radius: 3px;
              width: 100%;
              height: 100%;
            }
          }
        }
        .product-attr {
          display: flex;
          align-items: center;
          .product-item-name {
            font-size: 18px;
            line-height: 26px;
            color: #333;
          }
          .product-item-stock {
            margin-left: 16px;
            padding: 0 6px;
            font-size: 14px;
            line-height: 20px;
            color: #4293f4;
            border: 1px solid;
            border-radius: 3px;
          }
        }
        .product-item-synopsis {
          font-size: 14px;
          color: #666;
          line-height: 26px;
        }
      }
      .product-price {
        margin: 0 auto;
        // width: 100px;
        max-width: 140px;
        font-size: 14px;
        line-height: 26px;
        color: #666;
        .price {
          font-size: 24px;
          font-weight: bold;
        }
      }
      .product-more {
        cursor: pointer;
        width: 100px;
        height: 40px;
        font-size: 14px;
        color: #333;
        line-height: 40px;
        text-align: center;
        background: #eeeeee;
      }
    }
    .product-item-bottm {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 42px;
      .product-item-tag {
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
      .product-item-date {
        padding-left: 20px;
        font-size: 12px;
        color: #999;
        background: url("../../../../static/home/images/product6.png") no-repeat
          left center;
      }
    }
    &:first-child {
      border-top: 1px solid #e5e5e5;
    }
    &:hover {
      background: #f7fbfe;
      .product-more {
        color: #fff;
        background: #4293f4;
      }
    }
  }
}
</style>
<style lang="scss">
.ant-modal-content {
  border-radius: 6px;
}
.ant-modal-content .ant-modal-header {
  padding: 40px 24px 26px;
  border-radius: 6px;
  text-align: center;
  font-size: 22px;
  border-bottom: none;
  color: #333;
}
.ant-modal-content .ant-modal-body {
  padding: 0;
  font-size: 16px;
  text-align: center;
  color: #666;
}
.ant-modal-content .ant-btn {
  width: 140px;
  height: 46px;
  font-size: 16px;
  color: #333;
  border-radius: 3px;
}
.ant-modal-content .ant-modal-footer {
  display: flex;
  justify-content: center;
  border-top: none;
  padding: 12px 20px 42px;
}
.ant-modal-content .ant-modal-footer button + button {
  margin-left: 20px;
  color: #fff;
  background: #4293f4;
}
</style>
