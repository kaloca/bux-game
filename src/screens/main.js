import React, { useState } from 'react'
import Question from 'components/questions'
import Indicators from 'components/indicators'
import Announcer from 'components/announcer'
import MemoryGame from '../minigames/memory/App'
import ClickGame from '../minigames/clickgame/ClickGame'
import './main.css'

function MainScreen() {
	const [health, setHealth] = useState(80)
	const [education, setEducation] = useState(60)
	const [money, setMoney] = useState(1000)
	const [friends, setFriends] = useState(50)
	const [currentQuestion, setCurrentQuestion] = useState('1')
	const [isInClub, setIsInClub] = useState(false)

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

	const questions = [
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
					setCurrentQuestion('memorygame')
				},
			},
			option2: {
				text: 'Ir para a festa e virar a note estudando',
				consequence: () => {
					setIndicator('friends', 5)
					setIndicator('health', -10)
					setCurrentQuestion('memorygame')
				},
			},
			option3: {
				text: 'Ficar em casa estudando',
				consequence: () => {
					setIndicator('friends', -10)
					setIndicator('education', 10)
					setCurrentQuestion('memorygame')
				},
			},
		},
		{
			id: '4',
			questionText:
				'Finalmente chegaram as férias! Como você irar aproveitar todo esse tempo livre?',
			option1: {
				text: 'Arranjar um trabalho de verão',
				consequence: () => {
					setIndicator('money', 500)
					setIndicator('friends', 5)
					setIndicator('health', -8)
					setCurrentQuestion('5')
				},
			},
			option2: {
				text: 'Estudando para o vestibular',
				consequence: () => {
					setIndicator('education', 10)
					setIndicator('health', -8)
					setCurrentQuestion('5')
				},
			},
			option3: {
				text: 'Viajar com seus amigos',
				consequence: () => {
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
					setIndicator('education', 10)
					setIndicator('health', -10)
					setIndicator('friends', 5)
					setCurrentQuestion('6')
				},
			},
			option3: {
				text: 'Não estudar',
				consequence: () => {
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
						setCurrentQuestion('clickgame')
					}
				},
			},
			option2: {
				text: 'Universidade Particular (★★★★)',
				consequence: () => {
					setIndicator('money', -20000)
					setCurrentQuestion('clickgame')
				},
			},
			option3: {
				text: 'Faculdade Pública (★★★)',
				consequence: () => {
					setCurrentQuestion('clickgame')
				},
			},
			option4: {
				text: 'Não fazer faculdade (★)',
				consequence: () => {
					setCurrentQuestion('7')
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
				text: 'Alugar um apartamento com seus amigos ($1000 até o fim da faculdade)',
				consequence: () => {
					setIndicator('money', -1000)
					setIndicator('health', 10)
					setIndicator('friends', 10)
					setCurrentQuestion('8')
				},
			},
			option3: {
				text: 'Alugar um apartamento sozinho próximo a faculdade ($3000)',
				consequence: () => {
					setIndicator('money', -3000)
					setIndicator('health', 20)
					setIndicator('education', 5)
					setIndicator('friends', 5)
					setCurrentQuestion('8')
				},
			},
		},
		{
			id: '8',
			questionText:
				'Qual meio de transporte você vai querer utilizar para ir estudar?',
			option1: {
				text: 'Comprar um carro. ($3000)',
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
					setHealth('health', 4)
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
					friends < 85 ? setCurrentQuestion('10') : setCurrentQuestion('11')
				},
			},
			option2: {
				text: 'Engenharia',
				consequence: () => {
					friends < 85 ? setCurrentQuestion('10') : setCurrentQuestion('11')
				},
			},
			option3: {
				text: 'Economia',
				consequence: () => {
					friends < 85 ? setCurrentQuestion('10') : setCurrentQuestion('11')
				},
			},
			option4: {
				text: 'Humanas (História, Filosofia etc)',
				consequence: () => {
					friends < 85 ? setCurrentQuestion('10') : setCurrentQuestion('11')
				},
			},
		},
		{
			id: '10',
			questionText:
				'Você viu muitas pessoas entrando em clubes, mas não tem amigos em nenhum. O que quer fazer?',
			option1: {
				text: 'Tentar entrar no clube de teatro',
				consequence: () => {
					doWithProbability(0.9)
						? setCurrentQuestion('12')
						: setCurrentQuestion('13')
				},
			},
			option2: {
				text: 'Tentar entrar no clube de empreendedorismo',
				consequence: () => {
					doWithProbability(0.2)
						? setCurrentQuestion('12')
						: setCurrentQuestion('13')
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
					doWithProbability(0.95)
						? setCurrentQuestion('14')
						: setCurrentQuestion('13')
				},
			},
		},
		{
			id: '10',
			questionText:
				'Seu amigo te chamou para entrar no exclusivo clube de empreendedorismo. O que vai fazer?',
			option1: {
				text: 'Aceitar o convite',
				consequence: () => {
					setIndicator('money', -3000)
					setIndicator('health', 10)
					setCurrentQuestion('15')
				},
			},
			option2: {
				text: 'Recusar a oferta',
				consequence: () => {
					setIndicator('money', -200)
					setIndicator('health', -8)
					setCurrentQuestion('9')
				},
			},
			option3: {
				text: '',
				consequence: () => {
					setHealth('health', 4)
					setCurrentQuestion('9')
				},
			},
			option4: {
				text: 'Entrar no coletivo político da faculdade.',
				consequence: () => {
					setHealth('health', 4)
					setCurrentQuestion('9')
				},
			},
		},
		{
			id: '12',
			questionText: 'Parabéns, você conseguiu entrar no clube!',
			consequence: () => {
				setIndicator('health', 8)
				setIndicator('friends', 10)
				setIsInClub(true)
				setCurrentQuestion('10')
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
				text: 'Sim, mas ir com calma',
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
					setIndicator('education', 10)
					setIndicator('health', -8)
					setIndicator('friends', -5)
					setCurrentQuestion('fimfaculdade')
				},
			},
			option2: {
				text: 'Não estudar e aproveitar as amizades',
				consequence: () => {
					setIndicator('health', 8)
					setIndicator('friends', 6)
					setCurrentQuestion('fimfaculdade')
				},
			},
			option3: {
				text: 'Tentar arranjar um estágio',
				consequence: () => {
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
				setIndicator('health', 8)
				setIndicator('education', 10)
				setCurrentQuestion('buscaporempregos')
			},
			isAnnouncer: true,
		},
		{
			id: 'buscaporempregos',
			questionText:
				'A busca por empregos começa.  Você consegue uma entrevista, mas um dia antes recebe uma ligação de um amigo dizendo ter uma oportunidade de negócios. O que vai fazer?',
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
			option3: {
				text: 'Esperar para entrevistas melhores',
				consequence: () => {
					doWithProbability(0.3)
						? setCurrentQuestion('deumerda')
						: setCurrentQuestion('deubom')
				},
			},
		},
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
				setCurrentQuestion('emprego2-1')
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
					setCurrentQuestion('startup-1')
				},
			},
			option3: {
				text: 'Desistir de tudo',
				consequence: () => {
					doWithProbability(0.3)
						? setCurrentQuestion('emprego1-1-2')
						: setCurrentQuestion('emprego1-1-1')
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
			id: 'empre1go1-2',
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
	]

	const createQuestionWithId = (id) => {
		if (id === 'memorygame') {
			return <MemoryGame moveAhead={() => setCurrentQuestion('5')} />
		}

		if (id === 'clickgame') {
			return <ClickGame moveAhead={() => setCurrentQuestion('7')} />
		}

		const question = questions.find((q) => q.id == id)

		if (question.isAnnouncer !== undefined) {
			return (
				<Announcer
					text={question.questionText}
					consequence={question.consequence}
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

	return (
		<div class='root'>
			<Indicators
				health={health}
				education={education}
				money={money}
				friends={friends}
			/>
			{createQuestionWithId(currentQuestion)}
		</div>
	)
}

export default MainScreen
