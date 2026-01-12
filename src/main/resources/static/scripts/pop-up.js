/* Скрипт управления попапом и каруселью для МХС */

// 1. База данных устройств (добавляйте сюда новые товары)
const productDatabase = {
    "dmm_1": {
        title: "Диссольвер 1.5-5.5 кВТ",
        price: "0.155 млн.руб.",
        images: ["/images/dissolvers/dmm/image1.png"], // Всегда используйте массив []
        description: "Компактная установка для малых производств. Оснащена частотным преобразователем для плавной регулировки оборотов."
    },
    "dmm_2": {
        title: "Диссольвер 3-11 кВТ",
        price: "0.220 млн.руб.",
        images: [
            "/images/dissolvers/dcm/image1.png",
            "/images/dissolvers/dmm/image2.png" // Пример: второе фото для карусели
        ],
        description: "Универсальный диссольвер средней мощности. Усиленная подъемная стойка."
    },
    "dmm_3": {
        title: "Диссольвер 3-11 кВТ",
        price: "0.250 млн.руб.",
        images: ["/images/dissolvers/dcm/image1.png"],
        description: "Универсальный диссольвер средней мощности. Взрывозащищенный двигатель."
    }
};

let currentSlide = 0;

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('pop-up');
    const orderForm = document.getElementById('orderForm');
    const closeBtn = document.querySelector('.close-btn');
    const privacyCheck = document.getElementById('privacy-check');

    // --- 2. Логика открытия Попапа ---
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Если кликнули по ссылке внутри карточки, отменяем переход
            if (e.target.closest('a')) e.preventDefault();

            const productId = this.getAttribute('data-product-id');
            const data = productDatabase[productId];

            if (data) {
                initCarousel(data.title, data.description, data.price, data.images);
                
                // Показываем модальное окно
                modal.style.display = 'flex'; 
                document.body.style.overflow = 'hidden'; 
            }
        });
    });

    // --- 3. Логика закрытия ---
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    if (closeBtn) closeBtn.onclick = closeModal;

    window.onclick = (event) => {
        if (event.target == modal) closeModal();
    };

    // --- 4. Логика отправки формы (AJAX) ---
    if (orderForm) {
        orderForm.onsubmit = async (e) => {
            e.preventDefault();

            // Проверка чекбокса согласия
            if (privacyCheck && !privacyCheck.checked) {
                alert('Пожалуйста, подтвердите согласие на обработку данных');
                return;
            }

            const status = document.getElementById('statusMessage');
            status.innerText = 'Отправка...';
            status.style.color = 'black';

            const formData = new FormData(orderForm);
            
            try {
                const response = await fetch('/api/send-order', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    status.innerText = 'Заявка отправлена! Мы свяжемся с вами.';
                    status.style.color = 'green';
                    orderForm.reset();
                    setTimeout(closeModal, 3000);
                } else {
                    status.innerText = 'Ошибка отправки. Попробуйте снова.';
                    status.style.color = 'red';
                }
            } catch (error) {
                status.innerText = 'Ошибка сети. Проверьте интернет.';
                status.style.color = 'red';
            }
        };
    }
});

// --- 5. Функции карусели ---

/* Инициализация данных и создание слайдов */
function initCarousel(title, desc, price, imageArray) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal-price').innerText = price;
    document.getElementById('hiddenProductName').value = title;

    const slidesContainer = document.getElementById('carousel-slides');
    const dotsContainer = document.getElementById('carousel-dots');
    
    // Очистка старого контента
    slidesContainer.innerHTML = '';
    dotsContainer.innerHTML = '';
    currentSlide = 0; 

    imageArray.forEach((src, index) => {
        // Создаем изображение
        const img = document.createElement('img');
        img.src = src;
        img.alt = title;
        if (index === 0) img.classList.add('active');
        slidesContainer.appendChild(img);

        // Создаем точку (только если картинок больше одной)
        if (imageArray.length > 1) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.onclick = (e) => {
                e.stopPropagation(); // Чтобы клик по точке не закрыл модалку
                showSlide(index);
            };
            dotsContainer.appendChild(dot);
        }
    });

    // Прячем стрелки, если картинка всего одна
    const navBtns = document.querySelectorAll('.carousel-prev, .carousel-next');
    navBtns.forEach(btn => {
        btn.style.display = imageArray.length > 1 ? 'block' : 'none';
    });
}

/* Переключение слайда по кнопкам */
function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

/* Показ конкретного слайда */
function showSlide(index) {
    const images = document.querySelectorAll('.carousel-slides img');
    const dots = document.querySelectorAll('.dot');

    if (images.length === 0) return;

    // Убираем активный класс у текущего слайда
    if (images[currentSlide]) images[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

    // Рассчитываем новый индекс (циклично)
    currentSlide = (index + images.length) % images.length;

    // Добавляем активный класс новому слайду
    if (images[currentSlide]) images[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}
