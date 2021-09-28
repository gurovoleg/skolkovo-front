import React, { Component, PureComponent } from 'react'
import { Wrap } from 'Components/ui'
import { actions, types } from './reducers'
import { status } from './settings'
import { connect } from 'react-redux'
import { Preloader } from 'Components/ui'

const makeURL = (url, props) => {
  return {}.toString.call(url) === '[object Function]' ? url(props) : url
}

// reloadEnabled - разрешить обновление данных для случаев, когда отличаются параметры запроса (location.search)
const withRemoteData = ({ url, headers, entity, reloadEnabled = false }) => WrappedComponent => {

  class WithRemoteData extends Component {
    constructor(props) {
      super()

      const getRemoteUrl = url => {
        switch (url.constructor) {
          case (String):
          case (Function):
            return [{ url, entity, reloadEnabled }]
          case (Object):
            return [url]
          case (Array):
            return url
          default:
            throw { message: 'Не задан url!' }
        }
      }

      this.state = {
        hasError: false,
        // список url для загрузки ({ url, entity, reloadEnabled })
        remote: getRemoteUrl(url),
        // индикатор для повторной подгрузки (если location.search отличаются, то снова грузим данные)
        // используется для пагинации, фильтров и т.д.
        locationSearch: window.location.search
      }
    }

    fetchData(remote) {
      const { getData, remoteStatus } = this.props
      const state = remoteStatus(remote.url)
      const shouldReload = this.state.locationSearch !== window.location.search
      // console.log('%c fetchData ', 'background:green;color:#fff', makeURL(remote.url, this.props), remote.reloadEnabled, shouldReload)
      // console.log('%c fetchData ', 'background:green;color:#fff', this.state.locationSearch, window.location.search, shouldReload)

      if ([status.NOT_ASKED, status.NEEDS_UPDATE].includes(state.status) || (state.status === status.LOADED && remote.reloadEnabled && shouldReload)) {
      // if (state.status === status.NOT_ASKED || (state.status === status.LOADED && remote.reloadEnabled && shouldReload)) {
        console.log('%c fetchData ', 'background:black;color:#fff', state, remote, makeURL(remote.url, this.props), this.props)
        getData(remote.url, remote.entity, headers)
        this.setState({ locationSearch: window.location.search })
      }
    }

    componentDidMount() {
      // console.log('%c componentDidMount ', 'background:blue;color:#fff', this.state.remote)
      for (const remote of this.state.remote) {
        this.fetchData(remote)
      }
    }

    componentWillUnmount() {
      // console.log('%c componentWillUnmount ', 'background:orange;color:#fff', makeURL(url, this.props))
      for (const remote of this.state.remote) {
        console.log('%c componentWillUnmount ', 'background:orange;color:#fff', makeURL(remote.url, this.props))
        this.props.setUpdateStatus(makeURL(remote.url, this.props))
      }
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
      // console.log('%c componentDidUpdate ', 'background:blue;color:#fff', makeURL(url, this.props))
      for (const remote of this.state.remote) {
        this.fetchData(remote)
      }
    }

    componentDidCatch(error, info) {
      this.setState({ hasError: true, error, info })
    }

    render() {
      const { remoteStatus, getData } = this.props
      // console.log('%c REMOTE ', 'background:red;color:#fff', this.state.hasError, )

      switch (true) {
        case this.state.hasError:
          return <Wrap className="wrap_line-red text_center mar-left_md mar-right_md"><h3>Ошибка! Что-то пошло не так.</h3></Wrap>

        case this.state.remote.some(r => remoteStatus(r.url).status === status.FAILURE):
          const remote = this.state.remote.find(r => remoteStatus(r.url).status === status.FAILURE)
          return (
            <Wrap className="wrap_line-red text_center">{remoteStatus(remote.url).error.message}</Wrap>
            // <Wrap className="wrap_line-red text_center">
            // <span>Не удалось загрузить данные! Проверьте соединение с интернетом и попробуйте ещё раз. </span>
            // </Wrap>
          )

        case this.state.remote.some(r => [status.NOT_ASKED, status.FETCHING].includes(remoteStatus(r.url).status)):
          // return <div className="pad-top_lg pad-btm_lg relative"><Preloader /></div>
          return <div className="preloader preloader_wrap text_medium pad-top_lg mar-top_sm pad-btm_lg">Загружаем...</div>

        case this.state.remote.every(r => [status.LOADED, status.NEEDS_UPDATE].includes(remoteStatus(r.url).status)):
          return <WrappedComponent {...this.props} />

        default:
          return <Wrap className="text_center">Данные ожидаются...</Wrap>
      }
    }
  }

  const mapStateToProps = (state, props) => ({
    remoteStatus: url => state.remote.status[makeURL(url, props)] || { status: status.NOT_ASKED }
  })

  const mapDispatchToProps = (dispatch, props) => ({
    getData: (url, entity, headers) => dispatch(actions.get(makeURL(url, props), entity, headers)),
    setUpdateStatus: (url) => dispatch({ type: types.NEEDS_UPDATE, url })
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithRemoteData)
}

export default withRemoteData
