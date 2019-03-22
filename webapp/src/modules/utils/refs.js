import firebase from 'firebase';

export const dbRef = firebase.database().ref('/');

export const storageRef = firebase.storage().ref();
