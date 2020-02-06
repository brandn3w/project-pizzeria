
import {settings, select, classNames } from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';



const app = {
  initBooking: function () {
    const thisApp = this;

    const bookingWidget = document.querySelector(select.containerOf.booking);

    thisApp.booking = new Booking(bookingWidget);
  },

  initPages: function () {
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    thisApp.homeLinks = document.querySelectorAll(select.home.links);
    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        /*get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#', '');
        console.log(id);
        /*this thisApp.activatePage with that id */
        thisApp.activatePage(id);
        /*change url hash */
        window.location.hash = '#/' + id;
      });
    }
    for (let link of thisApp.homeLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        /*get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#', '');
        console.log(id);
        /*this thisApp.activatePage with that id */
        thisApp.activatePage(id);
        /*change url hash */
        window.location.hash = '#/' + id;
      });
    }
  },
  activatePage: function(pageId) {
    const thisApp = this;
    /*add class active to matching pages remove from non-matching */
    for (let page of thisApp.pages) {
   
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    /*add class active to matching LINKS, remove from non-matching */
    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },
  initMenu: function () {
    const thisApp = this;
    console.log('thisApp.data', thisApp.data);
    for (let productData in thisApp.data.products) {
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },

  initData: function () {
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.product;

    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse', parsedResponse);

        /* save parsedResponse as thisApp.data.products */
        thisApp.data.products = parsedResponse;
        /* execute initMenu method */
        thisApp.initMenu();
      });
    console.log('thisApp.data', JSON.stringify(thisApp.data));
  },

  initCarousel() {    // eslint-disable-next-line no-unused-vars

    const review = [];

    review[0] = {
      title: 'Delicious food',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      name: 'John Smith',
    };
    review[1] = {
      title: 'Amazing service!',
      text: 'Aenean vitae quam suscipit, interdum arcu nec,',
      name: 'Margaret Osborne',
    };
    review[2] = {
      title: 'Great place',
      text: 'Mauris maximus ipsum sed.',
      name: 'Mark Miller',
    };
    let i = 0;
    console.log(review[0]);

    const dots = document.querySelectorAll('.carousel-dots i');
    console.log(dots);

    function changeSlide() {

      const title = document.querySelector('.review-title');
     
      const text = document.querySelector('.review-text');
      
      const name = document.querySelector('.review-name');
      
     
  
      for (let dot of dots) {
        console.log(dot.id);
        if (dot.id == "dot-"+ (i + 1)) { // +1 ??
          console.log(dot.id);
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
        title.innerHTML = review[i].title;

        text.innerHTML = review[i].text;
        name.innerHTML = review[i].name;
      }

      if (i < review.length - 1) {
        i++;
      } else {
        i = 0;
      }
    }
    changeSlide();

    setInterval(() => {
      changeSlide();
    }, 3000);
  },

  initCart: function () {
    const thisApp = this;
    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);
    thisApp.productList = document.querySelector(select.containerOf.menu);
    thisApp.productList.addEventListener('add-to-cart', function (event) {
      app.cart.add(event.detail.product);
    });
  },

  init: function () {
    const thisApp = this;

    thisApp.initData();

    thisApp.initCart();
    thisApp.initPages();
    thisApp.initBooking();
    thisApp.initCarousel();

  },
};
app.init();


