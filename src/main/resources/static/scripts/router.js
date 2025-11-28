// Функция для загрузки контента с сервера
async function loadContent(url) {
    const response = await fetch(url);
    if (!response.ok) {
        return "<h1>404 Страница не найдена</h1>";
    }
    // Предполагаем, что сервер Spring Boot возвращает чистый HTML-фрагмент
    return await response.text(); 
}

// Функция маршрутизации
async function router() {
    const path = window.location.pathname;
    const contentContainer = document.getElementById('app-content');
    
    // В зависимости от пути, загружаем контент с соответствующего URL
    switch (path) {
        case '/':
            contentContainer.innerHTML = await loadContent('/api/home-content');
            break;
        case '/services':
            contentContainer.innerHTML = await loadContent('/api/services-content');
            break;
        case '/portfolio':
            contentContainer.innerHTML = await loadContent('/api/portfolio-content');
            break;
        case '/contact':
            contentContainer.innerHTML = await loadContent('/api/contact-content');
            break;
        default:
            contentContainer.innerHTML = '<h1>404 Страница не найдена</h1>';
    }
}

// Перехват кликов по ссылкам с классом 'nav-link'
document.addEventListener('click', (event) => {
    // Проверяем, был ли клик по нашей SPA-ссылке
    const { target } = event;
    if (target.matches('.nav-link')) {
        event.preventDefault(); // Отменяем стандартную перезагрузку страницы
        const href = target.getAttribute('href');
        
        // Меняем URL в браузере без перезагрузки страницы
        window.history.pushState({}, '', href); 
        
        router(); // Запускаем нашу функцию маршрутизации
    }
});

// Обработка навигации кнопками "назад"/"вперед" в браузере
window.addEventListener('popstate', router);

// Запуск маршрутизации при первой загрузке страницы
document.addEventListener('DOMContentLoaded', router);
