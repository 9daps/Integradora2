document.addEventListener("DOMContentLoaded", () => {
  const authArea = document.getElementById("authArea");
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo")); // <-- clave correcta

  if (usuario) {
    // Usuario autenticado
    authArea.innerHTML = `
      <div class="user-dropdown">
        <span class="me-4">Hola, ${usuario.nombre} ${usuario.app || ''}</span>
        <button id="logoutBtn" class="logout-btn btn btn-primary">Cerrar sesión</button>
      </div>
    `;

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo"); // <-- clave correcta
      window.location.href = "index.html"; // <-- redirección correcta
    });
  } else {
    // No autenticado
    authArea.innerHTML = `
      <a href="Login.html" class="btn btn-primary">Iniciar sesión</a>
    `;
  }
});
