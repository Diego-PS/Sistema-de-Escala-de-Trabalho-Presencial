# Sistema de Escala de Trabalho Presencial
Projeto em desenvolvimento para a disciplina Prática em Desenvolvimento de Software - DCC/UFMG.

## Objetivo
Facilitar a determinação de escalas de trabalho presencial de uma empresa, satisfazendo as regras de cada equipe e considerando as preferências de cada funcionário.

## Features
- Criação de equipes com seu respectivo chefe.
- Cadastro de funcionários e login.
- Indicação de preferências por horários para trabalho presencial.
- Determinação da escala pelo chefe de equipe.

## Equipe
- Diego Pereira - Backend.
- Gustavo Amaral - Frontend.
- Julia Manuela - UI/UX e Frontend.
- Lucas Magesty - Backend.

## Tecnologias
- Banco de Dados: MongoDB.
- Backend: Express.js (Node.js).
- Frontend: HTML, CSS, JS com uso de Bootstrap.

## Backlog do produto
1 - Como membro de equipe, eu gostaria de informar minha preferência de escala presencial. <br/>
2 - Como membro de equipe, eu gostaria de consultar a escala atual da equipe. <br/>
3 - Como membro de equipe, eu gostaria de solicitar a troca de escala com outro membro de equipe. * <br/>
4 - Como membro de equipe, eu gostaria de aceitar ou recusar uma solicitação de troca de escala. * <br/>
5 - Como chefe de equipe, eu gostaria de adicionar membros na minha equipe. <br/>
6 - Como chefe de equipe, eu gostaria de determinar as regras da minha equipe. <br/>
7 - Como chefe de equipe, eu gostaria de consultar as preferências de escala da minha equipe. <br/>
8 - Como chefe de equipe, eu gostaria de consultar a sugestão de escala gerada pelo sistema. * <br/>
9 - Como chefe de equipe, eu gostaria de determinar a escala da equipe. <br/>
10 - Como chefe de equipe, eu gostaria de autorizar solicitações de troca entre os membros. * <br/>
11 - Como dono da organização, eu gostaria de criar equipes e adicionar os chefes de cada equipe. <br/>
12 - Como dono da organização, eu gostaria de criar regras gerais para todas as equipes. <br/>
13 - Como dono da organização, eu gostaria de consultar a regra de cada equipe. <br/>

## Backlog do sprint
###### Tarefas Técnicas
- Instalar banco de dados (MongoDB) [Diego, Gustavo, Julia, Lucas]
- Preparar ambiente de desenvolvimento (Backend -> Instalar Node.js) [Diego, Gustavo, Julia, Lucas]

###### História 1: Como usuário do sistema, eu gostaria de ser cadastrado/realizar o login no sistema.
###### Tarefas e responsáveis:
- Modelar a representação de usuários no banco de dados [Lucas]
- Construir rotas de autenticação [Diego]
- Construir rotas de cadastro de usuário [Lucas]
- Construir a interface com o banco de dados referente a dados do usuário [Diego]
- Construir a interface da página de login [Júlia, Gustavo]
- Construir as requisições de login/cadastro para o Backend [Lucas]

###### História 2: Como membro de equipe, eu gostaria de informar minha preferência de escala presencial.
###### Tarefas e responsáveis:
- Modelar a representação de preferência de escala no banco de dados [Lucas]
- Construir rotas de edição de preferência da escala presencial [Diego]
- Construir a interface com o banco de dados referente a preferência de escala presencial [Lucas]
- Construir a interface da página de preferência de escala presencial [Júlia, Gustavo]

###### História 3: Como membro de equipe, eu gostaria de consultar a escala atual da equipe.
###### Tarefas e responsáveis:
- Construir a interface de visualização de escala presencial da equipe [Júlia, Gustavo]
- Integrar a interface com o backend [Diego]

###### História 4: Como chefe de equipe, eu gostaria de adicionar membros na minha equipe.
###### Tarefas e responsáveis:
- Construir rotas de cadastro de membro [Diego]
- Modelar a representação de membro no banco de dados [Lucas]
- Construir a interface com o banco de dados referente a dados do membro [Diego]
- Construir a interface da página de cadastro de equipe [Júlia, Gustavo]

###### História 5: Como chefe de equipe, eu gostaria de determinar as regras da minha equipe.
###### Tarefas e responsáveis:
- Construir rotas de atualização das regras de equipe [Diego]
- Construir a interface com o banco de dados referente às regras da equipe [Lucas]
- Construir a interface de atualização das regras da equipe [Júlia, Gustavo]

###### História 6: Como chefe de equipe, eu gostaria de consultar as preferências de escala da minha equipe e determinar a escala.
###### Tarefas e responsáveis:
- Construir a tabela de consultas de preferência e de determinação de escala [Júlia, Gustavo]
- Integrar a interface com o backend [Lucas]
- Construir rotas de edição de escala da equipe [Diego]
- Construir a interface com o banco de dados referente à escala da equipe [Lucas]

###### História 7: Como dono da organização, eu gostaria de criar equipes e adicionar os chefes de cada equipe.
###### Tarefas e responsáveis:
- Modelar a representação de equipes no banco de dados [Diego]
- Modelar a representação de chefe de equipe no banco de dados [Lucas]
- Construir rotas de cadastro de equipe [Diego]
- Construir rotas de cadastro de chefe de equipe [Lucas]
- Construir a interface com o banco de dados referente a dados da equipe [Diego]
- Construir a interface da página de criação de equipe [Júlia, Gustavo]

###### História 8: Como usuário, eu gostaria de cadatrar uma organização e cadatrar-me como chefe da mesma.
###### Tarefas e responsáveis:
- Modelar a representação de organização no banco de dados [Diego]
- Modelar a representação de chefe de organização no banco de dados [Lucas]
- Construir rotas de cadastro de organização [Diego]
- Construir rotas de cadastro de chefe de organização [Lucas]
- Construir a interface com o banco de dados referente a dados do chefe de organização [Diego]
- Construir a interface da página de cadastro de organização [Júlia, Gustavo]

###### História 9: Como chefe da organização, eu gostaria de criar regras gerais para todas as equipes.
###### Tarefas e responsáveis:
- Construir rotas de atualização das regras da organização [Diego]
- Construir a interface com o banco de dados referente às regras da organização [Lucas]
- Construir a interface de atualização das regras da organização [Júlia, Gustavo]