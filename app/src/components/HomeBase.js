import styled from "styled-components";

const HomeWrapper = styled.div`
  text-align: center;
`;

const HomeImg = styled.img`
  margin: 50px;
`;

const HomeBase = () => {
    return (
        <HomeWrapper>
            <HomeImg src={`${process.env.PUBLIC_URL}/sakura.png`} alt="sakura"/>
        </HomeWrapper>
    );
}

export default HomeBase;
