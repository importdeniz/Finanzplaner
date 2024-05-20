// Define the API URL for fetching and posting entries
const API_URL = "https://remotestorage-706f7-default-rtdb.europe-west1.firebasedatabase.app/entries.json";

// Function to be executed when the page loads
function onload() {
  fetchEntries(); // Fetch entries from the API
}

// Asynchronously send data to the API
async function sendData(entry) {
  // POST request to the API URL with the entry data
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  })
    .then((response) => response.json()) // Parse response as JSON
    .then((data) => {
      console.log("Success:", data); // Log success message
      fetchEntries(); // Fetch entries after posting data
    })
    .catch((error) => {
      console.error("Error:", error); // Log error message if any
    });
}

// Function to handle form submission
function submit() {
  // Retrieve data from form fields
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  // Create an object with the entry data
  const entry = {
    date: date,
    category: category,
    description: description,
    amount: amount,
    type: type,
  };

  // Send entry data to the API
  sendData(entry);
  resetFormular(); // Reset the form after submission
}

// Function to reset the form fields
function resetFormular() {
  document.getElementById("entryForm").reset(); // Reset the form fields
  setTodayDate();
}

// Function to fetch entries from the API
function fetchEntries() {
  // Fetch entries from the API URL
  fetch(API_URL)
    .then((response) => response.json()) // Parse response as JSON
    .then((data) => {
      const table = document.getElementById("entries"); // Get reference to entries table
      table.innerHTML = ""; // Clear existing table content

      // Iterate through each entry in the data
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const entry = data[key]; // Get current entry
          addEntryToTable(entry); // Add entry to the table
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error); // Log error message if any
    });
}

// Function to add an entry to the table
function addEntryToTable(entry) {
  const table = document.getElementById("entries"); // Get reference to entries table

  // Create a new table row for the entry
  const row = document.createElement("tr");

  // Create table cells for each entry property and add content
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

  // Append the row to the table
  table.appendChild(row);
}

// Function to toggle the visibility of the side navigation bar
async function toggleNav() {
  var sidenav = document.querySelector('.sidenav'); // Get reference to the side navigation bar
  sidenav.classList.toggle('active'); // Toggle the 'active' class to show/hide the sidebar
  let main = document.getElementById("container"); // Get reference to the main content
  if (sidenav.style.left === "0px") {
    sidenav.style.left = "-200px"; // Hide the navigation bar
    main.style.left = "30%"
  } else {
    sidenav.style.left = "0px"; // Show the navigation bar
    main.style.left = "35%"
  }
}

function setTodayDate() {
    var dateInput = document.getElementById('date');
    var today = new Date();
    var day = ("0" + today.getDate()).slice(-2);
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var year = today.getFullYear();
    var todayDate = year + "-" + month + "-" + day;
    
    // Setting the value to today's date so it appears as the default value
    dateInput.value = todayDate;
    
    // Optionally, you could use placeholder, but it won't be visible in date inputs
    dateInput.setAttribute('placeholder', todayDate);
}