import React from 'react'
import { Button } from 'shards-react'
import './endscreen.css'

export default function EndScreen(props) {
	return (
		<div class='endscreenContainer'>
			<header class={'endscreenHeader'}>
				Você se aposentou com $
				{props.money.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
			</header>
			<span class='endscreenSubtitle'>
				Recorde: $
				{props.highScore.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
			</span>
			<Button onClick={props.consequence}>{'Jogar de novo'}</Button>
		</div>
	)
}
