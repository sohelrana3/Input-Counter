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
  let [firdata, setfirdata] = useState()
 
  // creaate uesref
  let addref = useRef()
  let Divisionref = useRef()
  let Minusref = useRef()
  let Multiplicationref = useRef()
  
  
  useEffect(()=>{
    const starCountRef = ref(db, 'input-counter/');
    onValue(starCountRef, (snapshot) => {
    snapshot.forEach((item)=>{
      console.log(item.key, "=",item.val());
      settotal(item.val())
    })
});

  },[])

// button

let handlebutton = ()=>{
  // data if funcion
  let data = total
 if(!Divisionref.current.value && !Minusref.current.value && !Multiplicationref.current.value){
  let aldata = data + +add
  settotal(aldata)
  seterr("")
  set(ref(db, 'input-counter/'), {
    task: aldata
  });
  set(push(ref(db, 'List/')), {
    list: aldata
  });
  
 }else if(!addref.current.value && !Minusref.current.value && !Multiplicationref.current.value){
  if(Divisionref.current.value > data){
    seterr("Please add input your number")
  }else{
    let aldata = data / Division
    settotal(aldata)
    set(ref(db, 'input-counter/'), {
      task: aldata
    });
    set(push(ref(db, 'List/')), {
      list: aldata
    });
    seterr("")
  }
 }else if(!addref.current.value && !Divisionref.current.value && !Multiplicationref.current.value){
  let aldata = data - Minus
  settotal(aldata)
  set(ref(db, 'input-counter/'), {
    task: aldata
  });
  set(push(ref(db, 'List/')), {
    list: aldata
  });
  seterr("")
 }else if(!addref.current.value && !Divisionref.current.value && !Minusref.current.value){
  if(Divisionref.current.value > data){
    seterr("Please add input your number")
  }else{
    let aldata = data * Multiplication
    settotal(aldata)
    set(ref(db, 'input-counter/'), {
      task: aldata
    });
    set(push(ref(db, 'List/')), {
      list: Multiplication
    });
  }
 
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
