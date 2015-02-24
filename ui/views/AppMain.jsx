'use strict';
require('ui/assets/scss/app.scss');
require('ui/assets/scss/vendor.scss');

var debug = require('debug')('ob:AppMain');
var _ = require('lodash');
var React = require('react/addons');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var app = require('ui/app');
var Router = require('react-router-component');
// Captures clicks from normal <a> elements
var CaptureClicks = require('react-router-component/lib/CaptureClicks');
var AnimatedLocations = require('ui/views/widgets/AnimatedLocations.jsx');

var NotFoundPage = require('ui/views/static/NotFoundPage');
var Sidebar = require('ui/views/Sidebar');
var Header = require('ui/views/Header');

var AppMain = module.exports = React.createClass({
  displayName: 'AppMain',
  mixins: [
    FluxMixin, 
    Fluxxor.StoreWatchMixin(
      // 'StuffStore'
    ),
    React.addons.PureRenderMixin
  ],
  componentDidMount() {
    // Notify stores that the app mounted.
    this.getFlux().actions.appDidMount();
    window.addEventListener('resize', _.throttle(this.checkLayoutSize, 100));
    this.checkLayoutSize();
    app.router = this.refs.router;
  },
  getInitialState() {
    return {
      currentPath: process.browser ? window.location.pathname : app.initialData.route,
      responsiveSize: 'lg'
    };
  },
  getStateFromFlux() {
    var flux = this.getFlux();
    return {
      markets: flux.stores['MarketStore'].getMarkets(),
      messages: flux.stores['MessageStore'].getMessages()
      // stuff: flux.stores['StuffStore'].getData()
    };
  },

  /**
   * Using this, you can create components that will only be rendered at certain sizes.
   * Useful if you want to use an expensive component in different positions and CSS won't cut it.
   * Pass and check the prop `responsiveSize`.
   */
  checkLayoutSize() {
    var currentWidth = window.innerWidth;
    var sizes = ['lg', 'md', 'sm', 'xs', 'xxs'];
    var mins = [1200, 996, 768, 480, 0];
    for (var i = 0; i < mins.length; i++) {
      if (currentWidth > mins[i]) {
        break;
      }
    }
    if (this.state.responsiveSize !== sizes[i]) {
      debug('Viewport changed to %s', sizes[i]);
      this.setState({
        responsiveSize: sizes[i],
        // Only animate in > md size
        doTransitionAnimation: currentWidth > mins[1]
      });

    }
  },

  onBeforeNavigation(nextPath) {
    this.setState({currentPath: nextPath});
  },

  render() {
    var Locations = Router.Locations;
    var Location = Router.Location;
    var NotFound = Router.NotFound;
    // Set initial path. We only set it on server rendering, otherwise we could run the risk of triggering
    // routes twice - once initially, and again when we set `path` on Locations.
    var path = process.browser ? undefined : this.state.currentPath;

    return (
      <div className='container-fluid content-container'>
        <CaptureClicks>
          <Sidebar currentPath={this.state.currentPath} />
          <div className='wrap'>
            <Header />
            <div className='content container'>
              <AnimatedLocations ref='router' path={path} onBeforeNavigation={this.onBeforeNavigation}
                transitionName='fadeIn' transitionLeave={false} transitionEnter={this.state.doTransitionAnimation}>

                {/* Home screen */}
                <Location path={'/(home)'} handler={require('ui/views/pages/Home.jsx')} />
                <Location path={'/markets'} handler={require('ui/views/pages/Markets.jsx')} 
                  markets={this.state.markets} />
                <Location path={'/market/:guid'} handler={require('ui/views/pages/Market.jsx')} 
                  markets={this.state.markets} />

                <Location path={'/messages'} handler={require('ui/views/pages/Messages.jsx')} 
                  messages={this.state.messages} />
                <Location path={'/message/:id'} handler={require('ui/views/pages/Message.jsx')} 
                  messages={this.state.messages} />

                {/* 404 */}
                <NotFound handler={NotFoundPage} />
              </AnimatedLocations>
            </div>
          </div>
        </CaptureClicks>
      </div>
    );
  }
});
