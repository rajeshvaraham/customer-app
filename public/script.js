// script.js

// Add event listener to handle form submission
document.getElementById('customer-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Create customer object
    const customer = { name, email, phone };

    // Send POST request to create new customer
    fetch('http://localhost:3000/api/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(response => response.json())
    .then(data => {
        // Clear form inputs
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';

        // Fetch updated customer list
        fetchCustomers();
    })
    .catch(error => console.error('Error:', error));
});

// Function to fetch customer data from the API and display it in the table
function fetchCustomers() {
    fetch('http://localhost:3000/api/customers')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#customer-table tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            data.forEach(customer => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td><button class="btn btn-danger" onclick="deleteCustomer(${customer.id})">Delete</button></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Function to delete a customer
function deleteCustomer(id) {
    fetch(`http://localhost:3000/api/customers/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => fetchCustomers()) // Refresh the customer list
    .catch(error => console.error('Error:', error));
}

// Initially fetch the customer list when the page loads
window.onload = fetchCustomers;
