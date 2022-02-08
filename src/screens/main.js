import React, { useState } from 'react'
import Question from '../components/questions'
import Indicators from 'components/indicators'
import MemoryGame from '../minigames/memory/App'
import ClickGame from '../minigames/clickgame/ClickGame'
import './main.css'

function MainScreen() {
	const [health, setHealth] = useState(80)
	const [education, setEducation] = useState(60)
	const [money, setMoney] = useState(1000)
	const [friends, setFriends] = useState(50)
	const [currentQuestion, setCurrentQuestion] = useState('1')

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
				text: 'Comprar um carro. ($3000)',
				consequence: () => {
					setIndicator('money', -3000)
					setIndicator('health', 10)
					setCurrentQuestion('8')
				},
			},
			option2: {
				text: 'Ir de metrô ($200 até o fim da faculdade)',
				consequence: () => {
					setIndicator('money', -200)
					setIndicator('health', -8)
					setCurrentQuestion('8')
				},
			},
			option3: {
				text: 'Bicicleta ($0)',
				consequence: () => {
					setHealth('health', 4)
					setCurrentQuestion('8')
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
