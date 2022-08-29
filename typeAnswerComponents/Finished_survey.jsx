import React from 'react'

function Finished_survey({JSONobj, counter}) {
  return (
    <div className='container_question'>
        <button className='button_cta'onClick={()=>console.log(JSONobj)} >stampa</button>
        <p className='form_p' >{JSONobj[counter].title}</p>
        {JSONobj[counter].icon}
    </div>  
    )
}

export default Finished_survey