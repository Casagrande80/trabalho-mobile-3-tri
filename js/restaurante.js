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
        
        if (!response.ok) {
            throw new Error('Erro ao carregar dados da API');
        }
        
        restaurantsData = await response.json();
        filteredRestaurants = [...restaurantsData];
        
        displayAllRestaurants(filteredRestaurants);
        populateCuisineFilter(restaurantsData);
    } catch (error) {
        console.error('Erro ao carregar restaurantes:', error);
        allRestaurants.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 40px;">
                <h3 style="color: var(--color-dark-red); margin-bottom: 15px;">Ops! Algo deu errado</h3>
                <p>Não foi possível carregar os restaurantes no momento.</p>
                <p style="font-size: 0.9rem; color: #666; margin-top: 10px;">
                    Verifique se o JSON Server está rodando: <code>json-server --watch db.json --port 3000</code>
                </p>
            </div>
        `;
        
        // Mostrar dados de exemplo
        loadExampleRestaurants();
    }
}

// Função para carregar restaurantes de exemplo (fallback)
function loadExampleRestaurants() {
    restaurantsData = [
        {
            id: 1,
            name: "Madalosso",
            address: "Av. Manoel Ribas, 5875 - Santa Felicidade",
            phone: "(41) 3372-2121",
            rating: 4.5,
            cuisine: "Italiana",
            priceRange: "$$$",
            description: "Famoso restaurante de Santa Felicidade com massa fresca e ambiente familiar."
        },
        {
            id: 2,
            name: "Batel Grill",
            address: "Av. do Batel, 1868 - Batel",
            phone: "(41) 3342-9086",
            rating: 4.8,
            cuisine: "Carnes",
            priceRange: "$$$$",
            description: "Rodízio de carnes premium com buffet completo e ambiente sofisticado."
        },
        {
            id: 9,
            name: "Tragash - Villa Gastronômica",
            address: "R. Des. Westphalen, 112 - Centro",
            phone: "(41) 3223-2911",
            rating: 4.9,
            cuisine: "Internacional",
            priceRange: "$$$$",
            description: "Alta gastronomia em ambiente sofisticado."
        },
        {
            id: 10,
            name: "Margarita",
            address: "R. Buenos Aires, 246 - Batel",
            phone: "(41) 3223-7833",
            rating: 4.5,
            cuisine: "Mexicana",
            priceRange: "$$",
            description: "Autêntica culinária mexicana com tacos, burritos e margaritas artesanais."
        },
        {
            id: 14,
            name: "Le Bateau Rouge",
            address: "R. Visconde de Nácar, 1201 - Centro",
            phone: "(41) 3223-7762",
            rating: 4.7,
            cuisine: "Francesa",
            priceRange: "$$$$",
            description: "Culinária francesa sofisticada em ambiente intimista."
        },
        {
            id: 17,
            name: "Taj Bar",
            address: "Al. Presidente Taunay, 533 - Batel",
            phone: "(41) 3042-9292",
            rating: 4.4,
            cuisine: "Indiana",
            priceRange: "$$$",
            description: "Culinária indiana autêntica com curry, tandoori e naan tradicional."
        },
        {
            id: 20,
            name: "Vegan's Place",
            address: "R. Alferes Ângelo Sampaio, 2341 - Água Verde",
            phone: "(41) 3042-3434",
            rating: 4.4,
            cuisine: "Vegana",
            priceRange: "$$",
            description: "Culinária 100% vegetal com pratos criativos e saborosos."
        },
        {
            id: 23,
            name: "Biergarten",
            address: "R. Mateus Leme, 58 - Centro",
            phone: "(41) 3222-1818",
            rating: 4.2,
            cuisine: "Alemã",
            priceRange: "$$",
            description: "Culinária alemã com salsichas artesanais e cervejas especiais."
        },
        {
            id: 26,
            name: "Taypá - Comida Peruana",
            address: "R. Prof. Brandão, 612 - Batel",
            phone: "(41) 3044-7890",
            rating: 4.6,
            cuisine: "Peruana",
            priceRange: "$$$",
            description: "Ceviches, tiraditos e pratos típicos peruanos."
        },
        {
            id: 28,
            name: "Taste of Thailand",
            address: "R. Alferes Ângelo Sampaio, 1890 - Água Verde",
            phone: "(41) 3042-5566",
            rating: 4.5,
            cuisine: "Tailandesa",
            priceRange: "$$",
            description: "Culinária tailandesa autêntica com curry verde e pad thai."
        }
    ];
    
    filteredRestaurants = [...restaurantsData];
    displayAllRestaurants(filteredRestaurants);
    populateCuisineFilter(restaurantsData);
}

// Função para exibir todos os restaurantes
function displayAllRestaurants(restaurants) {
    allRestaurants.innerHTML = '';
    
    if (restaurants.length === 0) {
        allRestaurants.innerHTML = `
            <div class="no-results" style="text-align: center; padding: 40px;">
                <h3 style="color: var(--color-dark-red); margin-bottom: 15px;">Nenhum restaurante encontrado</h3>
                <p>Tente ajustar os filtros para ver mais resultados.</p>
            </div>
        `;
        return;
    }
    
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
        
        allRestaurants.appendChild(restaurantCard);
    });
}

// Função para popular o filtro de culinária (ATUALIZADA)
function populateCuisineFilter(restaurants) {
    const cuisines = [...new Set(restaurants.map(r => r.cuisine))];
    
    // Ordenar culinárias alfabeticamente
    cuisines.sort();
    
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
    
    stars += ` <span style="color: #666; font-size: 0.9rem;">(${rating})</span>`;
    return stars;
}

// Função para aplicar filtros
function applyFilters() {
    const cuisineValue = cuisineFilter.value;
    const priceValue = priceFilter.value;
    const ratingValue = ratingFilter.value;
    
    filteredRestaurants = restaurantsData.filter(restaurant => {
        // Filtro de culinária (case insensitive)
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