<!--
 * @Author: summer
 * @LastEditTime: 2020-12-25 17:27:07
-->
<template>
  <div class="condition-item">
    <div class="condition-item-label">
      {{ conditionLabel }}
    </div>
    <div class="condition-tag" :class="{ active: conditionMore }">
      <div
        class="condition-tag-item"
        :class="{ active: garbageItem.isActive }"
        v-for="(garbageItem, garbageIndex) in conditionList"
        :key="garbageIndex"
        @click="clickGarbageCondition(garbageIndex)"
        ref="garbageText"
      >
        {{ garbageItem.title }}
      </div>
    </div>
    <div
      class="condition-more"
      v-if="conditionList.length > 8"
      :class="{ active: conditionMore }"
      @click="getMore"
    >
      <span>更多</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      condition: "新添加的",
      conditionMore: false
    };
  },
  props: {
    conditionList: {
      type: Array
    },
    conditionLabel: {
      type: String
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    // 点击产废区域
    clickGarbageCondition(garbageIndex) {
      this.conditionList.forEach((item, index) => {
        if (index == garbageIndex) {
          item.isActive = true;
        } else {
          item.isActive = false;
          console.log("--");
        }
      });
      console.log("点击的区域", this.condition);
      this.$emit("getClickCondition", this.condition); // 点击的条件
    },
    // 获取更多
    getMore() {
      this.conditionMore = !this.conditionMore;
      console.log("获取更多");
    }
  }
};
</script>
<style scoped lang="scss">
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
    max-height: 83px;
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
    background: url("/static/home/images/pulldown.png") no-repeat right center;
    &.active {
      background: url("/static/home/images/pullup.png") no-repeat right center;
    }
  }
}
</style>
