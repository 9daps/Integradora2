document.getElementById('loginTab').addEventListener('click', () => {
  setActiveTab('login');
});
document.getElementById('registerTab').addEventListener('click', () => {
  setActiveTab('register');
});

function setActiveTab(tab) {
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (tab === 'login') {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
  } else {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
  }
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value;
  const pass = document.getElementById('loginPass').value;
  const role = document.getElementById('loginRole').value;
  console.log(`Intentando iniciar sesión como ${role}: ${user} - ${pass}`);
  alert(`Login de ${role}: ${user}`);
  // Aquí puedes hacer la llamada a tu API REST
});

document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const user = document.getElementById('regUser').value;
  const pass = document.getElementById('regPass').value;
  console.log(`Registrando: ${name} - ${email} - ${user}`);
  alert(`Registro completado para ${name}`);
  // Aquí puedes hacer la llamada a tu API REST para registrar
});
