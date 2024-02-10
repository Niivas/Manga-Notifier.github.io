async function fetchAndLogJson(url) {
  const response = await fetch(url);
  mangas = await response.json();
  return mangas;
}

let mangaka;
let totalHTML = "";

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
  "https://raw.githubusercontent.com/Niivas/Manga-Notifier.github.io/main/assets/mangas.json",
)
  .then((mangas) => {
    const ordered = Object.keys(mangas)
      .sort()
      .reduce((obj, key) => {
        obj[key] = mangas[key];
        return obj;
      }, {});
    mangaka = ordered;
    for (const [mangaName, mangaDetails] of Object.entries(ordered)) {
      totalHTML += formatManga(mangaName, mangaDetails);
    }
    document.getElementById("mangas").innerHTML = totalHTML;
  })
  .catch((error) => {
    console.error(error);
  });

function searchMangaByName() {
  let input, enteredMangaName;
  input = document.getElementById("myInput");
  enteredMangaName = input.value.toUpperCase();
  if (enteredMangaName === null || enteredMangaName === "") {
    document.getElementById("mangas").innerHTML = totalHTML;
    return;
  }
  resultHTML = "";
  for (const [name, mangaDetails] of Object.entries(mangaka)) {
    mangaName = name.toUpperCase();
    if (mangaName.startsWith(enteredMangaName)) {
      resultHTML += formatManga(name, mangaDetails);
    }
  }
  document.getElementById("mangas").innerHTML = resultHTML;
}
