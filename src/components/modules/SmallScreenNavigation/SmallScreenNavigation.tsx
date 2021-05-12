import { memo, useEffect, useState } from 'react'
import styles from './SmallScreenNavigation.module.scss'
import { useAuth } from 'components/pages/LoginPage/useAuth'
import { paths, Page } from 'routes/constants'
import { TypeLink } from '../Navigation/types'
import { HashLink as Link } from 'react-router-hash-link'
import ButtonElem from 'components/uiKit/ButtomElem'
import { buttonElemType } from 'components/uiKit/ButtomElem/types'
import Icon from 'components/uiKit/Icon'
import { userInfoIcon } from 'icons'
import { getUserInfo } from 'components/common/commonHelper'
import { userType } from 'components/common/types'
import { getJwtPair } from 'components/pages/LoginPage/helpers'
import { connect } from 'react-redux'

type Props = {
  isSmallScreenNavigationVisible: boolean | undefined
  links: TypeLink[]
  setIsSmallScreenNavigationVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >
}

function SmallScreenNavigation(props: Props): JSX.Element {
  const [links, setLinks] = useState<TypeLink[]>([])
  const { logout } = useAuth()
  const [currentJwtPair, setCurrentJwtPair] = useState<string>('')

  const userInfo = getUserInfo()

  const additionalLinks: TypeLink[] = []
  additionalLinks.push({
    name:
      userInfo?.role === userType.USER
        ? 'Личный кабинет'
        : userInfo?.role === userType.ADMIN
        ? 'Панель администратора'
        : !currentJwtPair
        ? 'Зарегистрироваться'
        : 'Панель администратора',
    path:
      userInfo?.role === userType.USER
        ? paths[Page.PRIVATE_OFFICE]
        : userInfo?.role === userType.ADMIN
        ? paths[Page.ADMIN]
        : !currentJwtPair
        ? paths[Page.SIGN_UP]
        : '/admin',
  })

  function onLogin() {
    logout()
    props.setIsSmallScreenNavigationVisible((prevState) => !prevState)
  }

  useEffect(() => {
    ;(async () => {
      setCurrentJwtPair(await getJwtPair())
    })()
  }, [])

  useEffect(() => {
    setLinks(props.links.concat(additionalLinks))
  }, [])

  return (
    <div className={styles['small-screen-navigation']}>
      <div className={styles['small-screen-navigation__divider']} />
      <ul className={styles['small-screen-navigation__links-wrapper']}>
        {links.map((link: TypeLink) => (
          <li
            className={styles['small-screen-navigation__item']}
            key={link.path}
          >
            {link.path === 'https://yandex.ru' ? (
              <a href={link.path} target='_blank' rel='noreferrer'>
                {link.name}
              </a>
            ) : !link.children?.length ? (
              <Link
                className={styles['link']}
                onClick={() =>
                  props.setIsSmallScreenNavigationVisible(
                    (prevState) => !prevState
                  )
                }
                to={link.path}
              >
                <span>{link.name}</span>
              </Link>
            ) : (
              <span className={styles['parent-link-name']}>{link.name}</span>
            )}
            {link.children?.length
              ? link.children.map((childLink: TypeLink) => (
                  <Link
                    className={styles['link__child']}
                    onClick={() =>
                      props.setIsSmallScreenNavigationVisible(
                        (prevState) => !prevState
                      )
                    }
                    style={{ marginLeft: 40 }}
                    to={link.path + childLink.path}
                  >
                    {childLink.name}
                  </Link>
                ))
              : null}
          </li>
        ))}
      </ul>
      {
        <ButtonElem
          type={buttonElemType.Primary}
          htmlType='button'
          className={styles['small-screen-navigation__button-login']}
          onClick={onLogin}
          icon={
            <Icon
              className={styles['small-screen-navigation__user-info-icon']}
              path={userInfoIcon.path}
              viewBox={userInfoIcon.viewBox}
              title='AtomTest'
            />
          }
        >
          {!currentJwtPair ? 'Войти в аккаунт' : 'Выйти из аккаунта'}
        </ButtonElem>
      }
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    links: state.menu?.links,
  }
}

export default connect(mapStateToProps, null)(memo(SmallScreenNavigation))
