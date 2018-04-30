import * as React from "react";
import * as ReactDOM from "react-dom";
import { Editor, EditorState, RichUtils } from 'draft-js';
import { css } from 'emotion';
import styled from 'react-emotion';
import { StyleButton } from './StyleButtons';

const INLINE_STYLES = [
	{ label: 'Bold', style: 'BOLD' },
	{ label: 'Italic', style: 'ITALIC' },
	{ label: 'Underline', style: 'UNDERLINE' },
	{ label: 'Monospace', style: 'CODE' },
];
export const InlineStyleControls = (props: any) => {
	const currentStyle = props.editorState.getCurrentInlineStyle();
	return (
		<div className="RichEditor-controls">
			{INLINE_STYLES.map((type: any) =>
				<StyleButton
					key={type.label}
					active={currentStyle.has(type.style)}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			)}
		</div>
	);
};
