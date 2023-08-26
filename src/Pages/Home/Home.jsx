import GroupUpdate from "./GroupUpdate";
import ShareContactsForm from "../ContactList/ShareContact";
import HomeStat from "./HomeStat";

const Home = () => {
  

  return (
    <>
      <HomeStat />
      <ShareContactsForm />
      <GroupUpdate></GroupUpdate>
    </>
  );
};

export default Home;
