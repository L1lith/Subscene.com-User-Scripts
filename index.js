(()=>{
  async function downloadSub(event) {
  	const {target} = event
  	let subDiv = null
  	event.preventDefault()
  	if (target.querySelector('.a40') && target.tagName.toLowerCase() === "tr") {
  		subDiv = target
  	} else {
  		let parent = target.parentNode
  		while (parent && !subDiv) {
  			if (parent.querySelector('.a40') && parent.tagName.toLowerCase() === "tr") subDiv = parent
  			parent = parent.parentNode
  		}
  	}
  	if (!subDiv) return
  	const pageURL = subDiv.querySelector('.a1 a').href
  	const pageHTML = await (await fetch(pageURL)).text()
  	const dom = (new DOMParser()).parseFromString(pageHTML, 'text/html')
  	const downloadURL = dom.getElementById('downloadButton').href
  	const name = dom.querySelector('li.release div').textContent.trim()
  	download(downloadURL, name + '.zip')
  }
  function download(dataurl, filename) {
    const a = document.createElement("a")
    a.href = dataurl
    a.setAttribute("download", filename);
    const b = document.createEvent("MouseEvents")
    b.initEvent("click", false, true)
    a.dispatchEvent(b)
  }
  window.addEventListener('click', downloadSub)
})()