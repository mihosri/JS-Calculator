import { useState } from 'react'

import './App.css'

function App() {
  const [answer, setAnswer] = useState('')
  const [expression, setExpression] = useState('')

  const et = expression.trim()

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol)
  }

  const buttonPress = (symbol: string) => {
    if (symbol == 'clear') {
      setAnswer('')
      setExpression('0')
    } else if (symbol === 'negative') {
      if (answer === '') return
      setAnswer(
        answer.toString().charAt(0) === '-' ? answer.slice(1) : '-' + answer
      )
    } else if (symbol === 'percent') {
      if (answer === '') return
      setAnswer((parseFloat(answer) / 100).toString())
    } else if (isOperator(symbol)) {
      setExpression(et + ' ' + symbol + ' ')
    } else if (symbol === '=') {
      calculate()
    } else if (symbol === '0') {
      if (expression.charAt(0) !== '0') {
        setExpression(expression + symbol)
      }
    } else if (symbol === '.') {
      const lastNumber = expression.split(/[-+/*]/g).pop()
      if (lastNumber?.includes('.')) return
      setExpression(expression + symbol)
    } else {
      if (expression.charAt(0) === '0') {
        setExpression(expression.slice(1) + symbol)
      } else {
        setExpression(expression + symbol)
      }
    }
  }

  const calculate = () => {
    //if the last char is an operator, no calculations
    if (isOperator(et.charAt(et.length - 1))) return
    //cleaning the exp: more than 1 operator uses last operator
    //ex: 5*/+5 = 10
    const parts = et.split(' ')
    const newParts = []

    //looping through the parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      //checking the last char and last before is an operator
      //this condition comes true when there is consecutive operators
      if (['*', '/', '+'].includes(parts[i]) && isOperator(parts[i - 1])) {
        //taking the last operator in the sequence and leaving out the rest of operators until an operand is encountered using a while loop.
        newParts.unshift(parts[i])
        let j = 0
        let k = i - 1
        while (isOperator(parts[k])) {
          k--
          j++
        }
        //skipping those consecutive operators
        i -= j
      } else {
        //if the last char is not an operator, pushing it to the new array
        newParts.unshift(parts[i])
      }
    }
    //checking if the new exp got has a starting operator, if so do the calc with the prev ans
    const newExpression = newParts.join(' ')
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string)
    } else {
      setAnswer(eval(newExpression) as string)
    }
    setExpression('')
  }

  return (
    <div className="container">
      <h1>Javascript Calculator</h1>
      <div id="calculator">
        <div id="display" style={{ textAlign: 'right' }}>
          <div id="answer">{answer}</div>
          <div id="expression">{expression}</div>
        </div>
        <button
          id="clear"
          onClick={() => buttonPress('clear')}
          className="light-grey"
        >
          C
        </button>
        <button
          id="negative"
          onClick={() => buttonPress('negative')}
          className="light-grey"
        >
          +/-
        </button>
        <button
          id="percent"
          onClick={() => buttonPress('percent')}
          className="light-grey"
        >
          %
        </button>
        <button id="divide" onClick={() => buttonPress('/')} className="yellow">
          /
        </button>
        <button
          id="seven"
          onClick={() => buttonPress('7')}
          className="dark-grey"
        >
          7
        </button>
        <button
          id="eight"
          onClick={() => buttonPress('8')}
          className="dark-grey"
        >
          8
        </button>
        <button
          id="nine"
          onClick={() => buttonPress('9')}
          className="dark-grey"
        >
          9
        </button>
        <button
          id="multiply"
          onClick={() => buttonPress('*')}
          className="yellow"
        >
          *
        </button>
        <button
          id="four"
          onClick={() => buttonPress('4')}
          className="dark-grey"
        >
          4
        </button>
        <button
          id="five"
          onClick={() => buttonPress('5')}
          className="dark-grey"
        >
          5
        </button>
        <button id="six" onClick={() => buttonPress('6')} className="dark-grey">
          6
        </button>
        <button
          id="subtract"
          onClick={() => buttonPress('-')}
          className="yellow"
        >
          -
        </button>
        <button id="one" onClick={() => buttonPress('1')} className="dark-grey">
          1
        </button>
        <button id="two" onClick={() => buttonPress('2')} className="dark-grey">
          2
        </button>
        <button
          id="three"
          onClick={() => buttonPress('3')}
          className="dark-grey"
        >
          3
        </button>
        <button id="add" onClick={() => buttonPress('+')} className="yellow">
          +
        </button>
        <button
          id="zero"
          onClick={() => buttonPress('0')}
          className="dark-grey"
        >
          0
        </button>
        <button
          id="decimal"
          onClick={() => buttonPress('.')}
          className="dark-grey"
        >
          .
        </button>
        <button id="equals" onClick={() => buttonPress('=')} className="yellow">
          =
        </button>
      </div>
    </div>
  )
}

export default App
