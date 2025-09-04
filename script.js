document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("videosContainer");
    const searchInput = document.getElementById("searchInput");

    let allVideos = [];

    // تحميل الفيديوهات من ملف JSON
    fetch("videos.json")
        .then(response => {
            if (!response.ok) throw new Error("خطأ في تحميل البيانات");
            return response.json();
        })
        .then(data => {
            allVideos = data;
            displayVideos(allVideos);
        })
        .catch(error => {
            container.innerHTML = `<p class="text-danger text-center">${error.message}</p>`;
        });

    // عرض الفيديوهات
    function displayVideos(videos) {
        container.innerHTML = "";

        if (videos.length === 0) {
            container.innerHTML = `<p class="text-center">لا توجد نتائج مطابقة.</p>`;
            return;
        }

        videos.forEach(video => {
            const col = document.createElement("div");
            col.className = "col-md-4";

            col.innerHTML = `
                <div class="card h-100">
                    <iframe width="100%" height="200" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allowfullscreen></iframe>
                    <div class="card-body">
                        <h5 class="card-title">${video.title}</h5>
                        <p class="card-text">${video.category}</p>
                    </div>
                </div>
            `;

            container.appendChild(col);
        });
    }

    // البحث الفوري
    searchInput.addEventListener("input", () => {
        const term = searchInput.value.toLowerCase();
        const filtered = allVideos.filter(v =>
            v.title.toLowerCase().includes(term) ||
            v.category.toLowerCase().includes(term)
        );
        displayVideos(filtered);
    });
});
