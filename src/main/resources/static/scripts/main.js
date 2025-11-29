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

// Примерный код для main.js или нового файла infiniteScroll.js

const contentContainer = document.getElementById('app-content');
let currentPageIndex = 0;
const sections = ['/api/home-content', '/api/services-content', '/api/portfolio-content', '/api/contact-content'];
let isLoading = false; // Флаг, чтобы избежать многократной загрузки

async function loadNextSection() {
    if (currentPageIndex >= sections.length || isLoading) return;

    isLoading = true;
    const url = sections[currentPageIndex];
    
    const response = await fetch(url);
    if (response.ok) {
        const html = await response.text();
        contentContainer.insertAdjacentHTML('beforeend', html); // Добавляем контент в конец
        currentPageIndex++;
    } else {
        console.error("Ошибка загрузки секции:", url);
    }
    isLoading = false;
}

// Функция, которая определяет, когда пользователь достиг низа страницы
function checkScrollPosition() {
    // Высота всего прокручиваемого содержимого
    const totalHeight = document.documentElement.scrollHeight; 
    // Позиция текущей прокрутки + высота видимой части экрана
    const scrollPosition = window.scrollY + window.innerHeight; 
    
    // Если пользователь прокрутил почти до конца (например, 90% страницы)
    if (scrollPosition >= totalHeight * 0.9) { 
        loadNextSection();
    }
}

// Слушаем событие прокрутки
window.addEventListener('scroll', checkScrollPosition);

// Загружаем первую секцию сразу при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadNextSection();
});

