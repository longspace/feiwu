<template>
  <div>
    <template v-if="userInfo.type == 2">
      <div class="module_box">
        <div class="items">
          <div class="itemsicon"><a-icon type="dollar" style="font-size: 40px; color: #1bbc9b;" /></div>
          <div class="itemstext">
            <div class="count"><countTo :startVal='0' :endVal='topItem.money' :duration='2000'></countTo></div>
            <div class="item_tip">订单金额</div>
          </div>
        </div>
        <div class="items">
          <div class="itemsicon"><a-icon type="api" style="font-size: 40px; color: rgb(230, 162, 60);" /></div>
          <div class="itemstext">
            <div class="count"><countTo :startVal='0' :endVal='topItem.willget' :duration='2000'></countTo></div>
            <div class="item_tip">待收货</div>
          </div>
        </div>
        <div class="items">
          <div class="itemsicon"><a-icon type="file-unknown" style="font-size: 40px; color: #CC6699;" /></div>
          <div class="itemstext">
            <div class="count"><countTo :startVal='0' :endVal='topItem.verify' :duration='2000'></countTo></div>
            <div class="item_tip">审核中</div>
          </div>
        </div>
        <div class="items">
          <div class="itemsicon"><a-icon type="shopping-cart" style="font-size: 40px; color: #1890ff;" /></div>
          <div class="itemstext">
             <div class="count"><countTo :startVal='0' :endVal='topItem.book' :duration='2000'></countTo></div>
             <div class="item_tip">我的预购</div>
          </div>
        </div>
        <div class="items">
          <div class="itemsicon"><a-icon type="safety-certificate" style="font-size: 40px; color: #fb616b;" /></div>
          <div class="itemstext">
            <div class="count"><countTo :startVal='0' :endVal='topItem.done' :duration='2000'></countTo></div>
            <div class="item_tip">已完成订单</div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="module_box">
        <div class="items">
          <div class="itemsicon"><a-icon type="dollar" style="font-size: 40px; color: #1bbc9b;" /></div>
          <div class="itemstext">
            <div class="count"><countTo :startVal='0' :endVal='topItem.money' :duration='2000'></countTo></div>
            <div class="item_tip">订单金额</div>
          </div>
        </div>
        <div class="items">
          <div class="itemsicon"><a-icon type="safety-certificate" style="font-size: 40px; color: #fb616b;" /></div>
          <div class="itemstext">
            <div class="count"><countTo :startVal='0' :endVal='topItem.done' :duration='2000'></countTo></div>
            <div class="item_tip">已完成订单</div>
          </div>
        </div>
        <div class="items">
          <div class="itemsicon"><a-icon type="shopping-cart" style="font-size: 40px; color: #1890ff;" /></div>
          <div class="itemstext">
             <div class="count"><countTo :startVal='0' :endVal='topItem.book' :duration='2000'></countTo></div>
             <div class="item_tip">待发货</div>
          </div>
        </div>
        <div class="items">
          <div class="itemsicon"><a-icon type="api" style="font-size: 40px; color: rgb(230, 162, 60);" /></div>
          <div class="itemstext">
            <div class="count"><countTo :startVal='0' :endVal='topItem.willget' :duration='2000'></countTo></div>
            <div class="item_tip">审核中订单</div>
          </div>
        </div>
        <div class="items">
          <div class="itemsicon"><a-icon type="file-unknown" style="font-size: 40px; color: #CC6699;" /></div>
          <div class="itemstext">
            <div class="count"><countTo :startVal='0' :endVal='topItem.verify' :duration='2000'></countTo></div>
            <div class="item_tip">审核中商品</div>
          </div>
        </div>
      </div>
    </template>



    <div class="charts">
      <a-row>
        <a-col :span="24">
          <div class="myborder" style="margin-right: 10px; padding: 0 10px;">
            <div class="box_title"> <a-icon type="line-chart" /> 最近30天概况</div>
            <div id="linechart" style="height: 310px; margin: 10px 0;"></div>
          </div>
        </a-col>
      </a-row>
    </div>

        <uieditor></uieditor>
  </div>
