const $anhoActual = document.getElementById('anhoActual');
const $body = document.getElementById('body');
const $listaNav = document.querySelectorAll('.navegacionUl a[href^="#"]');

/* cambio de visualizacion*/
window.addEventListener('scroll', ()=>{
   $body.classList.toggle('scroll', window.scrollY > 20)
 })

//Actualizar Año	
$anhoActual.innerHTML = new Date().getFullYear();

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