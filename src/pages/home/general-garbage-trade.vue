<!--
 * @Author: summer
 * @LastEditTime: 2020-12-27 16:33:44
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
        <div
          class="select-condition"
          v-if="conditionSource.conditionTag.length"
        >
          <div class="select-condition-l">
            <div class="condition-item-label">已选条件</div>
            <div class="condition-tag">
              <div
                class="tag-item"
                v-for="(conditionItem, index) in conditionSource.conditionTag"
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
            <div class="condition-item">
              <div class="condition-item-label">
                产废区域
              </div>
              <div
                class="condition-tag"
                :class="{ active: myfilter.areaMoreVisiable }"
              >
                <div
                  class="condition-tag-item"
                  :class="{ active: garbageItem.isActive }"
                  v-for="(garbageItem,
                  garbageIndex) in conditionSource.garbageArea"
                  :key="garbageIndex"
                  @click="clickGarbageArea(garbageIndex)"
                  ref="garbageText"
                >
                  {{ garbageItem.title }}
                </div>
              </div>
              <div
                class="condition-more"
                v-if="conditionSource.garbageArea.length > 8"
                :class="{ active: myfilter.areaMoreVisiable }"
                @click="myfilter.areaMoreVisiable = !myfilter.areaMoreVisiable"
              >
                <span>更多</span>
              </div>
            </div>
          </div>
          <div class="sift-condition-item">
            <div class="condition-item">
              <div class="condition-item-label">
                来源
              </div>
              <div
                class="condition-tag"
                :class="{ active: myfilter.sourceMoreVisiable }"
              >
                <div
                  class="condition-tag-item"
                  :class="{ active: garbageItem.isActive }"
                  v-for="(garbageItem,
                  garbageIndex) in conditionSource.garbageOrigin"
                  :key="garbageIndex"
                  @click="clickGarbageOrigin(garbageIndex)"
                  ref="garbageText"
                >
                  {{ garbageItem.title }}
                </div>
              </div>
              <div
                class="condition-more"
                v-if="conditionSource.garbageOrigin.length > 8"
                :class="{ active: myfilter.sourceMoreVisiable }"
                @click="
                  myfilter.sourceMoreVisiable = !myfilter.sourceMoreVisiable
                "
              >
                <span>更多</span>
              </div>
            </div>
          </div>
          <div class="sift-condition-item">
            <div class="condition-item">
              <div class="condition-item-label">
                类别代码
              </div>
              <div
                class="condition-tag"
                :class="{ active: myfilter.classMoreVisiable }"
              >
                <div
                  class="condition-tag-item"
                  :class="{ active: garbageItem.isActive }"
                  v-for="(garbageItem,
                  garbageIndex) in conditionSource.garbageCode"
                  :key="garbageIndex"
                  @click="clickGarbageCode(garbageIndex)"
                  ref="garbageText"
                >
                  {{ garbageItem.title }}
                </div>
              </div>
              <div
                class="condition-more"
                v-if="conditionSource.garbageCode.length > 8"
                @click="
                  myfilter.classMoreVisiable = !myfilter.classMoreVisiable
                "
                :class="{ active: myfilter.classMoreVisiable }"
              >
                <span>更多</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product">
        <div class="product-box">
          <div class="sort-menu">
            <div
              class="sort-item"
              v-for="(sortItem, index) in sortMenu"
              :key="sortItem.id"
              :class="{ active: sortItem.isActive }"
              @click="changeSort(index)"
            >
              <span>{{ sortItem.name }}</span>
              <div
                class="sort-item-icon"
                v-if="sortItem.orderWay !== 'default'"
              >
                <div class="sort-asc" @click="ascOrder(index)">
                  <img
                    src="/static/home/images/product8.png"
                    alt=""
                    v-if="sortItem.orderBy == ''"
                  />
                  <img src="/static/home/images/product9.png" alt="" v-else />
                </div>
                <div class="sort-desc" @click="descOrder(index)">
                  <img
                    src="/static/home/images/product10.png"
                    alt=""
                    v-if="sortItem.orderBy == 'desc'"
                  />
                  <img src="/static/home/images/product7.png" alt="" v-else />
                </div>
              </div>
            </div>
          </div>
          <div class="product-list" v-if="generalProduct.productList.length">
            <div
              class="product-item"
              v-for="productItem in generalProduct.productList"
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
                      <p class="product-item-stock">
                        {{ productItem.stock }}吨
                      </p>
                    </div>
                    <div class=" product-item-synopsis">
                      {{ productItem.synopsis }}
                    </div>
                  </div>
                </div>
                <div class="product-price">
                  <p>
                    <span class="price" v-if="permission !== 0">
                      {{ productItem.price }}</span
                    >
                    <span v-else>*****</span>
                    <span>元/吨</span>
                  </p>
                  <p>预期价</p>
                </div>
                <div
                  class="product-more"
                  @click="getProductDetail(productItem.id)"
                >
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
            <div class="hot-product">
              <div class="hot-product-title">热门推荐</div>
              <div
                class="hot-product-list"
                v-if="hotProduct.productList.length > 0"
              >
                <router-link
                  tag="div"
                  :to="{
                    path: '/productDetail',
                    query: { productId: hotItem.id }
                  }"
                  class="hot-product-item"
                  v-for="hotItem in hotProduct.productList"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WebBannerText from "./components/web-banner-text";
import {
  getGarbageArea,
  getGarbageType,
  searchProductList
} from "@/utils/http/index.js";

