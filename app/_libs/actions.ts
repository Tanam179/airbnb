'use server';

import { signIn, signOut } from '@/_libs/auth';

export const emailLogin = async function({email, password}: { email: string, password: string }) {
    await signIn('email-login', { email, password, redirect: false} );
}

export const logout = async function() {
    await signOut();
}


export const googleLogin = async function() {
    await signIn('google');
}

export const facebookLogin = async function() {
    await signIn('facebook');
}
 