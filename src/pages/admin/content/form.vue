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
                {key:'goBack',label:'返回文章列表',type:'', icon: 'arrow-left',ghost:true,handle:()=>this.backList(),style:{'margin-left':'10%','border-color':'#e6a23c','color':'#e6a23c'}},
            ]
          },
          editor:{

          },
          data:[
            {type:'TreeSelect',label:'所属分类',field:'cate_id',icon:'control',itemstyle:{},style:{width:'60%'},placeholder:'请不要选择含有子类的分类(必须是最后一级分类)',options:[]},
            {type:'Input',label:'文章标题',field:'title',icon:'read',style:{width:'60%'},placeholder:''},
            {type:'CheckboxGroup',label:'标签属性',field:'tags',icon:'read',style:{},placeholder:'',options:[],handle:(val)=>this.onCheckboxGroupChange(val)},
            {type:'Input',label:'关键词',field:'keywords',icon:'interaction',style:{width:'60%'},placeholder:''},
            {type:'Textarea',label:'文章描述',field:'descriptions',icon:'profile',style:{width:'60%'},rows:3,placeholder:''},
            {type:'Upload',label:'缩略图',field:'thumb',icon:'align-left',itemstyle:{},style:{'width':'186px','height':'186px','border-radius':'3px'},placeholder:'',handle:(val)=>this.getThumbImg(val)},
            {type:'Input',label:'跳转链接',field:'jump_url',icon:'link',style:{width:'60%'},placeholder:'如果填写则会转向该网址，且网址必须加上http://或https://'},
            // {type:'TreeSelect',label:'访问权限',field:'visit_role_ids',icon:'control',itemstyle:{},style:{width:'60%'},placeholder:'访问权限',checkable:true,options:[{value:100,key:100,title:'项目经理',children: [{title: '项目组长',value: '0-0-0',key: '0-0-0',},],},{value:101,key:101,title:'攻城师'},{value:102,key:102,title:'设计湿'}]},
            {type:'Editor',label:'文章内容',field:'content',icon:'align-left',style:{width:'60%'},},
            // {type:'Date',label:'发布时间',field:'create_at',icon:'read',style:{width:'60%'},placeholder:''},
          ]
        },
        // 表单配置绑定值
        formdata:{
          id:0,
          cate_id:'',
          title:'',
          tags:[],
          keywords:'',
          descriptions:'',
          thumb:'',
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
        callCategoryList({has_root:0}).then(res=>{
           this.init.cateList = res.data.data;
           this.formcfg.data[0].options = res.data.data
        }).catch(err=>{
          console.log("初始化分类数据出错:",err)
        })
      },
      initTagList(){
        callTagList({}).then(res=>{
           this.init.tagList = res.data.data;
           this.formcfg.data[2].options = res.data.data
        }).catch(err=>{
          console.log("初始化分类数据出错:",err)
        })
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
