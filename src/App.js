import './App.css';
import Headding from './Layouts/Headding';
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";
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
  let [list, setlist] = useState([])
 
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

    // list
    const listref = ref(db, 'List/');
    onValue(listref, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        arr.push({...item.val(),id:item.key});
      })
      setlist(arr)
    });

  },[])

// del button
let handledel = (id)=>{
  console.log(id);
  remove(ref(db, 'List/'+id))
}

let handlebutton = ()=>{
  // data if funcion
  let data = total
  if(!addref.current.value && !Divisionref.current.value && !Minusref.current.value && !Multiplicationref.current.value){
    seterr("Please give me input box your data")
  }else if(!Divisionref.current.value && !Minusref.current.value && !Multiplicationref.current.value){
  let alldata = data + +add
  settotal(alldata)
  seterr("")
  set(ref(db, 'input-counter/'), {
    task: alldata
  });
  set(push(ref(db, 'List/')), {
    list: `${data} + ${add} = ${alldata}`
  });
 
 }else if(!addref.current.value && !Minusref.current.value && !Multiplicationref.current.value){
  if(Divisionref.current.value > data){
    seterr("Please add input your number")
  }else{
    let alldata = data / Division
    settotal(alldata)
    set(ref(db, 'input-counter/'), {
      task: alldata
    });
    set(push(ref(db, 'List/')), {
      list: `${data} / ${Division} = ${alldata}`
    });
    seterr("")
  }
 }else if(!addref.current.value && !Divisionref.current.value && !Multiplicationref.current.value){
  let alldata = data - Minus
  settotal(alldata)
  set(ref(db, 'input-counter/'), {
    task: alldata
  });
  set(push(ref(db, 'List/')), {
    list: `${data} - ${Minus} = ${alldata}`
  });
  seterr("")
 }else if(!addref.current.value && !Divisionref.current.value && !Minusref.current.value){
  if(Multiplicationref.current.value > data){
    seterr("Please add input your number")
  }else{
    let alldata = data * Multiplication
    settotal(alldata)
    set(ref(db, 'input-counter/'), {
      task: alldata
    });
    set(push(ref(db, 'List/')), {
      list: `${data} * ${Multiplication} = ${alldata}`
    });
  }
 
 }else{
  seterr("Please give me one Inputbox data")
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
          <h2 className='text-center font-bold text-xl text-white mb-6'>List History</h2>
          <ol className='list-decimal'>
            {list.map((item, index)=>(
              <li key={index} className='text-white font-medium text-xl'>{item.list} <button className='border border-white text-red-500 px-4 text-base' onClick={()=> handledel(item.id)}>Delet</button></li>
            ))}
            
          </ol>
        </div>
      </div>
    </section>
  );
}

export default App;
