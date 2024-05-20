
function loadItems() {
    $.ajax({
        method: "GET",
        url: api_url+"stock/getAll/"+select_branch_Id,
        async: true,
        success: function (data) {
            if (data.code === "00") {
                $('#stock_table').empty();
                for (let item of data.content) {
                    console.log(item);
                    let id = item.id;
                    let itemName = item.itemName;
                    let itemCost = item.itemCost;
                    let itemPrice = item.itemPrice;
                    let itemProfit = item.itemProfit;

                    getImageStock(id, id + ".png");

                    var row = `<tr id=${id}><td><img id=${"image" + id} src=${itemName} width="150px" height="150px" ></td><td>${itemName}</td><td>${itemCost}</td><td>${itemPrice}</td><td>${itemProfit}</td><td style="text-align: center;width: 90px"><i class="bi bi-pencil-fill fs-5" onclick="edit(this)"></i></td><td style="text-align: center;width: 90px"><i class="bi bi-trash-fill fs-5" onclick="deleteItem(this)"></i></td></tr>`;
                    $('#stock_table').append(row);
                }
            }
        },
        error: function (xhr, exception) {
            alert("Error")
        }
    });
}
/*get image start*/
const getImageStock = async (id, image) => {
    try {
        const fileName = image; // Replace with your image file name
        console.log(fileName);
        const response = await fetch(`${api_url}stock/fileSystem/${fileName}`);
        if (response.ok) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            const imageElement = document.getElementById("image"+id);
            imageElement.src = imageUrl;
        } else {
            console.error('Image download failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching image:', error);
    }
};
/*get image end*/