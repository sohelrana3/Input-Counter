import './App.css';
import Headding from './Layouts/Headding';

function App() {
  return (
    <section className='bg-cyan-400 h-screen'>
      <div className='container mx-auto flex py-40 h-screen'>
        <div className='w-1/2 flex flex-col justify-between'>
          <div className='flex justify-between'>
            <div className='text-center'>
              <Headding title='Add'/>
              <input />
            </div>
            <button className='bg-white px-6'>Button</button>
            <div className='text-center'>
            <Headding title='Division'/>
              <input />
            </div>
          </div>
          <div className='flex justify-center'>
              <div className='text-center'>
                <h2 className='text-white font-extrabold text-4xl'>0</h2>
                <h3 className='text-white font-bold text-xl'>Erro</h3>
              </div>
          </div>
          <div className='flex justify-between'>
            <div className='text-center'>
            <Headding title='Minus'/> 
              <input />
            </div>
            <div className='text-center'>
             <Headding title='Multiplication'/> 
              <input />
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
