const input = document.getElementById('search');
const button = document.querySelector('.search_btn');
const result = document.querySelector('.result_block');

const url = 'https://api.lyrics.ovh';

async function search(text){
    const response = await fetch(`${url}/suggest/${text}`);
    const data = await response.json();
        
    showSongs(data)
}

function showSongs(data) {
    const songs = data.data;
    
    let songsHtml = '';

    for (let i = 0; i < songs.length; i++) {
        let song = songs[i];  
        songsHtml += `<div class = "song">
            <div class="title">
                <span>${song.title}</span>
                <span> - </span>
                <span>${song.artist.name}</span>
            </div>
            <div>
                <button data-artist='${song.artist.name}' data-song='${song.title}'>text</button>
            </div>
        </div>\n`
    }

    result.innerHTML = songsHtml;

}

async function showLyrics(e) {
    let button = e.target; 
    if (button.tagName === 'BUTTON') {
        let artist = button.dataset.artist;
        let song = button.dataset.song;
        const response = await fetch(`${url}/v1/${artist}/${song}`);
        const data = await response.json();
        
        if (data.error) {
            result.innerHTML = '<h2>Текс не найден</h2>'
        } else {
            result.innerHTML = data.lyrics
        }
    }
    console.log(button.dataset.artist, button.dataset.song)
}

button.addEventListener('click', () => {
    const title = input.value;
    search(title);
})

document.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        console.log(1)
        const title = input.value;
        search(title);
    }
})

result.addEventListener('click', showLyrics)