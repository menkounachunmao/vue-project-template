/**
 * 创建blob对象，并利用浏览器打开url进行下载
 * @param data 文件流数据
 * @param fileName  文件名称
 * @param contentType 文件类型
 */
export function downloadFile(data, fileName, contentType) {
  let blob = new Blob([data], { type: contentType });
  let url = window.URL.createObjectURL(blob);
  // 打开新窗口方式进行下载
  // 以动态创建a标签进行下载
  if (window.navigator.msSaveBlob) {
    // for ie 10 and later
    try {
      window.navigator.msSaveBlob(blob, fileName);
    } catch (e) {
      this.message.showErrorMessage(e);
    }
  } else {
    // 其他浏览器
    let a = document.createElement('a');
    a.href = url;
    a.download = fileName; // 设置行为为下载而不是预览
    let evt = document.createEvent('MouseEvents'); // 解决firefox手动触发点击事件无效
    evt.initEvent('click', true, true);
    a.dispatchEvent(evt);
    window.URL.revokeObjectURL(url);
  }
}
