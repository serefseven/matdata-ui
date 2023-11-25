import React, {FC, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useNavigate, useParams} from 'react-router-dom'
import {ErrorMessage, Field, Form, Formik, FormikValues} from 'formik'
import {checkResetPassword, requestPassword, setPassword} from '../core/_requests'
import {useIntl} from "react-intl";
import {IPasswordResetModel} from "../core/_models";

export const PasswordReset: FC = (props) => {
    const intl = useIntl()
    const navigate = useNavigate();
    const params = useParams();
    const [success, setSuccess] = useState(false);
    const [isDisableForm, setDisableForm] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)

    const messageRequired = intl.formatMessage({id: 'MESSAGE.REQUIRED'})
    const messagePasswordMatch = intl.formatMessage({id: 'MESSAGE.PASSWORD_MATCH'})
    const messageMin6Char = intl.formatMessage({id: 'MESSAGE.MIN_CHARACTER'}, {min: 6})

    useEffect(() => {
        if(params.email === undefined || params.token === undefined){
            setDisableForm(true);
        }
        checkResetPassword(params.email, params.token).then(r => setDisableForm(!r.data))
    },[]);

    const resetPasswordSchema = Yup.object().shape({
        password: Yup.string().required(messageRequired).min(6, messageMin6Char),
        confirmPassword: Yup.string().required(messageRequired).min(6, messageMin6Char).oneOf([Yup.ref('password')], messagePasswordMatch),
    });

    const [initValues, setInitialValues] = useState<IPasswordResetModel>({
        password: '',
        confirmPassword: '',
    });

    const submitForm = (values: IPasswordResetModel, actions: FormikValues) => {
        setSubmitting(true);
        setPassword(params.email, params.token, values.password, values.confirmPassword)
            .then(r => {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/auth/login');
                }, 2000);
            })
            .catch(e => {
                console.log(e.response.data.error.message)
            })
            .finally(() => setSubmitting(false))
    }
    const cancel = () => navigate('/auth/login');
    return (

        <Formik validationSchema={resetPasswordSchema} initialValues={initValues} onSubmit={submitForm}>
            {({errors, touched}) => (
                <Form className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
                      id='kt_login_password_reset_form'>

                    <div className='text-center mb-10'>
                        {/* begin::Title */}
                        <h1 className='text-dark fw-bolder mb-3'>{intl.formatMessage({id: 'RESET_PASSWORD_PAGE.TITLE'})}</h1>
                        {/* end::Title */}

                        {/* begin::Link */}
                        <div className='text-gray-500 fw-semibold fs-6'>
                        </div>
                        {/* end::Link */}
                    </div>

                    {/* begin::Title */}
                    {isDisableForm === true && (
                        <div className='mb-lg-15 alert alert-danger'>
                            <div className='alert-text font-weight-bold'>
                                {intl.formatMessage({id: 'RESET_PASSWORD_PAGE.INVALID_TOKEN'})}
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className='mb-10 bg-light-info p-8 rounded'>
                            <div className='text-info'>
                                {intl.formatMessage({id: 'RESET_PASSWORD_PAGE.SUCCESS'})}
                            </div>
                        </div>
                    )}
                    {/* end::Title */}

                    {/* begin::Form group */}
                    <div className='fv-row mb-8'>
                        <label
                            className='form-label fw-bolder text-gray-900 fs-6 required'>{intl.formatMessage({id: 'RESET_PASSWORD_PAGE.PASSWORD'})}</label>
                        <Field type="password"
                               name='password'
                               disabled={isDisableForm}
                               placeholder={intl.formatMessage({id: 'RESET_PASSWORD_PAGE.PASSWORD'})}
                               className='form-control bg-transparent'/>
                        <div className='text-danger mt-2'>
                            <ErrorMessage name='password'/>
                        </div>
                    </div>
                    {/* end::Form group */}

                    {/* begin::Form group */}
                    <div className='fv-row mb-8'>
                        <label
                            className='form-label fw-bolder text-gray-900 fs-6 required'>{intl.formatMessage({id: 'RESET_PASSWORD_PAGE.CONFIRM_PASSWORD'})}</label>
                        <Field type="password"
                               name='confirmPassword'
                               disabled={isDisableForm}
                               placeholder={intl.formatMessage({id: 'RESET_PASSWORD_PAGE.CONFIRM_PASSWORD'})}
                               className='form-control bg-transparent'/>
                        <div className='text-danger mt-2'>
                            <ErrorMessage name='confirmPassword'/>
                        </div>
                    </div>
                    {/* end::Form group */}

                    {/* begin::Form group */}
                    <div className='d-flex flex-wrap justify-content-center pb-lg-0'>

                        <button
                            type='submit'
                            className='btn btn-primary me-4'
                            data-kt-indicator={isSubmitting ? 'on' : 'off'}
                            disabled={isSubmitting || isDisableForm}
                        >
                                    <span
                                        className='indicator-label'>{intl.formatMessage({id: 'RESET_PASSWORD_PAGE.SUBMIT'})}</span>
                            <span className="indicator-progress">
                                            {intl.formatMessage({id: 'GENERAL.PLEASE_WAIT'})} <span
                                className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                        </span>
                        </button>

                        <button
                            type='button'
                            onClick={() => cancel()}
                            className='btn btn-light'
                            disabled={isSubmitting}
                        >
                            {intl.formatMessage({id: 'RESET_PASSWORD_PAGE.CANCEL'})}
                        </button>
                    </div>
                    {/* end::Form group */}
                </Form>
            )}
        </Formik>
    )
}
