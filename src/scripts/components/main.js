import Highway from '@dogstudio/highway'

// RENDERERS
import CartRenderer from '../renderers/cart'
import FindRenderer from '../renderers/find'
import HomepageRenderer from '../renderers/homepage'
import DefPageRenderer from '../renderers/def-page-renderer'
import ProductRenderer from '../renderers/product'
import VisionariesLandingRenderer from '../renderers/visionaries-landing'

// COMPONENTS
import Menu from '../modules/r7/r7-menu'
import VueCart from '../components/global-cart'
import Fade from '../transitions/fade'

import Drawer from '../modules/r7/r7-drawer'

window.APP = {}

// INIT THE NAV
APP.MainMenu = new Menu({
  el: document.querySelector('.header'), // Will only toggle class on this one
  menu: document.querySelector('.fullscreen-menu'), // Full screen menu
  hamburger: document.querySelector('.header__hamburger'), // Element to open the menu
  openClass: "header--open" // Classname to be added to @el when open
})

// MINI CART
APP.Cart = VueCart


const H = new Highway.Core({
    renderers: {
      cart: CartRenderer,
      listCollections: FindRenderer,
      collection: FindRenderer,
      index: HomepageRenderer,
      s: FindRenderer,
      u: FindRenderer,
      product: ProductRenderer,
      defpage: DefPageRenderer,
      visionaries: VisionariesLandingRenderer,
    },
    transitions: {
      default: Fade
    }
  })