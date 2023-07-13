const Nylas = require('nylas');
const { default: Draft } = require('nylas/lib/models/draft');

Nylas.config({
    clientId: "5g6s3fky71a9p1i7kafs9fnd8",
    clientSecret: "c76lzmje7wme0lbjbuvl2xjfy",
});

const nylas = Nylas.with("aeuRVmDVDEhWFPGjILnDfOLPlQA4a9");

const draft = new Draft(nylas, {
  subject: 'With Love, from Nylas',
  body: 'This email was sent using the Nylas email API. Visit https://nylas.com for details.',
  to: [{ name: 'Matthew Slater', email: 'mattslat4@gmail.com' }]
});

// Send the draft
draft.send().then(message => {
    console.log(`${message.id} was sent`);
});