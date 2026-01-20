const form = document.getElementById('exercise-form');
const list = document.getElementById('exercise-list');

let exercises = JSON.parse(localStorage.getItem('exercises')) || [];

const saveAndRender = () => {
  localStorage.setItem('exercises', JSON.stringify(exercises));
  renderList();
};

const renderList = () => {
  list.innerHTML = '';
  exercises.forEach((ex, index) => {
    const div = document.createElement('div');
    div.className = 'exercise' + (ex.done ? ' completed' : '');
    div.innerHTML = `
      <strong>${ex.name}</strong><br>
      ${ex.category} - ${ex.duration} min
      <button class="mark-done" onclick="toggleDone(${index})">
        ${ex.done ? 'Desmarcar' : 'Concluir'}
      </button>
    `;
    list.appendChild(div);
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const duration = document.getElementById('duration').value;

  exercises.push({ name, category, duration, done: false });
  form.reset();
  saveAndRender();
});

window.toggleDone = (index) => {
  exercises[index].done = !exercises[index].done;
  saveAndRender();
};

renderList();
