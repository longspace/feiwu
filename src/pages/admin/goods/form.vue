<template>
  <div style="padding-top: 15px;">
    <uiform :formdata="formdata" :formcfg="formcfg" style="width: 100%;"></uiform>
  </div>
</template>
<script>
  import uiform from "@/components/basic/uiform.vue"
  import {goodsHandle,callCategoryList,uploadSingleImg,uploadImgs,callTagList,callGoodsCategoryParentAndSonList} from "@/utils/http/index.js"
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
            {type:'Cascader',label:'危废类别',field:'cate_id',icon:'control',itemstyle:{},style:{width:'50%'},placeholder:'',options:[]},
            {type:'Input',label:'商品名称',field:'title',icon:'read',style:{width:'50%'},placeholder:'',},
            {type:'Select',label:'物理状态',field:'physical_state',icon:'read',style:{width:'50%'},placeholder:'',options:[{id:1,label:'气态'},{id:2,label:'液态'},{id:3,label:'固态'},{id:4,label:'半固体'}]},
            {type:'Select',label:'包装形式',field:'package_style',icon:'read',style:{width:'50%'},placeholder:'',options:[{id:1,label:'桶'},{id:2,label:'槽罐'},{id:3,label:'箱'},{id:4,label:'编织袋'},{id:5,label:'散装'},{id:6,label:'其他'}]},
            {type:'Input',label:'主要成分',field:'main_parts',icon:'read',mode:"multiple",style:{width:'50%'},placeholder:'',},
            {type:'Select',label:'危险特性',field:'features',icon:'read',mode:"multiple",style:{width:'50%'},placeholder:'',options:[{id:1,label:'腐蚀性'},{id:2,label:'易燃性'},{id:3,label:'感染性'},{id:4,label:'反应性'},{id:5,label:'毒性'}]},
            {type:'Input',label:'年产量(吨)',field:'year_product_weight',icon:'read',style:{width:'30%'},placeholder:''},
            {type:'Input',label:'重量(吨)',field:'weight',icon:'read',style:{width:'30%'},placeholder:''},
            {type:'Input',label:'预期价格',field:'expect_price',icon:'read',style:{width:'30%'},placeholder:'每吨的单价'},
            {type:'Upload',label:'检则报告',field:'check_report',icon:'align-left',itemstyle:{},style:{'width':'103px','height':'103px','border-radius':'3px'},placeholder:'',handle:(val)=>this.getThumbImg(val)},
            {type:'MultiUpload',label:'危废照片',field:'photo',maxImgCount:8,icon:'align-left',itemstyle:{},style:{'width':'186px','height':'186px','border-radius':'3px'},placeholder:'',handle:(val)=>this.getMultiThumbImg(val),multiple:true,remove:(val)=>this.removeMultiThumbImg(val)},
          ]
        },
        // 表单配置绑定值
        formdata:{
          id:0,
          cate_id:[],
          title:'',
          physical_state:'',
          package_style:[],
          main_parts:'',
          features:[],
          year_product_weight:'',
          weight:'',
          expect_price:'',
          check_report:'',
          photo:[],
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
          cate_id:[],
          title:'',
          physical_state:'',
          package_style:[],
          main_parts:'',
          features:[],
          year_product_weight:'',
          weight:'',
          expect_price:'',
          check_report:'',
          photo:[],
        }
      }
    },
    methods:{
      backList(){
        this.$router.push("/admin/goods/goodsList")
      },
      initCateList(){
        callGoodsCategoryParentAndSonList({}).then(res=>{
          this.init.cateList = res.data.data;
          this.formcfg.data[0].options = res.data.data
        }).catch(err=>{
          console.log("初始化分类数据出错:",err)
        })
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
           this.formdata.check_report = res.data.url
         })
      },
      getMultiThumbImg(obj){
        console.log("getMultiThumbImg obj",obj)
         let fd = new FormData();
         fd.append('file',obj.file);//传文件
         uploadSingleImg(fd)
         .then(res=>{
           let arr = {uid:new Date().getTime(),status: 'done',url:res.data.url,name:res.data.url}
           this.formdata.photo.push(arr)
           console.log("res.data.url",res.data.url,"this.formdata.photo.",this.formdata.photo)
         })
      },
      removeMultiThumbImg(obj){
        let photo = this.formdata.photo;
        let ret = []
        photo.forEach((item,index)=>{
          if(item.url != obj.url){
            ret.push(item);
          }
        })
        this.formdata.photo = ret;
        console.log("removeMultiThumbImg obj",obj)
      },
      onCheckboxGroupChange(val){
        console.log("onCheckboxGroupChange",val,this.formdata.tags)
      },
      handleSubmit(){
        if(this.formdata.title == ""){
          this.$message.error('商品名称必填!');
          return false;
        }
        if(this.formdata.weight == "" || this.formdata.weight <= 0){
          this.$message.error('请填写重量(吨)!');
          return false;
        }
        console.log("handle",this.formdata)
        goodsHandle(this.formdata).then(res=>{
          const {data} = res;
          if(data.code == 200){
            this.$message.success(res.data.msg);
            this.$router.push("/admin/goods/goodsList")
          }else{
            this.$message.error(res.data.msg);
          }
        }).catch(err=>{
          console.log("新增或更新文章出错：",err);
        })
      },
      //处于编辑状态时，加载对应的数据
      forEditData(id){
          goodsDetails({id})
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
