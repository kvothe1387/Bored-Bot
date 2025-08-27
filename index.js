const button = document.getElementById('get-activity')
const activityName = document.getElementById('activity-name')
const container = document.querySelector('.container')
const activityContainer = document.getElementById('activity-container')

button.addEventListener('click', getActivity)

function getActivity() {
  // Adds button click effect
  button.classList.add('button-clicked')
  setTimeout(() => button.classList.remove('button-clicked'), 100)

  // resset previous styling
  activityContainer.classList.remove('activity-glow', 'activity-appear')

  activityName.textContent = 'Finding something fun for you ...';
  activityName.className = 'loading';

  fetch("https://apis.scrimba.com/bored/api/activity")
    .then(response => response.json())
    .then(data => {
      // dynamic styling based on content
      setTimeout(() => {
        activityName.textContent = data.activity;
        activityName.className = '';

        // add appear animation
        activityContainer.classList.add('activity-appear')

        // add glow effect for emphasis
        setTimeout(() => {
          activityContainer.classList.add('activity-glow')
        }, 300)
      }, 500)
    })
    .catch(error => {
      // dynamic error styling
      container.classList.add('container-shake')
      setTimeout(() => container.classList.remove('container-shake'), 500)

      activityName.textContent = 'Oops! Try again later.';
      activityName.className = '';
    })
}

// add hover effects dynamically
button.addEventListener('mouseenter', () => {
  if (!button.classList.contains('button-clicked')) {
    button.style.transform = 'translateY(-3px) scale(1.02)'
  }
})

button.addEventListener('mouseleave', () => {
  if (!button.classList.contains('button-clicked')) {
    button.style.transform = 'translateY(-3px)'
  }
})

// dynamic theme change based on time of day
function setDynamicTheme() {
  const hour = new Date().getHours()
  const body = document.body

  if (hour >= 6 && hour < 12) {
    // morning theme
    body.style.background = 'linear-gradient(135deg, #74b9ff 0%, #09874e3 100%)'
  } else if (hour >= 12 && hour < 18) {
    // afternoon theme
    body.style.background = 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)'
  } else {
    // evening/night theme
    body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }
}

// apply dynamic theme
setDynamicTheme()

getActivity()