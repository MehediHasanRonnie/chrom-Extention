// console.log("test");
// localStorage.setItem("text", "this is a link");
// localStorage.setItem("text2", "this is a link1");
// localStorage.setItem("text3", "this is a link2");
//localStoprage.clear();

let allLinks = [];
const input = document.getElementById("input");
const linkBtn = document.getElementById("link-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const list = document.getElementById("list");

//save link
let getLinkFromLocalStorage = JSON.parse(localStorage.getItem("links"));

if (getLinkFromLocalStorage) {
  allLinks = getLinkFromLocalStorage;
  renderArr(allLinks);
}

function renderArr(arr) {
  list.innerHTML = "";
  arr.forEach((item) => {
    list.innerHTML += `
      <li><a href=${item} class="link" target="_blank">${item}</a></li>`;
  });
}

linkBtn.addEventListener("click", () => {
  let links = input.value;
  allLinks.push(links);
  input.value = "";
  console.log(allLinks);
  localStorage.setItem("links", JSON.stringify(allLinks));
  renderArr(allLinks);
});

//delete links
deleteBtn.addEventListener("click", () => {
  localStorage.clear();
  allLinks = [];
  renderArr(allLinks);
});

//save tab
tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    var activeTab = tabs[0].url;
    allLinks.push(activeTab);
    localStorage.setItem("links", JSON.stringify(allLinks));
    renderArr(allLinks);
  });
});
