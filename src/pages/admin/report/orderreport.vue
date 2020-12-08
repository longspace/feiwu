<template>
  <div>
    <uiform :formdata="formdata" :formcfg="formcfg"></uiform><br/>
    <uitable :datasource="tabledata" :tablecfg="tablecfg"></uitable><br/>

    <div id="linechart"></div>

  </div>
</template>
<script>
  import { Line,Pie } from '@antv/g2plot';
  import mydialog from "@/components/basic/uidialog.vue"
  import uiform from "@/components/basic/uiform.vue"
  import uitable from "@/components/basic/uitable.vue"
  import {ordersReport,ordersLineChart} from "@/utils/http/index.js"
  export default {
      name:'ordersList',
      data() {
        return {
          linePlot:null,
          lineChartsOptions: {
              title: {
                  visible: true,
                  text: '注册会员数、付费会员数、金额',
              },
              padding: 'auto',
              forceFit: true,
              data:[],
              xField: 'date',
              yField: 'value',
              seriesField: 'category',
              xAxis: {
                  // type: 'time',
              },
              yAxis: {
                  label: {
                  // 数值格式化为千分位
                  formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
                  },
              },
              color: ['#1979C9', '#D62A0D', '#FAA219'],
              // lineStyle: (d) => {
              //     return {
              //         lineDash: [2, 2],
              //     };
              // },
              responsive: true,
          },


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
              {type:'DateRange',label:'',field:'date_range',icon:'smile',allowClear:1,style:{width:'230px'},placeholder:['订单开始时间','订单结束时间']},
            ]
          },
          // 表单配置绑定值
          formdata:{
            date_range:[]
          },
          tablecfg: {
              headerOptions:[
                  { title: '日期', field: 'date', width:'90px'},
                  { title: '待发货', field: 'willSend',width:'120px'},
                  { title: '待收货', field: 'willTake',width:'120px'},
                  { title: '已收货', field: 'alreadyTake',width:'120px'},
                  { title: '已处理', field: 'handled',width:'120px'},                  
              ],
              algin:'center',
              loading:false,
          },
          tabledata:[],
          init:{
            cateList:[]
          }
        };
      },
      components:{
        mydialog,uiform,uitable
      },
      methods:{
        loadLineChartsData(){
          let that = this;
          ordersLineChart({daterange:this.formdata.daterange})
          .then(resp=>{
              console.log(resp.data.data);
              that.linePlot.changeData(resp.data.data);
              that.linePlot.repaint();
          })
          .catch(err=>{
              console.log("error:",err)
          });
        },
        drawLineCharts(){
            this.linePlot = new Line(document.getElementById('linechart'),this.lineChartsOptions);
            this.linePlot.render();
        },

        formQuery(){
          console.log("this.formdata",this.formdata)
          this.loadData()
        },

        loadData(){
          this.tablecfg.loading = true;
          let form = this.formdata
          console.log("form",form)
          ordersReport(form).then(res=>{
            const {data} = res;
            this.tabledata = data.data;
            this.tablecfg.loading = false;
          }).catch(err=>{
            console.log("加载订单列表出错：",err);
            this.tablecfg.loading = false;
          })
        }
      },
      mounted(){
        let obj = new Date();
        let objdate = {y:obj.getFullYear(),m:obj.getMonth()+1,d:obj.getDate()}
        this.formdata.date_range = [objdate.y+"-"+objdate.m+"-01",objdate.y+"-"+objdate.m+"-"+objdate.d];

        this.loadData()
        this.loadLineChartsData()
      }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
