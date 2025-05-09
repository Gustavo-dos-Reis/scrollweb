document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.link-suave');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                rolarParaSecao(targetElement);
                atualizarLinkAtivo(this);
            }
        });
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = '#' + entry.target.id;
                const linkAtivo = document.querySelector(`.link-suave[href="${id}"]`);
                atualizarLinkAtivo(linkAtivo);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.secao').forEach(secao => {
        observer.observe(secao);
    });
    
    function rolarParaSecao(elemento) {
        const posicao = elemento.getBoundingClientRect().top + window.pageYOffset;
        const posicaoAjustada = posicao - 80; 
        
        window.scrollTo({
            top: posicaoAjustada,
            behavior: 'smooth'
        });
    }
    
    function atualizarLinkAtivo(link) {
        if (!link) return;
        
        document.querySelectorAll('.link-suave').forEach(l => {
            l.classList.remove('link-ativo');
        });
        
        link.classList.add('link-ativo');
    }
    
    const secaoInicial = document.querySelector('.secao');
    if (window.location.hash) {
        const linkInicial = document.querySelector(`.link-suave[href="${window.location.hash}"]`);
        atualizarLinkAtivo(linkInicial);
    } else if (secaoInicial) {
        const linkInicial = document.querySelector(`.link-suave[href="#${secaoInicial.id}"]`);
        atualizarLinkAtivo(linkInicial);
    }
});