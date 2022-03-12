const apiBaseUrl = `https://api.github.com/users`;

// error display
const errorMessage = (status) => {
    const messageDiv = document.querySelector("#message");
    let errmsg = ``;

    if (status === 404) {
        errmsg = `<div class = "alert alert-danger text-center">Profile doesn't exist !! </div>`;
    }

    messageDiv.innerHTML = errmsg;
    setTimeout(() => (messageDiv.innerHTML = ``), 5000);
};

// get github profile
const getGithubProfile = async (login) => {
    try {
        const response = await fetch(`${apiBaseUrl}/${login}`);
        if (response.status !== 200) {

            if (response.status === 404) {
                errorMessage(response.status);
            }
            new Error(`Something went wrong! Status Code : ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.log(error);
    }
};

// get git repos
const getGithubRepos = async (login) => {

    try {
        const response = await fetch(`${apiBaseUrl}/${login}/repos`);
        if (response.status !== 200) {
            new Error(`Something went wrong! Status Code : ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }

};

// render github profile
const renderProfile = (data) => {
    let profileSnippet = ``;
    profileSnippet += `<div class="profile-userpic">
                       <img src="${data.avatar_url}" class="d-block">
                       </div>
                       <div class="profile-usertitle">`;
    if(data.name !== null){
        profileSnippet += `<div class="profile-usertitle-name">${data.name}</div>`;
    }

    profileSnippet += `<div class="profile-usertitle-job">${data.login}</div>
                       </div>
                       <div class="portlet light bordered">
                       <!-- STAT -->
                       <div class="row list-separated profile-stat">
                       <div class="col-md-6 col-sm-6 col-xs-6">
                            <div class="uppercase profile-stat-title">${data.followers}</div>
                            <div class="uppercase profile-stat-text"> Followers </div>
                       </div>
                       <div class="col-md-6 col-sm-6 col-xs-6">
                            <div class="uppercase profile-stat-title">${data.following}</div>
                            <div class="uppercase profile-stat-text"> Following </div>
                        </div>
                        </div>`;
    
    if(data.bio !== null){
        profileSnippet += `<div><h4 class="profile-desc-title">About ${data.name}</h4>
                           <span class="profile-desc-text"> ${data.bio}</span></div>`;
    }

    if(data.twitter_username !== null){
        profileSnippet += `<div class="margin-top-20 profile-desc-link">
                           <i class="fab fa-twitter"></i>
                           <a target="_blank" href="https://www.twitter.com/${data.twitter_username}">${data.twitter_username}</a>
                           </div>`;
    }

    profileSnippet += `</div>`;
    document.querySelector("#profile").innerHTML = profileSnippet;

};


// list repos
const listRepos = (repos) => {
    let repoList = ``;

    if(repos.length > 0){
        repos.forEach(repo =>{

            repoList += `<li class="mb-3 d-flex flex-content-stretch col-12 col-md-6 col-lg-6">
                <div class="card" style="width: 22.5rem;">
                <div class="card-body">
                <h5 class="card-title">
                <a href="${repo.html_url}" target = "_blank">${repo.name}</a>
                </h5>
                <p class="card-text">${
                    repo.description !== null? repo.description : ""
                }</p>
                <p>`;
                
            if(repo.language !== null){
                repoList += `<i class="fas fa-circle ${repo.language ? repo.language.toLowerCase() : ""} "></i> ${repo.language} `;
            }
                
            repoList += `<i class="far fa-star"></i> ${repo.stargazers_count}
                </p>
                </div>
                </div></li>`;

        })
    }

    document.querySelector("#repos").innerHTML = repoList;

};

document.addEventListener("DOMContentLoaded", () => {
    
    const searchForm = document.querySelector("#searchForm");
    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const searchInput = document.querySelector("#searchInput");
        const githubLogin = searchInput.value.trim();

        if (githubLogin.length > 0) {
            const userProfile = await getGithubProfile(githubLogin);

            if (userProfile.login) {
                const gitRepos = await getGithubRepos(githubLogin)
                console.log(gitRepos);
                renderProfile(userProfile);
                listRepos(gitRepos);
                document.querySelector("#footer").style.display = "block";
                document.querySelector(".profile-sidebar").style.display = "block";
                document.querySelector(".profile-content").style.display = "block";
                document.querySelector(".profile").style.display = "block";
            }
        }
    });

});