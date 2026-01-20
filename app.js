const form = document.getElementById("exercise-form");
const list = document.getElementById("exercise-list");
const daySelect = document.getElementById("day-select");

let data = JSON.parse(localStorage.getItem("fitapp-v2")) || {};

const getDay = () => daySelect.value;

const save = () => {
  localStorage.setItem("fitapp-v2", JSON.stringify(data));
};

const render = () => {
  const day = getDay();
  list.innerHTML = "";

  const exercises = data[day] || [];
  exercises.forEach((ex, exIndex) => {
    const div = document.createElement("div");
    div.className = "exercise";

    const title = document.createElement("h3");
    title.textContent = `${ex.name} (${ex.muscle})`;

    const addSetBtn = document.createElement("button");
    addSetBtn.textContent = "+ Add Set";
    addSetBtn.onclick = () => {
      ex.sets.push({ weight: 0, reps: 0, done: false });
      save();
      render();
    };

    div.appendChild(title);
    div.appendChild(addSetBtn);

    ex.sets.forEach((set, setIndex) => {
      const setDiv = document.createElement("div");
      setDiv.className = "set" + (set.done ? " done" : "");

      const wInput = document.createElement("input");
      wInput.type = "number";
      wInput.value = set.weight;
      wInput.placeholder = "Kg";
      wInput.onchange = () => {
        set.weight = parseFloat(wInput.value);
        save();
      };

      const rInput = document.createElement("input");
      rInput.type = "number";
      rInput.value = set.reps;
      rInput.placeholder = "Reps";
      rInput.onchange = () => {
        set.reps = parseInt(rInput.value);
        save();
      };

      const check = document.createElement("input");
      check.type = "checkbox";
      check.checked = set.done;
      check.onchange = () => {
        set.done = check.checked;
        save();
        render();
      };

      setDiv.appendChild(wInput);
      setDiv.appendChild(rInput);
      setDiv.appendChild(check);

      div.appendChild(setDiv);
    });

    list.appendChild(div);
  });
};

form.onsubmit = (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const muscle = document.getElementById("muscle").value;

  const day = getDay();
  if (!data[day]) data[day] = [];

  data[day].push({ name, muscle, sets: [] });

  form.reset();
  save();
  render();
};

daySelect.onchange = render;

render();
