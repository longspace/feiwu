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
  import {goodsList,goodsDelete,callCategoryList} from "@/utils/http/index.js"
  export default {
      name:'goodslist',
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
              {type:'Select',field:'verify',icon:'read',style:{width:'110px'},placeholder:'审核状态',options:[{id:1,label:'已审核'},{id:0,label:'未审核'}]},
              {type:'Select',field:'is_sale',icon:'read',style:{width:'110px'},placeholder:'是否上架',options:[{id:1,label:'已上架'},{id:0,label:'未上架'}]},
              {type:'Select',field:'handled_status',icon:'read',style:{width:'120px'},placeholder:'处置状态',options:[{id:1,label:'已处置完'},{id:0,label:'处置中'}]},
              {type:'Input',label:'',field:'keywords',icon:'align-left',style:{width:'260px'},placeholder:'关键信息'},
              {type:'DateRange',label:'',field:'date_range',icon:'smile',style:{width:'230px'},placeholder:['发布开始时间','发布结束时间']},
            ]
          },
          // 表单配置绑定值
          formdata:{
            verify:undefined,
            is_sale:undefined,
            handled_status:undefined,
            keywords:'',
            date_range:[]
          },
          tablecfg: {
              headerOptions:[
                  { title: 'ID', field: 'id', width:'45px'},
                  { title: '危废类别', field: 'cate_id',width:'120px'},
                  { title: '危废照片', field: 'thumb',width:'100px',fieldType:'image'},
                  { title: '检则报告', field: 'check_report',width:'100px',fieldType:'image'},
                  { title: '预期价格', field: 'expect_price',width:'80px'},
                  { title: '物理状态', field: 'physic',width:'150px'},
                  { title: '包装形式', field: 'package_style',width:'80px'},
                  { title: '主要成分', field: 'main_parts',width:'80px'},
                  { title: '危废特性', field: 'feature',width:'80px'},
                  { title: '年产量(吨)', field: 'year_product_weight',width:'90px'},
                  { title: '重量(吨)', field: 'weight',width:'80px'},
                  { title: '已处理重量(吨)', field: 'handled_weight',width:'110px'},
                  { title: '审核状态', field: 'verify',width:'80px',fieldType:'status',showText:[{id:1,label:"已审核",color:'#1890ff'},{id:0,label:"未审核",color:'#f00'}]},
                  { title: '是否上架', field: 'is_sale',width:'80px',fieldType:'status',showText:[{id:1,label:"已上架",color:'#e6a23c'},{id:0,label:"未上架",color:'#999'}]},
                  { title: '发布人', field: 'user_id',width:'80px'},
                  { title: '发布时间', field: 'create_at',width:'105px' },
              ],
              algin:'center',
              loading:false,
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
                    goodsDelete({id:row.id}).then(res=>{
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
                    path:"/admin/goods/form",
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
          this.tablecfg.loading = true;
          let form = JSON.parse(JSON.stringify(this.formdata));
          form.verify = form.verify == undefined?'':form.verify
          form.is_sale = form.is_sale == undefined?'':form.is_sale
          form.handled_status = form.handled_status == undefined?'':form.handled_status

          const {pageSize,currentPage} =this.pages
          form.pageSize = pageSize;
          form.currentPage = currentPage;
          goodsList(form).then(res=>{
            const {data} = res;
            this.tabledata = data.data;
            this.pages.total = data.total;
            this.tablecfg.loading = false;
          }).catch(err=>{
            console.log("加载文章列表出错：",err);
            this.tablecfg.loading = false;
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
