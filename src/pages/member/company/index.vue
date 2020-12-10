<template>
  <div class="profile_form">
    <a-form class="company_form"  :form="formdata" layout="inline"  :label-col="{ span: 6 }" :wrapper-col="{ span: 7 }">
      <a-form-item label="用户账号">
        <a-input allowClear disabled
         v-model="formdata.account">
          <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="企业名称">
        <a-input allowClear
         v-model="formdata.company_name">
          <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="经营范围">
        <a-tree-select :tree-data="init.cateList" placeholder="" v-model="formdata.business_scope_id" @change="handleBusinessScopeChange" :showSearch="true" :filterTreeNode="true" treeDefaultExpandAll treeCheckable allow-clear
  multiple/>
      </a-form-item>
      <a-form-item label="年产量(吨)">
        <a-input allowClear placeholder="单位:吨"
         v-model="formdata.year_product_weight">
          <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <div style="padding: 10px 0;">
        <a-form-item label="营业执照">
          <a-upload name="file" list-type="picture-card" class="avatar-uploader"
            :show-upload-list="false" :customRequest="handleUploadBusinessPhoto">
            <img v-if="formdata.business_photo" style="width: 98px; height: 98px;" :src="formdata.business_photo" alt="avatar" />
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
            <img v-if="formdata.business_license_photo" style="width: 98px; height: 98px;" :src="formdata.business_license_photo" alt="avatar" />
            <div v-else>
              <a-icon type="plus" />
              <div class="ant-upload-text">
                选择图片
              </div>
            </div>
          </a-upload>
        </a-form-item>
      </div>
      <a-form-item label="联系人">
        <a-input allowClear
         v-model="formdata.contacter">
          <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="许可证到期">
        <a-date-picker allowClear v-model="formdata.business_license_expire" placeholder="到期时间" style="width: 230px;" />
      </a-form-item>
      <a-form-item label="省份城市">
        <a-cascader :options="init.area" placeholder="可搜索" v-model="formdata.province_city_id" @change="handleProvinceChange" :showSearch="true"/>
      </a-form-item>
      <a-form-item label="详细地址">
        <a-input allowClear
         v-model="formdata.address">
          <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <div style="padding:25px 200px 6px 90px;">
        <a-button type="primary" icon="check" ghost @click="submit"> 保存 </a-button>
      </div>
    </a-form>
  </div>
</template>
<script>
   import {profile,handleProfile,uploadSingleImg,callCategoryList,callArea,callGoodsCategoryParentAndSonList} from "@/utils/http/index"
export default {
  data() {
    return {
      formdata:{
        id:0,
        type:2,
        account:'',
        company_name:'',
        business_scope_id:[],
        business_photo:'',
        business_license_photo:'',
        business_license_expire:'',
        business_code:[],
        contacter:'',
        tel:'',
        year_product_weight:'',
        province_city_id:[],
        address:'',
      },
      init:{
        area:[],
        cateList:[],
      }
    };
  },
  methods:{
    handleProvinceChange(obj){
      console.log("handleProvinceChange",obj)
    },
    handleUploadBusinessPhoto(obj){
      console.log("handleUploadBusinessPhoto",obj)
      let fd = new FormData();
      fd.append('file',obj.file);//传文件
      uploadSingleImg(fd)
      .then(res=>{
        this.formdata.business_photo = res.data.url
      })
    },
    handleUploadLicensePhoto(obj){
      console.log("handleUploadLicensePhoto",obj)
      let fd = new FormData();
      fd.append('file',obj.file);//传文件
      uploadSingleImg(fd)
      .then(res=>{
        this.formdata.business_license_photo = res.data.url
      })
    },
    onSwitchStatusChange(val) {
      console.log(val)
    },
    onSwitchVipChange(val) {
      console.log(val)
    },
    handleBusinessScopeChange(obj){
      console.log("handleBusinessScopeChange",obj)
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
        console.log("this.init.cateList",this.init.cateList)
      }).catch(err=>{
        console.log("初始化分类数据出错:",err)
      })
    },

    submit(){
      let form = this.formdata
      handleProfile(form)
      .then(resp=>{
          if(resp.data.code == 200){
            this.$message.success("资料更新成功！");
          }else{
            this.$message.error(resp.data.msg);
          }
      })
      .catch(err=>{
          console.log("error:",err)
      });
    },
    getProfile(){
      profile({})
      .then(resp=>{
        // business_scope_id:[],
        // business_license_photo:'',
        // business_code:[],
        // :[],

        let res = resp.data.data
          this.formdata.account = res.account
          this.formdata.company_name = res.company_name
          this.formdata.business_photo = res.business_photo
          this.formdata.business_license_photo = res.business_license_photo
          this.formdata.business_license_expire = res.business_license_expire
          this.formdata.contacter = res.contacter
          this.formdata.year_product_weight = res.year_product_weight
          this.formdata.province_city_id = res.province_city_id
          this.formdata.address = res.address
          // this.formdata.tel = res.tel
      })
      .catch(err=>{
          console.log("error:",err)
      });
    }
  },
  mounted(){
    this.initArea();
    this.initCateList();
    this.getProfile()
  }
};
</script>
<style lang="scss">
.profile_form{ width: 850px; padding: 70px 0 0 100px;}
.profile_form .ant-form-item-label{ width: 90px;}
.profile_form .ant-form-item{ width: 330px;}
.profile_form .ant-form-item-control-wrapper{ width: 230px;}
</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
