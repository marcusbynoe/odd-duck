'use strict';
console.log('Hello World!');


//*****GLOBALS******/

let productArray = [];
let voteRound = 25;

//*****DOM WINDOWS******/

let imgFolder = document.getElementById('img-Folder');
let prodOne = document.getElementById('productOne');
let prodTwo = document.getElementById('productTwo');
let prodThree = document.getElementById('productThree');

let tallyVote = document.getElementById('Tally-Votes');
let voteList = document.getElementById('results-pool');

//*****CONSTRUCTOR FUNCTION*******/

function Product(name, imgExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;
}

// //*****HELPER FUNCTIONS / UTILITIES******/

function randomInd() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImg() {

  let prodOneIndex = randomInd();
  let prodTwoIndex = randomInd();
  let prodThreeIndex = randomInd();

  prodOne.src = productArray[prodOneIndex].img;
  prodTwo.src = productArray[prodTwoIndex].img;
  prodThree.src = productArray[prodThreeIndex].img;
  prodOne.title = productArray[prodOneIndex].name;
  prodTwo.title = productArray[prodTwoIndex].name;
  prodThree.title = productArray[prodThreeIndex].name;


  while (prodOneIndex === prodTwoIndex || prodTwoIndex === prodThreeIndex || prodOneIndex === prodThreeIndex) {
    prodTwoIndex = randomInd();
    prodThreeIndex = randomInd();
  }


  productArray[prodOneIndex].views++;
  productArray[prodTwoIndex].views++;
  productArray[prodThreeIndex].views++;
}


// //******EVENT HANDLERS*******/

function handClick(event) {

  let imgClicked = event.target.title;

  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].name) {
      productArray[i].votes++;
    }
  }
  voteRound--;

  renderImg();

  if (voteRound === 0) {
    imgFolder.removeEventListener('click', handClick);
  }
}

function showVote() {
  if (voteRound === 0) {
    for (let i = 0; i < productArray.length; i++) {
      let liElem = document.createElement('li');
      liElem.textContent = `${productArray[i].name} - views: ${productArray[i].views} & votes: ${productArray[i].votes}`;
      voteList.appendChild(liElem);
    }
    tallyVote.removeEventListener('click', showVote);
  }
}

// //*****EXECUTABLE CODE******/
let bag1 = new Product('bag');
let bananaSlicer = new Product('banana');
let bathroomProd = new Product('bathroom');
let bootsProd = new Product('boots');
let breakfastProd = new Product('breakfast');
let bubblegumProd = new Product('bubblegum');
let chairProd = new Product('chair');
let cthulhuProd = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragonProd = new Product('dragon');
let penProd = new Product('pen');
let petSweep = new Product('pet-sweep');
let scissorsProd = new Product('scissors');
let sharkProd = new Product('shark');
let sweepProd = new Product('sweep', 'png');
let tauntaunProd = new Product('tauntaun');
let unicornProd = new Product('unicorn');
let waterCan = new Product('water-can');
let wineGlass = new Product('wine-glass');


productArray.push(bag1, bananaSlicer, bathroomProd, bootsProd, breakfastProd, bubblegumProd, chairProd, cthulhuProd, dogDuck, dragonProd, penProd, petSweep, scissorsProd, sharkProd, sweepProd, tauntaunProd, unicornProd, waterCan, wineGlass);

renderImg();

console.log(productArray);

imgFolder.addEventListener('click', handClick);
tallyVote.addEventListener('click', showVote);