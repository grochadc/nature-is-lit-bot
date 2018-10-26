const assert = require('assert');
const compare = require('../lib/compare');
const axios = require('axios');

const store = 'https://www.jsonstore.io/7400e86e797b508a5c9269d5662cf79b0442acd032f8f40cf4bd44faf1521ef8/posted/'
const subreddit = 'http://www.reddit.com/r/natureisfuckinglit/top.json'

describe('jsonstore GET', () => {
  it('Retrieves the array from jsonstore', () => {
    axios(store).then(({status, data}) => {
      assert.equal(status, 200)
    })
  })
  it('Retrieves posts from reddit',() => {
    axios(subreddit).then(({status}) => assert.equal(status, 200))
  })
  it('Compares array of posted to new posts', async (done) => {
    const posted = (await axios(store)).data.result;
    const links = (await axios(subreddit)).data.data.children.map(link  => link.data.name);
    console.log(compare(posted, links))
  })
})
