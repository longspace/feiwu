<!--
 * @Author: summer
 * @LastEditTime: 2020-12-25 17:29:11
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
              :condition-list="garbageType"
              :condition-label="conditionLabel2"
              @getClickCondition="getClickCondition"
            >
            </sift-condition>
          </div>
        </div>
      </div>
      <search-list
        :permission="permission"
        :product-list="dangerProduct.productList"
        :type="dangerProduct.type"
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
      conditionTag: ["HW02医药废物"], //已选条件
      conditionLabel: "产废区域",
      conditionLabel2: "废物类别",
      permission: 2, // 权限，0 表示游客，1为会员,2为VIP
      type: 1,
      garbageArea: [
        { id: 1, value: "江西省", title: "江西省", isActive: false },
        { id: 2, value: "上海市", title: "上海市", isActive: false }
      ], // 废物类别
      garbageType: [
        { id: 1, value: "HW01", title: "HW01医疗废物²", isActive: false },
        { id: 2, value: "HW02", title: "HW02医药废物", isActive: false },
        { id: 3, value: "HW03", title: "HW03废药物、药品", isActive: false },
        { id: 4, value: "HW04", title: "HW04农药废物", isActive: false },
        { id: 5, value: "HW05", title: "HW05木材防腐剂废物", isActive: false },
        {
          id: 6,
          value: "HW06",
          title: "HW06废有机溶剂与含有机溶剂废物",
          isActive: false
        },
        { id: 7, value: "HW07", title: "HW07热处理含氰废物", isActive: false },
        {
          id: 8,
          value: "HW08",
          title: "HW08废矿物油与含矿物油废物",
          isActive: false
        },
        {
          id: 9,
          value: "HW08",
          title: "HW08废矿物油与含矿物油废物",
          isActive: false
        },
        {
          id: 10,
          value: "HW09",
          title: "HW09油/水、烃/水混合物或乳化液",
          isActive: false
        }
      ], // 废物类别
      dangerProduct: {
        type: 1,
        orderBy: "", // 是否排序
        orderWay: "", // 排序方式
        productList: [
          {
            id: 1,
            key: "1",
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-11-03",
            img: "/static/home/images/index10.jpg",
            stock: 20
          },
          {
            id: 2,
            key: "2",
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "5000",
            date: "2019-12-03",
            stock: 20,
            img: "/static/home/images/index11.jpg"
          },
          {
            id: 3,
            key: "3",
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "40000",
            date: "2020-12-03",
            stock: 10,
            img: "/static/home/images/index12.jpg"
          },
          {
            id: 4,
            key: "4",
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "1000",
            date: "2020-01-03",
            stock: 200,
            img: "/static/home/images/index10.jpg"
          },
          {
            id: 5,
            key: "5",
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "6000",
            date: "2020-12-03",
            stock: 410,
            img: "/static/home/images/index11.jpg"
          },
          {
            id: 6,
            key: "6",
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "43000",
            date: "2020-12-03",
            stock: 140,
            img: "/static/home/images/index12.jpg"
          },
          {
            id: 7,
            key: "7",
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "43000",
            date: "2020-12-03",
            stock: 100,
            img: "/static/home/images/index10.jpg"
          },
          {
            id: 8,
            key: "8",
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2001-12-03",
            stock: 900,
            img: "/static/home/images/index11.jpg"
          },
          {
            id: 9,
            key: "9",
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "1000",
            date: "2020-12-03",
            stock: 230,
            img: "/static/home/images/index12.jpg"
          },
          {
            id: 10,
            key: "10",
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "300",
            date: "2020-12-03",
            stock: 4,
            img: "/static/home/images/index10.jpg"
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
    // SelectCondition
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
</style>
