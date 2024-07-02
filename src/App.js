import React, { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperatorButton from "./OperatorButton";
import "./App.css"
export const ACTIONS = {
  ADD_DIGITS: "add-digit",
  DELETE_DIGITS: "delete-digit",
  ADD_OPERATOR: "add-operator",
  CLEAR: "clear",
  EVALUATE:"evaluate"
}

export function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGITS: {
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes(".") == false) {
        return {
          ...state,
          currentOperand: state.currentOperand + payload.digit
        }
      }
      if (payload.digit === "." && state.currentOperand.includes(".") == true) return state;
      
      return {
        ...state,
        currentOperand : `${state.currentOperand || ""}${payload.digit}`
      }
    }
      
    case ACTIONS.ADD_OPERATOR: {
      if (state.prevOperand == null && state.currentOperand == null) {
        return state;
      }

      if (state.prevOperand == null) {
        return {
          ...state,
          prevOperand: state.currentOperand + payload.operator,
          operator: payload.operator,
          currentOperand:null,
        }
      }

      return {
        ...state,
        prevOperand: evaluate(state),
        operator: payload.operator,
        currentOperand: null,
      }
    }
      
    case ACTIONS.CLEAR:
      return {}
    
    case ACTIONS.DELETE_DIGITS: {
      if (state.currentOperand == null) return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand.slice(0, -1)}`
      }
    }
      
  
    case ACTIONS.EVALUATE: {
      if (state.currentOperand == null || state.prevOperand == null) return state;
      return {
        ...state,
        prevOperand: null,
        currentOperand: evaluate(state),
        operator:null,
      }
    }
      
  }
}

function evaluate({ currentOperand, prevOperand, operator }) {
  const prev = parseFloat(prevOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let res = "";
  switch (operator) {
    case "+": {
      res = prev + current;
      break;
    }
    case "-": {
      res = prev - current;
      break;
    }
    case "*": {
      res = prev * current;
      break;
    }
    case "/": {
      res = prev / current;
      break;
    }
  }
  return res.toString();
}


function App() {
  const [{ currentOperand, prevOperand, operator }, dispatch] = useReducer(reducer, {});
  return (
    <div className="calculator">
      <div className="output">
        <div className="first-input">{ prevOperand }</div>
        <div className="second-input">{ currentOperand }</div>
      </div>
      
      <button className="two-span" onClick = {() => dispatch({type : ACTIONS.CLEAR})}>AC</button>
      <button onClick = {() => dispatch({type:ACTIONS.DELETE_DIGITS})}>DEL</button>
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
