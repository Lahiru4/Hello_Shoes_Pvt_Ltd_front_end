let stockCount=0;
document.addEventListener("DOMContentLoaded", function () {
    const supplierSelect = document.querySelector("#shoesSuppler");
    const accessToken = localStorage.getItem('accessToken');

    fetch("http://localhost:8088/api/v1/supplier/getAll", {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    })
        .then(response => response.json())
        .then(data => {
            // Clear existing options except the default "Choose..." option
            supplierSelect.innerHTML = '<option value="0" selected="">Choose...</option>';
            console.log(data.content);
            if (Array.isArray(data.content)) {
                data.content.forEach(supplier => {
                    const option = document.createElement("option");
                    option.value = supplier.supplierCode;
                    option.textContent = supplier.name;
                    supplierSelect.appendChild(option);
                });
            } else {
                console.error("Data is not an array:", data);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});


$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:8088/api/v1/stock/countStock',
        type: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('accessToken')
        },
        success: function(data) {
            $('#itemsCode').val(data);
            stockCount=data;

        },
        error: function(error) {
            console.log(data.count);
            //$('#stockCount').text('Error fetching stock count');
        }
    });

    /*save stock*/
    $("#addStockButton").click(function() {
        const stockData = {
            itemCode: $("#itemsCode").val(),
            itemDescription: $("#itemsDescription").val(),
            supplierCode: $("#shoesSuppler").val(),
            itemBuyPrice: $("#itemsBuyPrice").val(),
            itemSellingPrice: $("#itemsSellingPrice").val(),
            gender: $("#shoesGender").val(),
            occasion: $("#shoesOccasion").val(),
            varieties: $("#shoesVerities").val(),
            size: $("#shoesSize").val(),
            qty: $("#itemsQty").val()
        };

        $.ajax({
            url: "http://localhost:8088/api/v1/stock/save",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(stockData),
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('accessToken')
            },
            success: function(response) {
                alert("Stock added successfully!");
                // Optionally, you can clear the form here
                $('form')[0].reset();
            },
            error: function(error) {
                console.error("Error adding stock:", error);
                alert("Error adding stock. Please try again.");
            }
        });
    });


});