// API URL - JSON Server
const API_URL = 'http://localhost:3000/restaurants';

// Elementos DOM
const featuredRestaurants = document.getElementById('featured-restaurants');

// Função para carregar restaurantes em destaque
async function loadFeaturedRestaurants() {
    console.log('🚀 Iniciando carregamento de restaurantes...');
    
    try {
        const response = await fetch(API_URL);
        console.log('📡 Resposta da API:', response.status);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const restaurants = await response.json();
        console.log('✅ Restaurantes carregados:', restaurants.length);
        
        // DEBUG: Mostrar todos os restaurantes no console
        restaurants.forEach((rest, index) => {
            console.log(`${index + 1}. ${rest.name} - ${rest.cuisine} - ${rest.rating}`);
        });
        
        // MOSTRAR MAIS RESTAURANTES - REMOVER FILTRO RESTRITIVO
        const featured = restaurants.slice(0, 12); // Mostra os primeiros 12
        
        console.log('🎯 Exibindo:', featured.length, 'restaurantes');
        displayRestaurants(featured);
        
    } catch (error) {
        console.error('❌ Erro ao carregar restaurantes:', error);
        featuredRestaurants.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 40px; background: #ffe6e6; border-radius: 10px;">
                <h3 style="color: var(--color-dark-red); margin-bottom: 15px;">⚠️ Ops! Algo deu errado</h3>
                <p><strong>Erro:</strong> ${error.message}</p>
                <p style="font-size: 0.9rem; color: #666; margin-top: 10px;">
                    Verifique se o JSON Server está rodando:<br>
                    <code style="background: #f5f5f5; padding: 5px; border-radius: 3px;">json-server --watch db.json --port 3000</code>
                </p>
                <button onclick="location.reload()" class="btn" style="margin-top: 15px;">🔄 Tentar Novamente</button>
            </div>
        `;
        
        // Mostrar dados de exemplo como fallback
        displayExampleRestaurants();
    }
}

// Função para obter URL da imagem
function getRestaurantImage(restaurant) {
    const cuisineImages = {
        'italiana': 'pasta',
        'carnes': 'steak',
        'japonesa': 'sushi',
        'brasileira': 'brazilian-food',
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
    
    const cuisineKey = restaurant.cuisine.toLowerCase();
    const searchTerm = cuisineImages[cuisineKey] || 'restaurant';
    
    return `https://source.unsplash.com/random/400x300/?${searchTerm},food&sig=${restaurant.id}`;
}

// Função para exibir restaurantes
function displayRestaurants(restaurants) {
    console.log('🎨 Renderizando restaurantes na página...');
    featuredRestaurants.innerHTML = '';
    
    if (restaurants.length === 0) {
        featuredRestaurants.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <p>Nenhum restaurante encontrado.</p>
            </div>
        `;
        return;
    }
    
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
    
    console.log('✅ Renderização concluída!');
}

// Função para exibir restaurantes de exemplo (fallback)
function displayExampleRestaurants() {
    console.log('🔄 Carregando restaurantes de exemplo...');
    
    const exampleRestaurants = [];
    
    // Gerar 12 restaurantes de exemplo
    for (let i = 1; i <= 12; i++) {
        exampleRestaurants.push({
            id: i,
            name: `Restaurante Exemplo ${i}`,
            address: `Endereço exemplo ${i}, Curitiba - PR`,
            phone: "(41) 9999-999" + i,
            rating: 4.0 + (i * 0.1),
            cuisine: ["Italiana", "Carnes", "Japonesa", "Brasileira"][i % 4],
            priceRange: ["$", "$$", "$$$", "$$$$"][i % 4]
        });
    }
    
    displayRestaurants(exampleRestaurants);
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
    console.log('📄 Página carregada - Iniciando aplicação...');
    setupMobileMenu();
    
    if (featuredRestaurants) {
        loadFeaturedRestaurants();
    }
});