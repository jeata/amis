import React from 'react';
import NotFound from '../../src/components/404';
import Layout from '../../src/components/Layout';
import AsideNav from '../../src/components/AsideNav';
import {
  AlertComponent,
  Drawer,
  ToastComponent
} from '../../src/components/index';
import {mapTree} from '../../src/utils/helper';
import {Icon} from '../../src/components/icons';
import '../../src/locale/en';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  hashHistory,
  Link,
  Redirect,
  withRouter
} from 'react-router';
import Select from '../../src/components/Select';
import DocSearch from './DocSearch';
import Doc, {docs} from './Doc';
import Example, {examples} from './Example';

let ExamplePathPrefix = '/examples';
let DocPathPrefix = '/docs';
let ContextPath = '';

if (process.env.NODE_ENV === 'production') {
  ExamplePathPrefix = '';
  DocPathPrefix = '';
  ContextPath = '/amis';
}

const themes = [
  {
    label: '默认主题',
    ns: 'a-',
    value: 'default'
  },

  {
    label: '百度云舍',
    ns: 'cxd-',
    value: 'cxd'
  },
  {
    label: 'Dark',
    ns: 'dark-',
    value: 'dark'
  }
];

const locales = [
  {
    label: '中文',
    value: 'zh-cn'
  },

  {
    label: 'English',
    value: 'en'
  }
];

const viewModes = [
  {
    label: '桌面端',
    value: 'pc'
  },

  {
    label: '移动端',
    value: 'mobile'
  }
];

function getPath(path) {
  return path
    ? path[0] === '/'
      ? ContextPath + path
      : `${ContextPath}/${path}`
    : '';
}

class BackTop extends React.PureComponent {
  state = {
    show: false
  };

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll(e) {
    this.setState({
      show: e.target.scrollingElement?.scrollTop > 350
    });
  }

  render() {
    return (
      <div
        className={`Backtop ${this.state.show ? 'visible' : ''}`}
        onClick={() => scrollTo({top: 0})}
      >
        <i className="fa fa-rocket"></i>
      </div>
    );
  }
}

@withRouter
export class App extends React.PureComponent {
  state = {
    viewMode: 'pc', //localStorage.getItem('viewMode') || 'pc',
    offScreen: false,
    headerVisible: true,
    themeIndex: 0,
    themes: themes,
    theme: themes[0],//themes[localStorage.getItem('themeIndex') || 0],
    locale: 'zh-cn', //localStorage.getItem('locale') || '',
    inIFrame: false,
    navigations: []
  };

  docSearch:any;

  constructor(props) {
    super(props);
    this.setNavigations = this.setNavigations.bind(this);
  }

  componentDidMount() {
    if (this.state.theme.value !== 'default') {
      document.querySelectorAll('link[title]').forEach(item => {
        item.disabled = true;
      });

      document.querySelector(
        `link[title=${this.state.theme.value}]`
      ).disabled = false;

      if (this.state.theme.value === 'dark') {
        document.querySelector('body').classList.add('dark');
      }
    }

    if(window != top.window) {
      this.setState({
        inIFrame: true,
      });
      document.querySelector('body').classList.add('iniframe');
    }
  }

  componentDidUpdate(preProps, preState) {
    const props = this.props;

    if (preState.theme.value !== this.state.theme.value) {
      document.querySelector(
        `link[title=${preState.theme.value}]`
      ).disabled = true;

      document.querySelector(
        `link[title=${this.state.theme.value}]`
      ).disabled = false;
    }

    if (props.location.pathname !== preProps.location.pathname) {
      this.setState(
        {
          offScreen: false
        },
        () => window.scrollTo(0, 0)
      );

      _hmt && _hmt.push(['_trackPageview', props.location.pathname]);
    }
  }

  setNavigations(items) {
    this.setState({
      navigations: items
    });
  }

  onSearchRef(search:any) {
    this.docSearch = search;
  }

  onSearchClick() {
    this.docSearch.onOpen();
  }

  renderHeader() {
    const location = this.props.location;
    const theme = this.state.theme;

    if (location.pathname === '/edit') {
      return (
        <div id="headerBar" className="box-shadow bg-dark">
          <div className={`${theme.ns}Layout-brand`}>可视化编辑器</div>
        </div>
      );
    }

    return (
      <>
        <div className={`${theme.ns}Layout-brandBar`}>

          <div className={`${theme.ns}Layout-offScreen-group visible-xs`}>
            <div
              onClick={() => this.setState({offScreen: !this.state.offScreen})}
              className={`${theme.ns}Layout-offScreen-btn`}
            >
              <i className="bui-icon iconfont icon-collapse"></i>
            </div>
            <div
              onClick={this.onSearchClick.bind(this)}
              className={`${theme.ns}Layout-offScreen-btn`}
            >
              <i className="bui-icon iconfont icon-search"></i>
            </div>
          </div>

          <div className={`${theme.ns}Layout-brand`}>
            <Link to={`${ContextPath}/docs`}>
              <div className="logo"></div>
              <span className="title">页面文档</span>
            </Link>
          </div>
        </div>

        <div className={`${theme.ns}Layout-headerBar`}>
          <ul className={`${theme.ns}Layout-headerBar-links pull-left`}>
            <Link to={`${ContextPath}/docs`} activeClassName="is-active">
              文档
            </Link>
            <Link to={`${ContextPath}/examples`} activeClassName="is-active">
              示例
            </Link>
          </ul>
        </div>

        <div className={`${theme.ns}Layout-searchBar hidden-xs hidden-sm`}>
          <DocSearch theme={theme} onRef={this.onSearchRef.bind(this)} />
        </div>

        <div className={`${theme.ns}Layout-searchIcon visible-sm`}>
          <div
            onClick={this.onSearchClick.bind(this)}
            className={`${theme.ns}Layout-offScreen-btn`}
          >
            <i className="bui-icon iconfont icon-search"></i>
          </div>
        </div>
      </>
    );
  }