</template>
<script>
  import countTo from 'vue-count-to';
  import { Line,Pie } from '@antv/g2plot';
  import {topItem,lineChart} from "@/utils/http/index.js"
  import uitable from "@/components/basic/uitable.vue"

  import uieditor from "@/components/basic/uieditor.vue"

  export default {
      name:'dashboard',
      data() {
        return {
          userInfo:{},
          topItem:{
            money:0,
            willget:0,
            verify:0,
            book:0,
            done:0
          },
          linePlot:null,
            lineChartsOptions:{
              data:[],
              xField: 'date',
              yField: 'value',
              seriesField: 'category',
              yAxis: {
                label: {
                  // formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
                },
              },
              title:'rrrrrrrrrrrrrrrrrr',
              legend: {
                position: 'bottom ',
              },
              smooth: true,
              // @TODO 后续会换一种动画方式
              animation: {
                appear: {
                  animation: 'path-in',
                  duration: 5000,
                },
              },
              autoFit:true
            },
            tablecfg: {
                headerOptions:[
                    { title: '会员账号', field: 'account'},
                    { title: '订单数', field: 'orderNum'},
                ],
                algin:'center',
                scorllx:310
            },
            tabledata:[],
        };
      },
      components:{
        countTo,uitable,uieditor
      },
      methods:{
        loadLineChartsData(){
            let that = this;
            lineChart({})
            .then(resp=>{
                console.log(resp.data.data);
                that.linePlot.changeData(resp.data.data);
                // that.linePlot.repaint();
            })
            .catch(err=>{
                console.log("error:",err)
            });
        },
        drawLineCharts(){
            this.linePlot = new Line('linechart',this.lineChartsOptions);
            this.linePlot.render();
        },
        getTopItem(){
            let that = this;
            topItem({})
            .then(resp=>{
                that.topItem = resp.data.data
            })
            .catch(err=>{
                console.log("error:",err)
            });
        },
      },
      mounted(){
        let userInfo = localStorage.getItem("userInfo");
        console.log("userInfo",userInfo)
        if(userInfo == null || userInfo == undefined){
          this.$message.error("您尚未登录或登录超时!");
          this.$router.push("/memberLogin")
        }
        userInfo = JSON.parse(userInfo);
        this.userInfo = userInfo
        console.log("this.userInfo",this.userInfo)


        this.getTopItem()
        // 折线图
        this.drawLineCharts()
        this.loadLineChartsData()
      }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">
.box_title{ font-size: 16px; height: 55px; line-height: 55px; padding: 0 0 10px 10px; color:#222;}
.module_box{ display: flex; flex-wrap: nowrap; padding: 0 0 0 1%;}
.items{ transition: all ease 0.5s; width:calc(100% * ( 1 / 5) - (2% * 4 / 5)); margin: 15px 0%; height:100px;border: #dfd8d9 solid 1px; margin-right:1.8%; display: flex; border-radius:7px; cursor:pointer;    align-items: center;box-sizing: border-box; }
.items:hover {
  -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.1), 0 4px 15px 0 rgba(0,0,0,.2);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1), 0 4px 15px 0 rgba(0,0,0,.2); margin-top: 10px;
}
.items:nth-child(5n){margin-right:0;}
.itemsicon{ width: 30%; text-align: center; min-width: 65px;}
.itemstext{width: 70%;font-size: 14px; color:#999999; font-family: "SF Pro SC","SF Pro Display","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif; text-align: right; padding-right: 12px;}
.itemstext .count{ font-size: 26px; color:#000C17;}
// .module_box{ display: flex; justify-content: space-between;flex-wrap: wrap; align-items: flex-start;}
// .items{ width: 18%; margin: 10px 1%; text-align: center; height:120px; border: #002140 solid 1px;}
// .anticon{ color: #e49149;}
.charts{ margin: 15px 0 15px 1%;}
.myborder{ border:#dfd8d9 solid 1px; height: 390px;}
.linechart{ height: 310px;}
</style>
