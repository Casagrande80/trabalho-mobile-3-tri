// API URL
const API_URL = 'http://localhost:3000/restaurants';

// Elementos DOM
const restaurantDetailContent = document.getElementById('restaurant-detail-content');
const reviewsContent = document.getElementById('reviews-content');

// Função para carregar detalhes do restaurante
async function loadRestaurantDetails() {
    try {
        // Obter ID do restaurante da URL
        const urlParams = new URLSearchParams(window.location.search);
        const restaurantId = urlParams.get('id');
        
        if (!restaurantId) {
            throw new Error('ID do restaurante não especificado na URL');
        }
        
        // Buscar dados do restaurante
        const response = await fetch(`${API_URL}/${restaurantId}`);
        const restaurant = await response.json();
        
        // Exibir detalhes do restaurante
        displayRestaurantDetails(restaurant);
        
        // Carregar avaliações (simuladas)
        loadReviews(restaurant);
    } catch (error) {
        console.error('Erro ao carregar detalhes do restaurante:', error);
        restaurantDetailContent.innerHTML = `
            <div class="error-message">
                <p>Desculpe, não foi possível carregar os detalhes do restaurante.</p>
                <p>Verifique se o JSON Server está rodando na porta 3000.</p>
            </div>
        `;
    }
}

// Função para exibir detalhes do restaurante
function displayRestaurantDetails(restaurant) {
    restaurantDetailContent.innerHTML = `
        <div class="restaurant-detail">
            <div class="restaurant-header" style="background-image: url('${restaurant.image || 'assets/images/restaurant-placeholder.jpg'}')">
                <div class="restaurant-header-overlay">
                    <h2>${restaurant.name}</h2>
                    <div class="stars">
                        ${generateStarRating(restaurant.rating)}
                    </div>
                </div>
            </div>
            <div class="restaurant-detail-content">
                <div class="restaurant-meta">
                    <div class="meta-item">
                        <i class="fas fa-utensils"></i>
                        <span>${restaurant.cuisine}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-tag"></i>
                        <span>${getPriceRangeText(restaurant.priceRange)}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${restaurant.hours}</span>
                    </div>
                </div>
                
                <div class="restaurant-description">
                    <p>${restaurant.description}</p>
                </div>
                
                <div class="restaurant-contact-info">
                    <h3>Informações de Contato</h3>
                    <p><i class="fas fa-map-marker-alt"></i> ${restaurant.address}</p>
                    <p><i class="fas fa-phone"></i> ${restaurant.phone}</p>
                </div>
            </div>
        </div>
    `;
}

// Função para carregar avaliações (simuladas)
function loadReviews(restaurant) {
    // Avaliações simuladas - em um sistema real, isso viria de uma API
    const reviews = [
        {
            author: "Carlos Silva",
            date: "15/08/2023",
            rating: 4.5,
            comment: "Ambiente agradável e comida deliciosa. O atendimento foi excelente!"
        },
        {
            author: "Marina Oliveira",
            date: "10/08/2023",
            rating: 5,
            comment: "Melhor restaurante da cidade! Comida incrível e preço justo."
        },
        {
            author: "Ricardo Santos",
            date: "05/08/2023",
            rating: 4,
            comment: "Gostei muito, mas a espera foi um pouco longa. A comida compensou."
        }
    ];
    
    displayReviews(reviews);
}

// Função para exibir avaliações
function displayReviews(reviews) {
    reviewsContent.innerHTML = '';
    
    reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card');
        
        reviewCard.innerHTML = `
            <div class="review-header">
                <div class="review-author">${review.author}</div>
                <div class="review-date">${review.date}</div>
            </div>
            <div class="stars">
                ${generateStarRating(review.rating)}
            </div>
            <div class="review-comment">
                <p>${review.comment}</p>
            </div>
        `;
        
        reviewsContent.appendChild(reviewCard);
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

// Inicializar a página
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Carregar detalhes do restaurante
    if (restaurantDetailContent) {
        loadRestaurantDetails();
    }
});