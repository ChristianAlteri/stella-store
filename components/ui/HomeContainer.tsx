interface HomeContainerProps {
    children: React.ReactNode;
  }
  
  const HomeContainer: React.FC<HomeContainerProps> = ({
    children
  }) => {
    return ( 
      <div className="">
        {children}
      </div>
     );
  };
  
  export default HomeContainer;