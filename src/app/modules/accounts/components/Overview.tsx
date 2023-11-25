/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {KTIcon} from '../../../../_metronic/helpers'
import {useIntl} from "react-intl";
import {useAuth} from "../../auth";

export function Overview() {
  const intl = useIntl()
  const {currentUser} = useAuth()

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'ACCOUNT.PROFILE_DETAILS'})}</h3>
          </div>

          <Link to='/account/settings' className='btn btn-primary align-self-center'>
            {intl.formatMessage({id: 'ACCOUNT.EDITING'})}
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>{intl.formatMessage({id: 'ACCOUNT.FULL_NAME'})}</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>{currentUser?.firstName} {currentUser?.lastName}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>{intl.formatMessage({id: 'ACCOUNT.EMAIL'})}</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{currentUser?.email}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>{intl.formatMessage({id: 'ACCOUNT.USER_GROUP'})}</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{currentUser?.userGroupName}</span>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}
