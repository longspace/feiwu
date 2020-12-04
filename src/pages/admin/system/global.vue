<template>
  <div>
    <a-tabs type="card" @change="changeTab">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="appstore" />
          站点设置
        </span>
        <uiform :formdata="formdata" :formcfg="formcfg" style="width: 750px;"></uiform>
      </a-tab-pane>
      <!-- <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="shopping" />
          商城设置
        </span>
        微信支付管理<br/>
        微信小程序管理<br/>
        支付宝支付设置<br/>
      </a-tab-pane> -->
    </a-tabs>
  </div>
</template>
<script>
  import uiform from "@/components/basic/uiform.vue"
  import {webSite,webSiteHandle} from "@/utils/http/index.js"
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
                {key:'query',label:'保存',type:'primary', icon: 'check',ghost:true,handle:()=>this.formSubmit(),style:{'margin-left':'157px'}},
            ]
          },
          data:[
            {type:'Input',label:'网站名称',field:'title',icon:'align-left',style:{width:''},placeholder:'title'},
            {type:'Input',label:'SEO标题',field:'seo_title',icon:'align-left',style:{width:''},placeholder:'seoTitle'},
            {type:'Input',label:'关键词',field:'keywords',icon:'align-left',style:{width:''},placeholder:'keywords'},
            {type:'Input',label:'网站描述',field:'description',icon:'align-left',style:{width:''},placeholder:'description'},
            {type:'Textarea',label:'热门搜索词',field:'hotkeywords',icon:'smile',style:{width:''},rows:5,placeholder:'多个请用 , 隔开'},
          ]
        },
        // 表单配置绑定值
        formdata:{
          title:'',
          seo_title:'',
          keywords:'',
          description:'',
          hotkeywords:'',
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
      formSubmit(){
        if(this.formdata.title == ""){
          this.$message.error('网站名称为必填项');
          return false;
        }
        webSiteHandle(this.formdata).then(res=>{
          const {data} = res;
          if(data.code == 200){
            this.$message.success(res.data.msg);
          }else{
            this.$message.error(res.data.msg);
          }
        }).catch(err=>{
          console.log("更新站点信息出错：",err);
        })
      },
      loadData(){
        webSite({}).then(res=>{
          const {data} = res;
          console.log("webSite",data)
          this.formdata = {...data.data}
        }).catch(err=>{
          console.log("加载站点信息出错：",err);
        })
      }
    },
    mounted(){
      this.loadData();
    }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
