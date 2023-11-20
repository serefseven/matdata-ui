import LPModal from "../../../../modules/modal/LPModal";
import React, {FC, useEffect, useState} from "react";
import {ErrorMessage, Field, FieldArray, Form, Formik, FormikValues} from "formik";
import * as Yup from "yup";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {IUpsertUserGroupRequest} from "../../core/_models";
import {createUserGroup, getUserGroupById, updateUserGroup} from "../../core/_requests";
import {IApplicationDtoApiResponse} from "../../../mat-data/core/_models";
import {getApplications} from "../../../mat-data/core/_requests";
import Flatpickr from "react-flatpickr";

type Props = {
    show: any[];
    modalId: any[]
}

const UserGroupFormModal: FC<Props> = (props) => {
    const intl = useIntl();
    const [modalShow, setModalShow] = props.show;
    const [id, setId] = props.modalId;

    const [applications, setApplications] = useState<IApplicationDtoApiResponse[]>([]);

    const messageRequired = intl.formatMessage({id: 'MESSAGE.REQUIRED'})
    const formSchema = Yup.object({
        name: Yup.string().required(messageRequired),
        endDate: Yup.date().required(messageRequired),
        active: Yup.boolean(),
        applicationIds: Yup.array(),
    });

    const [initValues, setInitialValues] = useState<IUpsertUserGroupRequest>({
        name: "", applicationIds: [], endDate: new Date().getMilliseconds(), id: 0, active: true
    })
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!modalShow) {
            clearForm();
        }
    }, [modalShow])

    useEffect(() => {
        if (id != undefined) {
            getUserGroupById(id).then(r => {
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

    useEffect(() => {
        getApplications().then(r => {
            setApplications(r.data);
        }).catch(reason => {
            if (reason.response.data.error.message) {
                toast.error(reason.response.data.error.message);
            } else {
                toast.error(intl.formatMessage({id: 'MESSAGE.API_ERROR'}));
            }
        })
    }, [])

    const submitForm = (values: IUpsertUserGroupRequest, actions: FormikValues) => {
        setSubmitting(true)

        const apiCall = values.id == undefined ? createUserGroup(values) : updateUserGroup(values);
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
            name: "", applicationIds: [], endDate: new Date(), id: 0, active: true
        })
    }

    const change = (selectedDates, dateStr, instance) => {

        console.log(selectedDates)
        console.log(dateStr)
        console.log(instance)
    }

    return (
        <>
            <LPModal
                show={props.show}
                title={intl.formatMessage({id: 'USERGROUP_FORM.TITLE'})}
                modalId={"application-form-modal"}
                dialogClassName={'mw-650px'}
                modalBodyClassName={'scroll-y mx-5 mx-xl-15 my-7'}
            >
                <Formik enableReinitialize={true} validationSchema={formSchema} initialValues={initValues}
                        onSubmit={submitForm}>
                    {({
                          values,
                          setFieldValue,
                          handleChange,
                          errors,
                          touched
                      }) => (
                        <Form className='mx-auto mw-600px w-100 pt-5 pb-10'
                              id='kt_create_application_form'>
                            <Field type="hidden" name='id'
                                   className='form-control form-control-lg form-control-solid'/>
                            <div className='fv-row mb-10'>
                                <label
                                    className='form-label required'>{intl.formatMessage({id: 'USERGROUP_FORM.NAME'})}</label>
                                <Field name='name'
                                       placeholder={intl.formatMessage({id: 'USERGROUP_FORM.NAME'})}
                                       className='form-control form-control-lg form-control-solid'/>
                                <div className='text-danger mt-2'>
                                    <ErrorMessage name='name'/>
                                </div>
                            </div>
                            <div className='fv-row mb-10'>
                                <label
                                    className='form-label required'>{intl.formatMessage({id: 'USERGROUP_FORM.END_DATE'})}</label>

                                <Flatpickr
                                    name='endDate'
                                    value={values['endDate']}

                                    onChange={(selectedDates, dateStr, instance) => {
                                        setFieldValue('endDate', selectedDates[0])
                                    }
                                    }

                                    className='form-control form-control-solid'
                                    placeholder={intl.formatMessage({id: 'USERGROUP_FORM.END_DATE'})}
                                />

                                <div className='text-danger mt-2'>
                                    <ErrorMessage name='endDate'/>
                                </div>
                            </div>
                            <div className='fv-row mb-10'>
                                <div className="form-check form-switch form-check-custom form-check-solid">
                                    <Field name='active' id="active" type='checkbox' className='form-check-input'/>
                                    <label className="form-check-label">
                                        {intl.formatMessage({id: 'USERGROUP_FORM.ACTIVE'})}
                                    </label>
                                </div>

                            </div>

                            <div className='fv-row mb-10'>
                                <label
                                    className='required fw-bold fs-6 mb-5'>{intl.formatMessage({id: 'USERGROUP_FORM.PERMITTES_APPLICATIONS'})}</label>
                                <ErrorMessage name='applications'/>
                                <FieldArray
                                    name="applicationIds"
                                    render={(arrayHelpers) => (
                                        <>
                                            {applications.map((a, index) => {
                                                return (<div key={index}>
                                                        <div className='separator separator-dashed my-5'></div>
                                                        <div className='d-flex fv-row'>
                                                            {/* begin::Radio */}
                                                            <div
                                                                className='form-check form-check-custom form-check-solid'>
                                                                {/* begin::Input */}
                                                                <Field name={'applicationIds'}
                                                                       id={'app_' + a.id}
                                                                       type='checkbox'
                                                                       value={a.id}
                                                                       className='form-check-input me-3'
                                                                       onChange={(e) => {
                                                                           if (e.target.checked) {
                                                                               arrayHelpers.insert(index, a.id);
                                                                           } else {
                                                                               arrayHelpers.remove(index);
                                                                           }
                                                                       }}
                                                                />

                                                                {/* end::Input */}
                                                                {/* begin::Label */}
                                                                <label className='form-check-label'
                                                                       htmlFor={'app_' + a.id}>
                                                                    <div
                                                                        className='fw-bolder text-gray-800'>{a.name}</div>
                                                                    <div className='text-gray-600'>
                                                                        {a.description}
                                                                    </div>
                                                                </label>
                                                                {/* end::Label */}
                                                            </div>
                                                            {/* end::Radio */}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </>
                                    )}
                                />
                            </div>

                            <div className='text-center pt-15'>
                                <button
                                    type='button'
                                    onClick={() => cancel()}
                                    className='btn btn-light me-3'
                                    disabled={isSubmitting}
                                >
                                    {intl.formatMessage({id: 'USERGROUP_FORM.DISCARD'})}
                                </button>

                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                    data-kt-indicator={isSubmitting ? 'on' : 'off'}
                                    disabled={isSubmitting}
                                >
                                    <span
                                        className='indicator-label'>{intl.formatMessage({id: 'USERGROUP_FORM.SUBMIT'})}</span>
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
    )
        ;
}

export default UserGroupFormModal;