<template>
  <div>
    <a-table :data-source="datasource" :scroll="{x:tablecfg.scorllx?tablecfg.scorllx:1000}"  :pagination="false" size="small" :rowKey="(record,index)=>{return index}" :loading="tablecfg.loading?tablecfg.loading:false" :row-selection="tablecfg.rowSelection?{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }:null">

      <a-table-column v-for="(item,index) in tablecfg.headerOptions" :key="item.field" :title="item.title" :data-index="item.field" :width="item.width" >
        <template slot-scope="text, record, index">
          <template v-if="item.fieldType == 'status' " >
            <template v-for="items in item.showText">
              <a-tag v-if="items.id == text" :color="items.color"> {{items.label}} </a-tag>
            </template>
          </template>
          <template v-else-if="item.fieldType == 'image' " >
            <img v-if="text" :src="text" style="width: 45px; height: 45px;">
          </template>
          <template v-else-if="item.fieldType == 'switch' " >
            <a-switch size="small" :default-checked="text==1?true:false" @change="onSwitchChange" />
          </template>
          <template v-else>
            <div style="min-width: 60px;">{{text}}</div>
          </template>
        </template>

        <!-- <template v-if="item.field == 'status' " >
          <template :slot="item.field" slot-scope="text, record, index">
            {{scope}}qq
          </template>
        </template> -->

      </a-table-column>

      <a-table-column v-if="tablecfg.operateWidth" key="action" title="操作" fixed="right" :width="tablecfg.operateWidth">
        <template slot-scope="text, record">
          <span style="display: flex;">
            <!-- <a v-for="(item,index) in tablecfg.operateOptions" :key="index" @click="handleOperateButton(item.methods,record)">{{item.title}}</a> -->
            <a-tooltip v-for="(item,index) in tablecfg.operateOptions"  :key="index" placement="top" :title="item.title">
            <a-button ghost size="small" @click="handleOperateButton(item.methods,record)" :type="item.type" shape="circle" :icon="item.icon" :style="item.style?item.style:''"/>
            </a-tooltip>
            <!-- <a-divider type="vertical" /> -->
          </span>
        </template>
      </a-table-column>

    </a-table>
  </div>
</template>
<script>
export default {
    props:{
      datasource:{
        type:Array,
        default:()=>[]
      },
      tablecfg:{
        type:Object,
        default:()=>{}
      },
    },
    name:'uitable',
    data() {
      return {
        selectedRowKeys: [], // Check here to configure the default column
      };
    },
    methods:{
      handleOperateButton(methods,row){
        this.$emit('handleUiTableBtn',methods,row)
      },
      onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.selectedRowKeys = selectedRowKeys;
        this.$emit("onSelectChange",selectedRowKeys)
      },
      onSwitchChange(val) {
        console.log(val)
      },
    },
    mounted(){

    }
};
</script>
<style lang="scss">
.ant-btn-circle.ant-btn-sm, .ant-btn-circle-outline.ant-btn-sm{ margin:0 3px 3px 3px;}
// .ant-btn-icon-only.ant-btn-sm{ width: 16px; height: 16px;}
</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
