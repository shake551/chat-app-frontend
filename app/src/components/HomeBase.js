import styled from "styled-components";

const HomeWrapper = styled.div`
  text-align: center;
`;

const HomeImg = styled.img`
  margin-top: 50px;
`;

const TitleWrapper = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: #707070;
  font-size: 60px;
`;

const FlowerElement = styled.span`
  color: #fac46f;
`;

const HomeBase = () => {
    return (
        <HomeWrapper>
            <HomeImg src={`${process.env.PUBLIC_URL}/sakura.png`} alt="sakura"/>
            <TitleWrapper>
                <Title>
                    <FlowerElement>ハナ</FlowerElement>ス
                </Title>
            </TitleWrapper>
        </HomeWrapper>
    );
}

export default HomeBase;
