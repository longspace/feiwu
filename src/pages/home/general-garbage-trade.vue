<!--
 * @Author: summer
 * @LastEditTime: 2020-12-25 17:29:48
-->
<template>
  <div class="tradeCenter">
    <div class="banner">
      <div class="banner-b">
        <web-banner-text></web-banner-text>
      </div>
    </div>
    <div class="product-center">
      <div class="condition">
        <div class="select-condition" v-if="conditionTag.length">
          <div class="select-condition-l">
            <div class="condition-item-label">已选条件</div>
            <div class="condition-tag">
              <div
                class="tag-item"
                v-for="(conditionItem, index) in conditionTag"
                :key="index"
              >
                <div class="tag-item-inline">
                  <div class="tag-item-text">{{ conditionItem }}</div>
                  <div class="tag-close" @click="closeCondition">
                    <img src="/static/home/images/product3.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="condition-plus" @click="clearCondition">
            <img src="/static/home/images/product2.png" alt="" />
            <span>全部清空</span>
          </div>
        </div>
        <!-- <select-condition></select-condition> -->
        <div class="sift-condition">
          <div class="sift-condition-item">
            <sift-condition
              :condition-list="garbageArea"
              :condition-label="conditionLabel"
              @getClickCondition="getClickCondition"
            >
            </sift-condition>
          </div>
          <div class="sift-condition-item">
            <sift-condition
              :condition-list="garbageOrigin"
              :condition-label="conditionLabel2"
              @getClickCondition="getClickCondition"
            >
            </sift-condition>
          </div>
          <div class="sift-condition-item">
            <sift-condition
              :condition-list="garbageCode"
              :condition-label="conditionLabel3"
              @getClickCondition="getClickCondition"
            >
            </sift-condition>
          </div>
        </div>
      </div>
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
// import SelectCondition from "./components/select-condition";
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
      conditionTag: ["江西省"], //已选条件
      conditionLabel: "产废区域",
      conditionLabel2: "来源",
      conditionLabel3: "类别代码",
      permission: 2, // 权限，0 表示游客，1为会员,2为VIP
      type: 1,
      garbageArea: [
        { id: 1, value: "上海市", title: "上海市", isActive: false },
        { id: 2, value: "江西省", title: "江西省", isActive: false }
      ], // 产废区域
      garbageOrigin: [
        {
          id: 1,
          value: "废弃资源",
          title: "废弃资源",
          isActive: false
        },
        {
          id: 2,
          value: "采矿业产生的一般固体",
          title: "采矿业产生的一般固体",
          isActive: false
        },
        {
          id: 3,
          value: "食品，饮料等行业生产的一般固体",
          title: "食品，饮料等行业生产的一般固体",
          isActive: false
        },
        {
          id: 4,
          value: "轻工、化工、建材等行业生产的一把固体废物",
          title: "医轻工、化工、建材等行业生产的一把固体废物",
          isActive: false
        },
        {
          id: 5,
          value: "钢铁、有色冶金等行业产生的一般固体废物",
          title: "钢铁、有色冶金等行业产生的一般固体废物",
          isActive: false
        },
        {
          id: 6,
          value: "非特定行业生产过程中产生的一般固体废物",
          title: "非特定行业生产过程中产生的一般固体废物",
          isActive: false
        },
        { id: 7, value: "HW05", title: "木材防腐剂废物", isActive: false },

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
      ], // 来源
      garbageCode: [
        {
          id: 1,
          value: "01废旧纺织品",
          title: "01废旧纺织品",
          isActive: false
        },
        {
          id: 2,
          value: "02废皮革制品",
          title: "02废皮革制品",
          isActive: false
        },
        { id: 3, value: "03废木制品", title: "03废木制品", isActive: false },
        { id: 4, value: "04废纸", title: "04废纸", isActive: false },
        {
          id: 5,
          value: "05废橡胶制品",
          title: "05废橡胶制品",
          isActive: false
        },
        {
          id: 6,
          value: "06废塑料制品",
          title: "06废塑料制品",
          isActive: false
        },
        {
          id: 7,
          value: "07废符合包装",
          title: "07废符合包装",
          isActive: false
        },

        {
          id: 8,
          value: "08废玻璃",
          title: "08废玻璃",
          isActive: false
        },
        {
          id: 9,
          value: "09废钢铁",
          title: "09废钢铁",
          isActive: false
        },
        {
          id: 10,
          value: "10废有色金属",
          title: "10废有色金属",
          isActive: false
        },
        {
          id: 11,
          value: "11废机械产品",
          title: "11废机械产品",
          isActive: false
        },
        {
          id: 12,
          value: "12废交通运输设备",
          title: "12废交通运输设备",
          isActive: false
        },
        {
          id: 13,
          value: "13废电池",
          title: "13 废电池",
          isActive: false
        },
        {
          id: 14,
          value: "14废电器电子产品",
          title: "14废电器电子产品",
          isActive: false
        },
        {
          id: 15,
          value: "15煤矸石",
          title: "15煤矸石",
          isActive: false
        },
        {
          id: 16,
          value: "16其他尾矿",
          title: "16其他尾矿",
          isActive: false
        },
        {
          id: 17,
          value: "17废电池",
          title: "17废电池",
          isActive: false
        },
        {
          id: 18,
          value: "18废电器电子产品",
          title: "18废电器电子产品",
          isActive: false
        },
        {
          id: 19,
          value: "19煤矸石",
          title: "19煤矸石",
          isActive: false
        },
        {
          id: 20,
          value: "20其他尾矿",
          title: "20其他尾矿",
          isActive: false
        }
      ], // 类别代码

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
    // SelectCondition,
    ProductItem,
    HotProductItem,
    SearchList
  },
  methods: {
    clearCondition() {
      console.log("全部清空");
    },
    closeCondition() {
      console.log("清除选项");
    },
    getClickCondition(condition) {
      this.conditionTag.push(condition);
      console.log("getClickCondition--------", this.conditionTag);
    }
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
  .condition {
    width: 96%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 22px 30px 34px;
    background: #fff;
    .select-condition {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 20px;
      .select-condition-l {
        display: flex;
        .condition-item-label {
          width: 64px;
          flex-shrink: 0;
          margin-right: 44px;
          font-size: 16px;
          color: #666;
        }
        .condition-tag {
          .tag-item {
            display: inline-block;
            .tag-item-inline {
              display: flex;
              border: 1px solid #4293f4;
              color: #4293f4;
              border-radius: 3px;
              margin-bottom: 13px;
              margin-right: 8px;
              .tag-item-text {
                padding: 0 8px;
                font-size: 14px;
                line-height: 2em;
              }
              .tag-close {
                width: 28px;
                height: 28px;
                background: #4293f4;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
          }
        }
      }
      .condition-plus {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 90px;
        font-size: 14px;
        color: #4293f4;
        cursor: pointer;
        img {
          margin-right: 4px;
        }
      }
    }
    .sift-condition {
      .sift-condition-item {
        padding-top: 18px;
        padding-bottom: 14px;
        border-top: 1px solid #e5e5e5;
      }
    }
  }
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
