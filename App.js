import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Front from "./page/front"
import SignIn from "./page/signin.js";
import SignUp from "./page/signup.js";
import cust_home from "./page/customer/home";
import profile from "./page/customer/profil";
import pesan from "./page/customer/pesan";
import edit from "./page/customer/edit";
import admin_home from "./page/admin/home";
import history from "./page/customer/history";
import editPesanan from "./page/admin/edit";


const screens = {
    SignInScreen: {
        screen: SignIn,
        navigationOptions: {
            headerShown: false,
        },
    },
    
    SignUpScreen: {
        screen: SignUp,
        navigationOptions: {
            title: 'Buat Akun',
            headerTitleAlign: 'center'
        },
    },
    CustHomeScreen: {
        screen: cust_home,
        navigationOptions: {
            headerShown: false,
        },
    },
    ProfileScreen: {
        screen: profile,
        navigationOptions: {
            title: 'Profil',
            headerTitleAlign: 'center'
        },
    },
    PesanScreen: {
        screen: pesan,
        navigationOptions: {
            title: 'Pesan Laundry',
            headerTitleAlign: 'center'
        },
    },
    EditScreen: {
        screen: edit,
        navigationOptions: {
            title: 'Edit Account',
            headerTitleAlign: 'center'
        },
    },
    AdminHomeScreen: {
        screen: admin_home,
        navigationOptions: {
            headerShown: false,
        },
    },
    HistoryScreen: {
        screen: history,
        navigationOptions: {
            title: 'Riwayat Pesanan',
            headerTitleAlign: 'center'
        },
    },
    EditPesanScreen: {
        screen: editPesanan,
        navigationOptions: {
            headerShown: true,
            title: 'Update Pesanan',
            headerTitleAlign: 'center'
        },
    },
}

const homeStack = createStackNavigator(
    screens, {
        initialRouteName: 'SignInScreen',
        
    },
    

);

const RootNavigator = createSwitchNavigator(
    {
        homeStack: homeStack,
        Splash: Front,
    },
    {
        initialRouteName: "Splash",
    }
  );
export default createAppContainer(RootNavigator);