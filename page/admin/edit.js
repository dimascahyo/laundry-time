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
import { Card } from "react-native-paper";

export default class editPesanan extends Component{
    constructor(props) {
        super(props);
        this.state = {
            alamat: '',
            berat: '',
            biaya: '',
            estimasi: '',
            id_pesan: '',
            kategori: '',
            latitude: '',
            longitude: '',
            nama_customer: '',
            status: '',
            username: '',
            backgroundColor: '#FFFCF4',
            backgroundColor2: '#FFFCF4',
            pressed: false,
            };
    }

    getData= async ()=>{
        var Id = this.state.id_pesan;
        await getDocs(query(collection(db, "pesanan")
            , where('id_pesan','==',Id)
        ))
        .then((docSnap) => {
            let pesanan = [];
            docSnap.forEach((doc) => {
                pesanan.push({ ...doc.data(), id: doc.id })
            });
            this.setState({
                fullname: pesanan[0].fullname,
                alamat: pesanan[0].alamat,
                berat: pesanan[0].berat,
                biaya: pesanan[0].biaya,
                estimasi: pesanan[0].estimasi,
                kategori: pesanan[0].kategori,
                latitude: pesanan[0].latitude,
                longitude: pesanan[0].longitude,
                nama_customer: pesanan[0].nama_customer,
                status: pesanan[0].status,
                username: pesanan[0].username,
            });
        });
    }

    updateData=()=>{
        var Id = this.state.id_pesan;
        var Berat = this.state.berat;
        var Biaya = this.state.biaya;
        var Estimasi = this.state.estimasi;
        var Status = this.state.status;
        updateDoc(doc(db, "pesanan", Id), {
            berat: Berat,
            biaya: Biaya,
            estimasi: Estimasi,
            status: Status,
        }).then(() => {
            alert("Edit data berhasil");
            this.props.navigation.navigate("AdminHomeScreen");
        }).catch((error) => {
            console.log(error);
        });
    }

    changeColor2(){
        if(!this.state.pressed){
           this.setState({ pressed: true, backgroundColor2: '#FECD70', backgroundColor:'#FFFCF4', status: 'Selesai'});
        } else {
          this.setState({ pressed: false, backgroundColor2: '#FFFCF4'});
        }
    }

    changeColor1(){
        if(!this.state.pressed){
           this.setState({ pressed: true, backgroundColor: '#FECD70', backgroundColor2:'#FFFCF4', status: 'Proses'});
        } else {
          this.setState({ pressed: false, backgroundColor: '#FFFCF4'});
        }
    }

    componentDidMount(){
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
            errorMessage:
              'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
          } else {
            const pass_id = localStorage.getItem('pass_id');
            this.state.id_pesan = pass_id;
            console.log(this.state.id_pesan)
            this.getData();
          }
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
                                <Text style={styles.textGet}>
                                    Id: {this.state.id_pesan}
                                </Text>
                            </View>
                            <View style={styles.action}>
                                <Text style={styles.textGet}>
                                    Nama: {this.state.nama_customer}
                                </Text>
                            </View>
                            <View style={styles.action}>
                                <TextInput placeholder="Kg" placeholderTextColor="#FFAE6D" style={styles.textInput} onChangeText={berat=>this.setState({berat})}>
                                    {this.state.berat}
                                </TextInput>
                            </View>
                            <View style={styles.action}>
                                <TextInput placeholder="Hari" placeholderTextColor="#FFAE6D" style={styles.textInput} onChangeText={estimasi=>this.setState({estimasi})}>
                                    {this.state.estimasi}
                                </TextInput>
                            </View>
                            <View style={styles.action}>
                                <TextInput placeholder="Rp." placeholderTextColor="#FFAE6D" style={styles.textInput} onChangeText={biaya=>this.setState({biaya})}>
                                    {this.state.biaya}
                                </TextInput>
                            </View>
                            <View style={styles.action}>
                                <Text style={styles.textGet}>
                                    Status:
                                </Text>
                            </View>
                            <View style={styles.action}>
                                <TouchableOpacity
                                style={{
                                    backgroundColor:this.state.backgroundColor, 
                                    padding: 15,
                                    width: '47.5%',
                                    alignItems: 'center',
                                    borderRadius: 15,
                                    marginRight: 5,
                                }}
                                onPress={()=>this.changeColor1()}
                                >
                                        <Text style={styles.text}>Proses</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style={{
                                    backgroundColor:this.state.backgroundColor2,
                                    padding: 15,
                                    width: '47.5%',
                                    alignItems: 'center',
                                    borderRadius: 15,
                                    marginLeft: 5,
                                }}
                                onPress={()=>this.changeColor2()}
                                >
                                        <Text style={styles.text}>Selesai</Text>
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

