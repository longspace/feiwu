<template>
  <div>
    <!-- :maskClosable="drawer.cfg.maskClosable?drawer.cfg.maskClosable:false" -->
    <a-drawer
      :title="drawer.cfg.title"
      placement="right"
      :closable="drawer.cfg.closable"
      :visible="drawer.cfg.visible"
      :maskClosable="true"
      :after-visible-change="afterVisibleChange"
      :width="drawer.cfg.width"
      :headerStyle="{color:'#ff0'}"
      :bodyStyle="{padding:'10px 20px 20px 20px'}"
      @close="onClose"
    >
    <template slot="header" slot-scope="slotProps">
        {{ slotProps.title }}
      </template>
      <slot></slot>
    </a-drawer>
  </div>
</template>
<script>
  export default {
    name:'uidrawer',
    props:{
      drawer:{
        type:Object,
        default:()=>{}
      }
    },
    data() {
      return {

      };
    },
    components:{

    },
    methods:{
      afterVisibleChange(val) {
        // console.log('visible', val);
      },
      showDrawer() {
        this.visible = true;
      },
      onClose() {
        this.$emit("closeDrawer",{})
      },
    },
    mounted(){

    }
  };
</script>
<style lang="scss">
.ant-drawer{ z-index: 500;}
</style>
<style scoped lang="scss" rel="stylesheet/scss">
.anticon-close{ color:#1890ff;}
</style>
