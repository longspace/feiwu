<template>
  <div>
    <mydialog :configs="mydialogcfg" @dialogSubmit="dialogSubmit">

      <a-form class="company_form"  :form="dialogformdata" layout="inline">
        <a-form-item label="用户账号">
          <a-input allowClear
           v-model="dialogformdata.account">
            <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="用户密码">
          <a-input allowClear
           v-model="dialogformdata.passwd">
            <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="企业名称">
          <a-input allowClear
           v-model="dialogformdata.company_name">
            <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="经营范围">
          <a-tree-select :options="init.provinceCity" placeholder="可搜索" v-model="dialogformdata.province_city_id" @change="handleProvinceChange" :showSearch="true"/>
        </a-form-item>
        <div style="padding: 10px 0;">
          <a-form-item label="营业执照">
            <a-upload name="file" list-type="picture-card" class="avatar-uploader"
              :show-upload-list="false" :customRequest="handleUploadBusinessPhoto">
              <img v-if="dialogformdata.business_photo" style="width: 98px; height: 98px;" :src="dialogformdata.business_photo" alt="avatar" />
              <div v-else>
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  选择图片
                </div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item label="经营许可证">
            <a-upload name="file" list-type="picture-card" class="avatar-uploader"
              :show-upload-list="false" :customRequest="handleUploadLicensePhoto">
              <img v-if="dialogformdata.business_license_photo" style="width: 98px; height: 98px;" :src="dialogformdata.business_license_photo" alt="avatar" />
              <div v-else>
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  选择图片
                </div>
              </div>
            </a-upload>
          </a-form-item>
        </div>

        <a-form-item label="许可证到期">
          <a-date-picker allowClear v-model="dialogformdata.business_license_expire" placeholder="到期时间" style="width: 230px;" />
        </a-form-item>
        <a-form-item label="年产量">
          <a-input allowClear
           v-model="dialogformdata.year_product_weight">
            <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="联系人">
          <a-input allowClear
           v-model="dialogformdata.contacter">
            <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="联系电话">
          <a-input allowClear
           v-model="dialogformdata.tel">
            <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="省份城市">
          <a-cascader :options="init.area" placeholder="可搜索" v-model="dialogformdata.province_city_id" @change="handleProvinceChange" :showSearch="true"/>
        </a-form-item>
        <a-form-item label="详细地址">
          <a-input allowClear
           v-model="dialogformdata.address">
            <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="是否VIP">
          <a-switch v-model="dialogformdata.vip" @change="onSwitchVipChange" />
        </a-form-item>
        <a-form-item label="是否启用">
          <a-switch v-model="dialogformdata.status" @change="onSwitchStatusChange" />
        </a-form-item>
        <div style="padding:25px 200px 6px 200px;">
          <a-button type="primary" icon="check" ghost @click="dialogSubmit" style="margin-right: 130px;"> 保存 </a-button>
          <a-button type="danger" icon="close" ghost @click="dialogClose"> 关闭 </a-button>
        </div>
      </a-form>

    </mydialog>

