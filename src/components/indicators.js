import React from 'react'
import { FaUserFriends, FaSmile } from 'react-icons/fa'
import { GiBrain } from 'react-icons/gi'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import './indicators.css'

export default function Indicators(props) {
	return (
		<div class='Container'>
			<div class='indicatorDiv'>
				<GiBrain class='indicatorIcon' />
				<span class='indicatorText'>{props.education}%</span>
			</div>
			<div class='indicatorDiv'>
				<FaSmile class='indicatorIcon' />
				<span class='indicatorText'>{props.health}%</span>
			</div>
			<div class='indicatorDiv'>
				<FaUserFriends class='indicatorIcon' />
				<span class='indicatorText'>{props.friends}%</span>
			</div>
			<div class='indicatorDiv'>
				<RiMoneyDollarCircleFill class='indicatorIcon' />
				<span class='indicatorText'>{props.money}$</span>
			</div>
		</div>
	)
}
