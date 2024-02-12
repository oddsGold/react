import React, {useState} from 'react';

export default function LoginFormTfa({QrCode, loginTFA, forgotTFA}){


    const [codeInput, setCodeInput] = useState('');

    const sendTfaCodeHandler = () => {
        if(codeInput.length > 0){
            loginTFA(codeInput);
        }
    };

    const sendToEmailBtnHandler = () => {
        forgotTFA();
    };


    return (
        <div className="row">
            <div className="col-md-12">

                {QrCode && <div className="row">
                    <div className="col"><img src={QrCode} className="qr" /></div>
                </div>}

                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            onChange={(e) => setCodeInput(e.target.value)}
                            className="form-control mb-3"
                            placeholder="Введите код TFA"
                            value={codeInput}
                        />
                    </div>
                </div>
                <div className="row justify-content-between">
                    <div className="col-md-5">
                        <button onClick={sendTfaCodeHandler} type="submit" className="btn w-100 btn-primary">Отправить</button>
                    </div>
                    <div className="col-md-7">
                        <button onClick={sendToEmailBtnHandler} type="submit" className="btn w-100 btn-primary email-send">Отправить на email</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
