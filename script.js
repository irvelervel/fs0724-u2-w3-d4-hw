const primarySearchButton = document.getElementsByClassName('btn-primary')[0]
const secondarySearchButton =
  document.getElementsByClassName('btn-secondary')[0]

const getImages = function (query) {
  fetch('https://api.pexels.com/v1/search?query=' + query, {
    headers: {
      Authorization: 'BQ5J0xUI1cRSwGLF30de3ndtupKdYr4UstZ8wCjn2p9yW9oGoKuzTgnz',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('ERROR')
      }
    })
    .then((oggettone) => {
      console.log(oggettone)
      const allTheCardImages = document.querySelectorAll('.card img')
      allTheCardImages.forEach((img, i) => {
        img.src = oggettone.photos[i].src.portrait
        const allThe9Mins = document.querySelectorAll('.card small')
        allThe9Mins[i].innerText = oggettone.photos[i].id
      })
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })
}

primarySearchButton.addEventListener('click', () => getImages('hamsters'))
secondarySearchButton.addEventListener('click', () => getImages('tigers'))

const allTheEditButtons = document.querySelectorAll(
  '.btn-group button:last-of-type'
)
console.log(allTheEditButtons)
allTheEditButtons.forEach((btn) => {
  btn.innerText = 'Hide'
  btn.addEventListener('click', () => {
    btn.closest('.col-md-4').remove()
  })
})

document.getElementById('custom-search').addEventListener('submit', (e) => {
  e.preventDefault()
  const customQuery = document.getElementById('custom-search-input').value // "capybara"
  getImages(customQuery)
})
