import React, { useEffect, useState } from 'react'
import { Button, FormInput } from 'shards-react'
import './lottery.css'

export default function Lottery(props) {
	const [guess, setGuess] = useState(0)
	const [number, setNumber] = useState(0)

	useEffect(() => {
		setNumber(Math.floor(Math.random() * 25))
	}, [])
	return (
		<div class='lotteryContainer'>
			<header class='lotteryHeader'>
				Você comprou um bilhete de loteria! Adivinhe o número entre 1 e 25 para
				ganhar um prêmio.
			</header>
			<FormInput
				style={{ width: '80px', marginTop: '4vh', marginBottom: '4vh' }}
				type='number'
				// placeHolder='0'
				size='lg'
				value={guess}
				onChange={(e) => {
					console.log(number)
					const value = e.target.value

					if (value >= 25) setGuess(25)
					else if (value < 1) setGuess(1)
					else setGuess(value)
				}}
			/>
			<Button onClick={() => props.moveAhead(guess == number)}>Tentar</Button>
			{/* <span class='highlowNumber'}>{number}</span> */}
		</div>
	)
}
