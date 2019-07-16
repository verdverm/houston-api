import { version, houston } from "utilities";
import { merge } from "lodash";
import shortid from "shortid";
import { Mixin } from "mixwith";

export default Mixin(
  superclass =>
    class BaseOIDCMixin extends superclass {
      authorizationUrl(params) {
        return super.authorizationUrl(this.authorizationParams(params));
      }

      authorizationParams(params) {
        const state = params.state;
        delete params.state;
        params = merge(params, this.issuer.metadata.authUrlParams, {
          redirect_uri: this.oauthRedirectUrl(),
          nonce: shortid.generate(),
          state: JSON.stringify(this.statePayload(state))
        });

        if (super.authorizationParams)
          params = super.authorizationParams(params);
        return params;
      }

      /*
       * Return a JSON-serializable object that will be included in the state
       * parameter to the authorizationUrl, and sent back to us via the
       * Identity provider.
       */
      statePayload(state) {
        return merge(
          {
            provider: this.issuer.metadata.name,
            origin: this.callbackUrl()
          },
          state || {}
        );
      }

      /*
       * Return full oauth url.
       * @return {String} The oauth url.
       */
      callbackUrl() {
        return `${houston()}/${version()}/oauth/callback`;
      }

      /*
       * Return full oauth redirect url.
       * @return {String} The oauth redirect url.
       */
      oauthRedirectUrl() {
        return `${houston()}/${version()}/oauth/redirect`;
      }
    }
);
