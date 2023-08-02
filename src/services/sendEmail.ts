import { nylasClientData } from "../environmentTypes";

const Nylas = require('nylas');
const { default: Draft } = require('nylas/lib/models/draft');

Nylas.config({
  clientId: nylasClientData.clientId,
  clientSecret: nylasClientData.clientSecret,
});

const nylas = Nylas.with(nylasClientData.accessToken);

export function sendEmail(email: IEmail) {


  const newEmail = new Draft(nylas, email);

  // Send the draft
  newEmail.send().then((message: { id: any; }) => {
    console.log(`${message.id} was sent`);
  });
}

// email interfaces //
export interface IRecipient {
  name?: string,
  email: string
}

export interface IEmail {
  subject: string,
  body: string,
  to: IRecipient[]
}

