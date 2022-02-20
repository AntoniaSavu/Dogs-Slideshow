let timer, clearDelay;

async function start() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    //data has everything, the status of the promise, the methods of the class, data.message just has the object
    breedDropdown(data.message);
    } catch(e) {
        console.log("Error! " + e);
    }
}

start();
/*
Fetching the message object from the API
then transforming the property names of the message(in this case all the dog breeds)
into an array.(using key)
With this array, use map in order to create an option in our HTML for each breed
*/
function breedDropdown(breedsList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="breedSlideshow(this.value)">
        <option>Choose a breed!</option>
        ${Object.keys(breedsList).map(function (breed){
            return `<option>${breed}</option>`
        }).join('')}
    </select>
    `
}

async function breedSlideshow(breed){
    if (breed != "Choose a breed!")
    {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json();
        //this makes it so now we have the pictures for each breed in variable data
        createSlideshow(data.message);
        }
}

function createSlideshow(imagesArray)
{//images Array will have an array with all the pics for one specific breed
    let iterator = 0;
    clearInterval(timer);
    clearTimeout(clearDelay)
    if (imagesArray.length > 1) {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${imagesArray[0]}')"></div>
  <div class="slide" style="background-image: url('${imagesArray[1]}')"></div>
  `
  iterator += 2
  if (imagesArray.length == 2) iterator = 0
  timer = setInterval(nextSlide, 3000)
  } else {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${imagesArray[0]}')"></div>
  <div class="slide"></div>
  `
  }

    function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${imagesArray[iterator]}')"></div>`);
       clearDelay=setTimeout(function(){
            document.querySelector(".slide").remove();
        }, 1000);
        if (iterator+1>=imagesArray.length) iterator = 0;
        else iterator++;

    }

}