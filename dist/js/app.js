 "use strict";

 class MarvelApi {
     constructor(parentElement, input, search) {
         this.PUBLIC_KEY = "92430dfe0f4a053643ceecd5abaaf34f";
         this.PRIVATE_KEY = "b520e73460a0cf9b58b2a286dff0cd8166b41eee";
         this.hash = "F20651AAB4BFA9DE1AEE04614D44E296";
         this.allCharacters = [];
         this.parentElement = document.querySelector(parentElement);
         this.input = document.querySelector(input);
         this.search = document.querySelector(search);
     }
     displayHTMLCharacter(characters) {
         const heroCard = characters.map((hero) => {
                 return `
                          <div class="hero">
                                  <img class="hero__img" src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="">
                                  <div class="hero__info">
                                      <h3 class="hero__name">${hero.name}</h3>
                                      <a class="hero__more" href="${hero.urls[0].url}" target="_blank">
                                      More Info
                                      </a>
                                </div>
                          </div>
                          `;
             })
             .join("");
         this.parentElement.innerHTML = heroCard;
     }
     async fetchUrl() {
         try {
             const result = await fetch("http://gateway.marvel.com/v1/public/characters?ts=1&limit=100&apikey=92430dfe0f4a053643ceecd5abaaf34f&hash=" + this.hash.toLowerCase())
                 .then(data => data.json())
                 .catch(err => console.log(err));
             this.allCharacters = await result.data.results;
         } catch (error) {
             console.log(`Error is ${error}`);
         }
         this.input.value = "";
     }
 }

 const marvelApi = new MarvelApi(".characters__inner", ".form__search-input", ".form__search-btn");
 marvelApi.input.addEventListener("keyup", event => {
     const value = event.target.value.toLowerCase();
     const sortedCharacters = marvelApi.allCharacters.filter(character => {
         return character.name.toLowerCase().includes(value);
     });
     marvelApi.displayHTMLCharacter(sortedCharacters);
 });
 marvelApi.fetchUrl();