import React, { Component } from 'react';
import { View, TextInput, Button, TouchableOpacity, Pressable, Text } from 'react-native';
import styles from '../style';
import { db } from '../config';
import { setDoc, Doc, doc,  serverTimestamp } from 'firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default class pesan extends Component {


    constructor(props) {
        super(props);
        this.state = {
            id_pesan : '',
            username: '',
            nama: '',
            alamat: '',
            latitude: 0,
            longitude: 0,
            kategori : '',
            berat: '',
            estimasi : '',
            biaya: '',
            pilih: '',
            status: 'Baru',
            location: 0,
            region: 0,
        };
    }

    _getLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
        let location = await Location.getCurrentPositionAsync({});
        console.log(location.coords.latitude)
        var lat = parseFloat(location.coords.latitude);
        this.state.latitude = lat
        this.state.latitude = lat;
        var long = parseFloat(location.coords.longitude);
        this.state.longitude = long;
        console.log(long)
        const region = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        };
        this.setState({ location, region });
    };

    
    InsertRecord=()=>{
        var id = this.state.id_pesan;
        var Username = this.state.username;
        var Nama = this.state.nama;
        var Alamat = this.state.alamat;
        var Latitude = this.state.region.latitude;
        var Longitude = this.state.region.longitude;
        var kat = String(this.state.kategori);
        var Kategori = kat;
        const waktu = serverTimestamp();
        var Berat = this.state.berat;
        var Estimasi = this.state.estimasi;
        var Status = this.state.status;
        var Biaya = this.state.biaya;

            setDoc(doc(db, "pesanan", id), {
                id_pesan: id,
                username: Username,
                nama_customer: Nama,
                alamat: Alamat,
                latitude: Latitude,
                longitude: Longitude,
                kategori: Kategori,
                time_input: waktu,
                berat: Berat,
                estimasi: Estimasi,
                status: Status,
                biaya: Biaya,
            })
            .then(()=>{
                alert("Pesanan Baru Berhasil Ditambahkan");
                this.props.navigation.navigate("CustHomeScreen");
            })
            .catch((error)=>{
                alert("Error Occured: " + error);
            })
        
    }

    makeId=()=>{
        let r = (Math.random() + 1).toString(36).substring(7);
        this.setState({id_pesan: "LD-"+r});
    }

    componentDidMount(){
        this.makeId();
        const pass_data = localStorage.getItem('pass_username');
        var u = String(pass_data);
        this.state.username = u;
        const pass_kategori = localStorage.getItem('pass_kategori');
        this.state.kategori = pass_kategori;
        console.log("Pesan Kategori",this.state.kategori);
        this._getLocationAsync();
    }
    
    render() {
        return (
            <ScrollView>
                <View style={styles.viewStylePesan}>
                    <View style={{alignItems:'center'}}>
                        <Text style={{fontWeight: '800', fontSize: 32, marginBottom: 50}}>
                            {this.state.kategori}
                        </Text>
                    </View>
                    <View style={styles.action}>
                        <TextInput placeholder="Nama Customer" placeholderTextColor="#ff0000" style={styles.textInput} onChangeText={nama=>this.setState({nama})} />
                    </View>
                    <View style={styles.action}>
                        <TextInput placeholder="Alamat" placeholderTextColor="#ff0000" style={styles.textInput} onChangeText={alamat=>this.setState({alamat})} />
                    </View>
                    <View style={styles.action}>
                        <Text style={styles.textGet}>
                            Detail Lokasi:
                        </Text>
                    </View>
                    <MapView
                        style={{height:'40%', width:'100%', alignSelf:'center', justifyContent:'center', marginBottom:40,}}
                        initialRegion={this.state.region}
                    >
                        <Marker
                            coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                            }}
                        />
                    </MapView> 
                    <TouchableOpacity>
                        <Pressable style={styles.loginButton}
                            onPress={()=>{
                                this.InsertRecord()
                            }}>
                                <Text style={styles.text}>Pesan</Text>
                        </Pressable>
                    </TouchableOpacity>
                </View>
            </ScrollView> 
        );
    }
}