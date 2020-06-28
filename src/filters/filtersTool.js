// 转换时间
export function converDate (jsondate) {
    var date = new Date(parseInt(jsondate.replace("/Date(", "").replace(")/", ""), 10))
    return date
}