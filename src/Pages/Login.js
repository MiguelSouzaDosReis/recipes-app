import React, { useState, useEffect } from 'react';

function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  // consegui criar a função validEmail com a ajuda do site: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/

  function validEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  function verifyFormDatas() {
    if (inputEmail.length > 0 && inputPassword.length > 0) {
      const NumberOfCaractersForPassword = 6;
      const validInputEmail = validEmail(inputEmail);
      const validInputPassword = inputPassword.length > NumberOfCaractersForPassword;
      const enableButton = !(validInputPassword && validInputEmail);
      setButtonDisabled(enableButton);
    }
  }

  useEffect(() => {
    verifyFormDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputEmail, inputPassword]);

  function formSubmit(e) {
    e.preventDefault();
  }

  return (
    <main>
      <form method="post" onSubmit={ (e) => formSubmit(e) }>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            data-testid="email-input"
            name="inputEmail"
            value={ inputEmail }
            onChange={ ({ target }) => setInputEmail(target.value) }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            data-testid="password-input"
            name="inputPassword"
            value={ inputPassword }
            onChange={ ({ target }) => setInputPassword(target.value) }
          />
        </label>
        <button
          disabled={ isButtonDisabled }
          type="submit"
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default Login;
