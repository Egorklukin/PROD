import {
  createHashRouter
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = {
  HOME: 'home',
};

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  USERFORM: 'userform',
};

export const router = createHashRouter([
  {
    path: '/',
    panel: DEFAULT_VIEW_PANELS.HOME,
  },
  {
    path: '/userform',
    panel: DEFAULT_VIEW_PANELS.USERFORM,
    view: DEFAULT_VIEW.USERFORM,
  },
]);
