// pages/home/home.js
import {getMultiData, getGoodsData} from '../../service/home.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行','新款','精选'],
    goods: {
      'pop': {page:0, list: []},
      'new': {page:0, list: []},
      'sell': {page:0, list: []},
    },
    currentType: 'pop',
    types: ['pop', 'new', 'sell']
  },

  // -----------------网络请求函数----------------------
  _getMultiData() {
    getMultiData().then(res => {
      const banners = res.data.data.banner.list; 
      const recommends = res.data.data.recommend.list;
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type) {
    // 1.获取页码
    const page = this.data.goods[type].page + 1

    // 2.发送网络请求
    getGoodsData(type, page).then(res => {
      const list = res.data.data.list;

      const oldList = this.data.goods[type].list;
      oldList.push(...list);

      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  },

  // -----------------事件监听函数----------------------
  tabControlClick(e) {
    const index = e.detail.index
    
    const type = this.data.types[index]
    this.setData({
      currentType: type
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.请求轮播图和推荐数据
    this._getMultiData()

    // 2.请求商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 上拉加载更多
    this._getGoodsData(this.data.currentType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})