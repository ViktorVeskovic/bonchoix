export function initAccount() {
    if(document.querySelector('.my-acc')) {
        const liArr = document.querySelectorAll('.my-acc__list-item');
        const orders = document.querySelector('[data-section="orders"]');
        const newsletter = document.querySelector('[data-section="newsletter"]');
        const ordersLi = document.querySelector('[data-open="orders"]');
        const newsletterLi = document.querySelector('[data-open="newsletter"]');
        const backBtns = document.querySelectorAll('.my-acc__back');
        const toggleCheckbox = document.querySelector('.toggle-checkbox');

        toggleCheckbox.addEventListener('click', () => {
            toggleCheckbox.classList.toggle('active');
        }) 

        backBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.my-acc__tab--open').classList.remove('my-acc__tab--open');
            })
        });

        liArr.forEach(li => {
            li.addEventListener('click', () => {
                document.querySelector('.my-acc__list-item--active').classList.remove('my-acc__list-item--active');
                li.classList.add('my-acc__list-item--active');
                
                switch (li.dataset.open) {
                    case 'orders':
                        newsletter.classList.remove('my-acc__tab--open');
                        orders.classList.add('my-acc__tab--open');
                        break;
                    case 'newsletter':
                        orders.classList.remove('my-acc__tab--open');
                        newsletter.classList.add('my-acc__tab--open');
                        break;
                
                    default:
                        break;
                }
            })
        })

        const initTabOnDesk = () => {
            if (window.innerWidth > 1200 && !document.querySelector('.my-acc__tab--open')) {
                orders.classList.add('my-acc__tab--open');
            }
        }

        initTabOnDesk();
        window.addEventListener('resize', initTabOnDesk);
    }
}