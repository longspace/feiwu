<template>
  <div style="padding-top: 15px;">
    <uiform :formdata="formdata" :formcfg="formcfg" style="width: 100%;"></uiform>
  </div>
</template>
<script>
  import uiform from "@/components/basic/uiform.vue"
  import {articleHandle,callCategoryList,uploadSingleImg,callTagList,articleDetails} from "@/utils/http/index.js"
  export default {
    name:'',
    data() {
      return {
        // 表单配置要显示哪些字段
        formcfg:{
          basecfg:{
            formlayout:'horizontal',
            labelcol:{ span: 3 },
            wrappercol:{ span: 19 },
            formbtn:[
                {key:'query',label:'保存内容',type:'primary', icon: 'check',ghost:true,handle:()=>this.handleSubmit(),style:{"margin-left":'16%'}},
                {key:'goBack',label:'返回商品列表',type:'', icon: 'arrow-left',ghost:true,handle:()=>this.backList(),style:{'margin-left':'10%','border-color':'#e6a23c','color':'#e6a23c'}},
            ]
          },
          editor:{

          },
          data:[
            {type:'Select',label:'危废性质',field:'properties',icon:'read',style:{width:'50%'},placeholder:'',options:[{id:1,label:'危险废物'},{id:2,label:'一般固体废物'}]},
            {type:'Cascader',label:'危废类别',field:'cate_id',icon:'control',itemstyle:{},style:{width:'50%'},placeholder:'',options:[]},
            {type:'Input',label:'危废名称',field:'title',icon:'read',style:{width:'50%'},placeholder:''},
            {type:'Input',label:'危废代码',field:'code',icon:'read',style:{width:'50%'},placeholder:''},
            {type:'Select',label:'物理状态',field:'physical_state',icon:'read',style:{width:'50%'},placeholder:'',options:[{id:1,label:'气态'},{id:2,label:'液态'},{id:3,label:'固态'},{id:4,label:'半固体'}]},
            {type:'Select',label:'包装形式',field:'package_style',icon:'read',style:{width:'50%'},placeholder:'',options:[{id:1,label:'桶'},{id:2,label:'槽罐'},{id:3,label:'箱'},{id:4,label:'编织袋'},{id:5,label:'散装'},{id:6,label:'其他'}]},
            {type:'Select',label:'主要成分',field:'main_parts',icon:'read',style:{width:'50%'},placeholder:'',options:[{id:1,label:'金属'},{id:2,label:'塑料'},{id:3,label:'玻璃'},{id:4,label:'陶瓷'},{id:5,label:'木材'},{id:6,label:'其他'}]},
            {type:'Select',label:'危废特性',field:'features',icon:'read',style:{width:'50%'},placeholder:'',options:[{id:1,label:'腐蚀性'},{id:2,label:'易燃性'},{id:3,label:'感染性'},{id:4,label:'反应性'},{id:5,label:'毒性'}]},
            {type:'Input',label:'年产量(吨)',field:'title',icon:'read',style:{width:'20%'},placeholder:''},
            {type:'Input',label:'重量(吨)',field:'weight',icon:'read',style:{width:'20%'},placeholder:''},
            {type:'Input',label:'预期价格',field:'expect_price',icon:'read',style:{width:'20%'},placeholder:'不包含运输价格'},
            {type:'Upload',label:'检则报告',field:'check_report',icon:'align-left',itemstyle:{},style:{'width':'116px','height':'116px','border-radius':'3px'},placeholder:'',handle:(val)=>this.getThumbImg(val)},
            {type:'MultiUpload',label:'危废照片',field:'dangerPhotos',icon:'align-left',itemstyle:{},style:{'width':'186px','height':'186px','border-radius':'3px'},placeholder:'',handle:(val)=>this.getMultiThumbImg(val)},
            {type:'Input',label:'关键信息',field:'key_info',icon:'interaction',style:{width:'50%'},placeholder:''},
          ]
        },
        // 表单配置绑定值
        formdata:{
          id:0,
          properties:'',
          cate_id:[],
          title:'',
          tags:[],
          keywords:'',
          descriptions:'',
          thumb:'',
          dangerPhotos:[],
          jump_url:'',
          content:''
        },
        init:{
          cateList:[],
          tagList:[]
        }

      };
    },
    components:{
      uiform
    },
    watch: {  //监听
      $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
        this.formdata = {
          id:0,
          cate_id:'',
          title:'',
          tags:[],
          keywords:'',
          descriptions:'',
          thumb:'',
          jump_url:'',
          content:''
        }
      }
    },
    methods:{
      backList(){
        this.$router.push("/admin/content/articleList")
      },
      initCateList(){
        // callCategoryList({has_root:0}).then(res=>{
        //    this.init.cateList = res.data.data;
        //    this.formcfg.data[1].options = res.data.data
        // }).catch(err=>{
        //   console.log("初始化分类数据出错:",err)
        // })
      },
      initTagList(){
        // callTagList({}).then(res=>{
        //    this.init.tagList = res.data.data;
        //    this.formcfg.data[2].options = res.data.data
        // }).catch(err=>{
        //   console.log("初始化分类数据出错:",err)
        // })
      },
      getThumbImg(obj){
         let fd = new FormData();
         fd.append('file',obj.file);//传文件
         uploadSingleImg(fd)
         .then(res=>{
           this.formdata.thumb = res.data.url
         })
      },
      onCheckboxGroupChange(val){
        console.log("onCheckboxGroupChange",val,this.formdata.tags)
      },
      getMultiThumbImg(obj){
         let fd = new FormData();
         fd.append('file',obj.file);//传文件
         uploadSingleImg(fd)
         .then(res=>{
           this.formdata.thumb = res.data.url
         })
      },
      handleSubmit(){
        if(this.formdata.title == ""){
          this.$message.error('标题必填!');
          return false;
        }
        if(this.formdata.jump_url == "" && this.formdata.content == ""){
          this.$message.error('文章内容和跳转链接总得填写一个吧!');
          return false;
        }
        console.log("handle",this.formdata)
        articleHandle(this.formdata).then(res=>{
          const {data} = res;
          if(data.code == 200){
            this.$message.success(res.data.msg);
            this.$router.push("/admin/content/articleList")
          }else{
            this.$message.error(res.data.msg);
          }
        }).catch(err=>{
          console.log("新增或更新文章出错：",err);
        })
      },
      //处于编辑状态时，加载对应的数据
      forEditData(id){
          articleDetails({id})
          .then(resp=>{
            this.formdata = resp.data.data
          })
          .catch(err=>{
              console.log("error:",err)
          });
      },
    },
    mounted(){
      this.initTagList()
      this.initCateList();

      //判断是否为编辑状态
      const id = this.$route.query.id;
      if(id != undefined){
        this.forEditData(id)
      }


    }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
