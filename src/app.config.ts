import { AppConfig } from 'remax/wechat'

const config: AppConfig = {
  pages: ['pages/index/index', 'pages/guide/guide', 'pages/course/course'],
  window: {
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#ededed',
  },
  style: 'v2',
}

export default config
