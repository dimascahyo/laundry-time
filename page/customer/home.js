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
import { setDoc, Doc, doc, getDoc, where, query, collection, getDocs, deleteDoc } from 'firebase/firestore';


export default class cust_home extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      id_pesan: '',
      status: '',
      resData: [],
      resDataBaru: [],
    };
  }

  getDataBaru=()=>{
    var Username = this.state.username;
    getDocs(query(collection(db, "pesanan"), 
      where('username','==',Username), 
      where('status','==','Baru'))
    )
    .then((docSnap) => {
        let pesanan = [];
        docSnap.forEach((doc) => {
          pesanan.push({ ...doc.data(), id: doc.id })
        });
        
        this.setState({
          resDataBaru:pesanan,
        });
    });
}

  getDataLain=()=>{
    var Username = this.state.username;
    getDocs(query(collection(db, "pesanan"), 
      where('username','==',Username), 
      where('status','==','Selesai'))
    )
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

  deleteData=(id)=>{
    var IdPesan = id;
    deleteDoc(doc(db, "pesanan", IdPesan));
    alert("Berhasil melakukan pembatalan");
  }

  pilihKategori=(kat)=>{
    var kategori = kat;
    this.setState({pass_kategori: kategori}, () => localStorage.setItem('pass_kategori', kategori));
    this.props.navigation.navigate("PesanScreen");
  }

  componentDidMount() {
    const pass_data = localStorage.getItem('pass_username');
    var u = String(pass_data);
    this.state.username = u;
    console.log(this.state.username);

    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
      errorMessage:
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getDataBaru();
      this.getDataLain();
    }
  }


  render(){
    return (
        <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false} style={{height: 600}}>
            <View style={styles.hello}>
            <Image source={require('../../assets/images/logo.png')} style={{width: 50, height: 60}} />
              <Text style={styles.selamat}>Selamat Datang, {this.state.username}</Text>
            </View>
            {/*kategori cuci */}
            <View style={styles.pesananAktif}>
            <Text style={styles.label}>Kategori</Text>
            <Card style={{width: "95%", marginTop: 20, padding: 20, backgroundColor: '#FFFCF4',}}>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                        <TouchableOpacity style={{alignItems:'center'}} onPress={()=>{this.pilihKategori("Cuci Kering")}}>
                          <Image source={require('../../assets/images/laundry.png')} style={{width: 50, height: 50}} />
                          <Text>Cuci Kering</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                        <TouchableOpacity style={{alignItems:'center'}} onPress={()=>{this.pilihKategori("Cuci Setrika")}}>
                          <Image source={require('../../assets/images/ironing-board.png')} style={{width: 50, height: 50}} />
                          <Text>Cuci Setrika</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1, flexDirection:'row', marginTop: 15}}>
                    <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                        <TouchableOpacity style={{alignItems:'center'}} onPress={()=>{this.pilihKategori("Cuci Mamel")}}>
                          <Image source={require('../../assets/images/wet.png')} style={{width: 50, height: 50}} />
                          <Text>Cuci Mamel</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                        <TouchableOpacity style={{alignItems:'center'}} onPress={()=>{this.pilihKategori("Setrika")}}>
                          <Image source={require('../../assets/images/iron.png')} style={{width: 50, height: 50}} />
                          <Text>Setrika Saja</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Card>
            </View>
            {/*menampilkan data yang statusnya Baru */}
            {Object.keys(this.state.resDataBaru).length > 0 && (
                <View style={styles.pesananAktif}>
                  <View style={styles.refresh}>
                    <Text style={styles.label}>Pesanan Baru </Text>
                    <TouchableOpacity style={styles.refreshBtn} onPress={()=>{this.getDataBaru()}}>
                      <Text> Refresh</Text>
                    </TouchableOpacity>
                  </View>
                  
                {
                  this.state.resDataBaru.map((val, index)=>(
                      
                      <Card 
                        style={{width: "95%", marginTop: 20, padding: 20, backgroundColor: '#FFFCF4',}}
                        key={index}
                      >
                          <View style={{flexDirection: 'row'}}>
                              <View style={{flexDirection:'column'}}>
                                <Text style={{ fontSize: 18, fontWeight: "bold", flex: 1}}>
                                    Id pesanan: {val.id_pesan}
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1}}>
                                    Kategori: {val.kategori}
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1 }}>
                                    Status: {val.status}
                                </Text>
                                <TouchableOpacity onPress={()=>{this.deleteData(val.id_pesan)}}>
                                  <Text style={{color: '#984400', marginTop: 10, fontWeight: '600'}}>
                                    Cancel
                                  </Text>
                                </TouchableOpacity>
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
        </ScrollView>
        {/*Bottom navBar*/}
        <Card>
          <View style={styles.nav}>
            <View style={{flexDirection: 'column', alignItems:'center'}}>
            <Image source={require('../../assets/images/home-on.png')} style={{width: 25, height: 25}} />
              <Text>
                Home
              </Text>
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
    marginTop: 40,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 30,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'row',
  },
  selamat: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 15,
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
    marginLeft:150,
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
    marginLeft: 90,
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
