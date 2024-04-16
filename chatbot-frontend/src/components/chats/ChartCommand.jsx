import React from "react";
import axios from "axios";
import arrow from "../../assets/rightArrow.svg";
import arrowMobile from "../../assets/rightArrow-mobile.svg";
import styled from "@emotion/styled";

function CommandInput({ newCommand, setNewCommand, data, setData }) {
  const handleCommand = () => {
    const newDataItem = {
      command: newCommand,
      answer: "%display animation%",
      rating: "none",
    };
    const newData = [newDataItem, ...data];
    setData(newData);

    const baseUrl = import.meta.env.PUBLIC_CHART_COMMAND_URL;
    const fileName = localStorage.getItem("fileName");
    const columnNames = JSON.parse(localStorage.getItem("columnNames"));

    if (!fileName || !columnNames) {
      console.error("Table name or column names not found in localStorage");
      return;
    }
    const body = {
      file_name: fileName,
      command: newCommand,
      column_names: columnNames,
    };

    axios
      .post(baseUrl, body)
      .then((response) => {
        console.log("response : ", response);
        // const responseData = response.data;
        // const flattenedData = responseData
        //   .map((innerArray) => innerArray.join(", "))
        //   .join("\n");
        // newData[0].answer = flattenedData;
        // setData(newData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setNewCommand("");
  };

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && newQuery !== "") {
        handleCommand();
      }
    };
    
  return (
    <CommandInputContainer>
      <QueryEntryFieldWrapper>
        <QueryEntryField>
          <input
            type="text"
            onChange={(e) => setNewCommand(e.target.value)}
            value={newCommand}
            placeholder="What do you wanna visualize..."
            onKeyDown={handleKeyDown}
          />
          <MobileArrowIcon
            src={arrowMobile}
            alt="GoMobile"
            onClick={() => {
              if (newCommand != "") {
                handleCommand();
              }
            }}
          />
          <DesktopArrowIcon
            src={arrow}
            alt="Go"
            onClick={() => {
              if (newCommand != "") {
                handleCommand();
              }
            }}
          />
        </QueryEntryField>
      </QueryEntryFieldWrapper>
      <span style={{ paddingBottom: "20px" }}>
        This is a research tool. Answers may be inaccurate.
      </span>
    </CommandInputContainer>
  );
}

export default CommandInput;

const CommandInputContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: start;
  justify-content: space-around;
  gap: 10px;
  width: 58%;
  flex-grow: 1;
  background: black;

  position: fixed;
  bottom: 0px;
  padding: 20px 86px;
  box-shadow: black 0px -5px 15px;
  > span {
    font-size: 12px;
    font-style: italic;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.04em;
    text-align: left;
    color: #8d8d8d;

    width: 100%;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    @media (max-width: 720px) {
      font-size: 11px;
    }
  }

  > span > a {
    color: #86beff;
    text-decoration: underline;
  }

  @media (max-width: 720px) {
    width: 99%;
  }
`;

const QueryEntryFieldWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px 0 10px 0;
  width: 100%;
  flex-grow: 1;
  > span {
    font-size: 12px;
    font-style: italic;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.04em;
    text-align: left;
    color: #8d8d8d;
    @media (max-width: 720px) {
      font-size: 11px;
    }
  }

  > span > a {
    color: #86beff;
    text-decoration: underline;
  }
  @media (max-width: 720px) {
    justify-content: center;
  }
`;

const QueryEntryField = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-radius: 5px;
  height: 48px;
  background: black;
  border: 1px solid #3d4d6216;
  box-shadow: 0px 0px 11px 0px #0000004d;
  padding: 0 0.8% 0 2.5%;
  width: 100%;

  border: 1px solid rgb(181, 240, 192, 0.3);
  box-shadow: rgb(181, 240, 192, 0.5) 2px -2px 16px;

  @media (max-width: 720px) {
    height: 39px;
    width: 90%;
  }

  > img {
    &:hover {
      cursor: pointer;
      // border: 1px solid #3D4D6216;
    }
  }

  > input[type="text"] {
    font-weight: 400;
    font-size: 16px;
    border: none;
    width: 100%;
    height: 90%;
    color: rgb(255, 255, 255, 0.8);
    background: black;
    text-align: left;
    &:focus {
      outline: none;
    }

    @media (max-width: 720px) {
      font-size: 12px;
    }
  }
`;

const MobileArrowIcon = styled.img`
  display: none;
  @media (max-width: 720px) {
    display: flex;
  }
`;

const DesktopArrowIcon = styled.img`
  display: flex;

  @media (max-width: 720px) {
    display: none;
  }
`;
