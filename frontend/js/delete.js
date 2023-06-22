const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const token = getCookie('token')
console.log(token)
const bossId = JSON.parse(atob(token.split('.')[1])).id
console.log(bossId)

function deleteBoss () {
    var req = new XMLHttpRequest()
    req.open('DELETE', `http://localhost:4000/boss/${bossId}`, true)
    req.setRequestHeader('Authorization', token)
    req.setRequestHeader('Content-type', 'application/json');

    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE) {
            const response = JSON.parse(req.responseText)
            if (req.status === 201) {
                window.location.href = '/login.html'
            } else {
                alert(response.msg);
                window.location.href = '/login.html'
            }
        }
    }

    req.send()
}