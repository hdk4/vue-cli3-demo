import Mock from 'mockjs'
const Random = Mock.Random

Mock.setup({
  timeout: '500'
})

// 封装分页数据
function genRandomPageData(rules, total, pageSize = 10) {
  let pages, num
  if (!total) {
    total = Random.natural(1, 120)
  }
  pages = Math.ceil(total / pageSize);
  if (pages === 1) {
    num = Random.natural(1, pageSize)
  } else {
    num = pageSize
  }
  const data = [];
  for (let i = 0; i < num; i++) {
    data.push(Mock.mock(rules))
  }
  return {
    code: 0,
    data: data,
    pages: pages,
    total: total
  }
}

Mock.mock(/menus/, 'get', genRandomPageData({
  id: '@increment',
  chairCode: '@string',
  'useTime|1': ['2', '3', '5', '10'],
  'factAmount|1': '@float(0, 100, 2, 2)',
  useQty: '@integer(1, 10)',
  orgDriver: {
    id: '@increment',
    'levels|1': ['1', '2', '3'],
  },
  orgAgent: {
    id: '@increment',
    'levels|1': ['1', '2', '3'],
  },
}))

Mock.mock(/queryDetailRecords/, 'post', genRandomPageData({
  id: '@increment',
  'orderNo': '@string("lower",32)',
  'payTime': +Mock.Random.date('T'),
  'useTime|1': ['2', '3', '5', '10'],
  'factAmount|1': '@float(0, 100, 2, 2)',
  amount: '@integer(1, 100)',
  useQty: '@integer(1, 10)'
}))

Mock.mock(/queryWithPage/, 'post', genRandomPageData({
  id: '@increment',
  chairCode: '@string',
  'useTime|1': ['2', '3', '5', '10'],
  'factAmount|1': '@float(0, 100, 2, 2)',
  useQty: '@integer(1, 10)',
  'chairList|1-10': [{ 'chairCode|+2': 1, 'id|20-30': 100 }],
  'agentId|1': ['', '2']
}))

Mock.mock(/save|update|disable|enable|get/, 'post', {
  code: '0',
  data: 'success'
})

Mock.mock(/save|update|disable|enable|get/, 'put', {
  code: '0',
  data: 'success'
})

Mock.mock(/save|update|disable|enable|get/, 'delete', {
  code: '0',
  data: 'success'
})

export default Mock
