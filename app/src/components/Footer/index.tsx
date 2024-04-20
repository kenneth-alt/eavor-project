const Footer = () => {
  return (
    <footer className="w-full bg-orange-300 p-2 mt-auto">
      <p className="text-center">
        &copy; {new Date().getFullYear()} CardQuest.
      </p>
    </footer>
  );
};

export default Footer;
