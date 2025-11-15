const $anhoActual = document.getElementById('anhoActual');
const $body = document.getElementById('body');
const $listaNav = document.querySelectorAll('.navegacionUl a[href^="#"]');
const $btnDarkMode = document.getElementById('botonModoOscuro');


/* cambio de visualizacion*/
window.addEventListener('scroll', ()=>{
   $body.classList.toggle('scroll', window.scrollY > 20)
 })

//Actualizar Año	
$anhoActual.innerHTML = new Date().getFullYear();

const temaGuardado = localStorage.getItem("theme");

/* modo oscuro*/
const modClaro =()=>{
	localStorage.setItem("theme", "light")
	$btnDarkMode.classList.add("fa-regular")
	$btnDarkMode.classList.add("fa-moon")
	$btnDarkMode.classList.remove("fa-solid")
	$btnDarkMode.classList.remove("fa-sun")
	$body.classList.remove("dark")
}
const modOscuro =()=>{
	localStorage.setItem("theme", "dark")
	$btnDarkMode.classList.remove("fa-regular")
	$btnDarkMode.classList.remove("fa-moon")
	$btnDarkMode.classList.add("fa-solid")
	$btnDarkMode.classList.add("fa-sun")
	$body.classList.add("dark")
}

// Recordar preferencia de modo
if (temaGuardado === "dark") {
  modOscuro();
} else if (temaGuardado === "light") {
  modClaro();
} else {
  // Si no hay preferencia guardada, usar la del sistema
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    modOscuro();
  } else {
    modClaro();
  }
}
// Escuchar cambios del sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {e.matches ? modOscuro() : modClaro();});
// Alternar manualmente
$btnDarkMode.addEventListener('click', ()=> {if($body.classList.contains("dark")){modClaro()}else{ modOscuro()}})

/*barra navegacion*/
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach(entry => {
			const id = entry.target.getAttribute("id");
			const menuLink = document.querySelector(`.navegacionUl a[href="#${id}"]`);
			
			if (entry.isIntersecting) {
				menuLink.classList.add("mostrar");
			}
			else {
					menuLink.classList.remove("mostrar");
			}
		})
	},
    { rootMargin: "-30% 0px -70% 0px" }
);
$listaNav.forEach(menuLink => {
	const hash = menuLink.getAttribute("href");
	const target = document.querySelector(hash);
	if (target) {
		observer.observe(target);
	}
});