document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  const cardTitle = document.getElementById("card-title");
  const footerText = document.getElementById("form-footer-text");

  let esLogin = true;

  function renderLogin() {
    cardTitle.textContent = "Iniciar Sesión";
    form.innerHTML = `
      <label for="usuario">Usuario o Correo:</label>
      <input type="text" id="usuario" name="usuario" required />

      <label for="contrasenia">Contraseña:</label>
      <input type="password" id="contrasenia" name="contrasenia" required />

      <button type="submit">Entrar</button>
    `;
    footerText.innerHTML = '¿No tienes cuenta? <a id="toggle-form">Registrarse</a>';
  }

  function renderRegistro() {
    cardTitle.textContent = "Registrar Nuevo Usuario";
    form.innerHTML = `
      <label for="userName">Usuario:</label>
      <input type="text" id="userName" name="userName" required />

      <label for="correo">Correo:</label>
      <input type="email" id="correo" name="correo" required />

      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre" required />

      <label for="app">Apellido Paterno:</label>
      <input type="text" id="app" name="app" required />

      <label for="apm">Apellido Materno:</label>
      <input type="text" id="apm" name="apm" required />

      <label for="numero">Teléfono:</label>
      <input type="tel" id="numero" name="numero" pattern="[0-9]{10}" required />

      <label for="contrasenia">Contraseña:</label>
      <input type="password" id="contrasenia" name="contrasenia" required />

      <button type="submit">Registrar</button>
    `;
    footerText.innerHTML = '¿Ya tienes cuenta? <a id="toggle-form">Iniciar sesión</a>';
  }

  footerText.addEventListener("click", function (e) {
    if (e.target.id === "toggle-form") {
      e.preventDefault();
      esLogin = !esLogin;
      esLogin ? renderLogin() : renderRegistro();
    }
  });

  renderLogin();

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (esLogin) {
      // === INICIO DE SESIÓN ===
      const usuario = form.usuario.value.trim();
      const contrasenia = form.contrasenia.value.trim();

      try {
        const formData = new URLSearchParams();
        formData.append("nombre", usuario);
        formData.append("contrasenia", contrasenia);

        const response = await fetch("http://localhost:8080/Electrodomesticos/api/usuario/login", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
        });

        if (response.ok) {
          const data = await response.json();

          // Guardar en localStorage
          localStorage.setItem("usuarioActivo", JSON.stringify(data));

          alert(`Bienvenido ${data.nombre} ${data.app} ${data.apm}`);

          // Redirección según rol
          if (data.rol && data.rol.toLowerCase() === "empleado") {
            const opcion = confirm("¿Deseas ingresar como Cliente? (Aceptar) o Empleado? (Cancelar)");
            if (opcion) window.location.href = "index.html";
            else window.location.href = "empleados.html";
          } else {
            window.location.href = "index.html";
          }

        } else {
          alert("Usuario o contraseña incorrectos.");
        }
      } catch (error) {
        alert("Error al conectarse con el servidor.");
        console.error(error);
      }
    } else {
      // === REGISTRO DE USUARIO ===
      const userName = form.userName.value.trim();
      const correo = form.correo.value.trim();
      const nombre = form.nombre.value.trim();
      const app = form.app.value.trim();
      const apm = form.apm.value.trim();
      const numero = form.numero.value.trim();
      const contrasenia = form.contrasenia.value.trim();

      try {
        const formData = new URLSearchParams();
        formData.append("userName", userName);
        formData.append("correo", correo);
        formData.append("nombre", nombre);
        formData.append("app", app);
        formData.append("apm", apm);
        formData.append("numero", numero);
        formData.append("contrasenia", contrasenia);

        const response = await fetch("http://localhost:8080/Electrodomesticos/api/usuario/insertar", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
        });

        if (response.ok) {
          alert("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
          esLogin = true;
          renderLogin();
        } else {
          const error = await response.json();
          alert("Error al registrar: " + (error.error || "Desconocido"));
        }
      } catch (error) {
        alert("Error al conectarse con el servidor.");
        console.error(error);
      }
    }
  });
});
