<template>
  <div>
    <a-tabs type="card" @change="changeTab">
      <a-tab-pane key="1">
        <span slot="tab"> <a-icon type="bars" /> 一级分类</span>
        <uiform :formdata="formdata" :formcfg="formcfg"></uiform><br/>
        <uitable :datasource="tabledata" :tablecfg="tablecfg" @handleUiTableBtn="handleUiTableBtn" ></uitable>
        <div class="pages">
          <a-pagination v-model="pages.currentPage" :pageSize="pages.pageSize" :total="pages.total" @change="onPageChange" />
        </div>

        <mydialog :configs="mydialogcfg" @dialogSubmit="dialogSubmit">
          <uiform :formdata="dialogformdata" :formcfg="dialogformcfg"></uiform>
        </mydialog>

      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab"> <a-icon type="block" /> 二级分类</span>

          <uiform :formdata="formdatason" :formcfg="formcfgson"></uiform><br/>
          <uitable :datasource="tabledatason" :tablecfg="tablecfgson" @handleUiTableBtn="handleUiTableBtnson" ></uitable>
          <div class="pages">
            <a-pagination v-model="pagesson.currentPage" :pageSize="pagesson.pageSize" :total="pagesson.total" @change="onPageChangeson" />
          </div>

          <mydialog :configs="mydialogcfgson" @dialogSubmit="dialogSubmitson">
            <uiform :formdata="dialogformdatason" :formcfg="dialogformcfgson"></uiform>
          </mydialog>

      </a-tab-pane>
    </a-tabs>

  </div>
