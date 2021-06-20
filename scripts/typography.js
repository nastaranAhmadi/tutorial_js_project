const container = document.querySelector(".container");
const text = container.querySelector('h1');
const space = 500; //500px
container.addEventListener('mousemove', function(event){
    const { offsetWidth: width, offsetHeight: height } = container;
    let { offsetX: x, offsetY: y } = event;
    x += event.target.offsetLeft;
    y += event.target.offsetTop;
    const xMove = Math.round((x / width * space) - (space / 2));
    const yMove = Math.round((y / height * space) - (space / 2));
    text.style.textShadow = `
    ${xMove}px ${yMove}px 0 rgba(238, 82, 83, .7),
    ${xMove * -1}px ${yMove}px 0 rgba(52, 31, 151, .7),
    ${yMove}px ${xMove * -1}px 0 rgba(243, 104, 224, .7),
    ${yMove * -1}px ${xMove}px 0 rgba(254, 202, 87, .7)
    `;
});