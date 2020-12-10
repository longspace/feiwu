<template>
  <div>
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
  import {ordersList,ordersDelete,callCategoryList} from "@/utils/http/index.js"
  export default {
      name:'ordersList',
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
              {type:'Select',field:'current_state',icon:'read',style:{width:'110px'},placeholder:'订单状态',options:[{id:0,label:"待发货",color:'#999'},{id:1,label:"待收货",color:'rgb(230, 162, 60)'},{id:2,label:"已收货",color:'#1bbc9b'},{id:3,label:"已处理",color:'#f00'}]},
              {type:'Input',label:'',field:'keywords',icon:'align-left',style:{width:'260px'},placeholder:'订单号'},
              {type:'DateRange',label:'',field:'date_range',icon:'smile',style:{width:'230px'},placeholder:['订单开始时间','订单结束时间']},
            ]
          },
          // 表单配置绑定值
          formdata:{
            verify:undefined,
            current_state:undefined,
            keywords:'',
            date_range:[]
          },
          tablecfg: {
              headerOptions:[
                  { title: '订单号', field: 'order_id', width:'90px'},
                  { title: '商品名称', field: 'title',width:'120px'},
                  { title: '每吨价格', field: 'expect_price',width:'120px'},
                  { title: '重量(吨)', field: 'handle_weight',width:'80px'},
                  { title: '审核状态', field: 'verify',width:'80px',fieldType:'status',showText:[{id:1,label:"已审核",color:'#1890ff'},{id:0,label:"未审核",color:'#f00'}]},
                  { title: '订单状态', field: 'current_state',width:'80px',fieldType:'status',showText:[{id:0,label:"待发货",color:'#999'},{id:1,label:"待收货",color:'rgb(230, 162, 60)'},{id:2,label:"已收货",color:'#1bbc9b'},{id:3,label:"已处理",color:'#f00'}]},
                  // { title: '处废单位', field: 'handle_company_name',width:'120px'},
                  { title: '创建时间', field: 'create_at',width:'105px' },
              ],
              algin:'center',
              loading:false,
              rowSelection:false, // 复选框
              operateLabel:'操作管理',
              operateWidth:'75px',
              operateOptions: [{ title: '修改', type: 'primary', icon: 'edit', methods: 'edithandle' },{ title: '删除', type: 'danger', icon: 'delete', methods: 'deletehandle' }]
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
                  content: '您确定要删除此订单吗',
                  okText: '确认',
                  okType: 'danger',
                  cancelText: '取消',
                  onOk() {
                    ordersDelete({id:row.id}).then(res=>{
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
                if(row.current_state != 0){
                  this.$message.error("此订单已发货，不可修改");
                }
                break;
          }

        },
        onTableSelectChange(obj){
          console.log("onTableSelectChange",obj)
        },
        loadData(){
          this.tablecfg.loading = true;
          let form = JSON.parse(JSON.stringify(this.formdata));
          if(form.current_state == undefined){
            form.current_state = "";
          }
          if(form.verify == undefined){
            form.verify = "";
          }
          const {pageSize,currentPage} =this.pages
          form.pageSize = pageSize;
          form.currentPage = currentPage;
          ordersList(form).then(res=>{
            const {data} = res;
            this.tabledata = data.data;
            this.pages.total = data.total;
            this.tablecfg.loading = false;
          }).catch(err=>{
            console.log("加载订单列表出错：",err);
            this.tablecfg.loading = false;
          })
        },
        onPageChange(e){
          this.pages.currentPage = e;
          this.loadData()
        }
      },
      mounted(){
        this.loadData()
      }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
