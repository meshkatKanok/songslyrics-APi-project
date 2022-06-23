document.getElementById("such-btn").addEventListener("click", function() {
    const tagInput = document.getElementById("songs-input").value;
    fetch(`https://api.lyrics.ovh/suggest/${tagInput}`)
        .then(res => res.json())
        .then(data => {
            fetchdata = data;

            for (let i = 0; i < data.data.length; i++) {
                const title = data.data[i].album.title;
                const arist = data.data[i].artist.name;
                const neAdd = document.createElement("div");
                neAdd.innerHTML = `<div class="single-result row align-items-center my-3 p-3"><h3>${title}</h3>
                        <p>${arist}</p>  <button onclick=lyricsall(${i})  class="btn btn-success">Get Lyrics</button></div>   
                        `;

                const newItem = document.getElementById("new-Item");
                newItem.appendChild(neAdd);

            }
        })
});


function lyricsall(index) {
    const title = fetchdata.data[index].album.title;
    const arist = fetchdata.data[index].artist.name
    fetch(`https://api.lyrics.ovh/v1/${arist}/${title}`)
        .then(res => res.json())
        .then(data => {
            const lyric = data.lyrics;
            document.getElementById("songs-lyrics").innerHTML = `<p>${lyric}</p>`
        })

}