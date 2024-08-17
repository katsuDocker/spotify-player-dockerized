const PlayListElement = document.querySelector('#playlist-controller')

async function ListElement(data) {
  const element = `<div class="playlist-container" onclick="playThisList('${data.id}')">
  <div class="playlist-cover" style="background: url(${data.images[0].url});"></div>
  <div class="info-container">
    <p class="title">
      ${data.name}
    </p>
    <p class="desp">
      ${data.description}<span> · ${data.owner.display_name}</span>
    </p>
  </div>
</div>`

  return element
}

function playThisList(id) {
  fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}`,
    }),
    body: JSON.stringify({
      device_ids: [localStorage.getItem('device_id')],
      context_uri: `spotify:playlist:${id}`,
    }),
  })
}

async function PlayList(page) {
  const list = await fetch('https://api.spotify.com/v1/me/playlists', {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}`,
    }),
  })

  if (list.status != 200) {
    window.location.replace('/api/auth/logout')
  }

  const parsedList = await list.json()

  let pageLength = Math.round(parsedList.items.length / 4)

  if (page >= pageLength) {
    page = pageLength - 1
  }

  let temp = ''

  console.log(page)
  console.log(page * 4)

  for (let i = page * 4; i < page * 4 + 4; i++) {
    temp += await ListElement(parsedList.items[i])
  }

  temp += `<div id="page-controller">
  <button onclick="PlayList(${Number(page - 1)})">
    ◀️
  </button>
  <span>
    ${
      String(Number(page + 1)).length < 2
        ? `0${Number(page + 1)}`
        : Number(page + 1)
    } / ${pageLength}
  </span>
  <button onclick="PlayList(${Number(page + 1)})">
    ▶️
  </button>
</div>`

  PlayListElement.innerHTML = temp
}
