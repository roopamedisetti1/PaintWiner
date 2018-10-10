import React, {Component} from 'react';
import factory from '../ethereum/factory.js';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link } from '../routes';

class ArtWineIndex extends Component {

  static async getInitialProps() {
    const artwines = await factory.methods.getDeployedArtWine().call();

    return {artwines};
  }


  renderArtWine() {
     const items = this.props.artwines.map(address => {
       return {
         header : address,
         description : (
            <Link route={`/arts/${address}`} >
               <a>view art details</a>
            </Link>
          ),
         fluid : true
       };
     });

     return <Card.Group items={items} />;
  }


  render() {

    return (
        <Layout>
            <div>

            <h3>Open Art and Winery Contracts</h3>

            <Link route="/new">
             <a>
                <Button floated="right"
                content="Create a contract to start"
                icon="add circle"
                primary
                />
             </a>
            </Link>

            {this.renderArtWine()}

            </div>
        </Layout>
      );
    }


}

export default ArtWineIndex;
