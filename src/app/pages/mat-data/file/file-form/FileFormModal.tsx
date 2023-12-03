import LPModal from "../../../../modules/modal/LPModal";
import React, {FC, useEffect, useRef, useState} from "react";
import {ErrorMessage, Field, Form, Formik, FormikValues} from "formik";
import * as Yup from "yup";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {IInsertFile,} from "../../core/_models";
import {
    createFile,
    getFileById,
    updateFile
} from "../../core/_requests";

type Props = {
    show: any[];
    fileId: any[]
}

const FileFormModal: FC<Props> = (props) => {
    const intl = useIntl();
    const [modalShow, setModalShow] = props.show;
    const [id, setId] = props.fileId;

    const messageRequired = intl.formatMessage({id: 'MESSAGE.REQUIRED'})
    const formSchema = Yup.object({
        name: Yup.string().required(messageRequired),
        //file: Yup.mixed().required(messageRequired),
    });

    const [selectedFile, setSelectedFile] = useState<any>([]);

    const [initValues, setInitialValues] = useState<IInsertFile>({
        name: ""
    })
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!modalShow) {
            clearForm();
        }
    }, [modalShow])

    useEffect(() => {
        if (id != undefined) {
            getFileById(id).then(r => {
                setInitialValues(r.data);
            }).catch(reason => {
                if (reason.response.data.error.message) {
                    toast.error(reason.response.data.error.message);
                } else {
                    toast.error(intl.formatMessage({id: 'MESSAGE.API_ERROR'}));
                }
            })
        }
    }, [id])

    const submitForm = (values: IInsertFile, actions: FormikValues) => {
        setSubmitting(true)
        values['file'] = selectedFile;
        const apiCall = values.id == undefined ? createFile(values) : updateFile(values);
        apiCall.then(r => {
            toast.success(intl.formatMessage({id: 'MESSAGE.API_SUCCESS'}));
            setModalShow(false);
        }).catch(reason => {
            if (reason.response.data.error.message) {
                toast.error(reason.response.data.error.message);
            } else {
                toast.error(intl.formatMessage({id: 'MESSAGE.API_ERROR'}));
            }
        }).finally(() => {
            setSubmitting(false);
        })
    }
    const cancel = () => setModalShow(false);
    const clearForm = () => {
        setId(undefined);
        setInitialValues({
            name: "",
            file: undefined
        })
    }

    return (
        <>
            <LPModal
                show={props.show}
                title={intl.formatMessage({id: 'FILE_FORM.TITLE'})}
                modalId={"application-form-modal"}
                dialogClassName={'mw-650px'}
            >
                <Formik enableReinitialize={true} validationSchema={formSchema}
                        initialValues={initValues}
                        onSubmit={submitForm}>
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleSubmit,
                          handleBlur,
                          setFieldValue,
                          isValid,
                          dirty,
                      }) => (
                        <Form className='mx-auto mw-600px w-100 pt-5 pb-10'
                              id='kt_create_application_form'>
                            <Field type="hidden" name='id'
                                   className='form-control form-control-lg form-control-solid'/>
                            <div className='fv-row mb-10'>
                                <label
                                    className='form-label required'>{intl.formatMessage({id: 'FILE_FORM.NAME'})}</label>
                                <Field name='name'
                                       placeholder={intl.formatMessage({id: 'FILE_FORM.NAME'})}
                                       className='form-control form-control-lg form-control-solid'/>
                                <div className='text-danger mt-2'>
                                    <ErrorMessage name='name'/>
                                </div>
                            </div>
                            {id == undefined ?
                                <div className='fv-row mb-10'>
                                    <label
                                        className='form-label'>{intl.formatMessage({id: 'FILE_FORM.FILE'})}</label>

                                    <Field name='file'
                                           type='file'
                                           onChange={(event) => {
                                               setFieldValue("file",
                                                   event.currentTarget.files.length > 0 ? event.currentTarget.files[0] : null);
                                           }}
                                           placeholder={intl.formatMessage({id: 'FILE_FORM.FILE'})}
                                           className='form-control form-control-lg form-control-solid'/>
                                    <div className='text-danger mt-2'>
                                        <ErrorMessage name='file'/>
                                    </div>
                                </div>
                                : null}

                            <div className='text-center pt-15'>
                                <button
                                    type='button'
                                    onClick={() => cancel()}
                                    className='btn btn-light me-3'
                                    disabled={isSubmitting}
                                >
                                    {intl.formatMessage({id: 'FILE_FORM.DISCARD'})}
                                </button>

                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                    data-kt-indicator={isSubmitting ? 'on' : 'off'}
                                    disabled={isSubmitting}
                                >
                                    <span
                                        className='indicator-label'>{intl.formatMessage({id: 'FILE_FORM.SUBMIT'})}</span>
                                    <span className="indicator-progress">
                                            {intl.formatMessage({id: 'GENERAL.PLEASE_WAIT'})} <span
                                        className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                        </span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </LPModal>
        </>
    );
}

export default FileFormModal;