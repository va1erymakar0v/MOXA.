const preAnimated = document.querySelectorAll('.pre-animated');

let animationCounter = true;

window.addEventListener('scroll', scrollAnimation);
function scrollAnimation() {
	for (let i = 0; i < preAnimated.length; i++) {
		const itemToAnimate = preAnimated[i];
		const itemHight = itemToAnimate.offsetHeight;
		const itemOffset = offset(itemToAnimate).top;
		const itemStart = 10;

		let itemToAnimatePlace = window.innerHeight - itemHight / itemStart;
		if (itemHight > window.innerHeight) {
			itemToAnimatePlace = window.innerHeight - window.innerHeight / itemStart;
		}

		if ((pageYOffset > itemOffset - itemToAnimatePlace) && (pageYOffset < (itemOffset + itemToAnimatePlace))) {
			itemToAnimate.classList.remove('pre-animated');
			itemToAnimate.classList.add('animated');
			if (itemToAnimate.classList.contains('uncounted')) {
				countStats();
			}
		}
	}

	function offset(element) {
		const rect = element.getBoundingClientRect();
		const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
	}
}

function countPercent(num, place) {
	const time = 5000;
	const step = 2;

	let start = 0;

	let object = document.querySelector(place);
	let iterations = Math.round(time / (num / step));

	let interval = setInterval(() => {
		start += step;
		if (start == num) {
			clearInterval(interval);
		}
		object.innerHTML = start + '+';
	}, iterations);
}

function countStats() {
	countPercent(8, '.about__stats-heading--years');
	countPercent(50, '.about__stats-heading--projects');
	countPercent(30, '.about__stats-heading--clients');
	document.querySelector('.about__stats').classList.remove('uncounted');
}


const formSubmit = document.querySelector('.form__submit');
const formPopUp = document.querySelector('.form-popup');
const formPopUpButton = document.querySelector('.form-popup__button');

const overlay = document.querySelector('.decorative-overlay');

formSubmit.onclick = function(event) {
	if (!overlay.classList.contains('decorative-overlay--active')) {
		overlay.classList.add('decorative-overlay--active')
	}
	
	if (!formPopUp.classList.contains('form-popup--active')) {
		formPopUp.classList.add('form-popup--active');
		event.preventDefault();
		event.target.reset();
	}
}

formPopUpButton.onclick = function() {
	if (formPopUp.classList.contains('form-popup--active')) {
		formPopUp.classList.remove('form-popup--active')
	}

	if (overlay.classList.contains('decorative-overlay--active')) {
		overlay.classList.remove('decorative-overlay--active')
	}


}

overlay.onclick = function() {
	if (overlay.classList.contains('decorative-overlay--active')) {
		overlay.classList.remove('decorative-overlay--active')
	}

	if (formPopUp.classList.contains('form-popup--active')) {
		formPopUp.classList.remove('form-popup--active')
	}

	if (header.classList.contains('header--active')) {
		header.classList.remove('header--active')
	}
}

const header = document.querySelector('.header');
const headerBurger = document.querySelector('.header__burger');
const main = document.querySelector('.main');

headerBurger.onclick = function() {
		header.classList.toggle('header--active');
		overlay.classList.toggle('decorative-overlay--active');
}

const menuLink = document.querySelectorAll('.header__menu-link');

menuLink.forEach(link => {
	link.onclick = function() {
		if (header.classList.contains('header--active')) {
			header.classList.toggle('header--active');
			overlay.classList.toggle('decorative-overlay--active');
		}
	}
})