import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { setDoc, Doc, doc, getDoc, where, query, collection, getDocs } from 'firebase/firestore';
import { db } from '../config';
import Constants from 'expo-constants';

import { Card } from "react-native-paper";

export default class profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            fullname: '',
            address: '',
            latitude: '',
            longitude: '',
            resData:[],
            };
    }

    getData= async ()=>{
        
        var Username = this.state.username;
        var Pass = this.state.password;
        await getDocs(query(collection(db, "users")
            , where('username','==',Username)
        ))
        .then((docSnap) => {
            let users = [];
            docSnap.forEach((doc) => {
                users.push({ ...doc.data(), id: doc.id })
            });
            console.log(users);
            this.setState({
                fullname: users[0].fullname,
                address: users[0].address,
                latitude: users[0].latitude,
                longitude: users[0].longitude,
            });
        });
    }

    componentDidMount(){
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
            errorMessage:
              'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
          } else {
            const pass_data = localStorage.getItem('pass_username');
            var p_user = String(pass_data);
            this.state.username = p_user;
            this.getData();
          }
    }


    render(){
        return(
            <View style={styles.page}>
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.picture} 
                    source={require('../../assets/images/user.png')}/>
                    <View style={styles.View}>
                        <Text style={styles.header}>
                            Username:
                        </Text>
                        <Text style={styles.pagrf}>
                            {this.state.username}
                        </Text>
                        <Text style={styles.header}>
                            Nama Lengkap:
                        </Text>
                        <Text style={styles.pagrf}>
                            {this.state.fullname}
                        </Text>
                        <Text style={styles.header}>
                            Alamat:
                        </Text>
                        <Text style={styles.pagrf}>
                            {this.state.address}
                        </Text>
                    </View>
                </View>
                <View style={styles.ButtonSection}>
                    <TouchableOpacity style={styles.EditButton}
                        onPress={()=>{
                        this.props.navigation.navigate("EditScreen");
                    }}>
                        <Text style={{fontSize: 16, fontWeight: '700'}}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.LogoutButton} 
                        onPress={()=>{
                        this.props.navigation.navigate("SignInScreen");
                    }}>
                        <Text style={{fontSize: 16, fontWeight: '700'}}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {/*Bottom navBar*/}
            <Card>
                <View style={styles.nav}>
                    <View style={{flexDirection: 'column', alignItems:'center'}}>
                    <TouchableOpacity style={{ alignItems:'center'}} onPress={()=>{
                        this.props.navigation.navigate("CustHomeScreen");
                    }}>
                        <Image source={require('../../assets/images/home.png')} style={{width: 25, height: 25}} />
                        <Text>
                        Home
                        </Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'column', alignItems:'center'}}>
                    <TouchableOpacity style={{ alignItems:'center'}} onPress={()=>{
                            this.props.navigation.navigate("HistoryScreen");
                        }}>
                        <Image source={require('../../assets/images/history.png')} style={{width: 25, height: 25}} />
                        <Text>
                        History
                        </Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'column', alignItems:'center'}}>
                    <Image source={require('../../assets/images/profile-on.png')} style={{width: 25, height: 30}} />
                        <Text>
                        Profile
                        </Text>
                    </View>
                </View>
            </Card>
            </View>   
        );
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      
    },
    View: {                              // style View dengan padding, margin bawah, ukuran font, lebar component, dan warna background
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
      width: '85%',
      padding: 15,
      marginBottom: 15,
    },
    header: {                           // style header dengan margin atas bawah, ketebalan teks, dan ukuran teks
      marginTop: 20,
      fontWeight: '700',
      fontSize: 24,
      
    },
    pagrf: {
      fontSize: 18,
    },
    gambar: {
      width: 30,
      height: 30
    },
    picture: {
      marginTop: 80,  
      width: 150,
      height: 150,
      borderRadius: 150,
    },
    ButtonSection: {
        width: '100%',
        // height: '30%',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    EditButton: {
        backgroundColor: '#FECD70', 
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '55%',
        borderRadius: 15,
        margin:5,
        width: '80%',
    },
    LogoutButton: {
        backgroundColor: '#FFAE6D', 
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '55%',
        borderRadius: 15,
        margin:5,
        width: '80%',
    },
    nav:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        height: 70,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#F3E0B5',
    },
    imgNav: {
        width: windowWidth * 0.25,
        height: windowHeight * 0.06,
    },
  });
