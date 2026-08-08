import { useContext } from 'react'
import Child from './Child'
import { ThemeContext } from '../ThemeContext'

const Page = () => {
  const theme = useContext(ThemeContext)
  console.log(theme)
  return (
    <>
      Page {theme}
      <Child />
    </>
  )
}

export default Page
