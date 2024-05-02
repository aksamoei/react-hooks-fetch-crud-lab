import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, setQuestions}) {
  //const [questions, setQuestions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((re)=> re.json())
    .then((questionData)=>{setQuestions(questionData)
    setIsLoaded(true)
    })
  },[]);

  if (!isLoaded){
    return <p>Fetching Questions....</p>
  };
  
const displayQuestions = questions.map((question)=>{
  return <QuestionItem question={question} key={question.id} setQuestions={setQuestions}/>
})

// function handleDelete(inde){
//   setQuestions((currentQuestions)=>{
//     return currentQuestions.filter((ele)=>ele.id !== inde)
//   })
// }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */displayQuestions}</ul>
    </section>
  );
}

export default QuestionList;
