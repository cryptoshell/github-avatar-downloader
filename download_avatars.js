const request = require('request');
const fs = require('fs');

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
    if (repoOwner && repoName) {
      const data = JSON.parse(body);
      cb(data);
    } else {
      console.log("Error - Please enter two valid arguments: repoOwner and repoName");
      return;
    }
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url).pipe(fs.createWriteStream(filePath));
}

// Command line arguments
var repoOwner = process.argv[2];
var repoName = process.argv[3];

getRepoContributors(repoOwner, repoName, (data) => {
  data.forEach((contributor) => {
    downloadImageByURL(contributor.avatar_url, "avatars/"+contributor.login+".jpg");
  })
});