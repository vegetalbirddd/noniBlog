// deepcop 深拷贝

const deepcopy = function(obj) {
    let res = {}
    for(key in obj) {
        res[key] = typeof obj[key] === 'object' ? deepcopy(obj[key]) : obj[key]
    }
    return res;
}

// 解析URL参数为对象
function parseParams(url) {
    
}