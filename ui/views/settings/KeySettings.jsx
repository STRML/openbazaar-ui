'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');

// OB Key Settings page.
var KeySettings = module.exports = React.createClass({
  displayName: 'KeySettings',
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
  },

  render() {

    return (
      <div className="settings settings-key">
        <div className="row section-header">
          <div className="col-sm-6 section-title">
            <h2>OpenBazaar Keys</h2>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-sm-3">
              <label>Bitcoin Public Key</label>
            </div>
            <div className="col-sm-9">
              <pre>0490d6db440d67f38fa0b98289b05c8d601fc2bdd0e6a77c61d49bccc74d11cda02b65cadd4d2137930f22c602846ac54704e4d419b00dd68d7454cca104c765aa</pre>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-sm-3">
              <label>Bitcoin Private Key</label>
            </div>
            <div className="col-sm-9">
              <pre className="private">55b990f01200eb0f39ba5153b073fc5f02a6f72a4bdf48691662e28bd699895f</pre>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-sm-3">
              <label>PGP Public Key</label>
            </div>
            <div className="col-sm-9">
              <pre>{`
      -----BEGIN PGP PUBLIC KEY BLOCK-----
      Version: GnuPG v1
       
      mQENBFTRK1EBCACkw5Ohz48W0/lJJ0vtu/B6u59Pdz2iZ3H+ofHC1pSVb/Chgt4I
      0jfuCQDlsV4SqcDLgci/azDqQNjgxxJTQ0jDlXYPKNo2O3HiKQDhGeZZTt02vvj+
      6msiRZostOt+oKTl5ctuugnEnwHEpMvBnhedKSvPlj3OcLEBi8kiveIrQy6tW6p0
      essZZS0jbhiMn2xkx+k2p4t4rfbSs616Z//zuX8Fq3KL8WcUNF+WHpZsNVhWz3ca
      I4wOFdSvexTlHTiWOloOCBJ3CNvtmxS0a+LHhBBVci+N3k/udc9D+2k6Dd3/OPrW
      ZZvZgPw4LoM1891HQFB0Krgnb68MpSEA0tGRABEBAAG0PkF1dG9nZW5lcmF0ZWQg
      S2V5IChBdXRvZ2VuZXJhdGVkIGJ5IE9wZW4gQmF6YWFyKSA8Z2Z5QGdmeS5jb20+
      iQE4BBMBAgAiBQJU0StRAhsvBgsJCAcDAgYVCAIJCgsEFgIDAQIeAQIXgAAKCRBf
      cRW6Wc8h+6Q+B/4wLtPKS6Sp9ogjM2abDMLzbXQFbYxKz0MXfls08aij/KqhTx5T
      nuANl+ZmIDo5cL0S/5cM0lyxV0jPLnneBPJ5CdCeq9GQIyzWdXW0HdZlkJ05+4Z4
      P2ASKK2WgNncjNsxmiS+ps994h7PsaXc7DzAXcb7X+U3sKPCtYbFrxTss7Fbg7hZ
      eNfBe3Q0ATBC9/vPH5qa6sUyRJNei5N6Fr9ursGdT3+xnfOzhn0H3MhjhTzRR3h6
      44inuaxeT1ucvtyNqKtZtDiXwoKjAwjhp+GnJejsGYgXCRtAkfjyRGFM2UWnU0Xb
      fBo6AoELP3g90nDIwLdw4uwlzTi7RddoadYe
      =pNst
      -----END PGP PUBLIC KEY BLOCK-----
              `}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
