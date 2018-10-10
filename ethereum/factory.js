import web3 from './web3';
import ArtWineFactory from './build/ArtWineFactory.json';


const instance = new web3.eth.Contract(
  JSON.parse(ArtWineFactory.interface),
  '0x9293e29E40133B7df927a0DB060D60Ba6B513767'
);

export default instance;
