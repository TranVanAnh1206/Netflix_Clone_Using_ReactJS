import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, set } from 'firebase/database';

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
        })
        .catch((error) => {
            alert(error.message);
        });
};

///// Đăng nhập với tài khoản hiện có trên firebase
const signInWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
            console.log(authUser);
        })
        .catch((error) => {
            if (error.code === 'auth/user-not-found') {
                alert('User not found. Please try again.');
            } else if (error.code === 'auth/wrong-password') {
                alert('Wrong password. Please try again.');
            }
        });
};

///// Ghi sữ liệu vào realtime database
const writeFavoriteMovies = (path, uid, favoriteList) => {
    set(ref(firebaseDatabase, `'${path}/${uid}`), {
        favoriteMovies: favoriteList,
    });
    console.log('Đã thêm vào database');
};

export { auth };
export { signInWithEmail, registerWithEmail };
export { writeFavoriteMovies };
export default db;
