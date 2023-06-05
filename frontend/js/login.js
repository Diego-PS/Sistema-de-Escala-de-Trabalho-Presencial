function login () {
    var request = new XMLHttpRequest()
    request.open('POST', 'http://localhost:4000/login', true)
    request.setRequestHeader('Content-type', 'application/json');

    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            const response = JSON.parse(request.responseText)
            if (request.status === 200) {
                window.location.href = response.url
            } else {
                alert(response.msg);
                window.location.href = '/login.html'
            }
        }
    }

    const loginForm = document.getElementById('_login_form')
    var formData = new FormData(loginForm)
    console.log(Object.fromEntries(formData.entries()))
    request.send(JSON.stringify(Object.fromEntries(formData.entries())))
}