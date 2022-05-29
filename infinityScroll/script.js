
let initialLoad = true;
let count =  5;
const apiKey = 'Bl3thFPQez5npwjUPI44DrCYvO2S2LsxZeaANhrga_s';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
//elements
const imgContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader")
let photos = [];
//get photos from api
async function getRandomImages(url){
    try{
      const resp = await fetch(url);
      const data = await resp.json();
      photos = data;
      renderImages(photos);
    }catch(err){
      console.log(err);
    }
}
// setAttributes
function setAttributes(element,attributes){
  for( const key in attributes){
    element.setAttribute(key,attributes[key])
  }
}
function imageLoaded(){
   imagesLoaded++;
  if(imagesLoaded === totalImages){
    ready = true
    imagesLoaded = 0;
    count = 30;
    loader.hidden = true;
  }
}

function renderImages(imgs){
  totalImages = imgs.length
  imgs.forEach((photo, i) => {
    const item = document.createElement('a');
    setAttributes(item,{
      href:photo.links.html,
      target:'_blank'
    })

    const img = document.createElement('img')
    setAttributes(img,{
      src:photo.urls.small,
      alt:photo.alt_description,
      title:photo.alt_description
    })
    img.addEventListener('load', imageLoaded )
    item.appendChild(img)
    imgContainer.appendChild(item)
  });

}
// Check scroll
window.addEventListener('scroll', () =>{
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&  ready){
    getRandomImages(apiUrl);
    ready = false;
  }
})
//On load
getRandomImages(apiUrl)
