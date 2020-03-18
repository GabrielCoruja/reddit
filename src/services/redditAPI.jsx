const subredditAPI = (action, type) =>
  fetch(`https://www.reddit.com/r/${type}.json`)
    .then((response) => response.json())
    .then((data) => action(data.data.children));

export default subredditAPI;
