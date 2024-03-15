import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import MuiRating from "../../mui-rating/MuiRating";
import Tilt from "react-vanilla-tilt";

function BootstrapCard() {
  return (
    <div className="bootstrap-card">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
          <MuiRating />
        </Card.Body>
      </Card>
    </div>
  );
}

export default BootstrapCard;
