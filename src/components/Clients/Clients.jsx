import './Clients.css'; // You'll style your component here

const Clients = () => {
  return (
    <div className="clients-section">
      {/* Our Clients */}
      <div className="clients-header">
        <h2>Our Clients</h2>
        <p>We have been working with some Fortune 500+ clients</p>
      </div>

      {/* Clients Logos */}
      <div className="clients-logos">
        <img src="logo1.png" alt="Client Logo 1" />
        <img src="logo2.png" alt="Client Logo 2" />
        <img src="logo3.png" alt="Client Logo 3" />
        <img src="logo4.png" alt="Client Logo 4" />
        <img src="logo5.png" alt="Client Logo 5" />
        <img src="logo6.png" alt="Client Logo 6" />
      </div>

      {/* Title Section */}
      <div className="management-header">
        <h3>Manage your entire community in a single system</h3>
        <p>Who is Nextcent suitable for?</p>
      </div>

      {/* Service Cards */}
      <div className="services">
        <div className="service-card">
          <div className="icon">
            <img src="membership-icon.png" alt="Membership Icon" />
          </div>
          <h4>Membership Organisations</h4>
          <p>Our membership management software provides full automation of membership renewals and payments</p>
        </div>

        <div className="service-card">
          <div className="icon">
            <img src="associations-icon.png" alt="Associations Icon" />
          </div>
          <h4>National Associations</h4>
          <p>Our membership management software provides full automation of membership renewals and payments</p>
        </div>

        <div className="service-card">
          <div className="icon">
            <img src="clubs-icon.png" alt="Clubs Icon" />
          </div>
          <h4>Clubs And Groups</h4>
          <p>Our membership management software provides full automation of membership renewals and payments</p>
        </div>
      </div>
    </div>
  );
};

export default Clients;
