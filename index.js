function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>' + ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  var username = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}

function getCommits(el) {
  var username = document.getElementById("username").value
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}

//function getBranches(el) {
//  var username = document.getElementById("username").value
  //const name = el.dataset.repo
  //const req = new XMLHttpRequest()
  //req.addEventListener("load", displayBranches)
  //req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/branches')
  //req.send()
//}

//function displayBranches() {
  //const branches = JSON.parse(this.responseText)
  //const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name '</strong>' + '</li>').join('')}</ul>`
  //document.getElementById("branches").innerHTML = branchesList
//}
