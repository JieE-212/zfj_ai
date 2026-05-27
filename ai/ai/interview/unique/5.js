function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error')
    return [];
  }
  let res = [];
  obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      res.push(arr[i]);
      obj[arr[i]] = 1;
    } else {
      obj[arr[i]]++;
    }
  }
  return res;
}
console.log(unique([1, 2, 3, 2, 5]));