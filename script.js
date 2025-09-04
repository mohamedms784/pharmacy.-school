async function loadCategories() {
  const res = await fetch("videos.json");
  const data = await res.json();

  const container = document.getElementById("categories");
  if (container) {
    data.categories.forEach(cat => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <img src="${cat.image || 'images/default.jpg'}" alt="${cat.name}">
        <h3>${cat.name}</h3>
      `;
      div.onclick = () => {
        window.location.href = `category.html?slug=${cat.slug}`;
      };
      container.appendChild(div);
    });
  }
}

async function loadCategory() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const res = await fetch("videos.json");
  const data = await res.json();
  const category = data.categories.find(c => c.slug === slug);

  if (category) {
    document.getElementById("category-name").textContent = category.name;

    const videosDiv = document.getElementById("videos");
    category.videos.forEach(v => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <iframe width="100%" height="200" src="https://www.youtube.com/embed/${v.youtube_id}" frameborder="0" allowfullscreen></iframe>
        <h3>${v.title}</h3>
      `;
      videosDiv.appendChild(div);
    });

    const articlesDiv = document.getElementById("articles");
    category.articles.forEach(a => {
      const art = document.createElement("div");
      art.className = "card";
      art.innerHTML = `<h3>${a.title}</h3>`;
      art.onclick = () => {
        window.location.href = `article.html?id=${a.id}&slug=${slug}`;
      };
      articlesDiv.appendChild(art);
    });
  }
}

async function loadArticle() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const slug = params.get("slug");

  const res = await fetch("videos.json");
  const data = await res.json();
  const category = data.categories.find(c => c.slug === slug);
  const article = category.articles.find(a => a.id === id);

  if (article) {
    document.getElementById("article-title").textContent = article.title;
    document.getElementById("article-content").innerHTML = article.content.replace(/\r\n/g, "<br>");
  }
}

// تشغيل الصفحات حسب مكانك
if (document.getElementById("categories")) loadCategories();
if (document.getElementById("category-name")) loadCategory();
if (document.getElementById("article-title")) loadArticle();
