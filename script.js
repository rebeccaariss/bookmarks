const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name'); // name field in form
const websiteUrlEl = document.getElementById('website-url'); // url field in form
const bookmarksContainer = document.getElementById('bookmarks-container');

// Show modal, focus on input:
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus(); // moves cursor to first line
}

// Modal event listeners:
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false)); // "modal" ID refers to div that spans the entire window

// Handle data from form:
// For later: MDN's definition of regular expressions: patterns used to match character combinations in strings - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value; // 'let' because we need to modify this later for correct formatting
  if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
    urlValue = `https://${urlValue}`;
  }
  console.log(nameValue, urlValue);
}

// Form event listeners:
bookmarkForm.addEventListener('submit', storeBookmark);
