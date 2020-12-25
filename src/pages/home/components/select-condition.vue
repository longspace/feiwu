<!--
 * @Author: summer
 * @LastEditTime: 2020-12-25 10:48:28
-->
<template>
  <div class="select-condition">
    <div class="select-condition-l">
      <div class="condition-item-label">已选条件</div>
      <div
        class="condition-tag"
        v-for="(conditionItem, index) in conditionTag"
        :key="index"
      >
        <div class="tag-item">
          <div class="tag-item-inline">
            <div class="tag-item-text">{{ conditionItem.title }}</div>
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
</template>

<script>
export default {
  data() {
    return {
      conditionTag: [{ title: "江西省", id: 1 }] //已选条件
    };
  },
  methods: {
    clearCondition() {
      console.log("全部清空");
    },
    closeCondition() {
      console.log("清除选项");
    }
  }
};
</script>
<style scoped lang="scss">
.select-condition {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  .select-condition-l {
    display: flex;
    .condition-item-label {
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
</style>
