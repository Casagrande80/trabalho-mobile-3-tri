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
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Por favor, insira um email válido.', 'error');
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
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // Simular delay de rede
    setTimeout(() => {
        // Aqui normalmente você faria uma requisição para um servidor
        console.log('📧 Dados do formulário de contato:');
        console.log('Nome:', name);
        console.log('Email:', email);
        console.log('Assunto:', subject);
        console.log('Mensagem:', message);
        
        // Mostrar mensagem de sucesso
        showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        
        // Limpar formulário
        contactForm.reset();
        
        // Restaurar botão
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Função para mostrar mensagens
function showMessage(text, type) {
    // Remover mensagens anteriores
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Criar nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.padding = '15px';
    messageDiv.style.margin = '20px 0';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.fontWeight = '600';
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    }
    
    messageDiv.textContent = text;
    
    // Inserir antes do formulário
    contactForm.parentNode.insertBefore(messageDiv, contactForm);
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
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
    
    // Adicionar event listener ao formulário
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});