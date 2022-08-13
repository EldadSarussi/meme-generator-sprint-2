'use strict'

var gElCanvas
var gCtx
var gSelectedImg

function onInit() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderImgs()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function toggleFilterModal() {
    var elFilterModal = document.querySelector('.img-filter-modal')
    if (elFilterModal.style.display === 'block') {
        elFilterModal.style.display = 'none'
    }
    else {
        elFilterModal.style.display = 'block'
    }

    var filtersForDisplay = getFilters()
    var SearchWordsForDisplay = getSearchWords(filtersForDisplay)
    console.log(SearchWordsForDisplay)
}

function renderImgs() {
    const imgs = getImgForDisplay()
    const strHTMLs = imgs.map(
        (img) =>
            `
            <div class="gallery-cell" onclick="onSelectImg(${img.id})">
            <img class="meme" src="${img.url}"/>
            </div>
           `
    )
    var elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHTMLs.join('')
}

function onSelectImg(id) {
    gSelectedImg = getImgById(id)
    setMemeImgId(gSelectedImg)
    displayMemePaintBlock()
    renderMeme()
}

function displayMemePaintBlock() {
    document.querySelector('.meme-maker-container').style.display = "block"
    document.querySelector('.gallery').style.opacity= '0.3'
}

function hideMemePaintBlock() {
    document.querySelector('.meme-maker-container').style.display = "none"
    document.querySelector('.gallery').style.opacity= '1'
}

function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = meme.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.linesText.forEach(function (line) {
            drawMeme(line)
        })
    }
}

function onSetText(txt) {
    setTextInLine(txt)
    renderMeme()
}

function drawMeme(line) {
    gCtx.beginPath()
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = `${line.align}`
    gCtx.lineWidth = 2
    gCtx.font = `${line.size}` + 'px' + ' ' + `${line.style}`
    gCtx.fillStyle = line.color
    gCtx.strokeStyle = `${line.strokeStyle}`
    if (line.isSelect) {
        drawRect(line)
        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.strokeText(line.txt, line.x, line.y)
        gCtx.closePath()
    } else {
        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.strokeText(line.txt, line.x, line.y)
        gCtx.closePath()
    }
}

function onLinedown() {
    rowDown()
    renderMeme()
}

function onLinedUp() {
    rowUp()
    renderMeme()
}

function onSwapLines() {
    swapLines()
    renderMeme()
}

function onAddLine() {
    addLine()
}

function onEraseRow() {
    eraseSelectedRow()
    renderMeme()
}

function onChangeFontSize(val) {
    setFontSize(val)
    renderMeme()
}

function onAlignText(val) {
    setTextAlign(val)
}

function onChangeFont(val) {
    setFontStyle(val)
    renderMeme()
}

function onChangeStrokeColor(val) {
    setStrokeColor(val)
    renderMeme()
}

function onChangeFontColor(val) {
    setFontColor(val)
    renderMeme()
}

function onSaveMeme() {
    saveMemeToStorage()
}

function _createSearchWords(mat) {
    var words = []
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat[i].length; j++) {
            mat[i][j]
            if (!words.includes(mat[i][j])) {
                words.push(mat[i][j])
                console.log(words)
            }
        }
    }

}

function drawRect(line) {
    var txtLength = line.txt.length * (line.size / 2)
    gCtx.beginPath();
    gCtx.rect(line.x - 10, line.y - line.size / 2 - 5, txtLength, line.size + 5);
    // gCtx.fillRect(line.x-10, line.y-line.size/2, 100, line.size+5);
    gCtx.strokeStyle = 'green';
    gCtx.stroke();
    gCtx.closePath();
}

function onDownLoadMeme() {
    renderMemeForDownload()
    toggleDownloadModal()


}

function downloadMeme(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    var meme = getMeme()
    var newId = makeId(4)
    elLink.download = 'my-meme'
    toggleDownloadModal()
}

function renderMemeForDownload() {
    const meme = getMeme()
    const img = new Image()
    img.src = meme.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.linesText.forEach(function (line) {
            drawMemeForDownload(line)
        })
    }
}

function drawMemeForDownload(line) {
    gCtx.beginPath()
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = `${line.align}`
    gCtx.lineWidth = 2
    gCtx.font = `${line.size}` + 'px' + ' ' + `${line.style}`
    gCtx.fillStyle = line.color
    console.log(line.color)
    gCtx.strokeStyle = `${line.strokeStyle}`
    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeText(line.txt, line.x, line.y)
    gCtx.closePath()
}

function toggleDownloadModal() {
    var elDownLoadCheckBox = document.querySelector('.download-toggle')
    if (elDownLoadCheckBox.style.display === 'block') {
        elDownLoadCheckBox.style.display = 'none'
        renderMeme()
    }
    else {
        elDownLoadCheckBox.style.display = 'block'
    }
}

function onImgInput(ev) {
    displayMemePaintBlock()
    loadImageFromInput(ev, renderImgAsMeme)
}

function loadImageFromInput(ev, onImageReady) {

    var reader = new FileReader()

    reader.onload = (event) => {
        var img = new Image()
        img.src = event.target.result
        img.onload = onImageReady.bind(null, img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImgAsMeme(img) {
    createNewMeme(img)
    renderMeme()
}

function resizeCanvas() {
    console.log('resize')
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth - 50
    gElCanvas.height = elContainer.offsetHeight - 20
}