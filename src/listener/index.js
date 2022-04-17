import event from "../helper/event";
import { saveVerificationToken, removeVerificationTokens } from "./verification";

event.on('save:email-verification-token', saveVerificationToken);
event.on('remove:email-verification-token', removeVerificationTokens);

module.exports = event;
