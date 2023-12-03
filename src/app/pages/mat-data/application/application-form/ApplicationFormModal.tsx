import LPModal from "../../../../modules/modal/LPModal";
import React, {FC, useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik, FormikValues} from "formik";
import * as Yup from "yup";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {IFileDtoApiResponse, IUpsertApplication} from "../../core/_models";
import {createApplication, getApplicationById, getFiles, updateApplication} from "../../core/_requests";

type Props = {
    show: any[];
    applicationId: any[]
}

const ApplicationFormModal: FC<Props> = (props) => {
    const intl = useIntl();
    const [modalShow, setModalShow] = props.show;
    const [id, setId] = props.applicationId;

    const messageRequired = intl.formatMessage({id: 'MESSAGE.REQUIRED'})
    const formSchema = Yup.object({
        name: Yup.string().required(messageRequired),
        description: Yup.string(),
        acceptedExtensions: Yup.string().required(messageRequired),
        url: Yup.string().required(messageRequired),
        templateId: Yup.number(),
        active: Yup.boolean(),
    });

    const [initValues, setInitialValues] = useState<IUpsertApplication>({
        acceptedExtensions: "",
        active: true,
        name: "",
        url: ""
    })
    const [isSubmitting, setSubmitting] = useState(false);
    const [files, setFiles] = useState<IFileDtoApiResponse[]>([]);

    useEffect(() => {
        if(!modalShow){
            clearForm();
        }
    },[modalShow])

    useEffect(() => {
        getFiles().then(r => setFiles(r.data));
    },[modalShow])

    useEffect(() => {
        if(id!=undefined){
            getApplicationById(id).then(r => {
                setInitialValues(r.data);
            }).catch(reason => {
                if (reason.response.data.error.message) {
                    toast.error(reason.response.data.error.message);
                } else {
                    toast.error(intl.formatMessage({id: 'MESSAGE.API_ERROR'}));
                }
            })
        }
    },[id])

    const submitForm = (values: IUpsertApplication, actions: FormikValues) => {
        setSubmitting(true)

        const apiCall = values.id==undefined? createApplication(values) : updateApplication(values);
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
            acceptedExtensions: "",
            active: true,
            name: "",
            url: ""
        })
    }

    return (
        <>
        <LPModal
            show={props.show}
            title={intl.formatMessage({id: 'APPLICATION_FORM.TITLE'})}
            modalId={"application-form-modal"}
            dialogClassName={'mw-650px'}
        >
            <Formik enableReinitialize={true} validationSchema={formSchema} initialValues={initValues}
                    onSubmit={submitForm}>
                {({errors, touched}) => (
                    <Form className='mx-auto mw-600px w-100 pt-5 pb-10'
                          id='kt_create_application_form'>
                        <Field type="hidden" name='id'
                               className='form-control form-control-lg form-control-solid'/>
                        <div className='fv-row mb-10'>
                            <label
                                className='form-label required'>{intl.formatMessage({id: 'APPLICATION_FORM.NAME'})}</label>
                            <Field name='name'
                                   placeholder={intl.formatMessage({id: 'APPLICATION_FORM.NAME'})}
                                   className='form-control form-control-lg form-control-solid'/>
                            <div className='text-danger mt-2'>
                                <ErrorMessage name='name'/>
                            </div>
                        </div>
                        <div className='fv-row mb-10'>
                            <label
                                className='form-label'>{intl.formatMessage({id: 'APPLICATION_FORM.DESCRIPTION'})}</label>
                            <Field name='description'
                                   placeholder={intl.formatMessage({id: 'APPLICATION_FORM.DESCRIPTION'})}
                                   className='form-control form-control-lg form-control-solid'/>
                        </div>
                        <div className='fv-row mb-10'>
                            <label
                                className='form-label required'>{intl.formatMessage({id: 'APPLICATION_FORM.ACCEPTED_EXTENSIONS'})}</label>
                            <Field name='acceptedExtensions'
                                   placeholder={intl.formatMessage({id: 'APPLICATION_FORM.ACCEPTED_EXTENSIONS'})}
                                   className='form-control form-control-lg form-control-solid'/>
                            <div className='text-danger mt-2'>
                                <ErrorMessage name='acceptedExtensions'/>
                            </div>
                        </div>
                        <div className='fv-row mb-10'>
                            <label
                                className='form-label required'>{intl.formatMessage({id: 'APPLICATION_FORM.URL'})}</label>
                            <Field name='url'
                                   placeholder={intl.formatMessage({id: 'APPLICATION_FORM.URL'})}
                                   className='form-control form-control-lg form-control-solid'/>
                            <div className='text-danger mt-2'>
                                <ErrorMessage name='url'/>
                            </div>
                        </div>
                        <div className='fv-row mb-10'>
                            <label
                                className='form-label required'>{intl.formatMessage({id: 'APPLICATION_FORM.TEMPLATE'})}</label>

                            <Field
                                component='select'
                                name='templateId'
                                className='form-select form-select-lg form-select-solid'

                            >
                                <option></option>
                                {
                                    files
                                        .map(t => <option key={t.id}
                                                          value={t.id}>{t.name}</option>)
                                }

                            </Field>
                            <div className='text-danger mt-2'>
                                <ErrorMessage name='templateId'/>
                            </div>
                        </div>
                        <div className='fv-row mb-10'>
                            <div className="form-check form-switch form-check-custom form-check-solid">
                                <Field name='active' id="active" type='checkbox' className='form-check-input'/>
                                <label className="form-check-label">
                                    {intl.formatMessage({id: 'APPLICATION_FORM.ACTIVE'})}
                                </label>
                            </div>

                        </div>

                        <div className='text-center pt-15'>
                            <button
                                type='button'
                                onClick={() => cancel()}
                                className='btn btn-light me-3'
                                disabled={isSubmitting}
                            >
                                {intl.formatMessage({id: 'APPLICATION_FORM.DISCARD'})}
                            </button>

                            <button
                                type='submit'
                                className='btn btn-primary'
                                data-kt-indicator={isSubmitting ? 'on' : 'off'}
                                disabled={isSubmitting}
                            >
                                    <span
                                        className='indicator-label'>{intl.formatMessage({id: 'APPLICATION_FORM.SUBMIT'})}</span>
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

export default ApplicationFormModal;