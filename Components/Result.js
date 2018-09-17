import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Button, StyleSheet } from 'react-native';
import * as parser from 'mrz';
import { FormInput, FormLabel } from 'react-native-elements';





export default class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render() {
    const lastBlock = this.props.result.responses[0].fullTextAnnotation.pages[0].blocks.length - 1;
    const result = this.props.result.responses[0].fullTextAnnotation.pages[0].blocks[lastBlock].paragraphs[0].words;
    let mrzText = '';
    let type = false;
    result.map((i) => {
      i.symbols.map((j) => { mrzText += j.text })
    })
    console.log(mrzText)


    let mrzArray = [];
    let parsedText = {};
    if (mrzText.length === 90) {
      mrzArray = mrzText.match(/.{1,30}/g);
      parsedText = parser.parse(mrzArray);

    }
    if (mrzText.length === 88) {
      mrzArray = mrzText.match(/.{1,44}/g);
      parsedText = parser.parse(mrzArray);
      type = true;

    }
    if (mrzText.length === 72) {
      mrzArray = mrzText.match(/.{1,36}/g);
      parsedText = parser.parse(mrzArray);

    }
    let birthDate = parsedText.fields.birthDate;
    let birthdateParsed = birthDate[4] + birthDate[5] + '.' + birthDate[2] + birthDate[3] + '.' + birthDate[0] + birthDate[1]
    console.log(mrzArray)
    console.log(parsedText);




    return (


      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} >
          <View>
            <FormLabel>First Name</FormLabel>
            <FormInput value={parsedText.fields.firstName} />
            <FormLabel>Last Name</FormLabel>
            <FormInput value={parsedText.fields.lastName} />
            <FormLabel>Birthday</FormLabel>
            <FormInput value={birthdateParsed} />
            <FormLabel>OIB</FormLabel>
            <FormInput value={parsedText.fields.optional1} />
            <FormLabel>Gender</FormLabel>
            <FormInput value={parsedText.fields.sex} />
            <FormLabel>Document Type</FormLabel>
            <FormInput value={parsedText.fields.documentCode} />
            <FormLabel>Nationality</FormLabel>
            <FormInput value={parsedText.fields.issuingState} />
            <FormLabel>Document number</FormLabel>
            <FormInput value={parsedText.fields.documentNumber} />
          </View>




        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }

})
