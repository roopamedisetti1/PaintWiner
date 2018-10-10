import web3 from './web3';
import ArtWine from './build/ArtWine.json';


export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(ArtWine.interface),
    address
  );
}
