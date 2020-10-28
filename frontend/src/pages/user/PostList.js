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

const SellerList = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/post?writer=' +
            localStorage.getItem('username'),
        );
        setPost(response.data);
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
  if (!post) {
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
                  <TableCell align="center">등록 날짜</TableCell>
                  <TableCell align="center">상품명</TableCell>
                  <TableCell align="center">현황</TableCell>
                  <TableCell align="center">상세보기</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {post
                  .map((post) => (
                    <TableRow key={post.id}>
                      <TableCell align="center">{post.date}</TableCell>
                      <TableCell align="center">{post.title}</TableCell>
                      <TableCell align="center">
                        ({post.curnum}/{post.totalnum})
                      </TableCell>
                      <TableCell align="center">
                        <Button href={'http://127.0.0.1:3000/post/' + post.id}>
                          상세보기
                        </Button>
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

export default SellerList;
