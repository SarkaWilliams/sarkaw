// Web3Forms integration — https://web3forms.com/
// Access Key is a public form identifier (like a form ID), not a secret;
// it's safe to ship in client-side code. Get it by submitting
// sarka.williams@gmail.com at https://web3forms.com/ and checking that inbox.
// Deliberately kept out of the Sveltia-managed content JSON: Sveltia only
// round-trips fields declared in config.yml, so an undeclared key here
// could get silently dropped on the next CMS save.
export const WEB3FORMS_ACCESS_KEY = "REPLACE_WITH_WEB3FORMS_ACCESS_KEY";
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
