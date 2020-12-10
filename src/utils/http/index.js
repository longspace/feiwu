// api 接口列表
import request from "./request.js";

export const doLogin = (data = {}) => request.post("login", data);
export const getMyPermission = (data = {}) =>
  request.post("getMyPermission", data);
export const getMyMenu = (data = {}) => request.post("getMyMenu", data);
export const getMyAuthNode = (data = {}) => request.post("getMyAuthNode", data);


export const topItem = (data = {}) => request.post("member/topItem", data);
export const lineChart = (data = {}) => request.post("member/lineChart", data);


export const goodsList = (data={}) => request.post("goods/goodsList",data)
export const goodsHandle = (data={}) => request.post("goods/goodsHandle",data)
export const goodsDelete = (data={}) => request.post("goods/goodsDelete",data)
export const goodsDetails = (data={}) => request.post("goods/goodsDetails",data)
export const goodsSaleHandle = (data={}) => request.post("goods/saleHandle",data) // 上下架处理


export const profile = (data = {}) => request.post("member/profile", data);
export const handleProfile = (data = {}) => request.post("member/handleProfile", data);
export const handlePasswd = (data = {}) => request.post("member/handlePasswd", data);


export const ordersList = (data={}) => request.post("orders/list",data) // 订单列表
export const ordersDelete = (data={}) => request.post("orders/delete",data) // 删除订单

export const uploadSingleImg = (data={}) => request.post("uploadSingleImg",data) // 上传单图
export const uploadImgs = (data={}) => request.post("uploadImgs",data) // 上传多图

export const callArea = (data={}) => request.post("call/area",data) // 省市联动
export const callphysicalState = (data={}) => request.post("call/physicalState",data) // 物理状态
export const callpackageStyle = (data={}) => request.post("call/packageStyle",data) // 包装形式
export const callfeatures = (data={}) => request.post("call/features",data) // 危险特性
export const callhandleCompanys = (data={}) => request.post("call/handleCompanys",data) // 处废企业列表

export const ordersReport = (data={}) => request.post("report/ordersReport",data) // 订单拆线图
export const ordersLineChart = (data={}) => request.post("report/ordersLineChart",data) // 订单拆线图
export const searchList = (data={}) => request.post("report/searchList",data) // 搜索记录

export const callGoodsCategoryList = (data = {}) =>
  request.post("call/goodsCategoryParentList", data); // 商品大分类调用
export const callGoodsCategoryParentAndSonList = (data = {}) =>
  request.post("call/goodsCategoryParentAndSonList", data); // 商品大小分类调用

// web前端页面请求
export const getSmsCode = (data = {}) => request.post("member/sendSmsCode", data); // 获取短信验证码
export const getPicCode = (data = {}) => request.get("picCode", data); // 更改图形验证码
export const webRegister = (data = {}) => request.post("member/reg", data); // 注册
export const changePassword = (data = {}) => request.post("changePassword", data); // 忘记密码
export const webLogin = (data = {}) => request.post("member/login", data); // 前端登录
export const getHotKeywords = (data = {}) =>
  request.post("get/hotKeywords", data); // 获取搜索关键词


export const getHotGoods= (data = {}) =>
  request.post("hotGoods", data); // 获取首页推荐商品
export const getNewsList = (data = {}) => request.post("newsList", data); // 获取新闻
export const submitKeywords = (data = {}) =>
  request.post("submit/keywords", data); // banner关键词搜索


  export const getGarbageArea = (data = {}) =>
  request.post("garbageArea", data); // 产废区域

  export const getGarbageType = (data = {}) =>
  request.post("garbageType", data); // 废物类别

  export const searchGarbage = (data = {}) =>
  request.post("searchGarbage", data); // 废物类别
