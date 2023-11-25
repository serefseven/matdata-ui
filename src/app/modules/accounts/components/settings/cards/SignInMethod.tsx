/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik, FormikValues, useFormik} from 'formik'
import {useIntl} from "react-intl";
import {IChangePassword, IUpdateAccount} from "../../../core/_models";
import {changePassword, updateAccount} from "../../../core/_requests";
import {toast} from "react-toastify";

const SignInMethod: React.FC = () => {
    const intl = useIntl()
    const [showPasswordForm, setPasswordForm] = useState(false);
    const messageRequired = intl.formatMessage({id: 'MESSAGE.REQUIRED'})
    const messagePasswordMatch = intl.formatMessage({id: 'MESSAGE.PASSWORD_MATCH'})
    const messageMin6Char = intl.formatMessage({id: 'MESSAGE.MIN_CHARACTER'}, {min: 6})
    const changePasswordFormSchema = Yup.object({
        currentPassword: Yup.string().required(messageRequired),
        password: Yup.string().required(messageRequired).min(6, messageMin6Char),
        confirmPassword: Yup.string().required(messageRequired).min(6, messageMin6Char).oneOf([Yup.ref('password')], messagePasswordMatch),
    });

    const [initValues, setInitialValues] = useState<IChangePassword>({
        currentPassword: "",
        confirmPassword: "",
        password: ""
    })

    const [isSubmitting, setSubmitting] = useState(false);

    const submitForm = (values: IChangePassword, actions: FormikValues) => {
        setSubmitting(true)
        changePassword(values).then(r => {
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
                role='button'
                data-bs-toggle='collapse'
                data-bs-target='#kt_account_signin_method'
            >
                <div className='card-title m-0'>
                    <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'ACCOUNT.SECURITY'})}</h3>
                </div>
            </div>

            <div id='kt_account_signin_method' className='collapse show'>
                <div className='card-body border-top p-9'>

                    <div className='d-flex flex-wrap align-items-center mb-10'>
                        <div id='kt_signin_password' className={' ' + (showPasswordForm && 'd-none')}>
                            <div className='fs-6 fw-bolder mb-1'>{intl.formatMessage({id: 'ACCOUNT.PASSWORD'})}</div>
                            <div className='fw-bold text-gray-600'>************</div>
                        </div>

                        <div
                            id='kt_signin_password_edit'
                            className={'flex-row-fluid ' + (!showPasswordForm && 'd-none')}
                        >
                            <Formik validationSchema={changePasswordFormSchema} initialValues={initValues}
                                    onSubmit={submitForm}>
                                {({errors, touched}) => (
                                    <Form className='form'>
                                        <div className='row mb-1'>
                                            <div className='col-lg-4'>
                                                <label htmlFor='currentPassword'
                                                       className='form-label fs-6 fw-bolder mb-3'>
                                                    {intl.formatMessage({id: 'ACCOUNT.CURRENT_PASSWORD'})}
                                                </label>
                                                <Field type='password'
                                                       id='currentPassword'
                                                       name='currentPassword'
                                                       placeholder={intl.formatMessage({id: 'ACCOUNT.CURRENT_PASSWORD'})}
                                                       className='form-control form-control-lg form-control-solid'/>
                                                <div className='text-danger mt-2'>
                                                    <ErrorMessage name='currentPassword'/>
                                                </div>
                                            </div>

                                            <div className='col-lg-4'>
                                                <label htmlFor='password'
                                                       className='form-label fs-6 fw-bolder mb-3'>
                                                    {intl.formatMessage({id: 'ACCOUNT.NEW_PASSWORD'})}
                                                </label>
                                                <Field type='password'
                                                       id='password'
                                                       name='password'
                                                       placeholder={intl.formatMessage({id: 'ACCOUNT.NEW_PASSWORD'})}
                                                       className='form-control form-control-lg form-control-solid'/>
                                                <div className='text-danger mt-2'>
                                                    <ErrorMessage name='password'/>
                                                </div>
                                            </div>

                                            <div className='col-lg-4'>
                                                <label htmlFor='confirmPassword'
                                                       className='form-label fs-6 fw-bolder mb-3'>
                                                    {intl.formatMessage({id: 'ACCOUNT.CONFIRM_PASSWORD'})}
                                                </label>
                                                <Field type='password'
                                                       id='confirmPassword'
                                                       name='confirmPassword'
                                                       placeholder={intl.formatMessage({id: 'ACCOUNT.CONFIRM_PASSWORD'})}
                                                       className='form-control form-control-lg form-control-solid'/>
                                                <div className='text-danger mt-2'>
                                                    <ErrorMessage name='confirmPassword'/>
                                                </div>
                                            </div>

                                        </div>


                                        <div className='card-footer d-flex justify-content-end px-9'>

                                            <button
                                                onClick={() => {
                                                    setPasswordForm(false)
                                                }}
                                                id='kt_password_cancel'
                                                type='button'
                                                className='btn btn-color-gray-400 btn-active-light-primary me-2 px-6'
                                            >
                                                {intl.formatMessage({id: 'ACCOUNT.CANCEL'})}
                                            </button>

                                            <button
                                                type='submit'
                                                className='btn  btn-primary px-6'
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

                        <div
                            id='kt_signin_password_button'
                            className={'ms-auto ' + (showPasswordForm && 'd-none')}
                        >
                            <button
                                onClick={() => {
                                    setPasswordForm(true)
                                }}
                                className='btn btn-light btn-active-light-primary'
                            >
                                {intl.formatMessage({id: 'ACCOUNT.CHANGE_PASSWORD'})}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export {SignInMethod}
