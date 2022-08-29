import React,{useState} from 'react'

function Open_question({JSONobj, setJSONobj, counter, setCounter}) {
  // textArea è lo state che mi salva il valore della textArea typeAnswer= open_question
  const [textArea, setTextArea] = useState('')

  const handleChangeTextArea = async (e) => {
    setTextArea(e.target.value)
    }
  return (
    <div className='container_question'>
    <p className='form_p' >{JSONobj[counter].title}</p>
    <div className='flex_container-single_choice-sentence' >
    <textarea  className='input_style-open_question'  placeholder="Scrivi la tua risposta" type="text" onChange={handleChangeTextArea}>{JSONobj[counter].chosenFromTheUser}
    </textarea>

      <div className='button_div_single_choise-sentence' >
    {
        counter !==0 ?(
          <button className='button_cta-goback' onClick={()=> setCounter(prev=> counter === 0 ? prev : prev -JSONobj[counter].backCounter)} >
            Indietro
          </button>
        ):(
          <div></div>
        )

      }
    <button className='button_cta' onClick={()=> {
      JSONobj[counter].chosenFromTheUser = textArea;
      setTextArea('')
      setCounter(prev=> prev+JSONobj[counter].cursorIncrement)
      JSONobj[counter+JSONobj[counter].cursorIncrement].backCounter = JSONobj[counter].cursorIncrement
    }} >
      
      {JSONobj[counter].buttonNext}
    </button>
      </div>
      </div>

    <p className='container_error' ></p>
  </div>  )
}

export default Open_question