import React, {useState} from "react";

function QuestionItem({ question, setQuestions }) {
  const { id, prompt, answers, correctIndex } = question;
  //const [correctAnswer, setCorrectAnswer] = useState(0)

  

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleAnswers (event){
    const chosenIndex = {
      correctIndex: Number(event.target.value)
    }
    //console.log(chosenIndex)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chosenIndex)

    })
    .then((re)=>re.json())
    .then((d)=> { 
      setQuestions((currentQ)=>{
        return currentQ.map((query)=>{
          if (query.id === d.id){
            return d
          }
          else{
            return query
          }
        })
      })
    })
    
  }

function handleDelete(inde){
  fetch(`http://localhost:4000/questions/${inde}`, {
    method: "DELETE"
  })
  .then((re)=>re.json())
  .then(()=>{
    setQuestions((currentQuestions)=>{
      return currentQuestions.filter((ele)=>ele.id !== inde)
    })
  })
  
  
  // //  setQuestions((currentQuestions)=>{
  // //   return currentQuestions.filter((ele)=>ele.id !== inde)
  // })
}

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswers} >{options}</select>
      </label>
      <button onClick={()=>handleDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
