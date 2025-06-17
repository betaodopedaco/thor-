// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
  }, 1000);
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Header efeito scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
});

// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.querySelector('i').classList.toggle('fa-bars');
  navToggle.querySelector('i').classList.toggle('fa-times');
});

// Fecha menu mobile ao clicar nos links
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.querySelector('i').classList.remove('fa-times');
      navToggle.querySelector('i').classList.add('fa-bars');
    }
  });
});

// Carrinho de compras
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.querySelector('.cart-modal');
const overlay = document.querySelector('.overlay');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total-value');
const cartCount = document.querySelector('.cart-count');

let cart = [];

// Abrir/fechar carrinho
cartIcon.addEventListener('click', () => {
  cartModal.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', () => {
  closeCartModal();
});

overlay.addEventListener('click', () => {
  closeCartModal();
});

function closeCartModal() {
  cartModal.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Adicionar produtos ao carrinho
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const product = e.target.dataset;
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        img: product.img,
        quantity: 1
      });
    }
    
    updateCart();
    // Feedback visual
    button.textContent = 'Adicionado!';
    button.style.backgroundColor = '#28a745';
    setTimeout(() => {
      button.textContent = 'Comprar Agora';
      button.style.backgroundColor = '';
    }, 1500);
  });
});

// Atualizar carrinho
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  let count = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    count += item.quantity;
    
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</div>
        <button class="cart-item-remove" data-id="${item.id}">Remover</button>
      </div>
    `;
    cartItems.appendChild(cartItem);
  });
  
  cartTotal.textContent = `R$ ${total.toFixed(2)}`;
  cartCount.textContent = count;
  
  // Adicionar evento de remover
  document.querySelectorAll('.cart-item-remove').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      cart = cart.filter(item => item.id !== id);
      updateCart();
    });
  });
}

// Finalizar compra
document.querySelector('.cart-buttons .btn-primary').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  alert('Compra finalizada com sucesso! Obrigado por sua compra na Thor Store.');
  cart = [];
  updateCart();
  closeCartModal();
});

// Continuar comprando
document.querySelector('.cart-buttons .btn-secondary').addEventListener('click', () => {
  closeCartModal();
  document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
});

// Validação do formulário
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Simulação de envio
  alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
  contactForm.reset();
});

// Efeito parallax
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const hero = document.querySelector('#hero');
  
  if (hero) {
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
  }
});
