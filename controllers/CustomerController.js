let url = "http://localhost:8088/api/v1/customer";

loaderCustomerTableData();

/*
function saveCustomerOnAction() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken == null) {
        window.location.href = "index.html";
    }

    var customerId = $('#customerId').val();
    var customerName = $('#customerName').val();
    var customerEmail = $('#customerEmail').val();
    var customerGender = $('#customer_gender').val();
    var customerDob = $('#customerDob').val();
    var customerAddress = $('#customerAddress').val();
    var customerCity = $('#customerCity').val();
    var customerProvince = $('#customerProvince').val();
    var customerPostalCode = $('#customerPostalCode').val();

    var option = validate(customerId, customerName, customerEmail, customerGender, customerDob, customerAddress, customerCity, customerProvince, customerPostalCode);

    var data = {
        "customer_id": customerId,
        "name": customerName,
        "email": customerEmail,
        "gender": customerGender,
        "dob": customerDob,
        "address": customerAddress,
        "city": customerCity,
        "province": customerProvince,
        "postal_code": customerPostalCode
    };

    if (option) {
        var settings = {
            "url": url + '/saveCustomer',
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            },
            "data": JSON.stringify(data,),
        };
        $.ajax(settings).done(function (response) {
            console.log(response.code);
            if (response.code === "RSP_SUCCESS") {
                clearAll();
                loaderCustomerTableData();
                notify('success', 'Your file has been save.', 'Save!');
                $('#customerEmail').css("border-color", "#d4d4d4");
                $('#customerId').css("border-color", "#d4d4d4");
            } else if (response.code === "RSP_DUPLICATED") {
                $('#customerId').css("border-color", "red");
                notify('danger', 'Customer Id Already Exists ', 'Customer Id Duplicate');
            } else if (response.code === "RSP_DUPLICATED_Email Already Exists") {
                $('#customerEmail').css("border-color", "red");
                notify('danger', 'Email Already Exists', 'Email Duplicate');
            }
        });
    }
}
*/

function clearAll() {
    document.getElementById('customerId').value = '';
    document.getElementById('customerName').value = '';
    document.getElementById('customerEmail').value = '';
/*
    document.getElementById('customerGender').value = '';
*/
    document.getElementById('customerDob').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('customerCity').value = '';
/*
    document.getElementById('customerProvince').value = '';
*/
/*
    document.getElementById('customerPostalCode').value = '';
*/
}

function validate(customerId, customerName, customerEmail, customerGender, customerDob, customerAddress, customerCity, CustomerBuildingNo, customerLand) {
    if (
        customerId === "" ||
        customerName === "" ||
        customerGender === "0" ||
        customerDob === "" ||
        customerAddress === "" ||
        customerCity === "" ||
        CustomerBuildingNo === "" ||
        customerLand === "" ||
        customerEmail === ""
    ) {
        notify('danger', 'Please fill out all fields', 'Error');
        return false;
    }


    return true;
}

function loaderCustomerTableData() {
    $('#customerTable tbody').empty();

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken == null) {
        window.location.href = "index.html";
    }

    $.ajax({
        url: url + "/getAllCustomers",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        success: function (data) {
            console.log(data);

            data.content.forEach((customer) => {
                console.log(customer)
                let id = customer.customer_id;
                let name = customer.name;
                let email = customer.email;
                let gender = customer.gender;
                let dob = customer.dob;
                let address = customer.address;
                let city = customer.city;
                let province = customer.province;
                let postalCode = customer.postalCode;
                let level = customer.level;
                let joinedDate = customer.joined_date;
                let points = customer.points;

                var row = `<tr>
                            <td class="table-plus">${id}</td>
                            <td>${name}</td>
                            <td>${email}</td>
                            <td>${gender}</td>
                            <td>${joinedDate}</td>
                            <td>${dob}</td>
                            <td>${level}</td>
                            <td>${points}</td>
                            <td>${address}</td>
                            <td>${city}</td>
                            <td>${postalCode}</td>
                            <td>
                        <div class="dropdown">
                            <a class="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle" href="#"
                               role="button" data-toggle="dropdown">
                                <i class="dw dw-more"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                                <a class="dropdown-item" ><i class="dw dw-eye"></i> View</a>
                            <a class="dropdown-item" onclick="edit("xgdfxdfg")"><i class="dw dw-edit2"></i> Edit</a>
                                <a class="dropdown-item" ><i class="dw dw-delete-3"></i> Delete</a>
                            </div>
                        </div>
                    </td>
                           </tr>`;

                // Append the row to the table body
                $('#customerTable tbody').append(row);
            })


        }
    });
}

$(document).ready(function () {
    $('#customerRegisterButton').on('click', function () {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken == null) {
            window.location.href = "index.html";
        }

        var customerId = $('#customerId').val();
        var customerName = $('#customerName').val();
        var customerEmail = $('#customerEmail').val();
        var customerGender = $('#customer_gender').val();
        var customerDob = $('#customerDob').val();
        var customerAddress = $('#customerAddress').val();
        var customerCity = $('#customerCity').val();
        var CustomerBuildingNo = $('#CustomerBuilding_No').val();
        var customerLand = $('#customerLand').val();

        var option = validate(customerId, customerName, customerEmail, customerGender, customerDob, customerAddress, customerCity, CustomerBuildingNo, customerLand);

        var data = {
            "customer_id": customerId,
            "name": customerName,
            "email": customerEmail,
            "gender": customerGender,
            "dob": customerDob,
            "address": customerAddress,
            "city": customerCity,
            "Land": customerLand,
            "Building_No": CustomerBuildingNo
        };

        if (option) {
            var settings = {
                "url": url + '/saveCustomer',
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                "data": JSON.stringify(data,),
            };
            $.ajax(settings).done(function (response) {
                console.log(response.code);
                if (response.code === "RSP_SUCCESS") {
                    notify('success', 'Your file has been save.', 'Save!');
                    clearAll();
                    loaderCustomerTableData();
                    $('#customerEmail').css("border-color", "#d4d4d4");
                    $('#customerId').css("border-color", "#d4d4d4");
                } else if (response.code === "RSP_DUPLICATED") {
                    $('#customerId').css("border-color", "red");
                    notify('danger', 'Customer Id Already Exists ', 'Customer Id Duplicate');
                } else if (response.code === "RSP_DUPLICATED_Email Already Exists") {
                    $('#customerEmail').css("border-color", "red");
                    notify('danger', 'Email Already Exists', 'Email Duplicate');
                }
            });
        }
    });
});

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