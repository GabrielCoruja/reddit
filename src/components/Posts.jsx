import React, { useContext } from 'react';
import context from '../context/context';

const Posts = () => {
  const { subreddit, isFetching } = useContext(context);

  if (!subreddit || isFetching) return <div> Loading...</div>
  return (
    <div>
      {subreddit.map((posts) => <p key={posts.data.title}>{posts.data.title}</p>)}
    </div>
  );
};

export default Posts;
