
var crop_path = '/pages/image/add_img_icon.png'
var upFilePath
Page({
  data: {
    cimg: '',
    position: 0,
    cinput: false,
    flag_input: false,
    add_img: crop_path,
    swidth: 0,
    sheight: 0
  },
  onLoad:function(){
    wx.setNavigationBarTitle({
      title: '发帖',
    })
  },
  selectImage:function(){
    var Page$this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        upFilePath = tempFilePaths[0]
        Page$this.setData({
          add_img: upFilePath
        })
      }
    })
  },
  formSubmit:function(e){
    
    let title = e.detail.value.pet_title;
    let content = e.detail.value.pet_content;

    if (!title) {
      wx.showToast({
        title: '请输入标题',
      })
      return;
    }

    if (!content) {
      wx.showToast({
        title: '请输入内容',
      })
      return;
    }

    if (!upFilePath){
      wx.showToast({
        title: '请选择图片',
      })
      return;
    }

    wx.showLoading({
      title: '保存中',
    })

    wx.uploadFile({
      url: 'https://www.antleague.com/MyPetsServer/sendPetRecord.action',
      name: 'petFile',
      filePath: upFilePath,
      formData: {
        'id': '1'
      },
      success: function (res) {
        
        var obj;
        if (typeof res.data === "string") {
          obj = JSON.parse(res.data)
        } else {
          obj = res.data;
        }

        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
          success:function(){
            if (obj.data == "success") {
              wx.navigateTo({
                url: '../home1/home1'
              })
            }
          }
        })
        
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: '发布失败'
        })
      }
    })
  }
})