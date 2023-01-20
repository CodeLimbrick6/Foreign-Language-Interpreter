import React, { useState, useEffect } from "react";
import { Form, TextArea, Button, Icon } from "semantic-ui-react";
import axios from "axios";

const apiKey = "de94c1c859bb493b9355398e32983c97";
const baseUrl = "https://api.cognitive.microsofttranslator.com/";

export default function Translate() {
  const [text, setText] = useState("");
  const [resultText, setResultText] = useState("");
  const [languagesList, setLanguagesList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  // Get Languages

  useEffect(() => {
    axios
      .get(`${baseUrl}languages?api-version=3.0`)
      .then((response) => {
        setLanguagesList(response.data.translation);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);


    // Detect Language
  const getLanguageSource = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${baseUrl}detect?api-version=3.0`,
        {
          text: text,
        },
        {
          headers: {
            "Ocp-Apim-Subscription-Key": apiKey,
            "Content-type": "application/json",
          },
        }
      );
      setDetectedLanguage(response.data.language);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  // Translate Text


  const translateText = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${baseUrl}translate?api-version=3.0`,
        [
          {
            text: text,
          },
        ],
        {
          params: {
            "to": selectedLanguage,
          },
          headers: {
            "Ocp-Apim-Subscription-Key": apiKey,
            "Content-type": "application/json",
          },
        }
      );
      setResultText(response.data[0].translations[0].text);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

// Return Statement 

  return (
    <div>
      <div className="app-header">
        <h2 className="header"> Foreign Language Interpreter</h2>
      </div>

      <div className="app-body">
        <div>
          <Form>
            <Form.Field control={TextArea}
label=""
placeholder="Type text to translate..."
onChange={(e) => setText(e.target.value)}
/>




<select className="language-select" onChange={handleLanguageChange}>
          <option value="">Select Language</option>

          {languagesList.map((language) => {

            return <option key={language.code} value={language.code}>{language.name}</option>;
          })}
        </select>

        <Form.Field
          control={TextArea}
          label=""
          placeholder="Result"
          value={resultText}
        />
        <Button size="massive" color="orange" onClick={translateText} loading={loading}>
          <Icon name="translate" />
          Translate!
        </Button>
        {error && <div className="error">Error: {error}</div>}
      </Form>
    </div>

    <div></div>
    <div></div>
  </div>
</div>
);
}












{/* 
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
*/}