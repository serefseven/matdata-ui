import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {useIntl} from 'react-intl'
import {useAuth} from "../../../../app/modules/auth";

export function MenuInner() {
    const intl = useIntl()
    const {currentUser} = useAuth();
    if(currentUser?.type === 0)
        return (<></>);
    return (
        <>
            <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard'/>

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
            <MenuItem title={intl.formatMessage({id: 'MENU.FILES'})} to='/files'/>
        </>
    )
}
