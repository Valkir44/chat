var ripple = document.getElementById('ripple_effect');

ripple.addEventListener('click', createRipple );

var circle = document.createElement('div');

function createRipple(e) {

    this.appendChild(circle);

    var i = Math.max(this.clientWidth, this.clientHeight);
    circle.style.width = circle.style.height = i + 'px';
    circle.style.left = e.clientX - i / 2 + 'px';
    circle.style.top = e.clientY - i / 2 + 'px';
    circle.classList.add('ripple');
    console.log(circle.style.top = e.clientY - i / 2 + 'px');


}