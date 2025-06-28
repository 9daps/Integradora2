const menuData = {
    "enmoladas-ricas": {
        id: "enmoladas-ricas",
        name: "Licuadora Ninja Profesional 1000W",
        description: "¡Lleva tu experiencia en la cocina al siguiente nivel con la Licuadora Ninja Profesional! Diseñada para ofrecer máxima potencia y rendimiento, esta licuadora es perfecta para preparar batidos, salsas, aderezos y mucho más.",
        price: 1749.00,
        image: "image/licuadora_ninja.jpg",
        extras: [
            {"name": "Rojo", "price": 10.00},
            {"name": "Blanco", "price": 100.00},
            {"name": "Naranja", "price": 105.00}
        ],
        additionalInfo: [
            "Potencia de 1000W para mezclar incluso los ingredientes más duros.",
            "Diseño profesional y fácil de usar.",
            "Ideal para familias o pequeños negocios.",
            "Incluye una jarra de gran capacidad para preparaciones grandes."
        ]
    },
    "mole-poblano": {
        id: "mole-poblano",
        name: "Refrigerador Samsung – Innovación y Frescura para tu Hogar",
        description: "Descubre la tecnología de vanguardia con los refrigeradores Samsung, diseñados para mantener tus alimentos frescos por más tiempo y optimizar el consumo de energía.",
        price: 26804.00,
        image: "image/Samsung_Refrigerador.jpeg",
        extras: [
            {"name": "Blanco", "price": 10.00},
            {"name": "Negro", "price": 100.00},
            {"name": "Amarillo", "price": 110.00}
        ],
        additionalInfo: [
            "Twin Cooling Plus™ – Mantiene la humedad óptima en el refrigerador y el congelador para conservar mejor los alimentos.",
            "SpaceMax Technology™ – Mayor capacidad de almacenamiento sin aumentar el tamaño exterior.",
            "FlexZone™ – Compartimento con control independiente para ajustar la temperatura según tus necesidades.",
            "Family Hub™ – Pantalla inteligente que te permite gestionar tu lista de compras, reproducir música y más.",
            "Diseño elegante y moderno – Disponible en acero inoxidable, negro y opciones personalizables Bespoke."
        ]
    },
    "carne-de-res": {
        id: "carne-de-res",
        name: "Cafetera Philips LatteGo – Café de Barista en Casa",
        description: "Disfruta de un café perfecto con la Cafetera Philips LatteGo, diseñada para ofrecer una experiencia de preparación sencilla y deliciosa.",
        price: 21942.00,
        image: "image/cafetera.jpeg",
        extras: [
            {"name": "Blanco", "price": 5.00},
            {"name": "Negro", "price": 100.00},
            {"name": "Rojo", "price": 105.00},
            {"name": "Naranja", "price": 120.00}
        ],
        additionalInfo: [
            "Sistema LatteGo™ – Espuma de leche suave y sedosa con solo tocar un botón.",
            "Molinillo 100% cerámico – Mayor durabilidad y mejor extracción del aroma de los granos.",
            "Pantalla táctil intuitiva – Personaliza tu café con facilidad.",
            "Filtro de agua AquaClean – Hasta 5000 tazas sin necesidad de descalcificar.",
            "Variedad de bebidas – Prepara espresso, cappuccino, americano y más con un solo botón."
        ]
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const platilloId = urlParams.get("platillo");

    if (menuData[platilloId]) {
        const platillo = menuData[platilloId];

        document.getElementById("dishPageName").textContent = platillo.name;
        document.getElementById("dishPageDescription").textContent = platillo.description;
        document.getElementById("dishPageBasePrice").textContent = platillo.price.toFixed(2);
        document.getElementById("dishPageImage").src = platillo.image;

        const dishPageExtrasSection = document.getElementById("dishPageExtrasSection");
        platillo.extras.forEach(extra => {
            const extraElement = document.createElement("div");
            extraElement.classList.add("extra-item");
            extraElement.innerHTML = `
                <label>
                    <input type="checkbox" class="extra-checkbox" data-price="${extra.price}" />
                    ${extra.name} (+${extra.price.toFixed(2)} MXN)
                </label>
            `;
            dishPageExtrasSection.appendChild(extraElement);
        });

        const dishPageAdditionalInfo = document.getElementById("dishPageAdditionalInfo");
        platillo.additionalInfo.forEach(info => {
            const infoElement = document.createElement("p");
            infoElement.textContent = info;
            dishPageAdditionalInfo.appendChild(infoElement);
        });

        const inputCantidad = document.getElementById("dishPageQuantity");
        const precioBaseElemento = document.getElementById("dishPageBasePrice");
        const precioTotalElemento = document.getElementById("dishPageTotalPrice");

        function actualizarPrecioTotal() {
            let cantidad = parseInt(inputCantidad.value);
            const precioBase = parseFloat(precioBaseElemento.textContent);
            let total = cantidad * precioBase;

            const extrasSeleccionados = document.querySelectorAll(".extra-checkbox:checked");
            extrasSeleccionados.forEach(extra => {
                total += parseFloat(extra.getAttribute("data-price"));
            });

            precioTotalElemento.textContent = total.toFixed(2);
        }

        inputCantidad.addEventListener("change", actualizarPrecioTotal);
        document.querySelectorAll(".extra-checkbox").forEach(checkbox => {
            checkbox.addEventListener("change", actualizarPrecioTotal);
        });

        actualizarPrecioTotal();
    } else {
        // Si no se encuentra el platillo, mostrar mensaje de error
        document.getElementById("dishNotFound").style.display = "block";
        document.getElementById("dishDetailContent").style.display = "none";
    }
});
