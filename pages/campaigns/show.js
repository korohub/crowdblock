import React, { Component } from "react";
import { Card, Grid, Button, Item } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();
    console.log(summary)

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      name: summary[5],
      description: summary[6],
      image: summary[7],
      target: summary[8],
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
      name,
      description,
      image,
      traget,
    } = this.props;

    const items = [
      // {
      //   header: <img src={image} style={{ width: 100, align: "center" }} />,
      //   meta: name,
      //   description: description,
      // },
      {
        header: manager,
        meta: "Adresse du créateur",
        description:
          "",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "contribution Minimum(wei)",
        description:
          "Voici le montant minimum de votre contribution",
      },
      {
        header: requestsCount,
        meta: "Demande de retrait en cours",
        description:
          "Une demande tente de retirer de l'argent du contrat. Les demandes doivent être approuvées par les approbateurs",
      },
      {
        header: approversCount,
        meta: "Nombre d'approbateur",
        description:
          "Nombre de personnes ayant déjà fait un don à cette campagne",
      },
      // {
      //   header: web3.utils.fromWei(balance, "ether"),
      //   meta: "Campaign Balance (ether)",
      //   description:
      //     "The balance is how much money this campaign has left to spend.",
      // },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3 className="open-campaigns">Détails</h3>
        <Item.Group>
          <Item>
            <Item.Image size='medium' src={this.props.image} />
            <Item.Content>
              <Item.Header as='a'>détails</Item.Header>
              <Item.Meta>
                <span className='balance'>Balance (ether) {web3.utils.fromWei(this.props.balance, "ether")} ///</span>     
                <span className='balance'>Cible (ether) {web3.utils.fromWei(this.props.target, "ether")}</span>              
              </Item.Meta>
              <Item.Description>{this.props.description} </Item.Description>     
            </Item.Content>
          </Item>          
        </Item.Group> 

        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>Demande(s) de retrait</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
