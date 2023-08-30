// Load existing entries from the API and display them on page load
window.addEventListener('DOMContentLoaded', () => {
    loadEntries();
});

const addInput = () => {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    let myObj = {
        name: name,
        email: email
    };
    
    axios.post("https://crudcrud.com/api/92283239a1e7443eb389312ff7a60dbd/appointment", myObj)
        .then((response) => {
            console.log(response);
            appendEntry(response.data);
        })
        .catch((err) => {
            console.log(err);
        });

    alert('Form data saved!');
};

const appendEntry = (entry) => {
    const entriesContainer = document.getElementById('entries-container');

    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');

    const entryDetails = document.createElement('p');
    entryDetails.textContent = `Name: ${entry.name}, Email: ${entry.email}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        deleteEntry(entry._id, entryDiv);
    });

    entryDiv.appendChild(entryDetails);
    entryDiv.appendChild(deleteButton);

    entriesContainer.appendChild(entryDiv);
};

const deleteEntry = (id, entryDiv) => {
    axios.delete(`https://crudcrud.com/api/92283239a1e7443eb389312ff7a60dbd/appointment/${id}`)
        .then((response) => {
            console.log(response);
            entryDiv.remove(); // Remove the entry from the UI
        })
        .catch((error) => {
            console.log(error);
        });
};

const loadEntries = () => {
    axios.get("https://crudcrud.com/api/92283239a1e7443eb389312ff7a60dbd/appointment")
        .then((response) => {
            console.log(response);
            response.data.forEach((entry) => {
                appendEntry(entry);
            });
        })
        .catch((error) => {
            console.log(error);
        });
};
