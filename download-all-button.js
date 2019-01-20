// ==UserScript==
// @id           subscene-download-all
// @name         Subscene Download All Button
// @version      0.1
// @description  Adds a button to download all the subs on the page
// @author       L1lith
// @include      http*://subscene.com/subtitles/*
// @grant        none
// @namespace    https://github.com/L1lith/Subscene.com-User-Scripts
// @run-at document-end
// ==/UserScript==

(()=>{
  async function downloadAll() {
    const subURLS = [...document.querySelectorAll('.a1 a')].filter(node => node.parentNode.parentNode.style.display !== "none").map(a => a.href)
    for (let i = 0; i < subURLS.length; i++) {
      await downloadSub(subURLS[i])
    }
  }
  async function downloadSub(subURL) {
    const pageHTML = await (await fetch(subURL)).text()
  	const dom = (new DOMParser()).parseFromString(pageHTML, 'text/html')
  	const downloadURL = dom.getElementById('downloadButton').href
  	const name = dom.querySelector('li.release div').textContent.trim()
    download(downloadURL, name)
  }
  function download(dataurl, filename) {
    const a = document.createElement("a")
    a.href = dataurl
    a.setAttribute("download", filename);
    const b = document.createEvent("MouseEvents")
    b.initEvent("click", false, true)
    a.dispatchEvent(b)
  }
  const downloadButton = document.createElement('button')
  downloadButton.addEventListener('click', ()=>{
    downloadAll().catch(console.log)
  })
  downloadButton.textContent = "Download All"
  downloadButton.style.position = "fixed"
  downloadButton.style.top = "15px"
  downloadButton.style.right = "15px"
  downloadButton.style.zIndex = 500
  document.body.appendChild(downloadButton)
})()
