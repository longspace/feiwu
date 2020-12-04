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
      name:'field',
      data() {
        return {
          // 表单配置要显示哪些字段
          formcfg:{
            basecfg:{
              formlayout:'inline',
              labelcol:{ span: 6 },
              wrappercol:{ span: 7 },
              formbtn:[
                  {key:'query',label:'查询',type:'primary', icon: 'search',ghost:false,handle:()=>this.formQuery(),style:{}},
                  {key:'add',label:'新增',type:'danger', icon: 'plus',ghost:true,handle:()=>this.dialogAdd(),style:{'margin-left':'15px'}},
              ]
            },
            data:[
              {type:'Input',label:'',field:'keywords',icon:'align-left',style:{width:'210px'},placeholder:'字段名称'},
            ]
          },
          // 表单配置绑定值
          formdata:{
            keywords:'',
          },

          tablecfg: {
              headerOptions:[
                  { title: '字段名称', field: 'fieldName'},
                  { title: '字段类型', field: 'fieldType'},
                  { title: '状态', field: 'status',fieldType:'switch'},
                  { title: '系统字段', field: 'isSystem',fieldType:'status',showText:["否","是"]},
                  { title: '备注说明', field: 'remarks'},
                  { title: '排序', field: 'sort',width:'80px'},
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
                  {key:'query',label:'保存',type:'primary', icon: 'check',ghost:true,handle:()=>this.dialogSubmit(),style:{'margin-left':'113px'}},
                  {key:'add',label:'关闭',type:'danger', icon: 'close',ghost:true,handle:()=>this.dialogClose(),style:{'margin-left':'60px'}},
              ]
            },
            data:[
              {type:'Input',label:'字段名称',field:'fieldName',icon:'align-left',itemstyle:{},style:{},placeholder:''},
              {type:'Select',label:'字段类型',field:'fieldType',icon:'',itemstyle:{},style:{},placeholder:'',options:[{id:1,label:'单行文本'},{id:2,label:'多行文本'},{id:3,label:'数字'},{id:4,label:'单选字段'},{id:5,label:'多选字段'},{id:6,label:'日期'},{id:7,label:'时间'},{id:8,label:'日期+时间'},{id:9,label:'附件'}]},
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

        };
      },
      components:{
        mydialog,uiform,uitable
      },
      methods:{
        dialogAdd(){
          this.mydialogcfg.visible = true;
          this.mydialogcfg.title = '新增字段';
        },
        dialogClose(){
          this.mydialogcfg.visible = false;
        },
        dialogSubmit(obj){
          console.log(this.dialogformdata)
          
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
                this.mydialogcfg.visible = true
                this.mydialogcfg.title = "修改字段"
                break;
          }

        },
      },
      mounted(){
        this.tabledata = [
            {id:100,fieldName:'姓名',fieldType:'单行文本',status:1,remarks:'不可编辑',isSystem:1,createTime:'2020-11-02 11:35:08'},
            {id:102,fieldName:'电话',fieldType:'单行文本',status:1,remarks:'不可编辑',isSystem:1,createTime:'2020-11-02 11:35:08'},
            {id:103,fieldName:'微信',fieldType:'单行文本',status:0,remarks:'',isSystem:0,createTime:'2020-11-02 11:35:08'},
            {id:104,fieldName:'备注',fieldType:'多行文本',status:1,remarks:'',isSystem:0,createTime:'2020-11-02 11:35:08'},
          ]
      }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
