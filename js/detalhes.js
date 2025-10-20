// API URL
const API_URL = 'http://localhost:3000/restaurants';

// Elementos DOM
const restaurantDetailContent = document.getElementById('restaurant-detail-content');
const reviewsContent = document.getElementById('reviews-content');

// Dados de exemplo para fallback
const exampleRestaurants = {
    1: {
        id: 1,
        name: "Madalosso",
        address: "Av. Manoel Ribas, 5875 - Santa Felicidade",
        phone: "(41) 3372-2121",
        rating: 4.5,
        cuisine: "Italiana",
        priceRange: "$$$",
        hours: "11h30 às 15h30 | 18h30 às 23h",
        description: "O famoso restaurante de Santa Felicidade, conhecido por sua massa fresca e ambiente familiar. Fundado em 1963, é um dos maiores restaurantes da América Latina, servindo deliciosos pratos da culinária italiana em um ambiente acolhedor e tradicional."
    },
    2: {
        id: 2,
        name: "Batel Grill",
        address: "Av. do Batel, 1868 - Batel",
        phone: "(41) 3342-9086",
        rating: 4.8,
        cuisine: "Carnes",
        priceRange: "$$$$",
        hours: "11h30 às 15h | 18h às 23h",
        description: "Rodízio de carnes premium com buffet completo e ambiente sofisticado. Oferece cortes especiais selecionados, preparados com técnicas especiais e servidos à mesa por habilidosos passadores. Ambiente elegante perfeito para jantares especiais."
    },
    3: {
        id: 3,
        name: "Villa Massima",
        address: "R. José de Oliveira Franco, 550 - Tarumã",
        phone: "(41) 3379-4000",
        rating: 4.7,
        cuisine: "Italiana",
        priceRange: "$$$$",
        hours: "19h às 23h",
        description: "Culinária italiana autêntica em ambiente elegante e requintado. Chefes especializados preparam pratos tradicionais das diversas regiões da Itália, com ingredientes importados e receitas familiares centenárias. Excelente carta de vinhos."
    },
    4: {
        id: 4,
        name: "Manu",
        address: "R. Presidente Taunay, 795 - Centro",
        phone: "(41) 3223-3365",
        rating: 4.6,
        cuisine: "Brasileira Contemporânea",
        priceRange: "$$$",
        hours: "12h às 15h | 19h às 23h",
        description: "Culinária contemporânea com toques brasileiros em ambiente descontraído. Menu sazonal que valoriza ingredientes locais e orgânicos, com apresentação impecável e sabores surpreendentes. Conceito que mistura tradição e inovação."
    },
    5: {
        id: 5,
        name: "Cantina do Délio",
        address: "R. João Negrão, 733 - Rebouças",
        phone: "(41) 3222-4129",
        rating: 4.4,
        cuisine: "Italiana",
        priceRange: "$$",
        hours: "11h30 às 14h30 | 18h30 às 23h",
        description: "Cantina italiana tradicional com receitas caseiras e ambiente acolhedor. Fundada em 1978, mantém as receitas originais da família, com massas frescas feitas diariamente e molhos que cozinham lentamente por horas. Atmosfera familiar e preços acessíveis."
    }
};

// Função para carregar detalhes do restaurante
async function loadRestaurantDetails() {
    try {
        // Obter ID do restaurante da URL
        const urlParams = new URLSearchParams(window.location.search);
        const restaurantId = urlParams.get('id');
        
        if (!restaurantId) {
            throw new Error('ID do restaurante não especificado na URL');
        }
        
        // Tentar buscar dados da API
        let restaurant;
        try {
            const response = await fetch(`${API_URL}/${restaurantId}`);
            if (response.ok) {
                restaurant = await response.json();
            } else {
                throw new Error('API não disponível');
            }
        } catch (apiError) {
            // Usar dados de exemplo se a API não estiver disponível
            console.log('API não disponível, usando dados de exemplo');
            restaurant = exampleRestaurants[restaurantId];
            
            if (!restaurant) {
                throw new Error('Restaurante não encontrado');
            }
        }
        
        // Exibir detalhes do restaurante
        displayRestaurantDetails(restaurant);
        
        // Carregar avaliações
        loadReviews(restaurant);
        
    } catch (error) {
        console.error('Erro ao carregar detalhes do restaurante:', error);
        restaurantDetailContent.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 40px;">
                <h3 style="color: var(--color-dark-red); margin-bottom: 15px;">Restaurante não encontrado</h3>
                <p>O restaurante solicitado não pôde ser carregado.</p>
                <a href="restaurantes.html" class="btn" style="margin-top: 20px;">Voltar para Restaurantes</a>
            </div>
        `;
    }
}

// Função para exibir detalhes do restaurante
function displayRestaurantDetails(restaurant) {
    restaurantDetailContent.innerHTML = `
        <div class="restaurant-detail">
            <div class="restaurant-header" style="background-color: #ddd; display: flex; align-items: center; justify-content: center; color: #666;">
                <i class="fas fa-utensils" style="font-size: 4rem;"></i>
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
                    <div class="meta-item">
                        <i class="fas fa-star"></i>
                        <span>${restaurant.rating}/5</span>
                    </div>
                </div>
                
                <div class="restaurant-description">
                    <p>${restaurant.description}</p>
                </div>
                
                <div class="restaurant-contact-info">
                    <h3>Informações de Contato</h3>
                    <p><i class="fas fa-map-marker-alt"></i> <strong>Endereço:</strong> ${restaurant.address}</p>
                    <p><i class="fas fa-phone"></i> <strong>Telefone:</strong> ${restaurant.phone}</p>
                </div>
            </div>
        </div>
    `;
}

// Função para carregar avaliações (simuladas)
function loadReviews(restaurant) {
    // Avaliações simuladas
    const reviews = [
        {
            author: "Ana Silva",
            date: "15/08/2024",
            rating: restaurant.rating - 0.3 + (Math.random() * 0.6),
            comment: "Ambiente muito agradável e comida deliciosa. Recomendo!"
        },
        {
            author: "Carlos Oliveira",
            date: "10/08/2024",
            rating: restaurant.rating - 0.2 + (Math.random() * 0.4),
            comment: "Experiência incrível! Atendimento excelente e pratos bem preparados."
        },
        {
            author: "Marina Santos",
            date: "05/08/2024",
            rating: restaurant.rating - 0.1 + (Math.random() * 0.2),
            comment: "Gostei muito do lugar. Voltarei com certeza!"
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
    
    stars += ` <span style="color: #666; font-size: 0.9rem;">(${rating.toFixed(1)})</span>`;
    return stars;
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
    
    // Carregar detalhes do restaurante
    if (restaurantDetailContent) {
        loadRestaurantDetails();
    }
});