// Grade do primeiro certificado Web and Computer Programming.
// ATENÇÃO: ajuste completed para true APENAS para disciplinas que você concluiu.
const courses = [
  { subject: 'CSE', number: 110, title: 'Introdução à programação', credits: 2, completed: false },
  { subject: 'WDD', number: 130, title: 'Fundamentos da Web', credits: 2, completed: false },
  { subject: 'CSE', number: 111, title: 'Programação com funções', credits: 2, completed: false },
  { subject: 'CSE', number: 210, title: 'Programação com classes', credits: 2, completed: false },
  { subject: 'WDD', number: 131, title: 'Fundamentos da Web Dinâmica', credits: 2, completed: false },
  { subject: 'WDD', number: 231, title: 'Desenvolvimento Front-end I', credits: 2, completed: false }
];
const courseCards = document.querySelector('#course-cards');
const totalDisplay = document.querySelector('#credits-total');
const filterButtons = document.querySelectorAll('.filter-button');
function displayCourses(filter = 'ALL') {
  const selectedCourses = filter === 'ALL' ? courses : courses.filter(course => course.subject === filter);
  courseCards.replaceChildren();
  selectedCourses.forEach(course => {
    const card = document.createElement('article');
    card.className = `course-card${course.completed ? ' completed' : ''}`;
    const heading = document.createElement('h3');
    heading.textContent = `${course.subject} ${course.number}`;
    const description = document.createElement('p');
    description.textContent = course.title;
    const credits = document.createElement('p');
    credits.textContent = `${course.credits} créditos`;
    card.append(heading, description, credits);
    courseCards.append(card);
  });
  const totalCredits = selectedCourses.reduce((total, course) => total + course.credits, 0);
  totalDisplay.textContent = `Total de créditos exibidos: ${totalCredits}`;
}
filterButtons.forEach(button => button.addEventListener('click', () => {
  const selectedFilter = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  displayCourses(selectedFilter);
}));
displayCourses();
