/*--------------------------------------------------
--------------------------------------------------*/
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

const memberId = JSON.parse(atob(token.split('.')[1])).id

/*--------------------------------------------------
--------------------------------------------------*/

var request1 = new XMLHttpRequest()
request1.open('GET', 'http://localhost:4000/member', true)

var member = null

request1.onload = function dadosDoTeamLeader() {
    var allMembers = JSON.parse(this.response)

    member = allMembers.filter(function (member) {
        return member.id === memberId; // Replace with the desired ID
    })[0];

    var name = document.getElementById('_name')
    var role = document.getElementById('_role')

    name.textContent = member.name
    if(member.role == 'member'){
        role.textContent = 'Membro'
    }
  }

request1.send()

/*--------------------------------------------------
--------------------------------------------------*/

//=====================================================
var request2 = new XMLHttpRequest()

request2.open('GET', 'http://localhost:4000/member', true)
request2.setRequestHeader('Authorization', token);

var change_member_schedule_obj = {}

request2.onload = function preencheTabelas() {

    var data = JSON.parse(this.response)

    var memberData = data.filter(function (member) {
        return member.id === memberId; // Replace with the desired ID
    })[0];

    var teamLeaderId = member.team_leader_id
    var teamLeader = null

    var innerRequest = new XMLHttpRequest()
    innerRequest.open('GET', 'http://localhost:4000/teamleader', true)

    innerRequest.onload = function dadosDoTeamLeader() {
        var allTeamLeadersData = JSON.parse(this.response)

        var teamLeaderData = allTeamLeadersData.filter(function (teamLeader) {
            return teamLeader.id === teamLeaderId; // Replace with the desired ID
        })[0];

        teamLeader = teamLeaderData
        console.log(teamLeader)

        document.getElementById('_teamLeaderName').textContent = teamLeader.name
        document.getElementById('_teamMOA').textContent = teamLeader.team_rules.moa
        document.getElementById('_teamMPW').textContent = teamLeader.team_rules.mpw



        const matrix2 = document.getElementById('_myCurrentShift')
        const table_row = document.createElement('tr')
        let tot = 0
        for (day of ['mon', 'tue', 'wed', 'thu', 'fri']) {
            const table_data = document.createElement('td')
            const table_data_button = document.createElement('button')
            if (memberData.desired_schedule[day]) {
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

        var num_of_members = 0;

        const member_names_rows_div = document.getElementsByClassName('rectangle-group')[0]
        data.forEach(member => {
            if (member.team_leader_id === memberData.team_leader_id) {
                const member_name_row_div = document.createElement('div')
                member_name_row_div.className = 'rectangle'
                member_name_row_div.innerHTML = member.name
                member_names_rows_div.appendChild(member_name_row_div)
                num_of_members++
            }
        })

        document.getElementById('_teamNumberOfMembers').textContent = num_of_members

        const matrix1 = document.getElementById('team_current_shift')
        console.log(data)
        for (member of data) {
            if (member.team_leader_id === memberData.team_leader_id) {

                const table_row = document.createElement('tr')
                let tot = 0
                for (day of ['mon', 'tue', 'wed', 'thu', 'fri']) {
                    const table_data = document.createElement('td')
                    const table_data_button = document.createElement('button')
                    if (member.actual_schedule[day]) {
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
                //if (tot < parseInt(teamLeader.team_rules.moa)) {
                //    table_data_button.className = 'b2 warn'
                //} else {
                table_data_button.className = 'b2'
                //}
                table_data_button.innerHTML = tot
                table_data.appendChild(table_data_button)
                table_row.appendChild(table_data)
                matrix1.appendChild(table_row)
            }
        }



        function toggle_factory(day) {
            return function () {
                const this_button = document.getElementById(`status-${day}`)
                const tot_button = document.getElementById('tot')
                change_member_schedule_obj[day] = !change_member_schedule_obj[day]
                const isOn = this_button.className == 'b4on'
                if (isOn) {
                    this_button.className = 'b4off'
                    tot_button.innerHTML--
                } else {
                    this_button.className = 'b4on'
                    tot_button.innerHTML++
                }

                if (tot_button.innerHTML < parseInt(teamLeader.team_rules.moa)) {
                    tot_button.className = 'b2 warn'
                } else {
                tot_button.className = 'b2'
                }
            }
        }

        const matrix3 = document.getElementById('_myCurrentShift')
        const table_row2 = document.createElement('tr')
        let tot2 = 0
        const table_data_tot = document.createElement('td')
        const table_data_tot_button = document.createElement('button')
        table_data_tot_button.id = 'tot'
        var this_member_schedule = {}
        for (day of ['mon', 'tue', 'wed', 'thu', 'fri']) {
            const table_data = document.createElement('td')
            const table_data_button = document.createElement('button')
            if (memberData.desired_schedule[day]) {
                table_data_button.className = 'b4on'
                tot2++
                this_member_schedule[day] = true
            } else {
                table_data_button.className = 'b4off'
                this_member_schedule[day] = false
            }
            table_data_button.id = `status-${day}`
            table_data_button.onclick = toggle_factory(day)
            table_data.appendChild(table_data_button)
            table_row2.appendChild(table_data)
        }
        change_member_schedule_obj = this_member_schedule
        //if (tot2 < parseInt(teamLeader.team_rules.moa)) {
        //    table_data_tot_button.className = 'b2 warn'
        //} else {
        table_data_tot_button.className = 'b2'
        //}
        table_data_tot_button.innerHTML = tot2
        table_data_tot.appendChild(table_data_tot_button)
        table_row2.appendChild(table_data_tot)
        matrix3.appendChild(table_row2)

    }

    innerRequest.send()
}

request2.send()

function MemberChangeDesiredSchedule() {
    var request3 = new XMLHttpRequest()

    request3.open('POST', `http://localhost:4000/member/changeschedule/${memberId}`, true)
    request3.setRequestHeader('Authorization', token);
    request3.setRequestHeader('Content-type', 'application/json');

    request3.onload = () => {
        window.location.href = "http://localhost:4000/visu-e-pref.html";
    }

    request3.send(JSON.stringify(change_member_schedule_obj))
}

