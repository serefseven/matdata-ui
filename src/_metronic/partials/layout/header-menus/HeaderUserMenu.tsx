/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {Languages} from './Languages'
import {toAbsoluteUrl} from '../../../helpers'
import {useIntl} from "react-intl";

const HeaderUserMenu: FC = () => {
  const intl = useIntl()
  const {currentUser, logout} = useAuth()

  // @ts-ignore
  const symbol = currentUser?.firstName[0].toString().toUpperCase() + currentUser?.lastName[0].toString().toUpperCase();
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-semibold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <span
                className={"symbol-label fw-bold bg-light-success text-success"}>
                {symbol}
            </span>
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bold d-flex align-items-center fs-5'>
              {currentUser?.firstName} {currentUser?.lastName}
              <span className='badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2'>Pro</span>
            </div>
            <a href='#' className='fw-semibold text-muted text-hover-primary fs-7'>
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5 my-1'>
        <Link to='/crafted/account/settings' className='menu-link px-5'>
          {intl.formatMessage({id: 'USER_MENU.ACCOUNT'})}
        </Link>
      </div>

      <div className='separator my-2'></div>

      <Languages />

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          {intl.formatMessage({id: 'USER_MENU.SIGN_OUT'})}
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
