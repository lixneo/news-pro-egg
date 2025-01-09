import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

// 配置跨域  允许所有请求都通过
// exports.cors = {
//   origin: '*',
//   allowMethods: 'GET,POST,PUT,DELETE,HEAD,PATCH'
// }

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1614157869311_2389';

  // add your egg config in here
  config.middleware = [];

  // 配置跨域
  config.cors = {
    origin: () => '*',
    allowMethods: 'GET,POST,PUT,DELETE,HEAD,PATCH',
    credentials: true, //跨域拿cookies
  }

  // 配置安全性方面的
  config.security = {
    // csrf安全性攻击，因为是本地开发，为true会出问题，所以我们暂时给它设置为false,先关闭掉先
    csrf: {
      enable: false
    }
  }

  // 配置聚合数据接口地址
  const userConfig = {
    APP_KEY: '6318dadab57758112f37089063842f9a',
    API: {
      GET_NEWS_LIST: 'http://v.juhe.cn/toutiao/index'
    }
  }

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    ...userConfig
  };
};
