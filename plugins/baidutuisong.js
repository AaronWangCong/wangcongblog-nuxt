export default () => {
  var bp = document.createElement('script');
  var curProtocol = window.location.protocol.split(':')[0];
  if (curProtocol === 'https') {
      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
  }
  else {
      bp.src = 'http://push.zhanzhang.baidu.com/push.js';
  }
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bp, s);

  var s2 = document.getElementsByTagName("script")[1];
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?4669ca31a1d80c8746d9397110bbd0db";
  s2.parentNode.insertBefore(hm, s2);
}