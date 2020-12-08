<!--
 * @Author: summer
 * @LastEditTime: 2020-12-08 19:30:13
-->
<template>
  <div class="sift-condition">
    <div class="condition-item">
      <div class="condition-item-label">已选条件</div>
      <div class="condition-tag">
        <div class="tag-item">
          <div class="tag-item-inline" v-if="clickGarbageType">
            <div class="tag-item-text">{{ clickGarbageType }}</div>
            <div class="tag-close" @click="closeGarbageType">
              <img src="/static/home/images/product3.png" alt="" />
            </div>
          </div>
        </div>
        <!-- <a-tag closable @close="preventDefault" class="condition-tag-item">
          HW05 木材防腐剂废物
        </a-tag> -->
      </div>
      <div class="condition-plus">
        <img src="/static/home/images/product2.png" alt="" />
        <span>全部清空</span>
      </div>
    </div>
    <div class="condition-item">
      <div class="condition-item-label">产废区域</div>
      <div class="condition-tag">
        <div class="condition-tag-item">上海市</div>
        <div class="condition-tag-item">江西省</div>
      </div>
    </div>
    <div class="condition-item">
      <div class="condition-item-label">废物类别</div>
      <div class="condition-tag" v-if="this.garbageType">
        <div
          class="condition-tag-item"
          v-for="(garbageTypeItem, garbageTypeIndex) in garbageType"
          :key="garbageTypeIndex"
          @click="getClickGarbageType(garbageTypeIndex)"
          ref="garbageType"
        >
          {{ garbageTypeItem }}
        </div>
        <!-- <div class="condition-tag-item">HW02 医药废物</div>
        <div class="condition-tag-item">HW03 废药物、药品</div>
        <div class="condition-tag-item">HW04 农药废物</div>
        <div class="condition-tag-item">HW06 废有机溶剂与含有机溶剂废物</div>
        <div class="condition-tag-item">HW07 热处理含氰废物</div>
        <div class="condition-tag-item">HW06 废有机溶剂与含有机溶剂废物</div>
        <div class="condition-tag-item">HW07 热处理含氰废物</div>
        <div class="condition-tag-item">HW08 废矿物油与含矿物油废物</div>
        <div class="condition-tag-item">HW08 废矿物油与含矿物油废物</div>
        <div class="condition-tag-item">HW09 油/水、烃/水混合物或乳化液</div> -->
      </div>
      <div class="condition-plus">更多</div>
    </div>
  </div>
</template>

<script>
import { getGarbageArea, getGarbageType } from "@/utils/http/index.js";
export default {
  data() {
    return {
      garbageArea: [],
      clickArea: "", // 点击的产废区域
      garbageType: "", // 废物类别
      clickGarbageType: "" // 点击的废物类别
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.initGarbageType();
  },
  methods: {
    initGarbageArea() {
      getGarbageArea()
        .then(res => {
          const { data } = res;
          if (data.code == 200) {
            that.loadData();
            that.$message.success(res.data.msg);
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log("登录出错：", err);
        });
    },
    initGarbageType() {
      getGarbageType()
        .then(res => {
          const { data } = res;
          if (data.code == 200) {
            that.loadData();
            that.$message.success(res.data.msg);
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.garbageType = [
            "HW01 医疗废物²",
            "HW02 医药废物",
            "HW03 废药物、药品",
            "HW07 热处理含氰废物",
            "HW01 医疗废物²",
            "HW02 医药废物",
            "HW03 废药物、药品",
            "HW07 热处理含氰废物",
            "HW01 医疗废物²",
            "HW02 医药废物",
            "HW03 废药物、药品",
            "HW07 热处理含氰废物",
            "HW01 医疗废物²",
            "HW02 医药废物",
            "HW03 废药物、药品",
            "HW07 热处理含氰废物"
          ];
          console.log("登录出错：", err);
        });
    },
    // 点击废物类别
    getClickGarbageType(garbageTypeIndex) {
      this.clickGarbageType = this.$refs.garbageType[
        garbageTypeIndex
      ].innerText;
      console.log("点击的类别", this.clickGarbageType);
    },
    // 清除筛选类别
    closeGarbageType() {
      this.clickGarbageType = "";
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
