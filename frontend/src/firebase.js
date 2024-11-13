import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyALqe48RZ8SAwlh-LQFGQbNX8vzdrfjv3I",
  authDomain: "cinesatchel-deneme.firebaseapp.com",
  projectId: "cinesatchel-deneme",
  storageBucket: "cinesatchel-deneme.appspot.com",
  messagingSenderId: "483606204743",
  appId: "1:483606204743:web:e23a514a4b3ca7c42d7c62",
  measurementId: "G-9C9ZCL93ZE"
};

const app = initializeApp(firebaseConfig);

export default app;