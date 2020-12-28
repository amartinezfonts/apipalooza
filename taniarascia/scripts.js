const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

request.open("GET", "https://ghibliapi.herokuapp.com/films", true)

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    data.forEach((movie) => {
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const title = document.createElement('h1')
      title.textContent = movie.title

      const director = document.createElement('p')
      director.textContent = `Directed by ${movie.director}`

      const description = document.createElement('p')
      movie.description = movie.description.substring(0, 300) // Limit to 300 chars
      description.textContent = `${movie.description}...` // End with an ellipses

      container.appendChild(card)

      card.appendChild(title)
      card.appendChild(director)
      card.appendChild(description)

    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

// Send request
request.send()
