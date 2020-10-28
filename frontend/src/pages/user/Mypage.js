import React, { useState } from 'react';
import BuyList from './BuyList';
import PostList from './PostList';
import CashList from './CashList';
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  ButtonGroup,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  div: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  buylist: {
    padding: theme.spacing(1),
  },
  none: {
    display: 'none',
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const Mypage = () => {
  const classes = useStyles();
  // 눌린 버튼에 따라 다른 내용을 보여준다
  const [state, setState] = useState({
    cashActive: false,
    postActive: true,
    sellerActive: false,
    buyerActive: false,
  });

  const onClickCash = () => {
    setState({
      cashActive: true,
      postActive: false,
      sellerActive: false,
      buyerActive: false,
    });
  };
  const onClickPost = () => {
    setState({
      cashActive: false,
      postActive: true,
      sellerActive: false,
      buyerActive: false,
    });
  };
  const onClickSeller = () => {
    setState({
      cashActive: false,
      postActive: false,
      sellerActive: true,
      buyerActive: false,
    });
  };
  const onClickBuyer = () => {
    setState({
      cashActive: false,
      postActive: false,
      sellerActive: false,
      buyerActive: true,
    });
  };

  return (
    <div className={classes.div}>
      <Typography align="center" variant="h5" component="h2">
        {localStorage.getItem('username')}님의 마이페이지
      </Typography>
      <ButtonGroup
        variant="contained"
        aria-label="contained primary button group"
        fullWidth
        style={{ marginTop: '20px', marginBottom: '20px' }}
      >
        <Button
          color={state.postActive ? 'secondary' : 'primary'}
          onClick={onClickPost}
        >
          내가 등록한 거래
        </Button>
        <Button
          color={state.sellerActive ? 'secondary' : 'primary'}
          onClick={onClickSeller}
        >
          판매 상세보기
        </Button>
        <Button
          color={state.buyerActive ? 'secondary' : 'primary'}
          onClick={onClickBuyer}
        >
          구매 상세보기
        </Button>
        <Button
          color={state.cashActive ? 'secondary' : 'primary'}
          onClick={onClickCash}
        >
          정산 상세보기
        </Button>
      </ButtonGroup>
      <Grid container>
        <Grid
          item
          xs={12}
          className={state.cashActive ? classes.buylist : classes.none}
        >
          <CashList />
        </Grid>
        <Grid
          item
          xs={12}
          className={state.postActive ? classes.buylist : classes.none}
        >
          <PostList />
        </Grid>
        <Grid
          item
          xs={12}
          className={state.sellerActive ? classes.buylist : classes.none}
        >
          <BuyList type="seller" />
        </Grid>
        <Grid
          item
          xs={12}
          className={state.buyerActive ? classes.buylist : classes.none}
        >
          <BuyList type="buyer" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Mypage;
