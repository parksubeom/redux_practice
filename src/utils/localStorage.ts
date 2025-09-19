// src/utils/localStorage.ts

// 상태를 로컬스토리지에 저장
export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('blogState', serializedState);
  } catch (error) {
    console.error("Could not save state", error);
  }
};

// 로컬스토리지에서 상태를 불러오기
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('blogState');
    if (serializedState === null) {
      return undefined; // 상태가 없으면 undefined를 반환하여 리듀서가 초기 상태를 사용하게 함
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not load state", error);
    return undefined;
  }
};