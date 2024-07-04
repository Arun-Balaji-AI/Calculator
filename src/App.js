import React, { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperatorButton from "./OperatorButton";
import "./App.css"

export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  ADD_OPERATOR: "add-operator",
  CLEAR: "clear",
  DELETE: "delete",
  EVALUATE: "evaluate"
}

function evaluate({ currentOperand, prevOperand, operator }) {
  const current = parseFloat(currentOperand);
  const prev = parseFloat(prevOperand);
  switch (operator) {
    case "+": {
      return (current + prev).toString();
    }
    case "-": {
      return (prev - current).toString();
    }
    case "/": {
      return (prev / current).toString();
    }
    case "*": {
      return (prev * current).toString();
    }
  }
}

function reducer(state , {type , payload}) {
  switch (type) {
    case ACTIONS.ADD_DIGIT: {
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentOperand: (state.currentOperand || "") + payload.digit
      }

    }
    case ACTIONS.ADD_OPERATOR: {
      if (state.currentOperand == null) {
        return state;
      }
      if (state.prevOperand == null) {
        return {
          ...state,
          prevOperand: state.currentOperand,
          currentOperand: null,
          operator: payload.operator
        }
      }

      return {
        ...state,
        operator: payload.operator,
        prevOperand: evaluate(state),
        currentOperand: null
      }
    }
    case ACTIONS.CLEAR: {
      return {};
    }
    case ACTIONS.DELETE: {
      if (state.prevOperand != null && state.operator != null && (state.currentOperand == null || state.currentOperand === "")) {
        return {
          ...state,
          operator: null,
          currentOperand: state.prevOperand,
          prevOperand: null
        }
      }
      if (state.currentOperand == null || state.currentOperand === "") {
        return state;
      }
      
     
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }

    }
    case ACTIONS.EVALUATE: {
      if (state.currentOperand == null || state.prevOperand == null) {
        return state;
      }
      return {
        ...state,
        currentOperand: evaluate(state),
        prevOperand: null,
        operator:null
      }
    }
  }
}


function App() {
  const [{ currentOperand, prevOperand, operator }, dispatch] = useReducer(reducer, {});
  return (
    <div className="calculator">
      <div className="output">
        <div className="first-input">{prevOperand} { operator }</div>
        <div className="second-input">{ currentOperand }</div>
      </div>
      
      <button className="two-span" onClick = {() => dispatch({type : ACTIONS.CLEAR})}>AC</button>
      <button onClick = {() => dispatch({type:ACTIONS.DELETE})}>DEL</button>
      <OperatorButton operator = "/" dispatch={dispatch} />
      <DigitButton digit = "1" dispatch = {dispatch} />
      <DigitButton digit = "2" dispatch = {dispatch} />
      <DigitButton digit = "3" dispatch = {dispatch} />
      <OperatorButton operator = "*" dispatch={dispatch} />
      <DigitButton digit = "4" dispatch = {dispatch} />
      <DigitButton digit = "5" dispatch = {dispatch} />
      <DigitButton digit = "6" dispatch = {dispatch} />
      <OperatorButton operator = "+" dispatch={dispatch} />
      <DigitButton digit = "7" dispatch = {dispatch} />
      <DigitButton digit = "8" dispatch = {dispatch} />
      <DigitButton digit = "9" dispatch = {dispatch} />
      <OperatorButton operator = "-" dispatch={dispatch} />
      <DigitButton digit = "." dispatch = {dispatch} />
      <DigitButton digit = "0" dispatch = {dispatch} />
      <button className = "two-span" onClick={() => dispatch({type:ACTIONS.EVALUATE})}> = </button>
    </div>
  );
}

export default App;
