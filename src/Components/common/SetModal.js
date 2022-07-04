import React from 'react';
import {Modal} from "./Modal";

export const SetModal = (props) => {
    const [isModal, setModal] = React.useState(false);
    return (
        <div>
            <button onClick={() => setModal(true)}>view</button>
            <Modal
                isVisible={isModal}
                content={<p>Add your content here</p>}
                onClose={() => setModal(false)}
                title={props.title}
                descriptions={props.descriptions}
                id={props.id}
            />
        </div>
    );
};