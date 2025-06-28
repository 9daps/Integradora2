document.addEventListener('DOMContentLoaded', () => {
    const dishDetailContent = document.getElementById('dishDetailContent');
    const dishNotFoundDiv = document.getElementById('dishNotFound');

    const dishPageImage = document.getElementById('dishPageImage');
    const dishPageName = document.getElementById('dishPageName');
    const dishPageDescription = document.getElementById('dishPageDescription');
    const dishPageBasePrice = document.getElementById('dishPageBasePrice');
    const dishPageExtrasSection = document.getElementById('dishPageExtrasSection').querySelector('.extras-list-container') || dishPageExtrasSection;
    const dishPageQuantityInput = document.getElementById('dishPageQuantity');
    const dishPageTotalPriceDisplay = document.getElementById('dishPageTotalPrice');
    const dishPageAddToCartButton = document.getElementById('dishPageAddToCartButton');
    const incrementButton = document.getElementById('btnIncrementar'); // Botón de incremento "+"
    const decrementButton = document.getElementById('btnDecrementar'); // Botón de decremento "-"

    let currentDishDetails = null;

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function loadDishDetails() {
        const dishId = getQueryParam('platillo');

        if (!dishId || !menuData || !menuData[dishId]) {
            console.error('Platillo no encontrado o datos no disponibles:', dishId);
            dishDetailContent.style.display = 'none';
            dishNotFoundDiv.style.display = 'block';
            return;
        }

        currentDishDetails = menuData[dishId];
        document.title = `${currentDishDetails.name} - Dinoraunt`;

        dishPageImage.src = currentDishDetails.image;
        dishPageImage.alt = currentDishDetails.name;
        dishPageName.textContent = currentDishDetails.name;
        dishPageDescription.textContent = currentDishDetails.description;

        const dishPageAdditionalInfo = document.getElementById('dishPageAdditionalInfo');
        if (dishPageAdditionalInfo && currentDishDetails.additionalInfo?.length > 0) {
            const ul = document.createElement('ul');
            currentDishDetails.additionalInfo.forEach(info => {
                const li = document.createElement('li');
                li.textContent = info;
                ul.appendChild(li);
            });
            dishPageAdditionalInfo.innerHTML = '';
            dishPageAdditionalInfo.appendChild(ul);
        }

        dishPageBasePrice.textContent = currentDishDetails.price.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN"
        });

        dishPageExtrasSection.innerHTML = '';
        if (currentDishDetails.extras?.length > 0) {
            currentDishDetails.extras.forEach((extra, index) => {
                const extraId = `dish-extra-${index}`;
                const extraDiv = document.createElement('div');
                extraDiv.classList.add('extra-item');

                const extraPriceFormatted = parseFloat(extra.price).toLocaleString("es-MX", {
                    style: "currency",
                    currency: "MXN"
                });

                extraDiv.innerHTML = `
                    <label>
                        <input type="checkbox" value="${extra.name}" data-price="${extra.price}" />
                        ${extra.name}
                        <span class="extra-price">+${extraPriceFormatted}</span>
                    </label>
                `;
                dishPageExtrasSection.appendChild(extraDiv);
            });
        } else {
            document.getElementById('dishPageExtrasSection').style.display = 'none';
        }

        dishPageQuantityInput.value = 1;
        updateTotalPrice();
        addEventListeners();
    }

    function updateTotalPrice() {
        if (!currentDishDetails) return;

        let total = currentDishDetails.price;
        const selectedExtras = dishPageExtrasSection.querySelectorAll('input[type="checkbox"]:checked');
        selectedExtras.forEach(checkbox => {
            total += parseFloat(checkbox.dataset.price);
        });

        let quantity = parseInt(dishPageQuantityInput.value) || 1;
        if (quantity < 1) {
            quantity = 1;
            dishPageQuantityInput.value = 1;
        }
        total *= quantity;

        dishPageTotalPriceDisplay.textContent = total.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN"
        });
    }

    function addEventListeners() {
        dishPageExtrasSection.addEventListener('change', (event) => {
            if (event.target.type === 'checkbox') {
                updateTotalPrice();
            }
        });

        // Event listeners para los botones de incremento y decremento
        incrementButton.addEventListener('click', () => {
            let current = parseInt(dishPageQuantityInput.value);
            let max = parseInt(dishPageQuantityInput.max);
            if (current < max) {
                dishPageQuantityInput.value = current + 1;
                updateTotalPrice();
            }
        });

        decrementButton.addEventListener('click', () => {
            let current = parseInt(dishPageQuantityInput.value);
            let min = parseInt(dishPageQuantityInput.min);
            if (current > min) {
                dishPageQuantityInput.value = current - 1;
                updateTotalPrice();
            }
        });

        dishPageAddToCartButton.addEventListener('click', () => {
            if (!currentDishDetails) return;

            const selectedExtrasList = [];
            dishPageExtrasSection.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
                selectedExtrasList.push({
                    name: cb.value,
                    price: parseFloat(cb.dataset.price)
                });
            });

            const quantity = parseInt(dishPageQuantityInput.value) || 1;

            const cartItem = {
                id: currentDishDetails.id,
                name: currentDishDetails.name,
                basePrice: currentDishDetails.price,
                quantity,
                selectedExtras: selectedExtrasList,
                totalPrice: parseFloat(dishPageTotalPriceDisplay.textContent.replace(/[^\d.-]+/g, "")),
                image: currentDishDetails.image
            };

            console.log('Agregado al carrito:', cartItem);
            alert(`"${cartItem.name}" (x${cartItem.quantity}) se agregó al carrito.\nTotal: ${cartItem.totalPrice.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN"
            })}`);
        });
    }

    loadDishDetails();
});
