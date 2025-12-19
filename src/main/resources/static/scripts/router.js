// Функция для загрузки контента с сервера
async function loadContent(url) {
    const response = await fetch(url);
    if (!response.ok) {
        return "<h1>404 Страница не найдена</h1>";
    }
    return await response.text(); 
}

// Функция маршрутизации
async function router() {
    const path = window.location.pathname;
    const contentContainer = document.getElementById('app-content');
    
    // ОЧИЩАЕМ КОНТЕЙНЕР ПЕРЕД ЗАГРУЗКОЙ НОВОГО КОНТЕНТА
    contentContainer.innerHTML = ''; 
    // Сбрасываем счетчик страниц для main.js
    currentPageIndex = 0;

    switch (path) {
        case '/':
            // При переходе на главную, запускаем логику из main.js
            if (typeof loadNextSection === 'function') {
                await loadNextSection(); // Загрузит первую секцию
            }
            break;
        case '/contact':
            contentContainer.innerHTML = await loadContent('/api/contact-content');
            break;
        default:
            contentContainer.innerHTML = '<h1>404 Страница не найдена</h1>';
    }

    // Сброс прокрутки
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    // Обновление работы анимации
    if (typeof AOS !== 'undefined') {
        AOS.refresh(); 
    }
    // ЭТА СТРОКА, ЧТОБЫ ПРОВЕРИТЬ, НУЖНО ЛИ ЗАГРУЗИТЬ ЕЩЕ КОНТЕНТА СРАЗУ
    if (window.location.pathname === '/' && typeof checkScrollPosition === 'function') {
        checkScrollPosition();
    }
}

// Перехват кликов по ссылкам с классом 'nav-link'
document.addEventListener('click', (event) => {
    const { target } = event;
    if (target.matches('.nav-link')) {
        event.preventDefault(); 
        const href = target.getAttribute('href');
        
        window.history.pushState({}, '', href); 
        
        router(); // Запускаем нашу функцию маршрутизации
    }
});

// Обработка навигации кнопками "назад"/"вперед" в браузере
window.addEventListener('popstate', router);

// Запуск маршрутизации при первой загрузке страницы
document.addEventListener('DOMContentLoaded', router);
