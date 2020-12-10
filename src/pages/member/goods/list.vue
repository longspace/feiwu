<template>
  <div>
    <uiform :formdata="formdata" :formcfg="formcfg"></uiform><br/>
    <uitable :datasource="tabledata" :tablecfg="tablecfg" @handleUiTableBtn="handleUiTableBtn" @onSelectChange="onTableSelectChange"></uitable>
    <div class="pages">
      <a-pagination v-model="pages.currentPage" :pageSize="pages.pageSize" :total="pages.total" @change="onPageChange" />
    </div>

    <uidrawer :drawer="drawer" @closeDrawer="closeDrawer">
      <template v-if="drawer.data">
        <div class="followinfo">
            <div><span>企业名称</span>{{drawer.data.company_name}}</div>
            <div><span>公司地址</span>{{drawer.data.address}}</div>
            <div><span>年产量(吨)</span>{{drawer.data.year_product_weight}}</div>
            <div><span>联系人</span>{{drawer.data.contacter}}</div>
            <div><span>联系电话</span>{{drawer.data.tel}}</div>
          </div>

          <div class="drawerbox" style="margin-top: 15px;">
            <div class="innerbox drawerboxright">
              <a-tabs default-active-key="1" @change="tabCallback" icon>
                <a-tab-pane key="1" tab="商品详情">
                  <ul class="inline_item">
                    <li><span>商品名称 :</span>{{drawer.data.title}}</li>
                    <li><span>发布时间 :</span>{{drawer.data.create_at}}</li>

                    <li><span>审核状态 :</span>
                      <template v-if="drawer.data.verify== 1 "><span style="color: #999;">已审核</span></template>
                      <template v-else><span style="color: #f00;">未审核</span></template>
                    </li>
                    <li><span>是否上架 :</span>
                      <template v-if="drawer.data.is_sale==1"><span style="color:#999; ">已上架</span></template>
                      <template v-else><span style="color: #f00;">未上架</span></template>
                    </li>
                    <li><span>危废类别 :</span>---</li>
                    <li><span>预期价格 :</span>{{drawer.data.expect_price}} 元/吨</li>
                    <li><span>包装形式 :</span>{{drawer.data.package_style_name}}</li>
                    <li><span>主要成分 :</span>{{drawer.data.main_parts}}</li>
                    <li><span>危废特性 :</span>{{drawer.data.features_name}}</li>
                    <li><span>重量(吨) :</span>{{drawer.data.weight}}</li>
                  </ul>
                  <div class="followinfo">
                    <div><span>检测报告 :</span></div>
                    <div class="special_img">
                        <i class="photos">
                        <li><img :src="drawer.data.check_report" class="" /></li>
                        </i>
                    </div>
                    <div><span>危废照片</span></div>
                    <div class="special_img">
                        <i class="photos">
                        <li v-for="item in drawer.data.photos"><img :src="item" class="" /></li>
                        </i>
                    </div>
                  </div>
                </a-tab-pane>
                <a-tab-pane key="2" tab="操作记录" force-render>
                  <a-steps size="small" direction="vertical">
                    <a-step  status="finish">
                      <a-icon slot="icon" type="link" style="font-size: 16px; " />
                      <template slot="description">
                        <div class="steptitlebox">
                         <div class="steptitle" style="font-size: 14px;">审核通过</div>
                         <div class="steptime">11-04 17:28</div>
                         <div style="clear: both;"></div>
                        </div>
                        <div class="edituser">操作人 唐帅 </div>
                        </template>
                    </a-step>
                    <a-step  status="finish">
                      <a-icon slot="icon" type="link" style="font-size: 16px;" />
                      <template slot="description">
                        <div class="steptitlebox">
                         <div class="steptitle" style="font-size: 14px;">上架商品</div>
                         <div class="steptime">11-04 17:28</div>
                         <div style="clear: both;"></div>
                        </div>
                        <div class="edituser">操作人 唐帅 </div>
                        </template>
                    </a-step>
                    <a-step  status="finish">
                      <a-icon slot="icon" type="link" style="font-size: 16px;" />
                      <template slot="description">
                        <div class="steptitlebox">
                         <div class="steptitle" style="font-size: 14px;">下架商品</div>
                         <div class="steptime">11-04 17:28</div>
                         <div style="clear: both;"></div>
                        </div>
                        <div class="edituser">操作人 唐帅 </div>
                        </template>
                    </a-step>
                    </a-steps>
                </a-tab-pane>
              </a-tabs>
            </div>
          </div>

      </template>
    </uidrawer>
  </div>
