// src/modules/counter.js

// 초기 상태값
const initialState = {
  number: 0,
};

// 액션 타입 상수를 정의합니다.
// `as const`를 사용하면 타입이 string이  리터럴로 고정 -> 리터럴이 아니면 string 타입도 추론으로 허용되어버림
const INCREMENT = "INCREMENT" as const; 
const DECREMENT = "DECREMENT" as const;

// 1. 증가 액션 타입 정의
interface IncrementAction {
  type: typeof INCREMENT;
}

// 2. 감소 액션 타입 정의
interface DecrementAction {
  type: typeof DECREMENT;
}

// 3. 모든 액션 타입을 유니온(Union)으로 묶습니다.
type CounterAction = IncrementAction | DecrementAction;



// 리듀서
const counter = (state = initialState, action:CounterAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default counter;