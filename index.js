const viewMode = document.getElementById("view-mode");
const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const timeRemaining = document.querySelector('[data-testid="test-todo-time-remaining"]');
const title = document.querySelector('[data-testid="test-todo-title"]');

const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const editForm = document.querySelector('[data-testid="test-todo-edit-form"]');

const titleInput = document.querySelector('[data-testid="test-todo-edit-title-input"]');
const descInput = document.querySelector('[data-testid="test-todo-edit-description-input"]');
const priorityInput = document.querySelector('[data-testid="test-todo-edit-priority-select"]');
const dueInput = document.querySelector('[data-testid="test-todo-edit-due-date-input"]');

const saveBtn = document.querySelector('[data-testid="test-todo-save-button"]');
const cancelBtn = document.querySelector('[data-testid="test-todo-cancel-button"]');

const statusControl = document.querySelector('[data-testid="test-todo-status-control"]');

const expandBtn = document.querySelector('[data-testid="test-todo-expand-toggle"]');
const collapsible = document.querySelector('[data-testid="test-todo-collapsible-section"]');
const overdueIndicator = document.querySelector('[data-testid="test-todo-overdue-indicator"]');

const priorityBadge = document.querySelector('[data-testid="test-todo-priority"]');
const priorityIndicator = document.querySelector('[data-testid="test-todo-priority-indicator"]');
const description = document.querySelector('[data-testid="test-todo-description"]');


description.classList.add("collapsed");

let dueDate = new Date("2026-04-17T18:00:00");
function updateTimeRemaining() {
    overdueIndicator.hidden = true;
    if (statusControl.value === "Done") {
        timeRemaining.textContent = "Completed";
        overdueIndicator.hidden = true;
        clearInterval(timer);
        return;
    }

    const now = new Date();
    const diff = dueDate - now;

    if (diff <= 0) {
        overdueIndicator.hidden = false;

        const minutes = Math.floor(Math.abs(diff) / (1000 * 60));

        if (minutes < 60) {
            timeRemaining.textContent = `Overdue by ${minutes} minutes`;
        } else {
            const hours = Math.floor(minutes / 60);
            timeRemaining.textContent = `Overdue by ${hours} hour(s)`;
        }
        return;
    } else {
        overdueIndicator.hidden = true;
    }

    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 60) {
        timeRemaining.textContent = `Due in ${minutes} minutes`;
    } else if (minutes < 1440) {
        const hours = Math.floor(minutes / 60);
        timeRemaining.textContent = `Due in ${hours} hours`;
    } else {
        const days = Math.floor(minutes / 1440);
        timeRemaining.textContent = `Due in ${days} days`;
    }
}

updateTimeRemaining();
let timer = setInterval(updateTimeRemaining, 60000);

function formatDueDate(date) {
    return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric"
    });
}

checkbox.addEventListener("change", () => {
    statusControl.classList.remove("pending", "in-progress", "done");

    if (checkbox.checked) {
        statusControl.value = "Done";
        statusControl.classList.add("done");
        title.classList.add("completed");
    } else {
        statusControl.value = "Pending";
        statusControl.classList.add("pending");
        title.classList.remove("completed");
    }
    updateTimeRemaining();
});


document.querySelector('[data-testid="test-todo-delete-button"]')
    .addEventListener("click", () => {
        alert("Delete clicked");
    });

editBtn.addEventListener("click", () => {
    viewMode.style.display = "none";
    editForm.style.display = "flex";

    titleInput.value = title.textContent;
    descInput.value = document.querySelector('[data-testid="test-todo-description"]').textContent;
});


saveBtn.addEventListener("click", () => {
    title.textContent = titleInput.value;
    document.querySelector('[data-testid="test-todo-description"]').textContent = descInput.value;

    const value = priorityInput.value.toLowerCase();

    priorityIndicator.classList.remove("high", "medium", "low");
    priorityIndicator.classList.add(value);

    priorityBadge.textContent = priorityInput.value;

    priorityBadge.classList.remove("high", "medium", "low");
    priorityBadge.classList.add(value);

    editForm.style.display = "none";
    viewMode.style.display = "block";

    if (dueInput.value) {
        dueDate = new Date(dueInput.value);


        const dueText = document.querySelector('[data-testid="test-todo-due-date"]');
        dueText.textContent = `Due ${formatDueDate(dueDate)}`;

        dueText.setAttribute("datetime", dueInput.value);
    }
    updateTimeRemaining();
});

cancelBtn.addEventListener("click", () => {
    editForm.style.display = "none";
    viewMode.style.display = "block";
});

statusControl.addEventListener("change", () => {
    const value = statusControl.value;

    statusControl.classList.remove("pending", "in-progress", "done");

    if (value === "Pending") {
        statusControl.classList.add("pending");
        checkbox.checked = false;
        title.classList.remove("completed");
    }

    else if (value === "In Progress") {
        statusControl.classList.add("in-progress");
        checkbox.checked = false;
        title.classList.remove("completed");
    }

    else if (value === "Done") {
        statusControl.classList.add("done");
        checkbox.checked = true;
        title.classList.add("completed");
    }
    updateTimeRemaining();
});



expandBtn.addEventListener("click", () => {
    const isCollapsed = description.classList.contains("collapsed");

    if (isCollapsed) {
        description.classList.remove("collapsed");
        expandBtn.textContent = "Show less";
        expandBtn.setAttribute("aria-expanded", "true");
    } else {
        description.classList.add("collapsed");
        expandBtn.textContent = "Show more";
        expandBtn.setAttribute("aria-expanded", "false");
    }
});


priorityInput.addEventListener("change", () => {
    priorityIndicator.classList.remove("high", "medium", "low");

    const value = priorityInput.value.toLowerCase();
    priorityIndicator.classList.add(value);
});