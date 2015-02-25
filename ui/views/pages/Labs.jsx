'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');
var IdenticonView = require('ui/views/widgets/Identicon');
var FluxMixin = require('fluxxor').FluxMixin(React);

// OB Labs Page.
var Labs = module.exports = React.createClass({
  displayName: 'Labs',
  mixins: [React.addons.PureRenderMixin, FluxMixin],
  propTypes: {
  },

  render() {
    return (
      <div className="page labs">
        <div className="my-market">
          <div className="backdrop">
          </div>
          <div className="row section-header pinned">
            <div className="col-sm-6 section-title">
              <h2>My Market</h2>
            </div>
            <div className="col-sm-6 section-controls">
              <button className="btn btn-sm">Trust Notary</button> 
              <button className="btn btn-sm text-success"><strong>Trusted Arbiter</strong></button> 
              <button className="btn btn-primary btn-sm">Send Message</button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <h1 className="market-name">Home Grown Coffee</h1>
            </div>
            <div className="col-sm-12">
              <div className="block-shade">
                <p>At Home Grown Coffee, we treat our beans right. We accept only the highest-quality beans, and craft roast every batch to bring you the finest coffees. Learn how to make the smoothest, best-tasting cup of coffee in the neighborhood. </p>
                <hr/>
                <table className="table product-table">
                  <thead>
                    <tr>
                      <th>Contract Title</th>
                      <th>Description</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="title">Starlight Blend</td>
                      <td>
                        <div className="short">Beaming with hints of maple candy and ripe berries grounded by heavy body and flavors of toasted grains, malt and nuts.</div>
                      </td>
                      <td className="price"> <i className="mdi mdi-currency-btc"></i>0.08 </td>
                    </tr>
                    <tr>
                      <td className="title">Guatemala El Paraiso</td>
                      <td>
                        <div className="short">El Paraiso 'Paradise' is a perfect name for the beautiful valley in Huehuetenango, Guatemala. It's known as one of the premier coffee-growing regions in the world.</div>
                      </td>
                      <td className="price"> <i className="mdi mdi-currency-btc"></i>0.08 </td>
                    </tr>
                    <tr>
                      <td className="title">Daybreak Blend Decaf</td>
                      <td>
                        <div className="short">The perfect pick-me-up whether it's morning or evening. Cheering and sweet, it leaves a quiet hint of fruit and nuts after each sip.</div>
                      </td>
                      <td className="price"> <i className="mdi mdi-currency-btc"></i>0.07 </td>
                    </tr>
                    <tr>
                      <td className="title">Daybreak Blend</td>
                      <td>
                        <div className="short">The perfect pick-me-up whether it's morning or evening. Cheering and sweet, it leaves a quiet hint of fruit and nuts after each sip.</div>
                      </td>
                      <td className="price"> <i className="mdi mdi-currency-btc"></i>0.07</td>
                    </tr>
                    <tr>
                      <td className="title">Colombia Coschecha De Oro</td>
                      <td>
                        <div className="short">Our most recent offering from the beautiful country of Colombia, Cosecha de Oro (which means crop of gold and is what coffee is called when it is prepared), comes from the towns of Sotomayor and La Union in the Southern state of Nari</div>
                      </td>
                      <td className="price"> <i className="mdi mdi-currency-btc"></i>0.07 </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="block-shade">
                <h1>Typography</h1>
                <p className="text-justify">Vivamus porta, mauris eu commodo tempor, lectus ante semper dolor, quis aliquet leo nulla id purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean congue aliquet fermentum. Curabitur eu tristique elit. Pellentesque tristique purus ante, at egestas mauris commodo vel. Proin risus est, sagittis tristique gravida nec, sodales quis justo. Vestibulum lacinia nisi vitae enim mattis, sed aliquam tortor rhoncus. Nulla pellentesque felis lectus, non euismod nulla hendrerit a. Proin aliquam justo in mattis varius. Ut feugiat nec orci in pretium. Etiam imperdiet laoreet commodo. Aenean consequat semper tellus eget elementum. Curabitur et sem eleifend, iaculis quam quis, malesuada neque. Morbi sodales sit amet lorem at fringilla.</p>
                <p>  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni hic, deleniti perspiciatis debitis veniam blanditiis tempore. Sint, odit! Necessitatibus eum inventore dolores corporis quia cum voluptatum voluptatibus ea rerum dignissimos!</p>
                <h1 className="serif">{"Here's some serif text"}</h1>
                <p className="serif">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque non libero ac rhoncus. Etiam laoreet gravida facilisis. Phasellus facilisis odio risus. Nullam commodo, eros suscipit malesuada auctor, ante nisi volutpat nisi, eu sagittis metus metus in velit. Nullam bibendum sem eu purus sollicitudin, sed commodo ligula commodo. Nunc imperdiet ligula id purus scelerisque, malesuada vulputate augue consectetur. Nunc ex neque, fringilla sed imperdiet eget, varius sed neque. Donec ullamcorper diam urna, at rutrum est accumsan venenatis. Donec nec eleifend nibh. Vestibulum pharetra pretium dapibus. Ut ultricies tempor laoreet. Etiam in erat tempus odio ullamcorper egestas dictum aliquet quam. Vivamus vel dignissim sem. Vestibulum facilisis mi mauris, ut convallis leo interdum ac. Phasellus tellus augue, convallis et hendrerit sit amet, tristique at quam.</p>
                <h2 className="serif">How about some justified serif text?</h2>
                <p className="serif text-justify"> Curabitur lacinia placerat neque, tempor venenatis purus tincidunt sit amet. Donec nisl neque, lobortis quis ultrices non, sagittis ac augue. Curabitur ligula felis, posuere non faucibus nec, dapibus vel neque. Aliquam est dui, rhoncus a arcu eu, finibus interdum ex. Suspendisse commodo, augue ut vestibulum hendrerit, sapien sapien rhoncus metus, et congue ex justo in risus. Ut justo quam, sodales a condimentum a, cursus ac massa. Praesent sollicitudin congue viverra. Aliquam sed nisl ultricies, cursus nisl at, condimentum diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus euismod nibh et consequat auctor.</p>
                <h3 className="serif">SERIF COLUMNS!</h3>
                <div className="row serif text-justify">
                  <div className="col-sm-4">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus magnam culpa velit id natus alias consequatur ab placeat dignissimos voluptas repudiandae tenetur eos nobis sint maxime repellat, nihil. Delectus, ea!</p>
                  </div>
                  <div className="col-sm-4">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, aut, non porro possimus quia aliquam, est ut necessitatibus culpa nesciunt, eveniet. Asperiores expedita, omnis sit provident totam et alias quibusdam.</p>
                  </div>
                  <div className="col-sm-4">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere tempore iure ea, assumenda vitae quia quos illo ab aliquam quaerat deleniti excepturi obcaecati voluptatem culpa natus. Quos quasi nulla veritatis?</p>
                  </div>
                </div>
                <blockquote>
                  <p className="serif">Somewhere, something incredible is waiting to be known.</p>
                  <footer>
                     
                    Carl Sagan
                  </footer>
                </blockquote>
                <p className="serif">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta numquam minus, nulla vero omnis reiciendis vel quisquam ipsum voluptates ipsam repudiandae, totam nobis, quidem placeat tempora iste dignissimos doloribus ad!</p>
                <h3>H3a Header</h3>
                <p>  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum sit est nulla molestiae quibusdam dolores corrupti ipsum cum, sunt quae fugit assumenda necessitatibus nihil, impedit inventore. Eius, voluptate distinctio expedita.</p>
                <p>  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores ullam tempora eum, ab hic architecto quo, enim mollitia tempore? Inventore nulla, necessitatibus cumque eum cupiditate porro quos placeat facere qui.</p>
                <h3>H3b Header</h3>
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus magnam culpa velit id natus alias consequatur ab placeat dignissimos voluptas repudiandae tenetur eos nobis sint maxime repellat, nihil. Delectus, ea!</p>
                <h4>H4a Header</h4>
                <div className="row">
                  <div className="col-sm-6">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, aut, non porro possimus quia aliquam, est ut necessitatibus culpa nesciunt, eveniet. Asperiores expedita, omnis sit provident totam et alias quibusdam.</p>
                  </div>
                  <div className="col-sm-6">
                    <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium ab doloremque delectus blanditiis quasi, ipsam eveniet optio ut, minima nostrum ad voluptates maxime beatae laudantium deserunt suscipit nemo illum sit.</p>
                  </div>
                </div>
                <h4>H4b Header</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere tempore iure ea, assumenda vitae quia quos illo ab aliquam quaerat deleniti excepturi obcaecati voluptatem culpa natus. Quos quasi nulla veritatis?</p>
                <div className="alert alert-success"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque nam, minima corrupti soluta debitis non assumenda recusandae architecto id pariatur reprehenderit officia iure autem, in molestiae quidem similique dolore. Rerum!</div>
                <div className="alert alert-info"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque nam, minima corrupti soluta debitis non assumenda recusandae architecto id pariatur reprehenderit officia iure autem, in molestiae quidem similique dolore. Rerum!</div>
                <div className="alert alert-warning"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque nam, minima corrupti soluta debitis non assumenda recusandae architecto id pariatur reprehenderit officia iure autem, in molestiae quidem similique dolore. Rerum!</div>
                <div className="alert alert-danger"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque nam, minima corrupti soluta debitis non assumenda recusandae architecto id pariatur reprehenderit officia iure autem, in molestiae quidem similique dolore. Rerum!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
