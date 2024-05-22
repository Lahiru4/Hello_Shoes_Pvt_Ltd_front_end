document.getElementById('userName').addEventListener('input', function () {
    console.log("run")
    const emailField = document.getElementById('userName');
    const email = emailField.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = 'Invalid email address';
        emailField.classList.add('error-border');
    } else {
        emailError.textContent = '';
        emailField.classList.remove('error-border');
    }
});

async function sign_In() {
    var userName = $("#userName").val();
    var password = $("#password").val();
    var hashPass = hashPassword(password);

    const response = await $.ajax({
        type: "POST",
        url: "http://localhost:8088/api/v1/auth/signIn",
        data: JSON.stringify({
            email: userName,
            password: hashPass
        }),
        contentType: "application/json"
    });
    console.log(response);
    if (response.message == "RSP_SUCCESS") {
        notify('success', 'login successfully', 'successfully!')
        const tokenString = response.token;
        const [accessToken, refreshToken] = tokenString.split(':').map(token => token.trim());

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        window.location.href = "dashboardHome.html";
    }


}

function hashPassword(password) {
    return sha256(password);
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