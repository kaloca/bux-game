import React from 'react'
import { Button } from 'shards-react'
import './announcer.css'

export default function Announcer(props) {
	return (
		<div class='announcerContainer'>
			<header class={!props.isTitle ? 'announcerHeader' : 'titleScreenHeader'}>
				{props.text}
			</header>
			{props.isTitle ? (
				<span class='subtitle'>Com quanto dinheiro você vai se aposentar?</span>
			) : null}
			<Button onClick={props.consequence}>
				{props.buttonText || 'Continuar'}
			</Button>
		</div>
	)
}
