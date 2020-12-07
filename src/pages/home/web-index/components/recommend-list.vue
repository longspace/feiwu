<!--
 * @Author: summer
 * @LastEditTime: 2020-12-05 17:26:35
-->
<template>
  <div class="demand-recommend">
    <div
      class="recommend-card"
      v-for="recommendCard in recommend"
      :key="recommendCard.id"
    >
      <div class="recommend-l">
        <div class="recommend-title">{{ recommendCard.name }}</div>
        <div class="recommend-tag-list" v-if="recommendCard.tagList">
          <div
            class="recommend-tag-item"
            v-for="(tagItem, index) in recommendCard.tagList.slice(0, 5)"
            :key="index"
          >
            {{ tagItem }}
          </div>
        </div>
        <div class="recommend-more">
          <div class="recommend-more-text">
            <span>查看更多</span>
          </div>
          <div class="recommend-more-img">
            <img src="../../../../../static/home/images/index9.png" alt="" />
          </div>
        </div>
      </div>
      <div class="recommend-list" v-if="recommendCard.recommendItem">
        <div
          class="recommend-item"
          v-for="recommendItem in recommendCard.recommendItem.slice(0, 3)"
          :key="recommendItem.id"
        >
          <div class="recommend-item-top">
            <div class="recommend-item-img">
              <div class="recommend-item-img-b">
                <!-- src="../../../../../static/home/images/index12.jpg" -->
                <img
                  src="../../../../../static/home/images/index12.jpg"
                  alt=""
                />
              </div>
            </div>
            <div class="recommend-item-r">
              <p>预期价格</p>
              <p>
                <span class="num">{{ recommendItem.price }}</span> 元 / 吨
              </p>
            </div>
          </div>
          <div class="recommend-item-middle">
            <div class="recommend-item-name">{{ recommendItem.name }}</div>
            <div class="recommend-item-stock">{{ recommendItem.stock }}吨</div>
          </div>
          <div class="recommend-item-introduce">
            {{ recommendItem.introduce }}
          </div>
          <div class="recommend-item-bottom">
            <div class="recommend-item-category">
              {{ recommendItem.category }}
            </div>
            <div class="recommend-item-code">
              {{ recommendItem.code }}
            </div>
          </div>
          <div class="recommend-item-more">
            查看详情
          </div>
        </div>
      </div>
      <!-- ----{{ recommendCard }}+++ -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 推荐商品详情
      recommend: [
        {
          type: "1",
          id: "1",
          name: "危险废物处置需求推荐",
          tagList: [
            "含钙废物",
            "有机废水污泥",
            "金属氧化物废物废渣",
            "含钙废物",
            "有机废水污泥"
          ], // 推荐需求标签
          recommendItem: [
            {
              img:
                "https://dcdn.it120.cc/2020/11/14/f6a32ce4-9056-4fbb-9c4f-fc5d657633f6.jpg",
              id: "0555",
              price: "4000", // 单价
              name: "澳甲烷废物",
              stock: "20", // 库存
              introduce: "含氰热处理钡渣，含氰污泥及冷液，热处理渗碳氰渣", // 简介
              category: "HW06", // 类别
              code: "276-006-004" //代码
            },
            {
              img:
                "https://dcdn.it120.cc/2020/11/14/f6a32ce4-9056-4fbb-9c4f-fc5d657633f6.jpg",
              id: "0666",
              price: "4000", // 单价
              name: "澳甲烷废物",
              stock: "20", // 库存
              introduce: "含氰热处理钡渣，含氰污泥及冷液，热处理渗碳氰渣", // 简介
              category: "HW06", // 类别
              code: "276-006-004" //代码
            },
            {
              img:
                "https://dcdn.it120.cc/cuser/29950/2020/11/17/b4ff2744-8ae3-4fda-9030-0ee9a6dcb8cd.jpg",
              id: "0777",
              price: "4000", // 单价
              name: "澳甲烷废物",
              stock: "20", // 库存
              introduce: "含氰热处理钡渣，含氰污泥及冷液，热处理渗碳氰渣", // 简介
              category: "HW06", // 类别
              code: "276-006-004" //代码
            },
            {
              img:
                "https://dcdn.it120.cc/cuser/29950/2020/11/17/b4ff2744-8ae3-4fda-9030-0ee9a6dcb8cd.jpg",
              id: "0888",
              price: "4000", // 单价
              name: "澳甲烷废物",
              stock: "20", // 库存
              introduce: "含氰热处理钡渣，含氰污泥及冷液，热处理渗碳氰渣", // 简介
              category: "HW06", // 类别
              code: "276-006-004" //代码
            }
          ]
        },
        {
          type: "2",
          id: "2",
          name: "一般固废处置需求推荐",
          tagList: [
            "含钙废物",
            "有机废水污泥",
            "金属氧化物废物废渣",
            "含钙废物",
            "有机废水污泥"
          ], // 推荐需求标签
          recommendItem: [
            {
              img:
                "https://dcdn.it120.cc/2020/11/14/f6a32ce4-9056-4fbb-9c4f-fc5d657633f6.jpg",
              id: "0111",
              price: "4000", // 单价
              name: "澳甲烷废物",
              stock: "100", // 库存
              introduce: "含氰热处理钡渣，含氰污泥及冷液，热处理渗碳氰渣", // 简介
              category: "HW06", // 类别
              code: "276-006-004" //代码
            },
            {
              img:
                "https://dcdn.it120.cc/cuser/29950/2020/11/17/b4ff2744-8ae3-4fda-9030-0ee9a6dcb8cd.jpg",
              id: "0222",
              price: "4000", // 单价
              name: "澳甲烷废物",
              stock: "20", // 库存
              introduce: "含氰热处理钡渣，含氰污泥及冷液，热处理渗碳氰渣", // 简介
              category: "HW06", // 类别
              code: "276-006-004" //代码
            },
            {
              img:
                "https://dcdn.it120.cc/2020/11/14/f6a32ce4-9056-4fbb-9c4f-fc5d657633f6.jpg",
              id: "0333",
              price: "4000", // 单价
              name: "澳甲烷废物",
              stock: "20", // 库存
              introduce: "含氰热处理钡渣，含氰污泥及冷液，热处理渗碳氰渣", // 简介
              category: "HW06", // 类别
              code: "276-006-004" //代码
            },
            {
              img:
                "https://dcdn.it120.cc/cuser/29950/2020/11/17/b4ff2744-8ae3-4fda-9030-0ee9a6dcb8cd.jpg",
              id: "0444",
              price: "4000", // 单价
              name: "澳甲烷废物",
              stock: "20", // 库存
              introduce: "含氰热处理钡渣，含氰污泥及冷液，热处理渗碳氰渣", // 简介
              category: "HW06", // 类别
              code: "276-006-004" //代码
            }
          ]
        }
      ]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="scss">
