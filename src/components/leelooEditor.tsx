import * as React from "react";
import * as ReactDOM from "react-dom";
import { Editor, EditorState } from 'draft-js';

export interface LeelooEditorProps { editorState?: any; }
export interface LeelooEditorState { editorState?: EditorState; }
export interface LeeloEditorInternal {
	onChange: (editorState: any) => any;
	//state: Readonly<{ editorState: EditorState }>;
}

export class LeelooEditor extends React.Component<LeelooEditorProps, LeelooEditorState> implements LeeloEditorInternal {
	constructor(props: any) {
		super(props);
		this.state = { editorState: EditorState.createEmpty() };
	}
	// state = { editorState: EditorState.createEmpty() };
	onChange = (editorState: any) => this.setState({ editorState });
	render() {
		return (
			<Editor editorState={this.state.editorState} onChange={this.onChange} />
		);
	}
}