  renderNavigation() {
    return (
      <div className="Doc-navigation">
        <AsideNav
          navigations={this.state.navigations.map(item => ({
            ...item,
            children: item.children
              ? item.children.map(item => ({
                  ...item,
                  className: 'is-top'
                }))
              : []
          }))}
          renderLink={({
            link,
            active,
            toggleExpand,
            classnames: cx,
            depth
          }: any) => {
            let children = [];

            if (link.children && link.children.length) {
              children.push(
                <span
                  key="expand-toggle"
                  className={cx('AsideNav-itemArrow')}
                  onClick={e => toggleExpand(link, e)}
                ></span>
              );
            }

            children.push(
              <span className={cx('AsideNav-itemLabel')} key="label">
                {link.label}
              </span>
            );

            return link.path ? (
              /^https?\:/.test(link.path) ? (
                <a target="_blank" href={link.path} rel="noopener">
                  {children}
                </a>
              ) : (
                <Link
                  to={
                    getPath(link.path) ||
                    (link.children && getPath(link.children[0].path))
                  }
                >
                  {children}
                </Link>
              )
            ) : (
              <a onClick={link.children ? () => toggleExpand(link) : undefined}>
                {children}
              </a>
            );
          }}
          isActive={(link: any) => isActive(link, location)}
        />
      </div>
    );
  }

  render() {
    const theme = this.state.theme;

    return (
      <Layout
        theme={theme.value}
        boxed={true}
        offScreen={this.state.offScreen}
        header={this.state.headerVisible ? this.renderHeader() : null}
      >
        <ToastComponent theme={theme.value} locale={this.state.locale} />
        <AlertComponent theme={theme.value} locale={this.state.locale} />

        <div className="Doc">
          <div className="Doc-nav hidden-xs hidden-sm">
            {this.renderNavigation()}
          </div>

          <Drawer
            size="xs"
            className="Doc-navDrawer"
            overlay
            closeOnEsc={true}
            closeOnOutside
            onHide={() => this.setState({offScreen: false})}
            show={this.state.offScreen}
            position="left"
          >
            {this.renderNavigation()}
          </Drawer>

          <BackTop />

          {React.cloneElement(this.props.children, {
            key: theme.value,
            ...this.props.children.props,
            setNavigations: this.setNavigations,
            theme: theme.value,
            classPrefix: theme.ns,
            viewMode: this.state.viewMode,
            locale: this.state.locale,
            offScreen: this.state.offScreen,
            ContextPath
          })}
        </div>
      </Layout>
    );
  }
}

function isActive(link: any, location: any) {
  return !!(link.path && getPath(link.path) === location.pathname);
}

function navigations2route(pathPrefix = DocPathPrefix, navigations) {
  let routes = [];

  navigations.forEach(root => {
    root.children &&
      mapTree(root.children, item => {
        if (item.path && item.component) {
          routes.push(
            <Route
              key={routes.length + 1}
              path={
                item.path[0] === '/'
                  ? ContextPath + item.path
                  : `${ContextPath}/${item.path}`
              }
              component={item.component}
            />
          );
        } else if (item.path && item.getComponent) {
          routes.push(
            <Route
              key={routes.length + 1}
              path={
                item.path[0] === '/'
                  ? ContextPath + item.path
                  : `${ContextPath}/${item.path}`
              }
              getComponent={item.getComponent}
            />
          );
        }
      });
  });

  return routes;
}

export default function entry({pathPrefix}) {
  // PathPrefix = pathPrefix || DocPathPrefix;
  return (
    <Router history={browserHistory}>
      <Route component={App}>
        <Redirect from={`/`} to={`${ContextPath}/docs/index`} exact/>
        {ContextPath != '' && <Redirect from={`${ContextPath}`} to={`${ContextPath}/docs/index`} exact />}
        <Redirect
          from={`${ContextPath}/docs`}
          to={`${ContextPath}/docs/index`}
        />
        <Redirect
          from={`${ContextPath}/examples`}
          to={`${ContextPath}/examples/pages/simple`}
        />

        <Route path={`${ContextPath}/docs`} component={Doc}>
          {navigations2route(DocPathPrefix, docs)}
        </Route>
        <Route path={`${ContextPath}/examples`} component={Example}>
          {navigations2route(ExamplePathPrefix, examples)}
        </Route>
      </Route>

      <Route path="*" component={NotFound} />
    </Router>
  );
}
