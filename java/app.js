'use strict';

var firstImage = document.getElementById('firstImage');
var SeconedImage = document.getElementById('SeconedImage');
var ThirdImage = document.getElementById('ThirdImage');
var imagesDiv = document.getElementById('sec');
var finalmessage = document.getElementById('finalResult');
var buttom = document.getElementById('button1');


var nowadaysArray = [-1,-1,-1];
var prodectsArray = [];



var chartnames = [];
var chartdisplay = [];
var chartvotes = [];


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
        chartnames.push(this.prodectName);

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



if (localStorage.getItem('JSONproducts')){
    prodectsArray = [];
    prodectsArray = JSON.parse(localStorage.getItem('JSONproducts'));
}

function imageIndex(){
    var firstImageIndex;
    var SeconedImageIndex;
    var ThirdImageIndex;

    
    
    do{
    firstImageIndex = Math.floor((Math.random() * prodectsArray.length));
    }while(firstImageIndex === nowadaysArray[0] || firstImageIndex === nowadaysArray[1] || firstImageIndex === nowadaysArray[2]);

    do{
        SeconedImageIndex = Math.floor((Math.random() * prodectsArray.length));
    } while(SeconedImageIndex === firstImageIndex || SeconedImageIndex === nowadaysArray[0] || SeconedImageIndex === nowadaysArray[1] || SeconedImageIndex === nowadaysArray[2]);

    do{
        ThirdImageIndex = Math.floor((Math.random() * prodectsArray.length));
    } while(ThirdImageIndex === firstImageIndex || ThirdImageIndex === SeconedImageIndex || ThirdImageIndex === nowadaysArray[0] || ThirdImageIndex === nowadaysArray[1] || ThirdImageIndex === nowadaysArray[2]);

    nowadaysArray = [];
    nowadaysArray.push(firstImageIndex);
    nowadaysArray.push(SeconedImageIndex);
    nowadaysArray.push(ThirdImageIndex);



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
    finalmessage.textContent = '';
    displayResults();

    clickedImage.votes++;
    imageIndex();
    totalClicks++;

    if(totalClicks >= 25){
        imagesDiv.removeEventListener('click',voicesOfTheCustomers);
        // displayResults();
        localStorage.setItem('JSONproducts', JSON.stringify(prodectsArray));

         // chart info
    chartdisplay = [];
    chartvotes = [];
    for(var i = 0; i < prodectsArray.length ; i++){
        chartdisplay.push(prodectsArray[i].timesDisplayed);
    }
    for(var i = 0; i < prodectsArray.length ; i++){
        chartvotes.push(prodectsArray[i].votes);
    }
    ///
    




    // hide the 3 images
    var Element = document.querySelector("#sec");
    Element.style.display = "none";
    //

    // show the chart
    var myElement = document.querySelector("#myChart");
    myElement.style.display = "visible";
    //


    var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: chartnames,
        datasets: [{
            label: 'Dispaly Times',
            backgroundColor: '#F2A477',
            borderColor: '#F2A477',
            data: chartdisplay
        },
        {
            label: 'Voting Times',
            backgroundColor: '#59372F',
            borderColor: '#59372F',
            data: chartvotes
        }]
    },

    // Configuration options go here
    options: {}
});
    //
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

buttom.addEventListener('click',ahead)

// buttom clears local
function ahead(event){
    if(event.target.id === 'button1'){
        localStorage.clear();
    }
}