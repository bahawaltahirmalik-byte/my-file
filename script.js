// Get DOM elements
const inputText = document.getElementById("inputText");
const submitBtn = document.getElementById("submitBtn");
const entryList = document.getElementById("entryList");

// Load stored entries on page load
document.addEventListener("DOMContentLoaded", loadEntries);

// Submit button click handler
submitBtn.addEventListener("click", () => {
  const text = inputText.value.trim();
  if (text === "") {
    alert("Please write something!"); // alert popup
    return;
  }

  // Save to local storage
  saveEntry(text);
  // Show alert popup
  alert("Entry added!");
  // Clear input
  inputText.value = "";
  // Add to UI
  addEntryToUI(text);
});

// Load entries from local storage and display
function loadEntries() {
  const entries = getEntries();
  entries.forEach((entry) => addEntryToUI(entry));
}

// Save a new entry into local storage
function saveEntry(entry) {
  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));
}

// Get all entries from local storage
function getEntries() {
  const entriesStr = localStorage.getItem("entries");
  if (entriesStr === null) {
    return [];
  }
  return JSON.parse(entriesStr);
}

// Add an entry to the UI list
function addEntryToUI(entry) {
  const li = document.createElement("li");
  li.textContent = entry;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "×"; // cross symbol
  deleteBtn.className = "deleteBtn";

  // Delete handler
  deleteBtn.addEventListener("click", () => {
    // Remove from UI
    li.remove();
    // Remove from storage
    removeEntryFromStorage(entry);
  });

  li.appendChild(deleteBtn);
  entryList.appendChild(li);
}

// Remove an entry from local storage
function removeEntryFromStorage(entry) {
  const entries = getEntries();
  const filteredEntries = entries.filter((e) => e !== entry);
  localStorage.setItem("entries", JSON.stringify(filteredEntries));
}
