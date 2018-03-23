//home.js

const app = getApp();
var dotsFirst = true;
var list;
var page =1;
Page({
  data: {
    array: [],
    typedata:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    is_load_more:false,
    showModal:false,
  },

  getHomeData: function (that){
    page = 1;
    list = null;
    var Page$this = this;
    wx.request({
      url: 'https://www.antleague.com/pets/getAllPetRecordService.action',
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
      fail:function(res){
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

  onPullDownRefresh:function(){
    var Page$this = this;
    this.getHomeData(Page$this);
  },
   /**
     * 弹出框蒙层截断touchmove事件
     */
  preventTouchMove: function () {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    console.log("hide");
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  }
})


