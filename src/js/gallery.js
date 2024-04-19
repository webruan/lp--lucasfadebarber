// Evento de clique no botão "Ver mais fotos"
document.getElementById('seeMore').addEventListener('click', handleClick);

function handleClick(event) {
  event.preventDefault(); // Evita o comportamento padrão de um link

  // Encontra a próxima linha oculta e a torna visível
  var nextRow = document.querySelector('.row.hidden');
  if (nextRow) {
    nextRow.classList.remove('hidden');
  } else {
    // Se não houver mais linhas ocultas, altera o cursor para 'not-allowed'
    document.getElementById('seeMore').style.cursor = 'not-allowed';
    document.getElementById('seeMore').removeAttribute('href');
    document.getElementById('seeMore').removeEventListener('click', handleClick);
  }
}
