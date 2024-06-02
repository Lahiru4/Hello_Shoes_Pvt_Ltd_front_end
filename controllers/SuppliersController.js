document.getElementById('supplier_category').addEventListener('change', function () {
    var selectedValue = this.value;
    if (selectedValue !== 'S') {
        var brand = brandByCategory[selectedValue];
        var brandElement = document.getElementById('supplier_brand');
        brandElement.innerHTML = '';
        for (var i = 0; i < brand.length; i++) {
            var option = document.createElement('option');
            option.value = brand[i];
            option.text = brand[i];
            brandElement.appendChild(option);
        }
    } else if (selectedValue === 's') {
        alert('Please Select the Category');
    }
});

const brandByCategory = {
    'LOCAL': ["Please Select Brandes", "DSI", "Bata", "Gihan Shoe Mart", "Redtape", "Hameedia", "DSI Premier", "Reborn", "DI", "Ranpa Footwear", "SADS Footwear",
        "ZigZag", "Dilly & Carlo", "Hitz", "Stoneridge", "UL Wikramasinghe & Company"],
    'INTERNATIONAL': ["Please Select Brandes", "Nike", "Adidas", "Puma", "Converse", "Vans", "Reebok", "New Balance", "Timberland", "Dr. Martens", "Asics",
        "Skechers", "Clarks", "Under Armour", "Fila", "Salomon"]
};
/* save supplier data */
document.getElementById('supplierRegisterButton').addEventListener('click', function () {
    const accessToken = localStorage.getItem('accessToken');
    // Gather the form data
    const supplierData = {
        supplierCode: document.getElementById('supplier_code').value,
        name: document.getElementById('supplier_name').value,
        category: document.getElementById('supplier_category').value,
        brand: document.getElementById('supplier_brand').value,
        contactNumber: document.getElementById('supplierContactNumber').value,
        buildingNo: document.getElementById('supplier_Building_No').value,
        address: document.getElementById('supplier_address').value,
        city: document.getElementById('supplierCity').value,
        postalCode: document.getElementById('postalCode').value,
        email: document.getElementById('supplierEmail').value
    };
    console.log(supplierData)
    // Perform the POST request
    fetch('http://localhost:8088/api/v1/supplier/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + accessToken
        },
        body: JSON.stringify(supplierData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'RSP_SUCCESS') {
                clearAll();
                notify('success', 'Supplier Registered Successfully.', 'Successfully!');
            } else if (data.message === 'EMAIL_DUPLICATED') {
                notify('danger', 'Email Already Exists. Please Enter Another Email.', 'Error!');
            } else if (data.message === 'RSP_DUPLICATED') {
                notify('danger', 'Supplier Code Already Exists. Please Enter Another Supplier Code.', 'Error!');
            } else if (data.message === 'CONTACT_NUMBER_DUPLICATED') {
                notify('danger', 'Contact Number Already Exists. Please Enter Another Contact Number.', 'Error!');
            }

        })
        .catch(error => {
            notify('danger', 'Error registering supplier', 'Error!');
        });
});

/*get all data*/
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#supplierTable tbody");
    const accessToken = localStorage.getItem('accessToken');


    fetch("http://localhost:8088/api/v1/supplier/getAll", {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    })
        .then(response => response.json())
        .then(data => {
            $('#supplierTable tbody').empty();
            console.log(data.content);
            if (Array.isArray(data.content)) {
                data.content.forEach(supplier => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${supplier.supplierCode}</td>
                        <td>${supplier.name}</td>
                        <td>${supplier.category}</td>
                        <td>${supplier.brand}</td>
                        <td>${supplier.buildingNo}</td>
                        <td>${supplier.address}</td>
                        <td>${supplier.city}</td>
                        <td>${supplier.state}</td>
                        <td>${supplier.postalCode}</td>
                        <td>${supplier.contactNumber}</td>
                        <td>${supplier.email}</td>
                        <td>
                            <button class="btn btn-primary">Edit</button>
                            <button class="btn btn-danger">Delete</button>
                        </td>
                    `;

                    tableBody.appendChild(row);
                });
            } else {
                console.error("Data is not an array:", data);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});

function clearAll() {
    document.getElementById('supplier_code').value = '';
    document.getElementById('supplier_name').value = '';
    document.getElementById('supplier_category').value = 'S';
    document.getElementById('supplier_brand').value = 'S';
    document.getElementById('supplier_Building_No').value = '';
    document.getElementById('supplier_address').value = '';
    document.getElementById('supplierCity').value = '';
    document.getElementById('postalCode').value = '';
    document.getElementById('supplierEmail').value = '';
}

function notify(type, message, hed) {
    (() => {
        var area = document.getElementById("notification-area");
        let n = document.createElement("div");
        let notification = Math.random().toString(36).substr(2, 10);
        n.setAttribute("id", notification);
        n.classList.add("notification", type);
        n.innerHTML = "<div><b>" + hed + "</b></div>" + message;
        area.appendChild(n);

        let color = document.createElement("div");
        let colorid = "color" + Math.random().toString(36).substr(2, 10);
        color.setAttribute("id", colorid);
        color.classList.add("notification-color", type);
        document.getElementById(notification).appendChild(color);


        let icon = document.createElement("a");
        let iconid = "icon" + Math.random().toString(36).substr(2, 10);
        icon.setAttribute("id", iconid);
        icon.classList.add("notification-icon", type);
        document.getElementById(notification).appendChild(icon);


        let _icon = document.createElement("i");
        let _iconid = "_icon" + Math.random().toString(36).substr(2, 10);
        _icon.setAttribute("id", _iconid);

        if (type == 'success') {
            _icon.className = "fa fa-2x fa-check-circle";
        } else {
            _icon.className = "fa fa-2x fa-exclamation-circle";
        }
        document.getElementById(iconid).appendChild(_icon);
        area.style.display = 'block';
        setTimeout(() => {
            var notifications = document.getElementById("notification-area").getElementsByClassName("notification");
            for (let i = 0; i < notifications.length; i++) {
                if (notifications[i].getAttribute("id") == notification) {
                    notifications[i].remove();
                    break;
                }
            }
            if (notifications.length == 0) {
                area.style.display = 'none';
            }

        }, 3000);
    })();
}