import React, { Component } from 'react';
import { View, TextInput, Button, TouchableOpacity, Pressable, Text, Image } from 'react-native';
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import { db } from './config';
import { setDoc, Doc, doc } from 'firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';

export default class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            fullname: '',
            address: '',
            latitude: '',
            longitude: '',
            confirmPw : '',
            check_textInputChange : false,
            secureTextEntry : true,
            confirmSecureTextEntry : true
        };
    }
    
    InsertRecord=()=>{
        var Username = this.state.username;
        var Password = this.state.password;
        var Fullname = this.state.fullname;
        var Address = this.state.address;
        var Latitude = this.state.latitude;
        var Longitude = this.state.longitude;
        var ConfirmPw = this.state.confirmPw;
        if ((Username.length==0) || (Password.length==0)  || (Fullname.length==0) || (Address.length==0) || (ConfirmPw.length==0)){
            alert("Required Field Is Missing!!!");
        }
        else if (Password.length<8){
            alert("Minimum 08 characters required!!!");
        }else if(Password !== ConfirmPw){
            alert("Password does not match!!!");
        }else{
            setDoc(doc(db, "users", Username), {
                username: Username,
                password: Password,
                fullname: Fullname,
                address: Address,
                latitude: Latitude,
                longitude: Longitude,
            })
            .then(()=>{
                alert("Create Account Success");
                this.props.navigation.navigate("SignInScreen");
            })
            .catch((error)=>{
                alert("Error Occured: " + error);
            })
        }
    }
    
    updateSecureTextEntry(){
        this.setState({
            ...this.state,
            secureTextEntry: !this.state.secureTextEntry
        });
    }
    updateConfirmSecureTextEntry(){
        this.setState({
            ...this.state,
            confirmSecureTextEntry: !this.state.confirmSecureTextEntry
        });
    }
    
    render() {
        return (
            <ScrollView>
                <View style={styles.viewStyle}>
                    <Card style={{backgroundColor: '#FFFCF4',}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={{fontWeight: '800', fontSize: 32, marginBottom: 50, marginTop: 30}}>
                                Buat Akun Baru
                            </Text>
                        </View>
                        <View style={styles.action}>
                            <TextInput placeholder="Username/No. Telp" placeholderTextColor="#FFAE6D" style={styles.textInput} onChangeText={username=>this.setState({username})} />
                        </View>
                        <View style={styles.action}>
                            <TextInput placeholder="Fullname" placeholderTextColor="#FFAE6D" style={styles.textInput} onChangeText={fullname=>this.setState({fullname})} />
                        </View>
                        <View style={styles.action}>
                            <TextInput placeholder="Address" placeholderTextColor="#FFAE6D" style={styles.textInput} onChangeText={address=>this.setState({address})} />
                        </View>
                        <View style={styles.action}>
                            <TextInput placeholder="Password" placeholderTextColor="#FFAE6D" secureTextEntry={this.state.secureTextEntry ? true : false} style={styles.textInput} onChangeText={password=>this.setState({password})} />
                            <TouchableOpacity onPress={this.updateSecureTextEntry.bind(this)}>
                                {this.state.secureTextEntry ?
                                <Feather name="eye-off" color="grey" size={25} />
                                :
                                <Feather name="eye" color="black" size={25} />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.action}>
                            <TextInput placeholder="Confirm Password" placeholderTextColor="#FFAE6D" style={styles.textInput} onChangeText={confirmPw=>this.setState({confirmPw})} secureTextEntry={this.state.confirmSecureTextEntry ? true : false} />
                            <TouchableOpacity onPress={this.updateConfirmSecureTextEntry.bind(this)}>
                                {this.state.confirmSecureTextEntry ?
                                <Feather name="eye-off" color="grey" size={25} />
                                :
                                <Feather name="eye" color="black" size={25} />
                                }
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <Pressable style={styles.loginButton}
                                onPress={()=>{
                                    this.InsertRecord()
                                }}>
                                    <Text style={styles.text}>Create new Account</Text>
                            </Pressable>
                        </TouchableOpacity>
                    </Card>
                </View>
            </ScrollView> 
        );
    }
}