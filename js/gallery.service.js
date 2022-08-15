'use strict'

var gFilters

var gSearchWords = ['funny', 'politics', 'animels', 'baby', 'movies', 'all']

var gSavmedMemesGallery = []

var gImgs = [
    { id: 1, url: 'js/img/1.jpg', keywords: ['funny', 'politics'], isSelect: true },
    { id: 2, url: 'js/img/2.jpg', keywords: ['fluffy', 'animels'], isSelect: true },
    { id: 3, url: 'js/img/3.jpg', keywords: ['baby', 'animels'], isSelect: true },
    { id: 4, url: 'js/img/4.jpg', keywords: ['animels'], isSelect: true },
    { id: 5, url: 'js/img/5.jpg', keywords: ['baby'], isSelect: true },
    { id: 6, url: 'js/img/6.jpg', keywords: ['funny'], isSelect: true },
    { id: 7, url: 'js/img/7.jpg', keywords: ['baby'], isSelect: true },
    { id: 8, url: 'js/img/8.jpg', keywords: ['funny', 'politics'], isSelect: true },
    { id: 9, url: 'js/img/9.jpg', keywords: ['baby'], isSelect: true },
    { id: 10, url: 'js/img/10.jpg', keywords: ['politics'], isSelect: true },
    { id: 11, url: 'js/img/11.jpg', keywords: ['sports'], isSelect: true },
    { id: 12, url: 'js/img/12.jpg', keywords: ['funny'], isSelect: true },
    { id: 13, url: 'js/img/13.jpg', keywords: ['movies'], isSelect: true },
    { id: 14, url: 'js/img/14.jpg', keywords: ['movies'], isSelect: true },
    { id: 15, url: 'js/img/15.jpg', keywords: ['movies'], isSelect: true },
    { id: 16, url: 'js/img/16.jpg', keywords: ['movies'], isSelect: true },
    { id: 17, url: 'js/img/17.jpg', keywords: ['politics'], isSelect: true },
    { id: 18, url: 'js/img/18.jpg', keywords: ['movies'], isSelect: true }
]

function getImgForDisplay() {
    var imgForDispaly = gImgs.filter(img => img.isSelect)
    return imgForDispaly
}

function getImgById(clickedImgId) {
    var imgIndex = gImgs.findIndex(img => img.id === clickedImgId)
    var selectedImage = gImgs[imgIndex]
    return selectedImage
}

function getImgSrc(id) {

}

function getFilters() {
    return gSearchWords
}


function createKeyWordsMap() {
    var searchkeywords
    for (var i; i < gImgs.length; i++) {
        console.log('hi')
        for (var j = o; j < gImgs[i].keywords.length; j++) {
            if (searchkeywords.includes(gImgs[i].keywords[j])) {

                searchkeywords.push(gImgs[i].keywords[j])
            }
        }
    }
    return searchkeywords
}



function addMemeToSavedMemesGallery(meme) {
    gSavmedMemesGallery.push(meme)
}

function getSavedMemesForDisplay() {
    return gSavmedMemesGallery
}

function setFilter(val) {
    if (val === 'all') {
        gImgs.forEach((img) => img.isSelect = true)
        return
    }
    for (var i = 0; i < gImgs.length; i++) {
        if (!gImgs[i].keywords.includes(val)) {
            gImgs[i].isSelect = false
        } else {
            gImgs[i].isSelect = true
        }

    }
    console.log(gImgs)
}