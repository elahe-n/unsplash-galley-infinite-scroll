//HTML Elements
const containerEl=document.getElementById('imgContainer');
const loaderEl=document.getElementById('loader');

let ready=false
let imagesLoaded=0
let totalImages=0
let photosArray=[]

// api URL
const count=5;
const apiKey='dgmrzkQxy-3rK0dfY9vKaU_trYEUq7vbWTPZDzgnZNo';
const apiURL=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// check if all images loaded
function imageLoaded(){
     imagesLoaded++
     console.log(imagesLoaded)
    if (imagesLoaded  === totalImages){
        ready=true
        loaderEl.hidden=true
        count=30;
        console.log(ready)
    }
}

//Display photos
function displayPhotos(){
    imagesLoaded=0
    totalImages=photosArray.length;
    console.log('total:', totalImages)
    photosArray.forEach((photo)=>{

    //    Create <a> element
    const item=document.createElement('a');
    item.setAttribute('href',photo.links.html);
    item.setAttribute('target','_blank');

    //    Create <img> element
    const img=document.createElement('img');
    img.setAttribute('src',photo.urls.regular);
    img.setAttribute('alt',photo.alt_description);
    img.setAttribute('title',photo.alt_description);

    // 
    img.addEventListener('load',imageLoaded);
    // Put <img> into <a> and put all in image container
    item.appendChild(img);
    containerEl.appendChild(item);
   });
}

// Get photos from unsplash api
async function getPhotos(){
    try{
        const response= await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) { }
}

//check if scroll is near tehe button of page to load more photos
window.addEventListener('scroll',()=>{
    if (window.innerHeight+window.scrollY >= document.body.offsetHeight-1000 && ready){
        getPhotos();
        ready=false;
        console.log('more')
    }
})

// on load
getPhotos();