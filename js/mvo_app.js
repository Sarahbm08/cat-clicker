/* Sarah Morley's newly organized code for Cat Clicker using model/view/octopus */
// Cat constructor

function Cat(name, url) {
	this.name = name;
	this.numClicks = 0;
	this.picURL = url;
}

Cat.prototype.toString = function() {
	return '[' + this.name + ', ' + this.picURL + ', ' + this.numClicks + ']';
};
		
let model = {
	cats: [
			new Cat('Megan','img/cat1.jpg'),
			new Cat('Sally', 'img/cat2.jpg'),
			new Cat('Allison', 'img/cat-green-eyes.jpg'),
			new Cat('Jared', 'img/cat-reaching.jpg'),
			new Cat('George', 'img/proud-cat.jpg'),
			new Cat('Pink', 'img/cutey-cat.jpeg'),
			new Cat('Fluffy White', 'img/fluffy-white-cat.jpeg')
		   ],
	currentCat: null,
	adminViewVisible: false
};

let controller = {
	init: function() {
		model.currentCat = model.cats[0]; //display first cat in list by default
		catListView.init();
		catView.init();
		adminView.init();
	},
	
	getAllCats: function() {
		return model.cats;
	},
	
	catClicked: function() {
		model.currentCat.numClicks++;
		catView.render();
	},
	
	getCurrentCat: function() {
		return model.currentCat;
	},
	
	setAdminViewVisibility: function(visible) {
		model.adminViewVisible = visible;
		adminView.render(model.adminViewVisible);
	},
	
	setCurrentCat: function(newCurrent) {
		model.currentCat = newCurrent;
		catView.render();
	},
	
	changeCatValues: function(newName, newPicURL, newNumClicks) {
		model.currentCat.name = newName;
		model.currentCat.picURL = newPicURL;
		model.currentCat.numClicks = newNumClicks;
		catView.render();
		catListView.render();
	}
};

let catView = {	
	init: function() {
		this.catName = document.querySelector('#cat-name');
		this.catImage = document.querySelector('#cat-img');
		this.catCount = document.querySelector('#cat-count');
		
		this.catImage.addEventListener('click', function() {
			controller.catClicked();
		}, false);
		
		this.render();
	},
	
	render: function() {
		let currentCat = controller.getCurrentCat();
		this.catName.innerHTML = currentCat.name;
		this.catImage.src = currentCat.picURL;
		this.catCount.innerHTML = 'Clicks: ' + currentCat.numClicks;
	}
};

let catListView = {
	init: function() {
		this.catList = document.querySelector('#cat-list');
		this.render();
	},
	
	render: function() {
		let cats = controller.getAllCats();
		
		this.catList.innerHTML = '';
		
		for(let i = 0; i < cats.length; i++) {
			const newChild = document.createElement('li');
			newChild.innerHTML = cats[i].name;
			newChild.addEventListener('click', (function() {
				controller.setCurrentCat(cats[i]);
			}));
			this.catList.appendChild(newChild);
		}
	},
};

let adminView = {
	init: function() {
		this.adminButton = document.querySelector('#admin-button');
		this.adminForm = document.querySelector('#admin-form');
		this.nameTextInput = document.querySelector('#name-input');
		this.picURLInput = document.querySelector('#pic-url-input');
		this.numClicksInput = document.querySelector('#num-clicks-input');
		this.cancelButton = document.querySelector('#cancel-button');
		this.saveButton = document.querySelector('#save-button');
		
		this.adminButton.addEventListener('click', function() {
			event.preventDefault();
			controller.setAdminViewVisibility(true);
		});
		
		this.cancelButton.addEventListener('click', function() {
			event.preventDefault();
			controller.setAdminViewVisibility(false);
		});
		
		this.saveButton.addEventListener('click', function() {
			event.preventDefault();			
			let newName = adminView.nameTextInput.value;
			let newPicURL = adminView.picURLInput.value;
			let newNumClicks = adminView.numClicksInput.value;
			controller.changeCatValues(newName, newPicURL, newNumClicks);
			controller.setAdminViewVisibility(false);
		});
	},
	
	render: function(visible = true) {
		if(visible) {
			this.adminForm.style.display = 'block';
			this.adminButton.style.display = 'none';
		}
		else {
			this.adminForm.style.display = 'none';
			this.adminButton.style.display = 'block';
		}
	}
};

controller.init();