/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {useIntl} from "react-intl";
import {ErrorMessage, Field, Form, Formik, FormikValues} from "formik";
import {ICreateUser, IUserGroupDtoApiResponse, PassworSettingTypes} from "../core/_models";
import * as Yup from 'yup'
import {useNavigate, useParams} from "react-router-dom";
import {PageLink, PageTitle} from "../../../../_metronic/layout/core";
import {createUser, getUserGroups} from "../core/_requests";
import {toast} from 'react-toastify';

const UserCreateForm: FC = (props) => {
    const intl = useIntl();
    const params = useParams();
    const navigate = useNavigate();

    const messageRequired = intl.formatMessage({id: 'MESSAGE.REQUIRED'})
    const messageEmailFormat = intl.formatMessage({id: 'MESSAGE.WRONG_EMAIL_FORMAT'})
    const messagePasswordMatch = intl.formatMessage({id: 'MESSAGE.PASSWORD_MATCH'})
    const messageMin6Char = intl.formatMessage({id: 'MESSAGE.MIN_CHARACTER'}, {min: 6})

    const userFormSchemaInitial = {
        firstName: Yup.string().required(messageRequired),
        lastName: Yup.string().required(messageRequired),
        email: Yup.string().required(messageRequired).email(messageEmailFormat),
        userGroupId: Yup.number(),
        passwordSettingType: Yup.number().required(messageRequired).oneOf([0, 1], messageRequired),
    }

    const userFormSchemaPassword = {
        password: Yup.string().required(messageRequired).min(6, messageMin6Char),
        confirmPassword: Yup.string().required(messageRequired).min(6, messageMin6Char).oneOf([Yup.ref('password')], messagePasswordMatch),
    }

    const [userFormSchema, setUserFormSchema] = useState(Yup.object(userFormSchemaInitial));
    const [choosePassword, setChoosePassword] = useState(false)
    const [initValues, setInitialValues] = useState<ICreateUser>({
        email: '',
        password: '',
        confirmPassword: '',
        passwordSettingType: -1,
        firstName: '',
        lastName: ''
    })
    const [isSubmitting, setSubmitting] = useState(false);

    const [userGroups, setUserGroups] = useState<IUserGroupDtoApiResponse[]>([]);
    useEffect(() => {
        getUserGroups().then(r => setUserGroups(r.data));
    },[]);

    const submitForm = (values: ICreateUser, actions: FormikValues) => {
        setSubmitting(true)
        createUser(values).then(r => {
            toast.success(intl.formatMessage({id: 'MESSAGE.API_SUCCESS'}));
            navigate('/user-management/users');
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
    const formOnChange = (e) => {
        if (e.target.name === 'passwordSettingType' && e.target.value === '0') {
            setChoosePassword(true);
            setUserFormSchema(Yup.object({...userFormSchemaInitial, ...userFormSchemaPassword}));
        } else if (e.target.name === 'passwordSettingType') {
            setChoosePassword(false);
            setUserFormSchema(Yup.object({...userFormSchemaInitial}));
        }
    }
    const cancel = () => navigate('/user-management/users');

    return (

        <div className={`card mb-5 mb-xl-8`}>
            {/* begin::Header */}
            <div className='card-header border-0 pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                        <span
                            className='card-label fw-bold fs-3 mb-1'>{intl.formatMessage({id: 'USER_FORM.TITLE'})}</span>
                    <span className='text-muted mt-1 fw-semibold fs-7'></span>
                </h3>
                <div
                    className='card-toolbar'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    data-bs-trigger='hover'
                    title=''
                >

                </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body py-3'>
                <Formik validationSchema={userFormSchema} initialValues={initValues} onSubmit={submitForm}>
                    {({errors, touched}) => (
                        <Form onChange={formOnChange} className='mx-auto mw-600px w-100 pt-15 pb-10'
                              id='kt_create_account_form'>
                            <div className='fv-row mb-10'>
                                <label
                                    className='form-label required'>{intl.formatMessage({id: 'USER_FORM.FIRST_NAME'})}</label>
                                <Field name='firstName'
                                       placeholder={intl.formatMessage({id: 'USER_FORM.FIRST_NAME'})}
                                       className='form-control form-control-lg form-control-solid'/>
                                <div className='text-danger mt-2'>
                                    <ErrorMessage name='firstName'/>
                                </div>
                            </div>
                            <div className='fv-row mb-10'>
                                <label
                                    className='form-label required'>{intl.formatMessage({id: 'USER_FORM.LAST_NAME'})}</label>
                                <Field name='lastName'
                                       placeholder={intl.formatMessage({id: 'USER_FORM.LAST_NAME'})}
                                       className='form-control form-control-lg form-control-solid'/>
                                <div className='text-danger mt-2'>
                                    <ErrorMessage name='lastName'/>
                                </div>
                            </div>
                            <div className='fv-row mb-10'>
                                <label
                                    className='form-label required'>{intl.formatMessage({id: 'USER_FORM.E_MAIL'})}</label>
                                <Field type="email" name='email'
                                       placeholder={intl.formatMessage({id: 'USER_FORM.E_MAIL'})}
                                       className='form-control form-control-lg form-control-solid'/>
                                <div className='text-danger mt-2'>
                                    <ErrorMessage name='email'/>
                                </div>
                            </div>

                            <div className='fv-row mb-10'>
                                <label
                                    className='form-label required'>{intl.formatMessage({id: 'USER_FORM.USERGROUP'})}</label>

                                <Field
                                    component='select'
                                    name='userGroupId'
                                    className='form-select form-select-lg form-select-solid'

                                >
                                    <option></option>
                                    {
                                        userGroups
                                            .filter((v) => v.active)
                                            .map(t => <option key={t.id}
                                                              value={t.id}>{t.name}</option>)
                                    }

                                </Field>
                                <div className='text-danger mt-2'>
                                    <ErrorMessage name='passwordSettingType'/>
                                </div>
                            </div>


                            <div className='fv-row mb-10'>
                                <label
                                    className='form-label required'>{intl.formatMessage({id: 'USER_FORM.PASSWORD_DEFINITION_TYPE'})}</label>

                                <Field
                                    component='select'
                                    name='passwordSettingType'
                                    className='form-select form-select-lg form-select-solid'

                                >
                                    <option value="-1"></option>
                                    {
                                        Object.keys(PassworSettingTypes)
                                            .filter((v) => isNaN(Number(v)))
                                            .map(t => <option key={PassworSettingTypes[t]}
                                                              value={PassworSettingTypes[t]}>{intl.formatMessage({id: 'USER_FORM.PASSWORD_DEFINITION_TYPE.' + t})}</option>)
                                    }

                                </Field>
                                <div className='text-danger mt-2'>
                                    <ErrorMessage name='passwordSettingType'/>
                                </div>
                            </div>

                            {choosePassword ? <>
                                <div className='fv-row mb-10'>
                                    <label
                                        className='form-label required'>{intl.formatMessage({id: 'USER_FORM.PASSWORD'})}</label>
                                    <Field type="password" name='password'
                                           placeholder={intl.formatMessage({id: 'USER_FORM.PASSWORD'})}
                                           className='form-control form-control-lg form-control-solid'/>
                                    <div className='text-danger mt-2'>
                                        <ErrorMessage name='password'/>
                                    </div>
                                </div>

                                <div className='fv-row mb-10'>
                                    <label
                                        className='form-label required'>{intl.formatMessage({id: 'USER_FORM.PASSWORD_CONFIRM'})}</label>
                                    <Field type="password" name='confirmPassword'
                                           placeholder={intl.formatMessage({id: 'USER_FORM.PASSWORD_CONFIRM'})}
                                           className='form-control form-control-lg form-control-solid'/>
                                    <div className='text-danger mt-2'>
                                        <ErrorMessage name='confirmPassword'/>
                                    </div>
                                </div>
                            </> : null}

                            <div className='text-center pt-15'>
                                <button
                                    type='button'
                                    onClick={() => cancel()}
                                    className='btn btn-light me-3'
                                    disabled={isSubmitting}
                                >
                                    {intl.formatMessage({id: 'USER_FORM.DISCARD'})}
                                </button>

                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                    data-kt-indicator={isSubmitting ? 'on' : 'off'}
                                    disabled={isSubmitting}
                                >
                                    <span
                                        className='indicator-label'>{intl.formatMessage({id: 'USER_FORM.SUBMIT'})}</span>
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

const UserCreateFormWrapper = () => {
    const intl = useIntl();

    const usersBreadcrumbs: Array<PageLink> = [
        {
            title: intl.formatMessage({id: 'MENU.USER_MANAGEMENT'}),
            path: '/user-management/users',
            isSeparator: false,
            isActive: false,
        },
        {
            title: '',
            path: '',
            isSeparator: true,
            isActive: false,
        },
        {
            title: intl.formatMessage({id: 'MENU.USERS'}),
            path: '/user-management/users',
            isSeparator: false,
            isActive: false,
        },
        {
            title: '',
            path: '',
            isSeparator: true,
            isActive: false,
        },
    ]
    return (
        <>
            <PageTitle breadcrumbs={usersBreadcrumbs}>{intl.formatMessage({id: 'USER_FORM.TITLE'})}</PageTitle>
            <UserCreateForm/>
        </>
    )
}

export default UserCreateFormWrapper
