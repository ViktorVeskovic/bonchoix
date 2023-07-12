import axios from 'axios'
import _map from 'lodash/map'
import _each from 'lodash/each'
import _size from 'lodash/size'

class AddAll {
  constructor ({button, variants}) {
    if(!button){
      return
    }

    this.button = document.querySelector(button)
    this.variants = document.querySelectorAll(variants)

    if(this.button){
      this.button.addEventListener('click', this.addToCart)
    }

    if(_size(this.variants)){
      _each(this.variants, v => {
        v.addEventListener('click', (e) => {
          this.changeVariant(e)
        })
      })
    }

    // this.changeVariant = this.changeVariant.bind(this)
    // this.addToCart = this.addToCart.bind(this)
  }

  changeVariant(e) {
    _each(this.variants, v => v.classList.remove('active'))
    e.currentTarget.classList.add('active')

    this.button.setAttribute('data-id', e.currentTarget.dataset.id)
    this.button.removeAttribute('disabled')
  }

  async addToCart(e) {
    let ids = e.currentTarget.dataset.id.split(",")
    let quantity = e.currentTarget.dataset.quantity

    if(!ids){
      return
    }

    let items = _map(ids, (id) => {
      return {
        quantity,
        id
      }
    })

    console.log("[addAll.js] items to be added:", items)

    try {      
      await axios.post('/cart/add.js', {
        items
      })

      // update and open the cart
      if(APP.Cart){        
        APP.Cart.refreshCart()
        APP.Cart.toggleCart(true)
      }

    } catch(err) {
      console.warn('[addAll.js] error:', err)
    }
  }

  // @TODO: check if we need this
  destroy() {
    if(_size(this.buttons)){
      _each(this.buttons, (b) => {
        this.button.removeEventListener('click', this.addToCart)
      })
    }
  }
}

export default AddAll