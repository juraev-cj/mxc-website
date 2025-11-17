// Находим кнопку гамбургера по ID
const hamburger = document.getElementById('hamburger-toggle');
// Находим блок навигации по ID (убедитесь, что ID mainMenu присвоен в HTML тегу nav)
const navMenu = document.getElementById('mainMenu');

// Добавляем слушатель события 'click'
hamburger.addEventListener('click', () => {
    // Переключаем класс 'active' на блоке навигации (navMenu)
    navMenu.classList.toggle('active');
    // Опционально: можно также добавить класс 'active' на саму кнопку, чтобы стилизовать иконку (например, превратить в крестик)
    hamburger.classList.toggle('active');
});

// Дополнительно: Закрываем меню при клике на любую ссылку
document.querySelectorAll('.main-nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});
