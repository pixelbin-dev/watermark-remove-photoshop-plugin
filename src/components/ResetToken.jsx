import React, { useState, useEffect, useRef } from 'react';
import { PixelbinClient, PixelbinConfig } from '@pixelbin/admin';
import { handle } from '../utils';
import { constants } from '../constants';
import { storage } from '../utils';

const styles = {
  wrapper: { display: 'flex', gap: '1rem', flexDirection: 'column' },
  main: {
    display: 'flex',
    gap: '1rem',
    flexDirection: 'column',
    alignItems: 'center',
  },
  hideText: {
    color: 'white',
    width: '34px',
    fontWeight: '600',
  },
  inputBox: {
    height: '28px',
    padding: '6px 2px 0 2px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    margin: '1rem 0',
    color: 'var(--uxp-host-text-color)',
    fontSize: '20px',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: { marginRight: '0.5rem', height: '32px' },
  submitButton: { marginTop: '0.5rem' },
  apiTokenLink: { marginTop: '2rem' },
  errorMessage: {
    borderRadius: '4px',
    margin: '1rem',
    padding: '1rem',
    color: 'rgb(255, 255, 255)',
    backgroundColor: 'rgb(244, 67, 54)',
  },
};

export function ResetToken({ setToken, setAppOrgDetails }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [tokenInputValue, setTokenInputValue] = useState(
    storage.getItem('token')
  );
  const [isTypePassword, setIsTypePassword] = useState(true);
  const textFieldRef = useRef(null);

  useEffect(() => {
    if (textFieldRef.current) {
      // Directly set the type property
      textFieldRef.current.type = isTypePassword ? 'password' : 'text';
    }
  }, [isTypePassword]);

  useEffect(() => {
    console.log('CHeck Length..', tokenInputValue);
  }, [tokenInputValue]);

  useEffect(() => {
    return () => {
      storage.setItem('isResetTokenOn', false);
    };
  }, []);

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    const config = new PixelbinConfig({
      domain: constants.urls.apiDomain,
      apiSecret: tokenInputValue,
      integrationPlatform: constants.userAgent,
    });

    const pixelbin = new PixelbinClient(config);

    const [appOrgDetails, error] = await handle(
      pixelbin.organization.getAppOrgDetails()
    );

    if (error?.code === 401) {
      setErrorMessage('Invalid Token');
      return;
    }

    setToken(tokenInputValue);
    setAppOrgDetails(appOrgDetails);
    storage.setItem('isResetTokenOn', false);
    location.reload();
  };

  const handleTokenInputValueChange = (e) => {
    setTokenInputValue(e.target.value);
  };

  return (
    <div style={styles.wrapper}>
      <main style={styles.main}>
        <header style={styles.header}>
          <img src="./icons/erasebg.png" style={styles.productImage} />
          Reset Token
        </header>
        <div style={styles.inputWrapper}>
          <input
            style={styles.inputBox}
            type={isTypePassword ? 'password' : 'text'}
            name="token"
            placeholder="Enter API Token"
            value={tokenInputValue}
            onChange={handleTokenInputValueChange}
          />
          <div
            onClick={() => setIsTypePassword(!isTypePassword)}
            style={styles.hideText}
          >
            {isTypePassword ? 'Show' : 'Hide'}
          </div>
        </div>

        <sp-action-button
          style={styles.submitButton}
          disabled={!tokenInputValue ? true : undefined}
          onClick={handleSubmitClick}
        >
          Submit
        </sp-action-button>

        <sp-link
          quiet
          style={styles.apiTokenLink}
          href={constants.urls.redirectToAppsPage}
        >
          Get your API token
        </sp-link>
      </main>

      {errorMessage && (
        <sp-body style={styles.errorMessage}>{errorMessage}</sp-body>
      )}
    </div>
  );
}
