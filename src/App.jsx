import { useState } from 'react'
// import './App.css'

import router from './router/index'
import { RouterProvider } from 'react-router-dom'

// 这里是整个项目的入口文件

function App() {

  return (
    <div className='app'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
