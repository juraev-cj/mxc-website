// 1. База данных описаний каждого товара (скрыта от глаз до клика)
const productDatabase = {
    "dmm_1": {
        title: "Диссольвер 1.5-5.5 кВТ",
        price: "0.155 млн.руб.",
        img: "/images/dissolvers/dmm/image1.png", // Путь должен совпадать с реальностью
        description: "Компактная установка для малых производств. Оснащена частотным преобразователем для плавной регулировки оборотов. Легкая замена дежи и удобная очистка вала."
    },
    "dmm_2": {
        title: "Диссольвер 3-11 кВТ",
        price: "0.220 млн.руб.",
        img: "/images/dissolvers/dcm/image1.png",
        description: "Универсальный диссольвер средней мощности. Усиленная подъемная стойка, возможность работы с вязкими составами. Комплектуется взрывозащищенным двигателем."
    },
    "dmm_3": {
        title: "Диссольвер 3-11 кВТ",
        price: "0.250 млн.руб.",
        img: "/images/dissolvers/dcm/image1.png",
        description: "Универсальный диссольвер средней мощности. Усиленная подъемная стойка, возможность работы с вязкими составами. Комплектуется взрывозащищенным двигателем."
    },
    "dmm_4": {
        title: "Диссольвер 3-11 кВТ",
        price: "0.300 млн.руб.",
        img: "/images/dissolvers/dcm/image1.png",
        description: "Универсальный диссольвер средней мощности. Усиленная подъемная стойка, возможность работы с вязкими составами. Комплектуется взрывозащищенным двигателем."
    },
    // Сюда добавьте остальные 22 устройства по аналогии
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('pop-up');
    const orderForm = document.getElementById('orderForm');
    const closeBtn = document.querySelector('.close-btn');

    // 2. Логика открытия Попапа
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            
            // SEO-friendly: если клик был по ссылке внутри карточки, 
            // отменяем переход, чтобы открыть попап
            if (e.target.closest('a')) {
                e.preventDefault();
            }

            const productId = this.getAttribute('data-product-id');
            const data = productDatabase[productId];

            if (data) {
                // Заполняем попап данными из JS-базы
                document.getElementById('modal-title').innerText = data.title;
                document.getElementById('modal-desc').innerText = data.description;
                document.getElementById('modal-price').innerText = data.price;
                document.getElementById('modal-img').src = data.img;
                
                // Подставляем название в скрытое поле формы для EmailService
                document.getElementById('hiddenProductName').value = data.title;

                // Показываем модальное окно
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Убираем прокрутку сайта
            }
        });
    });

    // 3. Логика закрытия
    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // 4. Логика отправки формы на сервер (AJAX)
    if (orderForm) {
        orderForm.onsubmit = async (e) => {
            e.preventDefault();
            const status = document.getElementById('statusMessage');
            status.innerText = 'Отправка...';

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
                    setTimeout(() => {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        status.innerText = '';
                    }, 2500);
                } else {
                    status.innerText = 'Ошибка отправки. Попробуйте снова.';
                }
            } catch (error) {
                status.innerText = 'Ошибка сети. Проверьте интернет.';
            }
        };
    }
});

const privacyCheck = document.getElementById('privacy-check');
const orderBtn = document.getElementById('order-btn');
const form = document.getElementById('orderForm');

form.addEventListener('submit', function(e) {
    if (!privacyCheck.checked) {
        e.preventDefault();
        alert('Пожалуйста, подтвердите согласие на обработку данных');
    }
});
