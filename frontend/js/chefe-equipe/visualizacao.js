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


/*--------------------------------------------------
--------------------------------------------------*/
var request1 = new XMLHttpRequest()

request1.open('GET', 'http://localhost:4000/teamleader', true)

var teamLeader = null
var num_members = 0

request1.onload = function dadosDoTeamLeader() {
var allTeamLeaders = JSON.parse(this.response)

teamLeader = allTeamLeaders.filter(function(teamLeader) {
return teamLeader.id === id; // Replace with the desired ID
})[0];

var name = document.getElementById('_name')
var teamName = document.getElementById('_team')
var role = document.getElementById('_role')
//var MOA = document.getElementById('_MOAatual')
//var MPW = document.getElementById('_MPWatual')

name.textContent = teamLeader.name
teamName.textContent = teamLeader.team_name
if (teamLeader.role == 'team_leader') {
    role.textContent = 'Líder'
}
//MOA.textContent = teamLeader[0].team_rules.moa
//MPW.textContent = teamLeader[0].team_rules.mpw

}

request1.send()

//=====================================================
var request2 = new XMLHttpRequest()

request2.open('GET', `http://localhost:4000/teamleader/members/${id}`, true)
request2.setRequestHeader('Authorization', token);

var change_team_schedule_obj = {}

