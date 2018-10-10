import React, {Component} from 'react';
import { Table, Button } from 'semantic-ui-react';
import ArtWine from '../ethereum/artwine';
import web3 from '../ethereum/web3';


class RequestRow extends Component {



  render() {

      const {Row, Cell} = Table;
      const {id, paint, approversCount } = this.props;

          return (
             <Row>
                <Cell> {id} </Cell>
                <Cell> {paint.title} </Cell>
                <Cell> {paint.picture} </Cell>
                <Cell> {paint.description} </Cell>
                <Cell> {web3.utils.fromWei(paint.amt, 'ether')} </Cell>
            </Row>
          );
  }

}

export default RequestRow;
