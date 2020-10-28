import React, { useState, useEffect } from 'react';

import { makeStyles, TextField, Button, Typography } from '@material-ui/core';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  div: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  input: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
}));

const CashCreate = () => {
  const classes = useStyles();
  const [cash, setCash] = useState([]);
  const [total, setTotal] = useState();
  const [cashItem, setCashItem] = useState({
    type: false,
    detail: '출금 요청 처리',
    price: '',
    bank: '',
    account: '',
    seller: localStorage.getItem('username'),
  });
  const [loading, setLoading] = useState(false);

  // 전체 정산 내역 계산
  const totalCash = (arr) => {
    var total = 0;

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].type === true) {
        total = total + parseInt(arr[i].price);
      } else if (arr[i].type === false) {
        total = total - parseInt(arr[i].price);
      }
    }
    setTotal(total);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/cash?seller=' +
            localStorage.getItem('username'),
        );
        setCash(response.data);
        totalCash(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const onChangeCashItem = (e) => {
    const nextCashItem = {
      ...cashItem,
      [e.target.name]: e.target.value,
    };
    setCashItem(nextCashItem);
  };

  const onClickCreate = () => {
    console.log(cashItem);
    axios
      .post('http://127.0.0.1:8000/cash/create/', cashItem)
      .then(function (response) {
        alert('출금 신청이 완료되었습니다.');
        window.location.href = '/mypage';
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={classes.div}>
      <Typography variant="h5" align="center" style={{ marginBottom: '10px' }}>
        출금 신청 가능 금액 {total} 원
      </Typography>
      <TextField
        className={classes.input}
        variant="outlined"
        required
        fullWidth
        id="price"
        label="출금 요청 금액"
        name="price"
        onChange={onChangeCashItem}
      />
      <TextField
        className={classes.input}
        variant="outlined"
        required
        fullWidth
        id="bank"
        label="은행"
        name="bank"
        onChange={onChangeCashItem}
      />
      <TextField
        className={classes.input}
        variant="outlined"
        required
        fullWidth
        id="account"
        label="계좌번호"
        name="account"
        onChange={onChangeCashItem}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.input}
        onClick={onClickCreate}
      >
        출금 신청
      </Button>
    </div>
  );
};

export default CashCreate;
