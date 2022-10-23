const main = document.getElementById("container");

const getJson = async function (url) {
  const res = await fetch(`${url}`);
  const siteData = await res.json();

  recourseFetchedData(main, siteData, 0);
};

const recourseFetchedData = (parent, siteData, depth) => {
  siteData.forEach((site) => {
    const curSite = createSiteElement(parent, site, depth);
    if (site.subData) recourseFetchedData(curSite, site.subData, depth + 1);
  });
};

const createSiteElement = (parent, site, depth) => {
  const curSite = document.createElement(`div`);
  curSite.classList.add(`site`, `site-child-${depth % 4}`);
  curSite.innerHTML = `
  <p>Id: ${site.id}</p>
  <p>Site Name: ${site.name}</p>
  <a href="https://${site.url}" >Site Url: ${site.name}</a>`;

  parent.appendChild(curSite);
  return curSite;
};

getJson("./someApi.json");
