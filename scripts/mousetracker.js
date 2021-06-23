var canvas = document.getElementById('randomDots'),
canWidth = parseInt(canvas.getAttribute('width')),
canHeight = parseInt(canvas.getAttribute('height')),
ctx = canvas.getContext('2d');
var dot = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    r: 0,
    alpha: 1,
    phase: 0
};
dot_color = {
    r: 0,
    g: 0,
    b: 0
};//dot color
R = 2;//dot radius
dots = [];
alpha_f = 0.01;//delay for wink
link_line_width = .6;//line width
dis_limit = 250;//line density
mouse_dot = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    r: 0,
    type: 'mouse'
};//connect mouse to random dots

// Random speed
function getRandomSpeed(pos){
    var  min = -1,
       max = 1;
    switch(pos){
        case 'top':
            return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
            break;
        case 'right':
            return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
            break;
        case 'bottom':
            return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
            break;
        case 'left':
            return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
            break;
        default:
            return;
            break;
    }
}
function randomArrayItem(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomNumFrom(min, max){
    return Math.random()*(max - min) + min;
}
// console.log(randomNumFrom(0, 10));
// Random dot
function getRandomdot(){
    var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
    switch(pos){
        case 'top':
            return {
                x: randomSidePos(canWidth),
                y: -R,
                vx: getRandomSpeed('top')[0],
                vy: getRandomSpeed('top')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'right':
            return {
                x: canWidth + R,
                y: randomSidePos(canHeight),
                vx: getRandomSpeed('right')[0],
                vy: getRandomSpeed('right')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'bottom':
            return {
                x: randomSidePos(canWidth),
                y: canHeight + R,
                vx: getRandomSpeed('bottom')[0],
                vy: getRandomSpeed('bottom')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'left':
            return {
                x: -R,
                y: randomSidePos(canHeight),
                vx: getRandomSpeed('left')[0],
                vy: getRandomSpeed('left')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
    }
}
function randomSidePos(length){
    return Math.ceil(Math.random() * length);
}

// Draw dot
function renderdots(){
    Array.prototype.forEach.call(dots, function(b){
       if(!b.hasOwnProperty('type')){
           ctx.fillStyle = 'rgba('+dot_color.r+','+dot_color.g+','+dot_color.b+','+b.alpha+')';
           ctx.beginPath();
           ctx.arc(b.x, b.y, R, 0, Math.PI*2, true);
           ctx.closePath();
           ctx.fill();
       }
    });
}

// Update dots
function updatedots(){
    var new_dots = [];
    Array.prototype.forEach.call(dots, function(b){
        b.x += b.vx;
        b.y += b.vy;
        
        if(b.x > -(50) && b.x < (canWidth+50) && b.y > -(50) && b.y < (canHeight+50)){
           new_dots.push(b);
        }
        
        // alpha change
        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
        // console.log(b.alpha);
    });
    
    dots = new_dots.slice(0);
}

// Draw lines
function renderLines(){
    var fraction, alpha;
    for (var i = 0; i < dots.length; i++) {
        for (var j = i + 1; j < dots.length; j++) {
           
           fraction = getDisOf(dots[i], dots[j]) / dis_limit;
            
           if(fraction < 1){
               alpha = (1 - fraction).toString();

               ctx.strokeStyle = 'rgba(150,150,150,'+alpha+')';
               ctx.lineWidth = link_line_width;
               
               ctx.beginPath();
               ctx.moveTo(dots[i].x, dots[i].y);
               ctx.lineTo(dots[j].x, dots[j].y);
               ctx.stroke();
               ctx.closePath();
           }
        }
    }
}

// calculate distance between two points
function getDisOf(b1, b2){
    var  delta_x = Math.abs(b1.x - b2.x),
       delta_y = Math.abs(b1.y - b2.y);
    
    return Math.sqrt(delta_x*delta_x + delta_y*delta_y);
}

// add dots if there a little dots
function adddotIfy(){
    if(dots.length < 20){
        dots.push(getRandomdot());
    }
}

// Render
function render(){
    ctx.clearRect(0, 0, canWidth, canHeight);
    
    renderdots();
    
    renderLines();
    
    updatedots();
    
    adddotIfy();
    
    window.requestAnimationFrame(render);
}

// Init dots
function initdots(num){
    for(var i = 1; i <= num; i++){
        dots.push({
            x: randomSidePos(canWidth),
            y: randomSidePos(canHeight),
            vx: getRandomSpeed('top')[0],
            vy: getRandomSpeed('top')[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10)
        });
    }
}
// Init Canvas
function initCanvas(){
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);
    
    canWidth = parseInt(canvas.getAttribute('width'));
    canHeight = parseInt(canvas.getAttribute('height'));
}
//responsive on resize
window.addEventListener('resize', function(e){
    initCanvas();
});
//start animation
function goMovie(){
    initCanvas();
    initdots(40);
    window.requestAnimationFrame(render);
}
goMovie();

// Mouse effect
canvas.addEventListener('mouseenter', function(){
    mouse_in = true;
    dots.push(mouse_dot);
});
canvas.addEventListener('mouseleave', function(){
    mouse_in = false;
    var new_dots = [];
    Array.prototype.forEach.call(dots, function(b){
        if(!b.hasOwnProperty('type')){
            new_dots.push(b);
        }
    });
    dots = new_dots.slice(0);
});
canvas.addEventListener('mousemove', function(e){
    var e = e || window.event;
    mouse_dot.x = e.pageX;
    mouse_dot.y = e.pageY;
});