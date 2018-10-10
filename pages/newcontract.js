import React, {Component} from 'react';
import Layout from '../components/Layout';
import { Container, Form, Button, Input, Message, Dropdown } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import {Link, Router } from '../routes';

class ArtWineContractNew extends Component {
  state = {
    ttype : '',
    errorMessage : '',
    loading : false,
    options : [
                { key : "Painting", value:"Art", text:"Painting"},
                { key : "Winery", value:"wine", text:"Winery"}
              ]
  };


  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({loading : true, errorMessage : ''});
    try {

      const accounts = await web3.eth.getAccounts();

      await factory.methods
      .createArtWine(this.state.ttype)
      .send( {
          from : accounts[0]
      });

      Router.pushRoute('/');

    } catch (e) {
      this.setState({errorMessage : e.message});
    }

    this.setState({loading : false});
  };

  render() {
     return (
       <Layout>
          <h3> Create a Contract to start </h3>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
              <Form.Field>
                  <label>Are you creating an Art Contract or Wine Contract</label>
                  <Dropdown
                  placeholder='select type of contract you are creating' fluid selection options={this.state.options}
                    value={this.state.value}
                    onChange={ (event, {value}  ) => this.setState({ttype : value})}
                  />
              </Form.Field>
              <Message
                  error
                  header='OOPS! There was some errors with your submission'
                  content={this.state.errorMessage}
                  />
              <Button loading={this.state.loading} primary> Create! </ Button>
          </Form>

       </Layout>
     );
  }
}

export default ArtWineContractNew;
