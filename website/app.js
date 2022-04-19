/* Global Variables */
const apiKey = 'f5d6618189c12817bb727d381f5aee11&units=imperial'
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?'
const serverURL = 'http://localhost:3000'
const zipInput = document.getElementById('zip');
const userResponse = document.getElementById('feelings')
const generate = document.getElementById('generate')
const dateDiv = document.getElementById('date')
const tempDiv = document.getElementById('temp')
const contentDiv = document.getElementById('content')
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// function to get temp by zip code
const getWeather = async (url='', zip, key) => {
    const req = await fetch(url+'zip='+zip+'&appid='+key)
    return req.json()
}

// function to get projectData from the server
const getProjectData = async (url='') => {
    const req = await fetch(url)
    return req.json()
}

// function to post data to projectData
const postProjectData = async (url='', data={}) => {
    data = {temperature: data.temperature, date: data.date, userResponse: data.userResponse}
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    });
    return response.json()
}

const updateUI = async () => {
    const req = await fetch(serverURL+'/get')
    try {
        const data = await req.json()
        console.log(data)
        dateDiv.innerHTML = data.date
        tempDiv.innerHTML = data.temp
        contentDiv.innerHTML = data.userResponse
    } catch(err) {
        console.log(err)
    }

}

// click the button
generate.addEventListener('click', () => {
    getWeather(baseURL, zipInput.value, apiKey).then(data => {
        postProjectData(serverURL+'/add', {temperature: data.main.temp, date: newDate, userResponse: userResponse.value}).then(res => {
            updateUI()
        })
    })
})

