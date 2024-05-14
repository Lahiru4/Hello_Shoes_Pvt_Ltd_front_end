let url="http://localhost:8088/api/v1/customer";
function saveOnAction(){

    var customerId = document.getElementById('customerId').value;
    var customerName = document.getElementById('customerName').value;
    var genderSelect = document.getElementById('customer_gender');
    var customerGender = genderSelect.options[genderSelect.selectedIndex].value;
    var customerDob = document.getElementById('customerDob').value;
    var customerAddress = document.getElementById('customerAddress').value;
    var customerCity = document.getElementById('customerCity').value;
    var customerProvince = document.getElementById('customerProvince').value;
    var customerPostalCode = document.getElementById('customerPostalCode').value;

    var option = velidate(customerId,customerName,customerGender,customerDob,customerAddress,customerCity,customerProvince,customerPostalCode);
    var data = {
        "customer_id": customerId,
        "name": customerName,
        "gender": customerGender,
        "dob": customerDob,
        "address": customerAddress,
        "city": customerCity,
        "address": customerProvince,
        "postal_code": customerPostalCode
    };

    if(option){
        var settings = {
            "url": url+"/saveCustomer",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(data,),
        };
        $.ajax(settings).done(function (response) {
            console.log(response.code);
            if (response.code === "RSP_SUCCESS") {
                clearAll();
                loaderCustomerTableData();
                notify('success', 'Your file has been save.', 'Save!');
            } else if (response.code === "RSP_DUPLICATED") {
                notify('success', 'Update  Success ', 'Success');
            } else {
                notify('danger', 'Error message', 'Error Heading');
            }
        });


    }
}

function validate(customerId,customerName,customerGender,customerDob,customerAddress,customerCity,customerProvince,customerPostalCode) {
    if (
        customerId === "" ||
        customerName === "" ||
        customerGender === "0" ||
        customerDob === "" ||
        customerAddress === "" ||
        customerCity === "" ||
        customerProvince === "" ||
        customerPostalCode === ""
    ) {
        alert("Please fill out all fields.");
        return false;
    }


    return true;
}
