<!--
 * @Author: summer
 * @LastEditTime: 2020-12-09 16:56:54
-->
<template>
  <div class="sift-condition">
    <div class="condition-item" v-if="conditionTag.length">
      <div class="condition-item-label">已选条件</div>
      <div class="condition-tag">
        <div class="tag-item">
          <div class="tag-item-inline">
            <div class="tag-item-text"></div>
            <div class="tag-close" @click="closeCondition">
              <img src="/static/home/images/product3.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="condition-plus" @click="clearCondition">
        <img src="/static/home/images/product2.png" alt="" />
        <span>全部清空</span>
      </div>
    </div>
    <div class="condition-item">
      <div class="condition-item-label">
        <slot>产废区域</slot>
      </div>
      <div class="condition-tag">
        <div
          class="condition-tag-item"
          :class="garbageAreaItem.isActive ? 'active' : ''"
          v-for="(garbageAreaItem, garbageAreaIndex) in garbageArea"
          :key="garbageAreaIndex"
          @click="getClickGarbageArea(garbageAreaIndex)"
          ref="garbageArea"
        >
          {{ garbageAreaItem.title }}
        </div>
      </div>
    </div>
    <div class="condition-item">
      <div class="condition-item-label">
        <slot>废物类别</slot>
      </div>
      <div class="condition-tag">
        <div
          class="condition-tag-item"
          :class="garbageTypeItem.isActive ? 'active' : ''"
          v-for="(garbageTypeItem, garbageTypeIndex) in garbageType"
          :key="garbageTypeIndex"
          @click="getClickGarbageType(garbageTypeIndex)"
          ref="garbageType"
        >
          {{ garbageTypeItem.value }}{{ garbageTypeItem.title }}
        </div>
      </div>
      <div class="condition-plus">更多</div>
    </div>
    <!-- <div class="condition-item" v-if="garbageCode">
      <div class="condition-item-label">
        <slot>类别代码</slot>
      </div>
      <div class="condition-tag">
        <div
          class="condition-tag-item"
          v-for="(garbageCodeItem, garbageCodeIndex) in garbageCode"
          :key="garbageCodeIndex"
          @click="getClickGarbageType(garbageCodeItem)"
          ref="garbageType"
        >
          {{ garbageCodeItem }}
        </div>
      </div>
      <div class="condition-plus">更多</div>
    </div> -->
  </div>
</template>

<script>
import {
  getGarbageArea,
  getGarbageType,
  getGarbageOrigin,
  getGarbageCode
} from "@/utils/http/index.js";
export default {
  data() {
    return {
      clickGarbageType: "", // 点击的废物类别
      clickGarbageArea: "", // 点击的废物区域
      conditionTag: [] //已选条件
    };
  },
  props: {
    garbageArea: {
      type: Array
    },
    garbageType: {
      type: Array
    }
    // clickGarbageType: {
    //   type: String
    // },
    // clickGarbageArea: {
    //   type: String
    // }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    // 点击废物类别
    getClickGarbageType(garbageTypeIndex) {
      this.garbageType.forEach((item, index) => {
        if (index == garbageTypeIndex) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
    },
    getClickGarbageArea(garbageAreaIndex) {
      this.garbageArea.forEach((item, index) => {
        if (index == garbageAreaIndex) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
      console.log(
        "点击的区域",
        this.$refs.garbageArea[garbageAreaIndex].innerText
      );
      // let clickTag = this.$refs.garbageArea[garbageAreaIndex].innerText;
    },
    // 清除筛选条件
    closeCondition() {
      // this.clickGarbageTag = "";
    },
    clearCondition() {
      console.log("关闭标签");
    },
    getConditionTag() {
      this.$refs.garbageType.className.indexOf(className) > -1;
      this.conditionTag.push();
    }
  }
};
</script>
<style scoped lang="scss">
.sift-condition {
  width: 96%;
  max-width: 1200px;
  margin: 0px auto 0px;
  padding: 26px 30px 46px;
  background: #fff;
  .condition-item {
    display: flex;
    justify-content: space-between;
    .condition-item-label {
      flex: 0 0 70px;
      line-height: 30px;
    }
    .condition-tag {
      flex: 1;
      margin-left: 46px;
      margin-right: 14px;
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
      }
      .active {
        color: #fff;
        background: #4293f4;
      }
    }
    .condition-plus {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 090px;
    }
    &:first-child {
      //   padding-top: 22px;

      padding-bottom: 18px;
      border-bottom: 1px solid #e5e5e5;
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
    &:nth-child(2) {
      padding-top: 22px;
      padding-bottom: 4px;
      border-bottom: 1px solid #e5e5e5;
    }
    &:last-child {
      padding-top: 22px;
    }
  }
}
</style>