</template>
<script>
  import mydialog from "@/components/basic/uidialog.vue"
  import uiform from "@/components/basic/uiform.vue"
  import uitable from "@/components/basic/uitable.vue"
  import uidrawer from "@/components/basic/uidrawer.vue"
  import {goodsList,goodsDelete,callCategoryList,callhandleCompanys,goodsSaleHandle} from "@/utils/http/index.js"
  export default {
      name:'goodslist',
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
              {type:'Select',field:'is_sale',icon:'read',style:{width:'110px'},placeholder:'是否上架',options:[{id:1,label:'已上架'},{id:0,label:'未上架'}]},
              {type:'Select',field:'handled_status',icon:'read',style:{width:'120px'},placeholder:'处置状态',options:[{id:1,label:'已处置完'},{id:0,label:'处置中'}]},
              {type:'Input',label:'',field:'keywords',icon:'align-left',style:{width:'260px'},placeholder:'商品名称'},
              {type:'DateRange',label:'',field:'date_range',icon:'smile',style:{width:'230px'},placeholder:['发布开始时间','发布结束时间']},
            ]
          },
          // 表单配置绑定值
          formdata:{
            verify:undefined,
            is_sale:undefined,
            handled_status:undefined,
            keywords:'',
            date_range:[]
          },
          tablecfg: {
              headerOptions:[
                  { title: 'ID', field: 'id', width:'45px'},
                  { title: '危废类别', field: 'cate_id',width:'120px'},
                  { title: '商品名称', field: 'title',width:'120px'},
                  { title: '检则报告', field: 'check_report',width:'100px',fieldType:'image'},
                  { title: '预期价格', field: 'expect_price',width:'80px'},
                  { title: '物理状态', field: 'physical_name',width:'80px'},
                  { title: '包装形式', field: 'package_style_name',width:'80px'},
                  // { title: '主要成分', field: 'main_parts',width:'80px'},
                  { title: '危废特性', field: 'features_name',width:'120px'},
                  // { title: '年产量(吨)', field: 'year_product_weight',width:'90px'},
                  { title: '重量(吨)', field: 'weight',width:'80px'},
                  { title: '已处理重量(吨)', field: 'handled_weight',width:'110px'},
                  { title: '审核状态', field: 'verify',width:'80px',fieldType:'status',showText:[{id:1,label:"已审核",color:'#1890ff'},{id:0,label:"未审核",color:'#f00'}]},
                  { title: '是否上架', field: 'is_sale',width:'80px',fieldType:'status',showText:[{id:1,label:"已上架",color:'#e6a23c'},{id:0,label:"未上架",color:'#999'}]},
                  { title: '发布时间', field: 'create_at',width:'105px' },
              ],
              algin:'center',
              loading:false,
              operateLabel:'操作管理',
              operateWidth:'75px',
              rowSelection:false, // 复选框
              operateOptions: [
                { title: '详情', type: 'primary', icon: 'exception', methods: 'detailhandle',style:{"color":"#00965e","border":"#00965e solid 1px" } },
                { title: '克隆添加新商品', type: 'primary', icon: 'copy', methods: 'clonehandle',style:{"color":"#FF9900","border":"#FF9900 solid 1px" } },
                { title: '修改', type: 'primary', icon: 'edit', methods: 'edithandle' },
                { title: '删除', type: 'danger', icon: 'delete', methods: 'deletehandle' }]
          },
          tabledata:[],
          pages:{
            pageSize:10,
            currentPage:1,
            total:1
          },
          init:{
            cateList:[],
            handle_company_id:[]
          },
          drawer:{
            cfg:{
              title:'商品详情',
              visible:false,
              closable:true,
              maskClosable:false,
              width:545
            },
            data:[]
          },
        };
      },
      components:{
        mydialog,uiform,uitable,uidrawer
      },
      methods:{
        filteroption(input, option){
          return (
            option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
          );
        },
        formQuery(){
          console.log("this.formdata",this.formdata)
          this.pages.currentPage = 1;
          this.loadData()
        },
        handleUiTableBtn(methods,row){
          let that = this;
          switch (methods){
            case 'deletehandle':
                if(row.is_sale == 0){
                  // this.$error("不可删除已上架商品信息!");
                  this.$info({
                    title: '不可删除已上架商品信息!',
                    content: '',
                  });
                  return false;
                }
                this.$confirm({
                  title: '温馨提示',
                  content: '您确定要删除吗',
                  okText: '确认',
                  okType: 'danger',
                  cancelText: '取消',
                  onOk() {
                    goodsDelete({id:row.id}).then(res=>{
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
                if(row.is_sale == 1){
                  this.$message.error("不可修改已上架商品信息!");
                  return false;
                }
                this.$router.push({
                    path:"goodsform",
                    query:{
                        id:row.id
                    }
                });
                break;
              case 'clonehandle':
                  this.$router.push({
                      path:"goodsform",
                      query:{
                          id:row.id,
                          action:'clone'
                      }
                  });
                  break;
            case 'detailhandle':
                this.drawer.cfg.visible = true;
                this.drawer.data = JSON.parse(JSON.stringify(row))
                console.log(this.drawer.data.length)
                break;
          }

        },

        onTableSelectChange(obj){
          console.log("onTableSelectChange",obj)
        },

        loadData(){
          this.tablecfg.loading = true;
          let form = JSON.parse(JSON.stringify(this.formdata));
          form.verify = form.verify == undefined?'':form.verify
          form.is_sale = form.is_sale == undefined?'':form.is_sale
          form.handled_status = form.handled_status == undefined?'':form.handled_status

          const {pageSize,currentPage} =this.pages
          form.pageSize = pageSize;
          form.currentPage = currentPage;
          goodsList(form).then(res=>{
            const {data} = res;
            this.tabledata = data.data;
            this.pages.total = data.total;
            this.tablecfg.loading = false;
            if(res.data.code != 200){
              this.$message.error(res.data.msg)
              this.$router.push({path:"dashboard"})
            }
          }).catch(err=>{
            console.log("加载商品列表出错：",err);
            this.tablecfg.loading = false;
          })
        },

        onPageChange(e){
          this.pages.currentPage = e;
          this.loadData()
        },

        closeDrawer(obj){
          console.log("closeDrawer",obj)
          this.drawer.cfg.visible = false;
          this.drawer.data = []
        },

        tabCallback(key) {
          console.log(key);
        },

        orderDialogSubmit(){
          if(this.orderdialogformdata.handle_company_id == undefined || this.orderdialogformdata.handle_company_id == ""){
            this.$message.error('请选择处废公司');
            return false;
          }
          if(this.orderdialogformdata.weight == undefined || this.orderdialogformdata.weight == ""){
            this.$message.error('请填写处废重量');
            return false;
          }
          if(this.orderdialogformdata.expect_price == undefined || this.orderdialogformdata.expect_price == ""){
            this.$message.error('请填写价格');
            return false;
          }

        },

      },
      mounted(){
        this.loadData()
      }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">
.basicinfo{ display: flex; align-items: baseline; margin-bottom: 10px;}
.basicinfo div{ margin-right: 30px; font-size: 14px;}
.actionbtns{ display: flex; align-items: center; padding: 12px 0;}
.actionbtns .ant-btn{ margin-right: 10px;}
.followinfo span{width: 115px; display: inline-block; height: 30px; line-height: 30px; color:#333;}
.steptitlebox{ width: 485px; font-size: 14px;}
.steptitle{ float:left; width: 380px; font-size: 14px; color:#000; }
.steptiime{ float:right; width: 90px; font-size: 14px;color:#000;}
.special_img{ width: 100%;}
.photos{ display: flex; flex-wrap: wrap;}
.photos li{width: 115px; margin:0 8px 6px 0;}
.photos li img{ width: 100%; height:90px}

.inline_item{display: flex; flex-wrap: wrap; }
.inline_item li{
  width: 50%;
  span{width: 90px; display: inline-block; height: 30px; line-height: 30px; color:#333;}
}
// .followinfo span{width: 115px; display: inline-block; height: 30px; line-height: 30px; color:#333;}
</style>
