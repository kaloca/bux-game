import React, { useEffect, useState } from 'react'
import { Alert } from 'shards-react'
import Question from 'components/questions'
import Indicators from 'components/indicators'
import Announcer from 'components/announcer'
import loading from 'assets/loading.gif'
import buxlogo from 'assets/bux_370.png'
import { backdrops } from 'assets/backdrops'

import MemoryGame from '../minigames/memory/App'
import ClickGame from '../minigames/clickgame/ClickGame'
import HighLow from '../minigames/highlow/highlow'

import './main.css'
import EndScreen from 'components/endscreen'

function MainScreen() {
	const [displayIndicators, setDisplayIndicators] = useState(false)
	const [showUniDialog, setShowUniDialog] = useState(false)
	const [background, setBackground] = useState(4)
	const [isLoading, setIsLoading] = useState(false)
	const [health, setHealth] = useState(80)
	const [education, setEducation] = useState(60)
	const [money, setMoney] = useState(1000)
	const [startupScore, setStartupScore] = useState(0)
	const [studyAmount, setStudyAmount] = useState('')
	const [friends, setFriends] = useState(50)
	const [age, setAge] = useState(0)
	const [score, setScore] = useState(15)
	const [currentQuestion, setCurrentQuestion] = useState('titlescreen')
	const [startupTheme, setStartupTheme] = useState('')
	const [pyramidScheme, setPyramidScheme] = useState(false)
	const [major, setMajor] = useState('nocollege')
	const [club, setClub] = useState('no')
	const [livingSpace, setLivingSpace] = useState('parents')
	const [partyType, setPartyType] = useState('parents50')
	const [isDrunk, setIsDrunk] = useState(false)

	const doWithProbability = (n) => {
		return !!n && Math.random() <= n
	}

	const setIndicator = (indicator, value) => {
		switch (indicator) {
			case 'health':
				if (health + value >= 100) setHealth(100)
				else setHealth(health + value)
				break
			case 'education':
				if (education + value >= 100) setEducation(100)
				else setEducation(education + value)
				break
			case 'money':
				setMoney(money + value)
				break
			case 'friends':
				if (friends + value >= 100) setFriends(100)
				else setFriends(friends + value)
				break
			default:
				break
		}
	}

	const decideStartupOutcome = (testScore) => {
		const averageIndicators = (friends + health + education) / 300
		const startupTotalScore = startupScore * 1.25 * averageIndicators

		return (0.0004 * startupTotalScore ** 3) / 100
	}

	const endGame = () => {
		setDisplayIndicators(false)
		setCurrentQuestion('endscreen')
		setBackground(3)
	}

	const decidePartyScenario = () => {
		switch (partyType) {
			case 'friends10':
				setCurrentQuestion(
					doWithProbability(0.95) ? 'festa-friends-bom' : 'festa-friends-ruim'
				)
				break
			case 'friends50':
				setCurrentQuestion(
					doWithProbability(0.8) ? 'festa-friends-bom' : 'festa-friends-ruim'
				)
				break
			case 'friends200':
				setCurrentQuestion(
					doWithProbability(0.5) ? 'festa-friends-bom' : 'festa-friends-ruim'
				)
				break
			case 'alone10':
				setCurrentQuestion(
					doWithProbability(0.99) ? 'festa-alone-bom' : 'festa-alone-ruim'
				)
				break
			case 'alone50':
				setCurrentQuestion(
					doWithProbability(0.95) ? 'festa-alone-bom' : 'festa-alone-ruim'
				)
				break
			case 'alone200':
				setCurrentQuestion(
					doWithProbability(0.8) ? 'festa-alone-bom' : 'festa-alone-ruim'
				)
				break
			case 'parents10':
				setCurrentQuestion(
					doWithProbability(0.8) ? 'festa-parents-bom' : 'festa-parents-ruim'
				)
				break
			case 'parents50':
				setCurrentQuestion(
					doWithProbability(0.5) ? 'festa-parents-bom' : 'festa-parents-ruim'
				)
				break
			case 'parents200':
				setCurrentQuestion(
					doWithProbability(0.3) ? 'festa-parents-bom' : 'festa-parents-ruim'
				)
				break
			default:
				setCurrentQuestion('festa-parents-bom')
				break
		}
	}

	const resetStates = () => {
		setHealth(80)
		setEducation(60)
		setMoney(1000)
		setFriends(50)
		setAge(0)
		setBackground(4)
		setDisplayIndicators(false)
		setScore(15)
		setClub('no')
		setLivingSpace('parents')
		setMajor('nocollege')
		setStartupScore(0)
	}

	const questions = [
		{
			id: 'titlescreen',
			questionText: 'BuxLife',
			consequence: () => {
				setDisplayIndicators(true)
				setCurrentQuestion('highlow')
			},
			isTitle: true,
			isAnnouncer: true,
			buttonText: 'Começar',
		},
		{
			id: 'etapa1',
			questionText: 'Parte 1: Ensino Médio',
			consequence: () => {
				setDisplayIndicators(true)
				setCurrentQuestion('1')
			},
			//isTitle: true,
			isAnnouncer: true,
			buttonText: 'Continuar',
		},
		{
			id: 'somethingwrong',
			questionText:
				'Infelizmente, você foi atropelado por um ônibus e morreu. Quer recomeçar o jogo?',
			consequence: () => {
				resetStates()
				setCurrentQuestion('titlescreen')
			},
			isAnnouncer: true,
			buttonText: 'Recomeçar',
		},
		{
			id: 'sadness',
			questionText:
				'Você está triste demais para sair da cama. Sua única salvação pode ser a terapia, que é cara...',
			option1: {
				text: 'Fazer terapia ($6.000)',
				consequence: () => {
					doWithProbability(0.5)
						? setCurrentQuestion('17')
						: setCurrentQuestion('18')
				},
			},
			option2: {
				text: 'Desistir de tudo',
				consequence: () => {
					resetStates()
					setCurrentQuestion('titlescreen')
				},
			},
		},
		{
			id: '1',
			questionText:
				'Um pouco antes das aulas começarem, você decide ir fazer algumas compras. Qual desses produtos você escolhe?',
			option1: {
				text: 'O novo Call of Duty',
				consequence: () => {
					setIndicator('money', -50)
					setIndicator('health', 10)
					setCurrentQuestion('2')
				},
			},
			option2: {
				text: 'Uma jaqueta nova',
				consequence: () => {
					setIndicator('money', -50)
					setIndicator('friends', 15)
					setCurrentQuestion('2')
				},
			},
			option3: {
				text: 'Alguns livros pra escola',
				consequence: () => {
					setIndicator('money', -50)
					setIndicator('education', 5)
					setCurrentQuestion('2')
				},
			},
		},
		{
			id: '2',
			questionText:
				'Chegou o primeiro dia de aula! Você precisa fazer novos amigos. Em qual mesa você quer sentar para almoçar?',
			option1: {
				text: 'Mesa dos populares',
				consequence: () => {
					setIndicator('education', -5)
					setIndicator('friends', 7)
					setCurrentQuestion('3')
				},
			},
			option2: {
				text: 'Mesa dos nerds',
				consequence: () => {
					setIndicator('friends', 7)
					setIndicator('education', 5)
					setCurrentQuestion('3')
				},
			},
			option3: {
				text: 'Mesa com um pessoal da sua sala',
				consequence: () => {
					setIndicator('health', 3)
					setCurrentQuestion('3')
				},
			},
		},
		{
			id: '3',
			questionText:
				'Amanhã será a primeira prova bimestral, e você precisa estudar. Mas hoje também terá a festa do seu melhor amigo. O que você irá fazer?',
			option1: {
				text: 'Ir para a festa e tentar a sorte',
				consequence: () => {
					setIndicator('education', -10)
					setIndicator('friends', 5)
					setStudyAmount('none')
					setCurrentQuestion('memorygame')
				},
			},
			option2: {
				text: 'Ir para a festa e virar a note estudando',
				consequence: () => {
					setIndicator('friends', 5)
					setIndicator('health', -10)
					setStudyAmount('half')
					setCurrentQuestion('memorygame')
				},
			},
			option3: {
				text: 'Ficar em casa estudando',
				consequence: () => {
					setStudyAmount('full')
					setIndicator('friends', -10)
					setIndicator('education', 10)
					setCurrentQuestion('memorygame')
				},
			},
		},
		{
			id: '4',
			questionText:
				'Finalmente chegaram as férias! Como você vai aproveitar esse tempo livre?',
			option1: {
				text: 'Arranjar um trabalho de verão',
				consequence: () => {
					setScore(16)
					setIndicator('money', 500)
					setIndicator('friends', 5)
					setIndicator('health', -8)
					setCurrentQuestion('5')
				},
			},
			option2: {
				text: 'Estudar para o vestibular',
				consequence: () => {
					setScore(16)
					setIndicator('education', 10)
					setIndicator('health', -8)
					setCurrentQuestion('5')
				},
			},
			option3: {
				text: 'Viajar com seus amigos',
				consequence: () => {
					setScore(16)
					setIndicator('friends', 10)
					setIndicator('health', 10)
					setIndicator('money', -300)
					setCurrentQuestion('5')
				},
			},
		},
		{
			id: '5',
			questionText:
				'Com o vestibular chegando, você tem algumas opções para seguir:',
			option1: {
				text: 'Contratar um cursinho',
				consequence: () => {
					if ((money) => 1000) {
						setScore(17)
						setIndicator('money', -1000)
						setIndicator('friends', 3)
						setIndicator('health', -2)
						setIndicator('education', 10)
						setCurrentQuestion('6')
					}
				},
			},
			option2: {
				text: 'Dedicar 3 horas diárias para estudar em casa',
				consequence: () => {
					setScore(17)
					setIndicator('education', 10)
					setIndicator('health', -10)
					setIndicator('friends', 5)
					setCurrentQuestion('6')
				},
			},
			option3: {
				text: 'Não estudar',
				consequence: () => {
					setScore(17)
					setIndicator('friends', 10)
					setIndicator('health', 8)
					setCurrentQuestion('6')
				},
			},
		},
		{
			id: '6',
			questionText:
				'Parabéns, você se graduou na escola e já fez o vestibular. O que quer fazer de faculdade?',
			option1: {
				text: 'Universidade Federal (★★★★★)',
				consequence: () => {
					if (education >= 95) {
						setBackground(1)
						setScore(18)
						setAge(1)
						setCurrentQuestion('7')
					} else {
						showDialog()
					}
				},
			},
			option2: {
				text: 'Universidade Particular ($20.000)(★★★★)',
				consequence: () => {
					setAge(1)
					setScore(18)
					setBackground(1)
					setIndicator('money', -20000)
					setCurrentQuestion('7')
				},
			},
			option3: {
				text: 'Faculdade Pública (★★★)',
				consequence: () => {
					setAge(1)
					setScore(18)
					setBackground(1)
					setCurrentQuestion('7')
				},
			},
			option4: {
				text: 'Não fazer faculdade (★)',
				consequence: () => {
					setAge(1)
					setScore(18)
					setBackground(2)
					setCurrentQuestion('naofacul')
				},
			},
		},
		{
			id: '7',
			questionText:
				'Agora que está entrando na faculdade, poderá escolher onde morar.',
			option1: {
				text: 'Continuar morando com seus pais',
				consequence: () => {
					setIndicator('health', -10)
					setIndicator('friends', -5)
					setCurrentQuestion('8')
				},
			},
			option2: {
				text: 'Alugar um apartamento com seus amigos ($1.000 até o fim da faculdade)',
				consequence: () => {
					setIndicator('money', -1000)
					setIndicator('health', 10)
					setIndicator('friends', 10)
					setLivingSpace('friends')
					setCurrentQuestion('8')
				},
			},
			option3: {
				text: 'Alugar um apartamento sozinho próximo a faculdade ($3.000)',
				consequence: () => {
					setIndicator('money', -3000)
					setIndicator('health', 20)
					setIndicator('education', 5)
					setIndicator('friends', 5)
					setLivingSpace('alone')
					setCurrentQuestion('8')
				},
			},
		},
		{
			id: '8',
			questionText:
				'Qual meio de transporte você vai querer utilizar para ir estudar?',
			option1: {
				text: 'Comprar um carro. ($3.000)',
				consequence: () => {
					setIndicator('money', -3000)
					setIndicator('health', 10)
					setCurrentQuestion('9')
				},
			},
			option2: {
				text: 'Ir de metrô ($200 até o fim da faculdade)',
				consequence: () => {
					setIndicator('money', -200)
					setIndicator('health', -8)
					setCurrentQuestion('9')
				},
			},
			option3: {
				text: 'Bicicleta ($0)',
				consequence: () => {
					setIndicator('health', 4)
					setCurrentQuestion('9')
				},
			},
		},
		{
			id: '9',
			questionText: 'Está na hora de decidir o que você vai cursar.',
			option1: {
				text: 'Administração',
				consequence: () => {
					setMajor('adm')
					friends < 85 ? setCurrentQuestion('10') : setCurrentQuestion('11')
				},
			},
			option2: {
				text: 'Engenharia',
				consequence: () => {
					setMajor('eng')
					friends < 85 ? setCurrentQuestion('10') : setCurrentQuestion('11')
				},
			},
			option3: {
				text: 'Economia',
				consequence: () => {
					setMajor('econ')
					friends < 85 ? setCurrentQuestion('10') : setCurrentQuestion('11')
				},
			},
			option4: {
				text: 'Humanas (História, Filosofia etc)',
				consequence: () => {
					setMajor('hum')
					friends < 85 ? setCurrentQuestion('10') : setCurrentQuestion('11')
				},
			},
		},
		{
			id: '10',
			questionText:
				'Você viu muitas pessoas se inscrevendo em extracurriculares, mas não tem amigos em nenhum. O que quer fazer?',
			option1: {
				text: 'Tentar entrar no clube de teatro',
				consequence: () => {
					if (doWithProbability(0.8)) {
						setCurrentQuestion('12')
						setClub('theater')
					} else setCurrentQuestion('13')
				},
			},
			option2: {
				text: 'Tentar entrar no clube de empreendedorismo',
				consequence: () => {
					if (doWithProbability(0.2)) {
						setCurrentQuestion('12')
						setClub('entrepreneur')
					} else setCurrentQuestion('13')
				},
			},
			option3: {
				text: 'Não fazer parte de nenhum clube',
				consequence: () => {
					setCurrentQuestion('15')
				},
			},
			option4: {
				text: 'Entrar no coletivo político da faculdade.',
				consequence: () => {
					if (doWithProbability(0.95)) {
						setCurrentQuestion('14')
						setClub('politics')
					} else setCurrentQuestion('13')
				},
			},
		},
		{
			id: '11',
			questionText:
				'Seu amigo te chamou para entrar no exclusivo clube de empreendedorismo. O que vai fazer?',
			option1: {
				text: 'Aceitar o convite',
				consequence: () => {
					setCurrentQuestion('12')
				},
			},
			option2: {
				text: 'Recusar o convite',
				consequence: () => {
					setIndicator('friends', -3)
					setIndicator('health', -2)
					setCurrentQuestion('15')
				},
			},
		},
		{
			id: '12',
			questionText: 'Parabéns, você conseguiu entrar no clube!',
			consequence: () => {
				setIndicator('health', 8)
				setIndicator('friends', 10)
				setCurrentQuestion('15')
			},
			isAnnouncer: true,
		},
		{
			id: '13',
			questionText:
				'Infelizmente, você não conseguiu entrar no clube. Se fosse um pouco mais popular...',
			consequence: () => {
				setIndicator('health', -8)
				setIndicator('friends', -7)
				setCurrentQuestion('15')
			},
			isAnnouncer: true,
		},
		{
			id: '14',
			questionText: 'Você entrou no coletivo político!',
			consequence: () => {
				setIndicator('health', 8)
				setIndicator('friends', 8)
				setIndicator('education', 4)
				setCurrentQuestion('15')
			},
			isAnnouncer: true,
		},
		{
			id: '15',
			questionText:
				'Esse sábado terá a maior festa do ano. Vai querer participar?',
			option1: {
				text: 'Sim ($150)',
				consequence: () => {
					setIndicator('health', 10)
					setIndicator('friends', 7)
					setIndicator('money', -150)
					setCurrentQuestion('16')
				},
			},
			option2: {
				text: 'Não',
				consequence: () => {
					setIndicator('health', -10)
					setIndicator('friends', -2)
					setCurrentQuestion('19')
				},
			},
			option3: {
				text: 'Sim, mas ir com calma ($150)',
				consequence: () => {
					setIndicator('health', 5)
					setIndicator('friends', 4)
					setIndicator('money', -150)
					setCurrentQuestion('19')
				},
			},
		},
		{
			id: '16',
			questionText:
				'Um amigo pediu para você ajudar ele a entrar escondido na festa. O que vai fazer?',
			option1: {
				text: 'Ajudar',
				consequence: () => {
					doWithProbability(0.5)
						? setCurrentQuestion('17')
						: setCurrentQuestion('18')
				},
			},
			option2: {
				text: 'Não ajudar',
				consequence: () => {
					setIndicator('health', -3)
					setIndicator('friends', -7)
					setCurrentQuestion('19')
				},
			},
			option3: {
				text: 'Comprar o ingresso pra ele',
				consequence: () => {
					setIndicator('health', -2)
					setIndicator('friends', 10)
					setIndicator('money', -150)
					setCurrentQuestion('19')
				},
			},
		},
		{
			id: '17',
			questionText:
				'Deu tudo certo e vocês dois conseguiram entrar. E ele ainda te presenteou um jantar depois!',
			consequence: () => {
				setIndicator('health', 8)
				setIndicator('friends', 10)
				setIndicator('money', 20)
				setCurrentQuestion('19')
			},
			isAnnouncer: true,
		},
		{
			id: '18',
			questionText: 'Vocês dois foram pegos e expulsos da festa',
			consequence: () => {
				setIndicator('health', -8)
				setIndicator('friends', -6)
				setCurrentQuestion('10')
			},
			isAnnouncer: true,
		},
		{
			id: '19',
			questionText:
				'O fim da faculdade já está se aproximando. Você percebe que ainda tem a chance de graduar com honra se dedicar mais tempo aos estudos. O que decide?',
			option1: {
				text: 'Estudar mais durante o último ano',
				consequence: () => {
					setScore(20)
					setIndicator('education', 10)
					setIndicator('health', -8)
					setIndicator('friends', -5)
					setCurrentQuestion('fimfaculdade')
				},
			},
			option2: {
				text: 'Não estudar e aproveitar as amizades',
				consequence: () => {
					setScore(20)
					setIndicator('health', 8)
					setIndicator('friends', 6)
					setCurrentQuestion('fimfaculdade')
				},
			},
			option3: {
				text: 'Tentar arranjar um estágio salariado',
				consequence: () => {
					setScore(20)
					doWithProbability(0.4)
						? setCurrentQuestion('estagioA')
						: setCurrentQuestion('estagioB')
				},
			},
		},
		{
			id: 'estagioA',
			questionText:
				'Parabéns! Você foi bem na entrevista e conseguiu um estágio excelente!',
			consequence: () => {
				setIndicator('health', 7)
				setIndicator('friends', 5)
				setIndicator('money', 6000)
				setCurrentQuestion('fimfaculdade')
			},
			isAnnouncer: true,
		},
		{
			id: 'estagioB',
			questionText:
				'Você foi bem na entrevista, mas poderia ter ido um pouco melhor. Conseguiu um estágio perto da média',
			consequence: () => {
				setIndicator('health', 4)
				setIndicator('friends', 3)
				setIndicator('money', 4000)
				setCurrentQuestion('fimfaculdade')
			},
			isAnnouncer: true,
		},
		{
			id: 'fimfaculdade',
			questionText:
				'A faculdade chegou ao fim. Agora está na hora de se tornar um adulto de verdade.',
			consequence: () => {
				setScore(21)
				setAge(2)
				setBackground(2)
				setIndicator('health', 8)
				setIndicator('education', 10)
				setCurrentQuestion('buscaporempregos')
			},
			isAnnouncer: true,
		},
		{
			id: 'buscaporempregos',
			questionText:
				'A busca por empregos começa.  Você consegue uma entrevista, mas um dia antes recebe uma ligação de um amigo te chamando pra fundar uma empresa juntos. O que vai fazer?',
			option1: {
				text: 'Ir para a entrevista',
				consequence: () => {
					setIndicator('friends', -3)
					doWithProbability(0.8)
						? setCurrentQuestion('entrevista')
						: setCurrentQuestion('entrevista-fail')
				},
			},
			option2: {
				text: 'Ligar para o seu amigo e aceitar',
				consequence: () => {
					setIndicator('friends', 3)
					setCurrentQuestion('amigo-startup')
				},
			},
			// option3: {
			// 	text: 'Esperar para entrevistas melhores',
			// 	consequence: () => {
			// 		doWithProbability(0.3)
			// 			? setCurrentQuestion('deumerda')
			// 			: setCurrentQuestion('deubom')
			// 	},
			// },
		},
		{
			id: 'amigo-startup',
			questionText:
				'Bem-vindo ao mundo do empreendedorismo! Embora extremamente arriscado, pode trazer muitas recompensas! Qual área você escolhe para seu negócio?',
			option1: {
				text: 'Saúde (healthTech)',
				consequence: () => {
					setStartupScore(5)
					setStartupTheme('health')
					setCurrentQuestion('startup-2')
				},
			},
			option2: {
				text: 'Finanças (finTech)',
				consequence: () => {
					setStartupScore(10)
					setStartupTheme('finance')
					setCurrentQuestion('startup-2')
				},
			},
			option3: {
				text: 'Educação (edTech)',
				consequence: () => {
					setStartupScore(0)
					setStartupTheme('education')
					setCurrentQuestion('startup-2')
				},
			},
		},
		{
			id: 'startup-2',
			questionText:
				'Muito legal! Qual cor você quer que seja a principal da sua empresa?',
			option1: {
				text: 'Verde',
				consequence: () => {
					setCurrentQuestion('startup-3')
				},
			},
			option2: {
				text: 'Azul',
				consequence: () => {
					setStartupScore(startupScore + 5)
					setCurrentQuestion('startup-3')
				},
			},
			option3: {
				text: 'Preto',
				consequence: () => {
					setStartupScore(startupScore + 10)
					setCurrentQuestion('startup-3')
				},
			},
		},
		{
			id: 'startup-3',
			questionText: 'Muito legal! Qual vai ser sua estratégia de marketing?',
			option1: {
				text: 'TV, revistas e outdoors',
				consequence: () => {
					setStartupScore(startupScore + 5)
					setPyramidScheme(false)
					setCurrentQuestion('startup-4')
				},
			},
			option2: {
				text: 'Redes sociais',
				consequence: () => {
					setStartupScore(startupScore + 10)
					setPyramidScheme(false)
					setCurrentQuestion('startup-4')
				},
			},
			option3: {
				text: 'Esquema de pirâmide',
				consequence: () => {
					setStartupScore(65)
					setPyramidScheme(true)
					setCurrentQuestion('startup-4')
				},
			},
		},
		{
			id: 'startup-4',
			questionText: 'Em qual empresa você se inspira?',
			option1: {
				text: 'Nubank',
				consequence: () => {
					if (startupTheme === 'finance') setStartupScore(startupScore + 10)
					setCurrentQuestion(
						doWithProbability(decideStartupOutcome())
							? 'startup-bom'
							: 'startup-ruim'
					)
				},
			},
			option2: {
				text: 'Dr. Consulta',
				consequence: () => {
					if (
						startupTheme === 'health'
							? setStartupScore(startupScore + 10)
							: null
					)
						setCurrentQuestion(
							doWithProbability(decideStartupOutcome())
								? 'startup-bom'
								: 'startup-ruim'
						)
				},
			},
			option3: {
				text: 'Geekie',
				consequence: () => {
					if (
						startupTheme === 'education'
							? setStartupScore(startupScore + 10)
							: null
					)
						setCurrentQuestion(
							doWithProbability(decideStartupOutcome())
								? 'startup-bom'
								: 'startup-ruim'
						)
				},
			},
		},
		{
			id: 'startup-bom',
			questionText:
				'Sucesso! Após muito esforço, sua participação da empresa foi vendida por 20 milhões de reais. Já pode se aposentar tranquilamente!',
			consequence: () => {
				setIndicator('health', 100)
				setIndicator('friends', 100)
				setIndicator('money', 20000000)
				setCurrentQuestion('endscreen')
			},
			isAnnouncer: true,
		},
		{
			id: 'startup-ruim',
			questionText:
				'Infelizmente sua startup não deu certo... mas cabeça pra frente, isso é muito comum! ',
			consequence: () => {
				setIndicator('health', -15)
				setIndicator('friends', -5)
				setCurrentQuestion('naoemprego')
			},
			isAnnouncer: true,
		},

		//Tema: Saude 5, financeiro 10, educaçao 0,
		//
		//Estratégia de Marketing: formais 5, informais 10, organico 0
		//Cor: Verde 0, Azul 5, Preto 10
		//Em qual empresa você se inspira? DrConsulta, Geekie, 10 ou 0
		//AVG: Friends, health, education 10
		{
			id: 'entrevista',
			questionText:
				'O pessoal da empresa gostou de você. Parabéns, conseguiu seu primeiro emprego! Salário: 10000 por ano',
			consequence: () => {
				setIndicator('health', 6)
				setIndicator('friends', 4)
				setIndicator('money', 5000)
				setCurrentQuestion('emprego1-1')
			},
			isAnnouncer: true,
		},
		{
			id: 'entrevista-fail',
			questionText:
				'Infelizmente, a entrevista não foi muito bem. Eles nunca ligaram de volta...',
			consequence: () => {
				setIndicator('health', -10)
				setCurrentQuestion('naoemprego')
			},
			isAnnouncer: true,
		},
		{
			id: 'deumerda',
			questionText:
				'Infelizmente, nenhuma das entrevistas foi bem-sucedida. Eles nunca ligaram de volta...',
			consequence: () => {
				setIndicator('health', -14)
				setCurrentQuestion('naoemprego')
			},
			isAnnouncer: true,
		},
		{
			id: 'deubom',
			questionText:
				'Você conseguiu um dos melhores empregos possíveis para sua área de estudo! Salário: $15000 por ano',
			consequence: () => {
				setIndicator('health', 15)
				setIndicator('friends', 8)
				setIndicator('money', 7500)
				setCurrentQuestion('emprego1-1')
			},
			isAnnouncer: true,
		},
		{
			id: 'naoemprego',
			questionText: 'Você está desempregado.',
			option1: {
				text: 'Se esforçar mais por entrevistas e tentar a sorte',
				consequence: () => {
					setIndicator('health', -10)
					doWithProbability(0.2)
						? setCurrentQuestion('deumerda')
						: setCurrentQuestion('deubom')
				},
			},
			option2: {
				text: 'Tentar começar sua própria empresa',
				consequence: () => {
					setIndicator('health', -2)
					setCurrentQuestion('amigo-startup')
				},
			},
			option3: {
				text: 'Desistir de tudo',
				consequence: () => {
					resetStates()
					setCurrentQuestion('titlescreen')
				},
			},
		},
		{
			id: 'emprego1-1',
			questionText:
				'É a primeira semana de trabalho. Você ainda tem um relatório para terminar, mas o pessoal do escritório te chama pra sair mais cedo e jantar. O que vai fazer?',
			option1: {
				text: 'Ficar no escritório e terminar o relatório',
				consequence: () => {
					setIndicator('friends', -5)
					setIndicator('health', -10)
					setCurrentQuestion('emprego1-2')
				},
			},
			option2: {
				text: 'Falar com seu chefe e pedir mais tempo',
				consequence: () => {
					setIndicator('friends', 3)
					doWithProbability(0.9)
						? setCurrentQuestion('emprego1-1-2')
						: setCurrentQuestion('emprego1-1-1')
				},
			},
			option3: {
				text: 'Sair',
				consequence: () => {
					doWithProbability(0.3)
						? setCurrentQuestion('emprego1-1-2')
						: setCurrentQuestion('emprego1-1-1')
				},
			},
		},
		{
			id: 'emprego1-1-1',
			questionText: 'Seu chefe não ficou feliz.',
			consequence: () => {
				setIndicator('health', -10)
				setIndicator('friends', -8)
				setCurrentQuestion('emprego1-2')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego1-1-2',
			questionText:
				'Seu chefe não se importou com o pequeno atraso no relatório.',
			consequence: () => {
				setIndicator('health', 4)
				setCurrentQuestion('emprego1-2')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego1-2',
			questionText:
				'Amanhã terá uma reunião importante no trabalho, e você vai fazer uma apresentação. Como quer gastar sua noite?',
			option1: {
				text: 'Ficar em casa e se preparar',
				consequence: () => {
					setIndicator('health', -5)
					setIndicator('education', 2)
					setCurrentQuestion(
						doWithProbability(0.8) ? 'emprego1-2-bom' : 'emprego1-2-ruim'
					)
				},
			},
			option2: {
				text: 'Jogando videogame e tentar a sorte amanhã',
				consequence: () => {
					setIndicator('health', 6)
					setCurrentQuestion(
						doWithProbability(0.5) ? 'emprego1-2-bom' : 'emprego1-2-ruim'
					)
				},
			},
			option3: {
				text: 'Sair com seus amigos para esfriar a cabeça antes',
				consequence: () => {
					setIndicator('friends', 2)
					setIndicator('health', 5)
					setCurrentQuestion(
						doWithProbability(0.5) ? 'emprego1-2-bom' : 'emprego1-2-ruim'
					)
				},
			},
		},
		{
			id: 'emprego1-2-bom',
			questionText: 'A apresentação foi perfeita! Você impressionou seu chefe.',
			consequence: () => {
				setIndicator('health', 8)
				setIndicator('friends', 3)
				setCurrentQuestion('emprego1-3-1')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego1-2-ruim',
			questionText:
				'Você acabou se embolando e a apresentação deixou a desejar...',
			consequence: () => {
				setIndicator('health', -8)
				setIndicator('friends', -3)
				setCurrentQuestion('emprego1-3-1')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego1-2-1',
			questionText:
				'Chegou a hora da apresentação! Clique na tela para passar os slides no tempo certo, ou perderá a atenção da sua equipe!',
			consequence: () => {
				setCurrentQuestion('naoemprego')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego1-3-1',
			questionText:
				'Você acordou sozinho e olhou pro relógio... está atrasado pro trabalho! O que fazer?',
			option1: {
				text: 'Ligar pro seu chefe fingindo que está doente',
				consequence: () => {
					setScore(23)
					setCurrentQuestion(
						doWithProbability(0.3) ? 'emprego1-3-ruim' : 'emprego1-3-bom'
					)
				},
			},
			option2: {
				text: 'Ir ao trabalho mesmo assim',
				consequence: () => {
					setScore(23)
					setIndicator('money', 4000)
					setIndicator('health', 6)
					setCurrentQuestion('emprego1-3-honesto')
				},
			},
			option3: {
				text: 'Ir ao trabalho, mas dizer que seu carro quebrou no caminho',
				consequence: () => {
					setScore(23)
					setIndicator('money', 4000)
					setCurrentQuestion(
						doWithProbability(0.5) ? 'emprego1-3-ruim' : 'emprego1-3-bom'
					)
				},
			},
		},
		{
			id: 'emprego1-3-bom',
			questionText:
				'Ufa, seu chefe não desconfiou da mentira. Melhor que isso não aconteça de novo!',
			consequence: () => {
				setIndicator('health', 4)
				setCurrentQuestion('emprego1-4-1')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego1-3-ruim',
			questionText:
				'Seu chefe não acreditou em você e ficou furioso pela mentira!',
			consequence: () => {
				setIndicator('health', -8)
				setIndicator('friends', -6)
				setCurrentQuestion('emprego1-4-1')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego1-3-honesto',
			questionText:
				'Seu chefe não ficou tão bravo porque foi seu primeiro atraso. É só não fazer de novo...',
			consequence: () => {
				setIndicator('health', 2)
				setCurrentQuestion('emprego1-4-1')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego1-4-1',
			questionText:
				'Um amigo da faculdade e o pessoal do escritório te chamaram pra sair pra jantar no mesmo dia, o que você decide?',
			option1: {
				text: 'Sair com colegas de trabalho',
				consequence: () => {
					setIndicator('friends', 5)
					setIndicator('health', 5)
					setCurrentQuestion('emprego2-1')
				},
			},
			option2: {
				text: 'Ficar em casa',
				consequence: () => {
					setIndicator('health', -2)
					setIndicator('friends', -5)
					setCurrentQuestion('emprego2-1')
				},
			},
			option3: {
				text: 'Sair com amigo da faculdade',
				consequence: () => {
					setIndicator('friends', 3)
					setCurrentQuestion(
						doWithProbability(0.5) ? 'emprego1-4-amigo-oferta' : 'emprego2-2'
					)
				},
			},
		},
		{
			id: 'emprego1-4-amigo-oferta',
			questionText: 'Seu amigo te ofereceu uma vaga ainda melhor de trabalho!',
			consequence: () => {
				setIndicator('health', 8)
				setCurrentQuestion('oferta2')
			},
			isAnnouncer: true,
			buttonText: 'Ver Oferta',
		},
		{
			id: 'oferta2',
			questionText: 'Oferta: ',
			option1: {
				text: 'Aceitar',
				consequence: () => {
					setIndicator('friends', 5)
					setIndicator('health', 5)
					setCurrentQuestion('emprego2-1')
				},
			},
			option2: {
				text: 'Recusar',
				consequence: () => {
					setIndicator('health', -2)
					setIndicator('friends', -5)
					setCurrentQuestion('emprego2-2')
				},
			},
		},
		{
			id: 'emprego2-1',
			questionText:
				'Você decide dar um festa em casa para comemorar o novo emprego. Quantas pessoas vai convidar?',
			option1: {
				text: '10 pessoas',
				consequence: () => {
					setPartyType(livingSpace + '10')
					setCurrentQuestion('festa-1')
				},
			},
			option2: {
				text: '50 pessoas',
				consequence: () => {
					setPartyType(livingSpace + '50')
					setCurrentQuestion('festa-1')
				},
			},
			option3: {
				text: '200 pessoas',
				consequence: () => {
					setPartyType(livingSpace + '200')
					setCurrentQuestion('festa-1')
				},
			},
		},
		{
			id: 'festa-1',
			questionText:
				'A festa começa, todos estão se divertindo. Seus amigos te oferecem bebida. Você aceita?',
			option1: {
				text: 'Sim',
				consequence: () => {
					setIndicator('friends', 5)
					setIndicator('health', 5)
					setIsDrunk(true)
					decidePartyScenario()
				},
			},
			option2: {
				text: 'Não',
				consequence: () => {
					setIndicator('health', -5)
					setIndicator('friends', -2)
					setIsDrunk(false)
					decidePartyScenario()
				},
			},
		},
		{
			id: 'festa-parents-bom',
			questionText: 'Seus pais não suspeitaram de nada e a festa terminou bem!',
			consequence: () => {
				setIndicator('health', 10)
				setIndicator('friends', 6)
				setCurrentQuestion('emprego2-2')
			},
			isAnnouncer: true,
		},
		{
			id: 'festa-parents-ruim',
			questionText: !isDrunk
				? 'Seus pais chegaram mais cedo de viagem e descobriram a festa. Mas como você não bebeu, eles não ficaram bravos.'
				: 'Seus pais chegaram com você bêbado em casa e ficaram furiosos! Todos foram expulsos!',
			consequence: () => {
				setIndicator('health', isDrunk ? -10 : 5)
				setIndicator('friends', isDrunk ? -7 : 4)
				setCurrentQuestion('emprego2-2')
			},
			isAnnouncer: true,
		},
		{
			id: 'festa-friends-bom',
			questionText: 'A festa acabou bem e todos saíram felizes!',
			consequence: () => {
				setIndicator('health', 10)
				setIndicator('friends', 10)
				setCurrentQuestion('emprego2-2')
			},
			isAnnouncer: true,
		},
		{
			id: 'festa-friends-ruim',
			questionText: !isDrunk
				? 'Alguém chamou a polícia por reclamações de barulho. Mas como você estava sóbrio, pode conversar com eles e resolver tudo'
				: 'Alguém chamou a polícia por reclamações de barulho. Você estava bêbado e não soube dialogar. Todos foram expulsos e você teve que pagar uma multa!',
			consequence: () => {
				setIndicator('health', isDrunk ? -10 : 5)
				setIndicator('friends', isDrunk ? -9 : 5)
				setCurrentQuestion('emprego2-2')
			},
			isAnnouncer: true,
		},
		{
			id: 'festa-alone-bom',
			questionText: 'A festa acabou bem e todos saíram felizes!',
			consequence: () => {
				setIndicator('health', 10)
				setIndicator('friends', 9)
				setCurrentQuestion('emprego2-2')
			},
			isAnnouncer: true,
		},
		{
			id: 'festa-alone-ruim',
			questionText: !isDrunk
				? 'Alguém chamou a polícia por reclamações de barulho. Mas como você estava sóbrio, pode conversar com eles e resolver tudo'
				: 'Alguém chamou a polícia por reclamações de barulho. Você estava bêbado e não soube dialogar. Todos foram expulsos e você teve que pagar uma multa!',
			consequence: () => {
				setIndicator('health', isDrunk ? -10 : 5)
				setIndicator('friends', isDrunk ? -7 : 4)
				setCurrentQuestion('emprego2-2')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego2-2',
			questionText: 'Seu chefe te chama pra jantar. Você aceita?',
			option1: {
				text: 'Sim',
				consequence: () => {
					setScore(25)
					setIndicator('money', 8000)
					setIndicator('friends', 4)
					setCurrentQuestion('emprego2-3')
				},
			},
			option2: {
				text: 'Não',
				consequence: () => {
					setScore(25)
					setIndicator('money', 8000)
					setIndicator('friends', -3)
					setCurrentQuestion('emprego2-3')
				},
			},
		},
		{
			id: 'emprego2-3',
			questionText:
				'Analisando relatórios antigos, você percebe que cometeu um erro. Você conta ao seu chefe?',
			option1: {
				text: 'Sim',
				consequence: () => {
					setCurrentQuestion('emprego2-3-1')
				},
			},
			option2: {
				text: 'Não',
				consequence: () => {
					setIndicator('friends', -3)
					setCurrentQuestion(
						doWithProbability(0.5) ? 'emprego2-3-2' : 'emprego2-3-3'
					)
				},
			},
		},
		{
			id: 'emprego2-3-1',
			questionText:
				'Seu chefe gostou da honestidade e não ficou bravo. Boa escolha!',
			consequence: () => {
				setIndicator('health', 6)
				setIndicator('friends', 2)
				setCurrentQuestion('emprego2-4')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego2-3-2',
			questionText:
				'Seu chefe descobriu e ficou furioso que você não tinha percebido!',
			consequence: () => {
				setIndicator('health', -8)
				setIndicator('friends', -5)
				setCurrentQuestion('emprego2-4')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego2-3-3',
			questionText:
				'Ninguém nunca percebeu o seu erro, mas a empresa sofreu um prejuízo por conta dele.',
			consequence: () => {
				setIndicator('health', -4)
				setCurrentQuestion('emprego2-4')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego2-4',
			questionText:
				'Você teve uma nova ideia de negócio que pode melhorar a empresa. Quer tentar apresentar para o seu chefe?',
			option1: {
				text: 'Sim',
				consequence: () => {
					setScore(27)
					setIndicator('money', 9000)
					setIndicator('education', 4)
					setCurrentQuestion(
						doWithProbability(0.6) ? 'emprego2-4-bom' : 'emprego2-4-ruim'
					)
				},
			},
			option2: {
				text: 'Não',
				consequence: () => {
					setScore(27)
					setIndicator('money', 9000)
					setCurrentQuestion('emprego2-4-nao')
				},
			},
		},
		{
			id: 'emprego2-4-nao',
			questionText: 'Perdeu uma boa oportunidade...',
			consequence: () => {
				setIndicator('health', -7)
				setCurrentQuestion('emprego2-5')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego2-4-bom',
			questionText:
				'Seu chefe adorou a ideia! Você foi promovido como recompensa. Novo salário: 19.000 por ano',
			consequence: () => {
				setIndicator('health', 10)
				setIndicator('friends', 3)
				setIndicator('money', 10000)
				setCurrentQuestion('emprego2-6')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego2-4-ruim',
			questionText:
				'Seu chefe não gostou muito da ideia, mas pelo menos reconheceu seu esforço...',
			consequence: () => {
				setIndicator('health', -2)
				setIndicator('friends', 1)
				setCurrentQuestion('emprego2-5')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego2-5',
			questionText:
				'Você percebe um movimento no mercado que possivelmente retornará 50% de lucro sobre qualquer investimento. O que você faz?',
			option1: {
				text: 'Investe 10.000',
				consequence: () => {
					setIndicator('money', -10000)
					setCurrentQuestion(
						doWithProbability(0.6) ? 'emprego2-5-1' : 'emprego2-5-2'
					)
				},
			},
			option2: {
				text: 'Investe 5.000',
				consequence: () => {
					setIndicator('money', -5000)
					setCurrentQuestion(
						doWithProbability(0.6) ? 'emprego2-5-1-1' : 'emprego2-5-2'
					)
				},
			},
			option3: {
				text: 'Não investe nada',
				consequence: () => {
					setIndicator('health', -2)
					setCurrentQuestion('endscreen')
				},
			},
		},
		{
			id: 'emprego2-5-1',
			questionText: 'Seu investimento deu certo, parabéns!',
			consequence: () => {
				setIndicator('health', 8)
				setIndicator('money', 15000)
				setCurrentQuestion('endscreen')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego2-5-1-1',
			questionText: 'Seu investimento deu certo, parabéns!',
			consequence: () => {
				setIndicator('health', 8)
				setIndicator('money', 7500)
				setCurrentQuestion('endscreen')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego2-5-2',
			questionText:
				'Seu investimento deu errado. Mais sensatez da próxima vez...',
			consequence: () => {
				setIndicator('health', -10)
				setCurrentQuestion('endscreen')
			},
			isAnnouncer: true,
		},
		{
			id: 'emprego2-6',
			questionText:
				'Seu amigo te liga pedindo ajuda, ele precisa de $5.000. O que você faz?',
			option1: {
				text: 'Aceita o pedido',
				consequence: () => {
					setIndicator('money', -5000)
					setIndicator('friends', 5)
					setCurrentQuestion(
						doWithProbability(0.7) ? 'emprego2-6-1' : 'emprego2-5'
					)
				},
			},
			option2: {
				text: 'Não aceita o pedido',
				consequence: () => {
					setIndicator('friends', -5)
					setCurrentQuestion('emprego2-5')
				},
			},
		},
		{
			id: 'emprego2-6-1',
			questionText:
				'Você ajuda seu amigo e em troca ele te oferece uma vaga nova de emprego! Salário: $30.000 por ano',
			option1: {
				text: 'Aceitar',
				consequence: () => {
					setAge(age + 2)
					setIndicator('money', 20000)
					setIndicator('friends', 8)
					setIndicator('health', 10)
					setCurrentQuestion('emprego2-5')
				},
			},
			option2: {
				text: 'Recusar',
				consequence: () => {
					setAge(age + 2)
					setIndicator('health', 4)
					setIndicator('friends', -1)
					setCurrentQuestion('emprego2-5')
				},
			},
		},
		{
			id: 'negotiationsuccess',
			questionText:
				'Você conseguiu convencer seu chefe a aumentar seu salário!',
			consequence: () => {
				setIndicator('health', 8)
				setCurrentQuestion('emprego2-1')
			},
			isAnnouncer: true,
		},
	]

	useEffect(() => {
		if (health < 30) {
			setCurrentQuestion('sadness')
		}
		setIsLoading(true)
		let timer = setTimeout(
			() => setIsLoading(false),
			Math.floor(Math.random() * (1200 - 500 + 1) + 500)
		)

		return () => {
			clearTimeout(timer)
		} // setTimeout(setIsLoading(false), 3000)
	}, [currentQuestion, health])

	const createQuestionWithId = (id) => {
		if (id === 'memorygame') {
			return (
				<MemoryGame
					moveAhead={(moves) => {
						switch (moves) {
							case 'A':
								setIndicator('education', 8)
								setIndicator('health', 8)
								break
							case 'B':
								setIndicator('education', 5)
								setIndicator('health', 4)
								break
							case 'C':
								setIndicator('education', 1)
								setIndicator('health', -4)
								break
							case 'D':
								setIndicator('education', -4)
								setIndicator('health', -8)
								break
							default:
								setIndicator('education', -10)
								setIndicator('health', -10)
								break
						}
						setCurrentQuestion('4')
					}}
					handicap={studyAmount === 'none' ? [null] : [2, 7]}
				/>
			)
		}

		if (id === 'clickgame') {
			return <ClickGame moveAhead={() => setCurrentQuestion('7')} />
		}

		if (id === 'endscreen') {
			if (localStorage.getItem('highScore') === undefined) {
				localStorage.setItem('highScore', money)
			} else if (parseInt(localStorage.getItem('highScore')) < money) {
				localStorage.setItem('highScore', money)
			}
			return (
				<EndScreen
					money={money}
					highScore={parseInt(localStorage.getItem('highScore'))}
					consequence={() => {
						localStorage.setItem('highScore', money)
						resetStates()
						setCurrentQuestion('titlescreen')
					}}
				/>
			)
		}

		if (id === 'highlow') {
			return (
				<HighLow
					moveAhead={() => setCurrentQuestion('7')}
					playHighLowAgain={() => {
						setIndicator('health', -5)
						setIndicator('friends', -5)
					}}
					winNegotiation={() => {
						setCurrentQuestion('negotiationsuccess')
					}}
				/>
			)
		}

		const question =
			questions.find((q) => q.id === id) ||
			questions.find((q) => q.id === 'somethingwrong')

		if (question.isAnnouncer !== undefined) {
			return (
				<Announcer
					text={question.questionText}
					consequence={question.consequence}
					buttonText={
						question.buttonText !== undefined
							? question.buttonText
							: 'Continuar'
					}
					isTitle={question.isTitle}
				/>
			)
		}

		if (question.option3 === undefined) {
			return (
				<Question
					question={question.questionText}
					option1={question.option1}
					option2={question.option2}
				/>
			)
		}

		if (question.option4 !== undefined) {
			return (
				<Question
					question={question.questionText}
					option1={question.option1}
					option2={question.option2}
					option3={question.option3}
					fourthQuestion
					option4={question.option4}
				/>
			)
		}

		return (
			<Question
				question={question.questionText}
				option1={question.option1}
				option2={question.option2}
				option3={question.option3}
			/>
		)
	}

	const showDialog = () => {
		setShowUniDialog(true)
		setTimeout(() => {
			setShowUniDialog(false)
		}, 2000)
	}

	return (
		<div
			class='root'
			style={{
				backgroundImage: `url(${backdrops[background]})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			{displayIndicators ? (
				<Indicators
					health={health}
					education={education}
					money={money}
					friends={friends}
					age={age}
				/>
			) : null}
			{!isLoading ? createQuestionWithId(currentQuestion) : null}
			{isLoading ? (
				<img class='loadinggif' src={loading} alt='loadingGif' />
			) : null}
			<a href='https://buxbank.com.br'>
				<img class='buxlogo' src={buxlogo} alt='logo-bux' />
			</a>
			{!isLoading &&
			currentQuestion !== 'titlescreen' &&
			currentQuestion !== 'endscreen' ? (
				<span class='idade'>{score} anos</span>
			) : null}
			{showUniDialog ? (
				<Alert theme='danger' style={{ marginTop: '40px' }}>
					Você não estudou o suficiente para isso...
				</Alert>
			) : null}
		</div>
	)
}

export default MainScreen

//Tema: Saude, financeiro, educaçao,
//Estratégia de Marketing: formais, informais, organico
//Cor: Verde, Azul, Preto
//Em qual empresa você se inspira? DrConsulta, Geekie,
//AVG: Friends, health, education
