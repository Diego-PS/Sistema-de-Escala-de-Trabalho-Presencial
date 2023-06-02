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

const id = JSON.parse(atob(token.split('.')[1])).id


//=====================================================

var request1 = new XMLHttpRequest()

request1.open('GET', 'http://localhost:4000/teamleader', true)

request1.onload = function dadosDoTeamLeader() {
var allTeamLeaders = JSON.parse(this.response)

var teamLeader = allTeamLeaders.filter(function(teamLeader) {
return teamLeader.id === id; // Replace with the desired ID
});

var name = document.getElementById('_name')
var role = document.getElementById('_role')
var MOA = document.getElementById('_MOAatual')
var MPW = document.getElementById('_MPWatual')

name.textContent = teamLeader[0].name
role.textContent = teamLeader[0].role
MOA.textContent = teamLeader[0].team_rules.moa
MPW.textContent = teamLeader[0].team_rules.mpw

}

request1.send()

//=====================================================
var request2 = new XMLHttpRequest()

request2.open('GET', `http://localhost:4000/teamleader/members/${id}`, true)
request2.setRequestHeader('Authorization', token);

request2.onload = function preencheTabelas() {
    var data = JSON.parse(this.response)

    console.log(data)

    var tab1Ref = document.getElementById('_tab_nomes').getElementsByTagName('tbody')[0]
        
    data.forEach((member) => {
        var newRow1 = tab1Ref.insertRow();
                
        var a = newRow1.insertCell();

        a.textContent = member.name
    })
}

request2.send()

