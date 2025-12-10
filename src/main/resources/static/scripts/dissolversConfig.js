// Конфигурация для каждой модели (цены базовые, опции - доступные значения)
const config = {
    model65: {
        options: {
            power: [1.5, 2.2, 3],       // кВт
            cutter: [100, 150, 200]     // мм
        },
        basePrice: 50000 // Базовая цена этой модели
    },
    model1000: {
        options: {
            power: [7.5, 11, 15],
            cutter: [300, 400, 500]
        },
        basePrice: 200000
    },
    model1500: {
        options: {
            power: [18.5, 22, 30],
            cutter: [500, 600, 700]
        },
        basePrice: 450000
    }
};

// Функция обновления выпадающих списков при смене модели
function updateOptions() {
    const typeSelect = document.getElementById('type-select');
    const selectedType = typeSelect.value;
    const currentConfig = config[selectedType];

    // Очищаем и заполняем селекты новыми опциями
    fillSelect('power-select', currentConfig.options.power, ' кВт');
    fillSelect('cutter-select', currentConfig.options.cutter, ' мм');
}

// Вспомогательная функция для заполнения селектов
function fillSelect(selectId, optionsArray, unit) {
    const select = document.getElementById(selectId);
    select.innerHTML = ''; // Очистка

    optionsArray.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        option.textContent = optionValue + unit;
        select.appendChild(option);
    });
}

// Функция расчета итоговой цены
function calculatePrice() {
    const type = document.getElementById('type-select').value;
    const power = parseFloat(document.getElementById('power-select').value);
    const cutter = parseFloat(document.getElementById('cutter-select').value);

    // !!! Вставьте сюда свою ЛОГИКУ РАСЧЕТА ЦЕНЫ !!!
    // Сейчас используется упрощенный пример расчета:
    let totalPrice = config[type].basePrice + (power * 1000) + (cutter * 50); 
    // Вам нужно будет использовать свои таблицы цен

    document.getElementById('final-price').textContent = totalPrice.toLocaleString();
}

function submitApplication() {
    const type = document.getElementById('type-select').options[document.getElementById('type-select').selectedIndex].text;
    const power = document.getElementById('power-select').value;
    const cutter = document.getElementById('cutter-select').value;
    const price = document.getElementById('final-price').textContent;

    alert(`Ваша заявка:\nМодель: ${type}\nМощность: ${power} кВт\nФреза: ${cutter} мм\nЦена: ${price} руб.`);
    // AJAX запрос на сервер Spring Boot для отправки email
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateOptions(); // Сначала заполняем опции для первой модели
    calculatePrice(); // Потом считаем цену
});
