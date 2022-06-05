import { google } from 'googleapis';
import axios from 'axios';
import encodeUrl from 'encodeurl';

const { 
    GOOGLE_CLIENT_ID, 
    GOOGLE_CLIENT_SECRET, 
    GOOGLE_CALLBACK_URL,
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET,
    FACEBOOK_REDIRECT_URL
 } = process.env;

const googleOAuthClient = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL
);

export const getGoogleOAuthUrl = () => {
    const scopes = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
    ];

    return googleOAuthClient.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes,
        include_granted_scopes: true
    })
}

const getAccessAndBearerTokenUrl = ({ accessToken }) => 
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;

export const getGoogleUser = async  ({ code }) => {
    const { tokens } = await googleOAuthClient.getToken(code);
    console.log("token: ", tokens)
    googleOAuthClient.setCredentials(tokens);
    
    try{
        const response = await axios.get(getAccessAndBearerTokenUrl({ accessToken: tokens.access_token}),
        { headers: { Authorization: `Bearer ${tokens.id_token }`}}
        ).catch(err => { console.log(err.response)});
    
        return response.data;
    } catch(error) {
        console.log(error.message)
    }
   

    
}

/**
 * Generate FaceBook OAuth URL
 * 
 * @returns {string} url
 */
export const getFacebookOAuthUrl = () => {
    const redirect_uri = encodeUrl(FACEBOOK_REDIRECT_URL)
    console.log(redirect_uri);
    return `https://www.facebook.com/v13.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${redirect_uri}&state=1233366383&scope=public_profile,email`;
}

/**
 * Exchanging Code for an Access Token
 * @param {string} code 
 * @returns 
 */
const getFacebookAccessToken = async (code) => {
    const redirect_uri = FACEBOOK_REDIRECT_URL;
    try{
        const accessUrl = `https://graph.facebook.com/v13.0/oauth/access_token?`
        +`client_id=${FACEBOOK_APP_ID}`
        +`&client_secret=${FACEBOOK_APP_SECRET}`
        +`&code=${code}`
        +`&scope=public_profile,email`
        +`&redirect_uri=${redirect_uri}`;
    const response = await axios.get(accessUrl).catch(err=> { console.log("error:  ", err.response.data)});

    return response.data
    }catch(err) {
        console.log(err)
    }
    
}

export const getFacebookUser = async ({ code }) => {
    const url = `https://graph.facebook.com/me?fields=id,name,picture,first_name,last_name,email`
    const { access_token } = await getFacebookAccessToken(code);
    console.log("access token: "  ,access_token)
    try{ 
        const response = await axios.get(
            url,
            { headers: { Authorization: `Bearer ${access_token}`}}
        ).catch(err=> { console.log(err)});
        console.log(response.data);
        if(response.data) {
            const { 
                id,
                name,
                first_name,
                last_name,
                email,
                picture
            } = response.data;
            return {
                id,
                name,
                given_name: first_name,
                family_name: last_name,
                picture: picture.data.url,
                email,
                verified_email: true
            }
        }
        return response.data;
    }catch(err) {
        console.log(err)
    }
    
}
