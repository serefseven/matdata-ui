import {KTSVG} from "../../../_metronic/helpers";
import {FC, ReactNode, useEffect, useState} from "react";
import {Modal} from "react-bootstrap";

type Props = {
    modalId?: string
    title?: string,
    className?: string,
    children?: ReactNode
    show: any[],
    dialogClassName?: string
    modalBodyClassName?: string
}

const LPModal: FC<Props> = (props) => {
    const [show, setShow] = props.show;
    const close = () => setShow(false);

    return (
        <Modal
            show={show}
            animation={true}
            dialogClassName={props.dialogClassName}
        >
            <Modal.Header className="modal-header">
                <Modal.Title>
                    <h5 className="modal-title">{props.title}</h5>
                </Modal.Title>
                <button
                    className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={close}
                >
                    <KTSVG
                        path="/media/icons/duotune/arrows/arr061.svg"
                        className="svg-icon svg-icon-2x"
                    />
                </button>
            </Modal.Header>
            <Modal.Body className={"modal-body "+props.modalBodyClassName}>
                {props.children}
            </Modal.Body>
        </Modal>
        /*<div className="modal fade" tabIndex={-1} id={props.modalId}>
            <div className={"modal-dialog "+props.className}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.title}</h5>
                        <div
                            className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <KTSVG
                                path="/media/icons/duotune/arrows/arr061.svg"
                                className="svg-icon svg-icon-2x"
                            />
                        </div>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-light"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" className="btn btn-primary">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>*/
    );

}


export default LPModal;