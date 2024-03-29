import React, { useEffect, useState } from 'react';
import './index.scss';
import WorkspaceCard from '../../components/workspaceCard';
import AddNewWorkspace from '../../components/addNewWorkspace';
import TemplateModal from '../../components/templateModal';
import Layout from '../../layouts/layout';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [isModal, setIsModal] = useState(false);
    const workspaces = [
        {
            id: 0,
            template:"temp-column"
        },
        {
            id: 1,
            template: "temp-row"
        },
        {
            id: 2,
            template: "temp-column"
        }
    ]
    const navigate = useNavigate();
    const handleSelectTemplate = () => {
        setIsModal(true)
    }

    const handleCloseModal = () => {
        setIsModal(false)
    }
    const handleClickWorkspace = (id,template) => {
        navigate(`/workspace/${id}`, { state: { template: template } });
    }

    return (

        <Layout>
            <div className="p-dashboard">
                <AddNewWorkspace onClick={handleSelectTemplate} />
                {isModal && <TemplateModal onClose={handleCloseModal} />}
                {workspaces.map((workspace) =>
                    <WorkspaceCard onClick={() => handleClickWorkspace(workspace.id,workspace.template)} />
                )}

                {/* <WorkspaceCard />
                <WorkspaceCard />
                <WorkspaceCard /> */}
            </div>
        </Layout>

    );
};

export default Dashboard;
