import React from 'react';
import { Route } from 'react-router-dom';

import PostList from './pages/post/PostList';
import PostDetail from './pages/post/PostDetail';
import PostWrite from './pages/post/PostWrite';
import PostUpdate from './pages/post/PostUpdate';

import Mypage from './pages/user/Mypage';

import Header from './pages/Header';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import BuyCreate from './pages/buy/BuyCreate';
import BuyDetail from './pages/buy/BuyDetail';

import CashCreate from './pages/cash/CashCreate';

import Container from '@material-ui/core/Container';

import Home from './pages/Home';

const App = () => {
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        {/* 게시물 */}
        <Route path="/post/list" component={PostList} exact={true} />
        <Route path="/post/write" component={PostWrite} />
        <Route path="/post/:id" component={PostDetail} />
        <Route path="/post/update/:id" component={PostUpdate} />
        {/* 회원 */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        {/* 구매 */}
        <Route path="/buy/create" component={BuyCreate} />
        <Route path="/buy/detail/:id" component={BuyDetail} />
        {/* 정산 */}
        <Route path="/cash/create" component={CashCreate} />
        {/* 테스트 */}
      </Container>
      <Container maxWidth="md">
        <Route path="/mypage" component={Mypage} />
      </Container>
      <Route path="/" component={Home} exact={true} />
    </>
  );
};

export default App;
