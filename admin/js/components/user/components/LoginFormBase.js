import React, {useState} from 'react';

export default function LoginFormBase({login}){


    const [loginInput, setLoginInput] = useState('');
    const [passInput, setPassInput] = useState('');


    const submitHandler = () => {
        if(loginInput.length > 0 && passInput.length > 0){
            login(loginInput, passInput);
        }
    };

    const pressHandled = (e) => {
        if(e.key === 'Enter')submitHandler();
    };

    return (
        <div className="row" onKeyUp={pressHandled}>
            <input
                type="text"
                onChange={(e) => setLoginInput(e.target.value)}
                className="form-control mb-3"
                placeholder="Введите логин"
                value={loginInput} />
            <input
                type="password"
                onChange={(e) => setPassInput(e.target.value)}
                className="form-control mb-3"
                placeholder="Введите пароль"
                value={passInput}
            />
            <button onClick={submitHandler}  type="submit" className="btn btn-primary btn-block">Отправить</button>
        </div>
    );
}
