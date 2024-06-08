var uploadItemPhoto = null;
const accessToken = localStorage.getItem('accessToken');
document.addEventListener("DOMContentLoaded", function () {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken)
    // $.ajax({
    //     url: "http://localhost:8088/api/v1/stock/getAll",
    //     type: "GET",
    //     headers: {
    //         "Authorization": "Bearer " + accessToken
    //     },
    //     success: function (data) {
    //         $('#itemTable tbody').empty();
    //         const items = data.content;
    //         items.forEach(item => {
    //             const row = `<tr>
    //                 <td class="table-plus"><img src="${item.itemPicture}" alt="Item Image" width="50" height="50"></td>
    //                 <td>${item.itemDesc}</td>
    //                 <td>${item.supplier ? item.supplier.name : 'N/A'}</td>
    //                 <td>${item.unitPriceBuy.toFixed(2)}</td>
    //                 <td>${item.unitPriceSale.toFixed(2)}</td>
    //                 <td>${item.gender}</td>
    //                 <td>${item.occasion}</td>
    //                 <td>${item.verities}</td>
    //                 <td>${item.size}</td>
    //                 <td>${item.qty}</td>
    //             </tr>`;
    //             $('#itemTable tbody').append(row);
    //         });
    //     }
    // });
});
$(document).ready(function () {
    const fileInput = document.getElementById('itemImageInput');
    fileInput.addEventListener('change', async function (event) {
        const file = event.target.files[0];
        const imgElement = $('#itemImageBox');
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = async function (e) {
                imgElement.attr('src', e.target.result);
                imgElement.attr('width', '250px');
                imgElement.attr('height', '250px');

                const base64String = await toBase64(fileInput.files[0]);
                uploadItemPhoto = base64String;
                console.log(base64String);
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    });

    function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
});

$(document).ready(function () {
    const supplierSelect = document.querySelector("#shoesSuppler");
    const accessoriessupplierSelect = document.querySelector("#accessoriesshoesSuppler");

    fetch("http://localhost:8088/api/v1/supplier/getAll", {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    })
        .then(response => response.json())
        .then(data => {
            // Clear existing options except the default "Choose..." option
            //supplierSelect.innerHTML = '<option value="0" selected="">Choose...</option>';
            console.log(data.content);
            if (Array.isArray(data.content)) {
                data.content.forEach(supplier => {
                    const option1 = document.createElement("option");
                    option1.value = supplier.supplierCode;
                    option1.textContent = supplier.name;

                    const option = document.createElement("option");
                    option.value = supplier.supplierCode;
                    option.textContent = supplier.name;
                    supplierSelect.appendChild(option1);
                    accessoriessupplierSelect.appendChild(option);
                });
            } else {
                console.error("Data is not an array:", data);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});


$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8088/api/v1/stock/countStock',
        type: 'GET',
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        success: function (data) {
            $('#itemsCode').val(data);


        },
        error: function (error) {
            console.log(data.count);
            //$('#stockCount').text('Error fetching stock count');
        }
    });


    $.ajax({
        url: 'http://localhost:8088/api/v1/stock/countStockAccessories',
        type: 'GET',
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        success: function (data) {
            $('#AccessoriesitemsCode').val(data);

        },
        error: function (error) {
            console.log(data.count);
            //$('#stockCount').text('Error fetching stock count');
        }
    });


    /*save stock*/
    $("#addStockButton").click(function () {
        const stockData = {
            itemCode: $("#itemsCode").val(),
            itemDesc: $("#itemsDescription").val(),
            supplierCode: $("#shoesSuppler").val(),
            unitPriceBuy: $("#itemsBuyPrice").val(),
            unitPriceSale: $("#itemsSellingPrice").val(),
            gender: $("#shoesGender").val(),
            occasion: $("#shoesOccasion").val(),
            verities: $("#shoesVerities").val(),
            size: $("#shoesSize").val(),
            qty: $("#itemsQty").val(),
            itemPicture: uploadItemPhoto
        };
        console.log(accessToken)
        $.ajax({
            url: "http://localhost:8088/api/v1/stock/save",
            type: "POST",
            contentType: "application/json",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: JSON.stringify(stockData),

            success: function (response) {
                alert("Stock added successfully!");
                // Optionally, you can clear the form here
                $('form')[0].reset();
            },
            error: function (error) {
                console.error("Error adding stock:", error);
                alert("Error adding stock. Please try again.");
            }
        });
    });


});

$("#addStockButtonAccessories").click(function () {
    let item1 = localStorage.getItem('accessToken');
    const itemCode = document.getElementById('AccessoriesitemsCode').value;
    const itemDesc = document.getElementById('AccessoriesitemsDescription').value;
    const supplierId = document.getElementById('accessoriesshoesSuppler').value;
    const verities = document.getElementById('Accessoriesverities').value;
    const unitPriceBuy = parseFloat(document.getElementById('AccessorieItemBye').value);
    const unitPriceSale = parseFloat(document.getElementById('AccessorieItemSell').value);
    const qty = parseInt(document.getElementById('AccessorieItemCostQty').value);

    // Create DTO object
    const itemsAccessoriesDTO = {
        itemCode: itemCode,
        itemDesc: itemDesc,
        verities: verities,
        unitPriceSale: unitPriceSale,
        unitPriceBuy: unitPriceBuy,
        qty: qty,
        supplier: supplierId

    };
    console.log(accessToken)
    $.ajax({
        url: 'http://localhost:8088/api/v1/stock/saveAccessories', // Your Spring Boot endpoint
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(itemsAccessoriesDTO),
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        success: function (response) {
             if (response.message === "RSP_SUCCESS") {
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