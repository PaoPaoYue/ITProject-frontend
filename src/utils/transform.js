import {
    upperFirst,
} from 'lodash'

function toSubtitle(text) {
    if (!text) return ''
    return text.split(' ').map(upperFirst).join(' ')
}

function toDateTime(time) {
    return formatDate(time, "yyyy-MM-dd hh:mm")
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

function toLocalTimestamp(time) {
    //time为传入时间戳，毫秒为单位
    let hours = - new Date().getTimezoneOffset() / 60
    //计算格林威治时间和本地时间之间相差几个小时
    let millisecond = hours * 3600000
    //毫秒为单位的时差
    return time + millisecond
}

export {
    toSubtitle, toDateTime, toLocalTimestamp
}