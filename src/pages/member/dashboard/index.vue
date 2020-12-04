<template>
  <div>
    <div class="module_box">
      <div class="items">
        <div class="itemsicon"><a-icon type="pie-chart" style="font-size: 40px; color: #1890ff;" /></div>
        <div class="itemstext">
           <div class="count"><countTo :startVal='0' :endVal='206' :duration='3000'></countTo></div>
           <div class="item_tip">订单数量</div>
        </div>
      </div>
      <div class="items">
        <div class="itemsicon"><a-icon type="dollar" style="font-size: 40px; color: #1bbc9b;" /></div>
        <div class="itemstext">
          <div class="count"><countTo :startVal='0' :endVal='3815' :duration='3000'></countTo></div>
          <div class="item_tip">订单金额</div>
        </div>
      </div>
      <div class="items">
        <div class="itemsicon"><a-icon type="team" style="font-size: 40px; color: #fb616b;" /></div>
        <div class="itemstext">
          <div class="count"><countTo :startVal='0' :endVal='639' :duration='3000'></countTo></div>
          <div class="item_tip">会员数量</div>
        </div>
      </div>
      <div class="items">
        <div class="itemsicon"><a-icon type="shop" style="font-size: 40px; color: rgb(230, 162, 60);" /></div>
        <div class="itemstext">
          <div class="count"><countTo :startVal='0' :endVal='307' :duration='3000'></countTo></div>
          <div class="item_tip">产品数量</div>
        </div>
      </div>
      <div class="items">
        <div class="itemsicon"><a-icon type="read" style="font-size: 40px;" /></div>
        <div class="itemstext">
          <div class="count"><countTo :startVal='0' :endVal='1821' :duration='3000'></countTo></div>
          <div class="item_tip">文章总数</div>
        </div>
      </div>
    </div>

    <div class="charts">
      <a-row>
        <a-col :span="16">
          <div class="myborder" style="margin-right: 10px; padding: 0 10px;">
            <div class="box_title"> <a-icon type="line-chart" /> 最近7天概况</div>
            <div id="linechart" style="height: 310px; margin: 10px 0;"></div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="myborder" style="margin-left: 10px;">
            <div class="box_title"> <a-icon type="unordered-list" /> 订单数前10会员排行榜</div>
            <uitable :datasource="tabledata" :tablecfg="tablecfg" style="height: 342px; overflow-y: scroll;"></uitable>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
  import countTo from 'vue-count-to';
  import { Line,Pie } from '@antv/g2plot';
  import {dashboardLineChart,dashboardPieChart} from "@/utils/http/index.js"
  import uitable from "@/components/basic/uitable.vue"
  export default {
      name:'',
      data() {
        return {
          linePlot:null,
            lineChartsOptions:{
              data:[],
              xField: 'year',
              yField: 'gdp',
              seriesField: 'name',
              yAxis: {
                label: {
                  formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
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
                    { title: '订单金额', field: 'orderMoney'},
                ],
                algin:'center',
                scorllx:310
            },
            tabledata:[],
        };
      },
      components:{
        countTo,uitable
      },
      methods:{
        loadLineChartsData(){
            // let that = this;
            // dashboardLineChart({})
            // .then(resp=>{
            //     console.log(resp.data.data);
            //     that.linePlot.changeData(resp.data.data);
            //     that.linePlot.repaint();
            // })
            // .catch(err=>{
            //     console.log("error:",err)
            // });
            let data = [
    {
        "name": "订单数",
        "year": "2000",
        "gdp": 1211346869605.24
    },
    {
        "name": "订单数",
        "year": "2001",
        "gdp": 1339395718865.3
    },
    {
        "name": "订单数",
        "year": "2002",
        "gdp": 1470550015081.55
    },
    {
        "name": "订单数",
        "year": "2003",
        "gdp": 1660287965662.68
    },
    {
        "name": "订单数",
        "year": "2004",
        "gdp": 1955347004963.27
    },
    {
        "name": "订单数",
        "year": "2005",
        "gdp": 2285965892360.54
    },
    {
        "name": "订单数",
        "year": "2006",
        "gdp": 2752131773355.16
    },
    {
        "name": "订单数",
        "year": "2007",
        "gdp": 3550342425238.25
    },
    {
        "name": "订单数",
        "year": "2008",
        "gdp": 4594306848763.08
    },
    {
        "name": "订单数",
        "year": "2009",
        "gdp": 5101702432883.45
    },
    {
        "name": "订单数",
        "year": "2010",
        "gdp": 6087164527421.24
    },
    {
        "name": "订单数",
        "year": "2011",
        "gdp": 7551500425597.77
    },
    {
        "name": "订单数",
        "year": "2012",
        "gdp": 8532230724141.76
    },
    {
        "name": "订单数",
        "year": "2013",
        "gdp": 9570405758739.79
    },
    {
        "name": "订单数",
        "year": "2014",
        "gdp": 10438529153237.6
    },
    {
        "name": "订单数",
        "year": "2015",
        "gdp": 11015542352468.9
    },
    {
        "name": "订单数",
        "year": "2016",
        "gdp": 11137945669350.6
    },
    {
        "name": "订单数",
        "year": "2017",
        "gdp": 12143491448186.1
    },
    {
        "name": "订单数",
        "year": "2018",
        "gdp": 13608151864637.9
    },
    {
        "name": "销售额",
        "year": "2000",
        "gdp": 10252345464000
    },
    {
        "name": "销售额",
        "year": "2001",
        "gdp": 10581821399000
    },
    {
        "name": "销售额",
        "year": "2002",
        "gdp": 10936419054000
    },
    {
        "name": "销售额",
        "year": "2003",
        "gdp": 11458243878000
    },
    {
        "name": "销售额",
        "year": "2004",
        "gdp": 12213729147000
    },
    {
        "name": "销售额",
        "year": "2005",
        "gdp": 13036640229000
    },
    {
        "name": "销售额",
        "year": "2006",
        "gdp": 13814611414000
    },
    {
        "name": "销售额",
        "year": "2007",
        "gdp": 14451858650000
    },
    {
        "name": "销售额",
        "year": "2008",
        "gdp": 14712844084000
    },
    {
        "name": "销售额",
        "year": "2009",
        "gdp": 14448933025000
    },
    {
        "name": "销售额",
        "year": "2010",
        "gdp": 14992052727000
    },
    {
        "name": "销售额",
        "year": "2011",
        "gdp": 15542581104000
    },
    {
        "name": "销售额",
        "year": "2012",
        "gdp": 16197007349000
    },
    {
        "name": "销售额",
        "year": "2013",
        "gdp": 16784849190000
    },
    {
        "name": "销售额",
        "year": "2014",
        "gdp": 17521746534000
    },
    {
        "name": "销售额",
        "year": "2015",
        "gdp": 18219297584000
    },
    {
        "name": "销售额",
        "year": "2016",
        "gdp": 18707188235000
    },
    {
        "name": "销售额",
        "year": "2017",
        "gdp": 19485393853000
    },
    {
        "name": "销售额",
        "year": "2018",
        "gdp": 20544343456936.5
    },
    {
        "name": "会员数",
        "year": "2000",
        "gdp": 1657816613708.58
    },
    {
        "name": "会员数",
        "year": "2001",
        "gdp": 1640246149417.01
    },
    {
        "name": "会员数",
        "year": "2002",
        "gdp": 1784473920863.31
    },
    {
        "name": "会员数",
        "year": "2003",
        "gdp": 2053018775510.2
    },
    {
        "name": "会员数",
        "year": "2004",
        "gdp": 2416931526913.22
    },
    {
        "name": "会员数",
        "year": "2005",
        "gdp": 2538680000000
    },
    {
        "name": "会员数",
        "year": "2006",
        "gdp": 2713749770009.2
    },
    {
        "name": "会员数",
        "year": "2007",
        "gdp": 3100882352941.18
    },
    {
        "name": "会员数",
        "year": "2008",
        "gdp": 2922667279411.76
    },
    {
        "name": "会员数",
        "year": "2009",
        "gdp": 2410909799034.12
    },
    {
        "name": "会员数",
        "year": "2010",
        "gdp": 2475244321361.11
    },
    {
        "name": "会员数",
        "year": "2011",
        "gdp": 2659310054646.23
    },
    {
        "name": "会员数",
        "year": "2012",
        "gdp": 2704887678386.72
    },
    {
        "name": "会员数",
        "year": "2013",
        "gdp": 2786022872706.81
    },
    {
        "name": "会员数",
        "year": "2014",
        "gdp": 3063803240208.01
    },
    {
        "name": "会员数",
        "year": "2015",
        "gdp": 2928591002002.51
    },
    {
        "name": "会员数",
        "year": "2016",
        "gdp": 2694283209613.29
    },
    {
        "name": "会员数",
        "year": "2017",
        "gdp": 2666229179958.01
    },
    {
        "name": "会员数",
        "year": "2018",
        "gdp": 2855296731521.96
    },
];
            this.linePlot.changeData(data);
            this.linePlot.update();
        },
        drawLineCharts(){
            this.linePlot = new Line('linechart',this.lineChartsOptions);
            this.linePlot.render();
        },

      },
      mounted(){
        // 折线图
        this.drawLineCharts()
        this.loadLineChartsData()

        this.tabledata = [
            {id:100,account:'wubiao',orderNum:'12',orderMoney:'3190'},
            {id:100,account:'wubiao',orderNum:'10',orderMoney:'2908'},
            {id:100,account:'wubiao',orderNum:'10',orderMoney:'2901'},
            {id:100,account:'wubiao',orderNum:'9',orderMoney:'3101'},
            {id:100,account:'wubiao',orderNum:'10',orderMoney:'2901'},
            {id:100,account:'wubiao',orderNum:'10',orderMoney:'2901'},
            {id:100,account:'wubiao',orderNum:'10',orderMoney:'2901'},
            {id:100,account:'wubiao',orderNum:'10',orderMoney:'2901'},
            {id:100,account:'wubiao',orderNum:'10',orderMoney:'2901'},
            {id:100,account:'wubiao',orderNum:'10',orderMoney:'2901'},


          ]
      }
  };
</script>
<style lang="scss">

</style>
<style scoped lang="scss" rel="stylesheet/scss">
.box_title{ font-size: 16px; height: 40px; line-height: 40px; padding: 0 0 10px 10px; color:#000C17;}
.module_box{ display: flex; flex-wrap: nowrap; padding:0 0.3% 0 1%;}
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
.charts{ margin: 15px 1%;}
.myborder{ border:#dfd8d9 solid 1px; height: 390px;}
.linechart{ height: 310px;}
</style>
