// API URL - Vamos usar o JSON Server
const API_URL = 'http://localhost:3000/restaurants';

// Elementos DOM
const featuredRestaurants = document.getElementById('featured-restaurants');

// Função para carregar restaurantes em destaque
async function loadFeaturedRestaurants() {
    try {
        const response = await fetch(API_URL);
        const restaurants = await response.json();
        
        // Filtrar apenas os restaurantes com 4+ estrelas para a página inicial
        const featured = restaurants.filter(rest => rest.rating >= 4);
        
        // Exibir no máximo 3 restaurantes em destaque
        displayRestaurants(featured.slice(0, 3));
    } catch (error) {
        console.error('Erro ao carregar restaurantes:', error);
        featuredRestaurants.innerHTML = `
            <div class="error-message">
                <p>Desculpe, não foi possível carregar os restaurantes no momento.</p>
                <p>Verifique se o JSON Server está rodando na porta 3000.</p>
            </div>
        `;
    }
}

// Função para exibir restaurantes
function displayRestaurants(restaurants) {
    featuredRestaurants.innerHTML = '';
    
    restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.classList.add('restaurant-card');
        
        restaurantCard.innerHTML = `
            <div class="restaurant-image" style="background-image: url('${restaurant.image || 'assets/images/restaurant-placeholder.jpg'}')"></div>
            <div class="restaurant-info">
                <h3>${restaurant.name}</h3>
                <div class="stars">
                    ${generateStarRating(restaurant.rating)}
                </div>
                <p class="restaurant-address">
                    <i class="fas fa-map-marker-alt"></i> ${restaurant.address}
                </p>
                <p class="restaurant-contact">
                    <i class="fas fa-phone"></i> ${restaurant.phone}
                </p>
                <a href="detalhes.html?id=${restaurant.id}" class="view-details">Ver Detalhes</a>
            </div>
        `;
        
        featuredRestaurants.appendChild(restaurantCard);
    });
}

// Função para gerar estrelas de avaliação
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Menu mobile toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Carregar restaurantes em destaque
    if (featuredRestaurants) {
        loadFeaturedRestaurants();
    }
});