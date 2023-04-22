const container_cards = document.getElementById("container-cards");
const disc_cover = document.querySelectorAll(".disco__img");
const disc_title = document.querySelectorAll(".disco__title");
const disc_time = document.querySelectorAll(".disco__time")
const audio_player = document.querySelectorAll(".audio-player");
const play_btn = document.querySelectorAll(".play-btn");
const cards = document.querySelectorAll(".disco")


//Funcion de play music
play_btn.forEach((button, index) => {

	button.addEventListener("click", (ev)=>{
		if(audio_player[index].paused){
			audio_player[index].play()
		}else{
			audio_player[index].pause()
		} 
		button.classList.toggle("btn-show")

		if(button.classList.contains("btn-show")){
			button.setAttribute("src", "imagenes/icons/pause-button.png")
		}else{
			button.setAttribute("src", "imagenes/icons/play-button.png")
		}
	})

	

	
});


//Llamada a la API

const TOKENS = ["5cF0dROlMOK5uNZtivgu50", "2xVcCDRgG3TrH69TatsUxp", "6hmYi0E6EBEmDeztQHaH0C", "4nrPB8O7Y7wsOCJdgXkthe","0VjIjW4GlUZAMYd2vXMi3b"];
/*Canciones:
	Attention- Charly Puth
	Cupido - Tini
	Bajan - Spineta
	Blinging Lights - The Weeknd
	Shakira - Bzrp Session
*/ 


//De milisegundo a minutos
function toMinutes(ms){
    const minutes = ms/60000;
    return minutes.toFixed(2);
}

// Funcion que llama a la API con distintos tokens
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '200e9331e9mshcaa6c916d9465ffp1f25eejsne9a825e6cbde',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

// Función de llamada a la API, Comentada para evitar que se alcanze el límite de llamadas
function callSongApi(token, index){
	fetch(`https://spotify23.p.rapidapi.com/tracks/?ids=${token}`, options)
	.then(response => response.json())
	.then(response => recibeData(response, index))
	.catch(err => console.error(err));
}

	
function recibeData(data, index){
		disc_cover[index].src = data.tracks[0].album.images[0].url;
		disc_title[index].textContent = `${data.tracks[0].artists[0].name} - ${data.tracks[0].name}`;
		disc_time[index].textContent = `${toMinutes(data.tracks[0].duration_ms)} min`;
	}


function callApi(cards){
	for(let i=0; i<cards.length; i++){
		callSongApi(cards[i].dataset.token, i);
	}	
}

// callApi(cards) 

