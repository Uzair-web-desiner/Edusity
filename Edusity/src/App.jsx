import { GoogleGenerativeAI } from "@google/generative-ai";
import SyntaxHighlighter from 'react-syntax-highlighter';
import './App.css'
import axios from 'axios';
import { useState } from "react";

function App() {
  let [answer , setanswer]=useState();
  let [question , setquestion]=useState();
  let [finalQuestion , setfinalQuestion]=useState();
  let [history,sethistory]=useState([])
  let [finalhistory,setfinalhistory]=useState()
  let [count,setcount]=useState(false);

  

  const genAI = new GoogleGenerativeAI("AIzaSyB5NDzi0iGOmWsAm85NF14G3sszJOPM_Qc");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
 
      
  const genAnswer = async ()=>{
      const prompt = question;
      const result = await model.generateContent(prompt);                  
      setanswer(result.response.candidates[0].content.parts[0].text.replace(/\*/g, ""))
  }  

  let getData=(event)=>{
    setanswer()
    genAnswer()
    setfinalQuestion(question)
    let finalhistory=[question,...history]
    sethistory(finalhistory)
    event.preventDefault()

  }
  const genAnswer2 = async ()=>{
    setanswer();
    setfinalQuestion(finalhistory);
    const prompt = finalhistory;
    const result = await model.generateContent(prompt);                   
    setanswer(result.response.candidates[0].content.parts[0].text.replace(/\*/g, ""))
  } 
  if(count==true){
    genAnswer2()
    setcount(false)
  }
  

 
 
  return (
    <>
      <div className="cantainer">
        <div className="info">
          <div className="titel hover">
            <div className="titel-logo"></div>
            <p>AskGPT</p>
          </div>
          <div className="explore hover">
            <div className="explore-logo"></div>
            <p>Explore GPT</p>
          </div>
          <div className="upgrade hover">Upgrade Plan</div>
          <div className="history">
            <p>Histroy</p>
            <div className="his-main">
              {
                history.map((data,i)=>{

                  
                  return(
                    <div className="his-info hover" key={i} onClick={()=>{setfinalhistory(data);setcount(true)}} >{data}</div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="main-cantainer">
          <div className="navbar">
              <p>AskGPT</p>
              <div className="nav-logo"></div>
          </div>
          <div className="main">
            <div className="main-info">
              <div className={ history.length>0?' question':'' }>
                
                {finalQuestion}</div>
              <div className="answer">{answer}</div>

            </div>
            <div className="user">
              <div className="userlogo"></div>
            </div>
            <div className="computer">
              <div className="complogo"></div>
            </div>
          </div>
          <form onSubmit={getData} >
                <input type="text" value={question} onChange={(e)=>setquestion(e.target.value)}/>
                
          </form>
        </div>

      </div>

    </>
  )
}

export default App
