import BaseOIDCMixin from "./base";
import { providerCfg } from "oauth/config";
import { Mixin, mix } from "mixwith";

export default Mixin(
  superclass =>
    class Auth0OIDCMixin extends mix(superclass).with(BaseOIDCMixin) {
      authorizationParams(params) {
        if (this.metadata.integration)
          params.connection = this.metadata.integration;
        return super.authorizationParams(params);
      }

      statePayload(providedState) {
        const state = super.statePayload(providedState);

        // Sometimes we want to pretend to be another provider when
        // handling the post request, For example Google via Auth0, the
        // issuer name is "auth0", but the name we want to pass to
        // getClient is "google"
        if (this.metadata.integration) {
          switch (this.metadata.integration) {
            case "google-oauth2":
              state.provider = "google";
              break;
            case "github":
              state.provider = "github";
              break;
          }
        }
        return state;
      }

      /*
       * Return full oauth redirect url.
       * @return {String} The oauth redirect url.
       */
      oauthRedirectUrl() {
        const isProd = process.env.NODE_ENV === "production";
        const { discoveryUrl: auth0Url } = providerCfg.auth0;
        const defaultAuth0 = auth0Url === "https://astronomerio.auth0.com";

        // If we're in prod with the default auth0 domain configured,
        // return the shared redirect url. This is for the shared
        // auth0 account that is enabled by default. Auth0 requires a list
        // of redirect urls that are authorized. When a user installs
        // at a custom domain, the redirect won't work. To get around this,
        // we host a well-known url to use by default.
        if (isProd && defaultAuth0) {
          return "https://redirect.astronomer.io";
        }

        // Otherwise return the redirect url of the installation. If a user, brings
        // their own auth0 account, this will be used and will skip the shared url.
        return super.oauthRedirectUrl();
      }
    }
);
