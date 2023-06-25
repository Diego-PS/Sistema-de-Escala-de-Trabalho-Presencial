const org = {
  org_name: 'Organization',
  boss_name: 'Boss',
  boss_username: 'Boss',
  password: '123456',
  moa: '2',
  mpw: '40',
  new_mpw: '50'
}

interface ISchedule {
  mon, tue, wed, thu, fri: boolean,
}

class Schedule implements ISchedule {
  constructor(public mon: boolean, public tue: boolean, public wed: boolean, public thu: boolean, public fri: boolean) {}
}

interface IMember {
  name: string
  username: string
  password: string
  schedule: Schedule
}

const team = {
  team_name: 'Team',
  leader_name: 'TeamLeader',
  leader_username: 'TeamLeader',
  password: '654321',
  new_moa: '3',
  members: [] as IMember[],
  registerMember: (name: string, password: string, schedule: Schedule) => {
    login(team.leader_username, team.password)
    cy.get('input[name="name"]').type(name)
    cy.get('input[name="username"]').type(name)
    cy.get('input[name="password"]').type(password)
    cy.get('input[name="confirm_password"]').type(password)
    cy.get('button[onclick="addMember()"]').click({timeout: 500000})
    team.members.push({ name, username: name, password, schedule })
  }
}

const login = (username: string, password: string) => {
  cy.visit('/login.html')
  cy.get('#_username').type(username)
  cy.get('#_password').type(password)
  cy.get('#_login_button').click({timeout: 500000})
}

describe('Organization Boss Stories', () => {

  it('registers an organization', () => {
    cy.visit('/cadastro.html')
    cy.get('input[name="organization_name"]').type(org.org_name)
    cy.get('input[name="name"]').type(org.boss_name)
    cy.get('input[name="username"]').type(org.boss_username)
    cy.get('input[name="password"]').type(org.password)
    cy.get('input[name="confirm_password"]').type(org.password)
    cy.get('input[name="moa"]').type(org.moa)
    cy.get('input[name="mpw"]').type(org.mpw)
    cy.get('button[type="button"]').click()
    cy.url().should('include', '/login.html')
  })

  it('checks information on organization page', () => {
    login(org.boss_username, org.password)
    cy.get('#_name').should('have.text', org.boss_name)
    cy.get('#_org').should('have.text', org.org_name)
    cy.get('#_MOAatual').should('have.text', org.moa)
    cy.get('#_MPWatual').should('have.text', org.mpw)
  })

  it('creates a new team', () => {
    login(org.boss_username, org.password)
    cy.get('input[name="team_name"]').type(team.team_name)
    cy.get('input[name="name"]').type(team.leader_name)
    cy.get('input[name="username"]').type(team.leader_username)
    cy.get('input[name="password"]').type(team.password)
    cy.get('input[name="confirm_password"]').type(team.password)
    cy.get('button[onclick="formSubmit_registerTeamLeader()"]').click()
  })

  it('changes organization rules', () => {
    login(org.boss_username, org.password)
    cy.get('input[name="moa"]').type(org.moa),
    cy.get('input[name="mpw"]').type(org.new_mpw)
    cy.get('button[onclick="formSubmit_bossChangeRules()"]').click({timeout: 500000})
  })

  it('verifies organization rules change', () => {
    login(org.boss_username, org.password)
    cy.get('#_MPWatual').should('have.text', org.new_mpw)
  })
})

describe('Team Leader Stories', () => {

  it('checks information on team page', () => {
    login(team.leader_username, team.password)
    cy.get('#_orgMOA').should('have.text', org.moa)
    cy.get('#_orgMPW').should('have.text', org.new_mpw)
    cy.get('#_MOAatual').should('have.text', org.moa)
    cy.get('#_MPWatual').should('have.text', org.mpw)
  })

  it('changes team rules', () => {
    login(team.leader_username, team.password)
    cy.get('input[name="moa"]').type(team.new_moa)
    cy.get('input[name="mpw"]').type(org.new_mpw)
    cy.get('button[onclick="muda_regra()"').click({timeout: 5000000})
  })

  it('verifies team rules change', () => {
    login(team.leader_username, team.password)
    cy.get('#_MOAatual').should('have.text', team.new_moa)
    cy.get('#_MPWatual').should('have.text', org.new_mpw)
  })

  it('creates members', () => {
    team.registerMember('Member0', 'password', new Schedule(true, false, true, false, true))
    team.registerMember('Member1', 'password', new Schedule(false, true, true, true, false))
    team.registerMember('Member2', 'password', new Schedule(true, true, false, true, true))
  })

  it('changes team schedule', () => {
    login(team.leader_username, team.password)
    cy.get('a[href*="visualizacao.html"]').click({timeout: 5000000})
    team.members.forEach(member => {
      for (const day of ['mon', 'tue', 'wed', 'thu', 'fri']) {
        if (!member.schedule[day]) cy.get(`#${member.name}-${day}`).click()
      }
    })
    cy.get('button[onclick="changeSchedule()"]').click({timeout: 5000000})
    login(team.leader_username, team.password)
    cy.get('a[href*="visualizacao.html"]').click({timeout: 5000000})
  })

  it('verifies team schedule change', () => {
    login(team.leader_username, team.password)
    cy.get('a[href*="visualizacao.html"]').click({timeout: 5000000})
    cy.get('#matrix1').children().each(($tr, idx) => {
      const member = team.members[idx]
      const day_map = ['mon', 'tue', 'wed', 'thu', 'fri']
      cy.wrap($tr).children().each(($td, day_idx) => {
        if (day_idx < 5) {
          if (member.schedule[day_map[day_idx]]) {
            cy.wrap($td).find('.b1').should('exist')
            cy.wrap($td).find('.clicado').should('exist')
          } else {
            cy.wrap($td).find('.clicado').should('not.exist')
          }
        }
      })
    })
  })
})

