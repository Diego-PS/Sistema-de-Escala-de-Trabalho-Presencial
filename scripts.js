// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://localhost:4000/boss', true)

request.onload = function () {
  // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    const app = document.getElementById('root')

    data.forEach((boss) => {
    // Log each movie's title
        const h1 = document.createElement('h1')
        h1.textContent = boss.name
        app.appendChild(h1)
    console.log(boss.name)
    })
}

// Send request
request.send()