import { useSelector,useDispatch } from "react-redux";
import type { RootState,AppDispatch } from "./redux/config/configStore";
import { addTodo, deleteTodo } from "./redux/modules/counter";
import type { ChangeEvent} from "react";
import { useState } from "react";

const App = () => {

  interface TodoListType {
  title: string,
  author: string,
  date: string,
  content: string,
 
}

  /**
  리듀서로부터 상태값을 받아오는 훅
  리듀서의 여러 상태 중 number만 가져옴
  number 상태를 공유하는 페이지만 리렌더링이 발생하여 useContext에 비해 최적화
   */
  const [todoList, setTodoList] = useState<TodoListType>({
  title: "",
  author: "",
  date: "",
  content: "",
 
});
  const counterStore = useSelector((state: RootState) => state.counter.todoContent)
  const dispatch = useDispatch<AppDispatch>(); // 액션을 리듀서로 보내주는 파이프 
  const onChangeValue = (e:ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value
  }

  return(
    <>
    <input type="text" onChange={onChangeValue}></input>
    </>
  ) 
  
};

export default App;