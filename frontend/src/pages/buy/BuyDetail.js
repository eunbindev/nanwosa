import React, { useState, useEffect } from 'react';

import {
  makeStyles,
  TextField,
  Button,
  MenuItem,
  Typography,
  Table,
  TableRow,
  TableCell,
} from '@material-ui/core';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  div: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  input: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  background: {
    backgroundColor: '#f5f5f5',
    width: '100px',
  },
  table: {
    border: '1px solid #E0E0E0',
    marginBottom: theme.spacing(2),
  },
}));

const BuyDetail = ({ match, history }) => {
  const classes = useStyles();

  const param = match.params;

  const [buy, setBuy] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/buy/' + param.id,
        );
        setBuy(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>...loading...</div>;
  }
  if (!buy) {
    return null;
  }

  const onChangeBuy = (e) => {
    const nextBuy = {
      ...buy,
      [e.target.name]: e.target.value,
    };
    setBuy(nextBuy);
  };

  // 구매 회원이 정산 버튼을 누를 때
  const onClickCash = () => {
    const cash = {
      type: true,
      detail: buy.buyer + ' 회원과의 ' + buy.postTitle + ' 거래 정산',
      price: buy.price,
      buy: buy.id,
      seller: buy.seller,
    };

    axios
      .post('http://127.0.0.1:8000/cash/create/', cash)
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });

    // buy 의 status 를 정산완료 로 변경
    const nextBuy = {
      ...buy,
      status: '정산완료',
    };

    axios
      .put('http://127.0.0.1:8000/buy/update/' + param.id, nextBuy)
      .then(function () {
        alert('주문 내역이 수정되었습니다.');
        history.push('/mypage');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onClickUpdate = () => {
    axios
      .put('http://127.0.0.1:8000/buy/update/' + param.id, buy)
      .then(function () {
        alert('주문 내역이 수정되었습니다');
        history.push('/mypage');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={classes.div}>
      {buy.seller === localStorage.getItem('username') ? (
        <>
          <Typography align="center" variant="h5" gutterBottom>
            판매 상세 페이지
          </Typography>
          {buy.dealtype === '직거래' ? (
            <>
              <Table className={classes.table}>
                <TableRow>
                  <TableCell className={classes.background}>주문번호</TableCell>
                  <TableCell align="left">{buy.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.background}>거래</TableCell>
                  <TableCell align="left">
                    <a href={'http://127.0.0.1:3000/post/' + buy.post}>
                      {buy.postTitle}
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.background}>주문자</TableCell>
                  <TableCell align="left">{buy.buyer}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.background}>주문날짜</TableCell>
                  <TableCell align="left">{buy.date}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.background}>전화번호</TableCell>
                  <TableCell align="left">{buy.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.background}>기타</TableCell>
                  <TableCell align="left">{buy.about}</TableCell>
                </TableRow>
              </Table>

              <TextField
                className={classes.input}
                variant="outlined"
                required
                fullWidth
                id="status"
                label="상태"
                name="status"
                onChange={onChangeBuy}
                defaultValue={buy.status}
                select
              >
                <MenuItem value="주문접수">주문접수</MenuItem>
                <MenuItem value="주문확인">주문확인</MenuItem>
                <MenuItem value="거래완료">거래완료</MenuItem>
              </TextField>
            </>
          ) : (
            <>
              <Table className={classes.table}>
                <TableRow>
                  <TableCell className={classes.background}>주문번호</TableCell>
                  <TableCell align="left">{buy.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.background}>거래</TableCell>
                  <TableCell align="left">
                    <a href={'http://127.0.0.1:3000/post/' + buy.post}>
                      상세보기
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.background}>구매자</TableCell>
                  <TableCell align="left">{buy.buyer}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.background}>판매자</TableCell>
                  <TableCell align="left">{buy.seller}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.background}>주문날짜</TableCell>
                  <TableCell align="left">{buy.date}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.background}>이름</TableCell>
                  <TableCell align="left">{buy.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.background}>주소</TableCell>
                  <TableCell align="left">{buy.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.background}>전화번호</TableCell>
                  <TableCell align="left">{buy.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.background}>기타</TableCell>
                  <TableCell align="left">{buy.about}</TableCell>
                </TableRow>
              </Table>

              <TextField
                className={classes.input}
                variant="outlined"
                required
                fullWidth
                id="status"
                label="상태"
                name="status"
                onChange={onChangeBuy}
                defaultValue={buy.status}
                select
              >
                <MenuItem value="주문접수">주문접수</MenuItem>
                <MenuItem value="주문확인">주문확인</MenuItem>
                <MenuItem value="배송중">배송중</MenuItem>
                <MenuItem value="거래완료">거래완료</MenuItem>
              </TextField>
              <TextField
                className={classes.input}
                variant="outlined"
                required
                fullWidth
                id="tracknum"
                label="운송장 번호"
                name="tracknum"
                onChange={onChangeBuy}
                defaultValue={buy.tracknum}
              ></TextField>
            </>
          )}

          <Button
            className={classes.input}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onClickUpdate}
          >
            수정하기
          </Button>
        </>
      ) : (
        <>
          <Typography align="center" variant="h5" gutterBottom>
            구매 상세 페이지
          </Typography>
          <Table className={classes.table}>
            <TableRow>
              <TableCell className={classes.background}>주문번호</TableCell>
              <TableCell align="left">{buy.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.background}>상태</TableCell>
              <TableCell align="left">{buy.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.background}>상품명</TableCell>
              <TableCell align="left">
                <a href={'http://127.0.0.1:3000/post/' + buy.post}>
                  {buy.postTitle}
                </a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.background}>구매자</TableCell>
              <TableCell align="left">{buy.buyer}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.background}>판매자</TableCell>
              <TableCell align="left">{buy.seller}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.background}>주문날짜</TableCell>
              <TableCell align="left">{buy.date}</TableCell>
            </TableRow>
          </Table>
          {buy.dealtype === '직거래' ? (
            <>
              <TextField
                className={classes.input}
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="전화번호"
                name="phone"
                onChange={onChangeBuy}
                defaultValue={buy.phone}
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
                defaultValue={buy.about}
              />
            </>
          ) : (
            <>
              <TextField
                className={classes.input}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="이름"
                name="name"
                onChange={onChangeBuy}
                defaultValue={buy.name}
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
                defaultValue={buy.address}
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
                defaultValue={buy.phone}
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
                defaultValue={buy.about}
              />
            </>
          )}
          {buy.status === '주문접수' ? (
            <Button
              className={classes.input}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={onClickUpdate}
            >
              수정하기
            </Button>
          ) : (
            <></>
          )}

          {buy.status === '거래완료' ? (
            <Button
              className={classes.input}
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={onClickCash}
            >
              정산하기
            </Button>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default BuyDetail;
