document.addEventListener("DOMContentLoaded", function() {
	setTimeout(() => {
		class Carousel {
			constructor(el) {
				this.el = el;
				this.carouselOptions = ['left','right'];
				this.carouselData = [
					{
						'id': '1',
						'src': './src/images/feedback-01.webp',
					},
					{
						'id': '2',
						'src': './src/images/feedback-02.webp',
					},
					{
						'id': '3',
						'src': './src/images/feedback-03.webp',
					},
					{
						'id': '3',
						'src': './src/images/feedback-04.webp',
					},
				];
				this.carouselInView = [1, 2, 3];
				this.carouselContainer;
				this.carouselPlayState;
			}
	
			mounted() {
				this.setupCarousel();
			}
	
			// Build carousel html
			setupCarousel() {
				const container = document.createElement('div');
				const controls = document.createElement('div');
	
				// Add container for carousel items and controls
				this.el.append(container, controls);
				container.className = 'row g-24 items';
				controls.className = 'row g-24 pagination';
	
				// Take dataset array and append items to container
				this.carouselData.forEach((item, index) => {
					const carouselItem = item.src ? document.createElement('img') : document.createElement('div');
	
					container.append(carouselItem);
	
					// Add item attributes
					carouselItem.className = `carousel-item carousel-item-${index + 1}`;
					carouselItem.src = item.src;
					carouselItem.setAttribute('alt', 'Imagem do carrosel')
					carouselItem.setAttribute('loading', 'lazy');
					// Used to keep track of carousel items, infinite items possible in carousel however min 5 items required
					carouselItem.setAttribute('data-index', `${index + 1}`);
				});
	
				this.carouselOptions.forEach((option) => {
					const btn = document.createElement('div');
					const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

          svg.setAttribute('xlmns', 'http://www.w3.org/2000/svg');
          svg.setAttribute('width', '32');
          svg.setAttribute('height', '32');
          svg.setAttribute('viewBox', '0 0 32 32');

          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', 'M7.417 16.944a1 1 0 0 1 0-1.387l5.113-5.313c.624-.649 1.72-.207 1.72.693V14c0 .138.112.25.25.25h9.75a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H14.5a.25.25 0 0 0-.25.25v3.063c0 .9-1.096 1.342-1.72.693z');
          path2.setAttribute('d', 'M6 1a5 5 0 0 0-5 5v20a5 5 0 0 0 5 5h20a5 5 0 0 0 5-5V6a5 5 0 0 0-5-5zM3 6a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zx');

					svg.append(path);
					svg.append(path2);
					btn.append(svg);

					// Add button attributes
					btn.className = `icon carousel-control carousel-control-${option}`;
					btn.setAttribute('data-name', option);
	
					// Add carousel control options
					controls.append(btn);
				});
	
				// After rendering carousel to our DOM, setup carousel controls' event listeners
				this.setControls([...controls.children]);
	
				// Set container property
				this.carouselContainer = container;
			}
	
			setControls(controls) {
				controls.forEach(control => {
					control.onclick = (event) => {
						event.preventDefault();
	
						// Manage control actions, update our carousel data first then with a callback update our DOM
						this.controlManager(control.dataset.name);
					};
				});
			}
	
			controlManager(control) {
				if (control === 'left') return this.previous();
				if (control === 'right') return this.next();
	
				return;
			}
	
			previous() {
				// Update order of items in data array to be shown in carousel
				this.carouselData.unshift(this.carouselData.pop());
	
				// Push the first item to the end of the array so that the previous item is front and center
				this.carouselInView.push(this.carouselInView.shift());
	
				// Update the css class for each carousel item in view
				this.carouselInView.forEach((item, index) => {
					this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
				});
	
				// Using the first 5 items in data array update content of carousel items in view
				this.carouselData.slice(0, 3).forEach((data, index) => {
					document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
				});
			}
	
			next() {
				// Update order of items in data array to be shown in carousel
				this.carouselData.push(this.carouselData.shift());
	
				// Take the last item and add it to the beginning of the array so that the next item is front and center
				this.carouselInView.unshift(this.carouselInView.pop());
	
				// Update the css class for each carousel item in view
				this.carouselInView.forEach((item, index) => {
					this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
				});
	
				// Using the first 5 items in data array update content of carousel items in view
				this.carouselData.slice(0, 3).forEach((data, index) => {
					document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
				});
			}
	
		}
	
		// Refers to the carousel root element you want to target, use specific class selectors if using multiple carousels
		const el = document.querySelector('.carousel');
		// Create a new carousel object
		const exampleCarousel = new Carousel(el);
		// Setup carousel and methods
		exampleCarousel.mounted();
	}, 2000);
})
	
