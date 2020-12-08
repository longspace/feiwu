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
  import {searchList} from "@/utils/http/index.js"
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
              {type:'Input',label:'',field:'keywords',icon:'align-left',style:{width:'260px'},placeholder:'搜索词'},
              {type:'DateRange',label:'',field:'date_range',icon:'smile',style:{width:'230px'},placeholder:['搜索开始时间','搜索结束时间']},
            ]
          },
          // 表单配置绑定值
          formdata:{
            keywords:'',
            date_range:[]
          },
          tablecfg: {
              headerOptions:[
                    { title: '搜索词', field: 'keywords'},
                    { title: 'IP', field: 'ip',width:'200px'},
                    { title: '搜索时间', field: 'create_at',width:'230px'},
                ],
              algin:'center',
              loading:false,
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
                // this.$router.push("/admin/content/form")
                // this.$router.push({
                //     path:"/admin/content/form",
                //     query:{
                //         id:row.id
                //     }
                // });
                break;
           }

        },
        onTableSelectChange(obj){
          console.log("onTableSelectChange",obj)
        },
        loadData(){
          this.tablecfg.loading = true;
          let form = JSON.parse(JSON.stringify(this.formdata));
          const {pageSize,currentPage} =this.pages
          form.pageSize = pageSize;
          form.currentPage = currentPage;
          searchList(form).then(res=>{
            const {data} = res;
            this.tabledata = data.data;
            this.pages.total = data.total;
            this.tablecfg.loading = false;
          }).catch(err=>{
            console.log("加载搜索列表出错：",err);
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
