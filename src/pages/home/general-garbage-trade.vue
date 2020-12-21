<!--
 * @Author: summer
 * @LastEditTime: 2020-12-21 15:09:44
-->
<template>
  <div class="tradeCenter">
    <div class="banner">
      <div class="banner-b">
        <web-banner-text></web-banner-text>
      </div>
    </div>
    <div class="product-center">
      <sift-condition :garbage-area="garbageArea" :garbage-type="garbageType">
      </sift-condition>
      <search-list
        :permission="permission"
        :product-list="generalProduct.productList"
        :type="generalProduct.type"
        :hot-product-list="hotProduct.productList"
        :hot-product-type="hotProduct.type"
      ></search-list>
    </div>
  </div>
</template>

<script>
import WebBannerText from "./components/web-banner-text";
import SiftCondition from "./components/sift-condition";
import ProductItem from "./components/product-item";
import HotProductItem from "./components/hot-product-item";
import SearchList from "./components/search-list";
import {
  getGarbageArea,
  getGarbageType,
  searchProductList
} from "@/utils/http/index.js";

export default {
  data() {
    return {
      permission: 2, // 权限，0 表示游客，1为会员,2为VIP
      type: 1,
      garbageArea: [
        { id: 1, value: "江西省", title: "江西省", isActive: false },
        { id: 2, value: "上海市", title: "上海市", isActive: false }
      ], // 废物类别
      garbageType: [
        { id: 1, value: "HW01", title: "医疗废物²", isActive: false },
        { id: 2, value: "HW02", title: "医药废物", isActive: false },
        { id: 3, value: "HW03", title: "废药物、药品", isActive: false },
        { id: 4, value: "HW04", title: "农药废物", isActive: false },
        { id: 5, value: "HW05", title: "木材防腐剂废物", isActive: false },
        {
          id: 6,
          value: "HW06",
          title: "废有机溶剂与含有机溶剂废物",
          isActive: false
        },
        { id: 7, value: "HW07", title: "热处理含氰废物", isActive: false },
        {
          id: 8,
          value: "HW08",
          title: "废矿物油与含矿物油废物",
          isActive: false
        },
        {
          id: 9,
          value: "HW08",
          title: "废矿物油与含矿物油废物",
          isActive: false
        },
        {
          id: 10,
          value: "HW09",
          title: "油/水、烃/水混合物或乳化液",
          isActive: false
        }
      ], // 废物类别

      // productList: [], //商品列表,
      current: 1, // 当前列表页数
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
      ], // 排序菜单
      generalProduct: {
        type: 1,
        orderBy: "", // 是否排序
        orderWay: "", // 排序方式
        productList: [
          {
            id: 1,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            img:
              "https://dcdn.it120.cc/2020/12/07/5d8b4d14-aa28-49ec-8d8a-193f0de1124b.jpg",
            stock: 20
          },
          {
            id: 2,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
            img:
              "https://dcdn.it120.cc/2020/12/07/5d8b4d14-aa28-49ec-8d8a-193f0de1124b.jpg"
          },
          {
            id: 3,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
            img:
              "https://dcdn.it120.cc/2020/12/07/4e35b187-8ac9-4cda-96fe-36b2033aad3d.jpg"
          },
          {
            id: 4,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
            img:
              "https://dcdn.it120.cc/2020/12/07/6ca05c0f-4302-4fcd-a116-5bdf4d8f66c5.jpg"
          },
          {
            id: 5,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
            img:
              "https://dcdn.it120.cc/2020/12/07/5d8b4d14-aa28-49ec-8d8a-193f0de1124b.jpg"
          },
          {
            id: 6,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
            img:
              "https://dcdn.it120.cc/2020/12/07/5d8b4d14-aa28-49ec-8d8a-193f0de1124b.jpg"
          },
          {
            id: 7,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
            img:
              "https://dcdn.it120.cc/2020/12/07/4e35b187-8ac9-4cda-96fe-36b2033aad3d.jpg"
          },
          {
            id: 8,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
            img:
              "https://dcdn.it120.cc/2020/12/07/6ca05c0f-4302-4fcd-a116-5bdf4d8f66c5.jpg"
          },
          {
            id: 9,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
            img:
              "https://dcdn.it120.cc/2020/12/07/4e35b187-8ac9-4cda-96fe-36b2033aad3d.jpg"
          },
          {
            id: 10,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
            img:
              "https://dcdn.it120.cc/2020/12/07/6ca05c0f-4302-4fcd-a116-5bdf4d8f66c5.jpg"
          }
        ]
      },

      hotProduct: {
        type: 1,
        productList: [
          {
            id: 1,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"] // 产品标签类别
          },
          {
            id: 2,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"] // 产品标签类别
          },
          {
            id: 3,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"] // 产品标签类别
          },
          {
            id: 4,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"] // 产品标签类别
          },
          {
            id: 5,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"] // 产品标签类别
          }
        ]
      }
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // this.initGarbageType();
  },
  components: {
    WebBannerText,
    SiftCondition,
    ProductItem,
    HotProductItem,
    SearchList
  },
  methods: {
    // 点击废物类别
    // getClickGarbageType(garbageTypeIndex) {
    //   this.clickGarbageType = this.$refs.garbageType[
    //     garbageTypeIndex
    //   ].innerText;
    //   console.log("点击的类别", this.clickGarbageType);
    // }
  }
};
</script>
<style scoped lang="scss">
@import "../../../static/home/css/index.scss";
.banner {
  position: relative;
  background: url("../../../static/home/images/danger1.jpg") no-repeat 50% /
    cover;
  overflow: hidden;
  min-height: 300px;
  &::before {
    content: "";
    display: block;
    padding-top: calc(100% * (300 / 1920));
  }
  .banner-b {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
}
.product-center {
  padding-top: 30px;
  padding-bottom: 20px;
  background: #f2f5f8;
}

.product {
  display: flex;
  justify-content: space-between;
  width: 96%;
  max-width: 1200px;
  margin: 20px auto 0;

  .product-box {
    flex: 1;
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
