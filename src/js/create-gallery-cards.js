export function createGalleryCards(photos) {
  return photos
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="gallery__item" href="${largeImageURL}">
        <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__img" />
  <div class="info">
    <p class="info-item">
      <b>Likes: </b><span class="info-text">${likes}</span>
    </p>
    <p class="info-item">
      <b>Views: </b><span class="info-text">${views}</span>
    </p>
    <p class="info-item">
      <b>Comments: </b><span class="info-text">${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads: </b><span class="info-text">${downloads}</span>
    </p>
  </div>
</div>
</a>`;
      }
    )
    .join('');
}

{
  /* <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>; */
}
