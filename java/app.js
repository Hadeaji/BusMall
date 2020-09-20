'use strict';

var firstImage = document.getElementById('firstImage');
var SeconedImage = document.getElementById('SeconedImage');
var ThirdImage = document.getElementById('ThirdImage');
var imagesDiv = document.getElementById('sec');
var finalmessage = document.getElementById('finalResult');

var prodectsArray = [];

var currentFirstImage;
var currentSeconedImage;
var currentThirdImage;
var totalClicks = 0;

function Product (prodectName,link){
this.prodectName = prodectName;
this.link = link;
this.votes = 0;
this.timesDisplayed = 0;
prodectsArray.push(this);
}

new Product('Bag','img/bag.jpg');
new Product('Banana','img/banana.jpg');
new Product('Bathroom','img/bathroom.jpg');
new Product('Boots','img/boots.jpg');
new Product('Breakfast','img/breakfast.jpg');
new Product('Bubblegum','img/bubblegum.jpg');
new Product('Chair','img/chair.jpg');
new Product('Cthulhu','img/cthulhu.jpg');
new Product('Dog-Duck','img/dog-duck.jpg');
new Product('Dragon','img/dragon.jpg');
new Product('pen','img/pen.jpg');
new Product('Pet-sweep','img/pet-sweep.jpg');
new Product('Scissors','img/scissors.jpg');
new Product('Shark','img/shark.jpg');
new Product('Sweep','img/sweep.png');
new Product('Tauntaun','img/tauntaun.jpg');
new Product('Unicorn','img/unicorn.jpg');
new Product('USB','img/usb.gif');
new Product('Water-Can','img/water-can.jpg');
new Product('Wine-Glass','img/wine-glass.jpg');


function imageIndex(){
    var firstImageIndex;
    var SeconedImageIndex;
    var ThirdImageIndex;

    firstImageIndex = Math.floor((Math.random() * prodectsArray.length));
  
    do{
        SeconedImageIndex = Math.floor((Math.random() * prodectsArray.length));
    } while(SeconedImageIndex === firstImageIndex);

    do{
        ThirdImageIndex = Math.floor((Math.random() * prodectsArray.length));
    } while(ThirdImageIndex === firstImageIndex || ThirdImageIndex === SeconedImageIndex);

    displayImages(firstImageIndex,SeconedImageIndex,ThirdImageIndex);
}

function displayImages(first, seconed, third){
    currentFirstImage = prodectsArray[first];
    currentFirstImage.timesDisplayed++;

    currentSeconedImage = prodectsArray[seconed];
    currentSeconedImage.timesDisplayed++;

    currentThirdImage = prodectsArray[third];
    currentThirdImage.timesDisplayed++;
  
    firstImage.setAttribute('src',currentFirstImage.link);
    SeconedImage.setAttribute('src',currentSeconedImage.link);
    ThirdImage.setAttribute('src',currentThirdImage.link);
}

imageIndex();

imagesDiv.addEventListener('click',voicesOfTheCustomers)

function voicesOfTheCustomers(event){
    var clickedImage;

    if(event.target.id === 'firstImage'){
      clickedImage = currentFirstImage;
    } else if(event.target.id === 'SeconedImage'){
      clickedImage = currentSeconedImage;
    } else if(event.target.id === 'ThirdImage'){
        clickedImage = currentThirdImage;
}


    clickedImage.votes++;
    imageIndex();
    totalClicks++;

    if(totalClicks >= 25){
        imagesDiv.removeEventListener('click',voicesOfTheCustomers);
        displayResults();
    }


}

function displayResults(){
    var listItem;
    for(var i = 0; i < prodectsArray.length; i++){
      listItem = document.createElement('li');
      listItem.textContent = 'Displayed Times for '+ prodectsArray[i].prodectName + ' is ' + prodectsArray[i].timesDisplayed + ' and votes are ' + prodectsArray[i].votes;
      finalmessage.appendChild(listItem);
    }
}