describe('Member Stories', () => {

  it('checks information on member page', () => {
    team.members.forEach(member => {
      login(member.name, member.password)
      cy.get('#_name').should('have.text', member.name)
      cy.get('#_team').should('have.text', team.team_name)
      cy.get('#_teamLeaderName').should('have.text', team.leader_name)
      cy.get('#_teamNumberOfMembers').should('have.text', `${team.members.length}`)
      cy.get('#_teamMOA').should('have.text', team.new_moa)
      cy.get('#_teamMPW').should('have.text', org.new_mpw)
      cy.get('#team_current_shift').children().each(($tr, idx) => {
        if (idx > 0) {
          const member = team.members[idx-1]
          const day_map = ['mon', 'tue', 'wed', 'thu', 'fri']
          cy.wrap($tr).children().each(($td, day_idx) => {
            if (day_idx < 5) {
              if (member.schedule[day_map[day_idx]]) {
                cy.wrap($td).find('.b1').should('exist')
                cy.wrap($td).find('.clicado').should('exist')
              } else {
                cy.wrap($td).find('.b1').should('exist')
                cy.wrap($td).find('.clicado').should('not.exist')
              }
            }
          })
        }
      })
    })
  })

  it('changes members desired schedule', () => {
    team.members.forEach(member => {
      login(member.name, member.password)
      for (const day of ['mon', 'tue', 'wed', 'thu', 'fri']) {
        if (!member.schedule[day]) cy.get(`#status-${day}`).click()
      }
      cy.get('button[onclick="MemberChangeDesiredSchedule()"]').click({timeout: 5000000})
    })
  })

  it('verifies members desired schedule changes', () => {
    team.members.forEach(member => {
      login(member.name, member.password)
      cy.get('#_myCurrentShift').children().each(($tr, idx) => {
        if (idx == 1) {
          const day_map = ['mon', 'tue', 'wed', 'thu', 'fri']
          cy.wrap($tr).children().each(($td, day_idx) => {
            if (day_idx < 5) {
              if (member.schedule[day_map[day_idx]]) {
                cy.wrap($td).find('.b1').should('exist')
                cy.wrap($td).find('.clicado').should('exist')
              } else {
                cy.wrap($td).find('.b1').should('exist')
                cy.wrap($td).find('.clicado').should('not.exist')
              }
            }
          })
        }
      })
    })
  })
})

describe('Deletion', () => {
  
  it('deletes the organization', () => {
    login(org.boss_username, org.password)
    cy.url().should('include', '/equipes_regras.html')
    cy.visit('/delete.html')
    cy.get('#delete-btn').click()
  })

  it('verifies that is not possible to login with the organization anymore', () => {
    login(org.boss_username, org.password)
    cy.on('window:alert', (alert_message) => {
      expect(alert_message).eql('User does not exist')
    })
    cy.url().should('include', '/login.html')
  })

  it('verifies that is not possible to login with the team leader anymore', () => {
    login(team.leader_username, team.password)
    cy.on('window:alert', (alert_message) => {
      expect(alert_message).eql('User does not exist')
    })
    cy.url().should('include', '/login.html')
  })

  it('verifies that is not possible to login with the members anymore', () => {
    team.members.forEach(member => {
      login(member.name, member.password)
      cy.on('window:alert', (alert_message) => {
        expect(alert_message).eql('User does not exist')
      })
      cy.url().should('include', '/login.html')
    })
  })
})