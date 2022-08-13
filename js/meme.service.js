'use strict'
const STORAGE_KEY = 'memeDB'

var gSavedMemes 

var gMeme = {
    selectedImgId: 0,
    url: '',
    selectedLineIndex: 0,
    linesText: [
        {
            lineIndex: 0,
            x:30,
            y:30,
            style: 'Impact',
            strokeColor: 'black',
            fontColor: 'black',
            txt: 'line 1',
            size: 50,
            align: 'left',
            color: 'black',
            isSelect: true
        },
        {
            lineIndex: 1,
            x:30,
            y:120,
            style: 'Impact',
            strokeColor: 'blue',
            fontColor: 'blue',
            txt: 'line 2',
            size: 50,
            align: 'left',
            color: 'black',
            isSelect: false
        }
    ]
}

function setTextInLine(inputTxt) {

    gMeme.linesText[gMeme.selectedLineIndex].txt = inputTxt

}

function getMeme() {
    return gMeme
}

function setMemeImgId(img) {
    gMeme.selectedImgId = img.id
    gMeme.url = img.url
}

function rowDown() {
    var memeLines = gMeme.linesText
    var curLine = memeLines.find(line => line.isSelect)
    if (curLine.lineIndex + 1 === memeLines.length) {
        gMeme.linesText[curLine.lineIndex].isSelect = false
        gMeme.linesText[0].isSelect = true
        document.querySelector('.input-text').value = gMeme.linesText[0].txt
        gMeme.selectedLineIndex = 0
        return
    }
    gMeme.linesText[curLine.lineIndex].isSelect = false
    gMeme.linesText[curLine.lineIndex + 1].isSelect = true
    document.querySelector('.input-text').value = gMeme.linesText[curLine.lineIndex + 1].txt
    gMeme.selectedLineIndex = curLine.lineIndex + 1
    return
}

function rowUp() {
    var memeLines = gMeme.linesText
    var curLine = memeLines.find(line => line.isSelect)
    if (curLine.lineIndex !== 0) {
        gMeme.linesText[curLine.lineIndex].isSelect = false
        gMeme.linesText[curLine.lineIndex - 1].isSelect = true
        document.querySelector('.input-text').value = gMeme.linesText[curLine.lineIndex - 1].txt
        gMeme.selectedLineIndex = curLine.lineIndex - 1
        return
    }
    gMeme.linesText[curLine.lineIndex].isSelect = false
    gMeme.linesText[gMeme.linesText.length - 1].isSelect = true
    document.querySelector('.input-text').value = gMeme.linesText[gMeme.linesText.length - 1].txt
    gMeme.selectedLineIndex = gMeme.linesText.length - 1
    return
}

function setFontSize(val) {
    gMeme.linesText[gMeme.selectedLineIndex].size = gMeme.linesText[gMeme.selectedLineIndex].size + val
}

function swapLines() {
    var txtKeeper = gMeme.linesText[gMeme.selectedLineIndex].txt
    if (gMeme.selectedLineIndex === gMeme.linesText.length - 1) {
        gMeme.linesText[gMeme.selectedLineIndex].txt = gMeme.linesText[0].txt
        gMeme.linesText[0].txt = txtKeeper
        document.querySelector('.input-text').value = gMeme.linesText[0].txt
        return
    }
    else {
        gMeme.linesText[gMeme.selectedLineIndex].txt = gMeme.linesText[gMeme.selectedLineIndex + 1].txt
        gMeme.linesText[gMeme.selectedLineIndex + 1].txt = txtKeeper
        document.querySelector('.input-text').value = gMeme.linesText[0].txt
    }
}

function addLine(){
   console.log('soon')
}

function eraseSelectedRow(){
    gMeme.linesText[gMeme.selectedLineIndex].txt = ''
}

function setTextAlign(val){
    gMeme.linesText[gMeme.selectedLineIndex].align = val
}

function setFontStyle(val){
    gMeme.linesText[gMeme.selectedLineIndex].style = val
}

function setStrokeColor(val){
    gMeme.linesText[gMeme.selectedLineIndex].strokeColor = val
    
}

function setFontColor(val){
    gMeme.linesText[gMeme.selectedLineIndex].fontColor = val
    console.log(gMeme.linesText[gMeme.selectedLineIndex].fontColor)
}

function saveMemeToStorage(STORAGE_KEY,gMeme){
    console.log(JSON.stringify(gMeme))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gMeme))
}

function createNewMeme(img){
    gMeme.selectedImgId = makeId(length = 4)
    gMeme.url = img.src
    console.log(gMeme)
}