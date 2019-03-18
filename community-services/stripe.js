import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.linkWithStripe = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.');
  }
  if (!Package['billyvg:stripe-oauth']) {
    throw new Meteor.Error(403, 'Please include billyvg:stripe-oauth package');
  }

  if (!callback && typeof options === 'function') {
    callback = options;
    options = null;
  }

  let credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
  Package['billyvg:stripe-oauth'].StripeOAuth.requestCredential(options, credentialRequestCompleteCallback);
};