export default {
  data() {
    return {
      myfilter: {
        currentCondition: [],
        areaMoreVisiable: false,
        sourceMoreVisiable: false,
        classMoreVisiable: false
      },
      more: false,
      visible: false, // 弹窗
      conditionSource: {
        conditionTag: ["江西省"], //已选条件
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
        current: 1 // 当前列表页数
      },
      sortMenu: [
        {
          id: 1,
          name: "默认排序",
          isActive: true,
          orderWay: "default",
          orderBy: ""
        },
        {
          id: 2,
          name: "价格",
          isActive: false,
          orderWay: "price",
          orderBy: ""
        },
        {
          id: 3,
          name: "时间",
          isActive: false,
          orderWay: "time",
          orderBy: ""
        },
        {
          id: 4,
          name: "重量",
          isActive: false,
          orderWay: "weight",
          orderBy: ""
        }
      ], // 排序菜单};
      conditionLabel: "产废区域",
      conditionLabel2: "来源",
      conditionLabel3: "类别代码",
      permission: 1, // 权限，0 表示游客，1为会员,2为VIP
      type: 1,

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
            img: "/static/home/images/index10.jpg",
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
            img: "/static/home/images/index10.jpg"
          },
          {
            id: 3,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
            img: "/static/home/images/index10.jpg"
          },
          {
            id: 4,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
            img: "/static/home/images/index10.jpg"
          },
          {
            id: 5,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
            img: "/static/home/images/index10.jpg"
          },
          {
            id: 6,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
            img: "/static/home/images/index10.jpg"
          },
          {
            id: 7,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
            img: "/static/home/images/index10.jpg"
          },
          {
            id: 8,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
            img: "/static/home/images/index10.jpg"
          },
          {
            id: 9,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
            img: "/static/home/images/index10.jpg"
          },
          {
            id: 10,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"], // 产品标签类别
            price: "4000",
            date: "2020-12-03",
            stock: 20,
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
  components: {
    WebBannerText
  },
  methods: {
    clearCondition() {
      console.log("全部清空");
    },
    closeCondition() {
      console.log("清除选项");
    },
    getClickCondition(condition) {
      this.conditionSource.conditionTag.push(condition);
      console.log(
        "getClickCondition--------",
        this.conditionSource.conditionTag
      );
    },
    clickGarbageArea(garbageIndex) {
      this.conditionSource.garbageArea.forEach((item, index) => {
        if (index == garbageIndex) {
          item.isActive = true;
        } else {
          item.isActive = false;
          console.log("--");
        }
      });
    },
    clickGarbageOrigin(garbageIndex) {
      this.conditionSource.garbageOrigin.forEach((item, index) => {
        if (index == garbageIndex) {
          item.isActive = true;
        } else {
          item.isActive = false;
          console.log("--");
        }
      });
    },
    clickGarbageCode(garbageIndex) {
      this.conditionSource.garbageCode.forEach((item, index) => {
        if (index == garbageIndex) {
          item.isActive = true;
        } else {
          item.isActive = false;
          console.log("--");
        }
      });
    },
    // 排序
    changeSort(index) {
      this.sortMenu.forEach((item, key) => {
        if (key == index) {
          item.isActive = true;
          item.orderBy = "asc";
        } else {
          item.isActive = false;
          item.orderBy = "";
        }
      });
    },
    ascOrder(index) {
      this.sortMenu.forEach((item, key) => {
        if (key == index) {
          item.orderBy = "asc";
        } else {
          item.orderBy = "";
        }
      });
      console.log("升序", this.sortMenu);
    },
    descOrder(index) {
      this.sortMenu.forEach((item, key) => {
        if (key == index) {
          item.orderBy = "desc";
        } else {
          item.orderBy = "";
        }
      });
      console.log("降序", this.sortMenu);
    },

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
@import "../../../static/home/css/index.scss";
.banner {
  position: relative;
  background: url("/static/home/images/danger1.jpg") no-repeat 50% / cover;
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
        .condition-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          .condition-item-label {
            flex: 0 0 70px;
            line-height: 30px;
            font-size: 16px;
          }
          .condition-tag {
            flex: 1;
            margin-left: 38px;
            margin-right: 14px;
            max-height: 82px;
            overflow: hidden;
            .condition-tag-item {
              cursor: pointer;
              display: inline-block;
              padding-left: 12px;
              padding-right: 12px;
              margin-right: 8px;
              margin-bottom: 13px;
              border-radius: 14px;
              font-size: 14px;
              color: #333;
              line-height: 28px;
              background: #f5f5f5;
              &.active {
                color: #fff;
                background: #4293f4;
              }
            }
            &.active {
              max-height: fit-content;
            }
          }
          .condition-more {
            cursor: pointer;
            width: 54px;
            background: url("/static/home/images/pulldown.png") no-repeat right
              center;
            &.active {
              background: url("/static/home/images/pullup.png") no-repeat right
                center;
            }
          }
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
      min-height: 1400px;
      background: #fff;
      .sort-menu {
        display: flex;
        padding-left: 30px;
        .sort-item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 70px;
          // line-height: 70px;
          font-size: 18px;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          color: #333;
          &:not(:last-child) {
            margin-right: 70px;
          }
          .sort-item-icon {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-left: 8px;
            .sort-asc {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 8px;
              img {
                width: 8px;
                height: 5px;
              }
            }
            .sort-desc {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 8px;
              // margin-top: 2px;
            }
          }
          &.active {
            color: #4293f4;
            border-bottom: 3px solid #4293f4;
          }
        }
      }
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
              background: url("/static/home/images/product6.png") no-repeat left
                center;
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
          &:hover {
            background: #f7fbfe;
          }
        }
      }
    }
  }
}
</style>
