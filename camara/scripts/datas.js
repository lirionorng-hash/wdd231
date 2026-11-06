const yearElement = document.querySelector('#ano-atual');
const modifiedElement = document.querySelector('#ultima-modificacao');
if (yearElement) yearElement.textContent = String(new Date().getFullYear());
if (modifiedElement) modifiedElement.textContent = document.lastModified;
