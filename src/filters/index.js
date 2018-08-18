// 数字转千分符
export function toThousand(v, sep = ',') {
  if (Number(v)) {
    return String(v).trim().replace(/^(\d+)((\.\d+)?)$/, function (_, a, b) {
      return a.replace(/(\d)(?=(?:\d{3})+$)/g, function (x) { return x + sep }) + b;
    });
  }
  // 数值换转失败则原值返回
  return v;
}

// 数值转百分比
export function toPercent(v, def = '0.00%') {
  const num = Number(v);
  if (num) {
    return (num * 100).toFixed(2) + '%';
  } else {
    return def;
  }
}

// 货币显示
export function toMoney(v = 0, prefix = '￥', suffix = '元') {
  return `${prefix} ${toThousand(v)} ${suffix}`
}
export function toMoney2(v = 0, prefix = '￥', suffix = '元') {
  return `${prefix} ${v} ${suffix}`
}

// 分转货币
export function cent2Money(v = 0, prefix = '￥', suffix = '元') {
  return `${prefix} ${(Number(v) / 100).toFixed(2)} ${suffix}`
}

// 日期时间的格式化处理
export function dateFormat(v, format = 'YYYY-MM-DD') {
  let _date = v instanceof Date ? v : new Date(/^\d+$/.test(v) ? +v : v);
  let _time = _date.getTime();

  if (isNaN(_time) && typeof v === 'string') {
    // 尝试修复 2018-08-01T00:00:00
    v = v.replace(' ', 'T');
    _date = new Date(v);
    _time = _date.getTime();

    if (isNaN(_time)) {
      // 2018-05-07T03:43:27.000+0000
      // 标准化时间字符串 YYYY-MM-DDTHH:mm:ss.sssZ
      _date = new Date(v.substr(0, v.length - 5) + 'Z');
      _time = _date.getTime();
    }
  }

  if (isNaN(_time)) {
    return v; // 解析失败返回原值
  }

  let ret = format;

  var o = {
    'M+': _date.getMonth() + 1, // month
    'd+': _date.getDate(), // day
    'D+': _date.getDate(), // day
    'H+': _date.getHours(), // hour
    'h+': _date.getHours(), // hour
    'm+': _date.getMinutes(), // minute
    's+': _date.getSeconds(), // second
    'S': _date.getMilliseconds() // millisecond
  };

  // 年份处理
  ret = ret.replace(/y+/i, function (year) {
    return ('' + _date.getFullYear()).substr(4 - year.length);
  });

  // 其他格式化处理
  for (var k in o) {
    ret = ret.replace(new RegExp(k), function (v) {
      // 补零操作
      if (v.length > 1) {
        return ('00' + o[k]).substr(('' + o[k]).length);
      }
      return o[k];
    });
  }

  return ret;

}
