import React from 'react'

function Single_choice({JSONobj, setJSONobj, counter, setCounter, updateJSON}) {



  return (
    <div className='container_question'>
    <p className='form_p' >{JSONobj[counter].title}</p>
    <div className='flex_container-choice' >
      {
        JSONobj[counter].answer.map((ans, id)=>{
          return(
          <button className={JSONobj[counter].chosenFromTheUserId===id ?'single_choice-selected': 'single_choice'} onClick={()=>{
            let newArr = [...JSONobj]; // copia dati vecchi
            newArr[counter].chosenFromTheUserId = id; // aggiorna i dati che sivogliono aggiornare
            setJSONobj(newArr) 
          }} >
            <p className='single_choice-p'>{ans}</p>
            {JSONobj[counter].icon[id]}
          </button>
          )
        })
      }
    </div>
    <div className='button_div_survey' >
    {
        counter !==0 ?(
          <button className='button_cta-goback' onClick={()=> {
            setCounter(prev=> counter === 0 ? prev : prev-JSONobj[counter].backCounter)
            
            }} >
            Indietro
          </button>
        ):(
          <div></div>
        )

      }
    <button className='button_cta' onClick={()=> updateJSON()}>
      {JSONobj[counter].buttonNext}
    </button>
      </div>
    <p className='container_error' ></p>
  </div>
    )
}

export default Single_choice