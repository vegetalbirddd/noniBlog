// GPT给的版本，可以学习
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj

  if (map.has(obj)) return map.get(obj)

  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags)

  if (obj instanceof Map) {
    const res = new Map()
    map.set(obj, res)
    obj.forEach((v, k) => {
      res.set(deepClone(k, map), deepClone(v, map))
    })
    return res
  }

  if (obj instanceof Set) {
    const res = new Set()
    map.set(obj, res)
    obj.forEach(v => res.add(deepClone(v, map)))
    return res
  }

  const result = Object.create(Object.getPrototypeOf(obj))
  map.set(obj, result)

  Reflect.ownKeys(obj).forEach(key => {
    result[key] = deepClone(obj[key], map)
  })

  return result
}

// 掘金找的，面试可以用
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
let obj = { name: 1, address: { x: 100 } };
obj.o = obj; // 对象存在循环引用的情况
let d = deepClone(obj);
obj.address.x = 200;
console.log(d);

function myInstanceof(obj, type) {
    if (obj === null || typeof obj !== 'object' && typeof obj !== 'function' ) return false
    let proto = Object.getPrototypeOf(obj)
    let prototype = type.prototype
    while(proto !== null) {
        if (proto === prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
    return false
}