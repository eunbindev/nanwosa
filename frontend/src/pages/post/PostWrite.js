import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles, Button, TextField, MenuItem } from '@material-ui/core';

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

const PostWrite = ({ history }) => {
  const classes = useStyles();

  const [post, setPost] = useState({
    title: '',
    category: '',
    price: 0,
    totalnum: 0,
    dealtype: '',
    content: '',
    writer: localStorage.getItem('username'),
    image: null,
  });

  const onChangePost = (e) => {
    const nextPost = {
      ...post,
      [e.target.name]: e.target.value,
    };
    setPost(nextPost);
  };

  const onChangeImage = (e) => {
    const nextPost = {
      ...post,
      image: e.target.files[0],
    };
    setPost(nextPost);
  };

  const onClickWrite = (e) => {
    e.preventDefault();

    let form_data = new FormData();
    if (post.image !== null) {
      form_data.append('image', post.image, post.image.name);
    }
    form_data.append('title', post.title);
    form_data.append('category', post.category);
    form_data.append('price', post.price);
    form_data.append('totalnum', post.totalnum);
    form_data.append('dealtype', post.dealtype);
    form_data.append('content', post.content);
    form_data.append('writer', post.writer);
    let url = 'http://localhost:8000/post/create/';
    axios
      .post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(form_data);
        history.push('/post/list');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.div}>
      <form onSubmit={onClickWrite}>
        <TextField
          className={classes.input}
          variant="outlined"
          required
          fullWidth
          id="title"
          label="상품명"
          name="title"
          onChange={onChangePost}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          required
          fullWidth
          id="category"
          label="카테고리"
          name="category"
          onChange={onChangePost}
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
        <TextField
          className={classes.input}
          variant="outlined"
          required
          fullWidth
          id="price"
          label="가격"
          name="price"
          onChange={onChangePost}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          required
          fullWidth
          id="totalnum"
          label="모집 인원"
          name="totalnum"
          onChange={onChangePost}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          required
          fullWidth
          id="dealtype"
          label="거래 방법"
          name="dealtype"
          onChange={onChangePost}
          select
        >
          <MenuItem value="직거래">직거래</MenuItem>
          <MenuItem value="택배거래">택배거래</MenuItem>
        </TextField>
        <TextField
          className={classes.input}
          variant="outlined"
          required
          fullWidth
          name="content"
          label="세부설명"
          multiline
          rows={10}
          id="content"
          onChange={onChangePost}
        />
        <input
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          onChange={onChangeImage}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.input}
        >
          거래 등록
        </Button>
      </form>
    </div>
  );
};

export default PostWrite;
