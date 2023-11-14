async function fetchAndLogJson(url) {
  const response = await fetch(url);
  mangas = await response.json();
  return mangas;
}

function formatManga(mangaName, mangaDetails) {
  return `
    <div class="col" ontouchstart="this.classList.toggle('hover');">
        <div class="container">
            <div class="front" style="background-image: url(${mangaDetails.image})">
                <div class="inner">
                    <p>${mangaName}</p>
                        <span>Chapter-${mangaDetails.latestChapter}</span>
                </div>
            </div>
            <div class="back">
                <div class="inner">
                    <p>Latest release: <br/>${mangaDetails.latestRelease}</p>
                    <a href="${mangaDetails.latestChapterLink}" target="_blank"><button class="custom-btn btn-rm">Read Now</button></a>
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

  $(".search-bar input")
  .focus(function () {
    $(".header").addClass("wide");
  })
  .blur(function () {
    $(".header").removeClass("wide");
  });
