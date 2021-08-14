window.addEventListener('blur', () => {
  window.__IS_ACTIVE = false
})

window.addEventListener('focus', () => {
  window.__IS_ACTIVE = true
})

export {}
