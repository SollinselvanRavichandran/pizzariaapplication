import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function withlayout(Component) {
  return function WrappedComponent() {
    return (
      <div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
        <Navbar />
        <div style={{flex:"1"}}>
            <Component />
        </div>
        <Footer />
      </div>
    );
  };
}

export default withlayout;
