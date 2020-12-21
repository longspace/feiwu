<!--
 * @Author: summer
 * @LastEditTime: 2020-12-21 15:23:07
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
        <search-list
          :permission="permission"
          :product-list="searchProductList.productList"
          :type="searchProductList.type"
          :hot-product-list="hotProduct.productList"
          :hot-product-type="hotProduct.type"
        ></search-list>
      </div>
    </div>
  </div>
</template>

<script>
import SearchList from "./components/search-list";
export default {
  data() {
    return {
      permission: 0,
      keywords: "", // 搜索关键词
      list: {
        category: [
          {
            name: "品牌",
            items: [
              {
                name: "联想",
                active: false
              },
              {
                name: "小米",
                active: false
              },
              {
                name: "苹果",
                active: false
              },
              {
                name: "东芝",
                active: false
              }
            ]
          },
          {
            name: "CPU",
            items: [
              {
                name: "intel i7 8700K",
                active: false
              },
              {
                name: "intel i7 7700K",
                active: false
              },
              {
                name: "intel i9 9270K",
                active: false
              },
              {
                name: "intel i7 8700",
                active: false
              },
              {
                name: "AMD 1600X",
                active: false
              }
            ]
          },
          {
            name: "内存",
            items: [
              {
                name: "七彩虹8G",
                active: false
              },
              {
                name: "七彩虹16G",
                active: false
              },
              {
                name: "金士顿8G",
                active: false
              },
              {
                name: "金士顿16G",
                active: false
              }
            ]
          },
          {
            name: "显卡",
            items: [
              {
                name: "NVIDIA 1060 8G",
                active: false
              },
              {
                name: "NVIDIA 1080Ti 16G",
                active: false
              },
              {
                name: "NVIDIA 1080 8G",
                active: false
              },
              {
                name: "NVIDIA 1060Ti 16G",
                active: false
              }
            ]
          }
        ],
        condition: []
      },
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
  components: { SearchList },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getHotKeywords();
  },
  methods: {
    getHotKeywords() {
      this.keywords = this.$route.query.hotKeywords;
      console.log("his.$route.query", this.keywords);
    }

    // addition
    // handle: function(index, key) {
    //   var item = this.category[index].items;
    //   item.filter(function(v, i) {
    //     if (i == key) {
    //       v.active = true;
    //       this.list.condition.filter(function(v2, i) {
    //         if (v.name == v2.name) {
    //           this.list.condition.splice(i, 1);
    //           count--;
    //         }
    //       });
    //       Vue.set(this.list.condition, count++, v);
    //     }
    //   });
    // },
    // remove: function(index) {
    //   var item = this.category[index].items;
    //   item.filter(function(v1, key) {
    //     v1.active = false;
    //     this.list.condition.filter(function(v2, i) {
    //       if (v1.name == v2.name) {
    //         this.list.condition.splice(i, 1);
    //         count--;
    //       }
    //     });
    //   });
    // },
    // allIn: function(index) {
    //   var item = this.category[index].items;
    //   item.filter(function(v, key) {
    //     v.active = true;
    //     this.list.condition.filter(function(v2, i) {
    //       if (v.name == v2.name) {
    //         this.list.condition.splice(i, 1);
    //         count--;
    //       }
    //     });
    //     Vue.set(this.list.condition, count++, v);
    //   });
    // }
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
