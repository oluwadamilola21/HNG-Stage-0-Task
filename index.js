 const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
  const title = document.querySelector('[data-testid="test-todo-title"]');
  const status = document.querySelector('[data-testid="test-todo-status"]');
  const timeRemaining = document.querySelector('[data-testid="test-todo-time-remaining"]');

  const dueDate = new Date("2026-04-17T18:00:00");

  function updateTimeRemaining() {
    const now = new Date();
    const diff = dueDate - now;

    if (diff <= 0) {
      const hours = Math.floor(Math.abs(diff) / (1000 * 60 * 60));
      timeRemaining.textContent = hours === 0 
        ? "Due now!" 
        : `Overdue by ${hours} hour(s)`;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      timeRemaining.textContent = "Due Now";
    } else if (days === 1) {
      timeRemaining.textContent = "Due tomorrow";
    } else {
      timeRemaining.textContent = `Due in ${days} days`;
    }
  }

  updateTimeRemaining();
  setInterval(updateTimeRemaining, 60000);

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      title.classList.add("completed");
      status.textContent = "Done";
      status.classList.remove("pending");
      status.classList.add("done")
    } else {
      title.classList.remove("completed");
      status.textContent = "Pending";
      status.classList.remove("done");
      status.classList.add("pending")
    }
  });

  document.querySelector('[data-testid="test-todo-edit-button"]')
    .addEventListener("click", () => {
      console.log("edit clicked");
    });

  document.querySelector('[data-testid="test-todo-delete-button"]')
    .addEventListener("click", () => {
      alert("Delete clicked");
    });