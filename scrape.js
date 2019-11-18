var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true, executionTimeout: 5000 });

nightmare
  .goto('https://www.pokemon.com/us/pokedex/')
  .wait('div[id="cookie-dismisser"]')
  .click('div[id="cookie-dismisser"]')
  .wait(750)
  .click('a[id="shuffle"]')
  .wait(600)
  .evaluate(function() {
    let nameNodes = document.querySelectorAll('h5');
    let idNodes = document.querySelectorAll('p.id');
    let typeNodes = document.querySelectorAll('div.abilities')
    let nameList = Array.from(nameNodes);
    let idList = Array.from(idNodes);
    let names = nameList.map(function(node) {
      return node.innerText;
    });
    let ids = idList.map(function(node) {
      return node.innerText;
    });

    let pokemon = names.reduce((acc, current, index) => {
      let id = ids[index]
      let newPokemon = { Name: current, ID: id }
      !acc.includes(newPokemon) ? acc.push(newPokemon) : null;
      return acc;
    }, [])

    return pokemon;
  })
  .end()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Search failed:', error);
  });
