export default {
  install(Vue) {
    Vue.prototype.yxCheckPermission = function (authnode) {
      let flag = false;
      let doPermission = JSON.parse(localStorage.getItem("nodePermission")) || []
      doPermission.forEach((item,index)=>{
        if(item.path == authnode){
          flag = true;
        }
      })
      return flag;
    };
  }
}
