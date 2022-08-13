'use strict'

var gFilterBy = 'ALL'

var gFilters

var gSearchWords

var gImgs = [
    { id: 1, url: 'js/img/1.jpg', keywords: ['funny', 'politics'] },
    { id: 2, url: 'js/img/2.jpg', keywords: ['fluffy', 'animels'] },
    { id: 3, url: 'js/img/3.jpg', keywords: ['baby', 'animels'] },
    { id: 4, url: 'js/img/4.jpg', keywords: ['animels'] },
    { id: 5, url: 'js/img/5.jpg', keywords: ['baby'] },
    { id: 6, url: 'js/img/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'js/img/7.jpg', keywords: ['baby'] },
    { id: 8, url: 'js/img/8.jpg', keywords: ['funny', 'politics'] },
    { id: 9, url: 'js/img/9.jpg', keywords: ['baby'] },
    { id: 10, url: 'js/img/10.jpg', keywords: ['politics'] },
    { id: 11, url: 'js/img/11.jpg', keywords: ['sports'] },
    { id: 12, url: 'js/img/12.jpg', keywords: ['funny'] },
    { id: 13, url: 'js/img/13.jpg', keywords: ['movies'] },
    { id: 14, url: 'js/img/14.jpg', keywords: ['movies'] },
    { id: 15, url: 'js/img/15.jpg', keywords: ['movies'] },
    { id: 16, url: 'js/img/16.jpg', keywords: ['movies'] },
    { id: 17, url: 'js/img/17.jpg', keywords: ['politics'] },
    { id: 18, url: 'js/img/18.jpg', keywords: ['movies'] }
]

function getImgForDisplay() {
    return gImgs
}

function getImgById(clickedImgId) {
    var imgIndex = gImgs.findIndex(img => img.id === clickedImgId)
    var selectedImage = gImgs[imgIndex]
    return selectedImage
}

function getImgSrc(id) {

}

function getFilters() {
    gFilters = _creatKeyWordsMap(gImgs)
    return gFilters
}

function getSearchWords(gFilters) {
    gSearchWords = _createSearchWords(gFilters)
    return gSearchWords
}

function _creatKeyWordsMap(arr) {
    var keyWordsMap = arr.map((img) => {
        return img.keywords
    })
    return keyWordsMap
}

function _createSearchWords(mat) {
    var words = []
    for (var i = 0; i < mat.length-1; i++) {
        for (var j = 0; j < mat[i].length-1; j++) {
            mat[i][j]
            if (!words.includes(mat[i][j])) {
                words.push(mat[i][j])
            }
        }
    }

}