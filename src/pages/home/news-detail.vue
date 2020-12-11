<!--
 * @Author: summer
 * @LastEditTime: 2020-12-11 16:40:50
-->
<template>
  <div class="news-detail">
    <div class="news-detail-l" v-if="newsDetail">
      <div class="detail-info">
        <div class="detail-top">
          <div class="news-headline">
            {{ newsDetail.title }}
          </div>
          <div class="news-attr">
            <span>发布时间：{{ newsDetail.date }}</span>
            <span class="news-origin">来源：{{ newsDetail.origin }}</span>
            <span>浏览：{{ newsDetail.views }}</span>
          </div>
        </div>
        <div class="detail-content" v-html="newsDetail.content"></div>
      </div>
      <div class="detail-history">
        <router-link
          tag="div"
          :to="{ path: '/newsDetail', query: { id: 1 } }"
          class="news-prev"
          >上一篇：生态环境部：全国危废处置能力</router-link
        >
        <router-link tag="div" :to="{ path: '/newsCenter' }" class="news-back"
          >返回列表</router-link
        >
        <router-link
          tag="div"
          :to="{ path: '/newsDetail', query: { id: 2 } }"
          class="news-next"
          >下一篇：生态环境部：全国危废处置能力</router-link
        >
      </div>
    </div>
    <news-slidebar :latest-news="latestNews"></news-slidebar>
  </div>
</template>

<script>
import NewsSlidebar from "./components/news-slidebar";
export default {
  data() {
    return {
      latestNews: [
        {
          id: 1,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        },
        {
          id: 2,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        },
        {
          id: 3,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        },
        {
          id: 4,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        }
      ],
      newsDetail: {
        content:
          '<p>我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超1.1亿吨/年，利用能力和处置能力比&ldquo;十二五&rdquo;末分别增长了1倍和1.6倍。</p>\n<p>生态环境部固体废物与化学品司司长邱启文介绍，近年来，生态环境部会同相关部门在推动提升固体废物处置能力方面开展大量工作，联合有关部门印发方案，强化医疗机构废弃物综合治理，推动医疗废物收集、运输和集中处置设施建设。</p>\n<p>同时，生态环境部全力做好疫情防控医疗废物处置相关环保工作，确保全国所有医疗机构及设施环境监管与服务100%全覆盖，医疗废物及时有效收集转运和处理处置100%全落实。疫情发生以来，全国医疗废物均得到妥善处置。</p>\n<p align="center"><img class="wscnph" src="https://dcdn.it120.cc/2020/12/11/dda12825-6693-42a8-9fdf-4bbf6d69af22.jpg" /></p>\n<p>为打击非法倾倒处置等违法犯罪行为、排查整治处置环境风险，生态环境部组织在全国范围内开展危险废物专项整治三年行动，以危险化学品单位、化工园区、医疗废物处置单位等为重点，排查整治危险废物环境风险隐患。</p>\n<p>2019年，生态环境部共完成2.1万家企业和400多个化工园区危险废物风险排查。同时，开展专项执法，遏制环境违法犯罪行为。</p>\n<p>&ldquo;近年来，各地危险废物利用处置能力大幅度提升，处置价格明显下降。各地可实现医疗废物应收尽收，应处尽处，只有个别地市因为尚未建成医疗废物处置设施而采取转运至相邻地市处置。&rdquo;邱启文表示。</p>\n<p>邱启文介绍，生态环境部将积极配合有关部门推进工业固废综合利用等工作，持续提升固体废物处理能力和水平；深入推进&ldquo;无废城市&rdquo;建设试点工作，大力推动试点地区全面提升生活垃圾、建筑垃圾、工业固废、农业废弃物和危险废物利用处置能力，形成一批可复制、可推广的示范模式和创新做法。</p>\n<p>邱启文表示，生态环境部将建立健全危险废物监管长效机制，着力提升危险废物环境监管能力；夯实固体废物监管工作基础，着力提升危险废物环境风险防范能力；严厉打击固体废物尤其是危险废物非法转移倾倒等环境违法行为，有效遏制非法倾倒事件的发生。</p>',
        date: "2020-12-04",
        origin: "固废驿站",
        views: "1460",
        title: "全国危废处置能力比十二五末增长一点六倍 环境风险防范能力持续提升"
      },
      newsHistory: [
        {
          id: 1,
          value: "上一篇",
          title: "生态环境部：全国危废处置能力"
        },
        {
          id: 2,
          value: "下一篇",
          title: "生态环境部：全国危废处置能力"
        }
      ]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  components: { NewsSlidebar },
  computed: {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="scss">
.news-detail {
  display: flex;
  width: 96%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 62px;
  padding-bottom: 110px;
  overflow: hidden;
  .news-detail-l {
    flex: 1;
    padding-right: 82px;
    .detail-info {
      .detail-top {
        padding-top: 16px;

        .news-headline {
          font-size: 24px;
          line-height: 26px;
          color: #333;
        }
        .news-attr {
          margin-top: 20px;
          margin-bottom: 10px;
          font-size: 14px;
          line-height: 26px;
          color: #999;
          .news-origin {
            margin-left: 20px;
            margin-right: 20px;
          }
        }
      }
      .detail-content {
        padding-top: 46px;
        padding-bottom: 36px;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
      }
    }
    .detail-history {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #333;
      line-height: 30px;
      margin-top: 30px;
      .news-prev {
        width: 35%;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .news-back {
        cursor: pointer;
        width: 140px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 3px;
        font-size: 14px;
        background: #eeeeee;
      }
      .news-next {
        width: 35%;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .news-slidebar {
    width: 240px;
  }
}
</style>
