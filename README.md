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

![image](https://github.com/Diego-PS/Sistema-de-Escala-de-Trabalho-Presencial/assets/54641834/7edeb355-5eb8-4f96-8661-fae0702625f6)

- Backend: Express.js (Node.js).

![image](https://github.com/Diego-PS/Sistema-de-Escala-de-Trabalho-Presencial/assets/54641834/a55eaeda-bf3c-46f6-ad73-0d777e2388db)

- Frontend: HTML, CSS, JS com uso de Bootstrap.

![image](https://github.com/Diego-PS/Sistema-de-Escala-de-Trabalho-Presencial/assets/54641834/006c62ea-557d-4c59-bbe6-a820216daa58)

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

## Documentação da arquitetura

### Por que o sistema está adotando essa arquitetura?
Para garantir o correto funcionamento das regras de negócio, implementada no sistema nos chamados services, idependente de qual banco de dados for adotado. Assim, temos a implementação dessas regras desacoplada da tecnologia de banco de dados utilizada, desse modo aumentando a coesão e favorecendo a reusabilidade do código.

### Porta de saída
A porta de saída para acessar o banco de dados trata-se da interface dos repositórios, quando chamamos um método de um repositório, estamos utilizando uma porta de saída.

<img width="631" alt="image" src="https://github.com/Diego-PS/Sistema-de-Escala-de-Trabalho-Presencial/assets/54641834/c01accff-25a5-4563-9d14-d22b7cb82035">

A porta está declarando o serviço que é esperado pelo sistema, ouo seja, o que o repositório deve receber e retornar.

<img width="631" alt="image" src="https://github.com/Diego-PS/Sistema-de-Escala-de-Trabalho-Presencial/assets/54641834/5b45c2df-0c14-47f9-bd6a-f5d13318d3f2">

Essa imagem apresenta o uso da porta (a interface que obtém as informações do banco de dados.

### Adaptador
O adaptador é a implementação concreta da porta da saída, isto é, a implementação de um repositório no nosso sistema, esse repositório irá buscar e atualizar as informações do banco de dados, para isso utilizando metódos externos à classe de domínio. A seguir um exemplo:

<img width="545" alt="Screenshot 2023-06-04 at 13 19 34" src="https://github.com/Diego-PS/Sistema-de-Escala-de-Trabalho-Presencial/assets/54641834/dcf8eef0-9894-4d31-8802-58b9709138b4">

Note que o código destacado em verde chama os métodos externos ao domínio, específicos do banco de dados que ficam num diretório separado para a database. Há um exemplo de inserção e recuperação de informação do banco. O objetivo é implementar as regras estipuladas na porta da saída, por isso ele implementa a sua respectiva interface.

### Vantagem
Com esta implementação em arquitetura hexagonal, caso haja uma mudança na tecnologia de banco de dados, por exemplo, se trocar do MongoDB para o PostgreSQL, não será necessaário realizar nenhuma mudança na classe de domínio do sistema, bastando modelar o banco dentro do diretório database e implementar o repositório (adaptador).
