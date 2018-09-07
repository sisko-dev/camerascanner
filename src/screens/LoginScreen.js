import React, { Component } from 'react';
import {
  Container,
  Header,
  Button,
  Text,
  Body,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title,
} from 'native-base';

export default class LoginScreen extends Component {
  render() {
    return (
      <Container  >
        <Header>
          <Body style={{ alignItems: 'center' }}>
            <Title>Check-in App</Title>
          </Body>
        </Header>
        <Form style={{ flex: 1, justifyContent: 'center' }}>
          <FormItem floatingLabel>
            <Label>Email</Label>
            <Input />
          </FormItem>
          <FormItem floatingLabel last>
            <Label>Password</Label>
            <Input secureTextEntry={true} />
          </FormItem>

          <Button full rounded primary style={{ paddingBottom: 4, marginTop: 20 }} onPress={() => this.props.navigation.navigate('Home')}>
            <Text> Login </Text>
          </Button>
        </Form>
      </Container>
    );
  }
}