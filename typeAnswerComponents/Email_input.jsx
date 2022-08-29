import React, {useState} from 'react'
import { MdOutlineMarkEmailRead } from "react-icons/md";
import '../App.css'

const Email_input = ({state, setState, counter, setCounter}) => {
  // response era lo state che mi memorizzava l'errore che veniva resituito dal server e mandato a display
  const [response, setResponse] = useState(false)
  // email è lo state che mi salva il valore della mail
  const [email, setEmail] = useState('')


    const handleChangeEmail = async (e) => {
        setEmail(e.target.value)
      }

      const updateEmail = async() => {
        let newArr = [...state]; // copia vecchi dati in questo array
        newArr[counter+1].backCounter = 1  // la propietà backCounter della domanda dopo verrà aggiornata a cursorInc
        setState(newArr) 
        // incremento del counter
        setCounter(prev=>  prev+state[counter].cursorIncrement)
    
      }
  return (
    <div className='container_question'>
    <p className='form_p' > {state[counter].title}</p>
    <div className='input_email' >
      <div className='icon_placeholder' ><MdOutlineMarkEmailRead className='icon_background' /></div>
      <input className='input_style' placeholder="Inserisci la tua email" type="text" onChange={handleChangeEmail} />
    </div>
    <div className='button_div_survey' >
      {
        counter !==0 ?(
          <button className='button_cta-goback' onClick={()=> setCounter(prev=> counter === 0 ? prev : prev)} >
            Indietro
          </button>
        ):(
          <div></div>
        )

      }
      <button className='button_cta' onClick={()=>{ 
        updateEmail()
        }} >
        {state[counter].buttonNext}
      </button>
    </div>
    {
      response.pass == false ? (
        <p className='container_error' >{response.err}</p>
      ):(
        <p className='container_error' ></p>
      )
    }
  </div>
  )
}

export default Email_input