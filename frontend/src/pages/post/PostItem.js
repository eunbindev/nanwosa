import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Chip,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
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
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  chip: {
    marginLeft: theme.spacing(1),
  },
}));

const PostItem = ({ post }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={post.image}
        title="post image"
      />
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {post.writer} | {post.date} | {post.category}
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
        <Typography variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {post.price}원 ({post.curnum}/{post.totalnum})
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" href={'http://127.0.0.1:3000/post/' + post.id}>
          상세보기
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostItem;
