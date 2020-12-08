<template>
  <div class="profile_form">
    <a-form class="company_form"  :form="formdata" layout="inline">
      <a-form-item label="用户账号">
        <a-input allowClear
         v-model="formdata.account">
          <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="用户密码">
        <a-input allowClear
         v-model="formdata.passwd">
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

      <a-form-item label="年产量">
        <a-input allowClear placeholder="单位:吨"
         v-model="formdata.year_product_weight">
          <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="许可证到期">
        <a-date-picker allowClear v-model="formdata.business_license_expire" placeholder="到期时间" style="width: 230px;" />
      </a-form-item>
      <a-form-item label="联系人">
        <a-input allowClear
         v-model="formdata.contacter">
          <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="联系电话">
        <a-input allowClear
         v-model="formdata.tel">
          <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
        </a-input>
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
      <a-form-item label="是否VIP">
        <a-switch v-model="formdata.vip" @change="onSwitchVipChange" />
      </a-form-item>
      <a-form-item label="是否启用">
        <a-switch v-model="formdata.status" @change="onSwitchStatusChange" />
      </a-form-item>
      <div style="padding:25px 200px 6px 200px;">
        <a-button type="primary" icon="check" ghost @click="dialogSubmit" style="margin-right: 130px;"> 保存 </a-button>
        <a-button type="danger" icon="close" ghost @click="dialogClose"> 关闭 </a-button>
      </div>
    </a-form>
  </div>
</template>
<script>
   import {profile,handleProfile} from "@/utils/http/index"
export default {
  data() {
    return {
      formdata:{
        id:0,
        type:2,
        account:'',
        passwd:'',
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
        status:true,
        vip:false,
      },
    };
  },
  methods:{
    handleSubmit(){
      let form = this.form
      if(form.passwd != "" && form.passwd != form.repasswd){
        this.$message.error("两次密码输入不一致，请检查！");
        return false;
      }
      handleProfile(form)
      .then(resp=>{
          if(resp.data.code == 200){
            this.$message.success("保存成功！");
            this.$router.push('/dashboard')
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
        let res = resp.data.data
          this.form.user_name = res.user_name
          this.form.tel = res.tel
      })
      .catch(err=>{
          console.log("error:",err)
      });
    }
  },
  mounted(){
    this.getProfile()
  }
};
</script>
<style lang="scss">
.profile_form{ width: 800px; padding-top: 30px;}
</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
