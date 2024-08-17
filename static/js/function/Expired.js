let x = setInterval(() => {
  let timeStamp = new Date().getTime()

  if (localStorage.getItem('expire_time') != undefined) {
    if (timeStamp >= localStorage.getItem('expire_time')) {
      window.location.replace('/api/auth/logout')
    }
  }
})
