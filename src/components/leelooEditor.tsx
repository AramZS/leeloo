import * as React from "react";
import * as ReactDOM from "react-dom";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import { css } from 'emotion';
import styled from 'react-emotion';
import { InlineStyleControls } from './InlineStyleControls';
import { StyleButton } from './StyleButtons';

/**
 * Readonly<{
 * 	onToggle ?: any,
 * 		style ?: any,
 * 		active ?: any,
 * 		label ?: any,
 * 		children ?: React.ReactNode
 * }> & LeelooEditorProps;
 */
export interface LeelooEditorProps extends Draft.EditorProps { editorState: any; children?: React.ReactNode }
export interface LeelooEditorState extends Draft.EditorState { editorState?: EditorState; }
export interface LeeloEditorInternal extends Draft.Editor {
	onChange?: (editorState: any) => any;
	// state: Readonly<LeelooEditorState>;
	props: Readonly<LeelooEditorProps>;
	focus: any;
	blur: any;
}

const baseStyling = css`
	height:500px;
	width:600px;
`;

// Custom overrides for "code" style.
const styleMap = {
	CODE: {
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
		fontSize: 16,
		padding: 2,
	},
};
function getBlockStyle(block: any) {
	switch (block.getType()) {
		case 'blockquote': return 'RichEditor-blockquote';
		default: return null;
	}
}

const BLOCK_TYPES = [
	{ label: 'H1', style: 'header-one' },
	{ label: 'H2', style: 'header-two' },
	{ label: 'H3', style: 'header-three' },
	{ label: 'H4', style: 'header-four' },
	{ label: 'H5', style: 'header-five' },
	{ label: 'H6', style: 'header-six' },
	{ label: 'Blockquote', style: 'blockquote' },
	{ label: 'UL', style: 'unordered-list-item' },
	{ label: 'OL', style: 'ordered-list-item' },
	{ label: 'Code Block', style: 'code-block' },
];
const BlockStyleControls = (props: any) => {
	const { editorState } = props;
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();
	return (
		<div className="RichEditor-controls">
			{BLOCK_TYPES.map((type) =>
				<StyleButton
					key={type.label}
					active={type.style === blockType}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			)}
		</div>
	);
};

export class LeelooEditor extends React.Component<any | {}, any | {}> {
	public focus: any;
	public mapKeyToEditorCommand: any;
	public toggleBlockType: any;
	public toggleInlineStyle: any;
	public editor: any;
	public blur: any;

	public props: any;
	constructor(props: any) {
		super(props);
		this.state = { editorState: EditorState.createEmpty() };
		this.handleKeyCommand = this.handleKeyCommand.bind(this);
		this.focus = () => this.editor.focus();
		this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
		this.toggleBlockType = this._toggleBlockType.bind(this);
		this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
		//this.onChange = (editorState: any) => this.setState({ editorState });
	}

	public onChange = (editorState: any) => this.setState({ editorState });
	public handleKeyCommand(command: any, editorState: any) {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	}

	// state = { editorState: EditorState.createEmpty() };
	public render() {
		const { editorState } = this.state;
		// If the user changes block type before entering any text, we can
		// either style the placeholder or hide it. Let's just hide it now.
		let className = 'RichEditor-editor';
		const contentState = editorState.getCurrentContent();
		if (!contentState.hasText()) {
			if (contentState.getBlockMap().first().getType() !== 'unstyled') {
				className += ' RichEditor-hidePlaceholder';
			}
		}
		return (
			<div className="RichEditor-root">
				<BlockStyleControls
					editorState={editorState}
					onToggle={this.toggleBlockType}
				/>
				<InlineStyleControls
					editorState={editorState}
					onToggle={this.toggleInlineStyle}
				/>
				<div className={className} onClick={this.focus}>
					<Editor
						blockStyleFn={getBlockStyle}
						customStyleMap={styleMap}
						editorState={editorState}
						handleKeyCommand={this.handleKeyCommand}
						keyBindingFn={this.mapKeyToEditorCommand}
						onChange={this.onChange}
						placeholder="Tell a story..."
						ref={(ref) => this.editor = ref}
						spellCheck={true}
					/>
				</div>
			</div>
		);
	}


	private _handleKeyCommand(command: any, editorState: any) {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return true;
		}
		return false;
	}

	private _mapKeyToEditorCommand(e: any) {
		switch (e.keyCode) {
			case 9: // TAB
				const newEditorState = RichUtils.onTab(
					e,
					this.state.editorState,
					4, /* maxDepth */
				);
				if (newEditorState !== this.state.editorState) {
					this.onChange(newEditorState);
				}
				return;
		}
		return getDefaultKeyBinding(e);
	}

	private _toggleBlockType(blockType: any) {
		this.onChange(
			RichUtils.toggleBlockType(
				this.state.editorState,
				blockType
			)
		);
	}

	private _toggleInlineStyle(inlineStyle: any) {
		this.onChange(
			RichUtils.toggleInlineStyle(
				this.state.editorState,
				inlineStyle
			)
		);
	}
}
