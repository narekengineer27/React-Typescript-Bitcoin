import * as _ from 'lodash';
import { User } from 'Models/User';

export const isAuthenticated = () => {
  return localStorage.getItem('auth') === 'true';
};

export const saveUserToLocal = (data) => {
  const apiKey = _.get(data, 'api_key', '');
  localStorage.setItem('auth', 'true');
  localStorage.setItem('user', JSON.stringify(_.get(data, 'user')));
  localStorage.setItem('api_key', apiKey);
};

export const getCurrentUser = (): User => {
  try {
    let userJson = localStorage.getItem('user');
    const user = JSON.parse(userJson) as User;
    if (!user.currency) {
      user.currency = 'USD';
    }
    if (!user.city) {
      user.city = '';
    }
    if (!user.country) {
      user.country = '';
    }
    if (!user.walletId) {
      user.walletId = '';
    }
    if (!user.user_photo) {
      user.user_photo = '';
    }
    if (!user.is_dev) {
      user.is_dev = true;
    }

    return user;
  } catch (err) {
  }

  return null;
};

export const getUserField = (field: string) => {
  return (getCurrentUser() || {})[field] || null;
};

export const getUserCurrency = () => {
  return (getCurrentUser() || {}).currency || 'USD';
};

export const getUserRole = () => {
  return (getCurrentUser() || {}).user_role || 'standard';
};

export const isAdmin = () => {
  return getUserRole() === 'admin';
};

export const exitStrategySet = () => {
  return !!((getCurrentUser() || {}).exit_strategy_set);
};

export const exitStrategyHasBeenSet = () => {
  const user = getCurrentUser() || {};
  user.exit_strategy_set = true;
  localStorage.setItem('user', JSON.stringify(user));
};
