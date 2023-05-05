// Import stylesheets
import './style.css';

// Usate questa per qualche prova, poi create un vostro account
// su www.openweathermap.org e create una API key personale
const apiKey = 'd0475be3a1967b1b49dfc02c8128001a';
const leCitta = ['Genova', 'Milano', 'Torino', 'Roma',"Pisa"];
const URL =
  'https://api.openweathermap.org/data/2.5/weather?APPID=' +
  apiKey +
  '&units=metric&q=';
// Crea una lista di bottoni con i nomi delle citta
leCitta.map((citta) => {
  const btn = document.createElement('button');
  btn.innerHTML = citta;
  btn.addEventListener('click', () => display(btn.innerHTML));
  btn.addEventListener('mouseover', () => stileOn(btn));
  btn.addEventListener('mouseout', () => stileOut(btn));
  const item = document.createElement('li');
  item.appendChild(btn);
  document.getElementById('citta').appendChild(item);
});

//Funzioni collegate ai bottoni per cambiare colore al passaggio del mouse
function stileOn(btn){
  btn.style.backgroundColor="lightblue";
};

function stileOut(btn){
  btn.style.backgroundColor='buttonface';
};

//Calcolo media
const btnMedia = document.getElementById('btnMedia');
const arrayMedia = [];
btnMedia.addEventListener('click', () => calcoloMedia(leCitta));

function calcoloMedia (arr){
  console.log('primo array', arr);
  arr.forEach(function(element) {
    const request = new XMLHttpRequest();
    request.onload = () => {
      if (request.status === 200) {
        var dataObject = JSON.parse(request.response);
        console.log(element, dataObject.main.temp);
        arrayMedia.push(dataObject.main.temp);
        var media_res= arrayMedia.reduce(myFun, 0);
        document.getElementById('rispostaMedia').innerHTML= 
        'La media delle temperature è '+ media_res + ' gradi.';
      } else {
        document.getElementById('rispostaMedia').innerText = 'Errore';
      }
    };
    request.open('GET', URL + element, true);
    request.send();
  });
}

//Funzione reduce
function myFun(total, value, index, array) {
  return total + (value/array.length);
}


// Funzione collegata ai bottoni
function display(c) {
  const request = new XMLHttpRequest(); // Costruzione dell'oggetto "request"
  // Funzione callback invocata quando la request termina
  request.onload = () => {
    // funzione definita arrow
    if (request.status === 200) {
      var dataObject = JSON.parse(request.response);
      document.getElementById('risposta').innerHTML =
        new Date().toISOString() +
        ': A ' +
        c +
        ' ci sono ' +
        dataObject.main.temp +
        ' gradi. La pressione è ' +  //stampa la pressione
        dataObject.main.pressure +
        ' hPa.'
      console.log(dataObject.main);
    } else {
      document.getElementById('risposta').innerText = 'Errore';
    }
  };

  // Applico il metodo "open"
  request.open('GET', URL + c, true);
  // Applico il metodo send (al termine chiamera' il callback "onload")
  request.send();
  console.log(new Date().toISOString() + ': Finito');
}
