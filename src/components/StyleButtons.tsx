import * as React from "react";
import * as ReactDOM from "react-dom";
import { Editor, EditorState, RichUtils } from 'draft-js';
import { css } from 'emotion';
import styled from 'react-emotion';

interface StyleButtonProps {
	onToggle: any,
	style: any,
	active: any,
	label: any,
	children?: React.ReactNode
}

interface StyleButtons extends React.Component {
	onToggle?: any,
	props: Readonly<{
		onToggle: any,
		style: any,
		active: any,
		label: any,
		children?: React.ReactNode
	}>
	render: any
}

export class StyleButton extends React.Component implements StyleButtons {
	public props: Readonly<{
		onToggle: any,
		style: any,
		active: any,
		label: any,
		children?: React.ReactNode
	}>;
	constructor(props: any) {
		super(props);
	}
	public onToggle = (e: any) => {
		e.preventDefault();
		this.props.onToggle(this.props.style);
	};
	public render() {
		let className = 'RichEditor-styleButton';
		if (this.props.active) {
			className += ' RichEditor-activeButton';
		}
		return (
			<span className={className} onMouseDown={this.onToggle}>
				{this.props.label}
			</span>
		);
	}
}
