import React, { Component } from 'react';
import { View, TextInput, Button, Pressable, Text, TouchableOpacity, Image, LogBox } from 'react-native';
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import { db } from './config';
import { setDoc, Doc, doc, getDoc, where, query, collection, getDocs } from 'firebase/firestore';
import 'localstorage-polyfill';
import { Card } from 'react-native-paper';

export default class signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            check_textInputChange : false,
            secureTextEntry : true,
            dbuser:'',
            dbpass:'',
            pass_username:'',
        };
    }
    
    InsertRecord=()=>{

        this.setState({pass_username: this.state.username}, () => localStorage.setItem('pass_username', this.state.username));
        var Username = this.state.username;
        var Pass = this.state.password;
        getDocs(query(collection(db, "users"), where('username','==',Username)))
        .then((docSnap) => {
            let users = [];
            docSnap.forEach((doc) => {
                users.push({ ...doc.data(), id: doc.id })
            });
            this.setState({
                dbuser: users[0].username,
                dbpass: users[0].password,
            });
            if(Pass==this.state.dbpass){
                console.log(this.state.dbuser);
                if(this.state.dbuser=='admin'){
                    alert("Login Admin berhasil");
                    console.log("Login sebagai admin");
                    this.props.navigation.navigate("AdminHomeScreen");
                }
                else{
                    alert("Login berhasil");
                    console.log("Login sebagai customer");
                    this.props.navigation.navigate("CustHomeScreen");
                }
            }
            else{
                alert("Password Salah");
            }
        });
    }
    
    updateSecureTextEntry(){
        this.setState({
            ...this.state,
            secureTextEntry: !this.state.secureTextEntry
        });
    }
    
    componentDidMount = () => {
        LogBox.ignoreAllLogs();
    };
    
    render() {
        return (
        <View style={styles.viewStyle}>
            <Image source={require('../assets/images/logo.png')} 
            style={{
                width: 150, 
                height: 180,
                alignSelf: 'center',
                margin: 50}} />
            <Card style={{backgroundColor: '#FFFCF4',}}>
                <View style={{alignItems:'center'}}>
                    <Text style={{fontWeight: '800', fontSize: 32, marginBottom: 50, marginTop: 30}}>
                        Login
                    </Text>
                </View>
                <View style={styles.action}>
                    <TextInput placeholder= "Username/No. Telp" placeholderTextColor="#FFAE6D" style={styles.textInput} onChangeText={username=>this.setState({username})} />
                </View>
                <View style={styles.action}>
                    <TextInput placeholder="Password" placeholderTextColor="#FFAE6D" style={styles.textInput} secureTextEntry={this.state.secureTextEntry ? true : false} onChangeText={password=>this.setState({password})} />
                    <TouchableOpacity onPress={this.updateSecureTextEntry.bind(this)}>
                        {this.state.secureTextEntry ?
                        <Feather name="eye-off" color="grey" size={25} />
                        :
                        <Feather name="eye" color="black" size={25} />
                        }
                    </TouchableOpacity>
                </View>
                {/* Button */}
                
                <TouchableOpacity>
                    <Pressable style={styles.loginButton} onPress={()=>{
                        this.InsertRecord()
                    }}>
                        <Text style={styles.text}>Sign In</Text>
                    </Pressable>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Pressable style={styles.registerButton}
                    onPress={()=>{
                        this.props.navigation.navigate("SignUpScreen");
                    }}>
                        <Text style={styles.text}>Create new Account</Text>
                    </Pressable>
                </TouchableOpacity>
            </Card>
        </View>
        );
    }
}
