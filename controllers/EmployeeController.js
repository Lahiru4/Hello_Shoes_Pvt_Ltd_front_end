var uploadEmployeeProfilePhoto = null;
const fileInput = document.getElementById("employeeProfileInput");
$('#employeeProfileInput').on('change', function () {
    const imgElement = $('#employeeProfilePhoto');
    const imgElementimage = $('#image');
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = async function (e) {
            imgElement.attr('src', e.target.result);
            imgElementimage.attr('src', e.target.result);
            imgElementimage.attr('width', '250px');
            imgElementimage.attr('height', '250px');

            const base64String = await toBase64(fileInput.files[0]);
            uploadEmployeeProfilePhoto = base64String;
            console.log(base64String);
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
});function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#employeeTable tbody");
    const accessToken = localStorage.getItem('accessToken');

        fetch("http://localhost:8088/api/v1/employee/getAll", {
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        })
            .then(response => response.json())
            .then(data => {
                $('#employeeTable tbody').empty();
                console.log(data.content);
                if (Array.isArray(data.content)) {
                    data.content.forEach(employee => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td class="table-plus"><img src="${employee.profilePicture}" alt="Profile Pic" style="width: 60px; height: 60px; border-radius: 50%;"></td>
                            <td>${employee.employeeCode}</td>
                            <td>${employee.name}</td>
                            <td>${employee.gender}</td>
                            <td>${employee.civilStatus}</td>
                            <td>${employee.designation}</td>
                            <td>${employee.role}</td>
                            <td>${employee.dob}</td>
                            <td>${employee.joinedDate}</td>
                            <td>${employee.attachedBranch}</td>
                            <td>${employee.buildingNo}</td>
                            <td>${employee.address}</td>
                            <td>${employee.mainCity}</td>
                            <td>${employee.postalCode}</td>
                            <td>${employee.contactNumber}</td>
                            <td>${employee.email}</td>
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

/* save */
$(document).ready(function () {
    $('#employeeRegisterButton').click(function (event) {
        event.preventDefault();

        const accessToken = localStorage.getItem('accessToken');

        var employeeData = {
            employeeCode: $('#employee_code').val(),
            name: $('#employee_name').val(),
            profilePicture: uploadEmployeeProfilePhoto,
            gender: $('#employee_gender').val(),
            civilStatus: $('#employeeStatus').val(),
            designation: $('#employeeDesignation').val(),
            role: $('#employee_role').val(),
            dob: $('#employeeDob').val(),
            joinedDate: new Date().toISOString().split('T')[0], // Assuming current date as joinedDate
            attachedBranch: $('#employee_branch').val(),
            buildingNo: $('#employee_Building_No').val(),
            address: $('#employee_address').val(),
            mainCity: $('#employeeCity').val(),
            postalCode: $('#employee_postalCode').val(),
            contactNumber: $('#employeeContactNo').val(),
            email: $('#employeeEmail').val(),
            guardianName: $('#employeeGuardianName').val(),
            guardianContact: $('#employeeGuardianContactNo').val()
        };

        $.ajax({
            url: 'http://localhost:8088/api/v1/employee/save', // Your Spring Boot endpoint
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(employeeData),
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            success: function (response) {
                if (response.message === "RSP_DUPLICATED") {
                    notify('danger', 'Employee Already Exists. Please Enter Another Employee.', 'Error!');
                } else if (response.message === "EMAIL_DUPLICATED") {
                    notify('danger', 'Email Already Exists. Please Enter Another Email.', 'Error!');
                } else if (response.message === "CONTACT_DUPLICATED") {
                    notify('danger', 'Contact Number Already Exists. Please Enter Another Contact Number.', 'Error!');
                }else if (response.message === "RSP_SUCCESS") {
                    notify('success', 'Employee Registered Successfully.', 'Success!');
                }
            },
            error: function (xhr, status, error) {
                // Handle error response
                alert('Failed to register employee.');
                console.log(error);
            }
        });
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