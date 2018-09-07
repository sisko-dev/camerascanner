import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem } from "native-base";


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkins: []
    };
  }


  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>HomeScreen</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>

          <Button full rounded dark
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate('CheckIn')}
          >
            <Text>New Check-In</Text>
          </Button>
          <Button full rounded primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate('List')}
          >
            <Text>Check-In List</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
