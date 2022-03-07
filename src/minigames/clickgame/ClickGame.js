import React from 'react'
import { Button } from 'shards-react'

export default function ClickGame(props) {
	return (
		<div class='highlowContainer'>
			<header class='highlowHeader'>
				Adivinhe entre maior ou menor para aumentar seu salário. Os números
				variam de 1 a 11.
			</header>
			<Button style={{ height: '5vh' }} onClick={props.moveAhead}>
				SKIP
			</Button>
		</div>
	)
}
