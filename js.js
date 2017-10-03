//nær í canvas.
var canvas = document.querySelector('canvas');

//setur canvas width og height í það sama og window (-6px. svo að scroll barinn sýnist ekki... hann var að pirra mig).
canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 6;

//nær í canvas functionin.
var c = canvas.getContext('2d');

//skilar random lit frá array.
function getRandomColor() {
	var colorArray = [
		'#2E112D',
		'#540032',
		'#820333',
		'#C9283E',
		'#F0433A'
	];
	var color = Math.floor(Math.random() * colorArray.length);
	if (color == 5) {color = 4;}
	return colorArray[color];
};

//variable til að geima x og y staðsetningu músarinnar.
var mouse = {
	x: undefined,
	y: undefined
};

//variables
maxRadius = 30;
hoverRadius = 50;

//event listener fyrir að ná í x og y staðsetningu músarinnar.
window.addEventListener('mousemove',function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

//circle object constructor.
function Circle(x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	this.minRadius = radius;

	//teiknar út hringina á núverandi staðsetningu.
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.strokeStyle = this.color;
		c.stroke();
	};

	//reiknar út næstu staðsetningu og breytir núverandi staðsetningu.
	this.update = function() {
		this.draw();
		if (((this.x + this.radius) > innerWidth) || ((this.x - this.radius) < 0)) {
			this.dx = -this.dx;
		}
		if (((this.y + this.radius) > innerHeight) || ((this.y - this.radius) < 0)) {
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		//interactivity
		if (mouse.x - this.x < hoverRadius && mouse.x - this.x > -hoverRadius
			&& mouse.y - this.y < hoverRadius && mouse.y - this.y > -hoverRadius) {
			if (this.radius < maxRadius) {
				this.radius += 1;
			}
		}
		else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}

	};
};

//býr til array og setur x-mikið af hringum í arrayinn.
var circleArray = [];
for (var i = 0; i < 1000; i++) {
	var radius = (Math.random() * 10) + 5;
	var x = Math.random() * (innerWidth - radius * 2) + radius;
	var y = Math.random() * (innerHeight - radius * 2) + radius;
	var dx = (Math.random() - 0.5) * 5;
	var dy = (Math.random() - 0.5) * 5;
	var color = getRandomColor();
	circleArray.push(new Circle(x, y, dx, dy, radius, color));
};

//animate-ar hringana.
function animate() {

	//nær í þetta function aftur...
	requestAnimationFrame(animate);

	//resize-ar canvas eftir window.
	canvas.width = window.innerWidth - 6;
	canvas.height = window.innerHeight - 6;

	//nær í canvas hlutina
	var c = canvas.getContext('2d');

	//hreinsar út canvas-ið ef það er eitthvað eftir.
	c.clearRect(0, 0, innerWidth, innerHeight);

	//keyrir update fyrir alla hringina.
	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
};

//kallar á animate fallið í fyrsta skiptið.
animate();