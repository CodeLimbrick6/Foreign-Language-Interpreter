import React, {useState, useEffect} from "react";
import { Form, TextArea, Button, Icon } from "semantic-ui-react";

export default function Translate() {
    const [text, setText] = useState('');
    const translateText = () => {
        console.log(text);
    }
  return (
    <div>
      <div className="app-header">
        <h2 className="header"> Foreign Language Interpreter</h2>
      </div>

      <div className="app-body">
        <div>
          <Form>
            <Form.Field
              control={TextArea}
              label=""
              placeholder="Type text to translate..."
              onChange={(e) => setText(e.target.value)}

            />

            <Form.Select fluid label="" placeholder="Select Language" />

            <Form.Field control={TextArea} label="" placeholder="Result" />

            <Button size = 'massive' color ='orange' onClick={translateText}>
              <Icon name="translate" />
              Translate!
            </Button>
          </Form>
        </div>

        <div></div>
        <div></div>
      </div>
    </div>
  );
}
