let apiKey = "yuOE4LETqIjEDL2LQdmWNTQpp1lGPN5gIsCxAtZJYdFxTIfMuc"
let baseURL = "https://api.tumblr.com/v2/"
const tags = ['Nintendo','PlayStation','XBox','Sega', 'android','ios']
let answer = "";
const list = document.getElementById('list-data')
const answerList = document.getElementById('choices')

function reset(){
	
	
	answerList.innerHTML = "";
	answer = tags[Math.floor(Math.random() * tags.length)];
	getTaggedPhotos(answer);

	const choices = [];
	choices.push(answer);

	while(choices.length < 4){
		const rand = tags[Math.floor(Math.random() * tags.length)]
		if (choices.indexOf(rand) == -1){
			choices.push(rand);
		}
	}

	choices.sort(function(){
		return Math.random() * 2 - 1;
	})

	for (let i = 0; i < choices.length; i++){
		const li = document.createElement('li');
		const btn = document.createElement('button')
		li.appendChild(btn);
		btn.innerHTML = choices[i];
		//btn.style.backgroundColor = randomColor();
		btn.onclick = function (){
			
			if (btn.innerHTML == answer){
				window.alert('CORRECT!!')
			}
			else {
				window.alert('lol, the answer was ' + answer)
			}

			reset();
		}
		answerList.appendChild(li);
	}
}

function getTaggedPhotos(tagName){

	fetch(baseURL+"tagged?tag="+tagName+"&api_key="+apiKey)
		.then(function(response){
			return response.json(); //get json object

		}).then(function(result){
			
			list.innerHTML='';

			const items = result.response;

			for (let i = 0; i < items.length; i++){
				const item=items[i];

				if (item.photos != undefined){
					const altSizes = item.photos[0].alt_sizes;
					const imgSrc = altSizes[altSizes.length - 3].url;

					const img = document.createElement('img');
					img.src = imgSrc;

					const li = document.createElement('li');
					
					li.appendChild(img);
					list.appendChild(li);
					
				}
			}
		})

}

reset()