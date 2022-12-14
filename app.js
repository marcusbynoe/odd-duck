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


//*****CANVAS ELEMENT FOR CHART*******/

let canvasElem = document.getElementById('chart');

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

let indexValue = [];

function renderImg() {
  while (indexValue.length < 6) {
    let index = randomInd();
    while (indexValue.includes(index)) {
      index = randomInd();
    }
    indexValue.push(index);
  }
  console.log(indexValue);
  let prodOneIndex = indexValue.shift();
  let prodTwoIndex = indexValue.shift();
  let prodThreeIndex = indexValue.shift();

  prodOne.src = productArray[prodOneIndex].img;
  prodTwo.src = productArray[prodTwoIndex].img;
  prodThree.src = productArray[prodThreeIndex].img;
  prodOne.title = productArray[prodOneIndex].name;
  prodTwo.title = productArray[prodTwoIndex].name;
  prodThree.title = productArray[prodThreeIndex].name;


  // while (prodOneIndex === prodTwoIndex || prodTwoIndex === prodThreeIndex || prodOneIndex === prodThreeIndex) {
  //   prodOneIndex = randomInd();
  //   prodTwoIndex = randomInd();
  //   prodThreeIndex = randomInd();
  // }


  productArray[prodOneIndex].views++;
  productArray[prodTwoIndex].views++;
  productArray[prodThreeIndex].views++;
}

function renderChart() {
  let prodNames = [];
  let prodVotes = [];
  let prodViews = [];

  for (let i = 0; i < productArray.length; i++) {
    prodNames.push(productArray[i].name);
    prodVotes.push(productArray[i].votes);
    prodViews.push(productArray[i].views)
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: prodNames,
      datasets: [{
        label: '# of Votes',
        data: prodVotes,
        borderWidth: 3
      },
      {
        label: '# of Views',
        data: prodViews,
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(canvasElem, chartObj);

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

    //*****LOCAL STORAGE******/
    let stringProducts = JSON.stringify(productArray);
    console.log('strigified Products', stringProducts);

    localStorage.setItem('myProd', stringProducts);
  }
}

function showVote() {
  if (voteRound === 0) {
    renderChart();
    // for (let i = 0; i < productArray.length; i++) {
    //   let liElem = document.createElement('li');
    //   liElem.textContent = `${productArray[i].name} - views: ${productArray[i].views} & votes: ${productArray[i].votes}`;
    //   voteList.appendChild(liElem);
    // }
    // tallyVote.removeEventListener('click', showVote);
  }
}

//******* CHART********/


let ctx = document.getElementById('chart');

let chartObj = {
  type: 'bar',
  data: {
    labels: ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Chair'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 3
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

};


// //*****EXECUTABLE CODE******/

let retreievedProd = localStorage.getItem('myProd');
console.log('retreived products here >>>', retreievedProd);

let parsedProd = JSON.parse(retreievedProd);
console.log('parsed data >>>', parsedProd);

if (retreievedProd) {
  productArray = parsedProd;
} else {
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
}





renderImg();

console.log(productArray);

imgFolder.addEventListener('click', handClick);
tallyVote.addEventListener('click', showVote);
