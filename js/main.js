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
        renderFilters()
    }

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
    document.querySelector('.gallery').style.display = 'none'
}

function hideMemePaintBlock() {
    document.querySelector('.meme-maker-container').style.display = "none"
    document.querySelector('.gallery').style.display= 'grid'
    renderImgs()
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
    gCtx.fillStyle = line.fontColor
    gCtx.strokeStyle = ` ${line.strokeColor}`
    console.log(line);
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

function onRowSelect(val) {
    rowSelect(val)
    renderMeme()
}

function onSwapLines() {
    swapLines()
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
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
    renderMeme()
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
    gCtx.fillStyle = line.fontColor
    gCtx.strokeStyle = ` ${line.strokeColor}`
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

function onMoveLine(val) {
    moveLine(val)
    renderMeme()
}

function showSavedMemes(){
renderSavedMemes()
}

function renderSavedMemes() {
    
    const imgs = getSavedMemesForDisplay()
    console.log(imgs)
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

function uploadImg() {
    renderMemeForDownload()
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        // document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`

        document.querySelector('.share-btn').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function renderFilters(){
    const filters = getFilters()
    const strHTMLs = filters.map(
        (filter) =>
            `
            <div class="filter" onclick="onFilterBy('${filter}')">
            ${filter}
            </div>
           `
           
    )
    var elGallery = document.querySelector('.img-filter-modal')
    elGallery.innerHTML = strHTMLs.join('')
}

function onFilterBy(val){
    toggleFilterModal()
    setFilter(val)
    renderImgs()
    return
}