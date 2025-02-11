// 图片上传页面的逻辑
Page({
  data: {
    imagePath: '', // 存储上传的图片路径
    isUploading: false // 控制上传状态的显示
  },
  // 选择或拍摄图片
  chooseImage: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 更新图片路径
        this.setData({
          imagePath: res.tempFilePaths[0]
        });
      }
    });
  },
  // 上传图片
  uploadImage: function() {
    if (!this.data.imagePath) {
      wx.showToast({
        title: '请先选择图片',
        icon: 'none'
      });
      return;
    }
    
    this.setData({ isUploading: true });

    // 真实上传过程
    const filePath = this.data.imagePath;
    wx.uploadFile({
      url: 'https://www.yundaxinxi.cn/api/upload_photo_for_mini_program.php', // 替换为你的服务器域名
      filePath: filePath,
      name: 'file',
      success: (res) => {
        const data = JSON.parse(res.data);
        if (data.success) {
          wx.showToast({
            title: data.message,
            icon: 'success'
          });
          // 立即跳转到处理后的图像接收页
          wx.navigateTo({
            url: '/pages/processed/processed?filePath=' + data.processedImage // 确保使用正确的返回字段
          });
        } else {
          wx.showToast({
            title: data.error,
            icon: 'none'
          });
        }
      },
      fail: (error) => {
        console.error('Upload failed:', error);
        wx.showToast({
          title: '上传失败',
          icon: 'none'
        });
        // 输出更多的错误信息
        console.error('Error details:', error.errMsg);
      },
      complete: () => {
        this.setData({ isUploading: false });
      }
    });
  }
});

function uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('https://www.yundaxinxi.cn/upload', { // 替换为你的服务器地址
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // 处理返回的数据
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
