/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import clsx from 'clsx'
import {toAbsoluteUrl} from '../../../helpers'
import {
  HeaderUserMenu,
  ThemeModeSwitcher,
} from '../../../partials'
import {useAuth} from "../../../../app/modules/auth";

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40p',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

const Topbar: FC = () => {
  const {currentUser, logout} = useAuth()

  // @ts-ignore
  const symbol = currentUser?.firstName[0].toString().toUpperCase() + currentUser?.lastName[0].toString().toUpperCase();

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      <div className='topbar d-flex align-items-stretch flex-shrink-0'>
        {/* Search */}
        {/*<div className={clsx('d-flex align-items-stretch', toolbarButtonMarginClass)}>
          <Search />
        </div>*/}


        {/* begin::Theme mode */}
        {/*<div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
          <ThemeModeSwitcher toggleBtnClass={toolbarButtonHeightClass} />
        </div>*/}
        {/* end::Theme mode */}

        {/* begin::User */}
        <div
          className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
          id='kt_header_user_menu_toggle'
        >
          {/* begin::Toggle */}
          <div
            className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'
          >
            <span
                className={"symbol-label fw-bold bg-light-success text-success"}>
                {symbol}
            </span>
          </div>
          <HeaderUserMenu />
          {/* end::Toggle */}
        </div>
        {/* end::User */}
      </div>
    </div>
  )
}

export {Topbar}
