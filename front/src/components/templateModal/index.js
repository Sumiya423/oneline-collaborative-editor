import React, { useEffect, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const TemplateModal = ({ onClose }) => {
  const navigate = useNavigate();
  const templates = [
    {
      value: 'temp-column',
      img: '/icons/template-col.png',
      imgActive: '/icons/template-col-active.png'
    },
    {
      value: 'temp-row',
      img: '/icons/template-row.png',
      imgActive: '/icons/template-row-active.png'
    }
  ]
  const [template, setTemplate] = useState();

  useEffect(() => {
    if (template) {
      setTimeout(() => {
        navigate('/workspace/create', { state: { template: template.value } });
      }, 300);
    }
  }, [template, navigate]);

  return (
    <div className="c-modal">
      <div className="c-modal__section">
        <div className="c-modal__header">
          <span className="c-modal__header-text">Add a template</span>
          <img
            src="/icons/close.png"
            className="c-modal__close-button"
            onClick={onClose}
          />
        </div>
        <div className="c-modal__layouts">
          <span className="c-modal__layout-text">Choose Layout</span>
          <div className="c-modal__options">
            {templates?.map((tem) =>
              <div className="c-modal__option" onClick={() => setTemplate(tem)}>
                <img src={template?.value === tem?.value ? tem?.imgActive : tem?.img} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;
