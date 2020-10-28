import React from 'react';
import {
  makeStyles,
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
  Link,
  IconButton,
  Container,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(0.5),
  },
  title: {
    textDecoration: 'none',
  },
}));

const Header = ({ history }) => {
  const classes = useStyles();

  const onClickLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <img
              src="/images/logo.svg"
              style={{ width: ' 40px', marginRight: '10px' }}
              alt="logo"
            />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              <Link href="/" style={{ textDecoration: 'none' }}>
                나눠사
              </Link>
            </Typography>
            {/* username 이 localStorage 에 저장되어 있는지 확인 */}
            {localStorage.getItem('username') ? (
              <>
                <Typography>{localStorage.getItem('username')}님</Typography>
                <IconButton href="/mypage">
                  <AccountCircleIcon fontSize="large" />
                </IconButton>
                <Button
                  color="primary"
                  variant="outlined"
                  className={classes.link}
                  onClick={onClickLogout}
                >
                  로그아웃
                </Button>
                <Button
                  href="/post/write"
                  color="primary"
                  variant="outlined"
                  className={classes.link}
                >
                  거래 등록
                </Button>
              </>
            ) : (
              <Button
                href="/login"
                color="primary"
                variant="outlined"
                className={classes.link}
              >
                로그인/회원가입
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
