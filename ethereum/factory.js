import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xf14F244B7020F2CD05423F9eb3B63a6444C768d1"
);

export default instance;
