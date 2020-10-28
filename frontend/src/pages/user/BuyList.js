import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
} from '@material-ui/core';

const BuyList = (props) => {
  const [buy, setBuy] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/buy?' +
            props.type +
            '=' +
            localStorage.getItem('username'),
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

  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">구매 날짜</TableCell>
                  <TableCell align="center">상품명</TableCell>
                  <TableCell align="center">
                    {props.type === 'seller' ? '구매자' : '판매자'}
                  </TableCell>
                  <TableCell align="center">상태</TableCell>
                  <TableCell align="center">상세보기</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {buy
                  .map((buy) => (
                    <TableRow key={buy.id}>
                      <TableCell align="center">{buy.date}</TableCell>
                      <TableCell align="center">
                        <Button href={'http://127.0.0.1:3000/post/' + buy.post}>
                          {buy.postTitle}
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        {props.type === 'seller' ? buy.buyer : buy.seller}
                      </TableCell>
                      <TableCell align="center">{buy.status}</TableCell>
                      <TableCell align="center">
                        <Button href={'/buy/detail/' + buy.id}>상세보기</Button>
                      </TableCell>
                    </TableRow>
                  ))
                  .reverse()}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyList;
