<!--
 * @Author: summer
 * @LastEditTime: 2020-12-27 15:37:49
-->
<template>
  <div class="search">
    <div class="search-bar">
      <div class="search-input">
        <a-input v-model="keywords" allowClear
          ><a-icon slot="prefix" type="search"
        /></a-input>
      </div>
      <div class="search-button">
        <a-button type="primary">
          搜一下
        </a-button>
      </div>
    </div>
    <div class="result">
      <div class="result-title">
        <span>全部结果</span>
        <span>></span>
        <span class="search-value">{{ keywords }}</span>
      </div>
      <div class="result-list">
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
            <div
              class="product-list"
              v-if="searchProductList.productList.length"
            >
              <div
                class="product-item"
                v-for="productItem in searchProductList.productList"
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
                      <span class="price" v-if="permission === 2">
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
              <div class="hot-product-title">热门推荐</div>
              <div class="hot-product-list" v-if="hotProduct.productList">
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
                  <div class="hot-product-synopsis">
                    {{ hotItem.synopsis }}
                  </div>
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
export default {
  data() {
    return {
      visible: false, // 弹窗
      permission: 0,
      keywords: "", // 搜索关键词
      searchProductList: {
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
      ] // 排序菜单};
    };
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getHotKeywords();
  },
  methods: {
    getHotKeywords() {
      this.keywords = this.$route.query.hotKeywords;
      console.log("his.$route.query", this.keywords);
    },

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
.search {
  .search-bar {
    display: flex;
    justify-content: space-between;
    width: 96%;
    max-width: 834px;
    margin: 0 auto;
    padding-top: 34px;
    padding-bottom: 34px;
    .search-input {
      flex: 1;
      margin-right: 13px;
    }
    .search-button {
      width: 160px;
    }
  }
  .result {
    padding-top: 32px;
    padding-bottom: 32px;
    background-color: #f2f5f8;
    .result-title {
      width: 96%;
      max-width: 1200px;
      margin: 0 auto 30px;
      font-size: 14px;
      color: #999;
      .search-value {
        color: #333;
      }
    }
    .result-list {
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
                  background: url("/static/home/images/product6.png") no-repeat
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
  }
}
</style>
<style lang="scss">
.search .search-bar .search-input .ant-input {
  height: 54px;
  padding-left: 50px;
  font-size: 16px;
}
.search .search-bar .ant-input-affix-wrapper .ant-input-prefix {
  left: 20px;
}
.search .search-bar .search-button .ant-btn {
  height: 54px;
  width: 100%;
  font-size: 20px;
  background-color: #4293f4;
  border-color: #4293f4;
}
.search .ant-input-prefix {
  left: 25px;
  font-size: 24px;
  color: #999;
}
</style>
