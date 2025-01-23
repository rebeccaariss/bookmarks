const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name'); // name field in form
const websiteUrlEl = document.getElementById('website-url'); // url field in form
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

// Show modal, focus on input:
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus(); // moves cursor to first line
}

// Modal event listeners:
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false)); // "modal" ID refers to div that spans the entire window

// Validate form:
function validate(nameValue, urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);

  if (!nameValue || !urlValue) {
    alert('Please submit values for both fields.')
    return false;
  }

  if (!urlValue.match(regex)) {
    alert('Please provide a valid URL.');
    return false;
  }

  // if valid:
  return true;
}

// Build bookmarks DOM dynamically:
function buildBookmarks() {
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark; // destructuring

    // Item:
    const item = document.createElement('div');
    item.classList.add('item');

    // Close icon:
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delete Bookmark'); // Allows you to hover over and see "Delete Bookmark"
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);

    // Favicon/link container:
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    const favicon = document.createElement('img');
    favicon.setAttribute('src', `favicon-2.png`);
    favicon.setAttribute('alt', 'Favicon');

    // Link:
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;

    // Append to bookmarks container:
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

// Fetch bookmarks:
function fetchBookmarks() {
  // Get bookmarks from localStorage only if available:
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // Create bookmarks array in localStorage:
    bookmarks = [
      {
        name: 'GitHub',
        url: 'https://github.com/rebeccaariss',
      },
    ];
  }
  buildBookmarks();
}

// Delete bookmark:
function deleteBookmark(url) {
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  // Update bookmarks array in localStorage, re-populate DOM:
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}

// Handle data from form:
// For later: MDN's definition of regular expressions: patterns used to match character combinations in strings - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value; // 'let' because we need to modify this later for correct formatting
  if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
    urlValue = `https://${urlValue}`;
  }
  
  if (!validate(nameValue, urlValue)) {
    return false;
  }

  const bookmark = {
    name: nameValue,
    url: urlValue,
  }

  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus(); // return focus to first input field
}

// Form event listeners:
bookmarkForm.addEventListener('submit', storeBookmark);

// On load, fetch bookmarks:
fetchBookmarks();
