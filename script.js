// Smooth Scroll para links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Calcula o deslocamento para considerar o header fixo
            const headerHeight = document.querySelector('header').offsetHeight;
            const offsetTop = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) { // Adiciona classe após 50px de rolagem
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Toggle Nav Menu for Mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) { // Garante que os elementos existem
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Alterna os ícones Font Awesome
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // Ícone de fechar (X)
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars'); // Ícone de menu (hambúrguer)
        }
    });

    // Close menu when a link is clicked (for mobile)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) { // Garante que o preloader existe
        preloader.style.opacity = '0'; // Começa a transição de opacidade
        // Espera a transição terminar para remover o elemento
        preloader.addEventListener('transitionend', () => {
            preloader.style.visibility = 'hidden';
            preloader.style.display = 'none'; // Remove o elemento do fluxo do documento
        }, { once: true }); // Executa o listener apenas uma vez
    }
});
