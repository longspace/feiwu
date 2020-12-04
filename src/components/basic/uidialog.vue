<template>
  <div>
    <a-modal v-model="configs.visible" :maskClosable="false" :footer="configs.footer?configs.footer:null" :title="configs.title" :width="configs.width?configs.width:300" @ok="handleOk" cancelText="取消" okText="确定">
      <slot>slot</slot>
    </a-modal>
  </div>
</template>
<script>
export default {
    name:'uidialog',
    props:{
      configs:{
        type:Object,
        default:{}
      }
    },
    data() {
      return {

      };
    },
    methods:{
      handleOk(e) {
        this.$emit("dialogSubmit",e)
      },
    },
    mounted(){

    }
};
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
