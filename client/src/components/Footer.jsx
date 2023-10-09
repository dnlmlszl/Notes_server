const Footer = () => {
  const FooterStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    textAlign: 'center',
    margin: '2rem 0',
  };
  return (
    <footer style={FooterStyle}>
      <br />{' '}
      <em>
        Note app
        <br />
        Department of Silly Walks, Ministry of Sound,
        <br />
        U.K. 2023
      </em>
    </footer>
  );
};

export default Footer;
