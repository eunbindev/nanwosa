import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem';
import { makeStyles, TextField, MenuItem, Grid } from '@material-ui/core';

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

const PostList = () => {
  const classes = useStyles();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoryItem, setCategoryItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/post');
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

  const onChangeCategory = (e) => {
    const category = e.target.value;
    setCategoryItem(category);
    if (category === '전체') {
      axios.get('http://127.0.0.1:8000/post').then((response) => {
        setPost(response.data);
      });
    } else {
      axios
        .get('http://127.0.0.1:8000/post/search?search=' + category)
        .then((response) => {
          setPost(response.data);
        });
    }
  };

  const onChangeTitle = (e) => {
    const title = e.target.value;

    if (categoryItem === '전체') {
      axios
        .get('http://localhost:8000/post/search?search=' + title)
        .then((response) => {
          setPost(response.data);
        });
    } else {
      axios
        .get(
          'http://localhost:8000/post/search?search=' +
            categoryItem +
            '&search=' +
            title,
        )
        .then((response) => {
          setPost(response.data);
        });
    }
  };

  return (
    <div className={classes.div}>
      <Grid container>
        <Grid item xs={4}>
          <TextField
            className={classes.input}
            variant="outlined"
            required
            fullWidth
            id="category"
            label="카테고리"
            name="category"
            defaultValue="전체"
            onChange={onChangeCategory}
            select
          >
            <MenuItem value="전체">전체</MenuItem>
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
        <Grid item xs={8}>
          <TextField
            className={classes.input}
            variant="outlined"
            required
            fullWidth
            id="title"
            label="상품명"
            name="title"
            onChange={onChangeTitle}
          />
        </Grid>
      </Grid>

      {post.map((post) => <PostItem key={post.id} post={post} />).reverse()}
    </div>
  );
};

export default PostList;
