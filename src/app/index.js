import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Auth, Main, Logout } from 'Pages'
import { ToastContainer } from 'react-toastify'
import 'Root/styles/ReactToastify.css'
import LoadingBar, { hideLoading } from 'react-redux-loading-bar'
import { Route, Switch } from 'react-router-dom'
import { config } from 'Root/settings.js'
import Modal from 'Components/Modal'

const App = ({ roleId, isLoading, hideLoading }) => {

  // убираем индикатор прогресса после загрузки страницы
  useEffect(() => isLoading ? hideLoading() : undefined)

  return (
    <Fragment>
      {/* Индикатор прогресса */}
      <LoadingBar showFastActions style={{ zIndex: 100, height: '5px', backgroundColor: '#0c80df' }} maxProgress={95} progressIncrease={20}/>
      {/* Уведомления */}
      <ToastContainer {...config.toast} />
      {/* Модалка */}
      <Modal />

      <Switch>
        <Route path="/logout" component={Logout}/>
        <Route>
          {roleId ? <Main /> : <Auth/>}
        </Route>
      </Switch>

    </Fragment>
  )
}

const mapStateToProps = state => ({
  roleId: state.auth.roleId,
  isLoading: state.loadingBar.default > 0 // индикатор загрузки
})

const mapDispatchToProps = dispatch => ({
  hideLoading: () => dispatch(hideLoading()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
