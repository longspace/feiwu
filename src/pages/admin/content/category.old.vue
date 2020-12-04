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
      name:'category',
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
              {type:'Input',label:'',field:'keywords',icon:'align-left',style:{width:'210px'},placeholder:'分类名称'},
            ]
          },
          // 表单配置绑定值
          formdata:{
            keywords:'',
          },

          tablecfg: {
              headerOptions:[
                  { title: '分类名称', field: 'role_name', width:'50%'},
                  { title: '所属模型', field: 'model_name', width:'250px'},
                  { title: '备注说明', field: 'remarks',width:'180px'},
                  { title: '创建时间', field: 'create_at',width:'180px'},
              ],
              algin:'center',
              operateLabel:'操作',
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
                  {key:'query',label:'保存',type:'primary', icon: 'check',ghost:true,handle:()=>this.formQuery(),style:{'margin-left':'113px'}},
                  {key:'add',label:'关闭',type:'danger', icon: 'close',ghost:true,handle:()=>this.dialogClose(),style:{'margin-left':'60px'}},
              ]
            },
            data:[
              {type:'Input',label:'分类名称',field:'cate_name',icon:'apartment',itemstyle:{},style:{},placeholder:''},
              {type:'Select',label:'状态',field:'status',icon:'control',itemstyle:{},style:{},placeholder:'',options:[{id:1,label:'启用'},{id:0,label:'禁用'}]},
              {type:'Textarea',label:'备注说明',field:'remarks',icon:'align-left',itemstyle:{},style:{},placeholder:''},
            ]
          },
          // 表单配置绑定值
          dialogformdata:{
            id:0,
            cate_name:'',
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
          this.mydialogcfg.title = '新增分类';
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
                this.mydialogcfg.visible = true
                this.mydialogcfg.title = "修改分类"
                break;
          }

        },
      },
      mounted(){
        let auth = this.yxCheckPermission("ADD_CATE");
        if(auth){
          this.formcfg.basecfg.formbtn.push({key:'add',label:'新增',type:'danger', icon: 'plus',ghost:true,handle:()=>this.dialogAdd(),style:{'margin-left':'15px'}},);
        }
        auth = this.yxCheckPermission("EDIT_CATE");
        if(auth){
          this.tablecfg.operateOptions.push({ title: '修改', type: 'primary', icon: 'edit', methods: 'edithandle' });
        }
        auth = this.yxCheckPermission("DELETE_CATE");
        if(auth){
          this.tablecfg.operateOptions.push({ title: '删除', type: 'danger', icon: 'delete', methods: 'deletehandle' });
        }

        this.tabledata = [{
    key: 91,
    role_name: '新闻中心',
    age: 60,
    remarks: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        role_name: '国内新闻',
        age: 42,
        remarks: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        role_name: '国际新闻',
        age: 30,
        remarks: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            role_name: '中国',
            age: 16,
            remarks: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        role_name: 'Jim Green sr.',
        age: 72,
        remarks: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            role_name: 'Jim Green',
            age: 42,
            remarks: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                role_name: 'Jim Green jr.',
                age: 25,
                remarks: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                role_name: 'Jimmy Green sr.',
                age: 18,
                remarks: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    role_name: 'Joe Black',
    age: 32,
    remarks: 'Sidney No. 1 Lake Park',
  },]


      }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
