import React, { useState, useEffect } from 'react';
import {
    Form,
    TextArea,
    Button,
    Icon
} from 'semantic-ui-react';
import axios from 'axios';

export default function Translate() {
    const [inputText, setInputText] = useState('');
    const [resultText, setResultText] = useState('');
    const [selectedLanguageKey, setLanguageKey] = useState('')
    const [languagesList, setLanguagesList] = useState([])
    const [detectLanguageKey, setdetectedLanguageKey] = useState('')
    const getLanguageSource = () => {
        axios.post(`https://libretranslate.com/detect`, {
            q: inputText
        })
        .then((response) => {
            setdetectedLanguageKey(response.data[0].language)
        })
    }
    const translateText = () => {
        setResultText(inputText)

        getLanguageSource();

        let data = {
            q : inputText,
            source: detectLanguageKey,
            target: selectedLanguageKey
        }
        axios.post(`https://libretranslate.com/translate`, data)
        .then((response) => {
            setResultText(response.data.translatedText)
        })
    }

    const languageKey = (selectedLanguage) => {
        setLanguageKey(selectedLanguage.target.value)
    }

    useEffect(() => {
       axios.get(`https://libretranslate.com/languages`)
       .then((response) => {
        setLanguagesList(response.data)
       })

       getLanguageSource()
    }, [inputText])
    return (
        <div>
            <div className="app-header">
                <h2 className="header">Christian's Translator</h2>
            </div>

            <div className='app-body'>
                <div>
                    <Form>
                        <Form.Field
                            control={TextArea}
                            placeholder='Type Text to Translate..'
                            onChange={(e) => setInputText(e.target.value)}
                        />

                        <select className="language-select" onChange={languageKey}>
                            <option>Please Select Language..</option>
                            {languagesList.map((language) => {
                                return (
                                    <option value={language.code}>
                                        {language.name}
                                    </option>
                                )
                            })}
                        </select>

                        <Form.Field
                            control={TextArea}
                            placeholder='Your Result Translation..'
                            value={resultText}
                        />

                        <Button 
                            color="orange" 
                            size="large" 
                            onClick={translateText}
                        >
                            <Icon name='translate' />
                            Translate</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

/* 
import React, { useState, useEffect } from "react";
import { Form, TextArea, Button, Icon } from "semantic-ui-react";
import axios from "axios";


export default function Translate() {
  const [text, setText] = useState("");
  const [resultText, setResultText] = useState("");
  const [languagesList, setLanguagesList] = useState([]);
  const [selectedLanguageKey , setLanguageKey] = useState([])
  const [detectLanguageKey, setDetectedLanguageKey] = useState([])



  useEffect(() => {
    axios.get("https://libretranslate.com/languages").then((response) => {
        setLanguagesList(response.data);
    });
  }, []);

  const getLanguageSource = () => {
    axios.post('https://libretranslate.com/detect', {
       q: text
    })
    .then((response) => {
        setDetectedLanguageKey(response.data[0].language)
    })
}

  const translateText = () => {
    setResultText(text)

    getLanguageSource();

    let data = {
        q: text,
        source: detectLanguageKey,
        target: selectedLanguageKey
    }
    axios.post("https://libretranslate.com/translate", data)
        .then((response) => {
            console.log(response.data)
            
        })

    };

  {/* Newest code 
  const languageKey = (selectedLanguage) => {
   setLanguageKey(selectedLanguage.target.value)
    };




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

            <select className="language-select" onChange={languageKey}>
              <option value="">Select Language</option>
              {languagesList.length > 0 && languagesList.map((language) => {
                return <option key={language.code}>{language.name}</option>;
              })}
            </select>

            <Form.Field
              control={TextArea}
              label=""
              placeholder="Result"
              value={resultText}
            />
            <Button size="massive" color="orange" onClick={translateText}>
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










import React, { useState, useEffect } from "react";
import { Form, TextArea, Button, Icon } from "semantic-ui-react";
import axios from "axios";



export default function Translate() {
  const [text, setText] = useState("");
  const [resultText, setResultText] = useState("");
  const [languagesList, setLanguagesList] = useState("");

  useEffect(() => {
    axios.get("https://libretranslate.com/languages").then((response) => {
      console.log(response.data);
    });
  }, []);

  const translateText = () => {
    setResultText(text);
  };

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

            <select className="language-select">
              {languagesList.map((language) => {
                return <option>{language.name}</option>;
              })}
            </select>

            <Form.Field
              control={TextArea}
              label=""
              placeholder="Result"
              value={resultText}
            />
            <Button size="massive" color="orange" onClick={translateText}>
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
*/
