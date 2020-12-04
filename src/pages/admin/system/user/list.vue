<template>
  <div>
    <mydialog :configs="mydialogcfg" @dialogSubmit="dialogSubmit">
      <uiform :formdata="dialogformdata" :formcfg="dialogformcfg"></uiform>
    </mydialog>
    <uiform :formdata="formdata" :formcfg="formcfg"></uiform><br/>
    <uitable :datasource="tabledata" :tablecfg="tablecfg" @handleUiTableBtn="handleUiTableBtn"></uitable>
    <div class="pages">
      <a-pagination v-model="pages.currentPage" :pageSize="pages.pageSize" :total="pages.total" @change="onPageChange" />
    </div>
  </div>
</template>
<script>
  import mydialog from "@/components/basic/uidialog.vue"
  import uiform from "@/components/basic/uiform.vue"
  import uitable from "@/components/basic/uitable.vue"
  import {userList,userHandle,userDelete,callRoleList} from "@/utils/http/index.js"
  export default {
      name:'',
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
              {type:'Input',label:'',field:'keywords',icon:'align-left',style:{width:'210px'},placeholder:'用户名称、联系电话'},
              {type:'DateRange',label:'',field:'daterange',icon:'smile',style:{width:'230px'}},
            ]
          },
          // 表单配置绑定值
          formdata:{
            keywords:'',
            DateRange:[]
          },
          pages:{
            pageSize:2,
            currentPage:1,
            total:100
          },
          tablecfg: {
              headerOptions:[
                  { title: '用户账号', field: 'account', width:'110px'},
                  { title: '用户名称', field: 'user_name', width:'110px'},
                  { title: '用户角色', field: 'user_group_title'},
                  { title: '联系电话', field: 'tel',width:'110px'},
                  { title: '邮箱', field: 'email',width:'170px'},
                  { title: '备注说明', field: 'remarks'},
                  { title: '状态', field: 'status',width:'100px',fieldType:'status'},
                  { title: '创建时间', field: 'create_at',width:'145px'},
              ],
              algin:'center',
              operateLabel:'操作管理',
              operateWidth:'75px',
              operateOptions: []
          },
          tabledata:[],

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
              {type:'Input',label:'真实姓名',field:'user_name',icon:'user'},
              {type:'Input',label:'联系电话',field:'tel',icon:'phone'},
              {type:'Input',label:'E-mail',field:'email',icon:'mail'},
              {type:'Select',label:'用户角色',field:'role_auth',icon:'control',mode:"multiple",options:[]},
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
            roleList:[]
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
          console.log("formQuery",this.formdata)
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
                    
                    userDelete({id:row.id}).then(res=>{
                      const {data} = res;
                      if(data.code == 200){
                        that.loadData();
                        that.$message.success(res.data.msg);
                      }else{
                        that.$message.error(res.data.msg);
                      }
                    }).catch(err=>{
                      console.log("删除用户出错：",err);
                    })
                    
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
                break;
            case 'edithandle':
                this.mydialogcfg.visible = true
                this.mydialogcfg.title = "修改数据"
                this.dialogformcfg.data[5].options = this.init.roleList
                this.dialogformdata = JSON.parse(JSON.stringify(row))
                break;
          }

        },
        initRoleList(){
          callRoleList({}).then(res=>{
            this.init.roleList = res.data.data
          }).catch(err=>{
            console.log("加载角色列表出错：",err);
          })
        },
        loadData(){
          let form = this.formdata;
          const {pageSize,currentPage} =this.pages
          form.pageSize = pageSize;
          form.currentPage = currentPage;
          userList(form).then(res=>{
            const {data} = res;
            this.tabledata = data.data;
            this.pages.total = data.total;
          }).catch(err=>{
            console.log("加载用户列表出错：",err);
          })
        },
        onPageChange(e){
          this.pages.currentPage = e;
          this.loadData()
        }
      },
      mounted(){
        let auth = this.yxCheckPermission("ADD_USER");
        if(auth){
          this.formcfg.basecfg.formbtn.push({key:'add',label:'新增',type:'', icon: 'plus',ghost:true,handle:()=>this.dialogAdd(),style:{'margin-left':'15px','border-color':'#e6a23c','color':'#e6a23c'}});
        }
        auth = this.yxCheckPermission("EDIT_ARTICLE");
        if(auth){
          this.tablecfg.operateOptions.push({ title: '修改', type: 'primary', icon: 'edit', methods: 'edithandle' });
        }
        auth = this.yxCheckPermission("DELETE_ARTICLE");
        if(auth){
          this.tablecfg.operateOptions.push({ title: '删除', type: 'danger', icon: 'delete', methods: 'deletehandle' });
        }
        this.initRoleList();
        this.loadData();
      }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
