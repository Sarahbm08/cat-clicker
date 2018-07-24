/* Sarah Morley's JS code for the Cat Clicker */

let catDisplay = document.querySelector('.cat-display');

let cats = [new Cat('George','img/cat1.jpg'),
			new Cat('Sally', 'img/cat2.jpg'),
			new Cat('Fred', 'img/cat-green-eyes.jpg'),
			new Cat('Megan', 'img/cat-reaching.jpg'),
			new Cat('Jared', 'img/proud-cat.jpg')];

populateSideList();
cats.forEach(displayCat);

// Cat constructor
function Cat(name, url) {
	this.name = name;
	this.numClicks = 0;
	this.picURL = url;
}

function displayCat(cat) {
	catDisplay.innerHTML = '';
	catDisplay.innerHTML += `<div class="cat">
	            <img class="cat-image" src="${cat.picURL}">
	            <p class="cat-name">${cat.name}</p>
	            <p>Number of Clicks: <span class="num-clicks">${cat.numClicks}</span></p>
	      </div>`;
}

Cat.prototype.catClicked = function() {	
	this.numClicks++;
	let numClicksText = document.querySelector('.num-clicks');
	numClicksText.innerHTML = this.numClicks;
}

catDisplay.addEventListener('click', function() {
	let cat = findCat(event.target.src)
	console.log("cat: " + cat.name);
	cat.catClicked();
}, false);

function resetCats() {
	catDisplay.innerHTML = '';
	cats.forEach(displayCat);
}

// find the cat in the array given the picURL
function findCat(picURL) {
	for(let i = 0; i < cats.length; i++) {
		if(picURL.endsWith(cats[i].picURL))
			return cats[i];
	}

	return null; // didn't find it
}

function populateSideList() {
	let catList = document.querySelector('#cat-list');

	for(let i = 0; i < cats.length; i++) {
		const newChild = document.createElement('li');
		newChild.innerHTML = cats[i].name;
		newChild.addEventListener('click', (function() {
		    displayCat(cats[i]);
		}));
		catList.appendChild(newChild);
	}
}