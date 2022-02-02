document.getElementById('start-play').addEventListener('click', play)

//funzione per settare il gioco
function play() {

    const difficolta = document.getElementById('difficoltà').value;

    const NUMERO_BOMBE = 16;

    const gioco = document.getElementById('gioco');
    //resetto campo di gioco
    gioco.innerHTML = '';

    let numeroCelle;
    let cellePerRiga;
    const tentativi = [];

    switch (difficolta) {
        case "facile":
        //con default facciamo in modo che anche se si cerca di bypassare 
        //una delle tre possibilita si finisce dentro questo caso
        //avrei potuto metterlo anche in altri casi o in fondo    
        default:
            numeroCelle = 100;
            break;
        case "intermedio":
            numeroCelle = 81;
            break;
        case "difficile":
            numeroCelle = 49;
            break;
    }

    generaCampoGioco(numeroCelle);
    const bombe = generaBombe(NUMERO_BOMBE, numeroCelle);

    function generaCampoGioco(numeroCelle) {
        //math.sqrt serve per fornire la radice quadrata
        cellePerRiga = Math.sqrt(numeroCelle);
        
        for (let i = 1; i <= numeroCelle; i++) {
            const nodo = document.createElement('div');
            nodo.classList.add('box');

            const dimensione = `calc(100% / ${cellePerRiga})`;
            nodo.style.width = dimensione;
            nodo.style.height = dimensione;

            nodo.textContent = i;
        
            nodo.addEventListener('click', handleCellClick);
        
            gioco.appendChild(nodo);
        
        }
        
        return true;
    }

    function handleCellClick() {
        this.classList.add('clicked');
        //alert(this.innerText);
        
        const cell = parseInt(this.innerText);
        
        if (bombe.includes(cell)) {
            
            terminaGioco(tentativi, 'Hai perso dopo aver sminato ' + tentativi.length + ' celle');
            //this.classList.add('bomb');
            
        } else {
            
            tentativi.push(cell);
            
        }

        if (tentativi.length >= (numeroCelle - NUMERO_BOMBE)) {

            terminaGioco(tentativi, 'Hai vinto!');

        }
        
        this.removeEventListener('click', handleCellClick);
        console.log('al momento hai cliccato su: ' + tentativi);
    }

    function terminaGioco(arrayDiTentativi, messaggio) {
        const quadrati = document.getElementsByClassName('box');

        for (let i=0; i<quadrati.length; i++) {
            if(bombe.includes(parseInt(quadrati[i].innerText))) {
                quadrati[i].classList.add('bomb');
            }

            // qua dovrei rimuovere ascoltare di eventi su quadrati[i]
            // così che una volta trovata una bomba non posso più cliccare su altre caselle
            quadrati[i].removeEventListener('click', handleCellClick);

        }

        //e stampo la lunghezza dei tentativi
        alert(messaggio);

    }

    function generaBombe(numeroBombe, numeroCelle) {

        const bombeGenerate = [];

        while (bombeGenerate.length < numeroBombe) {

            const bomba = getRandomNumber(1, numeroCelle);

            if (!bombeGenerate.includes(bomba)) {
                
                bombeGenerate.push(bomba);

            }

        }

        console.log(bombeGenerate);

        return bombeGenerate;
    }

}

function getRandomNumber(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

