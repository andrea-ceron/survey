import React,{useState} from 'react'

function Multi_choice_sentence({JSONobj, setJSONobj, counter, setCounter}) {
    // salva l'array di stringhe delle risposte typeAnswer= multi_choice-sentence
    const [multiChoise, setMultiChoise] = useState([])

  return (
    <div className='container_question'>
    <p className='form_p' >{JSONobj[counter].title}</p>
    <div className='flex_container-single_choice-sentence' >
      {
        JSONobj[counter].answer.map((ans, id)=>{

          const found = multiChoise.find(element => element === JSONobj[counter].answer[id]);
          
          return(
            <span className='radio_outer_container' >
            <div className='radio_space' >
              <span className='circle' >
                <span className={found!== undefined?'inner_circle-focus': 'inner_cirlce'} > </span>
              </span>
            </div>
              <button className={found!==undefined?'radio_container-focus': 'radio_container'} onClick={()=>{
                let result= multiChoise.filter(word => word === JSONobj[counter].answer[id]);
                if(result.length===0){
                  setMultiChoise(prev=>[...prev,  JSONobj[counter].answer[id]])
                }
                else{
                  setMultiChoise(multiChoise.filter(word => word !== JSONobj[counter].answer[id]));
                }
                }} >
                {ans}
              </button>
            </span>
      )})}
      <div className='button_div_single_choise-sentence' >
    {
        counter !==0 ?(
          <button className='button_cta-goback' onClick={()=> setCounter(prev=> counter === 0 ? prev : prev-JSONobj[counter].backCounter)} >
            Indietro
          </button>
        ):(
          <div></div>
        )

      }
    <button className='button_cta' onClick={()=> {

      JSONobj[counter].chosenFromTheUser = multiChoise
      setCounter(prev=> prev+JSONobj[counter].cursorIncrement)
    //   JSONobj[counter+JSONobj[counter].cursorIncrement].backCounter = JSONobj[counter].cursorIncrement
    }} >
      
      {JSONobj[counter].buttonNext}
    </button>
      </div>
      </div>

    <p className='container_error' ></p>
  </div>
    )
}

export default Multi_choice_sentence