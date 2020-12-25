<!--
 * @Author: summer
 * @LastEditTime: 2020-12-25 17:08:33
-->
<template>
  <div class="sort-menu">
    <div
      class="sort-item"
      v-for="(sortItem, index) in sortMenu"
      :key="sortItem.id"
      :class="{ active: sortItem.isActive }"
      @click="changeSort(index)"
    >
      <span>{{ sortItem.name }}</span>
      <div class="sort-item-icon" v-if="sortItem.orderWay !== 'default'">
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
</template>

<script>
export default {
  data() {
    return {
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
  methods: {
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
    }
  }
};
</script>
<style scoped lang="scss">
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
</style>
