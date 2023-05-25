const swapiApp = (async function () {
    const SWAPIURL = "https://swapi.dev/api"
    const navBar = document.querySelector("#nav-bar")

try{
    const response = await fetch(SWAPIURL)
    const jsonData = response.json()
    for(let key in jsonData){
        let navItem = document.createElement("a");
        navItem.addEventListener("click", navClick)
        navItem.className = "nav-item"
        navItem.innerText = key;
        navItem.href = jsonData[key];
        navBar.appendChild(navItem);
    }
}
catch(error){
    console.log(error);
}

async function navClick(e) {
    this.preventDefault();
    let data = await getData(this.href);
    console.log(data);
}

async function getData(url){
    const response = await fetch(url);
    return await response.json();
}

})();