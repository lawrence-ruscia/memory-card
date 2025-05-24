export const getCards = async () => {
  const images = await fetchData();
  const cardData = images.map((image) => {
    return { id: crypto.randomUUID(), isClicked: false, url: image.url };
  });

  return cardData;
};

const fetchData = async () => {
  const response = await fetch('https://nekos.best/api/v2/neko?amount=6');
  const data = await response.json();
  const results = data.results;

  return results;
};
