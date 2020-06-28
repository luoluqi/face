// import Mock from 'mockjs'
// Mock.setup({
//     // timeout: '300-600'
// })
// let user = Mock.mock({
//     account: [
//         {username: 'admin', password: '123456'},
//         {username: 'user', password: '123456'}
//     ]
// })

// Mock.mock(/\/user\/login/, 'post', user)

// let userInfo = Mock.mock({
//     userInfo: {
//         role: ['admin'],
//         userAccount: 'chydream',
//         userName: '驰兮',
//         userId: '1826',
//         pic: './static/img/main/photo.jpg'
//     }
// })
// Mock.mock(/\/user\/userInfo/, 'post', userInfo)

// // 密码修改的mock
// let pwd = Mock.mock({
//     pwd: {password: 123456}
// })
// Mock.mock(/\/user\/chanPwd/, 'post', pwd)

// let purchaseContract = Mock.mock({
//     'list|5': [{
//         'number|+1': 'XDW-CG-2018-023-1',
//         'contract': '2017年南安农业局互联网+智慧农业物联网交互系统咨询服务合同',
//         'contractAmount': '244,000.00',
//         'supplier': '福州鑫同泰信息科技有限公司',
//         'costDepartment': '华南区',
//         'signingDate': '2018-05-24',
//         'signatory': '陈乃义',
//         'state|+1': ['进行中', '未提交']
//     }]
// })

// export var data = Mock.mock(/\.json/, {
//     'list|1-10': [{
//         'id|+1': 1,
//         'email': '@EMAIL'
//     }]
// })

// export default Mock
