import { useState} from 'react'
import './App.css'
import bmi2 from './assets/bmi2.jpg'

function App() {
  const[height,setHeight]=useState("");
  const[weight,setWeight]=useState("");
  const[bmi,setBmi]=useState(null);
  const[status,SetStatus]=useState("");
  const[errorMsg,setErrorMsg]=useState("");
  const [advice,setAdvice]=useState("")

  const bmiCalculate=()=>{
    const isValidHeight=/^\d+$/.test(height)
    const isValidWeight=/^\d+$/.test(weight)

    if(isValidHeight && isValidWeight){
      const heightMeter=height/100;
      const bmiValue=weight/(heightMeter*heightMeter);
      setBmi(bmiValue.toFixed(2))

      if(bmiValue<18.5){
        SetStatus("UnderWeight")
      }
      else if(bmiValue>=18.5 && bmiValue<24.9){
        SetStatus("Normal Weight");
      }
      else if(bmiValue>=25&&bmiValue<29.9){
        SetStatus("Over Weight");
      }
      else{
        SetStatus("Obese");
      }
      setErrorMsg("");
      quote()
    }
    else{
      setBmi(null)
      SetStatus("")
      setErrorMsg("Please Enter a valid numeric values (Height & Weight)")
    }
  };


  const clearAll = ()=>{
    setHeight("");
    setWeight("");
    setBmi(null);
    SetStatus("");
    setAdvice("")
  };
  const isClearButtonEnabled = height !== '' || weight !== '';

  async function quote(){
    try{
        const response=await fetch('https://api.quotable.io/random');
        const api=await response.json()
        
        setAdvice(api.content);
    }catch(error){
        console.error("Fetching Error",error)
        setTimeout(()=>setAdvice("Fetching error...Please check your internet connection"),100)
    
    }
        
    }


  return (
    <>
    
     <div className="bmi-container">
    

      <div className="bmi-image">
    <img src={bmi2} alt="" />
    <p className='advice1'>{advice}</p>

      </div>
      <div className="bmi-details">
        <h1>Bmi calculator</h1>
        {errorMsg &&
        <p className='error'>{errorMsg}</p>
        }
        <div className="input-details">
          <div className="input-container">
        <label htmlFor="height">Height (cm) :</label>
        <input type="text" id='height'value={height} onChange={(e)=>setHeight(e.target.value)} />
          </div>
        <div className="input-container">
        <label htmlFor="weight">Weight (kg) :</label>
        <input type="text" id='weight' value={weight} onChange={(e)=>setWeight(e.target.value)}/>
        </div>
        </div>
        <button  onClick={bmiCalculate}>BMI Calculate</button>
        <button  onClick={clearAll} disabled={!isClearButtonEnabled}>Clear</button>

        

        {bmi !== null && (
          <div className="result">
          <p>Your BMI is: {bmi}</p>
          <p>Status: {status}</p>
        </div>
        )}
    <p className='advice2'>{advice}</p>


      </div>
     </div>
    </>
  )
}

export default App
