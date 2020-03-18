import React, { useContext, useEffect } from 'react';
import context from '../context/context';
import subredditAPI from '../services/redditAPI';

const SelectPost = () => {
  const {
    subreddit,
    setSubreddit,
    pageRefresh,
    setSelectedValue,
    selectedValue,
    setDate,
    date,
  } = useContext(context);
  
  useEffect(() => {
    subredditAPI(setSubreddit, 'reactjs');
    setDate(new Date().toLocaleTimeString());
  }, []);
  
  let post = selectedValue;
  if (subreddit) {
    post = subreddit[0].data.subreddit
  }
  setSelectedValue(post);
  
  return (
    <div>
      <h1>Selected: { post } </h1>
      <p data-testId="data">{ date }</p>
      <button onClick={() => {subredditAPI(setSubreddit, 'frontend')}}>frontend</button>
      <button onClick={() => {subredditAPI(setSubreddit, 'reactjs')}}>reactjs</button>
      <button onClick={() => pageRefresh()}>refresh</button>
    </div>
  );
};

export default SelectPost;
