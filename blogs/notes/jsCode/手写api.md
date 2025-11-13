### 深拷贝

```js
const deepcopy = function(obj) {
    let res = {}
    for(key in obj) {
        res[key] = typeof obj[key] === 'object' ? deepcopy(obj[key]) : obj[key]
    }
    return res;
}
```