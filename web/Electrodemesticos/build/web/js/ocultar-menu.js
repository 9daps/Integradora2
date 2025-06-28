console.log("¿authArea existe?", document.getElementById("authArea"));

document.addEventListener('DOMContentLoaded', function () {
    // Menú hamburguesa para pantallas pequeñas
    const toggleBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Área de autenticación (login o usuario activo)
    const authArea = document.getElementById("authArea");
    const usuarioJSON = localStorage.getItem("usuarioActivo");

    if (authArea) {
        if (usuarioJSON) {
            const usuario = JSON.parse(usuarioJSON);
            const nombreCompleto = `${usuario.nombre} ${usuario.app || ''}`.trim();

            console.log("Usuario:", usuario);
            console.log("Nombre completo:", nombreCompleto);

            authArea.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-primary btn-outline-light dropdown-toggle" type="button" id="userDropdown"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        ${nombreCompleto} <i class="fa-solid fa-user ms-2"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end " aria-labelledby="userDropdown">
                        <li><a class="dropdown-item" href="#">Rol: ${usuario.rol}</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" id="cerrarSesion">Cerrar sesión</a></li>
                    </ul>
                </div>
            `;

            document.getElementById("cerrarSesion").addEventListener("click", () => {
                localStorage.removeItem("usuarioActivo");
                location.reload();
            });
        } else {
            authArea.innerHTML = `
  <div class="dropdown">
    <button class="btn btn-outline-light dropdown-toggle" type="button" id="authDropdown"
        data-bs-toggle="dropdown" aria-expanded="false">
        Iniciar Sesión
    </button>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="authDropdown">
        <li><a class="dropdown-item" href="Login.html">Iniciar Sesión</a></li>
        <li><a class="dropdown-item" href="Login.html">Registrarse</a></li>
    </ul>
  </div>
`;

        }
    }

    // Inicializar Swiper en cada carrusel .product-carousel
    document.querySelectorAll('.product-carousel').forEach(carousel => {
        new Swiper(carousel, {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: carousel.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: carousel.querySelector('.swiper-button-next'),
                prevEl: carousel.querySelector('.swiper-button-prev'),
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            },
        });
    });
});
