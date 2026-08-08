import {
  useState
} from 'react'
// 受控组件 (受响应式状态控制input)
// 收集用户的输入的

function ControlledInput() {
  const [value, setValue] = useState('')
  return (
    <>
      ControlledInput
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
    </>
  )
}
export default ControlledInput