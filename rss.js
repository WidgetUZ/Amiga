const feeds = {
  sport: "https://www.sport.pl/rss/sport.xml",
  politics: "https://www.rp.pl/rss/polityka.xml",
  religion: "https://ekai.pl/feed/",
  comics: "https://www.garfield.com/comics/rss", // przykładowy komiks!
  geopolitics: "https://www.defence24.pl/rss?feed=geopolityka"
};

async function fetchFeed(url, target, withImage = false) {
  try {
    // Github Pages wymaga proxy do zewnętrznych źródeł RSS!
    const proxy = "https://api.allorigins.win/get?url=";
    let response = await fetch(proxy + encodeURIComponent(url));
    let data = await response.json();
    let xml = new window.DOMParser().parseFromString(data.contents, "text/xml");
    let items = xml.querySelectorAll("item");
    let html = "<ul>";
    items.forEach((el, i) => {
      if (i > 4) return; // max 5 na feed
      let title = el.querySelector("title")?.textContent ?? "Tytuł";
      let link = el.querySelector("link")?.textContent ?? "#";
      html += `<li><a href="${link}" target="_blank">${title}</a></li>`;
      // pierwszy obrazek do pixelartu (komiksy)
      if (withImage && i === 0) {
        let img = el.querySelector("enclosure,url,media\\:content")?.getAttribute("url");
        if (img) loadImageToPixelArt(img);
      }
    });
    html += "</ul>";
    document.getElementById(target).innerHTML = html;
  } catch (e) {
    document.getElementById(target).innerHTML = "Brak danych (zablokowane RSS lub brak proxy)";
  }
}

window.onload = function() {
  fetchFeed(feeds.sport, "feed-sport");
  fetchFeed(feeds.politics, "feed-politics");
  fetchFeed(feeds.religion, "feed-religion");
  fetchFeed(feeds.comics, "feed-comics", true); // pixelart
  fetchFeed(feeds.geopolitics, "feed-geopolitics");
};
