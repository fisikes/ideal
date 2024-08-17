import { useState } from 'react'
import Run from './components/Run'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Run></Run>
    </>
  )
}

export default App
