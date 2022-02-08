import React from 'react'
import { Button } from 'shards-react'

export default function ClickGame(props) {
	return (
		<div>
			<p>HELLO</p>
			<Button style={{ height: '5vh' }} onClick={props.moveAhead}>
				SKIP
			</Button>
		</div>
	)
}
