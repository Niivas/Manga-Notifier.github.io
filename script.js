async function fetchAndLogJson(url) {
  const response = await fetch(url);
  mangas = await response.json();
  return mangas;
}

function formatManga(mangaName, mangaDetails) {
  return `
    <div class="manga-col" ontouchstart="this.classList.toggle('hover');">
        <div class="manga-container">
            <div class="manga-front" style="background-image: url(${mangaDetails.image})">
                <div class="manga-inner">
                    <p>${mangaName}</p>
                        <span>Chapter-${mangaDetails.latestChapter}</span>
                </div>
            </div>
            <div class="manga-back">
                <div class="manga-inner">
                    <p>Latest release: <br/>${mangaDetails.latestRelease}</p>
                    <a href="${mangaDetails.latestChapterLink}" target="_blank"><button class="manga-button manga-button-extra">Read Now</button></a>
                </div>
            </div>
        </div>
    </div>`;
}

fetchAndLogJson(
  "https://raw.githubusercontent.com/Niivas/Manga-Notifier.github.io/main/assets/mangas.json"
)
  .then((mangas) => {
    const ordered = Object.keys(mangas)
      .sort()
      .reduce((obj, key) => {
        obj[key] = mangas[key];
        return obj;
      }, {});
    let totalHtml = "";
    for (const [mangaName, mangaDetails] of Object.entries(ordered)) {
      totalHtml += formatManga(mangaName, mangaDetails);
    }
    document.getElementById("mangas").innerHTML = totalHtml;
  })

  .catch((error) => {
    console.error(error);
  });
