document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.left-sidebar input[type="checkbox"]');
    const cards = document.querySelectorAll('.product-card');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    function filterProducts() {
        // Получаем массив значений всех выбранных чекбоксов
        const activeFilters = Array.from(checkboxes)
            .filter(i => i.checked)
            .map(i => i.value);

        cards.forEach(card => {
            const cardType = card.getAttribute('data-type');
            
            // Если ничего не выбрано — показываем всё
            if (activeFilters.length === 0) {
                card.style.display = 'block';
            } 
            // Если тип карточки есть в списке выбранных фильтров — показываем
            else if (activeFilters.includes(cardType)) {
                card.style.display = 'block';
            } 
            // В остальных случаях скрываем
            else {
                card.style.display = 'none';
            }
        });
    }
});
