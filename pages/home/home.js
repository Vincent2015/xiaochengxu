Page({
  data: {
    BookName: '',
    Author: '',
    Price: '',
    Location: '',
    array: ['北京', '上海', '济宁', '厦门'],
    index: 0,
    markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  formSubmit: function (e) {
    if (!e.detail.value.BookName) {
      console.log('BookName is Null');
      wx.showToast({
        title: 'BookName is Null',
        duration: 1000
      });
      return false;
    }
    if (!e.detail.value.Author) {
      console.log('Author is Null');
      wx.showToast({
        title: 'Author is Null',
        duration: 1000
      });
      return false;
    }
    if (!e.detail.value.Price) {
      console.log('Price is Null');
      wx.showToast({
        title: 'Price is Null',
        duration: 1000
      });
      return false;
    }
    if (isNaN(parseInt(e.detail.value.Price))){
       wx.showToast({
        title: 'Price is Not Number',
        duration: 1000
      });
      return false;
    }
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    try {
      //         wx.showToast({
      //   title: '保存...',
      //   icon: 'success',
      //   duration: 2000
      // })
      wx.setStorageSync('key', e.detail.value);
      var books = wx.getStorageSync('books');
      if (!books) books = [];
      if (parseInt(this.data.index) > 0) {
        books[parseInt(this.data.index)] = e.detail.value;
      } else {
        books.push(e.detail.value);
      }

      console.log(books);
      wx.setStorageSync('books', books);
      //saveDb(e.detail.value);
    } catch (e) {

    }

    wx.navigateTo({
      url: '../list/list'
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  uploadFile() {
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something
          }
        })
      }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  saveDb: function (obj) {
    var books = wx.getStorageSync('books');
    if (!books) books = [];
    books.push(obj);
    console.log(books);
    wx.setStorageSync('books', books);



  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  onShareAppMessage: function () {
    return {
      title: '早读汇',
      path: '/page/user?id=123',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  onLoad: function (options) {
    console.log(options);
    var index = options.index;
    var books = wx.getStorageSync('books')
    var book = books[index];
    this.setData({ BookName: book.BookName });
    this.setData({ Author: book.Author });
    this.setData({ Price: book.Price });
    this.setData({ Location: book.Location });
    this.setData({ index: index });

  }

})
