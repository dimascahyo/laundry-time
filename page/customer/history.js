import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import {ScrollView} from 'react-native-gesture-handler';

import { Card } from "react-native-paper";
import { db } from '../config';
import { setDoc, Doc, doc, getDoc, where, query, collection, getDocs, deleteDoc, orderBy } from 'firebase/firestore';


export default class history extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      id_pesan: '',
      status: '',
      resData: [],
      resData2: [],
    };
  }



  getData=()=>{
    var Username = this.state.username;
    getDocs(query(collection(db, "pesanan")
    ,where('status','==','Selesai')
    ,where('username','==',Username)))
    .then((docSnap) => {
        let pesanan = [];
        docSnap.forEach((doc) => {
          pesanan.push({ ...doc.data(), id: doc.id })
        });
        this.setState({
          resData:pesanan
        });
    });
  }

  getData2=()=>{
    var Username = this.state.username;
    getDocs(query(collection(db, "pesanan")
    ,where('status','==','Proses')
    ,where('username','==',Username)))
    .then((docSnap) => {
        let pesanan = [];
        docSnap.forEach((doc) => {
          pesanan.push({ ...doc.data(), id: doc.id })
        });
        this.setState({
          resData:pesanan
        });
    });
  }


  componentDidMount() {
    const pass_data = localStorage.getItem('pass_username');
    var u = String(pass_data);
    this.state.username = u;

    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
      errorMessage:
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getData();
    }
  }
  


  render(){
    return (
        <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false} style={{height: 600}}>
            
            {/*menampilkan data yang statusnya Baru */}
            {Object.keys(this.state.resData).length > 0 && (
                <View style={styles.pesananAktif}>
                  <View style={styles.refresh}>
                  <TouchableOpacity 
                    style={{
                        backgroundColor: '#FFAE6D', 
                        padding: 15, 
                        borderBottomLeftRadius: 15, 
                        borderTopLeftRadius: 15,
                        marginTop: 30,
                        width: '47.5%',
                        alignItems: 'center',}} 
                    onPress={()=>{this.getData()}}>
                      <Text style={styles.label}> Selesai</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{
                            backgroundColor: '#FECD70', 
                            padding: 15, 
                            borderBottomRightRadius: 15, 
                            borderTopRightRadius: 15,
                            marginTop: 30,
                            width: '47.5%',
                            alignItems: 'center',}}  
                        onPress={()=>{this.getData2()}}>
                      <Text style={styles.label}> Proses</Text>
                    </TouchableOpacity>
                  </View>
                  
                {
                  this.state.resData.map((val, index)=>(
                      
                      <Card 
                        style={{width: "95%", marginTop: 20, padding: 20, backgroundColor: '#FFFCF4',}}
                        key={index}
                      >
                          <View style={{flexDirection: 'row'}}>
                              <View style={{flexDirection:'column'}}>
                                <Text style={{ fontSize: 18, fontWeight: "bold", flex: 1}}>
                                    Id pesanan: {val.id_pesan}
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1 }}>
                                    Username: {val.username}
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1 }}>
                                    Nama customer: {val.nama_customer}
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1 }}>
                                    Alamat: {val.alamat}
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1 }}>
                                    Kategori: {val.kategori}
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1 }}>
                                    Berat: {val.berat} Kg
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1 }}>
                                    Estimasi: {val.estimasi} Hari
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1 }}>
                                    Biaya: Rp. {val.biaya}
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1 }}>
                                    Status: {val.status}
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1, marginTop:5 }}>
                                    Diinput pada {String(val.time_input.toDate())}
                                </Text>
                              </View>
                              
                          </View>
                      </Card>
                  ))
                }
                </View>
              
            )}

          <View style={styles.pesananAktif}>
            {/*Menggunakan View berisi text ukuran 70 untuk menambah margin scrollview*/}
                <View>
                    <Text style={{ fontSize: 70, flex: 1}}>
                        
                    </Text>
                </View>
          </View>
          {/*Bottom navBar*/}
        
        </ScrollView>
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
            <Image source={require('../../assets/images/history-on.png')} style={{width: 25, height: 25}} />
                <Text>
                  History
                </Text>
            </View>
            <View style={{flexDirection: 'column', alignItems:'center'}}>
                <TouchableOpacity style={{ alignItems:'center'}} onPress={()=>{
                    this.props.navigation.navigate("ProfileScreen");
                }}>
                <Image source={require('../../assets/images/profile.png')} style={{width: 25, height: 30}} />
                <Text>
                  Profile
                </Text>
              </TouchableOpacity>
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
  header: {
    width: windowWidth,
    height: windowHeight * 0.3,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  logo: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.06,
    marginBottom: 5,
  },
  imgNav: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.06,
  },
  hello: {
    marginTop: windowHeight * 0.03,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 30,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  selamat: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  kategori: {
    paddingLeft: 30,
    paddingTop: 15,
  },
  label: {
    fontSize: 18,
  },
  refresh: {
    flexDirection: 'row',
  },
  refreshBtn: {
    flexDirection: 'row',
    marginLeft:46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconKategori: {
    flexDirection: 'row',
    marginTop: 10,
    
  },
  pesananAktif: {
    paddingRight:15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 30,
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  batal:{
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 10,
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
  }
});
