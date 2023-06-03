import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    FacebookAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, onValue, child, push, ref, set, update, remove, get } from 'firebase/database';

// Đối tượng firebaseConfig chứa thông tin cần thiết để kết nối với cơ sở dữ liệu Firestore
const firebaseConfig = {
    apiKey: 'AIzaSyBXEuTZJTyRZPFYrUfFLu-h19KIizdsr8c',
    authDomain: 'netflix-clone-c2816.firebaseapp.com',
    projectId: 'netflix-clone-c2816',
    storageBucket: 'netflix-clone-c2816.appspot.com',
    messagingSenderId: '617310970710',
    appId: '1:617310970710:web:a2741f0ec210f674936cf7',
    databaseURL: 'https://netflix-clone-c2816-default-rtdb.firebaseio.com/',
};

// firebaseApp khởi tạo ứng dụng firebase với firebaseConfig đã cho.
const firebaseApp = initializeApp(firebaseConfig);

// Hằng số db tạo kết nối đến cơ sở dữ liệu Firestore bằng firebaseApp.firestore().
const db = getFirestore(firebaseApp);

// Hằng auth tạo kết nối đến dịch vụ Firebase Authentication.
const auth = getAuth(firebaseApp);

const firebaseDatabase = getDatabase(firebaseApp);

///// Đăng ký mới tài khoản
const registerWithEmail = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
            console.log(authUser);
            localStorage.setItem('User', JSON.stringify(authUser));
        })
        .catch((error) => {
            alert(error.message);
        });
};

///// Đăng nhập với tài khoản hiện có trên firebase
const signInWithEmail = (email, password) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((authUser) => {
                resolve(authUser);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

///// Ghi sữ liệu vào realtime database
const WriteDataToRealtimeDataBase = (path, uid, childBranch, childBranchBody) => {
    const newChildBranchBodyKey = push(child(ref(firebaseDatabase), `${path}/${uid}/${childBranch}/`)).key;

    set(ref(firebaseDatabase, `${path}/${uid}/${childBranch}/${newChildBranchBodyKey}`), childBranchBody);
};

///// Đọc thông tin từ realtime database

// const ReadDataFromRealtimeDatabase = async (path, uid, childBranch) => {
//     const dataRef = ref(firebaseDatabase, `${path}/${uid}/${childBranch}`);
//     let snapshotValue = await get(dataRef);
//     // onValue(dataRef, (snapshot) => {
//     //     snapshotValue = snapshot.val();
//     // });

//     return snapshotValue.val();
// };

const ReadDataFromRealtimeDatabase = (path, uid, childBranch) => {
    const dataRef = ref(firebaseDatabase, `${path}/${uid}/${childBranch}`);
    let snapshotValue = null;
    onValue(dataRef, (snapshot) => {
        snapshotValue = snapshot.val();
    });

    return snapshotValue;
};

//// Update dữ liệu vào trong realtme database
const UpdateDataToRealtimeDatabase = (path, uid, childBranch, childBranchBody) => {
    const newChildBodyKey = push(child(ref(firebaseDatabase), `${path}/${uid}/${childBranch}`)).key;

    let updates = {};
    updates[`${path}/${uid}/${childBranch}/${newChildBodyKey}`] = childBranchBody;

    return update(ref(firebaseDatabase), updates);
};

// Xóa dữ liệu bên trong realtime database
const DeleteDataFromRealtimeDatabase = (path) => {
    const dataDel = ref(firebaseDatabase, path);
    remove(dataDel)
        .then(() => {
            console.log(`${path} Đã xóa dữ liệu thành công.`);
        })
        .catch(() => {
            console.log(`${path} Xóa dữ liệu thất bại !`);
        });
};

// Đăng nhập bằng Google
const GG_Provider = new GoogleAuthProvider();
// GG_provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
auth.languageCode = 'it';
// Để áp dụng tùy chọn trình duyệt mặc định thay vì đặt nó một cách rõ ràng.
// firebase.auth().useDeviceLanguage();

GG_Provider.setCustomParameters({
    login_hint: 'user@example.com',
});

const SignInWithGoogle = () => {
    signInWithPopup(auth, GG_Provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
};

// Đăng nhập bằng facebook
const FB_Provider = new FacebookAuthProvider();
FB_Provider.addScope('user_birthday');
auth.languageCode = 'it';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

FB_Provider.setCustomParameters({
    display: 'popup',
});

const signInWithFacebook = () => {
    signInWithPopup(auth, FB_Provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // IdP data available using getAdditionalUserInfo(result)
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
        });
};

export { auth };
export { signInWithEmail, registerWithEmail };
export { SignInWithGoogle, signInWithFacebook };
export {
    WriteDataToRealtimeDataBase,
    ReadDataFromRealtimeDatabase,
    UpdateDataToRealtimeDatabase,
    DeleteDataFromRealtimeDatabase,
};
export default db;
