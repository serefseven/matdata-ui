import React, {useState} from 'react'

import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik, FormikValues, useFormik} from 'formik'
import {Link} from "react-router-dom";
import {useIntl} from "react-intl";
import {useAuth} from "../../../../auth";
import {toast} from "react-toastify";
import {updateAccount} from "../../../core/_requests";
import {IUpdateAccount} from "../../../core/_models";


const ProfileDetails: React.FC = () => {
    const intl = useIntl()
    const {currentUser} = useAuth()
    const messageRequired = intl.formatMessage({id: 'MESSAGE.REQUIRED'})
    const accountFormSchema = Yup.object({
        firstName: Yup.string().required(messageRequired),
        lastName: Yup.string().required(messageRequired),
    });

    const [initValues, setInitialValues] = useState<IUpdateAccount>({
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,

    })
    const [isSubmitting, setSubmitting] = useState(false);

    const submitForm = (values: IUpdateAccount, actions: FormikValues) => {
        setSubmitting(true)
        updateAccount(values).then(r => {
            toast.success(intl.formatMessage({id: 'MESSAGE.API_SUCCESS'}));
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

    return (
        <div className='card mb-5 mb-xl-10'>
            <div
                className='card-header border-0 cursor-pointer'

                aria-controls='kt_account_profile_details'
            >
                <div className='card-title m-0'>
                    <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'ACCOUNT.PROFILE_DETAILS'})}</h3>
                </div>

                <Link to='/account/overview' className='btn btn-primary align-self-center'>
                    {intl.formatMessage({id: 'ACCOUNT.BACK'})}
                </Link>
            </div>

            <div id='kt_account_profile_details' className='collapse show'>
                <Formik validationSchema={accountFormSchema} initialValues={initValues} onSubmit={submitForm}>
                    {({errors, touched}) => (
                        <Form className='form'>
                            <div className='card-body border-top p-9'>

                                <div className='row'>
                                    <label
                                        className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'ACCOUNT.FULL_NAME'})}</label>

                                    <div className='col-lg-8'>
                                        <div className='row'>


                                            <div className='col-lg-6 fv-row'>
                                                <Field name='firstName'
                                                       placeholder={intl.formatMessage({id: 'ACCOUNT.FIRST_NAME'})}
                                                       className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'/>
                                                <div className='text-danger mt-2'>
                                                    <ErrorMessage name='firstName'/>
                                                </div>
                                            </div>
                                            <div className='col-lg-6 fv-row'>
                                                <Field name='lastName'
                                                       placeholder={intl.formatMessage({id: 'ACCOUNT.LAST_NAME'})}
                                                       className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'/>
                                                <div className='text-danger mt-2'>
                                                    <ErrorMessage name='lastName'/>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='card-footer d-flex justify-content-end py-6 px-9'>

                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                    data-kt-indicator={isSubmitting ? 'on' : 'off'}
                                    disabled={isSubmitting}
                                >
                                    <span
                                        className='indicator-label'>{intl.formatMessage({id: 'ACCOUNT.SUBMIT'})}</span>
                                    <span className="indicator-progress">
                                            {intl.formatMessage({id: 'GENERAL.PLEASE_WAIT'})} <span
                                        className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                        </span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export {ProfileDetails}
