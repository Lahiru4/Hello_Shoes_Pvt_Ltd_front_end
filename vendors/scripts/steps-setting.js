$(".tab-wizard").steps({
	headerTag: "h5",
	bodyTag: "section",
	transitionEffect: "fade",
	titleTemplate: '<span class="step">#index#</span> #title#',
	labels: {
		finish: "Submit"
	},
	onStepChanged: function (event, currentIndex, priorIndex) {
		$('.steps .current').prevAll().addClass('disabled');
	},
	onFinished: function (event, currentIndex) {
		$('#success-modal').modal('show');
	}
});
$(document).ready(function() {
	$(".tab-wizard2").steps({
		headerTag: "h5",
		bodyTag: "section",
		transitionEffect: "fade",
		titleTemplate: '<span class="step">#index#</span> <span class="info">#title#</span>',
		labels: {
			finish: "Submit",
			next: "Next",
			previous: "Previous",
		},
		onStepChanging: function(event, currentIndex, newIndex) {
			console.log(currentIndex, newIndex);
			if (currentIndex >= newIndex) {
				return true;
			}
			// Validate before allowing step change
			var isValid = true;
			if (currentIndex === 0) {
				var email = $("#email").val();
				isValid = validateEmail(email);
				if (!isValid) {
					notify('danger', 'Please enter a valid email address.', 'Error!');
				}
			} else if (currentIndex === 1) {
				var username = $("#username").val();
				isValid = username.trim() !== "";
				if (!isValid) {
					notify('danger', 'Username cannot be empty.', 'Error!');
				}
			} else if (currentIndex === 2) {
				var password = $("#password").val();
				var confirmPassword = $("#confirmPassword").val();
				isValid = password.trim() !== "" && password === confirmPassword;
				if (!isValid) {
					notify('danger', 'Passwords do not match or are empty.', 'Error!');
				}
			}
			return isValid;
		},
		onFinished: function(event, currentIndex) {
			var data = {
				"email": $("#email").val(),
				"username": $("#username").val(),
				"password": hashPassword($("#password").val()),
				"role": "ADMIN"
			};
			console.log(data)
			signUp(data);

		}
	});

	function validateEmail(email) {
		var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email);
	}
});
 function signUp(data) {
	console.log("printing data", data)
	var settings = {
		"url": ' http://localhost:8088/api/v1/auth/signUp',
		"method": "POST",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/json"
		},
		"data": JSON.stringify(data,),
	};
	$.ajax(settings).done(function (response) {
		console.log(response);
		if (response.message == "RSP_DUPLICATEDEMAIL") {
			notify('danger', 'Email already exists.', 'Error!');
		}else if (response.message == "RSP_DUPLICATEUSERNAME") {
			notify('danger', 'Username already exists.', 'Error!');
		} else if (response.message == "RSP_SUCCESS") {
			notify('success', 'Registration  successfully. Please login with your credentials.', 'Success!');
			$('#success-modal-btn').trigger('click');
			const tokenString = response.token;
			const [accessToken, refreshToken] = tokenString.split(':').map(token => token.trim());

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
			console.log(accessToken)
		}
	});
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