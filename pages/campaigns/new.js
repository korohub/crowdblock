import React, { Component } from "react";
import { Form, Button, Input, Message, TextArea } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    description: "",
    campaignName: "",
    target: "",
    imageUrl: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(
          this.state.minimumContribution,
          this.state.campaignName,
          this.state.description,
          this.state.imageUrl,
          this.state.target
        )
        .send({
          from: accounts[0],
        });

      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3 className="open-campaigns">Nouvelle Campaigne</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Nom de la Campagne</label>
            <Input
              value={this.state.campaignName}
              onChange={(event) =>
                this.setState({ campaignName: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Déscription</label>
            {/* <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            /> */}
            <TextArea
              placeholder='Dites en plus sur votre projet'
              style={{ minHeight: 100 }}

              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
              /> 
          </Form.Field>
          <Form.Field>
            <label>URL Image</label>
            <Input
              value={this.state.imageUrl}
              onChange={(event) =>
                this.setState({ imageUrl: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label> Contribution Minimum</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Montant a Atteiundre </label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.target}
              onChange={(event) =>
                this.setState({ target: event.target.value})
              }
            />
            <label>{this.state.target ? this.state.target / (10**18): 0} eth -- </label>
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            GO !
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
