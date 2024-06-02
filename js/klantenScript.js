document.addEventListener('DOMContentLoaded', function () {
    const customerContainer = document.getElementById('customers-container');

    // Aantal klanten 
    const numberOfCustomers = 64;

    // Fetch klantgegevens van Random User Generator
    fetch(`https://randomuser.me/api/?results=${numberOfCustomers}`)
        .then(response => response.json())
        .then(data => {
            const customers = data.results;

            // Toon elke klant in de flex-container
            customers.forEach(customer => {
                const customerElement = createCustomerElement(customer);
                customerContainer.appendChild(customerElement);
            });
        })
        .catch(error => console.error('Error fetching customer data:', error));

    // Functie om een klantenelement te maken
    function createCustomerElement(customer) {
        const customerDiv = document.createElement('div');
        customerDiv.classList.add('customer');

        const customerImage = document.createElement('img');
        customerImage.src = customer.picture.large;
        customerImage.alt = 'Customer Image';

        const title = customer.name.title.charAt(0).toUpperCase() + customer.name.title.slice(1);
        const fullName = `${title} ${customer.name.first} ${customer.name.last}`;
        const country = customer.location.country;

        const customerInfo = document.createElement('p');
        customerInfo.textContent = `${fullName} - ${country}`;

        // Voeg afbeelding en informatie toe aan het klantenelement
        customerDiv.appendChild(customerImage);
        customerDiv.appendChild(customerInfo);

        return customerDiv;
    }
});
