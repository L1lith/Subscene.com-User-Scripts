/**
  The MIT License (MIT)

  Copyright (c) 2014 Jeppe Rune Mortensen

  Permission is hereby granted, free of charge, to any person obtaining a copy of
  this software and associated documentation files (the "Software"), to deal in
  the Software without restriction, including without limitation the rights to
  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
  the Software, and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
  FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
  IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
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
