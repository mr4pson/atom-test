import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

import { memo } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import { Input } from "antd";
import styles from './TextRedactor.module.scss';
import { useTextRedactor } from "./useTextRedactor";

type Props = {
  formRef: any;
  initialValue: string;
}

function TextRedactor(props: Props): JSX.Element {

  const { state, setState } = useTextRedactor(props.formRef, props.initialValue);

  function handleValueChange(e: any): void {
    setState(e)
  }

    return (
      <>
        <FroalaEditor onModelChange={handleValueChange} model={state} />
          <Input className={styles['text-redactor__input']} value={state} />
      </>
    );
}

export default memo(TextRedactor);