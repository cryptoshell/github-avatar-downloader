const request = require('request');

function requestOptions(path) {
  return {
    url: 'https://api.github.com' + path,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader Project'
    },
    qs: {
      access_token: process.env.GITHUB_ACCESS_TOKEN
    }
  };
}

function getRepoContributors(repoOwner, repoName, cb) {
  const path = '/repos/'+repoOwner+'/'+repoName+'/contributors';
  request(requestOptions(path), function (error, response, body) {
    try {
      const data = JSON.parse(body);
      cb(data);
    } catch (err) {
      console.log('Failed to parse body content');
    }
  });
}


var repoOwner = process.argv[2];
var repoName = process.argv[3];

getRepoContributors(repoOwner, repoName, (data) => {
  data.forEach((contributor) => {
    console.log(contributor.avatar_url);
  })
});