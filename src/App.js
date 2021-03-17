import { useState } from "react";

function App() {
  const isOperator = /[*/+-]/,
  endsWithOperator = /[*+-/]$/,
  endsWithNegative = /[-]$/,
  isTwoSign = /[*/+-]{2}/;

  const [answer, setAnswer] = useState("");
  const [equation, setEquation] = useState("");

  const display = (symbol) =>{
    
    if(equation === "" && (symbol === "0" || symbol === ".")){
      return;
    }
    if(endsWithOperator.test(equation) && symbol === "."){
      return;
    }

    if(isOperator.test(symbol)){
      if(answer === equation){
        setEquation(symbol);
        return;
      }
      //below checks if an operator button clicked after an operator button. This changes the operator as the last one.
      if(endsWithOperator.test(equation)){
        //below checks if the second clicked button is "-". If so, It lets the negative sign as the second operator.
        if(symbol === "-" && !(isTwoSign.test(equation))){
          if(endsWithNegative.test(equation)){
            return;
          }
          setEquation(prev => prev + symbol)
          return;
        }
        setEquation(symbol)
        return;
      }
      if(isTwoSign.test(equation)){
        setEquation(symbol);
        return;
      }
      
      setAnswer(prev => prev + equation )
      setEquation(symbol)
      return;
    }
    

    if(/\./.test(equation) && symbol === "."){
      return;
    }

    if(equation === answer && !(isOperator.test(symbol))){
      
      setAnswer("");
      setEquation(symbol); 
      return
    }

    setEquation(prev => prev + symbol)

  }

  const clear = () => {
    setEquation("");
    setAnswer("");
  }

  const deleter = () => {
    if(typeof equation === "number"){
      setAnswer("");
      setEquation("")
    }
    setEquation(prev => prev.split("").slice(0, prev.length-1).join(""))
  }

  const solution = () =>{
    if(endsWithOperator.test(equation)){
      return
    }
    // eslint-disable-next-line no-eval
    setAnswer(eval(answer + equation))
    // eslint-disable-next-line no-eval
    setEquation(eval(answer + equation))
  }


  return (
    <div className="App">
      <div className="container position-absolute top-50 start-50 translate-middle text-center">
        <div className="row bg-dark" id="screen">
          <div id="output" className="col-12 bg-dark text-warning text-end">{answer ? answer : 0}</div>
          <input type="text" value={equation ? equation : 0} disabled className="col-12 bg-dark text-white text-end" id="display" />
        </div>

        <div className="row row-cols-4">
          <div onClick={() => clear()} className="col-6 bg-danger text-white p-4 pad" id="clear">AC</div>
          <div onClick={() => deleter()} className="col-3 bg-danger text-white p-4 pad" id="delete">C</div>
          <div onClick={() => display("/")} className="col-3 bg-dark text-white p-4 pad" id="divide">/</div>
          <div onClick={() => display("7")} className="col-3 bg-secondary text-white p-4 pad" id="seven">7</div>
          <div onClick={() => display("8")} className="col-3 bg-secondary text-white p-4 pad" id="eight">8</div>
          <div onClick={() => display("9")} className="col-3 bg-secondary text-white p-4 pad" id="nine">9</div>
          <div onClick={() => display("*")} className="col-3 bg-dark text-white p-4 pad" id="multiply">X</div>

          <div onClick={() => display("4")} className="col-3 bg-secondary text-white p-4 pad" id="four">4</div>
          <div onClick={() => display("5")} className="col-3 bg-secondary text-white p-4 pad" id="five">5</div>
          <div onClick={() => display("6")} className="col-3 bg-secondary text-white p-4 pad" id="six">6</div>
          <div onClick={() => display("-")} className="col-3 bg-dark text-white p-4 pad" id="subtract">-</div>
         
          <div onClick={() => display("1")} className="col-3 bg-secondary text-white p-4 pad" id="one">1</div>
          <div onClick={() => display("2")} className="col-3 bg-secondary text-white p-4 pad" id="two">2</div>
          <div onClick={() => display("3")} className="col-3 bg-secondary text-white p-4 pad" id="three">3</div>
          <div onClick={() => display("+")} className="col-3 bg-dark text-white p-4 pad" id="add">+</div>

          <div onClick={() => display("0")} className="col-6 bg-secondary text-white p-4 pad" id="zero">0</div>
          <div onClick={() => display(".")} className="col-3 bg-secondary text-white p-4 pad" id="decimal">.</div>
          <div onClick={() => solution()} className="col-3 bg-primary text-white p-4 pad" id="equals">=</div>

        </div>
      </div>
    </div>
  
  );
}

export default App;
