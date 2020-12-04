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
            {type:'Input',label:'商品名称',field:'weight',icon:'read',style:{width:'50%'},placeholder:''},
            {type:'Input',label:'商品代码',field:'weight',icon:'read',style:{width:'50%'},placeholder:''},
            {type:'Cascader',label:'危废类别',field:'cate_id',icon:'control',itemstyle:{},style:{width:'50%'},placeholder:'',options:[
              {
                value: '废弃资源',
                label: '废弃资源',
                children: [
                  {
                    value: '废旧纺织品',
                    label: '废旧纺织品',
                  },
                  {
                    value: '废皮革制品',
                    label: '废皮革制品',
                  },
                  {
                    value: '废木制品',
                    label: '废木制品',
                  },
                ],
              },
              {
                value: '采矿业产生的一般固体',
                label: '采矿业产生的一般固体',
                children: [
                  {
                    value: '煤矸石',
                    label: '煤矸石',
                  },
                  {
                    value: '其他尾矿',
                    label: '其他尾矿',
                  },
                ],
              },
              {
                value: '食品，饮料等行业生产的一般固体',
                label: '食品，饮料等行业生产的一般固体',
                children: [
                  {
                    value: '植物残渣',
                    label: '植物残渣',
                  },
                  {
                    value: '动物残渣',
                    label: '动物残渣',
                  },
                  {
                    value: '禽畜粪肥',
                    label: '禽畜粪肥',
                  },
                ],
              },
              {
                value: '木材防腐剂废物',
                label: '木材防腐剂废物',
                children: [
                  {
                    value: '使用五氯酚进行木材防腐过程中产生的废水处理污泥，以及木材防腐处理过程中产生的沾染该防腐剂的废弃木材残片',
                    label: '使用五氯酚进行木材防腐过程中产生的废水处理污泥，以及木材防腐处理过程中产生的沾染该防腐剂的废弃木材残片',
                  },
                  {
                    value: '使用杂酚油进行木材防腐过程中产生的废水处理污泥，以及木材防腐处理过程中产生的沾染该防腐剂的废弃木材残片',
                    label: '使用杂酚油进行木材防腐过程中产生的废水处理污泥，以及木材防腐处理过程中产生的沾染该防腐剂的废弃木材残片',
                  },
                  {
                    value: '禽畜粪肥',
                    label: '禽畜粪肥',
                  },
                ],
              },
              {
                value: '废有机溶剂与含有机溶剂废物',
                label: '废有机溶剂与含有机溶剂废物',
                children: [
                  {
                    value: '工业生产中作为清洗剂、萃取剂、溶剂或反应介质使用后废弃的四氯化碳、二氯甲烷、1,1-二氯乙烷、1,2-二氯乙烷、1,1,1-三氯乙烷、1,1,2-三氯乙烷、三氯乙烯、四氯乙烯，以及在使用前混合的含有一种或多种上述卤化溶剂的混合/调和溶剂',
                    label: '工业生产中作为清洗剂、萃取剂、溶剂或反应介质使用后废弃的四氯化碳、二氯甲烷、1,1-二氯乙烷、1,2-二氯乙烷、1,1,1-三氯乙烷、1,1,2-三氯乙烷、三氯乙烯、四氯乙烯，以及在使用前混合的含有一种或多种上述卤化溶剂的混合/调和溶剂',
                  },
                  {
                    value: '使用杂酚油进行木材防腐过程中产生的废水处理污泥，以及木材防腐处理过程中产生的沾染该防腐剂的废弃木材残片',
                    label: '使用杂酚油进行木材防腐过程中产生的废水处理污泥，以及木材防腐处理过程中产生的沾染该防腐剂的废弃木材残片',
                  },
                  {
                    value: '禽畜粪肥',
                    label: '禽畜粪肥',
                  },
                ],
              },



            ]},
            {type:'Select',label:'物理状态',field:'physical_state',icon:'read',style:{width:'50%'},placeholder:'',options:[{id:1,label:'气态'},{id:2,label:'液态'},{id:3,label:'固态'},{id:4,label:'半固体'}]},
            {type:'Select',label:'包装形式',field:'package_style',icon:'read',style:{width:'50%'},placeholder:'',options:[{id:1,label:'桶'},{id:2,label:'槽罐'},{id:3,label:'箱'},{id:4,label:'编织袋'},{id:5,label:'散装'},{id:6,label:'其他'}]},
            {type:'Select',label:'主要成分',field:'main_parts',icon:'read',mode:"multiple",style:{width:'50%'},placeholder:'',options:[{id:1,label:'金属'},{id:2,label:'塑料'},{id:3,label:'玻璃'},{id:4,label:'陶瓷'},{id:5,label:'木材'},{id:6,label:'其他'}]},
            {type:'Select',label:'危险特性',field:'features',icon:'read',mode:"multiple",style:{width:'50%'},placeholder:'',options:[{id:1,label:'腐蚀性'},{id:2,label:'易燃性'},{id:3,label:'感染性'},{id:4,label:'反应性'},{id:5,label:'毒性'}]},
            {type:'Input',label:'年产量(吨)',field:'title',icon:'read',style:{width:'20%'},placeholder:''},
            {type:'Input',label:'重量(吨)',field:'weight',icon:'read',style:{width:'20%'},placeholder:''},
            {type:'Input',label:'预期价格',field:'expect_price',icon:'read',style:{width:'20%'},placeholder:'不包含运输价格'},
            {type:'Upload',label:'检则报告',field:'check_report',icon:'align-left',itemstyle:{},style:{'width':'116px','height':'116px','border-radius':'3px'},placeholder:'',handle:(val)=>this.getThumbImg(val)},
            {type:'MultiUpload',label:'危废照片(可多图)',field:'dangerPhotos',icon:'align-left',itemstyle:{},style:{'width':'186px','height':'186px','border-radius':'3px'},placeholder:'',handle:(val)=>this.getMultiThumbImg(val)},
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
