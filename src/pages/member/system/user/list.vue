<template>
  <div>
    <mydialog :configs="mydialogcfg" @dialogSubmit="dialogSubmit">
      <uiform :formdata="dialogformdata" :formcfg="dialogformcfg"></uiform>
    </mydialog>
    <uiform :formdata="formdata" :formcfg="formcfg"></uiform><br/>
    <uitable :datasource="tabledata" :tablecfg="tablecfg" @handleUiTableBtn="handleUiTableBtn"></uitable>
  </div>
</template>
<script>
  import mydialog from "@/components/basic/uidialog.vue"
  import uiform from "@/components/basic/uiform.vue"
  import uitable from "@/components/basic/uitable.vue"
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
                  {key:'add',label:'新增',type:'', icon: 'plus',ghost:true,handle:()=>this.dialogAdd(),style:{'margin-left':'15px','border-color':'#e6a23c','color':'#e6a23c'}},
              ]
            },
            data:[
              {type:'Input',label:'',field:'keywords',icon:'align-left',style:{width:'210px'},placeholder:'用户名称、联系电话'},
              {type:'DateRange',label:'',field:'daterange',icon:'smile',style:{width:'210px'}},
            ]
          },
          // 表单配置绑定值
          formdata:{
            keywords:'',
            DateRange:[]
          },

          tablecfg: {
              headerOptions:[
                  { title: '用户账号', field: 'account', width:'120px'},
                  { title: '用户名称', field: 'userName', width:'120px'},
                  { title: '用户角色', field: 'roleAuth'},
                  { title: '联系电话', field: 'tel',width:'120px'},
                  { title: '微信', field: 'weixin',width:'110px'},
                  { title: 'E-mail', field: 'email',width:'170px'},
                  { title: '备注说明', field: 'remarks'},
                  { title: '创建时间', field: 'createTime',width:'180px'},
              ],
              algin:'center',
              operateLabel:'操作管理',
              operateWidth:'75px',
              operateOptions: [
                  { title: '修改', type: 'primary', icon: 'edit', methods: 'edithandle' },
                  { title: '删除', type: 'danger', icon: 'delete', methods: 'deletehandle' },
              ]
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
                  {key:'query',label:'保存',type:'primary', icon: 'check',ghost:true,handle:()=>this.formQuery(),style:{'margin-left':'100px'}},
                  {key:'add',label:'关闭',type:'danger', icon: 'close',ghost:true,handle:()=>this.dialogClose(),style:{'margin-left':'50px'}},
              ]
            },
            data:[
              {type:'Input',label:'用户账号',field:'account',icon:'lock',itemstyle:{},style:{},placeholder:''},
              {type:'Input',label:'用户密码',field:'passwd',icon:'eye',itemstyle:{},style:{},placeholder:''},
              {type:'Input',label:'真实姓名',field:'userName',icon:'user',itemstyle:{},style:{},placeholder:''},
              {type:'Input',label:'联系电话',field:'tel',icon:'phone',itemstyle:{},style:{},placeholder:''},
              {type:'Input',label:'E-mail',field:'email',icon:'mail',itemstyle:{},style:{},placeholder:''},
              {type:'Input',label:'微信号',field:'weixin',icon:'message',itemstyle:{},style:{},placeholder:''},
              {type:'Select',label:'用户角色',field:'roleAuth',icon:'control',itemstyle:{},style:{},placeholder:'',mode:"multiple",options:[{id:100,label:'项目经理'},{id:101,label:'攻城师'},{id:103,label:'设计湿'},]},
              {type:'Textarea',label:'备注说明',field:'remarks',icon:'align-left',itemstyle:{},style:{},placeholder:''},
            ]
          },
          // 表单配置绑定值
          dialogformdata:{
            userName:'',
            account:'',
            passwd:'',
            tel:'',
            email:'',
            weixin:'',
            roleAuth:[],
            remarks:'',
          },

        };
      },
      components:{
        mydialog,uiform,uitable
      },
      methods:{
        dialogAdd(){
          this.mydialogcfg.visible = true;
          this.mydialogcfg.title = '新增用户';
        },
        dialogClose(){
          this.mydialogcfg.visible = false;
        },
        dialogSubmit(obj){
          console.log("来自子组件的消息",obj)
          this.mydialogcfg.visible = false;
        },
        formQuery(){
          console.log("formQuery",this.formdata)
        },
        handleUiTableBtn(methods,row){
          console.log("父组件：",methods,row)
          switch (methods){
            case 'deletehandle':
                this.$confirm({
                  title: '温馨提示',
                  content: '您确定要删除吗',
                  okText: '确认',
                  okType: 'danger',
                  cancelText: '取消',
                  onOk() {
                    console.log('OK');
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
                break;
            case 'edithandle':
                // this.edithandle(row)
                this.mydialogcfg.visible = true
                this.mydialogcfg.title = "修改数据"
                break;
          }

        },
      },
      mounted(){
        this.tabledata = [
            {id:100,account:'wubiao',userName:'吴先生',tel:'18721263568',email:'18721263568@163.com',weixin:'wubiao',roleAuth:'设计师',remarks:'这里是备注说明内容',createTime:'2020-11-02 11:35:08'},
            {id:101,account:'tangyin',userName:'唐银',tel:'15856321279',email:'15856321279@163.com',weixin:'tangyin',roleAuth:'项目经理',remarks:'这里是备注说明内容',createTime:'2020-11-02 11:35:08'},

          ]
      }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
