import {
  useState
} from 'react'

function RegisterForm() {
  // 非受控两次useRef
  // vue    ref 简单数据类型 /reactive 对象   两种响应式API
  const [from, setFrom] = useState({
    username: "",
    password: ""
  })
  const handleChange = (e) => {
    setFrom({
      ...from,
      [e.target.name]: e.target.value
    })
  }

  <div>
    <input
      name="username"
      value={from.username}
      onChange={handleChange}
      placeholder='请输入用户名'
      type="text" />
    <input
      name="password"
      value={from.password}
      onChange={handleChange}
      placeholder='请输入密码'
      type="text" />
    <button type="submit" onClick={handleSubmit}>提交</button>
  </div>

  return (
    <>
      RegisterForm
    </>
  )
}

export default RegisterForm