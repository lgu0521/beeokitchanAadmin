import { Editor, EditorProps } from "@toast-ui/react-editor";

export interface TuiEditorWithForwardedProps extends EditorProps {
   forwardedRef?: React.MutableRefObject<Editor>;
}

const ToastEditor = (props: TuiEditorWithForwardedProps) => (
  <Editor {...props} ref={props.forwardedRef} />
); 


export default ToastEditor;