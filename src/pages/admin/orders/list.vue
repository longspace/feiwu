<template>
  <div>
    <!-- <mydialog :configs="mydialogcfg" @dialogSubmit="dialogSubmit">
      <uiform :formdata="dialogformdata" :formcfg="dialogformcfg"></uiform>
    </mydialog> -->
    <uiform :formdata="formdata" :formcfg="formcfg"></uiform><br/>
    <uitable :datasource="tabledata" :tablecfg="tablecfg" @handleUiTableBtn="handleUiTableBtn" @onSelectChange="onTableSelectChange"></uitable>
    <div class="pages">
      <a-pagination v-model="pages.currentPage" :pageSize="pages.pageSize" :total="pages.total" @change="onPageChange" />
    </div>
  </div>
</template>
<script>
  import mydialog from "@/components/basic/uidialog.vue"
  import uiform from "@/components/basic/uiform.vue"
  import uitable from "@/components/basic/uitable.vue"
  import {articleList,articleDelete,callCategoryList} from "@/utils/http/index.js"
  export default {
      name:'articlelist',
      data() {
        return {
          // 表单配置要显示哪些字段
          formcfg:{
            basecfg:{
              formlayout:'inline',
              labelcol:{ span: 6 },
              wrappercol:{ span: 7 },
              formbtn:[
                  {key:'query',label:'查询',type:'primary', icon: 'search',ghost:true,handle:()=>this.formQuery(),style:{}},
              ]
            },
            data:[
              {type:'Select',field:'physical_state',icon:'read',style:{width:'110px'},placeholder:'订单状态',options:[{id:0,label:'待发货'},{id:1,label:'待收货'},{id:2,label:'已收货'}]},
              {type:'Input',label:'',field:'keywords',icon:'align-left',style:{width:'260px'},placeholder:'订单号、关键信息'},
              {type:'DateRange',label:'',field:'daterange',icon:'smile',style:{width:'230px'},placeholder:['订单开始时间','订单结束时间']},
            ]
          },
          // 表单配置绑定值
          formdata:{
            cate_id:[],
            keywords:'',
            DateRange:[]
          },
          tablecfg: {
              headerOptions:[
                  { title: '订单号', field: 'id', width:'90px'},
                  { title: '产废单位', field: 'cate_id',width:'120px'},
                  { title: '处废单位', field: 'cate_id',width:'120px'},
                  { title: '危废类别', field: 'cate_id',width:'120px'},
                  { title: '危废照片', field: 'thumb',width:'100px',fieldType:'image'},
                  { title: '检则报告', field: 'thumb',width:'100px',fieldType:'image'},
                  { title: '物理状态', field: 'hits',width:'80px'},
                  { title: '包装形式', field: 'hits',width:'80px'},
                  { title: '主要成分', field: 'hits',width:'80px'},
                  { title: '危废特性', field: 'hits',width:'80px'},
                  { title: '年产量(吨)', field: 'hits',width:'90px'},
                  { title: '重量(吨)', field: 'hits',width:'80px'},
                  { title: '预期价格', field: 'hits',width:'80px'},
                  { title: '审核状态', field: 'status',width:'80px',fieldType:'status',showText:["否","是"]},
                  // { title: '关键信息', field: 'hits',width:'80px'},
                  // { title: '标签属性', field: 'tags',width:'86px'},
                  // { title: '访问权限', field: 'permission',width:'80px'},
                  // { title: '发布人', field: 'user_id',width:'80px'},
                  { title: '创建时间', field: 'create_at',width:'105px' },
              ],
              algin:'center',
              operateLabel:'操作管理',
              operateWidth:'75px',
              rowSelection:true, // 复选框
              operateOptions: []
          },
          tabledata:[],
          pages:{
            pageSize:10,
            currentPage:1,
            total:1
          },
          init:{
            cateList:[]
          }
        };
      },
      components:{
        mydialog,uiform,uitable
      },
      methods:{
        formQuery(){
          console.log("this.formdata",this.formdata)
          this.pages.currentPage = 1;
          this.loadData()
        },
        handleUiTableBtn(methods,row){
          let that = this;
          switch (methods){
            case 'deletehandle':
                this.$confirm({
                  title: '温馨提示',
                  content: '您确定要删除吗',
                  okText: '确认',
                  okType: 'danger',
                  cancelText: '取消',
                  onOk() {
                    articleDelete({id:row.id}).then(res=>{
                      const {data} = res;
                      if(data.code == 200){
                        that.loadData();
                        that.$message.success(res.data.msg);
                      }else{
                        that.$message.error(res.data.msg);
                      }
                    }).catch(err=>{
                      console.log("删除分类出错：",err);
                    })
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
                break;
            case 'edithandle':
                // this.$router.push("/admin/content/form")
                this.$router.push({
                    path:"/admin/content/form",
                    query:{
                        id:row.id
                    }
                });
                break;
          }

        },
        onTableSelectChange(obj){
          console.log("onTableSelectChange",obj)
        },
        loadData(){
          let form = this.formdata;
          const {pageSize,currentPage} =this.pages
          form.pageSize = pageSize;
          form.currentPage = currentPage;
          articleList(form).then(res=>{
            const {data} = res;
            this.tabledata = data.data;
            this.pages.total = data.total;
          }).catch(err=>{
            console.log("加载文章列表出错：",err);
          })
        },
        onPageChange(e){
          this.pages.currentPage = e;
          this.loadData()
        }
      },
      mounted(){
        let auth = this.yxCheckPermission("EDIT_ARTICLE");
        if(auth){
          this.tablecfg.operateOptions.push({ title: '修改', type: 'primary', icon: 'edit', methods: 'edithandle' });
        }
        auth = this.yxCheckPermission("DELETE_ARTICLE");
        if(auth){
          this.tablecfg.operateOptions.push({ title: '删除', type: 'danger', icon: 'delete', methods: 'deletehandle' });
        }
        this.loadData()
      }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
