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



//=====================================================
var request1 = new XMLHttpRequest()

request1.open('GET', 'http://localhost:4000/boss', true)

request1.onload = function dadosDoBoss() {
  var allBosses = JSON.parse(this.response)

  var boss = allBosses.filter(function(boss) {
    return boss.id === bossId; // Replace with the desired ID
  });
  console.log(boss)

  var name = document.getElementById('_name')
  var orgName = document.getElementById('_org')
  var role = document.getElementById('_role')
  var MOA = document.getElementById('_MOAatual')
  var MPW = document.getElementById('_MPWatual')

  name.textContent = boss[0].name
  orgName.textContent = boss[0].organization_name
  if(boss[0].role == 'boss'){
      role.textContent = 'Dono da Organização'
  }
  MOA.textContent = boss[0].organization_rules.moa
  MPW.textContent = boss[0].organization_rules.mpw

}

request1.send()


//=====================================================
var request = new XMLHttpRequest()

request.open('GET', 'http://localhost:4000/boss/teamleaders/' + bossId, true)
request.setRequestHeader('Authorization', token);

request.onload = function preencheTabelas() {
    var data = JSON.parse(this.response)

    var tab1Ref = document.getElementById('_tab1').getElementsByTagName('tbody')[0]
    var tab2Ref = document.getElementById('_tab2').getElementsByTagName('tbody')[0]
        
    data.forEach((teamLeader) => {
        var newRow1 = tab1Ref.insertRow();
        var newRow2 = tab2Ref.insertRow();
                
        var a = newRow1.insertCell();
        var b = newRow1.insertCell();
        var c = newRow1.insertCell();
        var d = newRow2.insertCell();
        var e = newRow2.insertCell();

        a.textContent = teamLeader.team_name
        b.textContent = teamLeader.name
        c.textContent = teamLeader.num_of_members.toString()
        d.textContent = teamLeader.team_rules.moa
        e.textContent = teamLeader.team_rules.mpw
    })
}

// Send request
request.send()

function formSubmit_bossChangeRules () {
    const cadastrar_lider_form = document.getElementById("_form_bossChangeRules")

    cadastrar_lider_form.action = `/boss/changerules/${bossId}` 
    cadastrar_lider_form.submit()
}

function formSubmit_registerTeamLeader () {
    const cadastrar_lider_form = document.getElementById("_newTeamForm")

    cadastrar_lider_form.action = `/teamleader/register/${bossId}` 
    cadastrar_lider_form.submit()
}
