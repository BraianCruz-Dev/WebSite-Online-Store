function ToggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburguer-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
};

// 1. Pega o elemento input de seleção de arquivos (onde o usuário clica)
const fotoInput = document.getElementById('foto-input');

// 2. Pega o contêiner onde as fotos serão exibidas
const galeria = document.getElementById('galeria-fotos');

// 3. Adiciona um "ouvinte de eventos" para detectar quando o usuário seleciona arquivos
fotoInput.addEventListener('change', function(event) {
    // A propriedade 'files' contém uma lista dos arquivos selecionados
    const arquivos = event.target.files;

    // Verifica se algum arquivo foi selecionado
    if (arquivos.length > 0) {
        // Itera (passa) por cada arquivo selecionado
        Array.from(arquivos).forEach(arquivo => {
            // Cria um objeto FileReader para ler o conteúdo do arquivo
            const leitor = new FileReader();

            // Define o que fazer quando o arquivo for lido com sucesso
            leitor.onload = function(e) {
                // 'e.target.result' é a URL temporária da imagem (Data URL)

                // Chama a função para adicionar a foto à galeria
                adicionarFoto(e.target.result);
            };

            // Começa a ler o arquivo como uma URL de dados (Data URL)
            leitor.readAsDataURL(arquivo);
        });
    }
});

/**
 * Função responsável por criar e adicionar o elemento imagem ao HTML.
 * @param {string} url - A URL da imagem (Data URL).
 */
function adicionarFoto(url) {
    // Cria um novo elemento div para ser o contêiner da foto
    const fotoItem = document.createElement('div');
    fotoItem.className = 'foto-item'; // Adiciona a classe CSS

    // Cria o elemento imagem
    const imagem = document.createElement('img');
    imagem.src = url; // Define a fonte da imagem como a URL lida
    imagem.alt = 'Foto inserida pelo usuário'; // Texto alternativo

    // Adiciona o elemento <img> dentro do <div>
    fotoItem.appendChild(imagem);

    // Adiciona o <div> (com a imagem dentro) ao contêiner principal da galeria
    galeria.appendChild(fotoItem);
}