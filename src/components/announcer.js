import React from 'react'
import { Button } from 'shards-react'
import './announcer.css'

export default function Announcer(props) {
	return (
		<div class='announcerContainer'>
			<header class='announcerHeader'>{props.text}</header>
			<Button onClick={props.consequence}>Continuar</Button>
		</div>
	)
}
