/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useAuth} from '../core/Auth'
import {useIntl} from "react-intl";

const initialValues = {
    email: '',
    password: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
    const intl = useIntl()
    const [loading, setLoading] = useState(false)
    const {saveAuth, setCurrentUser} = useAuth()

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email(intl.formatMessage({id: 'MESSAGE.WRONG_EMAIL_FORMAT'}))
            .min(3, intl.formatMessage({id: 'MESSAGE.MIN_3_CHARACTER'}))
            .max(50, intl.formatMessage({id: 'MESSAGE.Max_50_CHARACTER'}))
            .required(intl.formatMessage({id: 'MESSAGE.EMAIL_REQUIRED'})),
        password: Yup.string()
            .min(3, intl.formatMessage({id: 'MESSAGE.MIN_3_CHARACTER'}))
            .max(50, intl.formatMessage({id: 'MESSAGE.Max_50_CHARACTER'}))
            .required(intl.formatMessage({id: 'MESSAGE.PASSWORD_REQUIRED'})),
    })

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true)
            try {
                const {data: auth} = await login(values.email, values.password)
                console.log("auth");
                console.log(auth);
                saveAuth(auth)
                const {data: user} = await getUserByToken(auth)
                setCurrentUser(user)
            } catch (error) {
                console.error(error)
                saveAuth(undefined)
                setStatus(intl.formatMessage({id: 'LOGIN_PAGE.LOGIN_DETAIL_ARE_INCORRECT'}))
                setSubmitting(false)
                setLoading(false)
            }
        },
    })

    return (
        <form
            className='form w-100'
            onSubmit={formik.handleSubmit}
            noValidate
            id='kt_login_signin_form'
        >
            {/* begin::Heading */}
            <div className='text-center mb-11'>
                <h1 className='text-dark fw-bolder mb-3'>{intl.formatMessage({id: 'LOGIN_PAGE.SIGN_IN'})}</h1>
                <div className='text-gray-500 fw-semibold fs-6'></div>
            </div>
            {/* begin::Heading */}

            {formik.status ? (
                <div className='mb-lg-15 alert alert-danger'>
                    <div className='alert-text font-weight-bold'>{formik.status}</div>
                </div>
            ) : (
                <></>
            )}

            {/* begin::Form group */}
            <div className='fv-row mb-8'>
                <label
                    className='form-label fs-6 fw-bolder text-dark'>{intl.formatMessage({id: 'LOGIN_PAGE.E_MAIL'})}</label>
                <input
                    placeholder={intl.formatMessage({id: 'LOGIN_PAGE.E_MAIL'})}
                    {...formik.getFieldProps('email')}
                    className={clsx(
                        'form-control bg-transparent',
                        {'is-invalid': formik.touched.email && formik.errors.email},
                        {
                            'is-valid': formik.touched.email && !formik.errors.email,
                        }
                    )}
                    type='email'
                    name='email'
                    autoComplete='off'
                />
                {formik.touched.email && formik.errors.email && (
                    <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.email}</span>
                        </div>
                    </div>
                )}
            </div>
            {/* end::Form group */}

            {/* begin::Form group */}
            <div className='fv-row mb-3'>
                <label
                    className='form-label fw-bolder text-dark fs-6 mb-0'>{intl.formatMessage({id: 'LOGIN_PAGE.PASSWORD'})}</label>
                <input
                    type='password'
                    autoComplete='off'
                    {...formik.getFieldProps('password')}
                    className={clsx(
                        'form-control bg-transparent',
                        {
                            'is-invalid': formik.touched.password && formik.errors.password,
                        },
                        {
                            'is-valid': formik.touched.password && !formik.errors.password,
                        }
                    )}
                />
                {formik.touched.password && formik.errors.password && (
                    <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.password}</span>
                        </div>
                    </div>
                )}
            </div>
            {/* end::Form group */}

            {/* begin::Wrapper */}
            <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
                <div/>

                {/* begin::Link */}
                <Link to='/auth/forgot-password' className='link-primary'>
                    {intl.formatMessage({id: 'LOGIN_PAGE.FORGET_PASSWORD'})}
                </Link>
                {/* end::Link */}
            </div>
            {/* end::Wrapper */}

            {/* begin::Action */}
            <div className='d-grid mb-10'>
                <button
                    type='submit'
                    id='kt_sign_in_submit'
                    className='btn btn-primary'
                    disabled={formik.isSubmitting || !formik.isValid}
                >
                    {!loading &&
                        <span className='indicator-label'>{intl.formatMessage({id: 'LOGIN_PAGE.SUBMIT'})}</span>}
                    {loading && (
                        <span className='indicator-progress' style={{display: 'block'}}>
              {intl.formatMessage({id: 'GENERAL.PLEASE_WAIT'})}
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
                    )}
                </button>
            </div>
            {/* end::Action */}

        </form>
    )
}
