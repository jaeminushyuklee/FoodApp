import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accordion, List, Button } from '@ant-design/react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
import firebase from '../firebaseDb';
import { Image } from 'react-native'
import uuid from 'react-native-uuid'

export default class PhotoConfirm extends Component {
    constructor(props){
        super(props);
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        this.state = {
            foodname: '',
            protein: 0,
            carbohyrdate: 0,
            docid: year + "-" + month + "-" + date,
            idofmeal: 0,
            imageurl: this.props.navigation.getParam('imageurl', ''),
            dimageurl: '',
            theuuid: '',
        };
    }

    
    render() {
        return (
            <View style = {styles.container}>
            <Image
                style = {styles.sizer}
                source = {{uri: this.state.imageurl}}
            >
            </Image>
            <Text>foodname</Text>
            <Button
             onPress = {async () => {
                const response = await fetch(this.state.imageurl);
                const blob = await response.blob();
                const randomid = uuid.v4();
                var ref = firebase.storage().ref(randomid);
                await ref.put(blob);

                const downloadurl = await ref.getDownloadURL().catch((error) => { throw error });

                
                var db = firebase.firestore();
                db.collection("entirelog").doc(this.state.docid).set({
                    date: this.state.docid,
                })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
                
                const mealref = db.collection('entirelog').doc(this.state.docid).collection('meals').doc("m" + this.state.idofmeal.toString());
                mealref.get().then(docSnapshot => {
                    if(docSnapshot.exists){
                        db.collection('entirelog')
                        .doc(this.state.docid)
                        .collection('meals')
                        .doc('m' + (this.state.idofmeal+1).toString())
                        .set({
                            id: this.state.idofmeal,
                            protein: this.state.protein,
                            carbohydrate: this.state.carbohyrdate,
                            foodname: this.state.foodname,
                            durl: downloadurl,
                            photoid: randomid,
                        });
                    } else {
                        mealref.set({
                            id: this.state.idofmeal,
                            protein: this.state.protein,
                            carbohydrate: this.state.carbohyrdate,
                            foodname: this.state.foodname,
                            durl: downloadurl,
                            photoid: randomid,
                        });
                    }
                });
            
    
            
        
              }}
            >Submit</Button>
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
});