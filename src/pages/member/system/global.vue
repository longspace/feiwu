<template>
  <div>
    <a-tabs type="card" @change="changeTab">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="appstore" />
          基本设置
        </span>
        <uiform :formdata="formdata" :formcfg="formcfg" style="width: 750px;"></uiform>
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="shopping" />
          商城设置
        </span>
        商城设置商城设置商城设置商城设置商城设置商城设置商城设置
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
  import uiform from "@/components/basic/uiform.vue"
  export default {
    name:'',
    data() {
      return {
        // 表单配置要显示哪些字段
        formcfg:{
          basecfg:{
            formlayout:'horizontal',
            labelcol:{ span: 5 },
            wrappercol:{ span: 16 },
            formbtn:[
                {key:'query',label:'保存',type:'primary', icon: 'check',ghost:true,handle:()=>this.formQuery(),style:{'margin-left':'157px'}},
            ]
          },
          data:[
            {type:'Input',label:'网站名称',field:'title',icon:'align-left',style:{width:''},placeholder:'title'},
            {type:'Input',label:'SEO标题',field:'seoTitle',icon:'align-left',style:{width:''},placeholder:'seoTitle'},
            {type:'Input',label:'关键词',field:'keywords',icon:'align-left',style:{width:''},placeholder:'keywords'},
            {type:'Input',label:'网站描述',field:'description',icon:'align-left',style:{width:''},placeholder:'description'},
            {type:'Textarea',label:'热门搜索词',field:'hotkeywords',icon:'smile',style:{width:''},rows:5,placeholder:'多个请用 , 隔开'},
          ]
        },
        // 表单配置绑定值
        formdata:{
          keywords:'',
          DateRange:[]
        },

      };
    },
    components:{
      uiform
    },
    methods:{
      changeTab(key) {
        console.log(key);
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
