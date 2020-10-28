import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  makeStyles,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  div: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  input: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  card: {
    marginBottom: theme.spacing(5),
  },
  chip: {
    marginLeft: theme.spacing(1),
  },
}));

const BuyCreate = ({ history }) => {
  const classes = useStyles();

  // 리덕스에 저장한 게시물 상세 내용 가져오기
  const reduxPost = useSelector((state) => state.post.post);

  const [buy, setBuy] = useState({
    buyer: localStorage.getItem('username'),
    seller: reduxPost.writer,
    post: reduxPost.id,
    postTitle: reduxPost.title,
    name: '',
    address: '',
    phone: '',
    dealtype: reduxPost.dealtype,
    about: '',
    price: reduxPost.price,
  });

  const onChangeBuy = (e) => {
    const nextBuy = {
      ...buy,
      [e.target.name]: e.target.value,
    };
    setBuy(nextBuy);
  };

  const onClickBuy = () => {
    axios
      .post('http://127.0.0.1:8000/buy/create/', buy)
      .then(function (response) {
        alert('주문이 완료되었습니다.');
        history.push('/post/list');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Grid className={classes.div}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6">거래상품</Typography>
          <hr />
          <Typography variant="h5" component="h2">
            {reduxPost.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {reduxPost.price}원
            <Chip
              size="small"
              label={reduxPost.dealtype}
              className={classes.chip}
            />
          </Typography>
        </CardContent>
      </Card>
      {/* 직거래, 택배거래 유형에 따라 받는 값이 다르다. */}
      {buy.dealtype === '직거래' ? (
        <>
          {/* case 직거래 */}
          <TextField
            className={classes.input}
            variant="outlined"
            required
            fullWidth
            id="phone"
            label="전화번호"
            name="phone"
            onChange={onChangeBuy}
          />
          <TextField
            className={classes.input}
            variant="outlined"
            required
            fullWidth
            id="about"
            label="기타"
            name="about"
            multiline
            rows={10}
            onChange={onChangeBuy}
          />
        </>
      ) : (
        <>
          {/* case 택배거래 */}
          <TextField
            className={classes.input}
            variant="outlined"
            required
            fullWidth
            id="name"
            label="이름"
            name="name"
            onChange={onChangeBuy}
          />
          <TextField
            className={classes.input}
            variant="outlined"
            required
            fullWidth
            id="address"
            label="주소"
            name="address"
            onChange={onChangeBuy}
          />
          <TextField
            className={classes.input}
            variant="outlined"
            required
            fullWidth
            id="phone"
            label="전화번호"
            name="phone"
            onChange={onChangeBuy}
          />
          <TextField
            className={classes.input}
            variant="outlined"
            required
            fullWidth
            id="about"
            label="기타"
            name="about"
            multiline
            rows={10}
            onChange={onChangeBuy}
          />
        </>
      )}

      <Button
        className={classes.input}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={onClickBuy}
      >
        주문하기
      </Button>
    </Grid>
  );
};

export default BuyCreate;
