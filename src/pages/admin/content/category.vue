<template>
  <div>
    <mydialog :configs="mydialogcfg" @dialogSubmit="dialogSubmit">
      <uiform :formdata="dialogformdata" :formcfg="dialogformcfg"></uiform>
    </mydialog>
    <uiform :formdata="formdata" :formcfg="formcfg"></uiform><br/>
    <a-table v-if="tabledata.length > 0" :columns="tablecfg" :data-source="tabledata" :row-selection="rowSelection" :pagination="false" :indentSize="30" size="middle"
                :rowKey='record=>record.id' treeDefaultExpandAll>
      <template slot="status" slot-scope="text, record, index">
        <a-tag :color="record.status==1?'blue':'red'">{{record.status==1?'正常':'禁用'}}</a-tag>
      </template>
      <template slot="thumb" slot-scope="text, record, index">
        <template v-if="record.thumb != '' " >
          <img :src="record.thumb" style="width: 40px; height: 40px;">
        </template>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <a-tooltip v-check="'EDIT_CATE'" placement="top" title="编辑">
          <a-button ghost size="small" @click="() => edit(record)" type="primary" shape="circle" icon="form"/>
          </a-tooltip>
          <a-tooltip v-check="'DELETE_CATE'" placement="top" title="删除">
          <a-button ghost size="small" @click="() => del(record.id)" type="danger" shape="circle" icon="delete"/>
          </a-tooltip>
        </div>
      </template>
    </a-table>

  </div>
</template>
<script>
  import {categoryList,categoryHandle,categoryDelete,callCategoryList,uploadSingleImg} from "@/utils/http/index.js"
  import mydialog from "@/components/basic/uidialog.vue"
  import uiform from "@/components/basic/uiform.vue"
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  export default {
      name:'category',
      data() {
        return {
          rowSelection,
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
          tablecfg:[
            {
              title: '分类名称',
              dataIndex: 'cate_name',
              key: 'cate_name',
            },
            {
              title: '缩略图',
              dataIndex: 'thumb',
              key: 'thumb',
              width: '130px',
              scopedSlots: { customRender: 'thumb' }
            },
            {
              title: '状态',
              dataIndex: 'status',
              key: 'status',
              width: '100px',
              scopedSlots: { customRender: 'status' }
            },
            {
              title: '备注',
              dataIndex: 'remarks',
              key: 'remarks',
              width: '20%',
            },
            {
              title: '操作',
              dataIndex: 'operation',
              width: '80px',
              key: 'operation',
              scopedSlots: { customRender: 'operation' }
            },
          ],
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
              {type:'TreeSelect',label:'上级分类',field:'parent_id',icon:'control',itemstyle:{},style:{},placeholder:'',options:[]},
              {type:'Input',label:'分类名称',field:'cate_name',icon:'apartment',itemstyle:{},style:{},placeholder:''},
              {type:'Switch',label:'当前状态',field:'status',icon:'control',itemstyle:{},style:{},placeholder:'',options:[{id:1,label:'启用'},{id:0,label:'禁用'}]},
              {type:'Upload',label:'缩略图',field:'thumb',icon:'align-left',itemstyle:{},style:{'width':'186px','height':'186px','border-radius':'3px'},placeholder:'',handle:(val)=>this.getThumbImg(val)},
              {type:'Textarea',label:'备注说明',field:'remarks',icon:'align-left',itemstyle:{},style:{},placeholder:''},
            ]
          },
          // 表单配置绑定值
          dialogformdata:{
            id:0,
            parent_id:0,
            cate_name:'',
            status:true,
            remarks:'',
            thumb:''
          },
          init:{
            cateList:[]
          }

        };
      },
      components:{
        mydialog,uiform
      },
      methods:{
        getThumbImg(obj){
           let fd = new FormData();
           fd.append('file',obj.file);//传文件
           uploadSingleImg(fd)
           .then(res=>{
             this.dialogformdata.thumb = res.data.url
           })
        },
        dialogAdd(){
          this.mydialogcfg.title = '新增分类';
          this.dialogformdata={
            id:0,
            parent_id:0,
            cate_name:'',
            status:true,
            remarks:'',
            thumb:''
          }
          this.mydialogcfg.visible = true;
        },
        dialogClose(){
          this.mydialogcfg.visible = false;
        },
        dialogSubmit(){
          categoryHandle(this.dialogformdata).then(res=>{
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
            console.log("新增或更新分类出错：",err);
          })
        },
        formQuery(){
          this.loadData();
        },
        edit(row){
          this.mydialogcfg.title = "修改分类"
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
              categoryDelete({id}).then(res=>{
                const {data} = res;
                if(data.code == 200){
                  that.initCateList();
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
        },
        loadData(){
          const { keywords} = this.formdata;
          categoryList({keywords}).then(res=>{
             this.tabledata = res.data.data;
          }).catch(err=>{
            console.log("加载分类数据出错:",err)
          })
        },
        initCateList(){
          callCategoryList({has_root:1}).then(res=>{
             this.init.cateList = res.data.data;
             this.dialogformcfg.data[0].options = res.data.data
          }).catch(err=>{
            console.log("初始化分类数据出错:",err)
          })
        }
      },
      mounted(){
        let auth = this.yxCheckPermission("ADD_CATE");
        if(auth){
          this.formcfg.basecfg.formbtn.push({key:'add',label:'新增',type:'danger', icon: 'plus',ghost:true,handle:()=>this.dialogAdd(),style:{'margin-left':'15px'}},);
        }
        this.initCateList();
        this.loadData();

      }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
