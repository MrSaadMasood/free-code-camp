import { useState } from "react";

function App() {
  const [display, setDisplay] = useState("0")
  const [wholeInput, setWholeInput] = useState("")
  const [lastInput, setLastInput] = useState("")
  const [isFirstElementZero, setIsFirstElementZero] = useState(true)
  const [isLastEnteredAnOperator, setIsLastEnteredAnOperator] = useState(false)
  const operatorWithMinus = ["+", "-", "/", "*"]


  function handleClear() {
    setLastInput("")
    setWholeInput("")
    setDisplay("0")
    setIsFirstElementZero(false)
  }

  function handleDecimalClick() {
    const splitBasedOnOperator = lastInput.split(/(?=[+*//-])|(?<=[+*//-])/)
    const lastElem = splitBasedOnOperator[splitBasedOnOperator.length - 1]
    if (lastElem.includes(".")) return
    updateNumberValue(".")
    if (!operatorWithMinus.includes(lastElem)) setDisplay(display + ".")

  }

  function handleOperatorClick(value: string) {
    setDisplay(value);
    setWholeInput(wholeInput + value)
    setLastInput(lastInput + value)
    setIsFirstElementZero(false)
    setIsLastEnteredAnOperator(true)
  }

  function handleNumberClick(value: string) {
    console.log("is first", isFirstElementZero, value)
    if (value !== "0") {
      updateNumberValue(value)
      setDisplay(isLastEnteredAnOperator ? value : display === "0" ? value : display + value)
      setIsFirstElementZero(false)
    }
    else {
      if (isFirstElementZero || !lastInput || isLastEnteredAnOperator) return
      updateNumberValue(value)
      setDisplay(isLastEnteredAnOperator ? value : display + value)

    }
  }

  function updateNumberValue(value: string) {
    setLastInput(lastInput + value)
    setWholeInput(wholeInput + value)
    setIsLastEnteredAnOperator(false)
  }

  function handleEqualsClick() {
    const result = calculate()
    setDisplay(result.toString())
    setWholeInput(wholeInput + "=" + result.toString())
    setLastInput(result.toString())
  }

  function calculate() {
    const splitBasedOnOperator = lastInput.split(/(?=[+*//-])|(?<=[+*//-])/)
    let result = parseFloat(splitBasedOnOperator[0])
    for (let i = 0; i < splitBasedOnOperator.length; i++) {
      if (operatorWithMinus.includes(splitBasedOnOperator[i])) {
        let operatorToUse = splitBasedOnOperator[i]
        let nextAfterOperator = splitBasedOnOperator[i + 1]
        let isOperatorChanged = false
        while (operatorWithMinus.includes(nextAfterOperator)) {
          isOperatorChanged = true
          operatorToUse = nextAfterOperator
          nextAfterOperator = splitBasedOnOperator[++i + 1]
        }
        let secondNumber = parseFloat(nextAfterOperator)
        if (isOperatorChanged && operatorToUse === "-") {
          operatorToUse = splitBasedOnOperator[i - 1]
          secondNumber = - secondNumber
        }

        switch (operatorToUse) {
          case "*":
            result = result * secondNumber
            break;
          case "/":
            result = result / secondNumber
            break;
          case "+":
            result = result + secondNumber;
            break;
          case "-":
            result = result - secondNumber
            break;
        }
      }
    }
    console.log("The split is", splitBasedOnOperator)
    return result
  }


  return (
    <div className=" bg-black w-screen h-screen flex justify-center items-center">

      <div className="calculator grid grid-cols-4 gap-4 max-w-md mx-auto mt-10">
        <div
          id="whole"
          className="display col-span-4 bg-gray-900 text-white text-right text-4xl p-4 rounded-md"
        >
          {wholeInput}
        </div>
        <div
          id="display"
          className="display col-span-4 bg-gray-900 text-white text-right text-4xl p-4 rounded-md"
        >
          {display}
        </div>
        <button
          id="clear"
          className="bg-red-500 text-white text-2xl p-4 rounded-md hover:bg-red-600"
          onClick={handleClear}
        >
          AC
        </button>
        <button
          id="divide"
          className="bg-blue-500 text-white text-2xl p-4 rounded-md hover:bg-blue-600"
          onClick={() => handleOperatorClick("/")}
        >
          /
        </button>
        <button
          id="multiply"
          className="bg-blue-500 text-white text-2xl p-4 rounded-md hover:bg-blue-600"
          onClick={() => handleOperatorClick("*")}
        >
          *
        </button>
        <button
          id="seven"
          className="bg-gray-300 text-black text-2xl p-4 rounded-md hover:bg-gray-400"
          onClick={() => handleNumberClick("7")}
        >
          7
        </button>
        <button
          id="eight"
          className="bg-gray-300 text-black text-2xl p-4 rounded-md hover:bg-gray-400"
          onClick={() => handleNumberClick("8")}
        >
          8
        </button>
        <button
          id="nine"
          className="bg-gray-300 text-black text-2xl p-4 rounded-md hover:bg-gray-400"
          onClick={() => handleNumberClick("9")}
        >
          9
        </button>
        <button
          id="subtract"
          className="bg-blue-500 text-white text-2xl p-4 rounded-md hover:bg-blue-600"
          onClick={() => handleOperatorClick("-")}
        >
          -
        </button>
        <button
          id="four"
          className="bg-gray-300 text-black text-2xl p-4 rounded-md hover:bg-gray-400"
          onClick={() => handleNumberClick("4")}
        >
          4
        </button>
        <button
          id="five"
          className="bg-gray-300 text-black text-2xl p-4 rounded-md hover:bg-gray-400"
          onClick={() => handleNumberClick("5")}
        >
          5
        </button>
        <button
          id="six"
          className="bg-gray-300 text-black text-2xl p-4 rounded-md hover:bg-gray-400"
          onClick={() => handleNumberClick("6")}
        >
          6
        </button>
        <button
          id="add"
          className="bg-blue-500 text-white text-2xl p-4 rounded-md hover:bg-blue-600"
          onClick={() => handleOperatorClick("+")}
        >
          +
        </button>
        <button
          id="one"
          className="bg-gray-300 text-black text-2xl p-4 rounded-md hover:bg-gray-400"
          onClick={() => handleNumberClick("1")}
        >
          1
        </button>
        <button
          id="two"
          className="bg-gray-300 text-black text-2xl p-4 rounded-md hover:bg-gray-400"
          onClick={() => handleNumberClick("2")}
        >
          2
        </button>
        <button
          id="three"
          className="bg-gray-300 text-black text-2xl p-4 rounded-md hover:bg-gray-400"
          onClick={() => handleNumberClick("3")}
        >
          3
        </button>
        <button
          id="equals"
          className="bg-green-500 text-white text-2xl p-4 rounded-md hover:bg-green-600"
          onClick={handleEqualsClick}
        >
          =
        </button>
        <button
          id="zero"
          className="zero col-span-2 bg-gray-300 text-black text-2xl p-4 rounded-md hover:bg-gray-400"
          onClick={() => handleNumberClick("0")}
        >
          0
        </button>
        <button
          id="decimal"
          className="bg-gray-300 text-black text-2xl p-4 rounded-md hover:bg-gray-400"
          onClick={handleDecimalClick}
        >
          .
        </button>
      </div>
    </div>
  );
}

export default App
