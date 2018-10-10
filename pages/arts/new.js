import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import ArtWine from '../../ethereum/artwine';
import web3 from '../../ethereum/web3';
import { Link,Router } from '../../routes';


class ArtNew extends Component {

    state = {
      title : '',
      picture : '',
      description : '',
      amt : '',
      errorMessage : '',
      loading : false
    };

  static async getInitialProps(props)
  {
      const {address} = props.query;

      return {address};
  }

  onSubmit = async (event) => {
    event.preventDefault();


    const artwine = ArtWine(this.props.address);// declared above our contract instance.

    const {title, picture, description, amt } = this.state;

    this.setState({loading : true,  errorMessage : ''});

        try {

          const accounts = await web3.eth.getAccounts();

          await artwine.methods
          .createPainting(this.state.title, this.state.picture, this.state.description, web3.utils.toWei(this.state.amt, 'ether'))
          .send( {
              from : accounts[0]
          });

          Router.replaceRoute(`/arts/${this.props.address}/`);

         } catch (err) {
              this.setState({errorMessage : err.message});
        }

        this.setState({loading : false, value : ''});

  };

  onCancel = (event) => {
   event.preventDefault;
   Router.pushRoute(`/arts/${this.props.address}`);
 }


  render () {
      return (
        <Layout>
        <Link route={`/arts/${this.props.address}`}>
            <a>
                 Back
            </a>
        </Link>
        <h3> Create a new Art/Painting contract </h3>
         <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
           <Form.Field>
               <label>Title</label>
               <Input
                 value={this.state.title}
                 onChange={event => this.setState({title : event.target.value})}

               />
           </Form.Field>
           <Form.Field>
               <label>Picture</label>
               <Input
                 value={this.state.picture}
                 onChange={event => this.setState({picture : event.target.value})}

               />
           </Form.Field>
            <Form.Field>
                <label>Description</label>
                <Input
                  value={this.state.description}
                  onChange={event => this.setState({description : event.target.value})}

                />
            </Form.Field>
            <Form.Field>
                <label>Value in Ether</label>
                <Input
                  value={this.state.value}
                  onChange={event => this.setState({amt : event.target.value})}
                />
            </Form.Field>

            <Message
                error
                header='OOPS! There was some errors with your submission'
                content={this.state.errorMessage}
              />
            <Button loading={this.state.loading} primary> Create! </ Button>
            <Button onClick={this.onCancel}>Cancel</Button>
        </Form>
        </Layout>
      );
  }

}

export default ArtNew;
