import { IPageDate } from "../../typings";

/* 判断数据类型 */
function typeOf(value: string): string {
    if (value === null) return 'null';

    return typeof(value) === 'object' ? {
        '[object Object]': 'Object',
        '[object Array]': 'Array'
    }[{}.toString.call(value)] : typeof(value);
}

/* 将参数组装到url地址栏后面 */
function formatParams(data: any, appkey: string): string {
    if (typeOf(data) !== 'Object') {
        throw new Error('Option "data" must be a type Object');
    }

    let paramStr: string = '?';
    for(let key in data) {
        paramStr += `${key}=${data[key]}&`;
    }

    return appkey ? paramStr + 'key=' + appkey : paramStr.slice(0, -1);
}

/* 分页 */
function getPageData<T>(data: Array<T>, pageNum: number, count: number): IPageDate<T> {
    const retInfo: IPageDate<T> = {
        hasMore: true,
        data: []
    }

    // data的长度小于每页条数，证明只有一页
    if(data.length <= count) {
        retInfo.data?.concat(data);
        retInfo.hasMore = false;
    } else {
        // 获取页数，总共有多少页
        const pageTotal: number = Math.ceil(data.length / count);
        // 页码大于等于页数时，证明不可能有数据了
        if(pageNum >= pageTotal) { 
            retInfo.data = null;
            retInfo.hasMore = false
        } else {
            // 页码小于页数，证明多页，就要切分数据，返回对应页码和条数的数据
            retInfo.data = data.splice(pageNum * count, count)
            retInfo.hasMore = true;
        }
    }

    return retInfo
}

export {
    typeOf,
    formatParams,
    getPageData
}