</template>
<script>
  import {goodsCategoryList,goodsCategoryHandle,goodsCategoryDelete,goodsCategorySonList,goodsCategorySonHandle,goodsCategorySonDelete,callGoodsCategoryList,uploadSingleImg} from "@/utils/http/index.js"
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
            data:[{type:'Input',label:'',field:'keywords',icon:'align-left',style:{width:'260px'},placeholder:'类别名称/代码'}]
          },
          // 表单配置绑定值
          formdata:{
            cate_id:[],
            keywords:'',
            DateRange:[]
          },
          tablecfg: {
              headerOptions:[
                  { title: 'ID', field: 'id', width:'70px'},
                  { title: '类别名称', field: 'title'},
                  { title: '类别代码', field: 'code',width:'200px'},
                  { title: '危废种类', field: 'type_name',width:'200px'},
                  { title: '状态', field: 'status',width:'80px',fieldType:'status',showText:[{id:1,label:"正常",color:'#1890ff'},{id:0,label:"禁用",color:'#f00'}]},
                  { title: '排序(升序)', field: 'sort',width:'150px'},
                  { title: '备注', field: 'remarks',width:'200px'},
                  // { title: '发布时间', field: 'create_at',width:'105px' },
              ],
              loading:false,
              algin:'center',
              operateLabel:'操作管理',
              operateWidth:'75px',
              rowSelection:null, // 复选框
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
                  {key:'query',label:'保存',type:'primary', icon: 'check',ghost:true,handle:()=>this.dialogSubmit(),style:{'margin-left':'113px'}},
                  {key:'add',label:'关闭',type:'danger', icon: 'close',ghost:true,handle:()=>this.dialogClose(),style:{'margin-left':'60px'}},
              ]
            },
            data:[
              {type:'Select',label:'危废种类',field:'type',icon:'read',style:{},placeholder:'所属大类',options:[]},
              {type:'Input',label:'类别代码',field:'code',icon:'apartment',itemstyle:{},style:{},placeholder:''},
              {type:'Input',label:'类别名称',field:'title',icon:'apartment',itemstyle:{},style:{},placeholder:''},
              {type:'Input',label:'排序',field:'sort',icon:'apartment',itemstyle:{},style:{},placeholder:''},
              {type:'Switch',label:'当前状态',field:'status',icon:'control',itemstyle:{},style:{},placeholder:'',options:[{id:1,label:'启用'},{id:0,label:'禁用'}]},
              {type:'Textarea',label:'备注说明',field:'remarks',icon:'align-left',itemstyle:{},style:{},placeholder:''},
            ]
          },
          // 表单配置绑定值
          dialogformdata:{
            id:0,
            type:'',
            title:'',
            code:'',
            sort:0,
            status:true,
            remarks:'',
          },
          init:{
            cateList:[]
          },

          //============================================================
          // 表单配置要显示哪些字段
          formcfgson:{
            basecfg:{
              formlayout:'inline',
              labelcol:{ span: 6 },
              wrappercol:{ span: 7 },
              formbtn:[
                  {key:'query',label:'查询',type:'primary', icon: 'search',ghost:true,handle:()=>this.formQueryson(),style:{}},
              ]
            },
            data:[{type:'Input',label:'',field:'keywords',icon:'align-left',style:{width:'260px'},placeholder:'类别名称/代码'}]
          },
          // 表单配置绑定值
          formdatason:{
            cate_id:[],
            keywords:'',
            DateRange:[]
          },
          tablecfgson: {
              headerOptions:[
                  { title: 'ID', field: 'id', width:'70px'},
                  { title: '类别名称', field: 'title'},
                  { title: '类别代码', field: 'code',width:'200px'},
                  { title: '所属大类', field: 'parent_name',width:'200px'},
                  { title: '状态', field: 'status',width:'80px',fieldType:'status',showText:[{id:1,label:"正常",color:'#1890ff'},{id:0,label:"禁用",color:'#f00'}]},
                  { title: '排序(升序)', field: 'sort',width:'150px'},
                  { title: '备注', field: 'remarks',width:'200px'},
              ],
              loading:false,
              algin:'center',
              operateLabel:'操作管理',
              operateWidth:'75px',
              rowSelection:null, // 复选框
              operateOptions: []
          },
          tabledatason:[],
          pagesson:{
            pageSize:10,
            currentPage:1,
            total:1
          },
          //=====================弹出框======================
          mydialogcfgson:{
            visible:false,
            title:'标题',
            width:500
          },
          // 弹出框表单配置要显示哪些字段
          dialogformcfgson:{
            basecfg:{
              formlayout:'horizontal',
              labelcol:{ span: 6},
              wrappercol:{ span:16  },
              formbtn:[
                  {key:'query',label:'保存',type:'primary', icon: 'check',ghost:true,handle:()=>this.dialogSubmitson(),style:{'margin-left':'113px'}},
                  {key:'add',label:'关闭',type:'danger', icon: 'close',ghost:true,handle:()=>this.dialogCloseson(),style:{'margin-left':'60px'}},
              ]
            },
            data:[
              {type:'Select',label:'所属大类',field:'parent_id',icon:'read',style:{},placeholder:'所属大类',options:[]},
              {type:'Input',label:'类别代码',field:'code',icon:'apartment',itemstyle:{},style:{},placeholder:''},
              {type:'Input',label:'类别名称',field:'title',icon:'apartment',itemstyle:{},style:{},placeholder:''},
              {type:'Input',label:'排序',field:'sort',icon:'apartment',itemstyle:{},style:{},placeholder:''},
              {type:'Switch',label:'当前状态',field:'status',icon:'control',itemstyle:{},style:{},placeholder:'',options:[{id:1,label:'启用'},{id:0,label:'禁用'}]},
              {type:'Textarea',label:'备注说明',field:'remarks',icon:'align-left',itemstyle:{},style:{},placeholder:''},
            ]
          },
          // 表单配置绑定值
          dialogformdatason:{
            id:0,
            parent_id:'',
            title:'',
            code:'',
            sort:0,
            status:true,
            remarks:'',
          },

        };
      },
      components:{
        mydialog,uiform,uitable
      },
      methods:{
        changeTab(key) {
          console.log(key);
        },
        onPageChange(e){
          this.pages.currentPage = e;
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
                    goodsCategoryDelete({id:row.id}).then(res=>{
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
                this.mydialogcfg.title = '编辑类别';
                this.mydialogcfg.visible = true;
                this.dialogformdata = JSON.parse(JSON.stringify(row))
                break;
          }
        },

        dialogAdd(){
          this.mydialogcfg.title = '新增类别';
          this.dialogformdata={
            id:0,
            type:'',
            title:'',
            code:'',
            sort:0,
            status:true,
            remarks:'',
          }
          this.mydialogcfg.visible = true;
        },
        dialogClose(){
          this.mydialogcfg.visible = false;
        },
        dialogSubmit(){
          goodsCategoryHandle(this.dialogformdata).then(res=>{
            const {data} = res;
            if(data.code == 200){
              this.mydialogcfg.visible = false;
              this.initCateList();
              this.loadData();
              this.$message.success(res.data.msg);
            }else{
              this.$message.error(res.data.msg);
            }
          }).catch(err=>{
            console.log("新增或更新类别出错：",err);
          })
        },
        formQuery(){
          this.loadData();
        },
        edit(row){
          this.mydialogcfg.title = "修改类别"
          this.dialogformdata = JSON.parse(JSON.stringify(row))
          this.mydialogcfg.visible = true
        },
        del(id){
          let that = this;
          this.$confirm({
            title: '温馨提示',
            content: '您确定要删除吗',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              goodsCategoryDelete({id}).then(res=>{
                const {data} = res;
                if(data.code == 200){
                  that.initCateList();
                  that.loadData();
                  that.$message.success(res.data.msg);
                }else{
                  that.$message.error(res.data.msg);
                }
              }).catch(err=>{
                console.log("删除类别出错：",err);
              })

            },
            onCancel() {
              console.log('Cancel');
            },
          });
        },
        loadData(){
          this.tablecfg.loading = true;
          let form = this.formdata;
          const {pageSize,currentPage} =this.pages
          form.pageSize = pageSize;
          form.currentPage = currentPage;
          goodsCategoryList(form).then(res=>{
            const {data} = res;
            this.tabledata = data.data;
            this.pages.total = data.total;
            this.tablecfg.loading = false;
          }).catch(err=>{
            console.log("加载类别列表出错：",err);
          })
        },
        initCateList(){
          callGoodsCategoryList({}).then(res=>{
             this.init.cateList = res.data.data;
             this.dialogformcfgson.data[0].options = res.data.data
          }).catch(err=>{
            console.log("初始化类别数据出错:",err)
          })
        },

        //=================================================================================
        onPageChangeson(e){
          this.pagesson.currentPage = e;
          this.loadDatason()
        },
        handleUiTableBtnson(methods,row){
          let that = this;
          switch (methods){
            case 'deletesonhandle':
                this.$confirm({
                  title: '温馨提示',
                  content: '您确定要删除吗',
                  okText: '确认',
                  okType: 'danger',
                  cancelText: '取消',
                  onOk() {
                    goodsCategorySonDelete({id:row.id}).then(res=>{
                      const {data} = res;
                      if(data.code == 200){
                        that.loadDatason();
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
            case 'editsonhandle':
                this.mydialogcfgson.title = '编辑小类别';
                this.mydialogcfgson.visible = true;
                this.dialogformdatason = JSON.parse(JSON.stringify(row))
                break;
          }
        },

        dialogAddson(){
          this.mydialogcfgson.title = '新增小类别';
          this.dialogformdatason={
            id:0,
            parent_id:'',
            title:'',
            code:'',
            sort:0,
            status:true,
            remarks:'',
          }
          this.mydialogcfgson.visible = true;
        },
        dialogCloseson(){
          this.mydialogcfgson.visible = false;
        },
        dialogSubmitson(){
          goodsCategorySonHandle(this.dialogformdatason).then(res=>{
            const {data} = res;
            if(data.code == 200){
              this.mydialogcfgson.visible = false;
              this.loadDatason();
              this.$message.success(res.data.msg);
            }else{
              this.$message.error(res.data.msg);
            }
          }).catch(err=>{
            console.log("新增或更新小类别出错：",err);
          })
        },
        formQueryson(){
          this.loadDatason();
        },

        loadDatason(){
          let form = this.formdata;
          const {pageSize,currentPage} =this.pages
          form.pageSize = pageSize;
          form.currentPage = currentPage;
          this.tablecfgson.loading = true;
          goodsCategorySonList(form).then(res=>{
            const {data} = res;
            this.tabledatason = data.data;
            this.pagesson.total = data.total;
            this.tablecfgson.loading = false;
          }).catch(err=>{
            console.log("加载小类别列表出错：",err);
            this.tablecfgson.loading = false;
          })
        },
      },
      mounted(){
        this.dialogformcfg.data[0].options = [{id:1,label:'一般固废'},{id:2,label:'危险废物'}];

        let auth = this.yxCheckPermission("ADD_GOODS_CATE");
        if(auth){
          this.formcfg.basecfg.formbtn.push({key:'add',label:'新增大类',type:'danger', icon: 'plus',ghost:true,handle:()=>this.dialogAdd(),style:{'margin-left':'15px'}},);
          this.formcfgson.basecfg.formbtn.push({key:'add',label:'新增小类',type:'danger', icon: 'plus',ghost:true,handle:()=>this.dialogAddson(),style:{'margin-left':'15px'}},);
        }
        auth = this.yxCheckPermission("EDIT_GOODS_CATE");
        if(auth){
          this.tablecfg.operateOptions.push({ title: '修改', type: 'primary', icon: 'edit', methods: 'edithandle' });
          this.tablecfgson.operateOptions.push({ title: '修改', type: 'primary', icon: 'edit', methods: 'editsonhandle' });
        }
        auth = this.yxCheckPermission("DELETE_GOODS_CATE");
        if(auth){
          this.tablecfg.operateOptions.push({ title: '删除', type: 'danger', icon: 'delete', methods: 'deletehandle' });
          this.tablecfgson.operateOptions.push({ title: '删除', type: 'danger', icon: 'delete', methods: 'deletesonhandle' });
        }
        this.initCateList();
        this.loadData();
        this.loadDatason()

      }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
