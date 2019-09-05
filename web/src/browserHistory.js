import { createBrowserHistory, createMemoryHistory } from 'history';

export default (typeof window !== 'undefined'
  ? createBrowserHistory()
  : createMemoryHistory());
