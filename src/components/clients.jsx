import { clients } from "../constants";
import styles from "../assets/js/jsmaster";

const Clients = () => (
  <section className={`${styles.flexCenter} my-4`}>
    <div className={`${styles.flexCenter} flex-wrap w-full`}>
    <h1 className={styles.heading2} style={{color:"white",padding:"10px 10px",fontSize:"39px",marginTop:"20px"}}>Our Clients</h1>
      {clients.map((client) => (
        <div key={client.id} className={`flex-1 ${styles.flexCenter} sm:min-w-[192px] min-w-[120px] m-5`}>
          <img src={client.logo} alt="client_logo" className="sm:w-[192px] w-[100px] object-contain" />
        </div>
      ))}
    </div>
  </section>
);

export default Clients;