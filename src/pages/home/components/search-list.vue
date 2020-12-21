<!--
 * @Author: summer
 * @LastEditTime: 2020-12-21 14:56:21
-->
<template>
  <div class="product">
    <div class="product-box">
      <div class="sort-menu">
        <div class="sort-item" v-for="sortItem in sortMenu" :key="sortItem.id">
          <span>{{ sortItem.name }}</span>
          <div class="sort-item-icon" v-if="sortItem.orderBy === 'true'">
            <img src="/static/home/images/product8.png" alt="" />
            <img src="/static/home/images/product7.png" alt="" />
          </div>
        </div>
      </div>
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
                <div class=" product-item-synopsis">
                  {{ productItem.synopsis }}
                </div>
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
            <div class="product-more" @click="getProductDetail(productItem.id)">
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
      <div class="product-page">
        <a-pagination :total="50" show-less-items />
      </div>
    </div>
    <div class="product-flow-window">
      <div class="flow-window">
        <img src="/static/home/images/product5.jpg" alt="" />
      </div>
      <div class="hot-product">
        <hot-product-item
          :hot-product-list="hotProductList"
          :hot-product-type="hotProductType"
        ></hot-product-item>
      </div>
    </div>
  </div>
</template>

<script>
import HotProductItem from "./hot-product-item";
export default {
  data() {
    return {
      visible: false,
      sortMenu: [
        {
          id: 1,
          name: "默认排序",
          isActive: "true",
          orderBy: "",
          orderWay: ""
        },
        {
          id: 2,
          name: "价格",
          isActive: "false",
          orderBy: "true",
          orderWay: "price"
        },
        {
          id: 3,
          name: "时间",
          isActive: "false",
          orderBy: "true",
          orderWay: "time"
        },
        {
          id: 4,
          name: "重量",
          isActive: "false",
          orderBy: "true",
          orderWay: "weight"
        }
      ] // 排序菜单
      // hotList: hotProductList,
      // hotType: hotProductType
    };
  },
  props: {
    productList: {
      required: true
    },
    permission: {
      required: true
    },
    hotProductList: {
      required: true
    },
    hotProductType: { required: true }
  },
  components: { HotProductItem },
  methods: {
    getProductDetail(productId) {
      if (this.permission === 0) {
        this.visible = true;
        console.log("请登录");
      } else {
        this.$router.push({
          path: "/productDetail",
          query: { productId: productId }
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
.product {
  display: flex;
  justify-content: space-between;
  width: 96%;
  max-width: 1200px;
  margin: 20px auto 0;
  .product-box {
    flex: 1;
    min-height: 1400px;
    background: #fff;
    .sort-menu {
      display: flex;
      padding-left: 30px;
      .sort-item {
        display: flex;
        align-items: center;
        height: 70px;
        line-height: 70px;
        font-size: 18px;
        border-bottom: 3px solid transparent;
        cursor: pointer;
        &:not(:last-child) {
          margin-right: 70px;
        }
        .sort-item-icon {
          display: flex;
          flex-direction: column;
          margin-left: 8px;
          img {
            &:first-child {
              margin-bottom: 8px;
            }
          }
        }
      }
    }
    .product-list {
      min-height: 900px;
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
            background: url("../../../../static/home/images/product6.png")
              no-repeat left center;
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
    .product-page {
      display: flex;
      justify-content: center;
      margin-top: 26px;
      margin-bottom: 32px;
    }
  }
  .product-flow-window {
    margin-left: 20px;
    width: 300px;
    .flow-window {
      margin-bottom: 20px;
    }
    // .flow-window {
    //   height: 370px;
    //   background: url("../../../static/home/images/product4.jpg") no-repeat top
    //     center/cover;
    //   .flow-window-text {
    //     width: calc(100% - 54px);
    //     margin: 0 auto;
    //     height: 50px;
    //     line-height: 50px;
    //     border-radius: 25px;
    //     font-size: 16px;
    //     color: #ff9252;
    //     text-align: center;
    //     font-weight: bold;
    //     background: rgba(255, 255, 255, 0.9);
    //   }
    // }
  }
}
</style>
