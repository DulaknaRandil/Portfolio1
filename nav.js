document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavList = document.querySelector('.main-nav-list');

    menuToggle.addEventListener('click', function () {
        mainNavList.classList.toggle('show-menu');
    });
});
