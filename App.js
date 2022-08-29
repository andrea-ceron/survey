import './App.css'
import React, { useState, useEffect } from "react";
import {BsCheck2Circle} from "react-icons/bs";
import {  AiOutlineApple, AiFillAndroid,AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import Email_input from './typeAnswerComponents/Email_input';
import Single_choice from './typeAnswerComponents/Single_choice';
import Single_choice_sentence from './typeAnswerComponents/Single_choice-sentence';
import Multi_choice_sentence from './typeAnswerComponents/Multi_choice_sentence';
import Open_question from './typeAnswerComponents/Open_question';
import Finished_survey from './typeAnswerComponents/Finished_survey';
// installa react-icons

function App() {
  // il sondaggio si sviluppa sulla base di questo array di oggetti:
// ogni oggetto  è composto da:
// - un titolo --> che è i titolo che viene mandato a display
// -typeAnswer che indica il tipo di domanda , se è un input di un email, una textArea eccetera...
// -un cursorIncrement che indica di quanto si andrà adaumentare il cursore che lo state che mi gestisce il modo in cui vengono mandate a display le domande
//    il cursorIncrement può essere un int come può essere un array di int. L'array di int è utile per la gestione delle domande di typeAnswer= single_choice-sentence, 
//    l'array di int è utile perchè in questo modo dati due risultati diversi è possibile, in base a risposte diverse incrementare il counter in modo diverso
//    rendendo quindi il questionario dipendente dalle risposte date dall'utente.
//    Es: domanda -> risposta1 = counter++ ; risposta2 = counter+=2; risposta3 = counter+=3
// -un backCounter che andrà a decrementare il counter basandosi su quanto è stato incrementato dalla domanda precedente
// -answer che è un array di stringhe che rappresentano le risposte. questo tipo è presente in typeAnswer= single_choice, typeAnswer= single_choice-sentence e typeAnswer= multi_choice-sentence
// -buttonNext che è la stringa che verrà mandata a display all'interno del button che incrementa il counter e manda alla domanda successiva
// -chosenFromTheUser è la proprietà che salverà la risposta scelta dall'utente
// -icon proprietà presente solo in typeAnswer= single_choice che un array di react icons

  const [arrObjToRender, setArrObjToRender] = useState([
    {
    title: 'Inizia il questionario',
    typeAnswer: 'email_input',
    buttonNext: 'INIZIA ORA',
    cursorIncrement:1,
    backCounter:0,
  },
  {
    title: 'Domanda 1',
    typeAnswer: 'single_choice',
    answer:[
      'iOS',
      'android',
      'altro'
    ],
    icon:[
      <AiOutlineApple className='single_choice-icon' />,
      <AiFillAndroid className='single_choice-icon'/>,
      <AiOutlinePlusCircle className='single_choice-icon'/>
    ],
    chosenFromTheUser: '',
    chosenFromTheUserId: '',
    buttonNext: 'Avanti',
    cursorIncrement: [1,1,1],
    backCounter:1,

  },    
  {
    title: `Domanda due?`,
    typeAnswer: 'single_choice-sentence',
    answer:[
      'Si',
      'No'
    ],
    chosenFromTheUser: '',
    chosenFromTheUserId: '',
    buttonNext: 'Avanti',
    cursorIncrement:[1,1],
    backCounter:0,

  }

  ,{
    title: `Domanda 3`,
    typeAnswer: 'open_question',
    chosenFromTheUser: [],
    buttonNext: 'Avanti',
    cursorIncrement:1,
    backCounter:0,

  },
  {
    title: `Domanda 4`,
    typeAnswer: 'multi_choice-sentence',
    answer:[
      'no',
      'si',
      `forse`
          ],
    chosenFromTheUser: [],
    buttonNext: 'Avanti',
    cursorIncrement:1,
    backCounter:0

  },
  {
    title: `Fine`,
    typeAnswer: 'finished_survey',
    icon: <BsCheck2Circle className='teminated_survey-icon' />
  },
]
)
  // counter è lo state che permette di passare da una domanda all'altra sia andando avanti che in indietro
  const [counter, setCounter] = useState(0)

  useEffect(() => {
// refresh di questi tre state altrimenti react rompe il cazzo
  }, [counter, arrObjToRender])


  const updateJSON = ()=>{
    // id selezionato dall'icona cliccata
    let idOfPickedByUser=arrObjToRender[counter].chosenFromTheUserId

    // curosorIncrement basato sull'id scelto
    let cursorInc =arrObjToRender[counter].cursorIncrement[idOfPickedByUser]

    let newArr = [...arrObjToRender]; // copia vecchi dati in questo array
    newArr[counter].chosenFromTheUser = arrObjToRender[counter].answer[idOfPickedByUser]; // salva la risposta selezionata all'intenro di chosenFromTheUser
    newArr[counter+cursorInc].backCounter = cursorInc  // la propietà backCounter della domanda dopo verrà aggiornata a cursorInc
    setArrObjToRender(newArr) 
    setCounter(prev=> prev+cursorInc) // aumento il counter
  }


  return (
    <div className="App">

        <section className='survey_container' id='survey'>
         <div className='survey'>

          <div className='subContainer' >
              <div className='flex_form-container' >
                <div className='form' >
                  <div  >
                  {
                    arrObjToRender[counter].typeAnswer === 'email_input'? (
                      <div>
                         <Email_input state={arrObjToRender} setState={setArrObjToRender} counter={counter} setCounter={setCounter} />
                      </div>
                    ):(
                      <div></div>
                    )
                  }
                  {
                    arrObjToRender[counter].typeAnswer === 'single_choice'? (
                      <Single_choice JSONobj={arrObjToRender} setJSONobj={setArrObjToRender} counter={counter} setCounter={setCounter} updateJSON={updateJSON}/>
                    ):(
                      <div></div>
                    )
                  }
                  {
                    arrObjToRender[counter].typeAnswer === 'single_choice-sentence'? (
                      <Single_choice_sentence JSONobj={arrObjToRender} setJSONobj={setArrObjToRender} counter={counter} setCounter={setCounter} updateJSON={updateJSON}/>
                    ):(
                      <div></div>
                    )
                  }
                  {
                    arrObjToRender[counter].typeAnswer === 'multi_choice-sentence'? (
                      <Multi_choice_sentence JSONobj={arrObjToRender} setJSONobj={setArrObjToRender} counter={counter} setCounter={setCounter} />
                    ):(
                      <div></div>
                    )
                  }
                  {
                    arrObjToRender[counter].typeAnswer === 'open_question'? (
                      <Open_question JSONobj={arrObjToRender} setJSONobj={setArrObjToRender} counter={counter} setCounter={setCounter} />
                    ):(
                      <div></div>
                    )
                  }
                  {
                    arrObjToRender[counter].typeAnswer === 'finished_survey'? (
                      <Finished_survey JSONobj={arrObjToRender} counter={counter} />
                    ):(
                      <div></div>
                    )
                  }
                  
                </div>
                          <div className='container_number-single_choise' >
                            <p className='number' >{counter} / num totale</p> {/*che varia a seconda delle risposte scelte dall'utente*/}
                          </div>
                        </div>
                      </div>
                    </div>        
                  </div> 
        </section>
    </div>
  );
}

export default App;
