'use strict';

/**
 * 获取本机局域网内的 IP 地址
 */

const os = require('os');

module.exports = function getLocalIp(ns = '本地连接') {
  var nifs = os.networkInterfaces(); // 获取网卡信息
  var _ns = nifs[ns] || [];
  for (var i = 0; i < _ns.length; i++) {
    if (_ns[i].family === 'IPv4') {
      return _ns[i].address;
    }
  }
  return '';
};
