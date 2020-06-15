import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accordion, List, Button } from '@ant-design/react-native';
import firebase from '../firebaseDb';
import { Image } from 'react-native'
import uuid from 'react-native-uuid'

import * as tf from '@tensorflow/tfjs';
import { fetch as tffetch } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as jpeg from 'jpeg-js';


export default class PhotoConfirm extends Component {
    constructor(props){
        super(props);
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        let user = firebase.auth().currentUser;
        this.state = {
            isTfReady: false,
            isModelReady: false,
            predictions: null,
            image: null,
            foodname: '',
            protein: 0,
            carbohyrdate: 0,
            docid: year + "-" + month + "-" + date,
            idofmeal: 0,
            imageurl: this.props.navigation.getParam('imageurl', ''),
            dimageurl: '',
            currentuserid: user.uid,
            buttoncolor: 'white',
            submitting: '',
        };
    }

    async componentDidMount() {
        await tf.ready();
        this.setState({
          isTfReady: true
        });
        this.model = await mobilenet.load()
        this.setState({ isModelReady: true })
        
        //Output in Expo console
        console.log(this.state.isTfReady);
        this.selectImage(this.state.imageurl)
        console.log(this.state.predictions)
    }
    imageToTensor(rawImageData) {
        const TO_UINT8ARRAY = true
        const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
        // Drop the alpha channel info for mobilenet
        const buffer = new Uint8Array(width * height * 3)
        let offset = 0 // offset into original data
        for (let i = 0; i < buffer.length; i += 3) {
          buffer[i] = data[offset]
          buffer[i + 1] = data[offset + 1]
          buffer[i + 2] = data[offset + 2]
    
          offset += 4
        }
    
        return tf.tensor3d(buffer, [height, width, 3])
    }
    classifyImage = async () => {
        try {
          const imageAssetPath = Image.resolveAssetSource(this.state.image);
          const response = await tffetch(imageAssetPath.uri, {}, { isBinary: true });
          const rawImageData = await response.arrayBuffer();
          const imageTensor = this.imageToTensor(rawImageData);
          const predictions = await this.model.classify(imageTensor);
          this.setState({ predictions });
          console.log(predictions);
        } catch (error) {
          console.log(error);
        }
    };
    selectImage = async (imageuri) => {
        try {
            const source = { uri: imageuri};
            this.setState({ image: source });
            this.classifyImage();
            console.log(this.state.predictions)
        } catch (error) {
          console.log(error);
        }
    };

    renderButtons(){
        if (this.state.predictions != null) {
            return this.state.predictions.map((item,index) => {
                return(
                    <View 
                    key = {index}
                    >
                    <Button
                    activeStyle={{ backgroundColor: 'red' }}
                    onPress = {() => {
                        this.setState({
                            foodname: item.className
                        })
                    }}
                    >{item.className}</Button>
                    </View>
                );
            });
        }
    }

    
    render() {
        return (
            <View style = {styles.container}>
            <Image
                style = {styles.sizer}
                source = {{uri: this.state.imageurl}}
            >
            </Image>
            <Text>
              Predictions: {this.state.predictions ? '' : 'Predicting...'}
            </Text>
            <View>
                {this.renderButtons()}
            </View>
            <Text>{this.state.foodname}</Text>
            <Button
             onPress = {async () => {
                this.setState({
                    submitting: 'Submitting...please hold',
                })
                const response = await fetch(this.state.imageurl);
                const blob = await response.blob();
                const randomid = uuid.v4();
                var ref = firebase.storage().ref(randomid);
                await ref.put(blob);
                const downloadurl = await ref.getDownloadURL().catch((error) => { throw error });

                var db = firebase.firestore();
                db.collection('users').doc(this.state.currentuserid).collection("entirelog").doc(this.state.docid).set({
                    date: this.state.docid,
                })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });

                
                const mealref = db.collection('users').doc(this.state.currentuserid).collection('entirelog').doc(this.state.docid).collection('meals').doc("m" + this.state.idofmeal.toString());
                    mealref.get().then(docSnapshot => {
                        if(!(docSnapshot.exists)) {
                            db.collection('users').doc(this.state.currentuserid)
                            .collection('entirelog')
                            .doc(this.state.docid)
                            .collection('meals')
                            .doc('m' + (this.state.idofmeal).toString())
                            .set({
                            id: this.state.idofmeal,
                            protein: this.state.protein,
                            carbohydrate: this.state.carbohyrdate,
                            foodname: this.state.foodname,
                            durl: downloadurl,
                            photoid: randomid,
                        });
                        } else {
                            var lastid = null;
                            var temparr = [];
                            var vprotein = this.state.protein
                            var vcarbohydrate = this.state.carbohyrdate
                            var vfoodname = this.state.foodname
                            var vdocid = this.state.docid
                            var vcurrentuserid = this.state.currentuserid
                            var collection = db.collection('users').doc(this.state.currentuserid).collection('entirelog').doc(this.state.docid).collection('meals');
                            var query = collection.orderBy('id', "desc").limit(1);
                            query.get().then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                console.log(doc.id);
                                temparr = doc.id.split(/([0-9]+)/)
                                lastid = Number(temparr[1]);
                                console.log('here',lastid)
                                db.collection('users').doc(vcurrentuserid).
                                collection('entirelog').doc(vdocid).collection('meals').doc("m" + (lastid+1).toString()).set({
                                    id: lastid + 1,
                                    protein: vprotein,
                                    carbohydrate: vcarbohydrate,
                                    foodname: vfoodname,
                                    durl: downloadurl,
                                    photoid: randomid,
                                });
                            });
                            })
                            .catch(error => {
                                console.log(error)
                            }) 
                        }
                    });
                    this.setState({
                        submitting: 'Submitted',
                    })
                    this.props.navigation.navigate('Journal'); 
              }}
            >Submit</Button>
            <Text>{this.state.submitting}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sizer: {
      width: 50,
      height: 50,
    },
    defaultButtonTab: {
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 150,
        height: 30,
        padding: 10,
        borderRadius: 13,
        borderStyle: "solid",
        borderWidth: 1.3,
        borderColor: "rgba(131, 143, 158, 0.7)",
        marginRight: 10,
        marginTop: 10
    },
    buttonTab: {
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 150,
        height: 30,
        padding: 10,
        borderRadius: 13,
        borderStyle: "solid",
        borderWidth: 1.3,
        borderColor: "#1994fc",
        marginRight: 10,
        marginTop: 10
    },
});