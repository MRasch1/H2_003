import { ignore } from "./modules/filter.js";

const swapiApp = (async function () {

    const SWAPIURL = "https://swapi.dev/api";
    const navBar = document.querySelector("#nav-bar");
    const cardContainer = document.querySelector(".card-container");

    try {
        const response = await fetch(SWAPIURL);
        const jsonData = await response.json();
        for (let key in jsonData) {
            let navItem = document.createElement("a");
            navItem.addEventListener("click", navClick);
            navItem.className = "nav-item";
            navItem.innerText = key;
            navItem.href = jsonData[key];
            navBar.appendChild(navItem);
        }
        // Simulerer et museklik på "nav-item" [0] i "nav-bar"
        document.querySelectorAll(".nav-item")[0].click();
    }
    catch (error) {
        console.log(error);
    }

    async function navClick(e) {
        e.preventDefault();
        cardContainer.innerHTML = "";
        document.querySelector(".active")?.classList.remove("active");
        this.classList.add("active");
        let data = await getData(this.href);
        showData(data);
      
        // Show btnPrev and btnNext
        const pagingContainer = document.querySelector("#paging");
        pagingContainer.style.display = ""; // Reset the display property
      }      

    function showData(data) {
        const pagingContainer = document.querySelector("#paging");
        pagingContainer.innerHTML = "";
      
        if (data.previous) {
          const btnPrev = document.createElement("a");
          btnPrev.className = "material-symbols-outlined";
          btnPrev.innerText = "<";
          btnPrev.href = data.previous;
          btnPrev.addEventListener("click", getPage);
          pagingContainer.appendChild(btnPrev);
        }
      
        if (data.next) {
          const btnNext = document.createElement("a");
          btnNext.className = "material-symbols-outlined";
          btnNext.innerText = ">";
          btnNext.href = data.next;
          btnNext.addEventListener("click", getPage);
          pagingContainer.appendChild(btnNext);
        }
      
        cardContainer.innerHTML = ""; // Clear all cards
        data.results.forEach((dataItem, index) => {
          let card = document.createElement("div");
          card.className = "card";
          for (let [k, v] of Object.entries(dataItem)) {
            if (ignore.includes(k) && !card.classList.contains("selected")) {
              continue;
            }
            card.insertAdjacentHTML(
              "beforeend",
              `<span class="key">${k.replaceAll("_", " ")}:</span> <span class="val">${v}</span><br>`
            );
          }
          card.addEventListener("click", () => {
            cardContainer.innerHTML = ""; // Clear all cards
            let selectedCard = document.createElement("div");
            selectedCard.className = "card selected";
            for (let [k, v] of Object.entries(dataItem)) {
              selectedCard.insertAdjacentHTML(
                "beforeend",
                `<span class="key">${k.replaceAll("_", " ")}:</span> <span class="val">${v}</span><br>`
              );
            }
            cardContainer.appendChild(selectedCard);
      
            // Hide btnPrev and btnNext
            pagingContainer.style.display = "none";
          });
          cardContainer.appendChild(card);
        });
      }
      

    async function getPage(e) {
        e.preventDefault()
        const data = await getData(this.href);
        showData(data);
    }

    async function getData(url) {
        const response = await fetch(url);
        return await response.json();
    }

})();