<!-- :customRequest="handleExcelChange" -->
    <mydialog :configs="uploaddialogcfg">
      <div style="height: 170px;">
        <a-upload-dragger
          name="file"
          action=""
          @change="handleExcelChange"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="cloud-upload" />
          </p>
          <p class="ant-upload-text">
            点击或拖拽文件到此处上传
          </p>
        </a-upload-dragger>
      </div>
      <div style="padding:50px 0 6px 0; text-align: right;">
        <a href="/static/template/产废企业导入模板.xls" style="float: left;">点此下载导入模板</a>
        <a-button type="primary" icon="file-excel" @click="uploaddialogSubmit"> 立即导入 </a-button>
      </div>
    </mydialog>
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
  import {companyList,companyHandle,companyDelete,uploadSingleImg,callCategoryList,verifyCompanyInfo,callArea,callGoodsCategoryParentAndSonList} from "@/utils/http/index.js"
  export default {
      name:'companyList',
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
              {type:'Input',label:'',field:'keywords',icon:'align-left',style:{width:'260px'},placeholder:'企业名称、联系人、电话'}
            ]
          },
          // 表单配置绑定值
          formdata:{
            type:1,
            keywords:'',
            date_range:[]
          },
          tablecfg: {
              headerOptions:[
                  { title: 'ID', field: 'id', width:'45px'},
                  { title: '企业名称', field: 'company_name',width:'120px'},
                  { title: '营业执照', field: 'business_photo',width:'100px',fieldType:'image'},
                  { title: '经营许可证', field: 'business_license_photo',width:'100px',fieldType:'image'},
                  { title: '许可证到期', field: 'business_license_expire',width:'80px'},
                  { title: '危废业务代码', field: 'business_code',width:'150px'},
                  { title: '联系人', field: 'contacter',width:'80px'},
                  { title: '联系电话', field: 'tel',width:'80px'},
                  { title: '年产量(吨)', field: 'year_product_weight',width:'90px'},
                  { title: '审核状态', field: 'verify',width:'80px',fieldType:'status',showText:[{id:1,label:"已审核",color:'#1890ff'},{id:0,label:"未审核",color:'#f00'}]},
                  { title: '是否VIP', field: 'vip',width:'80px',fieldType:'status',showText:[{id:1,label:"VIP",color:'#e6a23c'},{id:0,label:"否",color:'#999'}]},
                  { title: '创建时间', field: 'create_at',width:'105px' },
              ],
              algin:'center',
              loading:false,
              operateLabel:'操作管理',
              operateWidth:'75px',
              rowSelection:true, // 复选框
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
            width:750
          },
          // 表单配置绑定值
          dialogformdata:{
            id:0,
            type:1,
            account:'',
            passwd:'',
            company_name:'',
            business_photo:'',
            business_license_photo:'',
            business_license_expire:'',
            business_code:[],
            contacter:'',
            tel:'',
            year_product_weight:'',
            province_city_id:[],
            address:'',
            status:true,
            vip:false,
          },

          uploaddialogcfg:{
            visible:false,
            title:'标题',
            width:550
          },

          init:{
            area:[]
          }
        };
      },
      components:{
        mydialog,uiform,uitable
      },
      methods:{
        dialogAdd(){
          this.mydialogcfg.visible = true;
          this.mydialogcfg.title = '新增企业账号';
          this.dialogformdata = {
            id:0,
            type:1,
            account:'',
            passwd:'',
            company_name:'',
            business_photo:'',
            business_license_photo:'',
            business_license_expire:'',
            business_code:[],
            contacter:'',
            tel:'',
            year_product_weight:'',
            province_city_id:[],
            address:'',
            status:true,
            vip:false,
          }
        },
        dialogClose(){
          this.mydialogcfg.visible = false;
        },
        dialogSubmit(){
          let form = this.dialogformdata;
          if(form.account == "" || form.company_name == ""){
            this.$message.error("用户账号、企业名称为必填!");
            return false;
          }
          companyHandle(this.dialogformdata).then(res=>{
            const {data} = res;
            if(data.code == 200){
              this.mydialogcfg.visible = false;
              this.loadData();
              this.$message.success(res.data.msg);
            }else{
              this.$message.error(res.data.msg);
            }
          }).catch(err=>{
            console.log("新增或更新用户出错：",err);
          })
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
                this.$confirm({
                  title: '温馨提示',
                  content: '您确定要删除吗',
                  okText: '确认',
                  okType: 'danger',
                  cancelText: '取消',
                  onOk() {
                    articleDelete({id:row.id}).then(res=>{
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
            case 'verifyhandle':
                if(row.verify == 1){
                  this.$message.warning('此企业已经审核过了！');
                  return false;
                }
                this.$confirm({
                  title: '温馨提示',
                  content: '确定审核通过此企业资料吗',
                  okText: '确认',
                  cancelText: '取消',
                  onOk() {
                    verifyCompanyInfo({id:row.id}).then(res=>{
                      const {data} = res;
                      if(data.code == 200){
                        that.loadData();
                        that.$message.success(res.data.msg);
                      }else{
                        that.$message.error(res.data.msg);
                      }
                    }).catch(err=>{
                      console.log("审核出错：",err);
                    })
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
                break;
            case 'edithandle':
                this.mydialogcfg.title = '编辑资料';
                let rowdata = JSON.parse(JSON.stringify(row));
                rowdata.status = rowdata.status == 1?true:false;
                rowdata.vip = rowdata.vip == 1?true:false;
                this.dialogformdata = rowdata
                this.mydialogcfg.visible = true;
                break;
          }

        },
        onTableSelectChange(obj){
          console.log("onTableSelectChange",obj)
        },
        loadData(){
          this.tablecfg.loading = true;
          let form = this.formdata;
          const {pageSize,currentPage} =this.pages
          form.pageSize = pageSize;
          form.currentPage = currentPage;
          companyList(form).then(res=>{
            const {data} = res;
            this.tabledata = data.data;
            this.pages.total = data.total;
            this.tablecfg.loading = false;
          }).catch(err=>{
            console.log("加载企业列表出错：",err);
            this.tablecfg.loading = false;
          })
        },
        onPageChange(e){
          this.pages.currentPage = e;
          this.loadData()
        },
        showImportCsv(){
          console.log("showImportCsv")
          this.uploaddialogcfg.title = "导入Excel文件";
          this.uploaddialogcfg.visible = true;
        },
        handleProvinceChange(obj){
          console.log("handleProvinceChange",obj)
        },
        handleUploadBusinessPhoto(obj){
          console.log("handleUploadBusinessPhoto",obj)
          let fd = new FormData();
          fd.append('file',obj.file);//传文件
          uploadSingleImg(fd)
          .then(res=>{
            this.dialogformdata.business_photo = res.data.url
          })
        },
        handleUploadLicensePhoto(obj){
          console.log("handleUploadLicensePhoto",obj)
          let fd = new FormData();
          fd.append('file',obj.file);//传文件
          uploadSingleImg(fd)
          .then(res=>{
            this.dialogformdata.business_license_photo = res.data.url
          })
        },
        onSwitchStatusChange(val) {
          console.log(val)
        },
        onSwitchVipChange(val) {
          console.log(val)
        },
        handleExcelChange(obj){
          const status = obj.file.status;
                if (status !== 'uploading') {
                  console.log(obj.file, obj.fileList);
                }
                if (status === 'done') {
                  this.$message.success(`${obj.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                  this.$message.error(`${obj.file.name} file upload failed.`);
                }



          // console.log("handleExcelChange",obj)
          // let fd = new FormData();
          // fd.append('file',obj.file);//传文件
          // uploadSingleImg(fd)
          // .then(res=>{
          //   console.log(obj,"handleExcelChange:res:",res)
          // })
        },
        uploaddialogSubmit(){

        },
        initArea(){
          callArea({}).then(res=>{
            console.log("area",res)
            this.init.area = res.data.data
          }).catch(err=>{
            console.log("加载省市出错:",err)
          })
        },
        initCateList(){
          callGoodsCategoryParentAndSonList({}).then(res=>{
            this.init.cateList = res.data.data;
            this.formcfg.data[0].options = res.data.data
          }).catch(err=>{
            console.log("初始化分类数据出错:",err)
          })
        },


      },
      mounted(){
        this.initArea();
        this.initCateList();
        let auth = this.yxCheckPermission("ADD_COMPANY_PRODUCT");
        if(auth){
          this.formcfg.basecfg.formbtn.push({key:'add',label:'新增',type:'', icon: 'plus',ghost:true,handle:()=>this.dialogAdd(),style:{'margin-left':'15px','border-color':'#e6a23c','color':'#e6a23c'}});
        }
        auth = this.yxCheckPermission("IMPORT_COMPANY_PRODUCT");
        if(auth){
          this.formcfg.basecfg.formbtn.push({key:'showImportCsv',label:'从Excel导入',type:'', icon: 'file-excel',ghost:true,handle:()=>this.showImportCsv(),style:{'margin-left':'15px','border-color':'#909399','color':'#909399'}});
        }
        auth = this.yxCheckPermission("VERIFY_COMPANY_PRODUCT");
        if(auth){
          this.tablecfg.operateOptions.push({ title: '审核通过', icon: 'audit', methods: 'verifyhandle',style:{"color":"#00965e","border":"#00965e solid 1px" }});
        }
        auth = this.yxCheckPermission("EDIT_COMPANY_PRODUCT");
        if(auth){
          this.tablecfg.operateOptions.push({ title: '修改', type: 'primary', icon: 'edit', methods: 'edithandle' });
        }
        auth = this.yxCheckPermission("DELETE_COMPANY_PRODUCT");
        if(auth){
          this.tablecfg.operateOptions.push({ title: '删除', type: 'danger', icon: 'delete', methods: 'deletehandle' });
        }
        this.loadData()
      }
  };
</script>
<style lang="scss">
.company_form .ant-form-item-label{ width: 90px;}
.company_form .ant-form-item{ width: 330px;}
.company_form .ant-form-item-control-wrapper{ width: 230px;}
</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
