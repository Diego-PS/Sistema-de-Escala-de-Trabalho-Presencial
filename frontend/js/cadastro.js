function register () {
    var request = new XMLHttpRequest()
    request.open('POST', 'http://localhost:4000/boss/register', true)
    request.setRequestHeader('Content-type', 'application/json');

    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            const response = JSON.parse(request.responseText)
            if (request.status === 201) {
                window.location.href = '/login.html'
            } else {
                alert(response.msg);
                window.location.href = '/cadastro.html'
            }
        }
    }

    const registerForm = document.getElementById('_registerOrgForm')
    var formData = new FormData(registerForm)
    console.log(Object.fromEntries(formData.entries()))
    request.send(JSON.stringify(Object.fromEntries(formData.entries())))
}