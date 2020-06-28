// import Mock from 'mockjs'
let menu = {
  SchoolAdmin: [
  
    {
      id: 1,
      label: '宿舍考勤报表',
      href: '/dorm/count',
      icon: 'fa fa-area-chart',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: []
    },
    {
      id: 2,
      label: '考勤时间管理',
      href: '/dorm/time',
      icon: 'fa fa-clock-o',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: []
    },
    {
      id: 3,
      label: '宿舍WIFI管理',
      href: '/dorm/wifi',
      icon: 'fa fa-wifi',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: []
    },
    {
      id: 4,
      label: '考勤数据来源',
      href: '/dorm/source',
      icon: 'fa fa-database',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: []
    },
    {
      id: 5,
      label: '宿舍信息管理',
      href: '/dorm/dorm',
      icon: 'fa fa-home',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: []
    },
    {
      id: 6,
      label: '住宿生信息管理',
      href: '/dorm/stubed',
      icon: 'fa fa-user',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: []
    },
    {
      id: 7,
      label: '宿舍列表',
      href: '/dorm/roomList',
      icon: 'fa fa-file-text',
      permission: ['view', 'add', 'delete', 'edit'],
      show: false,
      children: []
    }
  ],
  Teacher: [ 
  ],
  user: [
    {
        id: 1,
        label: '首页',
        href: '/index/home',
        icon: 'fa fa-home',
        permission: ['view', 'add', 'delete', 'edit'],
        show: true,
        children: []
    }
  ]
}
menu.Teacher = menu.SchoolAdmin
// Mock.mock(/\/user\/menu/, 'post', menu)
export default menu
