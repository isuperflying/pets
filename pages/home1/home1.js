//index.js
//获取应用实例
const app = getApp();
var dotsFirst = true;
var list;
var page = 1;

Page({
  data: {
    isShow: true,
    currentTab: 0,
    array: [],
    typedata: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    is_load_more: false,
    showModal: false,
  },

  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  getHomeData: function (that) {
    page = 1;
    list = null;
    var Page$this = this;
    wx.request({
      url: 'https://www.antleague.com/MyPetsServer/getPetList.action',
      method: 'GET',
      data: {
        'page': page
      },
      success: function (res) {
        wx.stopPullDownRefresh();
        list = res.data.data;
        that.setData({
          array: list
        });
      },
      fail: function (res) {
        wx.stopPullDownRefresh()
      }
    })
  },

  onLoad: function () {
    page = 1;
    list = null;
    var Page$this = this;
    this.getHomeData(Page$this);
    wx.setNavigationBarTitle({
      title: '宠宝对对碰'
    })
  },

  onPullDownRefresh: function () {
    var Page$this = this;
    this.getHomeData(Page$this);
  },

  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })
    var Page$this = this;
    page++;
    console.log("page--->" +page);
    wx.request({
      url: 'https://www.antleague.com/MyPetsServer/getPetList.action',
      method: 'GET',
      data: {
        'page': page
      },
      success: function (res) {
        wx.hideLoading()
        list = list.concat(res.data.data);
        Page$this.setData({
          array: list,
          is_load_more: false
        });
      },
      fail: function (res) {
        wx.hideLoading()
        is_load_more: false
      }
    })
    this.setData({
      is_load_more: true
    })
  },

  sendPet:function(){
    wx.navigateTo({
      url: '../sendpet/sendpet'
    })
  }
})