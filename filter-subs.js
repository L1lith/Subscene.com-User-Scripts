// ==UserScript==
// @name         Subscene Filter Subs
// @version      0.1
// @description  Adds an input box to filter the subs that appear
// @author       L1lith
// @include      http*://subscene.com/subtitles/*
// @grant        none
// @namespace    https://openuserjs.org
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
