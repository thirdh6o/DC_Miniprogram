Page({
  data: {
    processedImagePath: '', // 存储处理后的图片路径
    isProcessing: true // 控制处理状态的显示
  },
  onLoad: function(options) {
    // 假设从上一页面传递的路径是相对路径
    const imagePath = options.filePath; // 使用 filePath 接收处理后的图片路径

    // 如果接收到路径，则拼接成完整的URL
    if (imagePath) {
      const serverUrl = "https://www.yundaxinxi.cn/"; // 服务器的基础URL
      const fullImagePath = serverUrl + imagePath; // 拼接路径
      this.setData({
        processedImagePath: fullImagePath, // 设置完整路径
        isProcessing: false // 图片处理完毕，显示图片
      });
    } else {
      wx.showToast({
        title: '未接收到处理后的图片',
        icon: 'none'
      });
    }
  },
  // 重新上传图片
  reuploadImage: function() {
    wx.navigateBack();
  }
});
