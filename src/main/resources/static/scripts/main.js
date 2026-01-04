// Находим кнопку гамбургера по ID
const hamburger = document.getElementById('hamburger-toggle');
const navMenu = document.getElementById('mainMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.querySelectorAll('.main-nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

const contentContainer = document.getElementById('app-content');
let currentPageIndex = 0;
const sections = ['/api/home-content', '/api/advantages-content', '/api/chain-content', '/api/contact-content'];
let isLoading = false;

async function loadNextSection() {
    if (currentPageIndex >= sections.length || isLoading) return;

    // Проверяем путь здесь еще раз, чтобы удостовериться, что мы на главной
    if (window.location.pathname !== '/') {
        isLoading = false;
        return;
    }

    isLoading = true;
    const url = sections[currentPageIndex];
    
    try {
        const response = await fetch(url); 
        if (response.ok) {
            const html = await response.text();
            contentContainer.insertAdjacentHTML('beforeend', html);
            currentPageIndex++;
            
            if (typeof AOS !== 'undefined') {
                AOS.refresh(); 
            }
        } else {
            console.error(`Ошибка сервера ${response.status} при загрузке секции: ${url}`);
        }
    } catch (error) {
        console.error("Произошла ошибка сети при загрузке:", error);
    }
    isLoading = false;
}

function checkScrollPosition() {
    // Отключаем прокрутку для всех страниц, кроме главной
    if (window.location.pathname !== '/') return; 

    const totalHeight = document.documentElement.scrollHeight; 
    const scrollPosition = window.scrollY + window.innerHeight; 
    
    // Условие 1: Пользователь достиг низа страницы
    const reachedBottom = (scrollPosition >= totalHeight * 0.9);
    
    // Условие 2 (НОВОЕ): Высота всего контента меньше, чем видимая высота экрана
    const noScrollbar = (totalHeight <= window.innerHeight);

    if (reachedBottom || noScrollbar) { 
        loadNextSection();
    }
}

window.addEventListener('scroll', checkScrollPosition);
