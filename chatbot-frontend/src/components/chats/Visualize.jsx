import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "@emotion/styled";
import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";
import likeClicked from "../../assets/like-clicked.svg";
import dislikeClicked from "../../assets/dislike-clicked.svg";
import animation from "../../assets/animation.svg";

function Visualize({ data, setData }) {
  const [height, setHeight] = useState(window.innerHeight * 0.85 - 145.66);

  window.addEventListener("resize", () => {
    const newHeight = window.innerHeight * 0.85 - 145.66;
    setHeight(newHeight);
  });

  useEffect(() => {
    console.log("data : ", data);
  }, []);

  const rateJournalistQuery = (event, queryIndex, rating) => {
    event.preventDefault();
    const newData = data;
    newData.map((exchange, index) => {
      if (index == queryIndex) {
        exchange.rating = rating;
      }
    });
    setData(newData);
  };

  return (
    <ExchangesExternalContainer>
      <ExchangesContainer height={height}>
        {data.map((exchange, qIndex) => {
          return (
            <Exchange key={qIndex}>
              <Query>
                <span>{exchange.query}</span>
              </Query>
              <Response>
                {exchange.answer === "%display animation%" ? (
                  <ResponseAnimation src={animation} alt="animation" />
                ) : (
                  <ResponseBoxWrapper>
                    <ResponseBox>
                      <span>{exchange.answer}</span>
                      <RateResponse>
                        {exchange.rating === "upvoted" ? (
                          <img
                            src={likeClicked}
                            alt="upvote clicked icon"
                            className="clicked"
                          />
                        ) : (
                          <img
                            src={like}
                            alt="upvote icon"
                            onClick={(e) =>
                              rateJournalistQuery(e, qIndex, "upvoted")
                            }
                          />
                        )}
                        {exchange.rating === "downvoted" ? (
                          <img
                            src={dislikeClicked}
                            alt="downvote clicked icon"
                            className="clicked"
                          />
                        ) : (
                          <img
                            src={dislike}
                            alt="downvote icon"
                            onClick={(e) =>
                              rateJournalistQuery(e, qIndex, "downvoted")
                            }
                          />
                        )}
                      </RateResponse>
                    </ResponseBox>
                  </ResponseBoxWrapper>
                )}
              </Response>
            </Exchange>
          );
        })}
        <DummyElement />
      </ExchangesContainer>
    </ExchangesExternalContainer>
  );
}

export default Visualize;

const ExchangesExternalContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
  padding-top: 20px;
`;

const ExchangesContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 40px;
  width: 59%;
  padding: 25px 75px;
  position: absolute;
  background: black;
  padding-bottom: 0;

  height: ${(props) => props.height + "px"};
  overflow-y: scroll;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  ::-moz-scrollbar {
    display: none;
    appearance: none;
  }
  @media (max-width: 720px) {
    width: 95%;
  }
`;

const Exchange = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
`;

const Query = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
  > span {
    padding: 15px 20px;
    border-radius: 5px;
    // border: 1px solid rgb(89, 168, 104,0.3);
    // box-shadow: rgb(181, 240, 192, 0.5) 2px -2px 16px;
    background: #161716;
    color: rgb(255, 255, 255, 0.8);
    font-size: 15px;
    // color: white;
    @media (max-width: 720px) {
      font-size: 14px;
    }
  }
`;

const ResponseAnimation = styled.img`
  position: absolute;
  margin-left: 80px;
`;

const Response = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0;
  gap: 10px;
  width: 100%;
  > span {
    font-size: 15px;
    background: #e3e9ff;
    padding: 25px 20px;
    border-radius: 5px;
    @media (max-width: 720px) {
      font-size: 14px;
    }
  }
`;

const ResponseBoxWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  width: 100%;
  background: rgb(120, 239, 166);
  gap: 10px;
  background-color: transparent;
  color: rgb(255, 255, 255);
`;

const ResponseBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  gap: 10px;
  max-width: 90%;
  > span {
    font-size: 15px;
    background-color: rgb(17, 18, 23);
    color: rgb(255, 255, 255, 0.8);
    padding: 25px 20px;
    border-radius: 5px;
    // box-shadow: rgba(0, 0, 255, 0.7) 0px 5px 15px;
    // border: 1px solid rgba(0, 0, 255, 0.7);
    min-width: 100px;
    @media (max-width: 720px) {
      font-size: 14px;
    }
  }
  @media (max-width: 720px) {
    max-width: 100%;
  }
`;

const RegenerateResponse = styled.div`
  display: ${(props) => (props.displayRegenerateButton ? "flex" : "none")};
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-left: 58px;
  margin-top: -30px;
  > img {
    height: 24px;
    width: 24px;
  }
  > img:hover {
    cursor: pointer;
  }

  font-size: 12px;
  font-style: italic;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.04em;
  color: #3b4c60;

  @media (max-width: 720px) {
    margin-left: 58px;
    margin-top: -30px;
  }
`;

const RateResponse = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
  margin-top: -25px;
  margin-left: -10px;

  > img {
    box-shadow: 0px 0px 4px 0px #00000035;
    height: 24px;
    width: 24px;
  }
  > img:hover {
    cursor: pointer;
    box-shadow: 0px 0px 8px 0px #00000035;
  }
  // > .clicked {
  //   background: #8391c6;
  //   padding: 3px;
  //   border-radius: 5px;
  //   box-shadow: 0px 0px 4px 0px #00000035;
  // }
  @media (max-width: 720px) {
    margin-top: -23px;
    margin-left: -10px;
  }
`;

const DummyElement = styled.div`
  padding-top: 80px;
`;

const MobileUserIcon = styled.img`
  display: none;

  @media (max-width: 720px) {
    display: flex;
  }
`;

const DesktopUserIcon = styled.img`
  display: flex;

  @media (max-width: 720px) {
    display: none;
  }
`;

const MobileBotIcon = styled.img`
  display: none;

  @media (max-width: 720px) {
    display: flex;
  }
`;

const DesktopBotIcon = styled.img`
  display: flex;

  @media (max-width: 720px) {
    display: none;
  }
`;
