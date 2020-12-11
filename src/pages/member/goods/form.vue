<template>
  <div style="padding-top: 15px;">
    <uiform :formdata="formdata" :formcfg="formcfg" style="width: 100%;"></uiform>
  </div>
</template>
<script>
  import uiform from "@/components/basic/uiform.vue"
  import {goodsHandle,callCategoryList,uploadSingleImg,uploadImgs,callTagList,callGoodsCategoryParentAndSonList,goodsDetails,callfeatures,callpackageStyle,callphysicalState} from "@/utils/http/index.js"
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
            {type:'Cascader',label:'危废类别',field:'category_id',icon:'control',itemstyle:{},style:{width:'50%'},placeholder:'',options:[]},
            {type:'Input',label:'商品名称',field:'title',icon:'read',style:{width:'50%'},placeholder:'',},
            {type:'Select',label:'物理状态',field:'physical_state',icon:'read',style:{width:'50%'},placeholder:'',options:[]},
            {type:'Select',label:'包装形式',field:'package_style',icon:'read',style:{width:'50%'},placeholder:'',options:[]},
            {type:'Input',label:'主要成分',field:'main_parts',icon:'read',mode:"multiple",style:{width:'50%'},placeholder:'',},
            {type:'Select',label:'危险特性',field:'features',icon:'read',mode:"multiple",style:{width:'50%'},placeholder:'',options:[]},
            // // {type:'Input',label:'年产量(吨)',field:'year_product_weight',icon:'read',style:{width:'30%'},placeholder:''},
            {type:'Input',label:'重量(吨)',field:'weight',icon:'read',style:{width:'30%'},placeholder:''},
            {type:'Input',label:'预期每吨价格',field:'expect_price',icon:'read',style:{width:'30%'},placeholder:'每吨的单价'},
            {type:'Upload',label:'检则报告',field:'check_report',icon:'align-left',itemstyle:{},style:{'width':'103px','height':'103px','border-radius':'3px'},placeholder:'',handle:(val)=>this.getThumbImg(val)},
            {type:'MultiUpload',label:'危废照片',field:'photo',maxImgCount:8,icon:'align-left',itemstyle:{},style:{'width':'186px','height':'186px','border-radius':'3px'},placeholder:'',handle:(val)=>this.getMultiThumbImg(val),multiple:true,remove:(val)=>this.removeMultiThumbImg(val)},
            {type:'Editor',label:'商品详情',field:'content',icon:'read',style:{width:'100%','max-width':'935px'},placeholder:''},
          ]
        },
        // 表单配置绑定值
        formdata:{
          id:0,
          category_id:[],
          title:'',
          physical_state:'',
          package_style:[],
          main_parts:'',
          features:[],
          // year_product_weight:'',
          weight:'',
          expect_price:'',
          check_report:'',
          photo:[],
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
          category_id:[],
          title:'',
          physical_state:'',
          package_style:[],
          main_parts:'',
          features:[],
          // year_product_weight:'',
          weight:'',
          expect_price:'',
          check_report:'',
          photo:[],
          content:''
        }
      }
    },
    methods:{
      backList(){
        this.$router.push("goodslist")
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
        const action = this.$route.query.action || "";
        if(action == 'clone'){
          this.formdata.id = 0;
        }
        console.log("this.formdata",this.formdata);
        // return false;
        goodsHandle(this.formdata).then(res=>{
          const {data} = res;
          if(data.code == 200){
            this.$message.success(res.data.msg);
            this.$router.push("goodslist")
          }else{
            this.$message.error(res.data.msg);
          }
        }).catch(err=>{
          console.log("新增或更新商品出错：",err);
        })
      },
      //处于编辑状态时，加载对应的数据
      forEditData(id){
          goodsDetails({id})
          .then(resp=>{
            let resdata = resp.data.data
            let photo = [];
            for(let i=0;i<resdata.photos.length;i++){
              photo.push({uid:new Date().getMilliseconds()+i,status: 'done',url:resdata.photos[i],name:resdata.photos[i]})
            }
            resdata.photo = photo;
            this.formdata = resdata
            console.log("this.formdata:",this.formdata)
          })
          .catch(err=>{
              console.log("error:",err)
          });
      },

      initData(){
        callGoodsCategoryParentAndSonList({}).then(res=>{
          this.init.cateList = res.data.data;
          this.formcfg.data[0].options = res.data.data
        }).catch(err=>{
          console.log("初始化分类数据出错:",err)
        })
        callphysicalState({}).then(res=>{
          this.formcfg.data[2].options = res.data.data
        }).catch(err=>{
          console.log("初始化分类数据出错:",err)
        })
        callpackageStyle({}).then(res=>{
          this.formcfg.data[3].options = res.data.data
        }).catch(err=>{
          console.log("初始化分类数据出错:",err)
        })
        callfeatures({}).then(res=>{
          this.formcfg.data[5].options = res.data.data
        }).catch(err=>{
          console.log("初始化分类数据出错:",err)
        })
      }
    },
    mounted(){
      this.initData();

      //判断是编辑/克隆状态
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
