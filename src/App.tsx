import { useSelector,useDispatch } from "react-redux";
import type { RootState } from "./redux/config/configStore";

const App = () => {
  const dispatch = useDispatch(); // 액션을 리듀서로 보내주는 파이프
  /**
  리듀서로부터 상태값을 받아오는 훅
  리듀서의 여러 상태 중 number만 가져옴
  number 상태를 공유하는 페이지만 리렌더링이 발생하여 useContext에 비해 최적화
   */
  const counterStore = useSelector((state: RootState) => state.counter.number); 

  console.log(counterStore); 

  return(
    <>
    <button onClick={() => dispatch({type : "INCREMENT"})}>+1</button>
    <button onClick={() => dispatch({type : "DECREMENT"})}>-1</button>
    <div>Count : {counterStore}</div>
    </>
  ) 
  
};

export default App;