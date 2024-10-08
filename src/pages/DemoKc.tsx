import { useState } from 'react';
import '../App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import '/node_modules/primeflex/primeflex.css'
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { httpClient } from '../HttpClient';
import { useKeycloak } from '../contexts/AuthContext';

const DemoKc = () => {
  const [infoMessage, setInfoMessage] = useState('');
  const { kc } = useKeycloak();

  const callBackend = () => {
    httpClient.get('https://mockbin.com/request');
  };

  if (!kc) return <div></div>;

  return (
    <div>
      <div className='grid'>
        <div className='col-1'></div>
        <div className='col-2'>
          <div className="col">
            <Button onClick={() => { setInfoMessage(kc.authenticated ? 'Authenticated: TRUE' : 'Authenticated: FALSE') }}
              className="m-1 custom-btn-style"
              label='Is Authenticated' />

            <Button onClick={() => { kc.login() }}
              className='m-1 custom-btn-style'
              label='Login'
              severity="success" />

            <Button onClick={() => { setInfoMessage(JSON.stringify(kc.token)) }}
              className="m-1 custom-btn-style"
              label='Show Access Token'
              severity="info" />

            <Button onClick={() => { setInfoMessage(JSON.stringify(kc.tokenParsed)) }}
              className="m-1 custom-btn-style"
              label='Show Parsed Access token'
              severity="warning" />

            <Button onClick={() => { setInfoMessage(kc.isTokenExpired(5).toString()) }}
              className="m-1 custom-btn-style"
              label='Check Token expired'
              severity="info" />

            <Button onClick={() => { kc.updateToken(10).then((refreshed) => { setInfoMessage('Token Refreshed: ' + refreshed.toString()) }, (e) => { setInfoMessage('Refresh Error') }) }}
              className="m-1 custom-btn-style"
              label='Update Token (if about to expire)' />

            <Button onClick={callBackend}
              className='m-1 custom-btn-style'
              label='Send HTTP Request'
              severity="success" />

            <Button onClick={() => { kc.logout({ redirectUri: 'http://frontend/' }) }}
              className="m-1 custom-btn-style"
              label='Logout'
              severity="danger" />

            <Button onClick={() => { setInfoMessage(kc.hasRealmRole('admin').toString()) }}
              className="m-1 custom-btn-style"
              label='has realm role "Admin"'
              severity="info" />

            <Button onClick={() => { setInfoMessage(kc.hasResourceRole('test').toString()) }}
              className="m-1 custom-btn-style"
              label='has client role "test"'
              severity="info" />

          </div>
        </div>
        <div className='col-6'>
          <Card>
            <p style={{ wordBreak: 'break-all' }} id='infoPanel'>
              {infoMessage}
            </p>
          </Card>
        </div>
        <div className='col-2'></div>
      </div>
    </div>
  );
}

export default DemoKc