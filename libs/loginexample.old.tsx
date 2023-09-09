

// function PhoneLoginOld() {
//   const loginState = useAppSelector(selectLoginState);
//   const dispatch = useAppDispatch();



//   // If null, no SMS has been sent

//   const [confirm, setConfirm] = useState<FBAuth.ConfirmationResult | null>(null);
//   // verification code (OTP - One-Time-Passcode)
//   // Handle login

//   const onAuthStateChanged: FBAuth.AuthListenerCallback = function (user) {
//     console.log(user ? `Login successfully ${user.phoneNumber}` : "Log out success fully");
//     //dispatch(setLoginState({ user }));
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber: string) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

//   async function confirmCode(text: string) {
//     if (confirm == null) {
//       return;
//     }

//     try {
//       await confirm.confirm(text);
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }

//   if (!confirm) {
//     return (
//       <Button title="Phone Number Sign In"
//         onPress={() => signInWithPhoneNumber('+1 123-456-7890')} />
//     );
//   }

//   return (
//     <>
//       <Button title="Confirm Code" onPress={() => confirmCode("300373")} />

//     </>
//   );
// }


// function EmailLoginOld() {
//   GoogleSignin.configure({
//     webClientId: '352689544618-2pci7cq3oava74cttlb8vrdfp2gdn1ql.apps.googleusercontent.com',
//   });

//   const loginState = useAppSelector(selectLoginState);
//   const dispatch = useAppDispatch();

//   const onAuthStateChange: FBAuth.AuthListenerCallback = function (userData) {
//     //console.log(userData);
//     dispatch(setLoginState({
//       user: !userData ? null : {
//         email: userData.email,
//         emailVerified: userData.emailVerified,
//         isAnonymous: userData.isAnonymous,
//         phoneNumber: userData.phoneNumber,
//         photoURL: userData.photoURL,
//         providerId: userData.providerId,
//         uid: userData.uid,
//         displayName: userData.displayName
//       }
//     }));
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChange);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   async function onGoogleButtonPress() {

//     if (!!loginState.user) {
//       console.log("Login out")
//       const result = await GoogleSignin.signOut();
//       dispatch(setLoginState({ user: null }));
//       return;
//     }

//     try {
//       const result = await GoogleSignin.signIn();
//       const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
//       return auth().signInWithCredential(googleCredential)
//     } catch (e) {
//       console.log(`Login error ${JSON.stringify(e)}`);
//     }
//   }

//   return (<View>
//     {
//       !loginState.user ? null : <Text>{`Hello ${loginState.user.email}`}</Text>
//     }
//     <Button title={!!loginState.user ? "Google Sign-Out" : "Google Sign-In"}
//       onPress={() => onGoogleButtonPress()} />
//   </View>)
// }
