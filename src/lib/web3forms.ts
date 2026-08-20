// Web3Forms integration — https://web3forms.com/
// Access Key is a public form identifier (like a form ID), not a secret;
// it's safe to ship in client-side code. Get it by submitting
// sarka.williams@gmail.com at https://web3forms.com/ and checking that inbox.
// Deliberately kept out of the Sveltia-managed content JSON: Sveltia only
// round-trips fields declared in config.yml, so an undeclared key here
// could get silently dropped on the next CMS save.
export const WEB3FORMS_ACCESS_KEY = "82afec55-4375-4e47-9e05-a39b22d14fcf";
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
