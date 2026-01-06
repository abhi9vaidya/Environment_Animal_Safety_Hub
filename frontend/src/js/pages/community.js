// =====================
// theme-toggle
// =====================
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('themeToggle'); 

    if (!toggleButton) return;

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    toggleButton.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
            toggleButton.style.color = '#ffd700'; // Yellow sun
        } else {
            toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
            toggleButton.style.color = '#ffffff'; // White moon
        }
    }
});

// =====================
// Auth
// =====================

function login() {
  // UI only – direct redirect
  window.location.href = "dashboard.html";
}

function verifyOtp() {
  window.location.href = "dashboard.html";
}

// OTP TIMER
let time = 120;
const timerEl = document.getElementById("time");

if (timerEl) {
  const timer = setInterval(() => {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    timerEl.textContent =
      `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

    time--;
    if (time < 0) clearInterval(timer);
  }, 1000);
}

const ecoBg = document.getElementById("eco-bg");

if (ecoBg) {
  const emojis = [
    "🌱", "🍃", "🌍", "♻️", "🌿", "🍀",
    "🐶", "🐱", "🐼", "🐨", "🦋", "🐝",   
    ];

  const COUNT = 35;
  const particles = [];

  const width = () => window.innerWidth;
  const height = () => window.innerHeight;

  function createParticle() {
    const el = document.createElement("span");
    el.className = "eco-emoji";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const size = Math.random() * 16 + 18;
    el.style.fontSize = size + "px";

    ecoBg.appendChild(el);

    return {
      el,
      size,
      x: Math.random() * (width() - size),
      y: Math.random() * (height() - size),
      dx: (Math.random() - 0.5) * 1.8,
      dy: (Math.random() - 0.5) * 1.8
    };
  }

  for (let i = 0; i < COUNT; i++) {
    particles.push(createParticle());
  }

  function animate() {
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      // Bounce from edges
      if (p.x <= 0 || p.x >= width() - p.size) p.dx *= -1;
      if (p.y <= 0 || p.y >= height() - p.size) p.dy *= -1;

      p.el.style.transform = `translate(${p.x}px, ${p.y}px)`;
    });

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    particles.forEach(p => {
      p.x = Math.min(p.x, width() - p.size);
      p.y = Math.min(p.y, height() - p.size);
    });
  });
}

// =====================
// Dashboard Posts
// =====================

const postsContainer = document.getElementById("posts-container");
const loader = document.getElementById("loader");

let postsData = [];
let postIndex = 0;

// Load posts JSON
async function loadPostsJSON() {
  try {
    const response = await fetch("../../assets/data/posts.json"); // ensure this path is correct
    postsData = await response.json();

    // Load initial 3 posts
    loadPost(3);
  } catch (err) {
    console.error("Failed to load posts:", err);
    loader.innerText = "Failed to load posts";
  }
}

// Load posts into DOM
function loadPost(count = 3) {
  if (postIndex >= postsData.length) {
    loader.innerText = "No more posts";
    return;
  }

  for (let i = 0; i < count && postIndex < postsData.length; i++, postIndex++) {
    const post = postsData[postIndex];

    const postCard = document.createElement("div");
    postCard.className = "post-card";
    postCard.innerHTML = `
      <div class="post-header">
        <img src="${post.avatar}" alt="${post.username}">
        <span class="username">${post.username}</span>
      </div>

      <div class="post-image">
        <img src="${post.image}" alt="Post image">
      </div>

      <div class="subheading post-desc">
        ${post.desc}
      </div>

      <div class="post-actions">
        <i class="fa-regular fa-heart like-btn"></i>
        <i class="fa-regular fa-comment comment-btn"></i>
        <i class="fa-regular fa-bookmark save-btn"></i>
      </div>

      <div class="post-stats">
        <span class="likes-count">${post.likes}</span> likes • 
        <span class="comments-count">${post.comments}</span> comments
      </div>

      <div class="comment-panel column" style="display:none;">
        <div class="comments-list column"></div>
        <input class="input comment-input" type="text" placeholder="Write a comment...">
        <button class="btn add-comment-btn">Post</button>
        <p class="no-comment text-sm">No comments yet</p>
      </div>
    `;
    postsContainer.appendChild(postCard);

    // =========================
    // Add interaction listeners
    // =========================
    const likeBtn = postCard.querySelector(".like-btn");
    const saveBtn = postCard.querySelector(".save-btn");
    const commentBtn = postCard.querySelector(".comment-btn");
    const commentPanel = postCard.querySelector(".comment-panel");
    const addCommentBtn = postCard.querySelector(".add-comment-btn");
    const commentInput = postCard.querySelector(".comment-input");
    const commentsList = postCard.querySelector(".comments-list");
    const noComment = postCard.querySelector(".no-comment");
    const likesCount = postCard.querySelector(".likes-count");
    const commentsCount = postCard.querySelector(".comments-count");

    // Like
    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("active");
      likeBtn.classList.contains("active") 
        ? likeBtn.classList.replace("fa-regular", "fa-solid")
        : likeBtn.classList.replace("fa-solid", "fa-regular");

      let likes = parseInt(likesCount.textContent);
      likes = likeBtn.classList.contains("active") ? likes + 1 : likes - 1;
      likesCount.textContent = likes;
    });

    // Save
    saveBtn.addEventListener("click", () => {
      saveBtn.classList.toggle("active");
      saveBtn.classList.contains("active")
        ? saveBtn.classList.replace("fa-regular", "fa-solid")
        : saveBtn.classList.replace("fa-solid", "fa-regular");
    });

    // Comment toggle
    commentBtn.addEventListener("click", () => {
      commentPanel.style.display = commentPanel.style.display === "flex" ? "none" : "flex";
      updateNoCommentText();
    });

    // Add comment
    addCommentBtn.addEventListener("click", () => {
      const text = commentInput.value.trim();
      if(text !== "") {
        const commentEl = document.createElement("div");
        commentEl.classList.add("comment-item");
        commentEl.textContent = text;
        commentsList.appendChild(commentEl);

        // Update comment count
        let comments = parseInt(commentsCount.textContent);
        comments += 1;
        commentsCount.textContent = comments;

        commentInput.value = "";
        updateNoCommentText();
      }
    });

    function updateNoCommentText() {
      noComment.style.display = commentsList.children.length === 0 ? "block" : "none";
    }

    updateNoCommentText(); // initial check
  }
}

// Infinite scroll
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadPost();
  }
});

loadPostsJSON();
