<template>
  <div>
    <mydialog :configs="mydialogcfg" @dialogSubmit="dialogSubmit">
      <uiform :formdata="dialogformdata" :formcfg="dialogformcfg"></uiform>
    </mydialog>
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
              {type:'Input',label:'',field:'keywords',icon:'align-left',style:{width:'260px'},placeholder:'企业名称、联系人、电话'}
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
                  { title: 'ID', field: 'id', width:'45px'},
                  { title: '企业名称', field: 'company_name',width:'120px'},
                  { title: '营业执照', field: 'business_photo',width:'100px',fieldType:'image'},
                  { title: '经营许可证', field: 'business_license_photo',width:'100px',fieldType:'image'},
                  { title: '许可证到期', field: 'business_license_expire',width:'80px'},
                  { title: '危废业务代码', field: 'business_code',width:'150px'},
                  { title: '联系人', field: 'contacter',width:'80px'},
                  { title: '联系电话', field: 'tel',width:'80px'},
                  { title: '年产量(吨)', field: 'year_product_weight',width:'90px'},
                  { title: '审核状态', field: 'verify',width:'80px',fieldType:'status',showText:[{id:1,label:"已审核",color:'#1890ff'},{id:0,label:"未审核",color:'#f00'}]},
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
          //=====================弹出框======================
          mydialogcfg:{
            visible:false,
            title:'标题',
            width:500
          },
          // 弹出框表单配置要显示哪些字段
          dialogformcfg:{
            basecfg:{
              formlayout:'horizontal',
              labelcol:{ span: 6},
              wrappercol:{ span:16  },
              formbtn:[
                  {key:'query',label:'保存',type:'primary', icon: 'check',ghost:true,handle:()=>this.dialogSubmit(),style:{'margin-left':'37.5%'}},
                  {key:'add',label:'关闭',type:'danger', icon: 'close',ghost:true,handle:()=>this.dialogClose(),style:{'margin-left':'50px'}},
              ]
            },
            data:[
              {type:'Input',label:'用户账号',field:'account',icon:'lock'},
              {type:'Input',label:'用户密码',field:'passwd',icon:'eye',placeholder:"修改密码时不改请留空"},
              {type:'Input',label:'企业名称',field:'company_name',icon:'user'},
              {type:'Input',label:'营业执照',field:'business_photo',icon:'user'},
              {type:'Input',label:'经营许可证',field:'business_license_photo',icon:'user'},
              {type:'Input',label:'许可证截止日期',field:'business_license_expire',icon:'user'},
              {type:'Input',label:'危废业务代码',field:'business_code',icon:'user'},
              {type:'Input',label:'联系人',field:'contacter',icon:'phone'},
              {type:'Input',label:'联系电话',field:'tel',icon:'phone'},
              {type:'Input',label:'年产量',field:'year_product_weight',icon:'phone'},
              {type:'Input',label:'省份城市',field:'province_city_id',icon:'mail'},
              {type:'Input',label:'详细地址',field:'address',icon:'mail'},
              {type:'Input',label:'是否VIP',field:'vip',icon:'control',mode:"multiple",options:[]},
              {type:'Switch',label:'当前状态',field:'status',icon:'control',itemstyle:{},style:{},placeholder:'',options:[{id:1,label:'启用'},{id:0,label:'禁用'}]},
              {type:'Textarea',label:'备注说明',field:'remarks',icon:'align-left'},
            ]
          },
          // 表单配置绑定值
          dialogformdata:{
            id:0,
            account:'',
            passwd:'',
            user_name:'',
            tel:'',
            email:'',
            status:true,
            role_auth:[],
            remarks:'',
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
        dialogAdd(){
          this.mydialogcfg.visible = true;
          this.mydialogcfg.title = '新增用户';
          this.dialogformcfg.data[5].options = this.init.roleList
          this.dialogformdata = {
            id:0,
            account:'',
            passwd:'',
            user_name:'',
            tel:'',
            email:'',
            status:true,
            role_auth:[],
            remarks:'',
          }
        },
        dialogClose(){
          this.mydialogcfg.visible = false;
        },
        dialogSubmit(){
          let form = this.dialogformdata;
          if(form.account == "" || form.user_name == ""){
            this.$message.error("用户账号、真实姓名为必填!");
            return false;
          }
          userHandle(this.dialogformdata).then(res=>{
            const {data} = res;
            if(data.code == 200){
              this.mydialogcfg.visible = false;
              this.loadData();
              this.$message.success(res.data.msg);
            }else{
              this.$message.error(res.data.msg);
            }
          }).catch(err=>{
            console.log("新增或更新用户出错：",err);
          })
        },
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
        let auth = this.yxCheckPermission("ADD_COMPANY_PRODUCT");
        if(auth){
          this.formcfg.basecfg.formbtn.push({key:'add',label:'新增',type:'', icon: 'plus',ghost:true,handle:()=>this.dialogAdd(),style:{'margin-left':'15px','border-color':'#e6a23c','color':'#e6a23c'}});
        }
        auth = this.yxCheckPermission("EDIT_COMPANY_PRODUCT");
        if(auth){
          this.tablecfg.operateOptions.push({ title: '修改', type: 'primary', icon: 'edit', methods: 'edithandle' });
        }
        auth = this.yxCheckPermission("DELETE_COMPANY_PRODUCT");
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
