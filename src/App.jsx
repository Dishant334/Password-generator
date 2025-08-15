import { useState,useCallback,useEffect,useRef } from 'react'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import './App.css'


function App() {
  const [length,setLength] = useState(8) //for length of password which is min 8
  const [number,setNumber]=useState(false)
  const [character,setCharacter]=useState(false)
  const [password,setPassword]=useState("")

  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str+="0123456789"
    if(character) str+="#@$%^&*"

    for(let i=1;i<=length;i++){
      let idx=Math.floor(Math.random() * str.length +1)
      pass +=str.charAt(idx)
    }
     setPassword(pass)
  } 
  , [length,number,character,setPassword])

  const copyPasswordToClip=()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }


  function valuetext(value) {
  return `${value}°C`;
}

  useEffect(()=>{
    passwordGenerator()
  },[length,number,character,passwordGenerator,passwordGenerator])
  return (
    <>
    <div > 
       <TextField 
      label="Password Generator" 
      variant="outlined"
      value={password}
      ref={passwordRef}
      placeholder='Password'
      style={{backgroundColor: "brown", borderRadius: "8px", width: "600px"}}
    />
      <Button variant="contained" style={{height: "55px"}} onClick={copyPasswordToClip}>Copy</Button>

        <Slider
        aria-label="Temperature"
        value={length}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        shiftStep={8}
        step={1}
        marks
        min={8}
        max={20}
        onChange={(e)=>{setLength(e.target.value)}}
      />


 <FormControlLabel control={<Checkbox />} label="Character" onChange={()=>{setCharacter((prev)=>!prev)}} />  
  <FormControlLabel control={<Checkbox/>} label="Number" onChange={()=>{setNumber((prev)=>!prev)}} />
    </div>
      </>
  )
}

export default App
