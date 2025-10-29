const API_URL = 'http://localhost:3000/restaurants';

// Elementos DOM
const featuredRestaurants = document.getElementById('featured-restaurants');

// Mapeamento de culinárias para imagens do Unsplash
const cuisineImages = {
    'italiana': 'pasta',
    'carnes': 'steak',
    'japonesa': 'sushi',
    'brasileira': 'brazilian-food',
    'brasileira contemporânea': 'brazilian-food',
    'francesa': 'french-food',
    'mexicana': 'tacos',
    'indiana': 'curry',
    'vegana': 'vegan-food',
    'alemã': 'german-food',
    'peruana': 'ceviche',
    'tailandesa': 'thai-food',
    'frutos do mar': 'seafood',
    'hambúrguer': 'burger',
    'internacional': 'fine-dining',
    'café': 'coffee'
};

// Função para carregar restaurantes em destaque
async function loadFeaturedRestaurants() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Erro ao carregar dados da API');
        }
        
        const restaurants = await response.json();
        
        console.log('Total de restaurantes carregados:', restaurants.length); // Debug
        
        // MOSTRAR TODOS OS RESTAURANTES (remover filtro restritivo)
        const featured = restaurants; // Remove o filtro de rating
        
        // Exibir todos os restaurantes (ou limitar a 12 para não sobrecarregar)
        displayRestaurants(featured.slice(0, 12)); // Mostra os primeiros 12
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

// Função para obter URL da imagem baseada na culinária
function getRestaurantImage(restaurant) {
    const cuisineKey = restaurant.cuisine.toLowerCase();
    const searchTerm = cuisineImages[cuisineKey] || 'restaurant';
    
    // Gera uma URL única baseada no ID para evitar imagens repetidas
    return `https://source.unsplash.com/random/400x300/?${searchTerm},food,restaurant&sig=${restaurant.id}`;
}

// Função para exibir restaurantes
function displayRestaurants(restaurants) {
    featuredRestaurants.innerHTML = '';
    
    console.log('Exibindo restaurantes:', restaurants.length); // Debug
    
    restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.classList.add('restaurant-card');
        
        const imageUrl = getRestaurantImage(restaurant);
        
        restaurantCard.innerHTML = `
            <div class="restaurant-image" style="background-image: url('${imageUrl}')">
                <div class="image-overlay"></div>
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
                    <i class="fas fa-map-marker-alt"></i> ${restaurant.address.split(',')[0]}
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

// Resto do código permanece igual...
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
            id: 9,
            name: "Tragash - Villa Gastronômica",
            address: "R. Des. Westphalen, 112 - Centro",
            phone: "(41) 3223-2911",
            rating: 4.9,
            cuisine: "Internacional",
            priceRange: "$$$$"
        }
    ];
    
    displayRestaurants(exampleRestaurants);
}

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

function getPriceRangeText(priceRange) {
    const priceMap = {
        '$': 'Econômico',
        '$$': 'Moderado',
        '$$$': 'Caro',
        '$$$$': 'Premium'
    };
    
    return priceMap[priceRange] || priceRange;
}

function setupMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
        
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    
    if (featuredRestaurants) {
        loadFeaturedRestaurants();
    }
});