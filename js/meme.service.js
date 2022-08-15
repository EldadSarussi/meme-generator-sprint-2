'use strict'
const STORAGE_KEY = 'memeDB'

var gSavedMemes

var gMeme = {
    selectedImgId: 0,
    url: '',
    selectedLineIndex: 0,
    linesText: [
        {
            x: 30,
            y: 30,
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
            x: 30,
            y: 120,
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

function addLine() {
    var newLineText = `line ${gMeme.linesText.length + 1}`
    var newLine = {
        x: 30,
        y: 70,
        style: 'Impact',
        strokeColor: 'black',
        fontColor: 'black',
        txt: newLineText,
        size: 50,
        align: 'left',
        color: 'black',
        isSelect: false
    }
    gMeme.linesText.push(newLine)
}

function eraseSelectedRow() {
    gMeme.linesText.splice(gMeme.selectedLineIndex, 1)
    if (gMeme.linesText.length === 0) {
        return
    } else {
        gMeme.linesText[0].isSelect = true
        gMeme.selectedLineIndex = 0
    }
}

function setTextAlign(val) {
    gMeme.linesText[gMeme.selectedLineIndex].align = val
}

function setFontStyle(val) {
    gMeme.linesText[gMeme.selectedLineIndex].style = val
}

function setStrokeColor(val) {
    gMeme.linesText[gMeme.selectedLineIndex].strokeColor = val
}

function setFontColor(val) {
    gMeme.linesText[gMeme.selectedLineIndex].fontColor = val
}

function saveMemeToStorage(STORAGE_KEY) {
    var savedMemes = loadFromStorage(STORAGE_KEY)
    var newSavedMemes = []
    newSavedMemes.push(savedMemes, gMeme)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSavedMemes))
    addMemeToSavedMemesGallery(gMeme)
}

function createNewMeme(img) {
    gMeme.selectedImgId = makeId(length = 4)
    gMeme.url = img.src
    console.log(gMeme)
}

function moveLine(val) {
    gMeme.linesText.forEach(line => {
        if (line.isSelect) {
            console.log('hi')
            switch (val) {
                case 1:
                    line.y = line.y - 10;
                    break;
                case 2:
                    line.y = line.y + 10;
                    break;
                case 3:
                    line.x = line.x - 10;
                    break;
                case 4:
                    line.x = line.x + 10;
                    break;

            }
        }
    })
}

function findFirstLine() {
    var lineIndex = Infinity
    gMeme.linesText.forEach((line, idx) => {
        if (line.y < lineIndex) {
            lineIndex = idx
        }
    })
    return lineIndex
}

function findLastLine() {
    var lineIndex = -Infinity
    gMeme.linesText.forEach((line, idx) => {
        if (line.y > lineIndex) {
            lineIndex = idx

        }
    })
    return lineIndex
}

function rowSelect(val) {
    gMeme.linesText[gMeme.selectedLineIndex].isSelect = false
    gMeme.selectedLineIndex += val
    if (gMeme.selectedLineIndex < 0) {
        gMeme.selectedLineIndex = gMeme.linesText.length - 1
    }
    if (gMeme.selectedLineIndex > gMeme.linesText.length - 1) {
        gMeme.selectedLineIndex = 0
    }
    gMeme.linesText[gMeme.selectedLineIndex].isSelect = true
}

function setTextAlign(val) {
    gMeme.linesText[gMeme.selectedLineIndex].align = val
}