export function initLogin() {
    if(document.querySelector('.login')) {
        const openBtn = document.getElementById('forgot-pass-btn');
        const cancelBtn = document.getElementById('forgot-pass-cancel');
        const forgotModal = document.querySelector('.forgot');

        openBtn.addEventListener('click', () => {
            forgotModal.classList.add('forgot--open');
        })

        cancelBtn.addEventListener('click', () => {
            forgotModal.classList.remove('forgot--open');
        })
    }
}