let selectedRow = null;

// Function to handle form submission
function onformSubmit(event) {
    event.preventDefault(); // Prevent form from submitting
    const formData = readFormData();
    if (selectedRow === null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
    saveDataToLocalStorage(); // Save data to local storage after any changes
}

// Function to read form data
function readFormData() {
    const formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["id"] = document.getElementById("id").value;
    formData["email"] = document.getElementById("email").value;
    formData["phoneno"] = document.getElementById("phoneno").value;
    return formData;
}

// Function to insert a new record in the table
function insertNewRecord(data) {
    const table = document.getElementById("student-list").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.length);

    newRow.insertCell(0).innerHTML = data.name;
    newRow.insertCell(1).innerHTML = data.id;
    newRow.insertCell(2).innerHTML = data.email;
    newRow.insertCell(3).innerHTML = data.phoneno;
    newRow.insertCell(4).innerHTML = `
        <a href="#" class="edit-btn" onclick="onEdit(this)"class>Edit</a> 
        <a href="#" class="delete-btn" onclick="onDelete(this)">Delete</a>`;
}

//    Function to reset the form after submission
function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("id").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phoneno").value = "";
    selectedRow = null;
}

    // Function to edit an existing record
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("id").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
    document.getElementById("phoneno").value = selectedRow.cells[3].innerHTML;
}

  // Function to update an existing record
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.id;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.phoneno;
}

// Function to delete a record
function onDelete(td) {
    if (confirm("Are you sure you want to delete this record?")) {
        const row = td.parentElement.parentElement;
        document.getElementById("student-list").deleteRow(row.rowIndex);
        resetForm();
        saveDataToLocalStorage();         // Update local storage after deletion
    }
}

// Function to save the student list to local storage
function saveDataToLocalStorage() {
    const table = document.getElementById("student-list").getElementsByTagName('tbody')[0];
    const students = [];
    for (let i = 0; i < table.rows.length; i++) {
        students.push({
            name: table.rows[i].cells[0].innerHTML,
            id: table.rows[i].cells[1].innerHTML,
            email: table.rows[i].cells[2].innerHTML,
            phoneno: table.rows[i].cells[3].innerHTML,
        });
    }
    localStorage.setItem("students", JSON.stringify(students));
}

// Function to load data from local storage when the page loads
function loadDataFromLocalStorage() {
    const storedStudents = JSON.parse(localStorage.getItem("students"));
    if (storedStudents) {
        storedStudents.forEach(student => {
            insertNewRecord(student);
        });
    }
}

// Load data from local storage when the page is loaded
window.onload = loadDataFromLocalStorage;
