import Loadable from 'react-loadable';
import Loading from 'components/Loading';
import path from 'path';

export default function asyncComponent(importComponent, componentPath) {
  return Loadable({
    loader: () => importComponent(),
    loading: Loading,
    serverSideRequirePath: path.join(__dirname, `./src/${componentPath}`),
  });
}