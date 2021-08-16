import React, { useEffect, useState } from 'react';
import './App.css';
import { loadData } from './libs/reader';
import Tweets from './components/Tweets';
import UploadFileForm from "./components/UploadFileForm";

function App() {
  const [finalOutput, setFinalOutput] = useState<{[key: string]: string[]}>({});
  useEffect(() => {
    loadData().then((data) => {
      setFinalOutput(data);
    })
  }, []);

  return (
    <div className="App">
      <div>
        <h2>Upload new user and tweet files</h2>
        <UploadFileForm updateDisplay={setFinalOutput} />
        <hr />
        <h2>A list of twitter users and their tweets.</h2>
        <dl>
          {finalOutput && Object.keys(finalOutput).map((user, index) => {
            const tweets: string[] = finalOutput[user];
            return (
              <React.Fragment key={`rf_${index}`}>
                <dt key={user}>{user}</dt>
                <dd key={`${user}_${index}`}><Tweets tweets={tweets} /></dd>
              </React.Fragment>
            )
          })}
        </dl>

        {!finalOutput && <p>Nothing to see here yet.</p>}
      </div>
    </div>
  );
}

export default App;
