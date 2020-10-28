import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  makeStyles,
  Table,
  TableRow,
  TableCell,
  Typography,
  Button,
  Card,
  CardContent,
} from '@material-ui/core';

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
  },
  table: {
    border: '1px solid #E0E0E0',
    marginBottom: theme.spacing(2),
  },
  in: {
    backgroundColor: '#3F51B5',
    padding: '2px',
  },
  out: {
    backgroundColor: '#E0E0E0',
    padding: '2px',
  },
  card: {
    paddingBottom: '0px',
  },
}));

const CashDetail = ({ match }) => {
  const classes = useStyles();

  const [cash, setCash] = useState([]);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);

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
  return (
    <div>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Typography align="center" variant="h6" color="textSecondary">
            정산 가능 금액 {total} 원
          </Typography>
        </CardContent>
        <Button
          className={classes.input}
          size="small"
          fullWidth
          href="/cash/create"
        >
          출금 신청
        </Button>
        <Table className={classes.table}>
          {cash
            .map((cash) => (
              <TableRow key={cash.id}>
                {cash.type === true ? (
                  <TableCell className={classes.in} />
                ) : (
                  <TableCell className={classes.out} />
                )}
                <TableCell>{cash.detail}</TableCell>
                <TableCell>{cash.date}</TableCell>
                <TableCell>
                  {cash.type === true ? '+' : '-'}
                  {cash.price}원
                </TableCell>
              </TableRow>
            ))
            .reverse()}
        </Table>
      </Card>
    </div>
  );
};

export default CashDetail;
