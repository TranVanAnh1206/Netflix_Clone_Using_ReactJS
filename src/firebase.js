import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, onValue, child, push, ref, set, update, remove } from 'firebase/database';

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

export { auth };
export { signInWithEmail, registerWithEmail };
export {
    WriteDataToRealtimeDataBase,
    ReadDataFromRealtimeDatabase,
    UpdateDataToRealtimeDatabase,
    DeleteDataFromRealtimeDatabase,
};
export default db;
