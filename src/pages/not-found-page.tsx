import { Link } from "react-router-dom"
import styled from "@emotion/styled";
import { ButtonStyles, MainBlock } from "./main-page";
import { H2 } from "./chat-room";

const StyledLink = styled(Link)`
    ${ButtonStyles} {
        height: auto;
    }
`;

function NotFoundPage() {
    return (
        <MainBlock>
            <H2>404 Страница не найдена</H2>
            <StyledLink to="/login">На главную</StyledLink>
        </MainBlock>
    )
}

export default NotFoundPage