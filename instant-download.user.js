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
// @id           subscene-instant-download
// @name         Subscene Instant Downloader
// @version      0.1
// @description  Simply click a sub in the list and instead of navigating to the page it will instantly download
// @author       L1lith
// @include      http*://subscene.com/subtitles/*
// @grant        none
// @namespace    https://github.com/L1lith/Subscene.com-User-Scripts
// @run-at document-end
// @license      MIT
// ==/UserScript==

(()=>{
  async function downloadAllSubs(event) {
  	const {target} = event
  	let subDiv = null
  	if (target.querySelector('.a40') && (target.tagName || "").toLowerCase() === "tr") {
  		subDiv = target
  	} else {
  		let parent = target.parentNode
  		while (parent && !subDiv) {
  			if (parent.querySelector('.a40') && (parent.tagName || "").toLowerCase() === "tr") subDiv = parent
  			parent = parent.parentNode
  		}
  	}
  	if (!subDiv) return
  	event.preventDefault()
  	const pageURL = subDiv.querySelector('.a1 a').href
  	await downloadSub(pageURL)
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
  window.addEventListener('click', downloadAllSubs)
})()
