function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error')
    return [];
  }
  let res = [];
  obj = new Map();  // hasMap
  for (let i = 0; i < arr.length; i++) {
    if (!obj.get(arr[i])) {
      res.push(arr[i]);
      obj.set(arr[i], 1);
    } else {
      obj.set(arr[i], obj.get(arr[i]) + 1);
    }
  }
  return res;
}
console.log(unique([1, 2, 3, 2, 5]));