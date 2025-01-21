import { Controller } from 'egg';
import { IGetNewsListParams } from '../../typings';

/**
 * 请求参数列表 { type, pageNum, count }
 */
// export default class HomeController extends Controller {
export default class ApiController extends Controller {
  public async getNewsList(): Promise<void> {
    const { ctx } = this;
    // 从请求体内拿到请求参数
    const { type, pageNum, pageSize }: IGetNewsListParams = ctx.request.body
    // 执行service内的getNewList方法，请求数据
    ctx.body = await ctx.service.api.getNewsList({ type, pageNum, pageSize })
  }
}
