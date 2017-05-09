Page({
 data: {
    books: [],
  },
  onLoad: function () {
    var value=this.books = wx.getStorageSync('books');
    console.log('onLoad');
    console.log(value)
    this.setData({'books':value})
   
  },
  onShareAppMessage: function () {
    return {
      title: '早读汇',
      path: '/page/user?id=123',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },
  editBook:function(item){
    var index = item.currentTarget.dataset.id; 
     wx.navigateTo({
      url: '../home/home?index='+index
    })
  }

})