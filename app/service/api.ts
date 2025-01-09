import { Service } from 'egg';
import { IGetNewsListParams, IHttpGetParams, IPageDate, INewsData } from '../../typings';
import { getPageData } from '../lib/utils';

/**
 * Test Service
 */
// export default class Test extends Service {
export default class Api extends Service {
  public async getNewsList({ type, pageNum, count }: IGetNewsListParams): Promise<IPageDate<INewsData>> {
    const { ctx } = this;
    // 默认值设置
    const pageNumber: number = pageNum || 0;  // 第几页
    const pageCount: number = count || 10; // 每页多少条数据

    // 请求数据
    return ctx.httpGet(<IHttpGetParams>{
      url: ctx.app.config.API.GET_NEWS_LIST,
      data: {
        type: type || 'top'
      },
      success(data) {
        // data是返回30条数据，用getPageData按照pageNum和pageCount来切换数据并返回分页数据
        // INewsData 是泛型，调用函数时传入函数内部的变量类型
        return getPageData<INewsData>(data, pageNumber, pageCount)
      },
      fail(err) {
        throw new Error('Request failed' + err)
      }
    })
  }
}
