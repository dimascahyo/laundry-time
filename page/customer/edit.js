import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { setDoc, Doc, doc, getDoc, where, query, collection, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../config';
import Constants from 'expo-constants';
import styles from '../style';
import Feather from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-paper';

export default class edit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            fullname: '',
            address: '',
            latitude: '',
            longitude: '',
            password: '',
            check_textInputChange : false,
            secureTextEntry : true,
            confirmSecureTextEntry : true,
            };
    }

    getData= async ()=>{
        var Username = this.state.username;
        await getDocs(query(collection(db, "users")
            , where('username','==',Username)
        ))
        .then((docSnap) => {
            let users = [];
            docSnap.forEach((doc) => {
                users.push({ ...doc.data(), id: doc.id })
            });
            this.setState({
                fullname: users[0].fullname,
                address: users[0].address,
                latitude: users[0].latitude,
                longitude: users[0].longitude,
                password: users[0].password,
            });
        });
    }

    updateData=()=>{
        var Username = this.state.username;
        var Fullname = this.state.fullname;
        var Address = this.state.address;
        var Password = this.state.password;
        updateDoc(doc(db, "users", Username), {
            fullname: Fullname,
            address: Address,
            password: Password,
        }).then(() => {
            alert("Edit data berhasil");
            this.props.navigation.navigate("ProfileScreen");
        }).catch((error) => {
            console.log(error);
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


    render(){
        return(
            <ScrollView>
            <View style={styles.viewStyle}>
                <Card style={{backgroundColor: '#FFFCF4',}}>
                    <View style={{
                                flexDirection: 'row',
                                paddingBottom: 5,
                                width: '80%',
                                alignSelf: 'center',
                                marginTop: 30,
                            }}>
                        <TextInput placeholder="Enter Fullname" placeholderTextColor="#FFAE6D" style={styles.textInput} onChangeText={fullname=>this.setState({fullname})}>
                            {this.state.fullname}
                        </TextInput>
                    </View>
                    <View style={styles.action}>
                        <TextInput placeholder="Enter Address" placeholderTextColor="#FFAE6D" style={styles.textInput} onChangeText={address=>this.setState({address})}>
                            {this.state.address}
                        </TextInput>
                    </View>
                    <View style={styles.action}>
                        <TextInput placeholder="Enter Password" placeholderTextColor="#FFAE6D" secureTextEntry={this.state.secureTextEntry ? true : false} style={styles.textInput} onChangeText={password=>this.setState({password})} >
                            {this.state.password}
                        </TextInput>
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
                                this.updateData()
                            }}>
                                <Text style={styles.text}>Submit</Text>
                        </Pressable>
                    </TouchableOpacity>
                </Card>
                </View>
            </ScrollView>
        );
    }
}

