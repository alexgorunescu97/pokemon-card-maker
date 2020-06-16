let inputValue = document.querySelector(".pokemon-input");
let button = document.querySelector('button');
let cards = document.querySelector('.pokemon-cards');

button.addEventListener('click', event => {
    fetch('https://pokeapi.co/api/v2/pokemon/' + inputValue.value + '/')
        .then(res => res.json())
        .then(data => {
            let frontCard;
            let card = document.createElement('div');
            let cardImage = document.createElement('div');
            let pokemonInfo = document.createElement('div');
            let movesInfo = document.createElement('div');
            let statsInfo = document.createElement('div');
            let weightHeight = document.createElement('div');
            card.className = 'card';
            cardImage.className = 'image-container';
            pokemonInfo.className = 'info';
            movesInfo.className = 'moves';
            statsInfo.className = 'stats';
            weightHeight.className = 'w-h';
            cardImage.innerHTML += `<img src=${data.sprites.front_default} width="200" height="200">`;
            pokemonInfo.innerHTML += `
                <p>${data.name}</p>
                <p>ID ${data.id}</p>`;
            for (let i = 0; i < 4; i++) {
                if (data.moves[i] !== undefined) {
                    let move = document.createElement('div');
                    move.className = 'move';
                    move.innerHTML += `
                        <span><i>Move No. ${i+1}</i></span>
                        <p>${data.moves[i].move.name}</p>`;
                    movesInfo.appendChild(move);
                }
            }
            for (let i = 0; i < 2; i++) {
                if (data.stats[i] !== undefined) {
                    let stat = document.createElement('span');
                    stat.className = 'stat';
                    stat.innerHTML += `${data.stats[i].stat.name}: ${data.stats[i].base_stat}`;
                    statsInfo.appendChild(stat);
                }
            }

            weightHeight.innerHTML = `Height: ${data.height/10} m   Weight: ${data.weight/10} Kg`;

            card.appendChild(pokemonInfo);
            card.appendChild(cardImage);
            card.appendChild(weightHeight);
            card.appendChild(movesInfo);
            card.appendChild(statsInfo);
            card.addEventListener('mousedown', () => {
                frontCard = card.cloneNode(true);
                card.innerHTML = '';
                card.className = 'card-hover';
            });
            card.addEventListener('mouseup', () => {
                card.innerHTML = frontCard.innerHTML;
                card.className = 'card';
            });
            cards.appendChild(card);
        })
        .catch(err => alert('Please enter a valid id!'));
    inputValue.value = "";
    event.preventDefault();

});
