import React from 'react'

function Single_choice_sentence({updateJSON, JSONobj, setJSONobj, counter, setCounter}) {
  return (
    <div className='container_question'>
    <p className='form_p' >{JSONobj[counter].title}</p>
    <div className='flex_container-single_choice-sentence' >
      {
        JSONobj[counter].answer.map((ans, id)=>{
          return(
            <span className='radio_outer_container' >
            <div className='radio_space' >
              <span className='circle' >
                <span className={ JSONobj[counter].chosenFromTheUserId===id ?'inner_circle-focus': 'inner_cirlce'} > </span>
              </span>
            </div>
              <button className={JSONobj[counter].chosenFromTheUserId===id  ?'radio_container-focus': 'radio_container'} onClick={()=>{
                  let newArr = [...JSONobj]; // copying the old datas array
                  newArr[counter].chosenFromTheUserId = id; // replace e.target.value with whatever you want to change it to
                  console.log(newArr[counter].chosenFromTheUserId )
                setJSONobj(newArr) }} >
                {ans}
              </button>
            </span>
      )})}
      <div className='button_div_single_choise-sentence' >
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
    <button className='button_cta' onClick={()=> updateJSON()} 
      >
      {JSONobj[counter].buttonNext}
    </button>
      </div>
      </div>

    <p className='container_error' ></p>
  </div>  )
}

export default Single_choice_sentence