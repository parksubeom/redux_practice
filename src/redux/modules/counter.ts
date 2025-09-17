// src/modules/counter.js

// 초기 상태값 -> 카운터를 만들거기 떄문에 값의 타입은 넘버
const initialState = {
  number: 0,
};

// 액션 타입 상수를 정의합니다.
// `as const`를 사용하면 타입이 string에서 리터럴로 변경 -> 리터럴이 아니면 string 타입도 추론으로 허용되어버림
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

export const increment = () => {
  return {
    type: INCREMENT,
  };
};

export const decrement = () => {
  return {
    type: DECREMENT,
  };
};

// 3. 액션타입 유니온으로 묶기
type CounterAction = IncrementAction | DecrementAction;



// 리듀서 -> 액션 타입에 따라 상태 값을 어떻게 리턴 해줄지 정하는 함수.
const counter = (state = initialState, action: CounterAction) => {
  console.log(action)
  switch (action.type) {
    case INCREMENT:
      return {
        ...state, // 불변성 유지 -> 다음주에 RTK 사용 시 대체 가능
        number: state.number + 1, // number 값을 1 증가
      };
    case DECREMENT:
      return {
        ...state, // 불변성 유지 -> 다음주에 RTK 사용 시 대체 가능
        number: state.number - 1, // number 값을 1 감소
      };
    default:
      return state;
  }
};

export default counter;