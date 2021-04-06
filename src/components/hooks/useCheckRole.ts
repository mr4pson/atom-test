import { getUserInfo, openNotification } from "components/common/commonHelper";
import { userType } from "components/common/types";
import { useEffect } from "react";
import { useHistory } from "react-router";

export function useCheckRole(message): void {
  let history = useHistory();
  const userInfo = getUserInfo();

  useEffect(() => {
    if (userInfo?.role === userType.USER) {
        history.push('/private-office');
        openNotification('error', message);
    } else if (!userInfo) {
      history.push('/');
      openNotification('error', 'У вас нет доступа к этой странице.');
    }
  }, [])
}
