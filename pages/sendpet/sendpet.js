
var crop_path = '/pages/image/add_img_icon.png';
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
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        var upFilePath = tempFilePaths[0]

        wx.uploadFile({
          url: 'https://www.antleague.com/MyPetsServer/sendPetRecord.action',
          name: 'petFile',
          filePath: upFilePath,
          formData: {
            'id': '1'
          },
          success: function (res) {
            
            //console.log(res.data);
            // var obj;
            // if (typeof res.data === "string") {
            //   obj = JSON.parse(res.data)
            // } else {
            //   obj = res.data;
            // }
            // wx.navigateTo({
            //   url: '../result/result?rimg=' + obj.data + '&title=' + data_files.title
            // })
          },
          fail: function (res) {
            //console.log("create fail--->" + JSON.stringify(res));
          }
        })
      }
    })
  }
})