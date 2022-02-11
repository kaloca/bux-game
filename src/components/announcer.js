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
				<span class='subtitle'>
					Quão rápido você consegue chegar a $100.000?
				</span>
			) : null}
			<Button onClick={props.consequence}>
				{props.buttonText || 'Continuar'}
			</Button>
		</div>
	)
}
