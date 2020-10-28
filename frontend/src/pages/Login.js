import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ history }) => {
  const classes = useStyles();

  // 로그인 정보를 위한 useStste
  const [login, setLogin] = useState();

  // 로그인 정보 binding
  const onChangeLogin = (e) => {
    const nextLogin = {
      ...login,
      [e.target.name]: e.target.value,
    };
    setLogin(nextLogin);
  };

  // 로그인 실행
  const onClickLogin = () => {
    axios
      .post('http://localhost:8000/rest-auth/login/', {
        username: login.username,
        password: login.password,
      })
      .then(function (response) {
        console.log(response);
        localStorage.setItem('username', login.username);
        localStorage.setItem('token', response.data.key);
        window.location.href = '/post/list';
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="아이디"
          name="username"
          autoFocus
          onChange={onChangeLogin}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="비밀번호"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={onChangeLogin}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onClickLogin}
        >
          로그인
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/signup" variant="body2">
              회원가입
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;
