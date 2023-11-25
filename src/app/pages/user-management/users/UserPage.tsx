import {PageLink, PageTitle} from "../../../../_metronic/layout/core";
import {KTIcon} from '../../../../_metronic/helpers'
import React, {useEffect, useState} from "react";
import {deleteUserById, getUsers} from "../core/_requests";
import {IUserDtoApiResponse, UserStatus} from "../core/_models";
import {useIntl} from "react-intl";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
import {toast} from "react-toastify";

const UserPage = () => {
    const intl = useIntl()
    const [users, setUsers] = useState<IUserDtoApiResponse[]>();

    const loadData = () => {
        getUsers().then(r => {
            setUsers(r.data)
        });
    }

    useEffect(() => {
        loadData();
    }, []);

    const deleteUser = (userId) => {
        const { value: res } = Swal.fire({
            title: '',
            text: intl.formatMessage({id: 'QUESTION.DELETE_USER'}),
            icon: 'question',
            confirmButtonText: intl.formatMessage({id: 'QUESTION.BUTTON.YES'}),
            cancelButtonText: intl.formatMessage({id: 'QUESTION.BUTTON.NO'}),
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUserById(userId).then(r => {
                    toast.success(intl.formatMessage({id: 'MESSAGE.API_SUCCESS'}));
                    loadData();
                }).catch(reason => {
                    if (reason.response.data.error.message) {
                        toast.error(reason.response.data.error.message);
                    } else {
                        toast.error(intl.formatMessage({id: 'MESSAGE.API_ERROR'}));
                    }
                })
            } else if (result.isDenied) {

            }
        })
    }

    return (
        <>
            <div className={`card mb-5 mb-xl-8`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                    <h3 className='card-title align-items-start flex-column'>
                        <span
                            className='card-label fw-bold fs-3 mb-1'>{intl.formatMessage({id: 'USER_LIST.TITLE'})}</span>
                        <span className='text-muted mt-1 fw-semibold fs-7'>{intl.formatMessage({id: 'USER_LIST.TITLE_TOTAL_COUNT'},{count:0})}</span>
                    </h3>
                    <div
                        className='card-toolbar'
                        data-bs-toggle='tooltip'
                        data-bs-placement='top'
                        data-bs-trigger='hover'
                        title='Click to add a user'
                    >
                        <Link to='/user-management/users/form' className='btn btn-sm btn-light-primary'>
                            <KTIcon iconName='plus' className='fs-3'/>
                            {intl.formatMessage({id: 'USER_LIST.NEW_USER'})}
                        </Link>
                    </div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className='card-body py-3'>
                    {/* begin::Table container */}
                    <div className='table-responsive'>
                        {/* begin::Table */}
                        <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                            {/* begin::Table head */}
                            <thead>
                            <tr className='fw-bold text-muted'>
                                <th className='w-25px'>
                                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                                        <input
                                            className='form-check-input'
                                            type='checkbox'
                                            value='1'
                                            data-kt-check='true'
                                            data-kt-check-target='.widget-9-check'
                                        />
                                    </div>
                                </th>
                                <th className='min-w-150px'>{intl.formatMessage({id: 'USER_LIST.NAME'})}</th>
                                <th className='min-w-140px'>{intl.formatMessage({id: 'USER_LIST.EMAIL'})}</th>
                                <th className='min-w-120px'>{intl.formatMessage({id: 'USER_LIST.PACKAGE'})}</th>
                                <th className='min-w-100px text-end'></th>
                            </tr>
                            </thead>
                            {/* end::Table head */}
                            {/* begin::Table body */}
                            <tbody>
                            {
                                users?.map(u => {
                                    return (
                                        <tr key={u.id}>
                                            <td>
                                                <div
                                                    className='form-check form-check-sm form-check-custom form-check-solid'>
                                                    <input className='form-check-input widget-9-check' type='checkbox'
                                                           value='1'/>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    <div className="symbol symbol-45px me-5">
                                                        <span
                                                            className={"symbol-label fw-bold "
                                                                +(u.status === UserStatus.ACTIVE?"bg-light-success text-success":"")
                                                                +(u.status === UserStatus.DEACTIVE?"bg-light-danger text-danger":"")}>
                                                            {u.firstName[0].toUpperCase() + u.lastName[0].toUpperCase() }
                                                        </span>
                                                    </div>
                                                    <div className='d-flex justify-content-start flex-column'>
                                                            <span
                                                                className='text-dark fw-bold d-block fs-6'>
                                                                {u.firstName + ' ' + u.lastName}
                                                            </span>
                                                        <span
                                                            className='text-muted fw-semibold text-muted d-block fs-7'>
                                                            {intl.formatMessage({id: 'USER.STATUS.'+u.status})}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span
                                                   className='text-dark fw-bold d-block fs-6'>
                                                    {u.email}
                                                </span>
                                                <span className='text-muted fw-semibold text-muted d-block fs-7'>

                                                  </span>
                                            </td>
                                            <td className='text-end'>

                                            </td>
                                            <td>
                                                <div className='d-flex justify-content-end flex-shrink-0'>
                                                    <a
                                                        href='user-management/users#'
                                                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                                    >
                                                        <KTIcon iconName='switch' className='fs-3'/>
                                                    </a>
                                                    <Link to={'/user-management/users/form/'+u.id}
                                                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                                    >
                                                        <KTIcon iconName='pencil' className='fs-3'/>
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteUser(u.id)}
                                                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                                                    >
                                                        <KTIcon iconName='trash' className='fs-3'/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            }

                            </tbody>
                            {/* end::Table body */}
                        </table>
                        {/* end::Table */}
                    </div>
                    {/* end::Table container */}
                </div>
                {/* begin::Body */}
            </div>
        </>
    )
}
const UserPageWrapper = () => {
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
    ]
    return (
        <>
            <PageTitle breadcrumbs={usersBreadcrumbs}>{intl.formatMessage({id: 'MENU.USERS'})}</PageTitle>
            <UserPage/>
        </>
    )
}

export default UserPageWrapper;