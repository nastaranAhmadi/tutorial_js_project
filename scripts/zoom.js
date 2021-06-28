let thumbnailLst = [...document.querySelectorAll(".thumbnail-list > img")];
thumbnailLst.forEach(item => {
    item.addEventListener("click", () => {
        document.querySelector(".big-pic").style = `background-image: url(${item.src});`;
    })
})
document.querySelector(".big-pic").addEventListener("mouseenter", function() {
    this.style.backgroundSize = '250%'
})
document.querySelector(".big-pic").addEventListener("mousemove", function(e) {
    let d = this.getBoundingClientRect();
    let x = e.clientX - d.left;
    let y = e.clientY - d.top;
    x = Math.round(100 / (d.width / x));
    y = Math.round(100 / (d.height / y));
    e.target.style.backgroundPosition = `${x}% ${y}%`;
})
document.querySelector(".big-pic").addEventListener("mouseleave", function() {
    this.style.backgroundSize = '100%';
    this.style.backgroundPosition = 'center';
})