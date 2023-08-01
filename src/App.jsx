import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
const BASE_URL = "http://localhost:8080/todos"

function App() {
  const [array, setArray] = useState([])
  const [value, setValue] = useState("")

  function getTodos() {
    axios
    .get(BASE_URL)
    .then((res) => res)
    .then((data) => setArray(data.data))    
  }

useEffect(()=>{
  getTodos();
},[])


console.log(array);
const handleSubmit = (e)=>{
  
   e.preventDefault();
  if(value.length > 0){
    axios
    .post(BASE_URL, {userId: 1, title: value, completed: false})
    .then((req) => { setArray([...array, req.data])})
  }
  value = ""
}
const handleDelete = (id)=>{
    console.log(id);
      axios
      .delete(`${BASE_URL}/${id}`)
      .then(res => setArray(array?.filter((item) => item.id !== id)))
     
}


const handleChacked = (item)=>{
  console.log(item)
  axios
  .patch(`${BASE_URL}/${item.id}`, {...item,completed:!item.completed})
  .then((res) => { getTodos()})
}


console.log(array);


  return (
    <>
    <div className='mx-auto my-10 bg-slate-200 p-5'>
      <form className='border border-blue-500 w-[600px] flex justify-between mb-5' onSubmit={handleSubmit}>
        <input className='border border-r-blue-500 text-lg px-8 py-2 mr-5  bg-slate-400 p-5 ring-0 placeholder-white' type="text" placeholder="Write something" onChange={(e) => setValue(e.target.value)}/>
        <button className='border border-l-blue-500 text-lg px-8 py-2 hover:bg-blue-600 hover:text-white bg-slate-400'>Add</button>
      </form>
     
      <div>
        {
          array?.map((item)=>(
            <div className='w-[600px] flex justify-between items-center mb-3' key={item.id}>
            <form className='w-[90%] flex'onChange={()=>handleChacked(item)} >
            <input type="checkbox" id={`checking-${item.id}`}/>
            <label className={`text-lg ml-4 block w-[100%] ${item.completed === true ? "line-through" : ""}`} htmlFor={`checking-${item.id}`} >{item.title}</label>
            </form>
            <button className='border text-lg px-6 py-1 hover:bg-red-600 hover:text-white' onClick={()=>handleDelete(item.id)}>Delete</button>
          </div>
          ))
        }
      </div>
    </div>
    </>
  )
}

export default App
