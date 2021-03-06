require("dotenv").config();
module.exports = {
  tumblr: {
    blog: "natureisfuckinglit",
    credentials: {
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      token: process.env.TOKEN,
      token_secret: process.env.TOKEN_SECRET
    }
  },
  subreddit: "natureisfuckinglit",
  //server with GET and POST to store an array of ids (jsonstore.io recommended)
  db:
    "https://www.jsonstore.io/7400e86e797b508a5c9269d5662cf79b0442acd032f8f40cf4bd44faf1521ef8/posted/"
};
