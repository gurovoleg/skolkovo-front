import { Slide, Zoom, Flip, Bounce } from 'react-toastify'
import { filterObject } from './utils'

export const config = {
  // apiUrl: 'http://skolkovo:88/api',
  // apiUrl: 'http://skolkovo.gurovoleg.beget.tech/api',
  apiUrl: window.backendUrl || 'https://webdev-go.ru/api',
  // toasts (notifications)
  toast: {
    // bodyClassName: 'text_alignCenter',                       // Стилизация содержимого контейнера
    limit: 3,                                                // Количество одновременно выводимых уведомлений
    position: 'bottom-right',                                // Расположение уведомления
    autoClose: 7000,                                        // Время отображение уведомления в ms
    hideProgressBar: false,                                  // Индикатор отображения уведомления
    transition: Bounce                                       // Эффект появления
  }
}

export const statuses = {
  active: {
    value: 'active',
    label: 'Активный'
  },
  inactive: {
    value: 'inactive',
    label: 'Неактивный'
  },
  blocked: {
    value: 'blocked',
    label: 'Заблокирован'
  },
  completed: {
    value: 'completed',
    label: 'Завершен'
  },
}

export const userStatuses = filterObject(['active', 'inactive', 'blocked'], statuses)
export const workshopStatuses = filterObject(['active', 'inactive', 'completed'], statuses)
