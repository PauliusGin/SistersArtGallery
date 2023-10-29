//* Language change section

// changing language with a button 
const languageButtonLT = document.getElementById('LT-flag');
const languageButtonEN = document.getElementById('EN-flag');

function switchLanguage(lang) {
    const language = document.querySelectorAll("[data-language]");
    language.forEach(element => {
        if (element.getAttribute("data-language") === lang) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
    sortOptionsEN.selectedIndex = 0;
    sortOptionsLT.selectedIndex = 0;
    filterOptionsEN.selectedIndex = 0;
    filterOptionsLT.selectedIndex = 0;
}

languageButtonLT.addEventListener("click", () => switchLanguage("lt"));
languageButtonEN.addEventListener("click", () => switchLanguage("en"));

// determining language when loading gallery images
const theGallery = document.getElementById("div-gallery-items");

const mutationObserver = new MutationObserver( () => {
    const lithuanianLanguageSelected = window.getComputedStyle(languageButtonEN).display;
        if (lithuanianLanguageSelected === "block") {
            switchLanguage("lt");
    }
})

mutationObserver.observe(theGallery, {childList: true})


//* fetching .json and creating a gallery of pictures from it 

// function to create a gallery item in DOM from a .json object
function createGalleryItem(picture) {
    const figure = document.createElement("figure");
    const galleryImage = document.createElement("img");
    const figcaptionEN = document.createElement("figcaption");
    const figcaptionLT = document.createElement("figcaption");
    
    // add classes and attributes to the elements
    figure.classList.add("gallery-item");
    galleryImage.classList.add("gallery-image");
    figcaptionEN.setAttribute("data-language", "en");
    figcaptionLT.setAttribute("data-language", "lt");
    
    // add attributes to the pictures
    galleryImage.src = `${picture.url}`;
    galleryImage.alt = `${picture.titleEN}`;
    galleryImage.loading = "lazy";
    
    // check if author has a valid value
    const authorEN = picture.authorEN ? `${picture.authorEN}, ${picture.age} y/o, ` : "";
    const authorLT = picture.authorLT ? `${picture.authorLT}, ${picture.age} m., ` : "";
    

    // check if title has a valid value
    const titleEN = picture.titleEN ? `${picture.titleEN}` : "";
    const titleLT = picture.titleLT ? `${picture.titleLT}` : "";

    // write the text into the figcaption
    figcaptionEN.textContent = `${authorEN} ${titleEN}`;
    figcaptionLT.textContent = `${authorLT} ${titleLT}`;
    
    // adding the elements to DOM
    const theGallery = document.getElementById("div-gallery-items");
    
    theGallery.appendChild(figure);
    figure.appendChild(galleryImage);
    figure.appendChild(figcaptionEN);
    figure.appendChild(figcaptionLT);
} 

//* global variables below
// keep the fetched json object
let allGalleryPictures;

// keep track of items being displayed in the gallery
let picturesCurrentlyBeingDisplayed;

//keep track of the sorting order
let sortingOrder;
//* global variable above

// function to fetch the .json file and create gallery items from an array of pictures in it
async function fetchAndCreate() {
    const response = await fetch("sisters_gallery.json");
    const pictureArray = await response.json();
    allGalleryPictures = pictureArray;
    picturesCurrentlyBeingDisplayed = allGalleryPictures;
    pictureArray.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    sortingOrder = "newest first";
    pictureArray.forEach(picture => createGalleryItem(picture));
    console.log(document.querySelectorAll(".gallery-item").length + " pictures are being shown, " + sortingOrder);
}

// adding gallery items to DOM from a .json file once the page has loaded
document.addEventListener("DOMContentLoaded", fetchAndCreate);


//* filtering 

// function to remove currently displayed gallery items
function removeCurrent() {
    let galleryItems = document.querySelectorAll(".gallery-item")
    galleryItems.forEach(item => item.remove());
}

// function to show all gallery items
function showAllGallery() {
    removeCurrent();
    picturesCurrentlyBeingDisplayed = allGalleryPictures;
    if (sortingOrder === "oldest first") {
        allGalleryPictures.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    } else {
        allGalleryPictures.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }
    allGalleryPictures.forEach(picture => createGalleryItem(picture))
    console.log("All " + document.querySelectorAll(".gallery-item").length + " pictures are being shown, " + sortingOrder);
} 

// function to show gallery items only by Viltaute
function filterByViltaute() {
    removeCurrent();
    let picturesByViltaute = allGalleryPictures.filter(picture => picture.authorEN === "Viltaute");
    picturesCurrentlyBeingDisplayed = picturesByViltaute;
    if (sortingOrder === "oldest first") {
        picturesByViltaute.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    } else {
        picturesByViltaute.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }
    picturesByViltaute.forEach(picture => createGalleryItem(picture));
    console.log(document.querySelectorAll(".gallery-item").length + " pictures by Viltaute are being shown, " + sortingOrder);
}

// function to show gallery items only by Jogaile
function filterByJogaile() {
    removeCurrent();
    let picturesByJogaile = allGalleryPictures.filter(picture => picture.authorEN === "Jogaile");
    picturesCurrentlyBeingDisplayed = picturesByJogaile;
    if (sortingOrder === "oldest first") {
        picturesByJogaile.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    } else {
        picturesByJogaile.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }
    picturesByJogaile.forEach(picture => createGalleryItem(picture));
    console.log(document.querySelectorAll(".gallery-item").length + " pictures by Jogaile are being shown, " + sortingOrder);
}

// function to show only cardboard gallery items
function filterByCardboard() {
    removeCurrent();

    let cardboardPictures = allGalleryPictures.filter(picture => picture.typeEN === "cardboard");
    picturesCurrentlyBeingDisplayed = cardboardPictures;
    if (sortingOrder === "oldest first") {
        cardboardPictures.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    } else {
        cardboardPictures.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }
    cardboardPictures.forEach(picture => createGalleryItem(picture));
    console.log(document.querySelectorAll(".gallery-item").length + " cardboard pictures are being shown, " + sortingOrder);
}

// the filter select elements for both languages
const filterOptionsEN = document.getElementById("filter-options-EN");
const filterOptionsLT = document.getElementById("filter-options-LT");

// function to run a filter function based on which option is selected
function filterResultEN() {
    if (filterOptionsEN.value === "viltaute") {
    filterByViltaute();
    } else if (filterOptionsEN.value === "jogaile") {
        filterByJogaile();
    } else if (filterOptionsEN.value === "cardboard") {
        filterByCardboard();
    } else if (filterOptionsEN.value === "everything") {
        showAllGallery();
    }
}

function filterResultLT() {
    if (filterOptionsLT.value === "viltaute") {
    filterByViltaute();
    } else if (filterOptionsLT.value === "jogaile") {
        filterByJogaile();
    } else if (filterOptionsLT.value === "cardboard") {
        filterByCardboard();
    } else if (filterOptionsLT.value === "everything") {
        showAllGallery();
    }
}

// event listeners
filterOptionsEN.addEventListener("change", filterResultEN);
filterOptionsLT.addEventListener("change", filterResultLT);


//* sorting

// function to sort current gallery items by date, newest to oldest
const sortByDateNewestFirst = () => {
    removeCurrent();
    picturesCurrentlyBeingDisplayed.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    sortingOrder = "newest first";
    picturesCurrentlyBeingDisplayed.forEach(picture => createGalleryItem(picture));
    console.log(document.querySelectorAll(".gallery-item").length + " pictures are being shown, " + sortingOrder)
}

// function to sort current gallery items by date, oldest to newest
const sortByDateOldestFirst = () => {
    removeCurrent();
    picturesCurrentlyBeingDisplayed.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    sortingOrder = "oldest first";
    picturesCurrentlyBeingDisplayed.forEach(picture => createGalleryItem(picture));
    console.log(document.querySelectorAll(".gallery-item").length + " pictures are being shown, " + sortingOrder)
}

// the sorting select elements for both languages
const sortOptionsEN = document.getElementById("sort-options-EN");
const sortOptionsLT = document.getElementById("sort-options-LT");
const englishLanguageSelected = window.getComputedStyle(languageButtonLT).display;

// function to sort gallery pictures by date
function sortingResultEN() {
    if (sortOptionsEN.value === "oldest") {
        sortByDateOldestFirst();
    } else if (sortOptionsEN.value === "newest") {
        sortByDateNewestFirst();
    }
}

function sortingResultLT() {
    if (sortOptionsLT.value === "oldest") {
        sortByDateOldestFirst();
    } else if (sortOptionsLT.value === "newest") {
        sortByDateNewestFirst();
    }
}

// event listeners
sortOptionsEN.addEventListener("change", sortingResultEN);
sortOptionsLT.addEventListener("change", sortingResultLT);