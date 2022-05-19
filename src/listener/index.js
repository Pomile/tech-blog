import event from "../helper/event";
import { saveVerificationToken, removeVerificationTokens } from "./token";

event.on('save:email-verification-token', saveVerificationToken);
event.on('save:password-reset-token', saveVerificationToken);
event.on('remove:password-reset-token', removeVerificationTokens);
event.on('remove:email-verification-token', removeVerificationTokens);

module.exports = event;
