import React, {useState, useEffect } from 'react';
import './App.css';

function renderBinaryLabel(labelText, isOk) {

  var labelClass = "label success";

  if (!isOk) {
    labelClass = "label warning";
  }

  return (
      <span className={labelClass}>{labelText}</span>
  );
}

function App() {

  const [inputBox, setInputBox] = useState(EXAMPLE_INPUT);
  const [outputBox, setOutputBox] = useState("This is where the output will go...");
  const [inputIsValidJson, setInputIsValidJson] = useState(true);
  const [inputHasRequestId, setInputHasRequestId] = useState(true);
  const [inputHasResponseURL, setInputHasResponseURL] = useState(true);
  const [inputHasStackId, setInputHasStackId] = useState(true);
  const [inputHasLogicalId, setInputHasLogicalId] = useState(true);
  const [inputHasPhysicalId, setInputHasPhysicalId] = useState(true);

  function handleInputChange(event) {
    setInputBox(event.target.value);
  }
  function handleOutputChange(event) {
    setOutputBox(event.target.value);
  }
    
  useEffect(() => { 
    var parsedText = inputBox.replace("Received event:","");
    var parsedJson = {};
    try {
      parsedJson = JSON.parse(parsedText);
      setInputIsValidJson(true);
    } catch (error) {
      setInputIsValidJson(false);
    }

    if (parsedJson.hasOwnProperty('RequestId'))   { setInputHasRequestId(true) } else { setInputHasRequestId(false) };
    if (parsedJson.hasOwnProperty('ResponseURL')) { setInputHasResponseURL(true) } else { setInputHasResponseURL(false) };
    if (parsedJson.hasOwnProperty('StackId'))     { setInputHasStackId(true) } else { setInputHasStackId(false) };
    if (parsedJson.hasOwnProperty('LogicalResourceId'))  { setInputHasLogicalId(true) } else { setInputHasLogicalId(false) };
    if (parsedJson.hasOwnProperty('PhysicalResourceId')) { setInputHasPhysicalId(true) } else { setInputHasPhysicalId(false) };
    
    setOutputBox(JSON.stringify(parsedJson, null, 2));
  }, [inputBox]);
  
  return (
    <div className="App">
      <br/>
      <textarea
        style={{ width: 500, height: 200 }}
        wrap="soft"
        onChange={handleInputChange} 
        defaultValue={inputBox}
        />
      <br />
      <br />
      {renderBinaryLabel("valid json", inputIsValidJson)}
      {renderBinaryLabel("RequestId", inputHasRequestId)}
      {renderBinaryLabel("ResponseURL", inputHasResponseURL)}
      {renderBinaryLabel("StackId", inputHasStackId)}
      {renderBinaryLabel("LogicalResourceId", inputHasLogicalId)}
      {renderBinaryLabel("PhysicalResourceId", inputHasPhysicalId)}
      <br/>
      <br />
      <textarea
        style={{ width: 500, height: 200 }}
        onChange={handleOutputChange} 
        value={outputBox}
        />
      <br/>
    </div>
  );
}

const EXAMPLE_INPUT = `
Received event: {
  "RequestType": "Delete",
  "ServiceToken": "arn:aws:lambda:us-east-1:111122223333:function:awsexamplelambdafunction",
  "ResponseURL": "https://cloudformation-custom-resource-response-useast1.s3.us-east-1.amazonaws.com/arn%3Aaws%3Acloudformation%3Aus-east-1%3A111122223333%3Astack/awsexamplecloudformation/33ad60e0-5f25-11e9-a734-0aa6b80efab2%7CMyCustomResource%7Ce2fc8f5c-0391-4a65-a645-7c695646739?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20170313T0212304Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Credential=QWERTYUIOLASDFGBHNZCV%2F20190415%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=dgvg36bh23mk44nj454bjb54689bg43r8v011uerehiubrjrug5689ghg94hb",
  "StackId": "arn:aws:cloudformation:us-east-1:111122223333:stack/awsexamplecloudformation/33ad60e0-5f25-11e9-a734-0aa6b80efab2",
  "RequestId": "e2fc8f5c-0391-4a65-a645-7c695646739",
  "LogicalResourceId": "MyCustomResource",
  "PhysicalResourceId": "test-MyCustomResource-1URTEVUHSKSKDFF",
  "ResourceType": "Custom::PingTester"
}`;

export default App;
