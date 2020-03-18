import React, { useState } from 'react';
import PropTypes from 'prop-types';

import context from './context';
import subredditAPI from '../services/redditAPI';

const Provider = ({ children }) => {
  const [subreddit, setSubreddit] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [selectedValue, setSelectedValue] = useState('reactjs');
  const [date, setDate] = useState();

  const pageRefresh = () => {
    setIsFetching(true);
    setSubreddit('');
    refreshAPI();
  };

  const refreshAPI = () => {
    subredditAPI(setSubreddit, selectedValue);
    setIsFetching(false);
    setDate(String(new Date().toLocaleTimeString()));
  }

  const storeContext = {
    subreddit,
    setSubreddit,
    isFetching,
    setIsFetching,
    pageRefresh,
    selectedValue,
    setSelectedValue,
    date,
    setDate,
  };

  return <context.Provider value={storeContext}>{children}</context.Provider>;
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
