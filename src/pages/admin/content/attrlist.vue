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
  import {tagList,tagHandle,tagDelete} from "@/utils/http/index.js"
  export default {
      name:'attrlist',
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
              {type:'Input',label:'',field:'keywords',icon:'align-left',style:{width:'210px'},placeholder:'标签名称'},
            ]
          },
          // 表单配置绑定值
          formdata:{
            keywords:'',
          },

          tablecfg: {
              headerOptions:[
                  { title: '标签名称', field: 'tag_name'},
                  { title: '备注说明', field: 'remarks'},
                  { title: '状态', field: 'status',width:'100px',fieldType:'status'},
                  { title: '排序(升序)', field: 'sort',width:'180px'},
              ],
              algin:'center',
              operateLabel:'操作管理',
              operateWidth:'75px',
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
            title:'',
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
              {type:'Input',label:'标签名称',field:'tag_name',icon:'tag',itemstyle:{},style:{},placeholder:''},
              {type:'Switch',label:'当前状态',field:'status',icon:'control',itemstyle:{},style:{},placeholder:'',options:[{id:1,label:'启用'},{id:0,label:'禁用'}]},
              {type:'Input',label:'排序',field:'sort',icon:'filter',itemstyle:{},style:{},placeholder:'越小越靠前'},
              {type:'Textarea',label:'备注说明',field:'remarks',icon:'align-left',itemstyle:{},style:{},placeholder:''},
            ]
          },
          // 表单配置绑定值
          dialogformdata:{
            id:0,
            tag_name:'',
            status:true,
            sort:1,
            remarks:'',
          },

        };
      },
      components:{
        mydialog,uiform,uitable
      },
      methods:{
        dialogAdd(){
          this.mydialogcfg.title = '新增标签';
          this.dialogformdata={
            id:0,
            tag_name:'',
            status:true,
            sort:1,
            remarks:'',
          }
          this.mydialogcfg.visible = true;
        },
        dialogClose(){
          this.mydialogcfg.visible = false;
        },
        dialogSubmit(){
          let form = this.dialogformdata;
          if(form.tag_name == ""){
            this.$message.error("标签名必填!");
            return false;
          }
          tagHandle(this.dialogformdata).then(res=>{
            const {data} = res;
            if(data.code == 200){
              this.mydialogcfg.visible = false;
              this.loadData();
              this.$message.success(res.data.msg);
            }else{
              this.$message.error(res.data.msg);
            }
          }).catch(err=>{
            console.log("新增或更新标签出错：",err);
          })
        },
        formQuery(){
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
                    tagDelete({id:row.id}).then(res=>{
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
                this.mydialogcfg.title = "修改标签"
                this.dialogformdata = JSON.parse(JSON.stringify(row))
                this.mydialogcfg.visible = true
                break;
          }
        },
        loadData(){
          let form = this.formdata;
          const {pageSize,currentPage} =this.pages
          form.pageSize = pageSize;
          form.currentPage = currentPage;
          tagList(form).then(res=>{
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
        let auth = this.yxCheckPermission("ADD_ATTR");
        if(auth){
          this.formcfg.basecfg.formbtn.push({key:'add',label:'新增',type:'danger', icon: 'plus',ghost:true,handle:()=>this.dialogAdd(),style:{'margin-left':'15px'}},);
        }
        auth = this.yxCheckPermission("EDIT_ATTR");
        if(auth){
          this.tablecfg.operateOptions.push({ title: '修改', type: 'primary', icon: 'edit', methods: 'edithandle' });
        }
        auth = this.yxCheckPermission("DELETE_ATTR");
        if(auth){
          this.tablecfg.operateOptions.push({ title: '删除', type: 'danger', icon: 'delete', methods: 'deletehandle' });
        }
        this.loadData();
      }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
