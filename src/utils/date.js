export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

export function publishDate(date) {
    let curTime = new Date();
    let postTime = new Date(date);
    let timeDiff = curTime.getTime() - postTime.getTime();


    // 单位换算
    let min = 60 * 1000;
    let hour = min * 60;
    let day = hour * 24;
    let month = day * 7 * 30;

    // 计算发布时间距离当前时间的周、天、时、分
    let exceedMonth = Math.floor(timeDiff / month);
    let exceedDay = Math.floor(timeDiff / day);
    let exceedHour = Math.floor(timeDiff / hour);
    let exceedMin = Math.floor(timeDiff / min);

    // 最后判断时间差到底是属于哪个区间，然后return
    if (exceedMonth > 0) {
        return formatDate(postTime, 'yyyy年MM月dd日');
    } else {
        if (exceedDay < 30 && exceedDay > 0) {
            return exceedDay + '天前';
        } else {
            if (exceedHour < 24 && exceedHour > 0) {
                return exceedHour + '小时前';
            } else {
                return exceedMin + '分钟';
            }
        }
    }

}