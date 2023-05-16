import './App.css';
import Headding from './Layouts/Headding';
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { useEffect, useRef, useState } from 'react';

function App() {
  const db = getDatabase();
 
  // create Variable
  let [err, seterr] = useState("")
  let [add, setadd] = useState()
  let [Division, setDivision] = useState()
  let [Minus, setMinus] = useState()
  let [Multiplication, setMultiplication] = useState()
  let [total, settotal] = useState(0)
 
  // creaate uesref
  let addref =useRef()
  let Divisionref =useRef()
  let Minusref =useRef()
  let Multiplicationref =useRef()
  
  
  // 
//   useEffect(()=>{
//     const todoref = ref(db, 'Input-Counter/');
//     onValue(todoref, (snapshot) => {
//       const data = snapshot.val();
//       console.log(data);
//       setall(data)
      

//     });

//  }, [])
// button

let handlebutton = ()=>{
  

  // data if funcion
  let data = total
 if(!Divisionref.current.value && !Minusref.current.value && !Multiplicationref.current.value){
  settotal( data + +add)
  seterr("")
 }else if(!addref.current.value && !Minusref.current.value && !Multiplicationref.current.value){
  settotal( data / Division)
  seterr("")
 }else if(!addref.current.value && !Divisionref.current.value && !Multiplicationref.current.value){
  settotal( data - Minus)
  seterr("")
 }else if(!addref.current.value && !Divisionref.current.value && !Minusref.current.value){
  settotal( data * Multiplication)
  seterr("")
 }else{
  seterr("Please one Inputbox")
 }

  }
  return (
    <section className='bg-cyan-400 h-screen'>
      <div className='container mx-auto flex py-40 h-screen'>
        <div className='w-1/2 flex flex-col justify-between'>
          <div className='flex justify-between'>
            <div className='text-center'>
              <Headding title='Add'/>
              <input ref={addref} onChange={(e)=> setadd(e.target.value)}/>
             
            </div>
            <button onClick={handlebutton} className='bg-white px-6'>Button</button>
            <div className='text-center'>
            <Headding title='Division'/>
              <input ref={Divisionref} onChange={(e)=> setDivision(e.target.value)} />
            </div>
          </div>
          <div className='flex justify-center'>
              <div className='text-center'>
              {/* {all.map(item=>(
                <h3>{item.total}</h3>
              ))} */}
                <h2 className='text-white font-extrabold text-4xl' >{total}</h2>
                <h3 className='text-white font-bold text-xl'>{err}</h3>
              </div>
          </div>
          <div className='flex justify-between'>
            <div className='text-center'>
            <Headding title='Minus'/> 
            <input ref={Minusref} onChange={(e)=> setMinus(e.target.value)} />
            </div>
            <div className='text-center'>
             <Headding title='Multiplication'/> 
             <input ref={Multiplicationref} onChange={(e)=> setMultiplication(e.target.value)} />
            </div>
          </div>
        </div>
        <div className='w-1/2 pl-14'>
          <h2 className='text-center font-bold text-xl text-white mb-6'>List</h2>
          <ul>
            <li className='text-white font-medium text-xl'> 10 + 5 = 15</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default App;
