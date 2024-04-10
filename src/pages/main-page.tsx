import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../components/hooks";
import { setUser } from "../components/store/action";
import styled from "@emotion/styled";

export const MainBlock = styled.div`
    max-width: 900px;
    background-color: white;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    margin: 0 auto;
    border-radius: 33px;
    padding: 38px 97px 38px 97px;
    box-sizing: border-box;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
`;

export const Input = styled.input`
    margin-bottom: 10px;
    width: 100%;
    height: 46px;
    border-radius: 6px;
    background-color: white;
    font-size: 18px;
    color: #333333;
    border: 1px solid #AEAEAE;
    padding: 6px 0 6px 10px;
`;

export const ButtonStyles = `
    cursor: pointer;
    display: table;
    text-decoration: none;
    font-size: 24px;
    color: #FFFFFF;
    width: max-content;
    height: 42px;
    background: rgb(155, 89, 163);
    border-radius: 10px;
    padding: 7px 7px 7px 7px;
    text-align: center;
    margin: 0 auto;
    border: none;
`

export const Button = styled.button`
    ${ButtonStyles}
`;

export const Svg = styled.svg`
    & > path {
        fill: rgb(155, 89, 163);
    }
`

function MainPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const userData = useAppSelector((state) => state.userData);

    const [name, setName] = useState(userData.name);
    const [roomNumber, setRoomNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setName(userData.name);
    }, [userData]);

    const handleName = (evt: ChangeEvent<HTMLInputElement>) => {
        setName(evt.target.value);
        setErrorMessage('');
    };

    const handleRoomNumber = (evt: ChangeEvent<HTMLInputElement>) => {
        setRoomNumber(evt.target.value);
        setErrorMessage('');
    };

    const handleSubmit = (evt: SyntheticEvent) => {
        evt.preventDefault();
        if (!name || !roomNumber) {
            setErrorMessage('Поле имени и комнаты не должно быть пустым');
            return;
        }
        const data = {
            name: name,
            currentRoom: roomNumber
        };
        dispatch(setUser(data));
        sessionStorage.setItem('userData', JSON.stringify(data));

        navigate(`/chat/${data.currentRoom}`);
    };

    return (
        <MainBlock>
            <form onSubmit={handleSubmit}>
                <Input required type="text" placeholder="Введите имя" value={name} onChange={handleName}></Input>
                <Input required type="text" placeholder="Введите номер комнаты" value={roomNumber} onChange={handleRoomNumber}></Input>
                <p className="error">{errorMessage}</p>
                <Button type="submit" className="send-button">Присоединиться</Button>
            </form>
        </MainBlock>
    );
}

export default MainPage;