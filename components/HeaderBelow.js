import React from "react";
import { Link } from "../routes";
import { Button } from "semantic-ui-react";
const HeaderBelow = () => {
  return (
    <div className="headers">
      <div className="header-item-1">
        Liste des campagnes en cours.
      </div>
      {/* <div className="header-item-2">
        <Link route="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="create campaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>
      </div> */}
    </div>
  );
};
export default HeaderBelow;
