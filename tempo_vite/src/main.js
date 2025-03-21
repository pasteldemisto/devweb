import './style.css'

document.querySelector('#app').innerHTML = `
  <div>

    <h1>Previsão do Tempo</h1>
    <input type="text" id="cidade" placeholder="Digite o nome da cidade" />
    <button id="buscar">Buscar</button>
    <div id="resultado">
    <p id="erro"></p>
    <p id="descricao"></p>
    <p id="temperatura"></p>
    </div>

  </div>
`

const apiKey = 'API_KEY';
const button = document.getElementById('buscar');
const input = document.getElementById('cidade');
const resultado = document.getElementById('resultado');
const erro = document.getElementById('erro');
const descricao = document.getElementById('descricao');
const temperatura = document.getElementById('temperatura');

button.addEventListener('click', () => {
  const cidade = input.value.trim();

  if (cidade) {
    fetchWeather(cidade);
  }
});

async function fetchWeather(cidade) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`);
    const data = await response.json();


    if (data.cod === 200) {
      // Achoooooou
      erro.textContent = '';
      descricao.textContent = `Condição: ${data.weather[0].description}`;
      temperatura.textContent = `Temperatura: ${data.main.temp}°C`;
    } else {
      // Errooooooooooou
      erro.textContent = 'Cidade não encontrada!';
      descricao.textContent = '';
      temperatura.textContent = '';
    }
  } catch (e) {
    e.textContent = 'Erro ao buscar dados!';
    descricao.textContent = '';
    temperatura.textContent = '';
  }
}