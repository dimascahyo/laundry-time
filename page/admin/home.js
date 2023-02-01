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


export default class admin_home extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      id_pesan: '',
      status: '',
      resData: [],
    };
  }



  getData=()=>{
    getDocs(query(collection(db, "pesanan"),
        where("status","!=","Selesai"),
    ))
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

  updateBtn=(id)=>{
    var id_pesan = id;
    this.setState({pass_id: id_pesan}, () => localStorage.setItem('pass_id', id_pesan));
    console.log("Id home: ", id_pesan);
    this.props.navigation.navigate("EditPesanScreen");
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
      this.getData();
    }
  }
  


  render(){
    return (
        <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false} style={{height: 600}}>
          <View style={styles.hello}>
            <Image source={require('../../assets/images/logo.png')} style={{width: 50, height: 60}} />
              <Text style={styles.selamat}>Selamat Datang, {this.state.username}</Text>
            <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate("SignInScreen");}}
            style={{alignSelf: 'center',}}>
              <Image source={require('../../assets/images/logout.png')} style={{width: 33, height: 30}} /> 
            </TouchableOpacity>
            </View>
            {/*menampilkan data yang statusnya Baru */}
            {Object.keys(this.state.resData).length > 0 && (
                <View style={styles.pesananAktif}>
                  <View style={styles.refresh}>
                    <Text style={styles.label}>Daftar Pesanan</Text>
                    <TouchableOpacity style={styles.refreshBtn} onPress={()=>{this.getData()}}>
                      <Text> Refresh</Text>
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
                                    Nama customer: {val.nama_customer}
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1 }}>
                                    Alamat: {val.alamat}
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1 }}>
                                    Koordinat: {val.latitude}, {val.longitude}
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1 }}>
                                    Username: {val.username}
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1 }}>
                                    Kategori: {val.kategori}
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1 }}>
                                    Status: {val.status}
                                </Text>
                                <Text style={{ fontSize: 14, flex: 1, marginTop:5 }}>
                                    Diinput pada {String(val.time_input.toDate())}
                                </Text>
                                <TouchableOpacity onPress={()=>{this.updateBtn(val.id_pesan)}}>
                                  <Text style={{color: '#FFAE6D', marginTop: 10, fontWeight: '600'}}>
                                    Update
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
    marginLeft: 10,
    marginRight: 30,
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
    backgroundColor: 'green',
  }
});
