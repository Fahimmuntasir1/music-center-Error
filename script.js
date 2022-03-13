const elementById = (id) => {
  document.getElementById(id);
};
const handleSearch = () => {
  const keyword = document.getElementById("keyword").value;
  document.getElementById("albums").innerHTML = "";
  if (keyword === "" || typeof keyword === "number") {
    console.log("please enter a artists name");
  } else {
    const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => showArtists(data));
  }
  document.getElementById("keyword").value = "";
  document.getElementById("artists").innerHTML = "";
};

const showArtists = (data) => {
  if (data == null) {
    console.log("hello error");
  } else {
    data?.artists?.forEach((artist) => {
      const artistContainer = document.getElementById("artists");
      // console.log(artist);
      const div = document.createElement("div");
      div.classList.add("artist-card");
      div.innerHTML = `<div class="image-container">
      <div class="image-container-inner">
        <img
          src="${artist.strArtistThumb}"
          alt=""
        />
      </div>
    </div>
    <div class="info-container">
      <h1>${artist.strArtist}</h1>
      <p>Country: ${artist.strCountry}</p>
      <p>Style: ${artist.strGenre}</p>
    </div>
    <button class="album-button">
      <i class="fa-solid fa-compact-disc"></i>
      <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
    </button>`;
      artistContainer.appendChild(div);
    });
  }
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data));
  const artistContainer = document.getElementById("artists");
  artistContainer.innerHTML = "";
};

const showAlbum = (albumData) => {
  for (const accessData of albumData.album) {
    const albumContainer = document.getElementById("albums");
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${accessData.strAlbumThumb}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${accessData.strAlbum}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  }
};
