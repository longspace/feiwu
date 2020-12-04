<template>
  <div>
    <mydialog :configs="mydialogcfg" @dialogSubmit="dialogSubmit">
      <uiform :formdata="dialogformdata" :formcfg="dialogformcfg"></uiform>
    </mydialog>
    <uiform :formdata="formdata" :formcfg="formcfg"></uiform><br/>
    <uitable :datasource="tabledata" :tablecfg="tablecfg" @handleUiTableBtn="handleUiTableBtn"></uitable>
    <!-- 设置权限 -->
    <mydialog :configs="authdialogcfg" @dialogSubmit="authdialogSubmit">
      <uiform :formdata="authdialogformdata" :formcfg="authdialogformcfg"></uiform>
    </mydialog>
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
                  {key:'add',label:'新增',type:'danger', icon: 'plus',ghost:true,handle:()=>this.dialogAdd(),style:{'margin-left':'15px'}},
              ]
            },
            data:[
              {type:'Input',label:'',field:'keywords',icon:'align-left',style:{width:'210px'},placeholder:'角色名称'},
            ]
          },
          // 表单配置绑定值
          formdata:{
            keywords:'',
          },

          tablecfg: {
              headerOptions:[
                  { title: '角色名称', field: 'roleName', width:'120px'},
                  { title: '角色权限', field: 'roleAuth'},
                  { title: '备注说明', field: 'remarks'},
                  { title: '创建时间', field: 'createTime',width:'180px'},
              ],
              algin:'center',
              operateLabel:'操作管理',
              operateWidth:'105px',
              operateOptions: [
                  { title: '设置权限', type: '', icon: 'setting', methods: 'authhandle',style:{'color':'#42b983','border-color': '#42b983'} },
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
                  {key:'query',label:'保存',type:'primary', icon: 'check',ghost:true,handle:()=>this.formQuery(),style:{'margin-left':'113px'}},
                  {key:'add',label:'关闭',type:'danger', icon: 'close',ghost:true,handle:()=>this.dialogClose(),style:{'margin-left':'60px'}},
              ]
            },
            data:[
              {type:'Input',label:'角色名称',field:'roleName',icon:'team',itemstyle:{},style:{},placeholder:''},
              {type:'Switch',label:'当前状态',field:'status',icon:'control',itemstyle:{},style:{},placeholder:'',options:[{id:1,label:'启用'},{id:0,label:'禁用'}]},
              {type:'Textarea',label:'备注说明',field:'remarks',icon:'align-left',itemstyle:{},style:{},placeholder:''},
            ]
          },
          // 表单配置绑定值
          dialogformdata:{
            roleName:'',
            status:1,
            remarks:'',
          },

          //===================设置权限弹出框======================
          authdialogcfg:{
            visible:false,
            title:'标题',
            width:500
          },
          // 弹出框表单配置要显示哪些字段
          authdialogformcfg:{
            basecfg:{
              formlayout:'horizontal',
              labelcol:{ span: 6},
              wrappercol:{ span:16  },
              formbtn:[
                  {key:'query',label:'保存',type:'primary', icon: 'check',ghost:true,handle:()=>this.authformQuery(),style:{'margin-left':'113px'}},
                  {key:'add',label:'关闭',type:'danger', icon: 'close',ghost:true,handle:()=>this.authdialogClose(),style:{'margin-left':'60px'}},
              ]
            },
            data:[
              {type:'Input',label:'角色名称',field:'roleName',icon:'team',itemstyle:{},style:{},placeholder:''},
              {type:'Select',label:'状态',field:'status',icon:'control',itemstyle:{},style:{},placeholder:'',options:[{id:1,label:'启用'},{id:0,label:'禁用'}]},
              {type:'Textarea',label:'备注说明',field:'remarks',icon:'align-left',itemstyle:{},style:{},placeholder:''},
            ]
          },
          // 表单配置绑定值
          authdialogformdata:{
            roleName:'',
            status:1,
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
          this.mydialogcfg.title = '新增角色';
        },
        dialogClose(){
          this.mydialogcfg.visible = false;
        },
        dialogSubmit(obj){
          console.log("来自子组件的消息",obj)
          this.mydialogcfg.visible = false;
        },
        authdialogClose(){
          this.authdialogcfg.visible = false;
        },
        authdialogSubmit(obj){
          console.log("来自子组件的消息",obj)
          this.authdialogcfg.visible = false;
        },
        formQuery(){
          console.log("formQuery",this.formdata)
        },
        handleUiTableBtn(methods,row){
          console.log("父组件：",methods,row)
          switch (methods){
            case 'authhandle':
            this.authdialogcfg.visible = true;
            this.authdialogcfg.title = '设置角色权限 【'+ row.roleName+'】';
              break;
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
                this.mydialogcfg.visible = true
                this.mydialogcfg.title = "修改角色"
                break;
          }

        },
      },
      mounted(){
        this.tabledata = [
            {id:100,roleName:'设计师',roleAuth:'会员查看、订单查看',remarks:'这里是备注说明内容',createTime:'2020-11-02 11:35:08'},
            {id:101,roleName:'项目经理',roleAuth:'会员管理、订单管理',remarks:'这里是备注说明内容',createTime:'2020-11-02 11:35:08'},
          ]
      }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
