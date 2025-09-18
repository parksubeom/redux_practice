// src/modules/counter.js

// 초기 상태값 -> 카운터를 만들거기 떄문에 값의 타입은 넘버
const initialState = {
  todoContent: [
    {
      title: "나는 첫 일정이다.",
      author: "박수범이다",
      date: "2025.09.18",
      content: "아무것도 안하는거다",
    },
  ],
};

// 액션 타입 상수를 정의합니다.
// `as const`를 사용하면 타입이 string에서 리터럴로 변경 -> 리터럴이 아니면 string 타입도 추론으로 허용되어버림
const ADDTODO = "ADDTODO" as const; 
const DELELTETODO = "DELETETODO" as const;

// 1. 증가 액션 타입 정의
interface AddTodo {
  type: typeof ADDTODO;
  payload:{}
}
// 2. 감소 액션 타입 정의
interface DeleteTodo {
  type: typeof DELELTETODO;
  payload:{}
}


export const addTodo = (value:{}) => {
  return {
    type: ADDTODO,
    payload:value
  };
};

export const deleteTodo = (value:{}) => {
  return {
    type: DELELTETODO,
    payload:value
  };
};


// 3. 액션타입 유니온으로 묶기
type TodoAction = AddTodo | DeleteTodo;



// 리듀서 -> 액션 타입에 따라 상태 값을 어떻게 리턴 해줄지 정하는 함수.
const counter = (state = initialState, action: TodoAction) => {
 
  switch (action.type) {
    case ADDTODO:
      console.log(action.payload)
      return {
        ...state, // 불변성 유지 -> 다음주에 RTK 사용 시 대체 가능
        todoContent : [...state.todoContent,action.payload]
      };
    case DELELTETODO:
      console.log(action.payload)
      return {
        ...state, // 불변성 유지 -> 다음주에 RTK 사용 시 대체 가능
        todoContent : state.todoContent.filter((el) => el === action.payload)
      };
    default:
      return state;
  }
};

export default counter;