request2.onload = function preencheTabelas() {
    var data = JSON.parse(this.response)
    num_members = data.length

    const member_names_rows_div = document.getElementsByClassName('rectangle-group')[0]
    data.forEach(member => {
        const member_name_row_div = document.createElement('div')
        member_name_row_div.className = 'rectangle'
        member_name_row_div.innerHTML = member.name
        member_names_rows_div.appendChild(member_name_row_div)
    })

    const matrix1 = document.getElementById('matrix1')
    var day_attendence_current = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 }
    for (member of data) {
        const table_row = document.createElement('tr')
        let tot = 0
        for (day of ['mon', 'tue', 'wed', 'thu', 'fri']) {
            const table_data = document.createElement('td')
            const table_data_button = document.createElement('button')
            if (member.actual_schedule[day]) {
                table_data_button.className = 'b1 clicado'
                tot++
                day_attendence_current[day]++
            } else {
                table_data_button.className = 'b1'
            }
            table_data.appendChild(table_data_button)
            table_row.appendChild(table_data)
        }
        const table_data = document.createElement('td')
        const table_data_button = document.createElement('button')
        if (tot < parseInt(teamLeader.team_rules.moa)) {
            table_data_button.className = 'b2 warn'
        } else {
            table_data_button.className = 'b2'
        }
        table_data_button.innerHTML = tot
        table_data.appendChild(table_data_button)
        table_row.appendChild(table_data)
        matrix1.appendChild(table_row)
    }

    const info_current_shift = document.getElementById('infoCurrentShift')
    const table_row_current_shift = document.createElement('tr')
    const table_row_percentage = document.createElement('tr')
    for (day of ['mon', 'tue', 'wed', 'thu', 'fri']) {
        const table_data_current_shift = document.createElement('td')
        const table_data_percentage = document.createElement('td')
        const table_data_button_current_shift = document.createElement('button')
        const table_data_button_percentage = document.createElement('button')
        if (day_attendence_current[day]*100 < parseInt(teamLeader.team_rules.mpw)*num_members) {
            table_data_button_current_shift.className = 'b2 warn'
            table_data_button_percentage.className = 'b2 warn'
        } else {
            table_data_button_current_shift.className = 'b2'
            table_data_button_percentage.className = 'b2'
        }
        table_data_button_current_shift.innerHTML = day_attendence_current[day]
        table_data_current_shift.appendChild(table_data_button_current_shift)
        table_row_current_shift.appendChild(table_data_current_shift)
        info_current_shift.appendChild(table_row_current_shift)
        table_data_button_percentage.innerHTML = parseInt(day_attendence_current[day]*100/num_members)
        table_data_percentage.appendChild(table_data_button_percentage)
        table_row_percentage.appendChild(table_data_percentage)
        info_current_shift.appendChild(table_row_percentage)
    }

    const matrix2 = document.getElementById('matrix2')
    for (member of data) {
        const table_row = document.createElement('tr')
        let tot = 0
        for (day of ['mon', 'tue', 'wed', 'thu', 'fri']) {
            const table_data = document.createElement('td')
            const table_data_button = document.createElement('button')
            if (member.desired_schedule[day]) {
                table_data_button.className = 'b1 clicado'
                tot++
            } else {
                table_data_button.className = 'b1'
            }
            table_data.appendChild(table_data_button)
            table_row.appendChild(table_data)
        }
        const table_data = document.createElement('td')
        const table_data_button = document.createElement('button')
        if (tot < parseInt(teamLeader.team_rules.moa)) {
            table_data_button.className = 'b2 warn'
        } else {
            table_data_button.className = 'b2'
        }
        table_data_button.innerHTML = tot
        table_data.appendChild(table_data_button)
        table_row.appendChild(table_data)
        matrix2.appendChild(table_row)
    }

    function toggle_factory (username, day) {
        return function () {
            const this_button = document.getElementById(`${username}-${day}`)
            const tot_button = document.getElementById(`tot:${username}`)
            const attendence_day = document.getElementById(`attendence:${day}`)
            const percentage_day = document.getElementById(`percentage:${day}`)
            change_team_schedule_obj[username][day] = !change_team_schedule_obj[username][day]
            const isOn = this_button.className == 'b4on'
            if (isOn) {
                this_button.className = 'b4off'
                tot_button.innerHTML--
                attendence_day.innerHTML--
                percentage_day.innerHTML = parseInt(attendence_day.innerHTML*100/num_members)
            } else {
                this_button.className = 'b4on'
                tot_button.innerHTML++
                attendence_day.innerHTML++
                percentage_day.innerHTML = parseInt(attendence_day.innerHTML*100/num_members)
            }
            if (tot_button.innerHTML < parseInt(teamLeader.team_rules.moa)) {
                tot_button.className = 'b2 warn'
            } else {
                tot_button.className = 'b2'
            }
            console.log(attendence_day.innerHTML*100)
            console.log(parseInt(teamLeader.team_rules.mpw)*num_members)
            if (attendence_day.innerHTML*100 < parseInt(teamLeader.team_rules.mpw)*num_members) {
                attendence_day.className = 'b2 warn'
                percentage_day.className = 'b2 warn'
            } else {
                attendence_day.className = 'b2'
                percentage_day.className = 'b2'
            }
        }
    }

    const matrix3 = document.getElementById('matrix3')
    var day_attendence_new = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 }
    for (member of data) {
        const table_row = document.createElement('tr')
        let tot = 0
        const table_data_tot = document.createElement('td')
        const table_data_tot_button = document.createElement('button')
        table_data_tot_button.id = `tot:${member.username}`
        var this_member_schedule = {}
        for (day of ['mon', 'tue', 'wed', 'thu', 'fri']) {
            const table_data = document.createElement('td')
            const table_data_button = document.createElement('button')
            if (member.actual_schedule[day]) {
                table_data_button.className = 'b4on'
                tot++
                this_member_schedule[day] = true
                day_attendence_new[day]++
            } else {
                table_data_button.className = 'b4off'
                this_member_schedule[day] = false
            }
            table_data_button.id = `${member.username}-${day}`
            table_data_button.onclick = toggle_factory(member.username, day)
            table_data.appendChild(table_data_button)
            table_row.appendChild(table_data)
        }
        change_team_schedule_obj[member.username] = this_member_schedule
        if (tot < parseInt(teamLeader.team_rules.moa)) {
            table_data_tot_button.className = 'b2 warn'
        } else {
            table_data_tot_button.className = 'b2'
        }
        table_data_tot_button.innerHTML = tot
        table_data_tot.appendChild(table_data_tot_button)
        table_row.appendChild(table_data_tot)
        matrix3.appendChild(table_row)
    }

    const info_new_shift = document.getElementById('infoNewShift')
    const table_row_new_shift = document.createElement('tr')
    const table_row_percentage_new = document.createElement('tr')
    for (day of ['mon', 'tue', 'wed', 'thu', 'fri']) {
        const table_data_new_shift = document.createElement('td')
        const table_data_percentage_new = document.createElement('td')
        const table_data_button_new_shift = document.createElement('button')
        const table_data_button_percentage_new = document.createElement('button')
        if (day_attendence_new[day]*100 < parseInt(teamLeader.team_rules.mpw)*num_members) {
            table_data_button_new_shift.className = 'b2 warn'
            table_data_button_percentage_new.className = 'b2 warn'
        } else {
            table_data_button_new_shift.className = 'b2'
            table_data_button_percentage_new.className = 'b2'
        }
        table_data_button_new_shift.innerHTML = day_attendence_new[day]
        table_data_button_new_shift.id = `attendence:${day}`
        table_data_new_shift.appendChild(table_data_button_new_shift)
        table_row_new_shift.appendChild(table_data_new_shift)
        info_new_shift.appendChild(table_row_new_shift)
        table_data_button_percentage_new.innerHTML = parseInt(day_attendence_new[day]*100/num_members)
        table_data_button_percentage_new.id = `percentage:${day}`
        table_data_percentage_new.appendChild(table_data_button_percentage_new)
        table_row_percentage_new.appendChild(table_data_percentage_new)
        info_new_shift.appendChild(table_row_percentage_new)
    }
}

request2.send()

function changeSchedule() {
    var request3 = new XMLHttpRequest()

    request3.open('POST', `http://localhost:4000/teamleader/changeschedule/${id}`, true)
    request3.setRequestHeader('Authorization', token);
    request3.setRequestHeader('Content-type', 'application/json');

    request3.onload = () => {
        window.location.href = "http://localhost:4000/visualizacao.html";
    }

    request3.send(JSON.stringify(change_team_schedule_obj))
}
