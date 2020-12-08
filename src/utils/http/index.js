// api 接口列表
import request from "./request.js";

export const doLogin = (data = {}) => request.post("login", data);
export const getMyPermission = (data = {}) =>
  request.post("getMyPermission", data);
export const getMyMenu = (data = {}) => request.post("getMyMenu", data);
export const getMyAuthNode = (data = {}) => request.post("getMyAuthNode", data);

export const profile = (data = {}) => request.post("profile", data);
export const handleProfile = (data = {}) => request.post("handleProfile", data);

// 内容管理
export const articleList = (data = {}) =>
  request.post("content/articleList", data);
export const articleHandle = (data = {}) =>
  request.post("content/articleHandle", data);
export const articleDelete = (data = {}) =>
  request.post("content/articleDelete", data);
export const articleDetails = (data = {}) =>
  request.post("content/articleDetails", data);

export const categoryList = (data = {}) =>
  request.post("content/categoryList", data);
export const categoryHandle = (data = {}) =>
  request.post("content/categoryHandle", data);
export const categoryDelete = (data = {}) =>
  request.post("content/categoryDelete", data);

export const tagList = (data = {}) => request.post("content/tagList", data);
export const tagHandle = (data = {}) => request.post("content/tagHandle", data);
export const tagDelete = (data = {}) => request.post("content/tagDelete", data);

// 站点管理
export const webSite = (data = {}) => request.post("configs/webSite", data); //站点配置
export const webSiteHandle = (data = {}) =>
  request.post("configs/webSiteHandle", data); //站点配置

export const roleList = (data = {}) => request.post("configs/roleList", data);
export const rolePermission = (data = {}) =>
  request.post("configs/rolePermission", data);
export const roleHandle = (data = {}) =>
  request.post("configs/roleHandle", data);
export const roleDelete = (data = {}) =>
  request.post("configs/roleDelete", data);

export const userList = (data = {}) => request.post("configs/userList", data);
export const userHandle = (data = {}) =>
  request.post("configs/userHandle", data);
export const userDelete = (data = {}) =>
  request.post("configs/userDelete", data);

// 商品模块
export const goodsCategoryList = (data = {}) =>
  request.post("goods/categoryList", data);
export const goodsCategoryHandle = (data = {}) =>
  request.post("goods/categoryHandle", data);
export const goodsCategoryDelete = (data = {}) =>
  request.post("goods/categoryDelete", data);

export const goodsCategorySonList = (data = {}) =>
  request.post("goods/categorySonList", data);
export const goodsCategorySonHandle = (data = {}) =>
  request.post("goods/categorySonHandle", data);
export const goodsCategorySonDelete = (data = {}) =>
  request.post("goods/categorySonDelete", data);

export const goodsList = (data = {}) => request.post("goods/goodsList", data);
export const goodsHandle = (data = {}) =>
  request.post("goods/goodsHandle", data);
export const goodsDelete = (data = {}) =>
  request.post("goods/goodsDelete", data);

export const companyList = (data = {}) =>
  request.post("company/companyList", data);
export const companyHandle = (data = {}) =>
  request.post("company/companyHandle", data);
export const companyDelete = (data = {}) =>
  request.post("company/companyDelete", data);
export const verifyCompanyInfo = (data = {}) =>
  request.post("company/verifyCompanyInfo", data);

export const callRoleList = (data = {}) => request.post("call/roleList", data); // 角色列表
export const callCategoryList = (data = {}) =>
  request.post("call/categoryList", data); // 分类列表
export const callTagList = (data = {}) => request.post("call/tagList", data); // 标签属性列表
export const uploadSingleImg = (data = {}) =>
  request.post("uploadSingleImg", data); // 上传单图
export const uploadImgs = (data = {}) => request.post("uploadImgs", data); // 上传多图
export const callArea = (data = {}) => request.post("call/area", data); // 省市联动

export const callGoodsCategoryList = (data = {}) =>
  request.post("call/goodsCategoryParentList", data); // 商品大分类调用
export const callGoodsCategoryParentAndSonList = (data = {}) =>
  request.post("call/goodsCategoryParentAndSonList", data); // 商品大小分类调用

// web前端页面请求
export const getSmsCode = (data = {}) => request.post("get/smsCode", data); // 获取短信验证码
export const getPicCode = (data = {}) => request.get("picCode", data); // 更改短信验证码
export const webRegister = (data = {}) => request.post("web/register", data); // 注册

export const getHotKeywords = (data = {}) =>
  request.post("get/hotKeywords", data); // 获取搜索关键词

export const webLogin = (data = {}) => request.post("web/login", data); // 前端登录

export const submitKeywords = (data = {}) =>
  request.post("submit/keywords", data); // banner关键词搜索
