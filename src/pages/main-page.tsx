import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../components/hooks";
import { setUser } from "../components/store/action";

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
        <div className="main-page">
            <form onSubmit={handleSubmit}>
                <input required type="text" placeholder="Введите имя" value={name} onChange={handleName}></input>
                <input required type="text" placeholder="Введите номер комнаты" value={roomNumber} onChange={handleRoomNumber}></input>
                <p className="error">{errorMessage}</p>
                <button type="submit" className="send-button">Присоединиться</button>
            </form>
        </div>
    );
}

export default MainPage;