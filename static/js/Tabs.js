const controllerPage = document.querySelector('#control-controller')
const playlistPage = document.querySelector('#playlist-controller')

document.querySelector('#control-button').onclick = () => {
  if (controllerPage.classList[0] == 'hidden') {
    controllerPage.classList.remove('hidden')
    playlistPage.classList.add('hidden')
  }
}

document.querySelector('#playlist-button').onclick = () => {
  if (playlistPage.classList[0] == 'hidden') {
    controllerPage.classList.add('hidden')
    playlistPage.classList.remove('hidden')
  }
}
