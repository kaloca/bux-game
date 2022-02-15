import { useEffect, useState, useRef } from 'react'
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Button,
	DialogTitle,
} from '@mui/material'
import Card from './card'
import './app.scss'

const uniqueElementsArray = [
	{
		type: 'Pikachu',
		image: require(`./images/Pickachu.png`),
	},
	{
		type: 'ButterFree',
		image: require(`./images/ButterFree.png`),
	},
	{
		type: 'Charmander',
		image: require(`./images/Charmander.png`),
	},
	{
		type: 'Squirtle',
		image: require(`./images/Squirtle.png`),
	},
	{
		type: 'Pidgetto',
		image: require(`./images/Pidgetto.png`),
	},
	{
		type: 'Bulbasaur',
		image: require(`./images/Bulbasaur.png`),
	},
]

function shuffleCards(array) {
	const length = array.length
	for (let i = length; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * i)
		const currentIndex = i - 1
		const temp = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temp
	}
	return array
}
export default function App(props) {
	const [cards, setCards] = useState(
		shuffleCards.bind(null, uniqueElementsArray.concat(uniqueElementsArray))
	)
	const [openCards, setOpenCards] = useState([])
	const [clearedCards, setClearedCards] = useState({})
	const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false)
	const [moves, setMoves] = useState(0)
	const [showModal, setShowModal] = useState(false)
	const [bestScore, setBestScore] = useState(
		JSON.parse(localStorage.getItem('bestScore')) || Number.POSITIVE_INFINITY
	)
	const timeout = useRef(null)

	const disable = () => {
		setShouldDisableAllCards(true)
	}
	const enable = () => {
		setShouldDisableAllCards(false)
	}

	const checkCompletion = () => {
		if (Object.keys(clearedCards).length === uniqueElementsArray.length) {
			setShowModal(true)
			const highScore = Math.min(moves, bestScore)
			setBestScore(highScore)
			localStorage.setItem('bestScore', highScore)
		}
	}
	const evaluate = () => {
		const [first, second] = openCards
		enable()
		if (cards[first].type === cards[second].type) {
			setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }))
			setOpenCards([])
			return
		}
		// This is to flip the cards back after 500ms duration
		timeout.current = setTimeout(() => {
			setOpenCards([])
		}, 500)
	}
	const handleCardClick = (index) => {
		if (openCards.length === 1) {
			setOpenCards((prev) => [...prev, index])
			setMoves((moves) => moves + 1)
			disable()
		} else {
			clearTimeout(timeout.current)
			setOpenCards([index])
		}
	}

	useEffect(() => {
		let timeout = null
		if (openCards.length === 2) {
			timeout = setTimeout(evaluate, 300)
		}
		return () => {
			clearTimeout(timeout)
		}
	}, [openCards])

	useEffect(() => {
		checkCompletion()
	}, [clearedCards])
	const checkIsFlipped = (index) => {
		return openCards.includes(index)
	}

	const checkIsInactive = (card) => {
		return Boolean(clearedCards[card.type])
	}

	const handleRestart = () => {
		setClearedCards({})
		setOpenCards([])
		setShowModal(false)
		setMoves(0)
		setShouldDisableAllCards(false)
		// set a shuffled deck of cards
		setCards(shuffleCards(uniqueElementsArray.concat(uniqueElementsArray)))
	}

	return (
		<div className='MemoryApp'>
			<header>
				<h3 style={{ color: 'white' }}>Chegou a hora da prova!</h3>
				<div>
					Complete esse jogo da memória com a menor quantidade de movimentos
					possível
				</div>
			</header>
			<div className='container'>
				{cards.map((card, index) => {
					return (
						<Card
							key={index}
							card={card}
							index={index}
							isDisabled={shouldDisableAllCards}
							isInactive={checkIsInactive(card)}
							isFlipped={checkIsFlipped(index)}
							onClick={handleCardClick}
						/>
					)
				})}
			</div>
			<footer>
				<div className='score'>
					<div className='moves'>
						<span className='bold'>Movimentos:</span> {moves}
					</div>
				</div>
				<Button onClick={props.moveAhead} color='primary' variant='contained'>
					Pular (dev)
				</Button>
			</footer>
			<Dialog
				open={showModal}
				disableBackdropClick
				disableEscapeKeyDown
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					Parabéns, você terminou a prova!
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Você terminou o jogo em {moves} movimentos. Isso te da uma nota de
						getscore
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.moveAhead} color='primary'>
						Continuar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
