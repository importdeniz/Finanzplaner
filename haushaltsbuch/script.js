const API_URL = 'https://remotestorage-706f7-default-rtdb.europe-west1.firebasedatabase.app/';


document.getElementById('entryForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const type = document.getElementById('type').value;

  const table = document.getElementById('entries');
  const row = table.insertRow();

  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);

  cell1.innerHTML = date;
  cell2.innerHTML = category;
  cell3.innerHTML = description;
  cell4.innerHTML = parseFloat(amount).toFixed(2);
  cell5.innerHTML = type;

  document.getElementById('entryForm').reset();
});