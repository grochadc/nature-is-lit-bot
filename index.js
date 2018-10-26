const reddit = require("./clients/redditClient.js");
const tumblr = require("./clients/tumblrClient.js");
const getImageData = require("./lib/getImageData.js");
const compare = require("./lib/compare");
const path = require("path");
const axios = require("axios");

(async () => {
  try {
    let links = (await reddit("r/natureisfuckinglit")).filter(
      link =>
        typeof link.url == "string" &&
        path.extname(link.url) == (".jpg" || ".jpeg" || ".png")
    );
    let posted = (await axios(
      "https://www.jsonstore.io/7400e86e797b508a5c9269d5662cf79b0442acd032f8f40cf4bd44faf1521ef8/posted/"
    )).data.result;
    let comparedNames = compare(posted, links.map(link => link.name));
    let linksToPost = links.filter(link => { let condition = (comparedNames.indexOf(link.name) >= 0) });
    console.log(linksToPost.length, comparedNames.length)
    let posting = linksToPost.map(link => link.name)
    linksToPost.forEach(async link => {
      /*let image = await getImageData(link.url);
        tumblr.post({
        caption: `<a href="http://reddit.com/${link.permalink}"> ${
          link.title
        }</a>`,
        data64: image
      });*/
    });
    let merged = posted ? posted.concat(posting) : posting;
    /*axios.post(
      "https://www.jsonstore.io/7400e86e797b508a5c9269d5662cf79b0442acd032f8f40cf4bd44faf1521ef8/posted/",
      merged
    )
    .then(({status, statusText}) => console.log('Posting db status: ', status, statusText));*/
  } catch (err) {
    console.error(err);
  }
})();
