import React, { useEffect, useState } from "react";
import "./index.scss";
import Container from "../../components/container";
import Layout from "../../layouts/layout";
import { useLocation } from "react-router-dom";

const Workspace = () => {
    const [containers, setContainers] = useState(["", "", "", ""]);
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState("Untitled");
    const [name, setName] = useState("");
    const { state } = useLocation();

    console.log(state);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveName = () => {
        setName(inputValue);
    };

    const handleDeleteContainer = (index) => {
        console.log(index);
        if (containers.length > 2) {
            const updatedContainers = containers.filter((item, i) => index !== i);
            setContainers(updatedContainers)
        }
        else {
            console.log('at least two containers are needed!');
        }

    }
    const handleAddContainer = () => {
        if (containers.length < 4) {
            const updatedContainers =  [...containers, ""];
            setContainers(updatedContainers)
        }
        else {
            console.log('at most four containers are allowed!');
        }
    }

    return (
        <Layout>
            <div className="p-workspace">
                <div
                    className={
                        name == "" ? "p-workspace__header--notsaved" : "p-workspace__header"
                    }
                >
                    {isEditing ? (
                        <input
                            className="p-workspace__header-name"
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            autoFocus
                        />
                    ) : (
                        <span className="p-workspace__header-name">{inputValue}</span>
                    )}
                    <div className="p-workspace__header-right">
                        <img
                            className="p-workspace__header-edit"
                            src="/icons/edit-black.png"
                            onClick={handleEditClick}
                        />
                        <img
                            className="p-workspace__header-save"
                            src="/icons/tick-circle-green.png"
                            onClick={handleSaveName}
                        />
                    </div>
                </div>
                <div
                    className={
                        state.template == "temp-column"
                            ? "p-workspace__body"
                            : "p-workspace__body--row"
                    }
                >
                    {containers.map((container, i) => (
                        <Container
                            template={state.template}
                            width={
                                containers.length == 4 ? 22 : containers.length == 3 ? 30 : 45
                            }
                            handleDelete={() => handleDeleteContainer(i)}
                        />
                    ))}
                </div>
                <div className="p-workspace__footer">
                    <div className="p-workspace__header-add" onClick={() => handleAddContainer()}>
                        <img src="/icons/add-container.png" />
                        Add Container
                    </div>
                    <div className='p-workspace__profile-share'>
                        <img src='/icons/user-add.png' />
                        Share
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Workspace;
