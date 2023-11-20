import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {useIntl} from 'react-intl'

export function MenuInner() {
    const intl = useIntl()
    return (
        <>
            <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard'/>
            {/*<MenuInnerWithSub
                title={intl.formatMessage({id: 'MENU.STOCK'})}
                to='/stock'
                menuPlacement='bottom-start'
                menuTrigger='click'
            >
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.STOCK_CARDS'})} hasBullet={true}/>
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.STOCK_IN_OUT'})} hasBullet={true}/>
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.PRODUCTS'})} hasBullet={true}/>
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.WAREHOUSES'})} hasBullet={true}/>
            </MenuInnerWithSub>
            <MenuInnerWithSub
                title={intl.formatMessage({id: 'MENU.BUYING'})}
                to='/stock'
                menuPlacement='bottom-start'
                menuTrigger='click'
            >
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.BUYING_REQUESTS'})} hasBullet={true}/>
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.BUYING_OFFERS'})} hasBullet={true}/>
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.BUYING_ORDERS'})} hasBullet={true}/>
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.SUPPLIERS'})} hasBullet={true}/>
            </MenuInnerWithSub>
            <MenuInnerWithSub
                title={intl.formatMessage({id: 'MENU.SELL'})}
                to='/stock'
                menuPlacement='bottom-start'
                menuTrigger='click'
            >
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.CUSTOMER'})} hasBullet={true}/>
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.SELLING_OFFERS'})} hasBullet={true}/>
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.SELLINGS'})} hasBullet={true}/>
            </MenuInnerWithSub>
            <MenuInnerWithSub
                title={intl.formatMessage({id: 'MENU.PRODUCTION'})}
                to='/stock'
                menuPlacement='bottom-start'
                menuTrigger='click'
            >
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.PRODUCTIONS'})} hasBullet={true}/>
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.WORKKING_LOGS'})} hasBullet={true}/>
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.MACHINES'})} hasBullet={true}/>
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.MEASURE_DEVICE'})} hasBullet={true}/>
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.NONCONFORMITIES'})} hasBullet={true}/>
            </MenuInnerWithSub>
            <MenuItem title={intl.formatMessage({id: 'MENU.QUALITY'})} to='#'/>*/}
            <MenuInnerWithSub
                title={intl.formatMessage({id: 'MENU.USER_MANAGEMENT'})}
                to='#'
                menuPlacement='bottom-start'
                menuTrigger='click'
            >
                <MenuItem to='/user-management/users' title={intl.formatMessage({id: 'MENU.USERS'})} hasBullet={true}/>
                <MenuItem to='/user-management/usergroups' title={intl.formatMessage({id: 'MENU.USERGROUPS'})} hasBullet={true}/>
{/*                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.UNITS'})} hasBullet={true}/>
                <MenuItem to='#' title={intl.formatMessage({id: 'MENU.MATERIAL_TYPES'})} hasBullet={true}/>*/}
            </MenuInnerWithSub>
            <MenuItem title={intl.formatMessage({id: 'MENU.APPLICATIONS'})} to='/applications'/>
        </>
    )
}
