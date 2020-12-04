<template>
  <div class="profile_form">
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }" :form="form" layout="horizontal">
      <a-form-item label="用户账号">
        <a-input v-model="form.user_name" >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="新的密码">
        <a-input v-model="form.passwd" allowClear placeholder="不改请留空">
          <a-icon slot="prefix" type="eye" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
     <a-form-item label="重复密码">
       <a-input v-model="form.repasswd" allowClear placeholder="不改请留空">
         <a-icon slot="prefix" type="eye" style="color:rgba(0,0,0,.25)" />
       </a-input>
     </a-form-item>
      <a-form-item label="联系电话">
        <a-input v-model="form.tel" allowClear>
          <a-icon slot="prefix" type="phone" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item  label="">
        <a-button @click="handleSubmit()" type="primary" html-type="submit" style="margin-left: 130px;" >
          <a-icon type="check" />保存修改
        </a-button>



      </a-form-item>
    </a-form>
  </div>
</template>
<script>
   import {profile,handleProfile} from "@/utils/http/index"
export default {
  data() {
    return {
      form:{
        user_name:'',
        passwd:'',
        repasswd:'',
        tel:''
      }
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
