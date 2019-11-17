var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true, executionTimeout: 5000 });

nightmare
  .goto('https://www.pokemon.com/us/pokedex/')
  .wait('div[id="cookie-dismisser"]')
  .click('div[id="cookie-dismisser"]')
  .wait(750)
  .click('a[id="shuffle"]')
  .wait(600)
  .evaluate(function () {
    var nameNodes = document.querySelectorAll('h5');
    var list = Array.from(nameNodes);
    return list.map(function (node) {
      return node.innerText
    });
  })
  .end()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Search failed:', error);
  });
