function PlayerFunction(session) {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = `${session}`
    const player = new Spotify.Player({
      name: 'katz',
      getOAuthToken: (cb) => {
        cb(token)
      },
      volume: 0.1,
    })

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id)
      localStorage.setItem('device_id', device_id)
      fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${session}`,
        }),
        body: JSON.stringify({
          device_ids: [device_id],
          play: true,
        }),
      })

      Swal.fire({
        icon: 'success',
        text: 'Spotify Web Playback SDK is connected!',
      })

      player.getVolume().then((volume) => {
        setVolumeElement(volume)
      })

      window.setInterval(() => {
        player.getCurrentState().then((state) => {
          if (!state) return
          document.querySelector('#durationBar').value = state.position
        })
      })
    })

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id)
    })

    player.addListener('initialization_error', ({ message }) => {
      console.error(message)
      window.location.replace('/api/auth/logout')
    })

    player.addListener('authentication_error', ({ message }) => {
      console.error(message)
      window.location.replace('/api/auth/logout')
    })

    player.addListener('account_error', ({ message }) => {
      console.error(message)
    })

    document.getElementById('togglePlay').onclick = function () {
      player.togglePlay()
    }

    document.getElementById('prev').onclick = function () {
      player.previousTrack()
    }

    document.getElementById('next').onclick = function () {
      player.nextTrack()
    }

    document.getElementById('volDown').onclick = function () {
      player.getVolume().then((volume) => {
        player.setVolume(volume - 0.1)

        setVolumeElement(volume - 0.1)
      })
    }

    document.getElementById('volUp').onclick = function () {
      player.getVolume().then((volume) => {
        player.setVolume(volume + 0.1)

        setVolumeElement(volume + 0.1)
      })
    }

    document.querySelector('#logout').onclick = function () {
      window.location.replace('/api/auth/logout')
    }

    document.querySelector('#durationBar').onchange = function () {
      player.seek(document.querySelector('#durationBar').value)
    }

    function setVolumeElement(volume) {
      let percent = Math.floor(volume * 100)
      document.querySelector('#vol').innerHTML = percent
    }

    player.on('player_state_changed', (state) => {
      const playlist =
        state.context.metadata.context_description !== undefined
          ? state.context.metadata.context_description
          : 'Single'
      const trackImage = state.track_window.current_track.album.images[0].url
      const trackName = state.track_window.current_track.name
      const trackArtist = state.track_window.current_track.artists
        .map((a) => a.name)
        .join(', ')

      // Web Title
      const title = trackName + ' | ' + playlist
      document.querySelector('title').innerHTML = title

      // Body BG
      document.body.style.background = 'url(' + trackImage + ')'

      // Detailed
      document.querySelector('#track-cover-image').src = trackImage
      document.querySelector('#track-title').innerHTML = trackName
      document.querySelector('#track-artist').innerHTML = trackArtist
      document.querySelector('#track-playlist').innerHTML = playlist

      // Controller
      document.querySelector('#durationBar').setAttribute('max', state.duration)
      if (state.paused) {
        document.querySelector('#togglePlay').innerHTML = '▶️'
      } else {
        document.querySelector('#togglePlay').innerHTML = '⏸️'
      }
    })

    player.connect()
  }
}
