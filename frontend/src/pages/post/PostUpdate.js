import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const PostUpdate = ({ match, history }) => {
  const classes = useStyles();

  const param = match.params;

  const [post, setPost] = useState({
    id: '',
    title: '',
    category: '',
    price: 0,
    totalnum: 0,
    dealtype: '',
    content: '',
    writer: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/post/' + param.id,
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

  const onChangePost = (e) => {
    const nextPost = {
      ...post,
      [e.target.name]: e.target.value,
    };
    setPost(nextPost);
  };
  // 게시물 수정
  const onClickUpdate = () => {
    axios
      .put('http://127.0.0.1:8000/post/' + param.id + '/update', {
        title: post.title,
        category: post.category,
        price: post.price,
        totalnum: post.totalnum,
        dealtype: post.dealtype,
        content: post.content,
        writer: post.writer,
      })
      .then(function (response) {
        history.push('/post/list');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="title"
              label="상품명"
              name="title"
              onChange={onChangePost}
              defaultValue={post.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="category"
              label="카테고리"
              name="category"
              onChange={onChangePost}
              defaultValue={post.category}
              select
            >
              <MenuItem value="디지털/가전">디지털/가전</MenuItem>
              <MenuItem value="가구/인테리어">가구/인테리어</MenuItem>
              <MenuItem value="유아동/유아도서">유아동/유아도서</MenuItem>
              <MenuItem value="생활/가공식품">생활/가공식품</MenuItem>
              <MenuItem value="스포츠/레저">스포츠/레저</MenuItem>
              <MenuItem value="패션/잡화">패션/잡화</MenuItem>
              <MenuItem value="게임/취미">게임/취미</MenuItem>
              <MenuItem value="뷰티/미용">뷰티/미용</MenuItem>
              <MenuItem value="반려동물용품">반려동물용품</MenuItem>
              <MenuItem value="도서/티켓/음반">도서/티켓/음반</MenuItem>
              <MenuItem value="기타">기타</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="price"
              label="가격"
              name="price"
              onChange={onChangePost}
              defaultValue={post.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="totalnum"
              label="모집 인원"
              name="totalnum"
              onChange={onChangePost}
              defaultValue={post.totalnum}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="dealtype"
              label="거래 방법"
              name="dealtype"
              onChange={onChangePost}
              defaultValue={post.dealtype}
              select
            >
              <MenuItem value="직거래">직거래</MenuItem>
              <MenuItem value="택배거래">택배거래</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="content"
              label="세부설명"
              multiline
              rows={10}
              id="content"
              onChange={onChangePost}
              defaultValue={post.content}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onClickUpdate}
        >
          거래 수정
        </Button>
      </div>
    </>
  );
};

export default PostUpdate;
