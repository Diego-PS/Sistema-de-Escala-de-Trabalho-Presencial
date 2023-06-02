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
//var MOA = document.getElementById('_MOAatual')
//var MPW = document.getElementById('_MPWatual')

name.textContent = teamLeader[0].name
role.textContent = teamLeader[0].role
//MOA.textContent = teamLeader[0].team_rules.moa
//MPW.textContent = teamLeader[0].team_rules.mpw

}

request1.send()

//=====================================================
var request2 = new XMLHttpRequest()

request2.open('GET', `http://localhost:4000/teamleader/members/${id}`, true)
request2.setRequestHeader('Authorization', token);

request2.onload = function preencheTabelas() {
    var true_color = "#BB86FC"
    var data = JSON.parse(this.response)

    var tab1Ref = document.getElementById('_tab_nomes').getElementsByTagName('tbody')[0]
    var tab2Ref = document.getElementById('_tab_escala_atual').getElementsByTagName('tbody')[0]
    var tab3Ref = document.getElementById('_tab_escala_desejada').getElementsByTagName('tbody')[0]

    data.forEach((member) => {
        var newRow1 = tab1Ref.insertRow();
        var newRow2 = tab2Ref.insertRow();
        var newRow3 = tab3Ref.insertRow();
                
        var t1_c1 = newRow1.insertCell();

        var t2_c1 = newRow2.insertCell();
        var t2_c2 = newRow2.insertCell();
        var t2_c3 = newRow2.insertCell();
        var t2_c4 = newRow2.insertCell();
        var t2_c5 = newRow2.insertCell();
        var t2_c6 = newRow2.insertCell();

        var t3_c1 = newRow3.insertCell();
        var t3_c2 = newRow3.insertCell();
        var t3_c3 = newRow3.insertCell();
        var t3_c4 = newRow3.insertCell();
        var t3_c5 = newRow3.insertCell();
        var t3_c6 = newRow3.insertCell();

        t1_c1.textContent = member.name

        var actual_sum = 0;
        if(member.actual_schedule.mon){t2_c1.style.backgroundColor = true_color; actual_sum++}
        if(member.actual_schedule.tue){t2_c2.style.backgroundColor = true_color; actual_sum++}
        if(member.actual_schedule.wed){t2_c3.style.backgroundColor = true_color; actual_sum++}
        if(member.actual_schedule.thu){t2_c4.style.backgroundColor = true_color; actual_sum++}
        if(member.actual_schedule.fri){t2_c5.style.backgroundColor = true_color; actual_sum++}
        t2_c6.textContent = actual_sum

        var desired_sum = 0;
        if(member.desired_schedule.mon){t3_c1.style.backgroundColor = true_color; desired_sum++}
        if(member.desired_schedule.tue){t3_c2.style.backgroundColor = true_color; desired_sum++}
        if(member.desired_schedule.wed){t3_c3.style.backgroundColor = true_color; desired_sum++}
        if(member.desired_schedule.thu){t3_c4.style.backgroundColor = true_color; desired_sum++}
        if(member.desired_schedule.fri){t3_c5.style.backgroundColor = true_color; desired_sum++}
        t3_c6.textContent = desired_sum
        

    })
}

request2.send()

