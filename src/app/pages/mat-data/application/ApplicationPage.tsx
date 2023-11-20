import {PageLink, PageTitle} from "../../../../_metronic/layout/core";
import {KTIcon} from '../../../../_metronic/helpers'
import React, {FC, useEffect, useState} from "react";
import {IApplicationDtoApiResponse} from "../core/_models";
import {useIntl} from "react-intl";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
import {toast} from "react-toastify";
import {deleteApplicationById, getApplications} from "../core/_requests";
import ApplicationFormModal from "./application-form/ApplicationFormModal";

type props = {
    formModalShow:any[];
    formModalId:any[];
}

const ApplicationPage:FC<props> = (props) => {
    const intl = useIntl()
    const [apps, setApps] = useState<IApplicationDtoApiResponse[]>();
    const [modalShow, setModalShow] = props.formModalShow;
    const [modalId, setModalId] = props.formModalId;

    const loadData = () => {
        getApplications().then(r => {
            setApps(r.data)
        });
    }

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if(!modalShow)
            loadData();
    }, [modalShow]);

    const deleteApplication = (appId) => {
        Swal.fire({
            title: '',
            text: intl.formatMessage({id: 'QUESTION.DELETE_APPLICATION'}),
            icon: 'question',
            confirmButtonText: intl.formatMessage({id: 'QUESTION.BUTTON.YES'}),
            cancelButtonText: intl.formatMessage({id: 'QUESTION.BUTTON.NO'}),
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteApplicationById(appId).then(r => {
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

    const openForm = (id?:number) => {
        setModalId(id);
        setModalShow(true);
    }

    return (
        <>
            <div className={`card mb-5 mb-xl-8`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                    <h3 className='card-title align-items-start flex-column'>
                        <span
                            className='card-label fw-bold fs-3 mb-1'>{intl.formatMessage({id: 'APPLICATION_LIST.TITLE'})}</span>
                        <span className='text-muted mt-1 fw-semibold fs-7'>{intl.formatMessage({id: 'APPLICATION_LIST.TITLE_TOTAL_COUNT'},{count:0})}</span>
                    </h3>
                    <div
                        className='card-toolbar'
                        data-bs-toggle='tooltip'
                        data-bs-placement='top'
                        data-bs-trigger='hover'
                        title='Click to add a application'
                    >
                        <button type='button' className='btn btn-sm btn-light-primary'
                                onClick={() => openForm(undefined)}

                        >
                            <KTIcon iconName='plus' className='fs-2' />
                            {intl.formatMessage({id: 'APPLICATION_LIST.NEW_APPLICATION'})}
                        </button>
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
                                <th className='min-w-150px'>{intl.formatMessage({id: 'APPLICATION_LIST.NAME'})}</th>
                                <th className='min-w-140px'>{intl.formatMessage({id: 'APPLICATION_LIST.EXTENSION'})}</th>
                                <th className='min-w-100px text-end'></th>
                            </tr>
                            </thead>
                            {/* end::Table head */}
                            {/* begin::Table body */}
                            <tbody>
                            {
                                apps?.map(u => {
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
                                                    <div className='d-flex justify-content-start flex-column'>
                                                            <span
                                                                className='text-dark fw-bold d-block fs-6'>
                                                                {u.name}
                                                            </span>
                                                        <span
                                                            className='text-muted fw-semibold text-muted d-block fs-7'>
                                                            {intl.formatMessage({id: 'APPLICATION_LIST.STATUS.'+u.active})}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span
                                                   className='text-dark fw-bold d-block fs-6'>
                                                    {u.acceptedExtensions}
                                                </span>
                                                <span className='text-muted fw-semibold text-muted d-block fs-7'>

                                                  </span>
                                            </td>

                                            <td>
                                                <div className='d-flex justify-content-end flex-shrink-0'>
                                                    <button
                                                        onClick={() => openForm(u.id)}
                                                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                                    >
                                                        <KTIcon iconName='pencil' className='fs-3'/>
                                                    </button>

                                                    <button
                                                        onClick={() => deleteApplication(u.id)}
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
const ApplicationPageWrapper = () => {
    const intl = useIntl();
    const formModalShow = useState<boolean>(false);
    const applicationId = useState<number>();
    const usersBreadcrumbs: Array<PageLink> = [

    ]
    return (
        <>
            <PageTitle breadcrumbs={usersBreadcrumbs}>{intl.formatMessage({id: 'MENU.APPLICATIONS'})}</PageTitle>
            <ApplicationPage formModalShow={formModalShow} formModalId={applicationId} />
            <ApplicationFormModal show={formModalShow} applicationId={applicationId} />
        </>
    )
}

export default ApplicationPageWrapper;