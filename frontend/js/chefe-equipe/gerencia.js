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

const teamLeaderId = JSON.parse(atob(token.split('.')[1])).id


//=====================================================

var request1 = new XMLHttpRequest()

request1.open('GET', 'http://localhost:4000/teamleader', true)

request1.onload = function dadosDoTeamLeader() {
    var allTeamLeaders = JSON.parse(this.response)

    var teamLeader = allTeamLeaders.filter(function (teamLeader) {
        return teamLeader.id === teamLeaderId; // Replace with the desired ID
    });

    console.log(teamLeader)

    var bossId = teamLeader[0].boss_id
    var boss = null

    console.log(bossId)

    var innerRequest = new XMLHttpRequest()
    innerRequest.open('GET', 'http://localhost:4000/boss', true)
    
    innerRequest.onload = function dadosDoBoss() {
        
        var allBossesData = JSON.parse(this.response)
        
        var bossData = allBossesData.filter(function (boss) {
            return boss.id === bossId; // Replace with the desired ID
        })[0];

        boss = bossData
        
        document.getElementById('_orgMOA').textContent = boss.organization_rules.moa
        document.getElementById('_orgMPW').textContent = boss.organization_rules.mpw
        
        
       var name = document.getElementById('_name')
       var role = document.getElementById('_role')
       var MOA = document.getElementById('_MOAatual')
       var MPW = document.getElementById('_MPWatual')
       
       name.textContent = teamLeader[0].name
       role.textContent = teamLeader[0].role
       MOA.textContent = teamLeader[0].team_rules.moa
       MPW.textContent = teamLeader[0].team_rules.mpw
    }
    innerRequest.send()

}

request1.send()



function muda_regra() {
    const mudar_regra_form = document.getElementById("_changeRulesForm")

    mudar_regra_form.action = `/teamleader/changerules/${teamLeaderId}`
    mudar_regra_form.submit()
}

function addMember() {
    const cadastrar_lider_form = document.getElementById("_newTeamForm")

    cadastrar_lider_form.action = `/member/register/${teamLeaderId}`
    cadastrar_lider_form.submit()
}