import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  // 配置跨域
  cors: {
    enable: true,
    package: 'egg-cors'
  }
};

export default plugin;
