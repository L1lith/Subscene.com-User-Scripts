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
// @id           subscene-filter-subs
// @name         Subscene Filter Subs
// @version      0.1
// @description  Adds an input box to filter the subs that appear
// @author       L1lith
// @include      http*://subscene.com/subtitles/*
// @grant        none
// @namespace    https://github.com/L1lith/Subscene.com-User-Scripts
// @run-at document-end
// @license      MIT
// ==/UserScript==

(()=>{
  const subDivs = [...document.querySelectorAll('.a1')].map(node => node.parentNode)
  const filterInput = document.createElement('input')
  filterInput.addEventListener('input', ()=>{
    let {value} = filterInput
    if (value === "") {
      subDivs.forEach(div => {div.style.display = "inherit"})
      return
    }
    value = value.toLowerCase()
    subDivs.forEach(div => {
      if ((div.innerText || "").split('\n').join(' ').toLowerCase().includes(value)) {
        div.style.display = "inherit"
      } else {
        div.style.display = "none"
      }
    })
  })
  filterInput.style.position = "fixed"
  filterInput.style.top = "65px"
  filterInput.style.right = "15px"
  filterInput.style.zIndex = 500
  filterInput.placeholder = "Filter subs..."
  filterInput.style.border = "2px solid #084862"
  filterInput.style.minWidth = "40px"
  filterInput.style.padding = "5px 10px"
  filterInput.style.outline = "none"
  filterInput.style.borderRadius = "4px"
  document.body.appendChild(filterInput)
})()
