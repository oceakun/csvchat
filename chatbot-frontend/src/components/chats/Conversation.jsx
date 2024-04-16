import React, { useState } from "react";
import styled from "@emotion/styled";
import QueryInput from "./QueryInput";
import ChartCommand from "./ChartCommand";
import Analysis from "./Analysis";
import Visualize from "./Visualize";
import chatImg from "../../assets/chat-small.png";
import chartImg from "../../assets/chart-small.png";

function Conversation() {
  const [data, setData] = useState([
    {
      query: "A sample query",
      answer:
        "A sample answer",
      rating: "none",
    },
    {
      query: "A sample query",
      answer: "A sample answer",
      rating: "none",
    },
    {
      query: "A sample query",
      answer: "A sample answer",
      rating: "none",
    },
    {
      query: "A sample query",
      answer: "A sample answer",
      rating: "none",
    },
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newCommand, setNewCommand] = useState("");
  const [mode, setMode] = useState("visualize");

  return (
    <ConversationsContainer>
      <AvailableModes>
        <button
          id="myVizBtn"
          status={mode}
          onClick={() => setMode("visualize")}
        >
          Visualize
          <img src={chartImg} />
        </button>
        <button
          id="myAnlysBtn"
          status={mode}
          onClick={() => setMode("analyze")}
        >
          Analyse
          <img src={chatImg} />
        </button>
      </AvailableModes>

      {mode === "visualize" ? (
        <>
          <ModesAndExchangesWrapper>
            <Visualize data={data} setData={setData} />
          </ModesAndExchangesWrapper>

          <ChartCommand
            newCommand={newCommand}
            setNewCommand={setNewCommand}
            data={data}
            setData={setData}
          />
        </>
      ) : (
        <>
          <ModesAndExchangesWrapper>
            <Analysis data={data} setData={setData} />
          </ModesAndExchangesWrapper>

          <QueryInput
            newQuestion={newQuestion}
            setNewQuestion={setNewQuestion}
            data={data}
            setData={setData}
          />
        </>
      )}
    </ConversationsContainer>
  );
}

export default Conversation;

const ConversationsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  flex-grow: 1;
  border-radius: 24px 24px 0px 0px;
  background: transparent;
  position: relative;
`;

const ModesAndExchangesWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  padding: 5px 0 0 0;
  width: 100%;
  height: 100%;
  @media (max-width: 720px) {
    justify-content: center;
    margin-right: 0px;
  }
`;

const AvailableModes = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  > button {
    width: 50%;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
  width: 60%;

  #myVizBtn {
    border-radius: 2px;
    height: 2rem;
    padding: 0rem 1rem;
    background-color: black;
    color: #9360be;
    border: none;
    box-shadow: ${(props) =>
      props.status === "visualize"
        ? "-90px 10px 60px 0px #9360be70"
        : "-90px 10px 60px 0px #9360be30"};
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  #myVizBtn:hover {
    cursor: pointer;
    box-shadow: -90px 10px 60px 0px #9360be70;
    opacity: 9;
  }

  #myAnlysBtn {
    border-radius: 2px;
    height: 2rem;
    /* width: 10rem; */
    padding: 0rem 1rem;
    background-color: black;
    color: rgb(var(--accent));
    border: none;
    box-shadow: 150px 0px 60px 0px #7c3aed30;

    box-shadow: ${(props) =>
      props.status === "analyze"
        ? "150px 0px 60px 0px #7c3aed70"
        : "150px 0px 60px 0px #7c3aed30"};
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  #myAnlysBtn:hover {
    cursor: pointer;
    box-shadow: 150px 0px 60px 0px #7c3aed70;
    opacity: 9;
  }
`;
