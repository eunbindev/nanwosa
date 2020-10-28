import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
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

const SignUp = ({ history }) => {
  const classes = useStyles();

  // 유저 정보를 위한 useStste
  const [user, setUser] = useState({
    username: '',
    password1: '',
    password2: '',
  });

  // 유저 정보 binding
  const onChangeUser = (e) => {
    const tmpUser = {
      ...user,
      [e.target.name]: e.target.value,
    };
    setUser(tmpUser);
  };

  // 회원가입 실행
  const onClickSignUp = () => {
    axios
      .post('http://localhost:8000/rest-auth/registration/', {
        username: user.username,
        password1: user.password1,
        password2: user.password2,
      })
      .then(function (response) {
        console.log(response);
        alert('로그인 페이지로 이동합니다.');
        window.location.href = '/login';
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          회원가입
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
          onChange={onChangeUser}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password1"
          label="비밀번호"
          type="password"
          id="password1"
          onChange={onChangeUser}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password2"
          label="비밀번호 확인"
          type="password"
          id="password2"
          onChange={onChangeUser}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onClickSignUp}
        >
          회원가입
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              로그인
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default SignUp;
