// API URL
const API_URL = 'http://localhost:3000/restaurants';

// Elementos DOM
const allRestaurants = document.getElementById('all-restaurants');
const cuisineFilter = document.getElementById('cuisine-filter');
const priceFilter = document.getElementById('price-filter');
const ratingFilter = document.getElementById('rating-filter');

// Variáveis globais
let restaurantsData = [];
let filteredRestaurants = [];

// Função para carregar todos os restaurantes
async function loadAllRestaurants() {
    try {
        const response = await fetch(API_URL);
        restaurantsData = await response.json();
        filteredRestaurants = [...restaurantsData];
        
        displayAllRestaurants(filteredRestaurants);
        populateCuisineFilter(restaurantsData);
    } catch (error) {
        console.error('Erro ao carregar restaurantes:', error);
        allRestaurants.innerHTML = `
            <div class="error-message">
                <p>Desculpe, não foi possível carregar os restaurantes no momento.</p>
                <p>Verifique se o JSON Server está rodando na porta 3000.</p>
            </div>
        `;
    }
}

// Função para exibir todos os restaurantes
function displayAllRestaurants(restaurants) {
    allRestaurants.innerHTML = '';
    
    if (restaurants.length === 0) {
        allRestaurants.innerHTML = `
            <div class="no-results">
                <p>Nenhum restaurante encontrado com os filtros selecionados.</p>
            </div>
        `;
        return;
    }
    
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
                <p class="restaurant-cuisine">
                    <i class="fas fa-utensils"></i> ${restaurant.cuisine}
                </p>
                <p class="restaurant-price">
                    <i class="fas fa-tag"></i> ${getPriceRangeText(restaurant.priceRange)}
                </p>
                <p class="restaurant-address">
                    <i class="fas fa-map-marker-alt"></i> ${restaurant.address}
                </p>
                <p class="restaurant-contact">
                    <i class="fas fa-phone"></i> ${restaurant.phone}
                </p>
                <a href="detalhes.html?id=${restaurant.id}" class="view-details">Ver Detalhes</a>
            </div>
        `;
        
        allRestaurants.appendChild(restaurantCard);
    });
}

// Função para popular o filtro de culinária
function populateCuisineFilter(restaurants) {
    const cuisines = [...new Set(restaurants.map(r => r.cuisine))];
    
    cuisines.forEach(cuisine => {
        const option = document.createElement('option');
        option.value = cuisine.toLowerCase();
        option.textContent = cuisine;
        cuisineFilter.appendChild(option);
    });
}

// Função para converter range de preço em texto
function getPriceRangeText(priceRange) {
    const priceMap = {
        '$': 'Econômico',
        '$$': 'Moderado',
        '$$$': 'Caro',
        '$$$$': 'Premium'
    };
    
    return priceMap[priceRange] || priceRange;
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

// Função para aplicar filtros
function applyFilters() {
    const cuisineValue = cuisineFilter.value;
    const priceValue = priceFilter.value;
    const ratingValue = ratingFilter.value;
    
    filteredRestaurants = restaurantsData.filter(restaurant => {
        // Filtro de culinária
        if (cuisineValue && restaurant.cuisine.toLowerCase() !== cuisineValue) {
            return false;
        }
        
        // Filtro de preço
        if (priceValue && restaurant.priceRange !== priceValue) {
            return false;
        }
        
        // Filtro de avaliação
        if (ratingValue && restaurant.rating < parseFloat(ratingValue)) {
            return false;
        }
        
        return true;
    });
    
    displayAllRestaurants(filteredRestaurants);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Carregar todos os restaurantes
    if (allRestaurants) {
        loadAllRestaurants();
    }
    
    // Adicionar event listeners aos filtros
    if (cuisineFilter) {
        cuisineFilter.addEventListener('change', applyFilters);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', applyFilters);
    }
    
    if (ratingFilter) {
        ratingFilter.addEventListener('change', applyFilters);
    }
});