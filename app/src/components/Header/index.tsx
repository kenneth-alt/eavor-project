import logo from '../../assets/imgs/cardquest_logo.png';

const Header = () => {
  return (
    <header className="w-full bg-zinc-800 sticky top-0 flex justify-center items-center">
      <img src={logo} alt="CardQuest Logo" className="h-16 mr-2" />
      <h1 className="text-4xl text-orange-600 font-bold">CardQuest</h1>
    </header>
  );
};

export default Header;
