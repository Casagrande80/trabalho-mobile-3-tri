// Elementos DOM
const contactForm = document.getElementById('contactForm');

// Função para enviar formulário de contato
function handleContactFormSubmit(event) {
    event.preventDefault();
    
    // Obter valores do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validação simples
    if (!name || !email || !subject || !message) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }
    
    // Simular envio do formulário
    simulateFormSubmission(name, email, subject, message);
}

// Função para simular envio do formulário
function simulateFormSubmission(name, email, subject, message) {
    // Mostrar indicador de carregamento
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simular delay de rede
    setTimeout(() => {
        // Aqui normalmente você faria uma requisição para um servidor
        console.log('Dados do formulário:');
        console.log('Nome:', name);
        console.log('Email:', email);
        console.log('Assunto:', subject);
        console.log('Mensagem:', message);
        
        // Mostrar mensagem de sucesso
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        
        // Limpar formulário
        contactForm.reset();
        
        // Restaurar botão
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
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
    
    // Adicionar event listener ao formulário
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});