@import "../../../../../static/home/css/index.scss";
.demand-recommend {
  width: 96%;
  max-width: 1200px;
  margin: 59px auto 0;
  .recommend-card {
    display: flex;
    justify-content: space-between;
    padding: 60px 56px;
    box-shadow: 0px 0px 10px 0px rgba(149, 167, 178, 0.31);
    &:first-child {
      margin-bottom: 52px;
    }
    .recommend-l {
      flex: 1;

      .recommend-title {
        margin-bottom: 42px;
        font-size: 22px;
        line-height: 1em;
        font-weight: bold;
        color: #333;
      }
      .recommend-tag-list {
        padding-right: 30px;
        .recommend-tag-item {
          display: inline-block;
          margin-bottom: 20px;
          padding-left: 15px;
          padding-right: 15px;
          font-size: 13px;
          border-radius: 15px;
          white-space: nowrap;
          line-height: 30px;
          color: #666;
          background: #ecf2f8;
          &:not(:last-child) {
            margin-right: 14px;
          }
        }
      }

      .recommend-more {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 76px;
        width: 160px;
        height: 40px;
        text-align: center;
        border-radius: 20px;
        box-sizing: border-box;
        border: 1px solid #4293f4;
        color: #4293f4;
        .recommend-more-text {
          margin-right: 10px;
        }
      }
    }
    .recommend-list {
      flex: 3;
      display: flex;
      justify-content: space-between;
      .recommend-item {
        flex: 1;
        padding: 25px;
        border: 1px solid #e5e5e5;
        &:not(:last-child) {
          margin-right: 12px;
        }
        .recommend-item-top {
          display: flex;
          justify-content: space-between;
          .recommend-item-img {
            position: relative;
            width: 80px;
            &::before {
              content: "";
              display: block;
              padding-bottom: 100%;
              overflow: hidden;
            }
            .recommend-item-img-b {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
                border-radius: 3px;
              }
            }
          }
          .recommend-item-r {
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
                  font-family: DINCond-Black;
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
        .recommend-item-middle {
          display: flex;
          margin-top: 20px;
          margin-bottom: 8px;
          .recommend-item-name {
            margin-right: 10px;
            font-size: 18px;
          }
          .recommend-item-stock {
            padding: 0 8px;
            font-size: 14px;
            line-height: 20px;
            box-sizing: border-box;
            color: #4293f4;
            border: 1px solid;
          }
        }
        .recommend-item-introduce {
          font-size: 14px;
          line-height: 26px;
          color: #666;
        }
        .recommend-item-bottom {
          display: flex;
          margin-top: 20px;
          margin-bottom: 30px;
          .recommend-item-category {
            margin-right: 8px;
            // display: inline-block;
            padding-left: 12px;
            padding-right: 12px;
            font-size: 12px;
            line-height: 26px;
            border-radius: 3px;
            background-color: #ecf2f8;
          }
          .recommend-item-code {
            // display: inline-block;
            padding-left: 12px;
            padding-right: 12px;
            font-size: 12px;
            line-height: 26px;
            border-radius: 3px;
            background-color: #ecf2f8;
          }
        }
        .recommend-item-more {
          font-size: 14px;
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #333;
          border-radius: 3px;
          background-color: #eee;
        }
        &:hover {
          .recommend-item-more {
            color: #fff;
            background-color: #4293f4;
          }
        }
      }
    }
  }
}
</style>
