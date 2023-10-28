import LocalizedStrings from 'react-native-localization';
import STATUS_CODES from '../../backend/models/status';
//GENERIC_ERROR,
// USER_NOT_FOUND,
// INVALID_NUMBER,
// SENT_CODE,
// NUMBER_NOT_EXIST,
// ERROR_SENDING_CODE,
// TOO_MANY_ATTEMPTS,
// CODE_DENIED,
// CODE_EXPIRED,
// CODE_FAILED,
// ALREADY_REPORTED,
// MISMATCHED_IMAGE,
export const Localizations = new LocalizedStrings({
    "es": {

        error: 'Error',
        userNotFound: '',
        loginButton: 'Entrar',
        enterCodeTitle: 'Ingresa el código',
        enterCodeDesc: 'Ingresa el código de verificación enviado a '
    },
    "en": {
        fire: 'fire',
        flood: 'flood',
        landslide: 'landslide',
        error: 'Error',
        success: 'Success',
        GENERIC_ERROR: 'An error has occured',
        USER_NOT_FOUND: 'That user does not exist',
        INVALID_NUMBER: 'Enter a valid phone number',
        SENT_CODE: 'A code has already been sent to ',
        NUMBER_NOT_EXIST: 'That number does not exist',
        ERROR_SENDING_CODE: 'There was an error sending the code',
        TOO_MANY_ATTEMPTS: 'You have attempted too many times, please wait 5 minutes',
        CODE_DENIED: 'The code is incorrect',
        CODE_EXPIRED: 'The code has expired',
        CODE_FAILED: 'There was an error sending the code',
        ALREADY_REPORTED: 'You have already reported a {0}',
        MISMATCHED_IMAGE: 'The image does not contain a {0}',
        enterCodeTitle: 'Enter the code',
        enterCodeDesc: 'Enter the verification code sent to ',
        selectCountryCode: 'Select your country code',
    }
});

export function getStringFromStatusCode(status: STATUS_CODES) {
    // return Localizations[STATUS_CODES[status]];
}