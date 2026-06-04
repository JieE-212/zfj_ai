let friend = []

async function loadDate() {
  // console.log('loadDate');
  // endpoint
  const endpoint = 'http://localhost:3000/friend'
  // 异步变同步
  const res = await fetch(endpoint)
  const data = await res.json()
  return data
  await fetch(endpoint)
    // 等待响应返回
    // 响应体是json二进制字符串 转换为json对象
    .then(res => res.json())
    // 处理json对象
    .then(data => {
      console.log(data);
    })
}
function renderData(friends) {
  console.log('renderData');
  const oBody = document.querySelector('table body')
  if (friends.length > 0) {
    oBody.innerHTML = friends.map(function(friend) {
      console.log(friend);
      return`<tr>
        <td>${friend.id}</td>
        <td>${friend.name}</td>
        <td>${friend.age}</td>
      </tr>`
    }).join('')
  }
}
async function init() {
  console.log('init start');
  const friends = await loadDate()
  console.log(friends);
  renderData(friends);
}
init();
// console.log('init end');