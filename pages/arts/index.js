import React, {Component} from 'react';
import { Card, Button, Table } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link } from '../../routes';
import ArtWine from '../../ethereum/artwine';
import RequestRow from '../../components/RequestRow';


class ArtistIndex extends Component {

  static async getInitialProps(props)
  {
      const {address} = props.query;
      const artwine = ArtWine(address);

      const paintingCount =  await artwine.methods.getPaintingCount().call();

//clever javascripts
      const paintings = await Promise.all (
        Array(parseInt(paintingCount))
        .fill()
        .map((element, index) => {
           return artwine.methods.arts(index).call();
        })
      );

      return {address, paintings, paintingCount};
  }


  renderRow()
  {
    return this.props.paintings.map((paint, index) => {
      return <RequestRow
          key={index}
          id={index}
          paint={paint}
          address={this.props.address}
      />;
    })
  }

    render () {

       const { Header, Row, HeaderCell, Body } = Table;

        return (

          <Layout>
              <h3> List of Paintings for below Contract </h3>
              <Link route={`/arts/${this.props.address}/new`}>
                 <a>
                     <Button primary floated="right" style={{marginBottom: 10}}>Add More Painting Contracts to your account </Button>
                 </a>
              </Link>

              <Table>
                  <Header>
                      <Row>
                          <HeaderCell>ID</HeaderCell>
                          <HeaderCell>Title</HeaderCell>
                          <HeaderCell>Picture</HeaderCell>
                          <HeaderCell>Description</HeaderCell>
                          <HeaderCell>Amount</HeaderCell>

                      </Row>
                  </Header>

                  <Body>
                      {this.renderRow()}
                  </Body>
              </Table>

              <div> Found {this.props.paintingCount}  Paintings </div>

          </Layout>
        );
    }

}

export default ArtistIndex;
