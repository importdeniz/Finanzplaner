const API_URL =
  "https://remotestorage-706f7-default-rtdb.europe-west1.firebasedatabase.app/entries.json";

function onload() {
  fetchEntries();
}

async function sendData(entry) {
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      fetchEntries();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function submit() {
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  const entry = {
    date: date,
    category: category,
    description: description,
    amount: amount,
    type: type,
  };

  sendData(entry);
  resetFormular();
}

function resetFormular() {
  document.getElementById("entryForm").reset();
}

function fetchEntries() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const table = document.getElementById("entries");
      table.innerHTML = "";

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const entry = data[key];
          addEntryToTable(entry);
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function addEntryToTable(entry) {
  const table = document.getElementById("entries");

  const row = document.createElement("tr");

  const dateCell = document.createElement("td");
  dateCell.textContent = entry.date;
  row.appendChild(dateCell);

  const categoryCell = document.createElement("td");
  categoryCell.textContent = entry.category;
  row.appendChild(categoryCell);

  const descriptionCell = document.createElement("td");
  descriptionCell.textContent = entry.description;
  row.appendChild(descriptionCell);

  const amountCell = document.createElement("td");
  amountCell.textContent = entry.amount;
  row.appendChild(amountCell);

  const typeCell = document.createElement("td");
  typeCell.textContent = entry.type;
  row.appendChild(typeCell);

  table.appendChild(row);
}
