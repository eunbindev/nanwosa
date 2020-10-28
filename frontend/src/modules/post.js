// 액션 타입 정의하기
const POSTREDUX = 'post/POSTREDUX';

// 액션 생성 함수 만들기
export const postredux = (post) => ({
  type: POSTREDUX,
  post: {
    post,
  },
});

// 초기 상태 및 리듀서 함수 만들기
const initialState = {
  post: {
    id: 0,
    date: '',
    title: '',
    category: '',
    price: 0,
    totalnum: 0,
    curnum: 0,
    dealtype: '',
    content: '',
    image: '',
    writer: '',
  },
};

function post(state = initialState, action) {
  switch (action.type) {
    case POSTREDUX:
      return action.post;
    default:
      return state;
  }
}

export default post;
