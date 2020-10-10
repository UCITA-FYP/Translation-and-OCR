import React, { useState, useEffect } from "react";
import "./App.css";
import Tesseract from "tesseract.js";
import TextWrapper from "./components/TextWrapper";
import ImageWrapper from "./components/ImageWrapper";
import axios from "axios";

// create account on imgbb and go to > about section > and get that api key and put it here

const API_KEY = "023ad1c3738db81d8e56fa1e4af437f9";

function App() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [text, setText] = useState(null);

  const convertImageToText = async () => {
    setLoading(true);
    const result = await Tesseract.recognize(imageUrl, "ara",
    );

    setText(result.data.text);
    setLoading(false);
  };

  const uploadFile = async e => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        formData,
        config
      );
      setImageUrl(res.data.data.url);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (imageUrl != null) {
      convertImageToText();
    }
  }, [imageUrl]);
  console.log(`${process.env.REACT_APP_API_KEY}`);

  function translation() {
    const axios = require("axios").default;
    const uuidv4 = require("uuid/v4");

    var subscriptionKey = "76383d7ed8264578b9d1ea4e4e8fef94";
    var endpoint = "https://api.cognitive.microsofttranslator.com";

    axios({
      baseURL: endpoint,
      url: "/translate",
      method: "post",
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Content-type": "application/json",
        "X-ClientTraceId": uuidv4().toString(),
      },
      params: {
        "api-version": "3.0",
        from: document.getElementById("from-language").value,
        to: document.getElementById("select-language").value,
      },
      data: [
        {
          text: document.getElementById("text-to-translate").value,
        },
      ],
      responseType: "json",
    }).then((response) => {
      if (document.getElementById("from-language").value == "") {
        document.getElementById("detected-language-result").value =
          response.data[0].detectedLanguage.language;
      } else {
        document.getElementById(
          "detected-language-result"
        ).value = document.getElementById("from-language").value;
      }
      document.getElementById("translated-language-result").value =
        response.data[0].translations[0].to;
      document.getElementById("translation-result").value =
        response.data[0].translations[0].text;
    });
  }
  return (
    <div class="App">
      <h1>UCITA OCR</h1>

      <div class="container">
        {/* <br></br>
        <label for="from-language">
          <strong>Translate from:</strong>
          {"  "}
        </label>
        <br></br>
        <br></br>
        <select id="from-language" class="dropdown">
          <option value="">Detect Language</option>
          <option value="ar">Arabic</option>
          <option value="ca">Catalan</option>
          <option value="zh-Hans">Chinese (Simplified)</option>
          <option value="zh-Hant">Chinese (Traditional)</option>
          <option value="hr">Croatian</option>
          <option value="en" or value="eng">English</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="el">Greek</option>
          <option value="he">Hebrew</option>
          <option value="hi">Hindi</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="pt">Portuguese</option>
          <option value="ru">Russian</option>
          <option value="es">Spanish</option>
          <option value="th">Thai</option>
          <option value="tr">Turkish</option>
          <option value="vi">Vietnamese</option>
        </select> */}
        {loading && <div className="loader"></div>}
        {text == null ? (
          <ImageWrapper loading={loading} uploadFile={uploadFile} />
        ) : (
            <TextWrapper id="text-to-translate" text={text} />
          )}
        <br></br>
        <h1>UCITA TRANSLATION</h1>
        <div class="border">
          <div>
          <select id="from-language" class="dropdown">
          <option value="">Detect Language</option>
          <option value="ar">Arabic</option>
          <option value="ca">Catalan</option>
          <option value="zh-Hans">Chinese (Simplified)</option>
          <option value="zh-Hant">Chinese (Traditional)</option>
          <option value="hr">Croatian</option>
          <option value="en" or value="eng">English</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="el">Greek</option>
          <option value="he">Hebrew</option>
          <option value="hi">Hindi</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="pt">Portuguese</option>
          <option value="ru">Russian</option>
          <option value="es">Spanish</option>
          <option value="th">Thai</option>
          <option value="tr">Turkish</option>
          <option value="vi">Vietnamese</option>
        </select>
            <br></br>
            <label for="select-language">
              <strong>Translate to:</strong>
              {"  "}
            </label>
            <select id="select-language" class="dropdown">
              <option value="ar">Arabic</option>
              <option value="ca">Catalan</option>
              <option value="zh-Hans">Chinese (Simplified)</option>
              <option value="zh-Hant">Chinese (Traditional)</option>
              <option value="hr">Croatian</option>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="el">Greek</option>
              <option value="he">Hebrew</option>
              <option value="hi">Hindi</option>
              <option value="it">Italian</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
              <option value="es">Spanish</option>
              <option value="th">Thai</option>
              <option value="tr">Turkish</option>
              <option value="vi">Vietnamese</option>
            </select>
          </div>
          <br></br>
          <button
            onClick={translation}
            type="submit"
            class="btn btn-primary mb-2"
            id="translate"
          >
            <h3>Translate text</h3>
          </button>
          <div id="detected-language">
            <strong>Detected language:</strong>
            {"  "}
            <textarea id="detected-language-result"></textarea>
          </div>
          <br></br>
          <div id="detected-language">
            <strong>Translated to:</strong>
            {"  "}
            <textarea id="translated-language-result"></textarea>
          </div>
          <br></br>
          <div id="translator-text-response">
            <label for="translation-result">
              <strong>Translated text:</strong>
              <br></br>
            </label>
            <textarea class="textarea1" id="translation-result"></textarea>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
