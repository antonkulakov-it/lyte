import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

export const MyInputGroup = (props: any) => {
	const {
		id,
		type,
		placeholder,
		value,
		name
	} = props;

	const controlCases: { [key: string]: () => JSX.Element } = {
		"text": () => {
			return(
				<FormControl
					type={type}
					placeholder={placeholder}
					aria-label={placeholder}
					aria-describedby={id}
					name={name}
					defaultValue={value}
				/>
			);
		},
		"number": () => {
			return(
				<FormControl
					type={type}
					placeholder={placeholder}
					aria-label={placeholder}
					aria-describedby={id}
					name={name}
					defaultValue={value}
				/>
			);
		}
	}
	return(
		<InputGroup className="mb-3">
			<InputGroup.Prepend>
				<InputGroup.Text id={id}>{placeholder}</InputGroup.Text>
			</InputGroup.Prepend>
			{controlCases[type.toString()]()}
		</InputGroup>
	);
}