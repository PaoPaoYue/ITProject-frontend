import {
    upperFirst,
} from 'lodash'

function toSubtitle(text) {
    if (!text) return ''
    return text.split(' ').map(upperFirst).join(' ')
}

function formatDate(value, fmt) {
    let getDate = new Date(value);
    let o = {
        'M+': getDate.getMonth() + 1,
        'd+': getDate.getDate(),
        'h+': getDate.getHours(),
        'm+': getDate.getMinutes(),
        's+': getDate.getSeconds(),
        'q+': Math.floor((getDate.getMonth() + 3) / 3),
        'S': getDate.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt;
}

function getGLWZTime(time){
    //time为传入时间戳，毫秒为单位
    let hours = new Date().getTimezoneOffset() / 60
    //计算格林威治时间和本地时间之间相差几个小时
    let millisecond = hours * 3600000
    //毫秒为单位的时差
    let standardTime = time + (8 * 3600000)
    //标准时间戳 = 传入时间戳 + 北京与格林威治的时差（传入时间戳以北京为基础）
    let currentZone = standardTime + millisecond
    // 当前时区时间 =  标准时间戳 + 本地与格林威治时差
    return currentZone
}
function getAustraliaTime(time){
    //time为传入时间戳，毫秒为单位
    let hours = new Date().getTimezoneOffset() / 60
    //计算格林威治时间和本地时间之间相差几个小时
    let millisecond = hours * 3600000
    //毫秒为单位的时差
    let standardTime = time + (27 * 3600000)
    //标准时间戳 = 传入时间戳 + 北京与格林威治的时差（传入时间戳以北京为基础）
    let currentZone = standardTime + millisecond
    // 当前时区时间 =  标准时间戳 + 本地与格林威治时差
    return currentZone
}
export {
    toSubtitle, formatDate, getGLWZTime,getAustraliaTime
}