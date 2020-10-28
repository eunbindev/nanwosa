import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { postredux } from '../../modules/post';
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Button,
  Grid,
  CardMedia,
} from '@material-ui/core';
import {
  SentimentVerySatisfied,
  SentimentVeryDissatisfied,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100%',
    margin: theme.spacing(1, 0, 3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  chip: {
    marginLeft: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  div: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

const PostDetail = ({ match, history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const param = match.params;

  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/post/' + param.id,
        );
        setPost(response.data);
        dispatch(postredux(response.data));
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

  // 게시물 삭제
  const onClickDelete = () => {
    axios
      .delete('http://127.0.0.1:8000/post/' + param.id + '/delete')
      .then(function (response) {
        alert('게시물 삭제가 완료되었습니다.');
        history.push('/post/list');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onClickBuy = () => {
    if (localStorage.getItem('username') === null) {
      alert('로그인이 필요합니다.');
      history.push('/login');
    } else {
      history.push('/buy/create');
    }
  };

  return (
    <div className={classes.div}>
      <Card className={classes.root} variant="outlined">
        {post.image == null ? (
          <></>
        ) : (
          <CardMedia
            className={classes.media}
            image={post.image}
            title="post image"
          />
        )}
        <CardContent>
          <Typography variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {post.price}원 ({post.curnum}/{post.totalnum})
            <Chip size="small" label={post.dealtype} className={classes.chip} />
            {post.totalnum !== post.curnum ? (
              <Chip
                color="primary"
                size="small"
                label="거래 가능"
                avatar={
                  <Avatar>
                    <SentimentVerySatisfied />
                  </Avatar>
                }
                className={classes.chip}
              />
            ) : (
              <Chip
                color="secondary"
                size="small"
                label="거래 완료"
                className={classes.chip}
                avatar={
                  <Avatar>
                    <SentimentVeryDissatisfied />
                  </Avatar>
                }
              />
            )}
          </Typography>
          <Typography
            align="right"
            variant="caption"
            display="block"
            gutterBottom
          >
            {post.writer} | {post.date} | {post.category}
          </Typography>
          <hr />
          <Typography variant="body2" component="p">
            {post.content}
          </Typography>
        </CardContent>
        {post.writer === localStorage.getItem('username') ? (
          <>
            <Grid container>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  href={'http://127.0.0.1:3000/post/update/' + param.id}
                  fullWidth
                >
                  수정
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={onClickDelete}
                  fullWidth
                >
                  삭제
                </Button>
              </Grid>
            </Grid>
          </>
        ) : post.totalnum !== post.curnum ? (
          <>
            <Button
              variant="contained"
              size="small"
              color="primary"
              fullWidth
              onClick={onClickBuy}
            >
              구매
            </Button>
          </>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
};

export default PostDetail;
