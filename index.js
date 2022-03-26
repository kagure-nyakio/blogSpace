const postsSection =  document.querySelector(".posts")
const postForm = document.querySelector('.post-form')

let postsArr = []

function renderPosts() {
  let postsHtml = ""
  postsArr.map((post) => {
    postsHtml += `
      <div class="post">
        <h2 class="post__title">${post.title}</h2>
        <p class="post__body"> ${post.body}</p>
      </div>` 
  })
  postsSection.innerHTML = postsHtml
}

// Get data
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    postsArr = data.slice(0, 5)   
    renderPosts()
  })

// Posting  data
postForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)
  const data  = {
    title: formData.get('title'),
    body: formData.get('body')
  }

  const options = {
    method: 'POST',
      body: JSON.stringify({data}),
      headers: {
        'Content-Type': 'application/json',
        'charset': 'UTF-8'
      }
  }

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then(res => res.json())
    .then(post => {
      postsArr.unshift(post.data)
      renderPosts()
    })

    postForm.reset()
})