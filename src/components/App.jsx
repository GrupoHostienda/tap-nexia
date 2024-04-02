import { useState } from 'react'
import Button from './Button'
import { LuYoutube, LuInstagram } from "react-icons/lu";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='container bg-transparent h-screen p-7 text-blue-900 font-mono'>
      <div className='p-7 grid grid-cols-1 gap-5 h-full'>
      <div class="bg-transparent p-6">
    
    <div class="w-24 h-24 rounded-full overflow-hidden mx-auto">  
      <img class="object-cover w-full h-full" src="images.png" alt=""/>
    </div>
    <div className='justify-center text-center p-4'>
      <h1 className='text-3xl font-bold'>Lorem ipsum</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
  </div>
          <div className='btn-box grid grid-cols-1 gap-6 h-min'>
            <Button></Button>
            <Button></Button>
            <Button></Button>
          </div>
          <div className='flex gap-4 items-center justify-center w-full text-xl'>
          <LuYoutube className='hover:text-2xl'></LuYoutube>
          <LuInstagram className='hover:text-2xl'></LuInstagram>
          </div>
      </div>
    </div>
    </>
  )
}

export default App
