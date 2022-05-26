import React,{useState, useEffect} from 'react'
import {v4} from 'uuid'

export default function App() {
  const listQuestions = [
    {
      id : v4(),
      questions: 'Bác Hồ sinh vào ngày, tháng, năm nào?',
      listAnswer: [
        {answer: '19/05/1966', isCorrect: false},
        {answer: '19/05/1890', isCorrect: true},
        {answer: '19/05/1980', isCorrect: false},
        {answer: '19/05/1899', isCorrect: false},
      ],
    },
    {
      id : v4(),
      questions: 'Quê Bác Hồ ở đâu?',
      listAnswer: [
        {answer: 'Hà Nội', isCorrect: false},
        {answer: 'Hải Phòng', isCorrect: false},
        {answer: 'Nghệ An', isCorrect: true},
        {answer: 'Bình Định', isCorrect: false},
      ],
    },
    {
      id : v4(),
      questions: 'Bác Hồ ra đi tìm đường cứu nước vào ngày, tháng, năm nào?',
      listAnswer: [
        {answer: '5/6/1911', isCorrect: true},
        {answer: '6/5/1911', isCorrect: false},
        {answer: '5/6/1921', isCorrect: false},
        {answer: '6/5/1921', isCorrect: false},
      ],
    },
    {
      id : v4(),
      questions: 'Bác Hồ đọc bản tuyên ngôn độc lập vào ngày, tháng, năm nào?',
      listAnswer: [
        {answer: '2/9/1975', isCorrect: false},
        {answer: '2/9/1945', isCorrect: true},
        {answer: '30/4/1975', isCorrect: false},
        {answer: '30/4/1945', isCorrect: false},
      ],
    },
  ]

  const [currentQuestions, setCurrentQuestions] = useState(0)
  const [showEnd, setShowEnd] = useState(false)
  const [showMain, setShowMain] = useState(true)
  const [count, setCount] = React.useState(15)
  const [score, setScore] = React.useState(0)
  const line = document.getElementById('box')


  const handleButtonClick = (isCorrect) =>{
    if(isCorrect === true) {
      if((currentQuestions+1) === listQuestions.length) {
        setShowEnd(true)
        setCount(0)
        setScore(score+1)
      }
      else{
        setScore(score + 1)
        setCurrentQuestions(currentQuestions+1)
        setCount(15)
        // CSS animation 
        line.classList.remove('line')
        window.requestAnimationFrame(function(){
          line.classList.add('line')
        })  
      }
    }
    else {
      if((currentQuestions+1) === listQuestions.length) {
        setShowEnd(true)
        setCount(0)
      }
      else{
        setCurrentQuestions(currentQuestions+1)
        setCount(15)
        // CSS animation 
        line.classList.remove('line')
        window.requestAnimationFrame(function(){
          line.classList.add('line')
        })  
      }  
    }
  }

  const handleBtnStartClick = () =>{
    setShowMain(false)
    setCount(15)
  }

  const handleEndTime = () =>{
    if((currentQuestions+1) === listQuestions.length) {
      setShowEnd(true)
    }
    else{
      setCurrentQuestions(currentQuestions+1)
      setCount(15)
      line.classList.remove('line')
        window.requestAnimationFrame(function(){ 
          line.classList.add('line')
      })
    }    
  }
  

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setCount(count -1);
    },1000)
    if(count===0) {
      clearTimeout(timeout)
      handleEndTime()
    }
    return () =>{
      clearTimeout(timeout) 
    }
  },[count])

  return (
    <>
      <div className='app'>
        <p className='title'>Câu hỏi trắc nghiệm</p>
        <div id='main-div'>
          {showEnd ? (
          <div className='end'>
            <p>Cảm ơn bạn đã tham gia !!!</p>
            <p>Bạn đã đúng {score} trên {listQuestions.length} câu hỏi</p>
          </div> 
          ):(
          <>
          <div className='main'>
            {showMain? (
              <div className='start' onClick={handleBtnStartClick}><span>Bắt đầu</span></div>
            ):(
              <>
                <div className='progress-bar'>
                  <div className='line-box'>
                    <div id='box' className='line'></div>
                  </div>
                </div>
                <div className='main-app'>
                  <div className='questions-section'>
                    <div>
                      {listQuestions[currentQuestions].questions}
                    </div>
                    <div className='count-section'>
                      <h3>Time left: {count}</h3>
                    </div>
                  </div>
                  <div className='answer-section'>
                    {listQuestions[currentQuestions].listAnswer.map((ans)=>
                    <button id={ans.answer} onClick={()=> handleButtonClick(ans.isCorrect)}>{ans.answer}</button>
                    )}
                  </div>  
                </div>
              </>
            )} 
          </div>
          </>
          )}    
        </div>
      </div>
    </>
  )
}
