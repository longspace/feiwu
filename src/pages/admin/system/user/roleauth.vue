<template>
  <div>
    <div class="top_action">
      <div class="taskbtnbox">
        <a-button v-check="'ADD_ROLE'" type="primary" ghost icon="plus" @click="addRole">新建角色</a-button>
      </div>
      <div class="savebtn">
        <a-button v-check="'EDIT_ROLE'" v-if="saveVisible" type="primary" icon="check" @click="saveRole">保存角色</a-button>
        <a-button v-check="'DELETE_ROLE'" v-if="deleteVisible" type="danger" icon="check" @click="deleteRole" ghost  style="margin-left: 10px;">删除</a-button></div>
    </div>
      <div class="box_needdo">
        <div class="box_needdoleft">
            <div class="taskitemMenu">
              <ul>
                <li v-for="(item,index) in roleListItem":class="item.isActive?'isActive':''" @click="changeItem(index)">{{item.title}}</li>
              </ul>
            </div>
        </div>
        <div class="box_needdoright">

          <div class="taskNeedDo">
            <div v-if="auth_items.length >0">
              <a-input placeholder="角色名称" style="width: 50%; margin-bottom: 6px;" v-model="form.role_name" />
              <div class="role_item" v-for="(items,index) in auth_items">
                <a-checkbox @change="onRootChange" :indeterminate="items.indeterminate" :checked="items.checked" :value="items.value"><b>{{items.label}}</b></a-checkbox>
                <div class="second_item" v-for="(item,key) in items.children">
                  <div>
                  <a-checkbox @change="onSecChange" :indeterminate="item.indeterminate" :checked="item.checked" :value="item.value">{{item.label}}</a-checkbox>
                  </div>
                  <div v-for="(sonitem,sonkey) in item.children">
                    <div><a-checkbox @change="onThirdChange" :checked="sonitem.checked" :value="sonitem.value"><span style="color:#999999;">{{sonitem.label}}</span></a-checkbox></div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <a-result title="请点击左侧角色或新建角色">
                  <template #icon>
                    <a-icon type="setting" />
                  </template>
                </a-result>
            </div>

          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import {roleList,rolePermission,roleHandle,roleDelete} from "@/utils/http/index.js"
  export default {
    name:'needDo',
    data() {
      return {
        roleListItem:[],
        readyForRoleRules:[],
        auth_items:[],
        form:{
          id:0,
          role_name :'',
          auth_items:[],//indeterminate :是否有半选中状态
        },
        saveVisible:false,
        deleteVisible:false
      };
    },
    components:{

    },
    methods:{
      addRole(){
        this.form.id = 0;
        this.form.role_name = '';
        this.auth_items = JSON.parse(JSON.stringify(this.readyForRoleRules));
        this.roleListItem.forEach((item,key)=>{
          item.isActive = false;
        }),
        this.saveVisible = true;
        this.deleteVisible = false;
      },
      saveRole(){
        this.form.auth_items = this.auth_items;
        let that = this;
        roleHandle(this.form).then(res=>{
          const {data} = res;
          if(data.code == 200){
            that.initRoleList();
            that.$message.success(res.data.msg);
          }else{
            that.$message.error(res.data.msg);
          }
        }).catch(err=>{
          console.log("新增或更新角色及权限出错：",err);
        })
      },
      deleteRole(){
        let that = this;
        const {id} = this.form;
        this.$confirm({
          title: '温馨提示',
          content: '您确定要删除吗',
          okText: '确认',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            roleDelete({id}).then(res=>{
              const {data} = res;
              if(data.code == 200){
                that.initRoleList();
                that.addRole()
                that.auth_items = []
                that.$message.success(res.data.msg);
              }else{
                that.$message.error(res.data.msg);
              }
            }).catch(err=>{
              console.log("删除角色及权限出错：",err);
            })
          },
          onCancel() {
            console.log('Cancel');
          },
        });

      },
      changeItem(index){
        this.roleListItem.forEach((item,key)=>{
          if(key == index){
            item.isActive = true;
          }else{
            item.isActive = false;
          }
        })
        this.ajaxGetRolePermission(index)
      },
      onRootChange(e){
        const {checked,value} = e.target
        let authitem = this.auth_items;
        for(let key=0; key < authitem.length;key++){
          if(authitem[key].value === value){
            authitem[key].indeterminate = false;
            authitem[key].checked = checked;
            if(authitem[key].children){
              let onechildren = authitem[key].children;
              for(let kone=0; kone<onechildren.length; kone++){
                onechildren[kone].checked = checked;
                if(onechildren[kone].children){
                  let twochildren = onechildren[kone].children;
                  for(let ktwo=0; ktwo<twochildren.length; ktwo++){
                    twochildren[ktwo].checked = checked;
                  }
                  onechildren[kone].children = twochildren;
                }
              }
              authitem[key].children = onechildren;
            }
          }
        }
        this.auth_items = authitem;
      },
      onSecChange(e){
        const {checked,value} = e.target
        this.auth_items.forEach((items,index)=>{
          let children = items.children
          let checkSonItemLength = 0;
          let key = -1;
          children.forEach((item,i)=>{
            if(item.value == value){
              item.checked = checked
              key = index;
            }
            if(item.checked == true){
              checkSonItemLength += 1
            }
          })
          if(key == value){
            if(checkSonItemLength == 0){
              items.indeterminate = false
              items.checked = false;
            }
            if(checkSonItemLength > 0 && checkSonItemLength < children.length){
              items.indeterminate = true
              items.checked = true;
            }
            if(checkSonItemLength == children.length){
              items.indeterminate = false
              items.checked = true;
            }
            items.children = children;
          }

        })
      },
      onThirdChange(e){
        const {checked,value} = e.target
        let authitem = this.auth_items;
        for(let key=0; key < authitem.length;key++){
          if(authitem[key].children){
            let onechildren = authitem[key].children;
            for(let kone=0; kone<onechildren.length; kone++){
              if(onechildren[kone].children){
                let twochildren = onechildren[kone].children;
                for(let ktwo=0; ktwo<twochildren.length; ktwo++){
                  if(twochildren[ktwo].value == value){
                    twochildren[ktwo].checked = checked;
                  }
                }
                onechildren[kone].children = twochildren;
              }
            }
            authitem[key].children = onechildren;
          }
        }
        this.auth_items = authitem;
      },
      initRoleList(){
        roleList({}).then(res=>{
          this.roleListItem = res.data.data
          this.readyForRoleRules = res.data.roleRules
        }).catch(err=>{
          console.log("加载角色列表出错：",err);
        })
      },
      ajaxGetRolePermission(index){
        let id = this.roleListItem[index].id
        this.form.id = this.roleListItem[index].id;
        this.form.role_name = this.roleListItem[index].title;
        rolePermission({id}).then(res=>{
          this.auth_items = res.data.data
        }).catch(err=>{
          console.log("加载角色对应权限出错：",err);
        })
        this.saveVisible = true;
        this.deleteVisible = true;
      }
    },
    mounted(){
      this.initRoleList();
    }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">
  .top_action{ display: flex; justify-content: space-between; border-bottom: #e6e7eb solid 1px; padding:0 0px 10px 0;}
  .taskbtnbox{ width: 100%;margin-left: 12px;}
  .savebtn{ width: 300px; flex-shrink: 0; padding-right: 8px; text-align: right;}
  .box_needdo{ display: flex; height:calc(100vh - 203px);}
  .box_needdoleft{ width:179px; height:calc(100vh - 203px); border-right: #e6e7eb solid 1px;flex-shrink: 0;}
  .box_needdoright{ width:100%;height:calc(100vh - 203px); overflow-y: scroll; }
  .taskitemMenu{ padding-top: 15px;}
  .taskitemMenu ul{ list-style: none; margin: 0; padding: 0;}
  .taskitemMenu li{ height:40px; line-height: 40px; list-style: no;  padding-left: 12px; display: block; color:#666; cursor:pointer;border-right: #FFFFFF solid 2px;}
  .taskitemMenu li:hover{background-color: #f2f2ff; color: #1890ff;}
  .taskitemMenu li.isActive{ color: #1890ff; border-right: #1890ff solid 2px; color:#1890ff; background-color: #f2f2ff; border-radius: 3px;}

.taskNeedDo{ padding: 15px 15px 15px 27px; height:calc(100vh - 203px)}
.role_item{ border:#ededed dashed 1px; padding: 10px 12px; margin: 12px 0; border-radius: 3px;}
.role_item:hover{ border:#d5d7da dashed 1px}
.second_item{ padding: 6px 55px; display: flex;}
.second_item div{ width: 120px; }
</style>
