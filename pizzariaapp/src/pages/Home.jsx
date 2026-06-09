import "../styles/Navbar.css";
import ingredientimage from "../assets/ingredients.png";
import chefimage from "../assets/chef.png";
import clockimage from "../assets/clock.png";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div>
      <div
        style={{
          padding: "40px",
          border: "1px solid",
          borderColor: "#ffc107",
          borderRadius:"5px"
        }}
      >
        <div
          style={{ padding: "10px", marginLeft: "30px", marginRight: "30px" }}
        >
          <h1>Our Story</h1>
          <div>
            <p className="para">
              We believe in good. We launched Fresh Pan Pizza Best Excuse Awards
              on our Facebook fan page. Fans were given situations where they
              had to come up with wacky and fun excuses. The person with the
              best excuse won the Best Excuse Badge and won Pizzeria's vouchers.
              Their enthusiastic response proved that Pizzeria's Fresh Pan Pizza
              is the Tastiest Pan Pizza. Ever!
            </p>
            <p className="para">
              Ever since we launched the Tastiest Pan Pizza, ever, people have
              not been able to resist the softest, cheesiest, crunchiest,
              butteriest Domino's Fresh Pan Pizza. They have been leaving the
              stage in the middle of a performance and even finding excuses to
              be disqualified in a football match.
            </p>
            <p className="para">
              We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan
              page. Fans were given situations where they had to come up with
              wacky and fun excuses. The person with the best excuse won the
              Best Excuse Badge and won Domino's vouchers. Their enthusiastic
              response proved that Pizzeria's Fresh Pan Pizza is the Tastiest
              Pan Pizza. Ever!
            </p>
          </div>
        </div>

        {/* div for images  */}
        <div
          style={{ padding: "10px", marginLeft: "30px", marginRight: "30px" }}
        >
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid",
              borderBottomColor: "#ffc107"
            }}
          >
            <img src={ingredientimage} />
            <div className="ingredientdiv">
              <h1>Ingredients</h1>
              <p className="ingredientp">
                We're ruthless about goodness. We have no qualms about tearing
                up a day-old lettuce leaf (straight from the farm), or steaming
                a baby (carrot). Cut. Cut. Chop. Chop. Steam. Steam. Stir Stir.
                While they're still young and fresh - that's our motto. It makes
                the kitchen a better place.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              paddingRight: "100px",
              borderBottom: "1px solid",
              borderBottomColor: "#ffc107",
            }}
          >
            <div className="chefdiv">
              <h1>Our Chef</h1>
              <p className="chefp">
                They make sauces sing and salads dance. They create magic with
                skill, knowledge, passion, and stirring spoons (among other
                things). They make goodness so good, it doesn't know what to do
                with itself. We do though. We send it to you.
              </p>
            </div>
            <img src={chefimage} />
          </div>

          <div
            style={{
              display: "flex",
              borderBottom: "1px solid",
              borderBottomColor: "#ffc107",
            }}
          >
            <img src={clockimage} />
            <div className="clockdiv">
              <h1 style={{ textAlign: "left" }}>45 min delivery</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
