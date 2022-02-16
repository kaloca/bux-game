import React from 'react'
import { FaUserFriends, FaSmile } from 'react-icons/fa'
import { GiBrain } from 'react-icons/gi'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { agesMale } from 'assets/ages'

import './indicators.css'

export default function Indicators(props) {
	return (
		<div class='Container'>
			<div class='indicatorDiv'>
				<GiBrain class='indicatorIcon' id='educationIcon' />
				<span class='indicatorText'>{props.education}%</span>
			</div>
			<div class='indicatorDiv'>
				<FaSmile class='indicatorIcon' id='healthIcon' />
				<span class='indicatorText'>{props.health}%</span>
			</div>
			<div>
				<img class='figure' src={agesMale[props.age]} alt='figure'></img>
			</div>
			<div class='indicatorDiv'>
				<FaUserFriends class='indicatorIcon' id='friendsIcon' />
				<span class='indicatorText'>{props.friends}%</span>
			</div>
			<div class='indicatorDiv'>
				<RiMoneyDollarCircleFill class='indicatorIcon' id='moneyIcon' />
				<span class='indicatorText'>{props.money}$</span>
			</div>
			{/* <Button
				onClick={() => {
					age < 4 ? setAge(age + 1) : setAge(0)
				}}
			>
				Change
			</Button> */}
		</div>
	)
}
