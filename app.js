window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', (e) => {
    const transcript = e.results[0][0].transcript;

    p.textContent = transcript;
    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }

    if (transcript.includes('Pikachu')) {
        console.log('Os dados do pokemon são: ');
        const url = `https://pokeapi.co/api/v2/pokemon/${transcript.toLowerCase()}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((e) => console.error('Um erro aconteceu: ', e));
    }
});

recognition.addEventListener('end', recognition.start);

recognition.start();