// API URL - JSON Server
const API_URL = 'http://localhost:3000/restaurants';

// Elementos DOM
const featuredRestaurants = document.getElementById('featured-restaurants');

// Função para carregar restaurantes em destaque
async function loadFeaturedRestaurants() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Erro ao carregar dados da API');
        }
        
        const restaurants = await response.json();
        
        // Filtrar apenas os restaurantes com 4+ estrelas para a página inicial
        const featured = restaurants.filter(rest => rest.rating >= 4.5);
        
        // Exibir no máximo 3 restaurantes em destaque
        displayRestaurants(featured.slice(0, 3));
    } catch (error) {
        console.error('Erro ao carregar restaurantes:', error);
        featuredRestaurants.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 40px;">
                <h3 style="color: var(--color-dark-red); margin-bottom: 15px;">Ops! Algo deu errado</h3>
                <p>Não foi possível carregar os restaurantes no momento.</p>
                <p style="font-size: 0.9rem; color: #666; margin-top: 10px;">
                    Verifique se o JSON Server está rodando: <code>json-server --watch db.json --port 3000</code>
                </p>
            </div>
        `;
        
        // Mostrar dados de exemplo
        displayExampleRestaurants();
    }
}

// Função para exibir restaurantes de exemplo (fallback)
function displayExampleRestaurants() {
    const exampleRestaurants = [
        {
            id: 1,
            name: "Madalosso",
            address: "Av. Manoel Ribas, 5875 - Santa Felicidade",
            phone: "(41) 3372-2121",
            rating: 4.5,
            cuisine: "Italiana",
            priceRange: "$$$"
        },
        {
            id: 2,
            name: "Batel Grill",
            address: "Av. do Batel, 1868 - Batel",
            phone: "(41) 3342-9086",
            rating: 4.8,
            cuisine: "Carnes",
            priceRange: "$$$$"
        },
        {
            id: 3,
            name: "Villa Massima",
            address: "R. José de Oliveira Franco, 550 - Tarumã",
            phone: "(41) 3379-4000",
            rating: 4.7,
            cuisine: "Italiana",
            priceRange: "$$$$"
        }
    ];
    
    displayRestaurants(exampleRestaurants);
}

// Função para exibir restaurantes
function displayRestaurants(restaurants) {
    featuredRestaurants.innerHTML = '';
    
    restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.classList.add('restaurant-card');
        
        restaurantCard.innerHTML = `
            <div class="restaurant-image" style="background-color: #ddd; display: flex; align-items: center; justify-content: center; color: #666;">
                <i class="fas fa-utensils" style="font-size: 3rem;"></i>
            </div>
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
                <a href="detalhes.html?id=${restaurant.id}" class="view-details">Ver Detalhes →</a>
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
    
    stars += ` <span style="color: #666; font-size: 0.9rem;">(${rating})</span>`;
    return stars;
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

// Menu mobile toggle
function setupMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }
}

// Inicializar a página
document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    
    // Carregar restaurantes em destaque
    if (featuredRestaurants) {
        loadFeaturedRestaurants();
    }
});