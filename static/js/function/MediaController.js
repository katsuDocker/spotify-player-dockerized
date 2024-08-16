function MediaControlling(data) {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: data.title,
      artist: data.artist,
      album: data.playlist,
      artwork: [
        {
          src: data.cover,
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: data.cover,
          sizes: '128x128',
          type: 'image/png',
        },
        {
          src: data.cover,
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: data.cover,
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: data.cover,
          sizes: '384x384',
          type: 'image/png',
        },
        {
          src: data.cover,
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    })

    navigator.mediaSession.setActionHandler('play', () => {
      fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}`,
        }),
        body: JSON.stringify({
          device_ids: [localStorage.getItem('device_id')],
        }),
      })
    })
    navigator.mediaSession.setActionHandler('pause', () => {
      fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}`,
        }),
        body: JSON.stringify({
          device_ids: [localStorage.getItem('device_id')],
        }),
      })
    })
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      fetch('https://api.spotify.com/v1/me/player/previous', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}`,
        }),
        body: JSON.stringify({
          device_ids: [localStorage.getItem('device_id')],
        }),
      })
    })
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      fetch('https://api.spotify.com/v1/me/player/next', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}`,
        }),
        body: JSON.stringify({
          device_ids: [localStorage.getItem('device_id')],
        }),
      })
    })
  }
}
